import { AlertContext } from '@app/../App';
import { fs16, fs20, NavigationProps } from '@app/common';
import { black100, mainColor } from '@app/common/color';
import { DSP, PH } from '@app/common/styles';
import { NavigationKey } from '@app/labels';
import Loader from '@app/screens/component/Loader';
import StatusBar, { STATUS_BAR_HEIGHT } from '@app/screens/component/StatusBar';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import Border from '@app/screens/components/border/Border';
import ButtonAddWithTitleAndSubTitle from '@app/screens/components/button/ButtonAddWithTitleAndSubTitle';
import HeaderWithBackButtonTitleAndrightButton from '@app/screens/components/header/HeaderWithBackButtonTitleAndrightButton';
import { getFilterWithValue } from '@app/server/apis/filter/filter.api';
import { IRGetFilterWithValue } from '@app/server/apis/filter/filter.interface';
import { APIgetProduct } from '@app/server/apis/product/product.api';
import { IClassifier, IFilter, IProduct, IRProduct } from '@app/server/apis/product/product.interface';
import { IShop } from '@app/server/apis/shop/shop.interface';
import * as React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import { createProduct, deleteProductColor, updateProductColor } from '../edit/product/component/generalConfig';
import ChooseProductColors from './color/ChooseProductColors';
import EditSelectedColor from './color/EditSelectedColor';
import { choosenColor, choosenSize, ProductIdContext } from './data-types';
import AddPhotoPopup from './photo';
import DragSort from './photo/DragSort';
import ProvideSize from './size/ProvideSize';

interface EditProductProps extends NavigationProps {
    update?: boolean;
    route: {
        params: {
            update: boolean;
            _id?: string;
            shopId: IShop;
            category: string;
            subCategory: string;
            subCategory1: string;
            changeTab: Function;
        };
    };
}

const EditProduct: React.FunctionComponent<EditProductProps> = ({
    navigation,
    route: {
        params: { update, _id, shopId, category, subCategory, subCategory1, changeTab },
    },
}) => {
    const [loader, setLoader] = React.useState<boolean>(false);

    const [filter, setFilter] = React.useState<IFilter[]>([]);
    const [distribution, setDistribution] = React.useState<IClassifier[]>([]);
    const [choosenColor, setChoosenColor] = React.useState<choosenColor[]>([]);

    const [openChooseColor, setOpenChooseColor] = React.useState(false);
    const [productId, setProductId] = React.useState(_id || '');
    const [showSizePopup, setShowSizePopup] = React.useState(false);
    const [currentColorIndex, setCurrentColorIndex] = React.useState(-1);
    const [currentDragStortIndex, setCurrentDragSortIndex] = React.useState(-1);
    const [currentAddMoreImage, setCurrentAddMoreImage] = React.useState(-1);

    const setAlertState = React.useContext(AlertContext);

    const createProductInServer = async (data: Partial<IProduct>) => {
        try {
            setLoader(true);
            const product: Partial<IProduct> = {
                ...data,

                shopId: shopId,
            };
            const response: IRProduct = await createProduct(data);
            setLoader(false);
            if (response.status == 1) {
                setProductId(response.payload._id);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            showMessage({ type: 'danger', message: error.message });
        }
    };

    const fetchProduct = async () => {
        try {
            setLoader(true);
            const response: IRProduct = await APIgetProduct({ _id: _id, shopId: shopId });
            console.log('response =>', response.payload);
            if (response) {
                //console.log('response set ', response.payload.colors[1].sizes);
                setProductId(response.payload._id);
                setChoosenColor(response.payload.colors);
                setLoader(false);
            }
        } catch (error) {
            setLoader(false);
        }
    };

    const loadFilter = async () => {
        setLoader(true);
        try {
            const response: IRGetFilterWithValue = await getFilterWithValue({ active: true });

            setLoader(false);
            if (response.status == 1) {
                setFilter(response.payload.filter);
                setDistribution(response.payload.distribution);
            }
        } catch (error) {
            setLoader(false);
        }
    };

    React.useEffect(() => {
        //console.log(update, _id, shopId);
        if (update) {
            fetchProduct();
        }
        loadFilter();
    }, []);

    // console.log('shop id', shopId);

    const removeColorFromProduct = (index: number) => {
        const data = [...choosenColor];
        data.splice(index, 1);
        setChoosenColor(data);
    };

    const deleteColorInServer = async (_id: string, index: number) => {
        try {
            setLoader(true);
            const color = await deleteProductColor({ _id, parentId: productId ? productId : '' });
            removeColorFromProduct(index);
            setLoader(false);
        } catch (error) {
            showMessage({ type: 'danger', message: error.message });
            setLoader(false);
        }
    };

    const updateColorInServer = async (index: number, item: Partial<choosenColor>) => {
        try {
            setLoader(true);
            const color = await updateProductColor({ ...item });
            let data = [...choosenColor];
            data[index] = { ...data[index], ...item };
            setChoosenColor(data);
            setLoader(false);
        } catch (error) {
            showMessage({ type: 'danger', message: error.message });
            setLoader(false);
            setCurrentDragSortIndex(-1);
        }
    };

    const deleteColorFromServer = async (_id: string, index: number) => {
        setAlertState({
            isVisible: true,
            heading: 'Delete Color',
            subHeading: 'Are you sure you want to delete this product color?',
            onPressRightButton: () => {
                deleteColorInServer(_id, index);
            },
        });
    };

    console.log('drag sort', currentDragStortIndex);
    return (
        <ProductIdContext.Provider value={{ productId: productId, setProductId: setProductId }}>
            <View style={styles.container}>
                <StatusBar statusBarColor={mainColor} />
                <HeaderWithBackButtonTitleAndrightButton
                    rightComponent={() => (
                        <WrappedFeatherIcon
                            iconName="trash-2"
                            iconColor="#FFF"
                            containerHeight={30}
                            onPress={() => {}}
                        />
                    )}
                    containerStyle={[{ padding: DSP }]}
                    title={update ? 'Update Product' : 'Create Product'}
                />
                <ScrollView contentContainerStyle={[PH(0.2)]}>
                    {distribution.length > 0 && distribution[0].filterLevel == 1 && (
                        <ButtonAddWithTitleAndSubTitle
                            title={distribution[0].name}
                            subTitle={distribution[0].description}
                            onPressPlus={() => {
                                setOpenChooseColor(true);
                            }}
                        />
                    )}
                    <Border />
                    <WrappedText
                        text="Selected color variant of product"
                        textColor={black100}
                        containerStyle={{ marginTop: DSP * 0.5 }}
                        fontSize={fs16}
                    />
                    {choosenColor.map((item: choosenColor, index: number) => (
                        <EditSelectedColor
                            onPressAddMoreImage={() => {
                                setCurrentAddMoreImage(index);
                            }}
                            item={item}
                            onPressDragSort={() => {
                                console.log('index', index);
                                setCurrentDragSortIndex(index);
                            }}
                            key={index}
                            sizes={item.sizes}
                            onPressDeleteColor={() => {
                                deleteColorFromServer(item._id, index);
                            }}
                        />
                    ))}
                    <Border />
                </ScrollView>

                <ChooseProductColors
                    isVisible={openChooseColor}
                    setPopup={() => {
                        setOpenChooseColor(false);
                    }}
                    shopId={shopId._id}
                    addColorsToChoosenArray={(color: choosenColor) => {
                        const data = [...choosenColor, color];
                        setChoosenColor(data);
                    }}
                    removeColorFromArray={removeColorFromProduct}
                    updateColorInArray={(color: Partial<choosenColor>, index: number) => {
                        const data = [...choosenColor];
                        data[index] = { ...data[index], ...color };
                        setChoosenColor(data);
                    }}
                    chosenColor={choosenColor}
                    colors={distribution.length > 0 ? distribution[0].values : []}
                    avaialbleSize={distribution.length > 1 ? distribution[1].values : []}
                />
                <ProvideSize
                    avaialbleSize={distribution.length > 1 ? distribution[1].values : []}
                    isVisible={showSizePopup}
                    setPopup={() => {
                        setShowSizePopup(false);
                        setCurrentColorIndex(-1);
                    }}
                    choosenSize={currentColorIndex > -1 ? choosenColor[currentColorIndex].sizes : []}
                    setChoosenSize={(sizes: choosenSize[]) => {
                        const data = [...choosenColor];
                        data[currentColorIndex] = { ...data[currentColorIndex], sizes };
                        setChoosenColor(data);
                    }}
                    shopId={shopId._id}
                    colorId={currentColorIndex > -1 ? choosenColor[currentColorIndex]._id : ''}
                />
                {loader && <Loader />}
            </View>
            {currentDragStortIndex > -1 && (
                <DragSort
                    data={
                        currentDragStortIndex > -1
                            ? choosenColor[currentDragStortIndex].photos.map((item, index) => {
                                  return { path: item, _id: new Date().getTime().toString() + index.toString() };
                              })
                            : []
                    }
                    isVisible={currentDragStortIndex > -1}
                    setPopup={() => {
                        console.log('ser');
                        setCurrentDragSortIndex(-1);
                    }}
                    setPhotosArrayAfterReordering={(photos: ImageOrVideo[]) => {
                        updateColorInServer(currentDragStortIndex, {
                            photos: photos.map((item) => item.path),
                            _id: choosenColor[currentDragStortIndex]._id,
                        });
                        setCurrentDragSortIndex(-1);
                    }}
                />
            )}
            {currentAddMoreImage > -1 && (
                <AddPhotoPopup
                    isVisible={currentAddMoreImage > -1}
                    setPopup={() => {
                        setCurrentAddMoreImage(-1);
                    }}
                    existingPhotos={currentAddMoreImage > -1 ? choosenColor[currentAddMoreImage].photos : []}
                    updatePhotoArray={(photos: string[]) => {
                        console.log('update =>', 'phtotos=>', photos);
                        updateColorInServer(currentAddMoreImage, {
                            photos: photos,
                            _id: choosenColor[currentAddMoreImage]._id,
                        });
                        setCurrentAddMoreImage(-1);
                    }}
                    openCamera={true}
                />
            )}
        </ProductIdContext.Provider>
    );
};

export default EditProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
});

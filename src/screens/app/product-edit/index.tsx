import { AlertContext } from '@app/../App';
import { NavigationProps } from '@app/common';
import { mainColor } from '@app/common/color';
import { BGCOLOR, DSP, PV } from '@app/common/styles';
import { HA, MHA, PBA, WA } from '@app/common/stylesheet';
import Loader from '@app/screens/component/Loader';
import StatusBar from '@app/screens/component/StatusBar';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import Border from '@app/screens/components/border/Border';
import ButtonAddWithTitleAndSubTitle from '@app/screens/components/button/ButtonAddWithTitleAndSubTitle';
import HeaderWithBackButtonTitleAndrightButton from '@app/screens/components/header/HeaderWithBackButtonTitleAndrightButton';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import { getFilterWithValue } from '@app/server/apis/filter/filter.api';
import { IRGetFilterWithValue } from '@app/server/apis/filter/filter.interface';
import { APIgetProduct } from '@app/server/apis/product/product.api';
import {
    FilterValueInterface,
    FilterInterface,
    IProduct,
    IRProduct,
    productStatus,
} from '@app/server/apis/product/product.interface';
import * as React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import {
    border,
    createProduct,
    deleteProductColor,
    deleteProductFromServer,
    updateProduct,
    updateProductColor,
} from './component/generalConfig';
import ChooseProductColors from './color/ChooseProductColors';
import EditSelectedColor from './color/EditSelectedColor';
import HowToImprove from './component/HowToImprove';
import ImproveList from './component/ImproveList';
import { choosenColor, choosenSize, ProductIdContext } from './data-types';
import CollapsibleErrorComponent from './error/CollapsibleError';
import Filter from './filter/Filter';
import AddPhotoPopup from './photo';
import DragSort from './photo/DragSort';
import ProvideSize from './size/ProvideSize';
import SizeUpdatePopup from './size/SizeUpdatePopup';
import ColorTabBar from './color/ColorTabBar';

interface EditProductProps extends NavigationProps {
    update?: boolean;
    route: {
        params: {
            update: boolean;
            _id?: string;
            shopId: string;
            parentId: string;
            reload: Function;
        };
    };
}

const EditProduct: React.FunctionComponent<EditProductProps> = ({
    navigation,
    route: {
        params: { update, _id, shopId, parentId, reload },
    },
}) => {
    const [loader, setLoader] = React.useState<boolean>(false);
    const [updateFlow, setUpdate] = React.useState(update || false);
    const [filter, setFilter] = React.useState<FilterInterface[]>([]);
    const [distribution, setDistribution] = React.useState<FilterInterface[]>([]);
    const [choosenColor, setChoosenColor] = React.useState<choosenColor[]>([]);

    const [openChooseColor, setOpenChooseColor] = React.useState(false);
    const [productId, setProductId] = React.useState(_id || '');
    const [showSizePopup, setShowSizePopup] = React.useState(false);
    const [currentColorIndex, setCurrentColorIndex] = React.useState(-1);
    const [currentDragStortIndex, setCurrentDragSortIndex] = React.useState(-1);
    const [currentAddMoreImage, setCurrentAddMoreImage] = React.useState(-1);
    const [cuurentProductSizeIndex, setCurrentProductSizeIndex] = React.useState(-1);
    const [currentColorSizeIndex, setCurrentColorSizeIndex] = React.useState<string>('');
    const [filterValues, setFilterValues] = React.useState<{}>({});
    const [productDetails, setProductDetails] = React.useState<Partial<IProduct>>({ status: productStatus.INVENTORY });

    const [errors, setErrors] = React.useState<string[]>([]);
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

    // console.log(shopId);
    const fetchProduct = async () => {
        try {
            setLoader(true);
            const response: IRProduct = await APIgetProduct({ _id: _id, shopId: shopId });
            console.log('response =>', response.payload);
            if (response) {
                //console.log('response set ', response.payload.colors[1].sizes);
                setProductId(response.payload._id);

                console.log(response.payload.colors[0]);
                setChoosenColor(response.payload.colors);
                setProductDetails(response.payload);
                setLoader(false);
            }
        } catch (error) {
            setLoader(false);
        }
    };

    const loadFilter = async () => {
        setLoader(true);
        try {
            const response: IRGetFilterWithValue = await getFilterWithValue({ shopId: shopId, parentId: parentId });

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
        let filtersV = {};
        console.log('parent id', parentId);
        if (!parentId) {
            navigation.goBack();
            ToastHOC.errorAlert('Please provide parent id');
        }
        //When both product details and filter value are available
        if (updateFlow && filter.length > 0 && Object.keys(productDetails).length > 0) {
            filter.map((item) => {
                filtersV[item.key] = productDetails[item.key] || [];
            });
            // console.log(filtersV, 'filter values here');
            setFilterValues(filtersV);
        }
    }, [productDetails, filter]);

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

    const updateProductInServer = async (data: Partial<IProduct>) => {
        try {
            setLoader(true);
            const response: IRProduct = await updateProduct({ _id: productId, ...data });
            if (response.status == 1) {
                setProductDetails({ ...productDetails, ...data });
                if (!updateFlow) {
                    setUpdate(true);
                }
                reload();
            }
            setLoader(false);
        } catch (error) {
            showMessage({ type: 'danger', message: error.message });
            setLoader(false);
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

    const deleteProduct = async () => {
        Alert.alert('Warning', 'Do you really want to delete this product it will delete all progress?', [
            {
                text: 'Yes',
                onPress: async () => {
                    try {
                        if (productId) {
                            setLoader(true);
                            const response: IRProduct = await deleteProductFromServer({ _id: productId });
                            setLoader(false);
                            if (response.status == 1) {
                                navigation.goBack();
                            }
                        } else {
                            navigation.goBack();
                        }
                    } catch (error) {
                        setLoader(false);
                        ToastHOC.errorAlert(error.message, 'Problem deleting product');
                    }
                },
            },
            {
                text: 'No',
            },
        ]);
    };

    // To prevent uncessary render used memoization for this calculation
    const [currentColorIndexOnSizeClick, currentSizeIndexOnSizeClick] = React.useMemo(() => {
        if (currentColorSizeIndex.length > 0) {
            let a = currentColorSizeIndex.split('-');
            return [+a[0], +a[1]];
        } else {
            return [-1, -1];
        }
    }, [currentColorSizeIndex]);

    // when filter value need to be updated
    const setFilterValuesCallback = React.useCallback(
        (key: string, value: FilterValueInterface[]) => {
            let filters = { ...filterValues };
            filters[key] = value;

            setFilterValues(filters);
        },
        [filterValues],
    );

    const checkError = () => {
        if (productDetails.status == productStatus.WAITINGFORAPPROVAL) {
            ToastHOC.infoAlert('Your product will be approved soon..');
        } else {
            let errors: string[] = [];
            setLoader(true);
            if (choosenColor.length > 0) {
                choosenColor.map((item) => {
                    if (item.sizes.length == 0) {
                        errors.push(item.color.name.toUpperCase() + ' color ' + 'does not have any size.');
                    }
                });
            } else {
                errors.push('Please select a color for the product');
            }
            filter.map((item) => {
                let filterSpec = filterValues[item.key];
                // console.log(filterValues, filterSpec);
                if (item.mandatory && filterSpec && filterSpec.length == 0) {
                    errors.push(item.name.toUpperCase() + ' filter does not have any value selected');
                } else if (item.mandatory && !filterSpec) {
                    errors.push(item.name.toUpperCase() + ' filter does not have any value selected');
                }
            });
            setLoader(false);

            if (errors.length > 0) setErrors(errors);
            else {
                setErrors(errors);
                let status: productStatus = productDetails.status as productStatus;
                let proStatus =
                    status == productStatus.INVENTORY
                        ? productStatus.WAITINGFORAPPROVAL
                        : status == productStatus.REJECTED
                        ? productStatus.WAITINGFORAPPROVAL
                        : status == productStatus.LIVE
                        ? productStatus.INVENTORY
                        : status == productStatus.OUTOFSTOCK
                        ? productStatus.WAITINGFORAPPROVAL
                        : productStatus.INVENTORY;

                console.log(status, productStatus, proStatus);

                updateProductInServer({ status: proStatus });
            }
        }
    };

    const productContextValue = React.useMemo(
        () => ({ productId: productId, setProductId: setProductId }),
        [productId],
    );

    return (
        <ProductIdContext.Provider value={productContextValue}>
            <View style={styles.container}>
                <StatusBar statusBarColor={mainColor} />
                <HeaderWithBackButtonTitleAndrightButton
                    rightComponent={() => {
                        if (productDetails.colors && productDetails.colors.length > 0) {
                            return (
                                <WrappedFeatherIcon
                                    iconName="delete"
                                    iconColor="#FFF"
                                    containerHeight={30}
                                    onPress={() => {
                                        deleteProduct();
                                    }}
                                />
                            );
                        } else return <View style={[HA(30), WA(30)]} />;
                    }}
                    containerStyle={[{ padding: DSP }]}
                    title={updateFlow ? 'Update Product' : 'Create Product'}
                />
                {errors.length > 0 && <CollapsibleErrorComponent error={errors} />}
                {productDetails.status == productStatus.REJECTED && <HowToImprove note={productDetails.note} />}
                <ScrollView contentContainerStyle={[PBA()]}>
                    {distribution.length > 0 && distribution[0].filterLevel == 1 && (
                        <ButtonAddWithTitleAndSubTitle
                            title={distribution[0].name}
                            subTitle={distribution[0].description}
                            onPressPlus={() => {
                                setOpenChooseColor(true);
                            }}
                            containerStyle={[MHA()]}
                        />
                    )}

                    {/* {choosenColor && choosenColor.length > 0 && (
                        <>
                            <Border />
                            <WrappedText
                                text="Selected color variant of product"
                                textColor={mainColor}
                                containerStyle={[MTA(), MHA()]}
                                fontSize={fs16}
                                fontFamily={FontFamily.Medium}
                                fontWeight={'600'}
                            />
                            <Border />
                        </>
                    )} */}

                    {/* {choosenColor.map((item: choosenColor, index: number) => (
                       
                    ))} */}
                    <Border />
                    {choosenColor.length > 0 && (
                        <ColorTabBar
                            colors={choosenColor}
                            renderItem={(item: choosenColor, index: number) => (
                                <EditSelectedColor
                                    onPressAddMoreImage={() => {
                                        setCurrentAddMoreImage(index);
                                    }}
                                    onClickEditSize={() => {
                                        setCurrentProductSizeIndex(index);
                                    }}
                                    onPressSingleSize={(sizeIndex: string) => {
                                        setCurrentColorSizeIndex(index + '-' + sizeIndex);
                                    }}
                                    item={item}
                                    onPressDragSort={() => {
                                        //   console.log('index', index);
                                        setCurrentDragSortIndex(index);
                                    }}
                                    key={index}
                                    sizes={item.sizes}
                                    onPressDeleteColor={() => {
                                        deleteColorFromServer(item._id, index);
                                    }}
                                />
                            )}
                        />
                    )}

                    {filter.length > 0 && (
                        <Filter
                            filters={filter}
                            filterValues={filterValues}
                            setFilterValues={setFilterValuesCallback}
                        />
                    )}
                </ScrollView>
                <View style={[{ paddingHorizontal: DSP }, PV(0.2), BGCOLOR('#FFFFFF'), border]}>
                    {/* <ProductCompleteCTA
                        status={productDetails?.status}
                        onPress={() => {
                            checkError();
                        }}
                    /> */}
                    <ImproveList
                        notes={productDetails.note}
                        status={productDetails.status}
                        onPress={() => {
                            checkError();
                        }}
                    />
                </View>
                <ChooseProductColors
                    isVisible={openChooseColor}
                    setPopup={() => {
                        setOpenChooseColor(false);
                    }}
                    catalogueId={parentId}
                    shopId={shopId}
                    addColorsToChoosenArray={(color: choosenColor) => {
                        const data = [...choosenColor, color];
                        if (data.length == 1) {
                            reload();
                        }
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
                    colorFilterKey={distribution.length > 0 ? distribution[0].key : ''}
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
                    shopId={shopId}
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
                        //  console.log('ser');
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
                        //   console.log('update =>', 'phtotos=>', photos);
                        updateColorInServer(currentAddMoreImage, {
                            photos: photos,
                            _id: choosenColor[currentAddMoreImage]._id,
                        });
                        setCurrentAddMoreImage(-1);
                    }}
                    openCamera={true}
                />
            )}
            {cuurentProductSizeIndex > -1 && (
                <ProvideSize
                    showBack={true}
                    avaialbleSize={distribution.length > 1 ? distribution[1].values : []}
                    isVisible={true}
                    setPopup={(a: boolean, triggerNextPopup: boolean) => {
                        setCurrentProductSizeIndex(-1);
                    }}
                    choosenSize={cuurentProductSizeIndex > -1 ? choosenColor[cuurentProductSizeIndex].sizes : []}
                    setChoosenSize={(sizes: choosenSize[]) => {
                        console.log('sized =>', sizes, cuurentProductSizeIndex);
                        // updateColorInServer(cuurentProductSizeIndex, {
                        //     sizes,
                        //     _id: choosenColor[cuurentProductSizeIndex]._id,
                        // });
                        let data = [...choosenColor];
                        data[cuurentProductSizeIndex].sizes = sizes;
                        setChoosenColor(data);
                        setCurrentProductSizeIndex(-1);
                    }}
                    shopId={shopId}
                    colorId={cuurentProductSizeIndex > -1 ? choosenColor[cuurentProductSizeIndex]._id : ''}
                />
            )}
            {currentColorIndexOnSizeClick > -1 && (
                <SizeUpdatePopup
                    isVisible={true}
                    setPopup={() => {
                        setCurrentColorSizeIndex('');
                    }}
                    index={currentSizeIndexOnSizeClick}
                    shopId={shopId}
                    item={choosenColor[currentColorIndexOnSizeClick].sizes[currentSizeIndexOnSizeClick]}
                    updateSize={(size: choosenSize) => {
                        //     console.log('update size');
                        let colors = [...choosenColor];
                        let a = { ...choosenColor[currentColorIndexOnSizeClick].sizes[currentSizeIndexOnSizeClick] };
                        a = { ...a, ...size };
                        choosenColor[currentColorIndexOnSizeClick].sizes[currentSizeIndexOnSizeClick] = a;
                        //   console.log('a ===', a);

                        setChoosenColor(colors);
                    }}
                    removeSize={() => {
                        let colors = [...choosenColor];
                        colors[currentColorIndexOnSizeClick].sizes.splice(currentSizeIndexOnSizeClick, 1);
                        setChoosenColor(colors);
                    }}
                />
            )}
        </ProductIdContext.Provider>
    );
};

export default EditProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

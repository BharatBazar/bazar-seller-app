import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { getHP, getWP } from '../../../../common/dimension';
import { colorCode, mainColor } from '../../../../common/color';
import ModalHOC from '../../../hoc/ModalHOC';
import ModalHeader from '../../../component/ModalHeader';
import { FilterValueInterface, IProductColor } from '../../../../server/apis/product/product.interface';
import { choosenColor, choosenSize, ProductIdContext, provideDefaultColorState } from '../data-types';
import WrappedText from '@app/screens/component/WrappedText';
import { AIC, BC, BGCOLOR, BR, BW, FDR, MT, MV, PL, PR } from '@app/common/styles';
import Border from '@app/screens/components/border/Border';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import Ripple from 'react-native-material-ripple';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import { FontFamily, fs14 } from '@app/common';

import { createProductColor, deleteProductColor, updateProductColor } from '../component/generalConfig';

import { showMessage } from 'react-native-flash-message';
import Loader from '@app/screens/component/Loader';
import ProvideSize from '../size/ProvideSize';
import AddPhotoPopup from '../photo';
import { MHA, PBA, PHA, PTA } from '@app/common/stylesheet';
import { useUploadImage } from '@app/hooks/useUploadImage';
import { s3BucketKeys } from '@app/server/apis/multimedia/multimedia.interface';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';

export interface ChooseProductColorsProps {
    setPopup: Function;
    isVisible: boolean;
    colors: FilterValueInterface[] | [];
    avaialbleSize: FilterValueInterface[] | [];
    chosenColor: choosenColor[];
    addColorsToChoosenArray: (color: choosenColor) => void;
    removeColorFromArray: (index: number) => void;
    shopId: string;
    updateColorInArray: (color: Partial<choosenColor>, index: number) => void;

    catalogueId: string;
    colorFilterKey: string;
}

const ChooseProductColors: React.FC<ChooseProductColorsProps> = ({
    setPopup,
    isVisible,
    colors,
    chosenColor,
    addColorsToChoosenArray,
    removeColorFromArray,
    avaialbleSize,
    shopId,
    updateColorInArray,
    catalogueId,
    colorFilterKey,
}) => {
    //getting product id from context api
    const { productId, setProductId } = React.useContext(ProductIdContext);
    const [loader, setLoader] = React.useState(false);
    const [showImageSelect, setShowImageSelect] = React.useState<boolean>(false);
    const [showSizePopup, setShowSizePopup] = React.useState(false);
    const [currentColorIndex, setCurrentColorIndex] = React.useState(-1);
    const [showPhotoPopup, setShowPhotoPopup] = React.useState(false);

    const uploadImageFunction = useUploadImage(s3BucketKeys.productImage, setLoader);

    //console.log('product DI', productId);
    const createColorInServer = async (colorChoosen: FilterValueInterface, url: [string]) => {
        try {
            setLoader(true);
            let data: IProductColor = {
                color: colorChoosen._id,
                parentId: productId ? productId : undefined,
                shopId: shopId,
                photos: url,
                catalogueId: catalogueId,
                //  filterKey: colorFilterKey,
            };

            data[colorFilterKey] = [...chosenColor.map((item) => item.color._id), colorChoosen._id];

            const color = await createProductColor(data);
            setLoader(false);
            if (!productId) {
                setProductId(color.payload.productId);
            }
            showMessage({ type: 'success', message: 'Product size created' });
            addColorsToChoosenArray(
                provideDefaultColorState(color.payload.colorId, colorChoosen, color.payload.productId, url),
            );
            setCurrentColorIndex(chosenColor.length);
            setShowSizePopup(true);
        } catch (error) {
            setLoader(false);
            showMessage({ type: 'danger', message: error.message });
        }
    };

    // React.useEffect(() => {
    //     setLoader(false);
    // }, []);
    const deleteColorInServer = async (_id: string, index: number, fitlerValueId: string) => {
        try {
            setLoader(true);
            let data = {};
            data[colorFilterKey] = [
                ...chosenColor.filter((item) => item.color._id != fitlerValueId).map((color) => color.color._id),
            ];

            const color = await deleteProductColor({ _id, parentId: productId ? productId : '', ...data });
            removeColorFromArray(index);
            setLoader(false);
        } catch (error) {
            showMessage({ type: 'danger', message: error.message });
            setLoader(false);
        }
    };

    const updateColorInServer = async (colorChoosen: Partial<choosenColor>) => {
        try {
            setLoader(true);
            const color = await updateProductColor({
                _id: colorChoosen._id,
                ...colorChoosen,
            });
            setLoader(false);

            showMessage({ type: 'success', message: 'Product size created' });
            updateColorInArray({ ...colorChoosen }, currentColorIndex);
            setCurrentColorIndex(-1);
        } catch (error) {
            setLoader(false);
            showMessage({ type: 'danger', message: error.message });
        }
    };

    const onPressColor = (
        selected: boolean,
        indexInSelectedColor: number,
        item: FilterValueInterface,
        index: number,
        url: string,
    ) => {
        if (selected) {
            deleteColorInServer(chosenColor[indexInSelectedColor]._id, indexInSelectedColor, item._id);
        } else {
            createColorInServer(item, url);
        }
    };

    return (
        <ModalHOC statusBarTranlucent isVisible={isVisible} setPopup={setPopup}>
            <View
                style={{
                    backgroundColor: colorCode.WHITE,
                    paddingTop: '5%',

                    borderTopLeftRadius: getHP(0.2),
                    borderTopRightRadius: getHP(0.2),
                }}
            >
                <ModalHeader
                    containerStyle={[PHA()]}
                    heading={'Choose Color'}
                    subHeading={'Click on the closest match of the color\navailable of the product.'}
                    setPopup={() => setPopup(false)}
                />
                <Border />

                <ScrollView style={{ maxHeight: getHP(7.8) }} contentContainerStyle={[PHA(), PBA()]}>
                    <View style={{}}>
                        {colors.map((item: FilterValueInterface, index: number) => {
                            const indexInSelectedColor = chosenColor.findIndex((color) => color.color._id == item._id);
                            const selected = indexInSelectedColor > -1;

                            const selectedStyle = selected ? [BW(1.5), BC(mainColor), BR(0.1)] : {};
                            return (
                                <View style={[selectedStyle, MT(0.2)]}>
                                    <Ripple
                                        style={arrayStyle.colorContainerStyle}
                                        onPress={async () => {
                                            const getUrl: [string] | [void] = await uploadImageFunction(
                                                false,
                                                undefined,
                                                true,
                                            );

                                            if (getUrl) {
                                                onPressColor(selected, indexInSelectedColor, item, index, getUrl);
                                            } else {
                                                ToastHOC.errorAlert('Problem while uploading image');
                                            }
                                        }}
                                    >
                                        <View
                                            style={[
                                                ...arrayStyle.colotStyle,
                                                {
                                                    backgroundColor: item.description,
                                                },
                                            ]}
                                        />
                                        <WrappedText
                                            textStyle={{ textTransform: 'capitalize' }}
                                            text={item.name.trim()}
                                            containerStyle={{ marginLeft: getWP(0.3) }}
                                            textColor={'#646464'}
                                            fontSize={fs14}
                                            fontFamily={FontFamily.Medium}
                                        />
                                    </Ripple>
                                    {selected && (
                                        <WrappedFeatherIcon
                                            iconName="check-circle"
                                            iconSize={20}
                                            onPress={() => {}}
                                            iconColor={mainColor}
                                            containerStyle={{ position: 'absolute', top: -12, right: -12 }}
                                        />
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
                <Border marginTop={0} />
                <RightComponentButtonWithLeftText
                    buttonText={'Close'}
                    containerStyle={[MV(0.2), MHA()]}
                    onPress={() => {
                        setPopup(false);
                    }}
                />
            </View>
            <ProvideSize
                avaialbleSize={avaialbleSize}
                isVisible={showSizePopup}
                setPopup={(a: boolean, triggerNextPopup: boolean) => {
                    setShowSizePopup(false);
                    //console.log('trigger nect popup', triggerNextPopup);
                    if (triggerNextPopup) {
                        setTimeout(() => {
                            setShowPhotoPopup(true);
                        }, 500);
                    } else {
                        setCurrentColorIndex(-1);
                    }
                }}
                choosenSize={currentColorIndex > -1 ? chosenColor[currentColorIndex].sizes : []}
                setChoosenSize={(sizes: choosenSize[]) => {
                    console.log('sized =>', sizes, currentColorIndex);
                    updateColorInArray({ sizes }, currentColorIndex);
                }}
                shopId={shopId}
                colorId={currentColorIndex > -1 ? chosenColor[currentColorIndex]._id : ''}
            />
            <AddPhotoPopup
                existingPhotos={currentColorIndex > -1 ? chosenColor[currentColorIndex].photos : []}
                isVisible={showPhotoPopup}
                setPopup={() => {
                    setShowPhotoPopup(false);
                    setCurrentColorIndex(-1);
                }}
                updatePhotoArray={async (photos: [string]) => {
                    setShowPhotoPopup(false);
                    //console.log('photos', chosenColor[currentColorIndex]._id, photos);
                    updateColorInServer({ photos, _id: chosenColor[currentColorIndex]._id });
                }}
                onPressDoLater={async (photos: [string]) => {
                    setShowPhotoPopup(false);
                    updateColorInServer({ photos, _id: chosenColor[currentColorIndex]._id });
                }}
            />
            {loader && <Loader />}
        </ModalHOC>
    );
};

export default ChooseProductColors;

const arrayStyle = {
    colorContainerStyle: [FDR(), BGCOLOR('#F0F0F0'), AIC(), BR(0.1), PL(0.2), PR(0.4), { paddingVertical: 10 }],
    colotStyle: [
        {
            height: 20,
            width: 20,
            borderRadius: getWP(10),
        },
        //  colorStyle,
    ],
};

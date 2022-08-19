import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { getHP, getWP } from '../../../../common/dimension';
import { colorCode } from '../../../../common/color';
import ModalHOC from '../../../hoc/ModalHOC';
import ModalHeader from '../../../component/ModalHeader';
import { IFilter } from '../../../../server/apis/product/product.interface';
import { choosenColor, choosenSize, ProductIdContext, provideDefaultColorState } from '../data-types';
import WrappedText from '@app/screens/component/WrappedText';
import { AIC, BC, BGCOLOR, BR, BW, FDR, MH, MT, MV, PL, PR } from '@app/common/styles';
import Border from '@app/screens/components/border/Border';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import Ripple from 'react-native-material-ripple';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import { DEFAULT_IMAGE_URL, FontFamily, fs14, fs16 } from '@app/common';

import { createProductColor, deleteProductColor, updateProductColor } from '../../edit/product/component/generalConfig';

import { showMessage } from 'react-native-flash-message';
import Loader from '@app/screens/component/Loader';
import ProvideSize from '../size/ProvideSize';
import AddPhotoPopup from '../photo';

export interface ChooseProductColorsProps {
    setPopup: Function;
    isVisible: boolean;
    colors: IFilter[] | [];
    avaialbleSize: IFilter[] | [];
    chosenColor: choosenColor[];
    addColorsToChoosenArray: (color: choosenColor) => void;
    removeColorFromArray: (index: number) => void;
    shopId: string;
    updateColorInArray: (color: Partial<choosenColor>, index: number) => void;
    catalogueId: string;
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
}) => {
    //getting product id from context api
    const { productId, setProductId } = React.useContext(ProductIdContext);
    const [loader, setLoader] = React.useState(false);
    const [showImageSelect, setShowImageSelect] = React.useState<boolean>(false);
    const [showSizePopup, setShowSizePopup] = React.useState(false);
    const [currentColorIndex, setCurrentColorIndex] = React.useState(-1);
    const [showPhotoPopup, setShowPhotoPopup] = React.useState(false);

    console.log('product DI', productId);
    const createColorInServer = async (colorChoosen: IFilter, index: number) => {
        try {
            setLoader(true);
            const color = await createProductColor({
                color: colorChoosen._id,
                parentId: productId ? productId : undefined,
                shopId: shopId,
                photos: [DEFAULT_IMAGE_URL],
                catalogueId: catalogueId,
            });
            setLoader(false);
            if (!productId) {
                setProductId(color.payload.productId);
            }
            showMessage({ type: 'success', message: 'Product size created' });
            addColorsToChoosenArray(
                provideDefaultColorState(color.payload.colorId, colorChoosen, color.payload.productId, [
                    DEFAULT_IMAGE_URL,
                ]),
            );
            setCurrentColorIndex(chosenColor.length);
            setShowSizePopup(true);
        } catch (error) {
            setLoader(false);
            showMessage({ type: 'danger', message: error.message });
        }
    };

    const deleteColorInServer = async (_id: string, index: number) => {
        try {
            setLoader(true);
            const color = await deleteProductColor({ _id, parentId: productId ? productId : '' });
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

    const onPressColor = (selected: boolean, indexInSelectedColor: number, item: IFilter, index: number) => {
        if (selected) {
            deleteColorInServer(chosenColor[indexInSelectedColor]._id, indexInSelectedColor);
        } else {
            createColorInServer(item, index);
        }
    };

    return (
        <ModalHOC isVisible={isVisible} setPopup={setPopup}>
            <View
                style={{
                    backgroundColor: colorCode.WHITE,
                    paddingTop: '5%',
                    paddingHorizontal: '5%',
                    borderTopLeftRadius: getHP(0.2),
                    borderTopRightRadius: getHP(0.2),
                }}
            >
                <ModalHeader
                    heading={'Choose Color'}
                    subHeading={'Click on the closest match of the color\navailable of the product.'}
                    setPopup={() => setPopup(false)}
                />
                <Border />

                <ScrollView style={{ maxHeight: getHP(5) }}>
                    <View style={{ flexWrap: 'wrap', flex: 1, flexDirection: 'row' }}>
                        {colors.map((item: IFilter, index: number) => {
                            const indexInSelectedColor = chosenColor.findIndex((color) => color.color._id == item._id);
                            const selected = indexInSelectedColor > -1;
                            console.log('selected =>', selected);
                            const selectedStyle = selected ? [BW(1), BC(item.description)] : {};
                            return (
                                <View style={[selectedStyle, MT(0.2), BR(0.4), MH(0.2)]}>
                                    <Ripple
                                        style={arrayStyle.colorContainerStyle}
                                        onPress={() => {
                                            onPressColor(selected, indexInSelectedColor, item, index);
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
                                            iconColor={item.description}
                                            containerStyle={{ position: 'absolute', top: -12, right: -12 }}
                                        />
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
                <Border marginTop={10} />
                <RightComponentButtonWithLeftText
                    buttonText={'close'}
                    containerStyle={[MV(0.2)]}
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
    colorContainerStyle: [FDR(), BGCOLOR('#F0F0F0'), AIC(), BR(0.4), PL(0.2), PR(0.4), { paddingVertical: 5 }],
    colotStyle: [
        {
            height: 20,
            width: 20,
            borderRadius: getWP(10),
        },
        //  colorStyle,
    ],
};

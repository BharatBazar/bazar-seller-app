import * as React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { getHP, getWP } from '../../../../common/dimension';
import { colorCode, mainColor } from '../../../../common/color';

import ModalHOC from '../../../hoc/ModalHOC';

import ModalHeader from '../../../component/ModalHeader';
import { IClassifier, IFilter } from '../../../../server/apis/product/product.interface';
import { choosenColor, ProductIdContext, provideDefaultColorState } from '../data-types';
import WrappedText from '@app/screens/component/WrappedText';
import { AIC, BC, BGCOLOR, BR, BW, FDR, FLEX, JCC, MH, MT, MV, PH, PL, PR, PV } from '@app/common/styles';
import Border from '@app/screens/components/border/Border';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import Ripple from 'react-native-material-ripple';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import { FontFamily, fs14, fs16 } from '@app/common';
import ImageCropPicker from 'react-native-image-crop-picker';
import { createProductColor, deleteProductColor } from '../../edit/product/component/generalConfig';
import { color } from 'react-native-reanimated';
import { showMessage } from 'react-native-flash-message';
import Loader from '@app/screens/component/Loader';
import ProvideSize from '../size/ProvideSize';

export interface ChooseProductColorsProps {
    setPopup: Function;
    isVisible: boolean;
    colors: IClassifier[] | [];
    avaialbleSize: IClassifier[] | [];
    chosenColor: choosenColor[];
    addColorsToChoosenArray: (color: choosenColor) => void;
    removeColorFromArray: (index: number) => void;
    shopId: string;
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
}) => {
    //getting product id from context api
    const { productId, setProductId } = React.useContext(ProductIdContext);
    const [loader, setLoader] = React.useState(false);
    const [showImageSelect, setShowImageSelect] = React.useState<boolean>(false);
    const [showSizePopup, setShowSizePopup] = React.useState(false);

    const openCamera = (color: IFilter) => {
        setShowImageSelect(false);
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            multiple: false,
        })
            .then((image) => {
                console.log('image => ', image);
                setShowImageSelect(false);
            })
            .catch((error) => {
                setShowImageSelect(false);
            });
    };

    const createColorInServer = async (colorChoosen: IFilter) => {
        try {
            setLoader(true);
            const color = await createProductColor({
                color: colorChoosen._id,
                parentId: productId ? productId : undefined,
                shopId: shopId,
            });
            setLoader(false);
            if (!productId) {
                setProductId(color.payload.productId);
            }
            addColorsToChoosenArray(
                provideDefaultColorState(color.payload.colorId, colorChoosen, color.payload.productId),
            );
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

    const onPressColor = (selected: boolean, indexInSelectedColor: number, item: IFilter) => {
        if (selected) {
            deleteColorInServer(chosenColor[indexInSelectedColor]._id, indexInSelectedColor);
        } else {
            createColorInServer(item);
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
                        {Array.from({ length: 20 }, () => colors)
                            .flat()
                            .map((item: IFilter, index: number) => {
                                const indexInSelectedColor = chosenColor.findIndex(
                                    (color) => color.color._id == item._id,
                                );
                                const selected = indexInSelectedColor > -1;
                                console.log('selected =>', selected);
                                const selectedStyle = selected ? [BW(1), BC(item.description)] : {};
                                return (
                                    <View style={[selectedStyle, MT(0.2), BR(0.4), MH(0.2)]}>
                                        <Ripple
                                            style={arrayStyle.colorContainerStyle}
                                            onPress={() => {
                                                onPressColor(selected, indexInSelectedColor, item);
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
                <Border marginTop={3} />
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
                setPopup={() => {
                    setShowSizePopup(false);
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

import * as React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { getHP, getWP } from '../../../../common/dimension';
import { colorCode, mainColor } from '../../../../common/color';

import ModalHOC from '../../../hoc/ModalHOC';

import ModalHeader from '../../../component/ModalHeader';
import { IFilter } from '../../../../server/apis/product/product.interface';
import { choosenColor } from '../data-types';
import WrappedText from '@app/screens/component/WrappedText';
import { AIC, BC, BGCOLOR, BR, BW, FDR, FLEX, JCC, MH, MT, MV, PH, PL, PR, PV } from '@app/common/styles';
import Border from '@app/screens/components/border/Border';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import Ripple from 'react-native-material-ripple';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import { FontFamily, fs14, fs16 } from '@app/common';
import ImageCropPicker from 'react-native-image-crop-picker';

export interface ChooseProductColorsProps {
    setPopup: Function;
    isVisible: boolean;
    colors: IFilter[] | [];
    chosenColor: choosenColor[];

    updateColorArray: Function;
}

const ChooseProductColors: React.FC<ChooseProductColorsProps> = ({
    setPopup,
    isVisible,
    colors,
    updateColorArray,
    chosenColor,
}) => {
    const [showImageSelect, setShowImageSelect] = React.useState<boolean>(false);

    const openCamera = () => {
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
                            .map((item, index) => {
                                return (
                                    <View style={[BW(1), BC(item.description), MT(0.2), BR(0.4), MH(0.2)]}>
                                        <Ripple
                                            style={[
                                                FDR(),
                                                BGCOLOR('#F0F0F0'),
                                                AIC(),
                                                BR(0.4),
                                                PL(0.2),
                                                PR(0.4),
                                                { paddingVertical: 5 },
                                            ]}
                                            onPress={() => {
                                                openCamera();
                                            }}
                                        >
                                            <View
                                                style={[
                                                    {
                                                        backgroundColor: item.description,
                                                        height: 20,
                                                        width: 20,
                                                        borderRadius: getWP(10),
                                                    },
                                                    //  colorStyle,
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
                                        <WrappedFeatherIcon
                                            iconName="check-circle"
                                            iconSize={20}
                                            iconColor={item.description}
                                            containerStyle={{ position: 'absolute', top: -12, right: -12 }}
                                        />
                                    </View>
                                );
                            })}
                    </View>
                </ScrollView>
                <Border marginTop={3} />
                <RightComponentButtonWithLeftText buttonText={'close'} containerStyle={[MV(0.2)]} onPress={() => {}} />
            </View>
        </ModalHOC>
    );
};

export default ChooseProductColors;

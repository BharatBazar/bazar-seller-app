import { DEFAULT_IMAGE_URL, FontFamily, fs10, fs13, fs14, fs15, fs16 } from '@app/common';
import { borderColor, mainColor } from '@app/common/color';
import { getHP, getWP } from '@app/common/dimension';
import {
    AIC,
    BC,
    BGCOLOR,
    BR,
    BW,
    DSP,
    FDR,
    FLEX,
    HP,
    JCC,
    MA,
    ML,
    MR,
    MT,
    PA,
    PH,
    provideShadow,
    PV,
    WP,
} from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import Border from '@app/screens/components/border/Border';
import { IFilter } from '@app/server/apis/product/product.interface';
import * as React from 'react';
import { ImageBackground, ScrollView, View, Image } from 'react-native';
import PhotoUpload from '../../edit/product/component/component/PhotoUpload';
import { border } from '../../edit/product/component/generalConfig';
import { choosenColor, choosenSize } from '../data-types';
import ImageCarousel from './ImageCarousel';

interface EditSelectedColorProps {
    item: choosenColor;
    sizes: choosenSize[];
}

const EditSelectedColor: React.FunctionComponent<EditSelectedColorProps> = ({ item, sizes }) => {
    console.log('sizes =>', sizes);
    return (
        <View style={[{ marginTop: DSP }, BC(borderColor), BW(2), BR(0.1), BGCOLOR('#FFF')]}>
            <View style={[FDR(), JCC('space-between'), AIC(), PH(0.5), PV(0.1)]}>
                <View />
                <WrappedFeatherIcon
                    iconName="trash-2"
                    iconSize={20}
                    containerHeight={30}
                    containerStyle={[BGCOLOR('#FFF'), provideShadow(2)]}
                    onPress={() => {}}
                />
            </View>
            {/* <View>
                <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: '5%', paddingVertical: '2%' }}>
                    <Image source={{ uri: DEFAULT_IMAGE_URL }} style={[BR(0.1), HP(2), WP(6), MR(0.2)]} />
                    <Image source={{ uri: DEFAULT_IMAGE_URL }} style={[BR(0.1), HP(2), WP(6), MR(0.2)]} />
                    <Image source={{ uri: DEFAULT_IMAGE_URL }} style={[BR(0.1), HP(2), WP(6), MR(0.2)]} />
                </ScrollView>
                <View
                    style={[
                        BGCOLOR('#00000066'),
                        {
                            borderRadius: 30,
                            paddingHorizontal: 6,
                            paddingVertical: 2,
                            position: 'absolute',
                            bottom: 0,
                            left: '5%',
                        },
                    ]}
                >
                    <WrappedText text={'1/7'} textColor={'#FFF'} fontSize={fs10} fontFamily={FontFamily.Bold} />
                </View>
            </View> */}
            <Border />
            <ImageCarousel
                screens={[DEFAULT_IMAGE_URL, DEFAULT_IMAGE_URL, DEFAULT_IMAGE_URL]}
                itemWidth={getWP(4)}
                renderImage={() => (
                    <ImageBackground
                        source={{ uri: DEFAULT_IMAGE_URL }}
                        imageStyle={[BR(0.1), HP(2), WP(6), MR(0.4)]}
                        style={[BR(0.1), HP(2), WP(6), MR(0.4)]}
                    >
                        <WrappedFeatherIcon
                            iconName="trash-2"
                            iconSize={15}
                            iconColor={'#FFF'}
                            containerHeight={25}
                            containerStyle={[BGCOLOR('#00000099'), { position: 'absolute', right: 5, top: 5 }]}
                            onPress={() => {}}
                        />
                    </ImageBackground>
                )}
            />

            <View
                style={[{ paddingHorizontal: DSP * 0.7, margin: 10, padding: 10 }, BGCOLOR('#FFFFFF'), border, BR(0.1)]}
            >
                <View style={[, FDR(), JCC('space-between')]}>
                    <View style={[FLEX(1)]}>
                        <WrappedText text={'Selected sizes in' + ' '} fontSize={fs15} />
                        <WrappedText
                            text={item.color.name + ' color of product.'}
                            textColor={item.color.description}
                            fontSize={fs15}
                            fontFamily={FontFamily.Medium}
                        />
                    </View>
                    <WrappedFeatherIcon
                        iconName="edit"
                        onPress={() => {}}
                        iconSize={15}
                        containerHeight={30}
                        containerStyle={[BGCOLOR('#FFF'), provideShadow(2)]}
                    />
                </View>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginTop: DSP * 0.4 }}>
                    {sizes &&
                        sizes.map((item) => (
                            <View
                                style={[
                                    BGCOLOR('#FFFFFf'),
                                    provideShadow(1),
                                    { marginLeft: 3, padding: 5, borderRadius: 5 },
                                    AIC(),
                                ]}
                            >
                                <WrappedText
                                    text={item.size.name}
                                    textColor={mainColor}
                                    fontFamily={FontFamily.Medium}
                                />

                                <WrappedText
                                    text={item.quantity + ' piece'}
                                    textColor={mainColor}
                                    fontFamily={FontFamily.Medium}
                                />
                            </View>
                        ))}
                </View>

                {/* <PhotoUpload photoError={''} setPhotoError={() => {}} /> */}
            </View>
            <Border />
        </View>
    );
};

export default EditSelectedColor;

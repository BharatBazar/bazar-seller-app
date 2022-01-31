import { DEFAULT_IMAGE_URL, FontFamily, fs13, fs14, fs15, fs16 } from '@app/common';
import { borderColor } from '@app/common/color';
import { getHP } from '@app/common/dimension';
import { AIC, BC, BGCOLOR, BR, BW, DSP, FDR, HP, JCC, MA, MT, PA, PH, provideShadow, PV } from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import Border from '@app/screens/components/border/Border';
import { IFilter } from '@app/server/apis/product/product.interface';
import * as React from 'react';
import { ImageBackground, View } from 'react-native';
import PhotoUpload from '../../edit/product/component/component/PhotoUpload';
import { choosenColor } from '../data-types';

interface EditSelectedColorProps {
    item: choosenColor;
    sizes: IFilter[];
}

const EditSelectedColor: React.FunctionComponent<EditSelectedColorProps> = ({ item, sizes }) => {
    return (
        <View style={[{ marginTop: DSP }, BC(borderColor), BW(2), BR(0.1), BGCOLOR('#FFF')]}>
            <ImageBackground
                source={{ uri: DEFAULT_IMAGE_URL }}
                style={[{ height: getHP(2), width: '100%', overflow: 'hidden' }, BR(0.1)]}
                imageStyle={{ height: getHP(2), width: '100%', resizeMode: 'cover' }}
            >
                <View style={[FDR(), JCC('space-between'), AIC(), PH(0.5), PV(0.1)]}>
                    <View />
                    <WrappedFeatherIcon
                        iconName="trash-2"
                        containerStyle={[BGCOLOR('#FFF'), provideShadow()]}
                        onPress={() => {}}
                    />
                </View>
            </ImageBackground>
            <View style={{ paddingHorizontal: DSP * 0.7 }}>
                <View style={[{ marginTop: DSP }]}>
                    <WrappedText text={'Selected sizes that are available in' + ' '} fontSize={fs15} />
                    <WrappedText
                        text={item.color.name + ' color of provided product.'}
                        textColor={item.color.description}
                        fontSize={fs15}
                        fontFamily={FontFamily.Medium}
                    />
                </View>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginTop: DSP * 0.4 }}>
                    {sizes &&
                        sizes.map((item) => (
                            <View
                                style={[
                                    {
                                        height: 30,
                                        width: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: 20,
                                        marginRight: 10,
                                    },
                                    provideShadow(),
                                ]}
                            >
                                <WrappedText text={item.name} />
                            </View>
                        ))}
                </View>
                <Border />
                <PhotoUpload photoError={''} setPhotoError={() => {}} />
            </View>
        </View>
    );
};

export default EditSelectedColor;

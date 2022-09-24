import { DEFAULT_IMAGE_URL, FontFamily, fs12, fs14, fs15 } from '@app/common';
import { mainColor } from '@app/common/color';
import { getWP } from '@app/common/dimension';
import { AIC, BGCOLOR, BR, DSP, FDR, FLEX, HP, JCC, ML, MR, provideShadow, WP } from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import Border from '@app/screens/components/border/Border';
import ButtonFeatherIconRightText from '@app/screens/components/button/ButtonFeatherIconWithRightText';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import * as React from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import { border } from '../../edit/product/component/generalConfig';
import { choosenColor, choosenSize } from '../data-types';
import ImageCarousel from './ImageCarousel';

interface EditSelectedColorProps {
    item: choosenColor;
    sizes: choosenSize[];
    onPressDeleteColor: Function;
    onPressDragSort: Function;
    onPressAddMoreImage: Function;
    onClickEditSize: Function;
    onPressSingleSize: Function;
}

const EditSelectedColor: React.FunctionComponent<EditSelectedColorProps> = ({
    item,
    sizes,
    onPressDeleteColor,
    onPressDragSort,
    onPressAddMoreImage,
    onClickEditSize,
    onPressSingleSize,
}) => {
    //console.log('sizes =>', item.photos);

    const imageBackgroundStyle = [BR(0.1), { height: 80, width: 120 }, MR(0.4)];
    return (
        <View style={[{ marginTop: DSP }, provideShadow(2), BR(0.2), BGCOLOR('#FFF')]}>
            <View style={[FDR(), JCC('space-between'), AIC(), { marginHorizontal: DSP * 1.5, marginTop: DSP * 0.8 }]}>
                <View style={[FDR(), AIC()]}>
                    <View style={[BGCOLOR(item.color.description), { height: 20, width: 20, borderRadius: 100 }]} />
                    <WrappedText
                        text={'Product ' + item.color.name + ' color details'}
                        //textColor={item.color.description}
                        fontSize={fs15}
                        fontFamily={FontFamily.Medium}
                        containerStyle={[ML(0.2), { marginTop: 0 }]}
                    />
                </View>
                <WrappedFeatherIcon
                    iconName="delete"
                    iconSize={20}
                    containerHeight={30}
                    containerStyle={[BGCOLOR('#FFF'), provideShadow(2)]}
                    onPress={() => {
                        onPressDeleteColor();
                    }}
                />
            </View>

            <Border marginTop={10} borderStyle={[{ marginHorizontal: DSP * 1.5 }]} />
            <View style={{ marginTop: 10 }} />
            <ImageCarousel
                onPressDragSort={() => {
                    onPressDragSort();
                }}
                onPressAddMoreImage={() => {
                    onPressAddMoreImage();
                }}
                screens={item.photos}
                itemWidth={getWP(4)}
                renderImage={(item) => {
                    return (
                        <View>
                            <ImageBackground
                                source={{ uri: item }}
                                imageStyle={imageBackgroundStyle}
                                style={imageBackgroundStyle}
                            >
                                <WrappedFeatherIcon
                                    iconName="delete"
                                    iconSize={13}
                                    iconColor={'#FFF'}
                                    containerHeight={22}
                                    containerStyle={[BGCOLOR('#00000099'), { position: 'absolute', right: 7, top: 7 }]}
                                    onPress={() => {}}
                                />
                            </ImageBackground>
                        </View>
                    );
                }}
            />

            <View
                style={[
                    { paddingHorizontal: DSP * 0.7, margin: DSP * 1.5, padding: 10 },
                    BGCOLOR('#FFFFFF'),
                    border,
                    BR(0.1),
                ]}
            >
                <View style={[, FDR(), JCC('space-between'), AIC(sizes.length == 0 ? 'center' : 'flex-start')]}>
                    <View style={[FLEX(1)]}>
                        <WrappedText
                            text={sizes.length == 0 ? 'No Selected Sizes' : 'Selected sizes' + ' '}
                            fontSize={sizes.length == 0 ? fs12 : fs14}
                            fontFamily={FontFamily.Medium}
                            containerStyle={{ marginTop: 0 }}
                            textColor={sizes.length == 0 ? '#00000066' : '#00000066'}
                        />
                    </View>
                    <WrappedFeatherIcon
                        iconName="edit"
                        onPress={() => {
                            onClickEditSize();
                        }}
                        iconSize={15}
                        containerHeight={30}
                        containerStyle={[BGCOLOR('#FFF'), provideShadow(2)]}
                    />
                </View>

                {sizes && sizes.length > 0 && (
                    <View style={styles.editButtonContainerStyle}>
                        {sizes &&
                            sizes.map((item, index) => (
                                <ButtonFeatherIconRightText
                                    iconColor="#FFFFFF"
                                    containerStyle={[BGCOLOR(mainColor), styles.editButtonStyle]}
                                    iconSize={fs12}
                                    iconName="edit"
                                    textStyle={{ marginLeft: 5, textAlign: 'center' }}
                                    onPress={() => {
                                        onPressSingleSize(index);
                                    }}
                                    buttonText={
                                        item.size
                                            ? item.size.name +
                                              ' ' +
                                              item.size.description +
                                              '\n' +
                                              item.quantity +
                                              ' piece'
                                            : ''
                                    }
                                />
                            ))}
                    </View>
                )}
            </View>
        </View>
    );
};

export default EditSelectedColor;

const styles = StyleSheet.create({
    editButtonStyle: {
        borderRadius: 4,
        //padding: 5,
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginLeft: 5,
        marginTop: 4,
    },
    editButtonContainerStyle: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: DSP * 0.4,
    },
});

import * as React from 'react';
import WrappedRectangleButton from '../../component/WrappedRectangleButton';
import { View, ViewStyle } from 'react-native';
import { colorCode, mainColor } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import WrappedText from '../../component/WrappedText';
import Icon from 'react-native-vector-icons/Feather';
import { fs10, fs20 } from '../../../common';
import { product } from '../../../server/apis/catalogue/catalogue.interface';
import { FastImageWrapper } from '../../component/FastImage';
import { AIC, BGCOLOR, BR, FDR, H, HP, ML, provideShadow, W } from '../../../common/styles';
import * as Animatable from 'react-native-animatable';
import GeneralText from '@app/screens/components/text/GeneralText';

type ViewOrTouchProps = {
    children: React.ReactChild;
    touch?: boolean;
    onPress?: Function;
    containerStyle: ViewStyle[];
};
const ProvideButtonOrView: React.FC<ViewOrTouchProps> = ({ children, touch = true, containerStyle, onPress }) => {
    return touch ? (
        <WrappedRectangleButton
            containerStyle={containerStyle}
            onPress={() => {
                if (onPress) onPress();
            }}
        >
            {children}
        </WrappedRectangleButton>
    ) : (
        <View style={containerStyle}>{children}</View>
    );
};

export interface ShowSubCategoryProps {
    item: product;
    onPress: Function;
    touch?: boolean;
    active: boolean;
    paddingVertical?: string;
    height?: number;
    paddingLeft?: number;
}

const ShowSubCategory: React.FC<ShowSubCategoryProps> = ({
    item,
    onPress,
    touch = true,
    active,
    height,
    paddingLeft,
}) => {
    return (
        <ProvideButtonOrView
            touch={touch}
            onPress={onPress}
            containerStyle={[
                {
                    height: height || getHP(0.8),
                    justifyContent: 'center',
                    backgroundColor: colorCode.WHITE,
                    paddingLeft: paddingLeft || '5%',
                    borderBottomWidth: 0.5,
                    borderColor: colorCode.BLACKLOW(20),
                    paddingHorizontal: '5%',
                },
            ]}
        >
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={[FDR(), AIC()]}>
                    {/* <View style={[HP(0.2), W(getHP(0.2)), BR(2), BGCOLOR(mainColor)]} /> */}

                    <FastImageWrapper
                        source={{ uri: item.image }}
                        imageStyle={{
                            height: height ? height * 0.8 : getHP(0.6),
                            width: height ? height * 0.8 : getHP(0.6),
                            borderRadius: getHP(0.05),
                        }}
                        resizeMode={'cover'}
                    />
                    <View style={[ML(0.4)]}>
                        {/* <GeneralText
                                text={item.path.reduce((a, b) => a + (a.length > 0 ? ' --> ' : '') + b.name, '')}
                                fontSize={fs10}
                                fontFamily={'Medium'}
                                textColor={mainColor}
                            /> */}
                        <WrappedText text={item.type} textColor={colorCode.BLACKLOW(60)} />
                        {/* <WrappedText text={'0'} textColor={colorCode.BLACK} /> */}
                    </View>
                </View>
                <Animatable.View
                    style={{ transform: [{ rotate: active ? '-90deg' : !touch ? '90deg' : '0deg' }] }}
                    transition={'rotation'}
                >
                    <Icon
                        name={'chevron-right'}
                        size={height ? height * 0.4 : getHP(0.3)}
                        color={colorCode.BLACKLOW(60)}
                    />
                </Animatable.View>
            </View>
        </ProvideButtonOrView>
    );
};

export default ShowSubCategory;

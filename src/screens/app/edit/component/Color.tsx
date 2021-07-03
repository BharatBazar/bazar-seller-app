import * as React from 'react';

import { View, ViewStyle } from 'react-native';
import { AIC, BGCOLOR, FDR, provideShadow } from '../../../../common/styles';
import WrappedText from '../../../component/WrappedText';
import { getHP, getWP } from '../../../../common/dimension';
import { colorCode, mainColor } from '../../../../common/color';
import WrappedRectangleButton from '../../../component/WrappedRectangleButton';

import WrappedFeatherIcon from '../../../component/WrappedFeatherIcon';
import { fs20 } from '../../../../common';
import { ToastHOC } from '../../../hoc/ToastHOC';
import { IClassifier } from '../../../../server/apis/product/product.interface';

export interface ColorProps {
    item: IClassifier;
    selected: boolean;
    onPress: Function;
    showCancel?: boolean;
    colorStyle?: ViewStyle;
}

const Color: React.FC<ColorProps> = ({ item, onPress, showCancel, colorStyle, selected }) => {
    return (
        <WrappedRectangleButton
            containerStyle={[{ flex: colorStyle ? 0 : 1 }, selected ? (colorStyle ? {} : provideShadow()) : {}]}
            onPress={() => {
                if (!showCancel && !selected) {
                    onPress();
                } else {
                    ToastHOC.infoAlert(
                        'You cannot delete a product color by clicking on delete button on product color area.',
                    );
                }
            }}
        >
            <View style={[FDR(), BGCOLOR(colorCode.WHITE), AIC()]}>
                <View
                    style={[
                        {
                            backgroundColor: item.description,
                            height: getHP(0.7),
                            width: getHP(0.7),
                        },
                        colorStyle,
                    ]}
                />
                <WrappedText
                    text={item.name.trim()}
                    containerStyle={{ marginLeft: colorStyle ? getWP(0.1) : getWP(0.5) }}
                    textColor={selected ? mainColor : null}
                />
                {showCancel && (
                    <WrappedFeatherIcon
                        iconSize={fs20}
                        iconName={'x'}
                        onPress={() => {}}
                        containerStyle={{ position: 'absolute', top: 0, right: 0 }}
                    />
                )}
            </View>
        </WrappedRectangleButton>
    );
};

export default Color;

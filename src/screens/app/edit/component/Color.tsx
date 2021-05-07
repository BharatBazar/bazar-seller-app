import * as React from 'react';

import { View, ViewStyle } from 'react-native';
import { BGCOLOR, commonStyles } from '../../../../common/styles';
import WrappedText from '../../../component/WrappedText';
import { getHP, getWP } from '../../../../common/dimension';
import { colorCode, mainColor } from '../../../../common/color';
import WrappedRectangleButton from '../../../component/WrappedRectangleButton';
import { Icolor } from '../Edit';
import WrappedFeatherIcon from '../../../component/WrappedFeatherIcon';
import { fs20 } from '../../../../common';
import { ToastHOC } from '../../../hoc/ToastHOC';

export interface ColorProps {
    item: Icolor;
    onPress: Function;
    showCancel?: boolean;
    colorStyle?: ViewStyle;
}

const Color: React.FC<ColorProps> = ({ item, onPress, showCancel, colorStyle }) => {
    return (
        <WrappedRectangleButton
            containerStyle={[
                { flex: colorStyle ? 0 : 1 },
                item.selected ? (colorStyle ? {} : { ...commonStyles.shadow }) : {},
            ]}
            onPress={() => {
                if (!showCancel && !item.selected) {
                    onPress();
                } else {
                    ToastHOC.infoAlert(
                        'You cannot delete a product color by clicking on delete button on product color area.',
                    );
                }
            }}
        >
            <View style={[commonStyles.fdr, BGCOLOR(colorCode.WHITE), commonStyles.aic]}>
                <View
                    style={[
                        {
                            backgroundColor: item.colorCode,
                            height: getHP(0.7),
                            width: getHP(0.7),
                        },
                        colorStyle,
                    ]}
                />
                <WrappedText
                    text={item.name.trim()}
                    containerStyle={{ marginLeft: colorStyle ? getWP(0.1) : getWP(0.5) }}
                    textColor={item.selected ? mainColor : null}
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

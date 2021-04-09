import * as React from 'react';

import { View } from 'react-native';
import { BGCOLOR, commonStyles } from '../../../../common/styles';
import WrappedText from '../../../component/WrappedText';
import { getHP, getWP } from '../../../../common/dimension';
import { colorCode, mainColor } from '../../../../common/color';
import WrappedRectangleButton from '../../../component/WrappedRectangleButton';
import { Icolor } from '../CreateProduct';
import WrappedFeatherIcon from '../../../component/WrappedFeatherIcon';
import { fs20 } from '../../../../common';

export interface ColorProps {
    item: Icolor;
    onPress: Function;
    showCancel?: boolean;
}

const Color: React.FC<ColorProps> = ({ item, onPress, showCancel }) => {
    return (
        <WrappedRectangleButton
            containerStyle={[{ flex: 1 }, item.selected ? { ...commonStyles.shadow } : {}]}
            onPress={() => {
                if (!showCancel) {
                    onPress();
                }
            }}
        >
            <View style={[commonStyles.fdr, BGCOLOR(colorCode.WHITE)]}>
                <View
                    style={{
                        backgroundColor: item.colorCode,
                        height: getHP(0.7),
                        width: getHP(0.7),
                    }}
                />
                <WrappedText
                    text={item.name.trim()}
                    containerStyle={{ marginLeft: getWP(0.5) }}
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

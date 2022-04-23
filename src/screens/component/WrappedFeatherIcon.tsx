import * as React from 'react';
import { ActivityIndicator, ViewStyle } from 'react-native';
import { colorCode, mainColor } from '../../common/color';
import WrappedRectangleButton from './WrappedRectangleButton';
import Icon from 'react-native-vector-icons/Feather';
import WrappedRoundButton from './WrappedRoundButton';
import { fs20 } from '../../common';
import { getHP } from '../../common/dimension';

export interface WrappedFeatherIconProps {
    onPress: Function;
    iconName: string;
    iconSize?: number;
    containerHeight?: number;
    iconColor?: string;
    containerStyle?: ViewStyle | ViewStyle[];
}

const WrappedFeatherIcon: React.FC<WrappedFeatherIconProps> = ({
    onPress,
    containerStyle,
    iconColor,
    iconName,
    iconSize,
    containerHeight,
    
}) => {
    return (
        <WrappedRoundButton
            containerStyle={[containerStyle]}
            onPress={() => {
                onPress();
            }}
            height={containerHeight || getHP(0.4)}
        >
            <Icon name={iconName} color={iconColor || mainColor} size={iconSize || fs20} />
        </WrappedRoundButton>
    );
};

export default WrappedFeatherIcon;

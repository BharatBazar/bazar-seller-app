import { fs20 } from '@app/common';
import { mainColor } from '@app/common/color';
import { getHP } from '@app/common/dimension';
import WrappedRoundButton from '@app/screens/component/WrappedRoundButton';
import * as React from 'react';
import { ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export interface ButtonMaterialIconsProps {
    onPress: Function;
    iconName: string;
    iconSize?: number;
    containerHeight?: number;
    iconColor?: string;
    containerStyle?: ViewStyle | ViewStyle[];
    disabled?: boolean;
}

const ButtonMaterialIcons: React.FC<ButtonMaterialIconsProps> = ({
    onPress,
    containerStyle,
    iconColor,
    iconName,
    iconSize,
    containerHeight,
    disabled,
}) => {
    return (
        <WrappedRoundButton
            disabled={disabled}
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

export default ButtonMaterialIcons;

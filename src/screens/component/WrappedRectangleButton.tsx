import * as React from 'react';
import { ViewStyle } from 'react-native';
import Ripple from 'react-native-material-ripple';

export interface WrappedRectangleButtonProps {
    containerStyle?: ViewStyle[] | ViewStyle;
    children: React.ReactChild;
    onPress: Function;
    rippleRadius?: number;
}

const WrappedRectangleButton: React.SFC<WrappedRectangleButtonProps> = ({
    containerStyle,
    children,
    onPress,
    rippleRadius,
}) => {
    return (
        <Ripple
            //android_ripple={{ color: '#00000033', radius: rippleRadius || 200 }}
            onPress={() => {
                onPress();
            }}
            style={[containerStyle]}
        >
            {children && children}
        </Ripple>
    );
};

export default WrappedRectangleButton;

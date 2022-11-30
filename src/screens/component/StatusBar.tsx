import * as React from 'react';
import { StatusBarStyle, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';


export const STATUS_BAR_HEIGHT = getStatusBarHeight();

export interface StatusBarProps {
    statusBarColor?: string;
    statusBarStyle?: StatusBarStyle;
}

const StatusBar: React.FC<StatusBarProps> = ({ statusBarColor, statusBarStyle }) => {
    return (
        <View
            style={{
                paddingTop: STATUS_BAR_HEIGHT,
                backgroundColor: statusBarColor,
            }}
        />
    );
};

export default StatusBar;

import * as React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Platform, View, StatusBarStyle } from 'react-native';

export const STATUS_BAR_HEIGHT = getStatusBarHeight();

export interface StatusBarProps {
    statusBarColor?: string;
    statusBarStyle?: StatusBarStyle;
}

const StatusBar: React.FC<StatusBarProps> = ({ statusBarColor, statusBarStyle }) => {
    return (
        <View
            style={{
                height: STATUS_BAR_HEIGHT,
                backgroundColor: statusBarColor,
            }}
        />
    );
};

export default StatusBar;

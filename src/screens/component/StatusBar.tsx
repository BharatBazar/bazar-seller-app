import * as React from 'react';
import { Component } from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { View } from 'react-native';
import { colorCode } from '../../common/color';

export const STATUS_BAR_HEIGHT = getStatusBarHeight();

export interface StatusBarProps {
    statusBarColor?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ statusBarColor }) => {
    return <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: statusBarColor || colorCode.WHITE }} />;
};

export default StatusBar;

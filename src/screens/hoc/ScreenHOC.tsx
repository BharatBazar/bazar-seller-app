import * as React from 'react';
import { Component } from 'react';
import { View, StatusBar, StatusBarStyle } from 'react-native';
import { BGCOLOR, FLEX } from '../../common/styles';
import { STATUS_BAR_HEIGHT } from '../component/StatusBar';

export interface ScreenHOCProps {
    children: React.ReactChild;
    statusbarColor?: string;
    screenColor?: string;
    translucent?: boolean;
    barStyle?: StatusBarStyle | null | undefined;
    showHideTransition?: 'fade' | 'slide' | 'none' | null | undefined;
}

const ScreenHOC: React.FC<ScreenHOCProps> = ({
    children,
    statusbarColor,
    screenColor,
    translucent,
    barStyle,
    showHideTransition,
}) => {
    return (
        <View style={[FLEX(1), BGCOLOR(screenColor)]}>
            <StatusBar
                barStyle={barStyle || 'dark-content'}
                translucent={translucent}
                backgroundColor={translucent ? '#0000001A' : statusbarColor || '#FFFFFF'}
                animated={true}
                showHideTransition={showHideTransition || 'fade'}
            />
            <View style={{ paddingTop: STATUS_BAR_HEIGHT, backgroundColor: statusbarColor }} />
            {children && children}
        </View>
    );
};

export default ScreenHOC;

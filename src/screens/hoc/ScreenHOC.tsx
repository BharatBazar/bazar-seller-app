import * as React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import StatusBar from '../component/StatusBar';

export interface ScreenHOCProps {
    children: React.ReactChild;
    statusbarColor?: string;
}

const ScreenHOC: React.FC<ScreenHOCProps> = ({ children, statusbarColor }) => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar statusBarColor={statusbarColor} />
            {children && children}
        </View>
    );
};

export default ScreenHOC;

import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontFamily, fs10 } from '@app/common';
import { mainColor } from '@app/common/color';
import { choosenColor } from '../data-types';
import { DSP } from '@app/common/styles';

const Tab = createMaterialTopTabNavigator();

interface ColorTabBarProps {
    colors: choosenColor[];
    renderItem: (item: choosenColor, index: number) => void;
}

const ColorTabBar: React.FunctionComponent<ColorTabBarProps> = ({ colors, renderItem }) => {
    return (
        <Tab.Navigator
            screenOptions={{
                lazy: true,
                tabBarLabelStyle: { fontSize: fs10, fontFamily: FontFamily.Medium },
                tabBarIndicatorStyle: { backgroundColor: mainColor },
                tabBarAllowFontScaling: false,
                swipeEnabled: false,
                tabBarScrollEnabled: true,
                tabBarActiveTintColor: mainColor,
            }}
            tabBarPosition={'top'}
        >
            {colors.map((item, index) => (
                <Tab.Screen
                    name={item.color.name}
                    options={{ tabBarLabel: item.color.name, title: item.color.name }}
                    children={(props) => renderItem(item, index)}
                />
            ))}
        </Tab.Navigator>
    );
};

export default ColorTabBar;

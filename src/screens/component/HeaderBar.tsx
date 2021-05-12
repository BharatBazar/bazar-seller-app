import React, { Component } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { fs13, fs28 } from '../../common';
import { colorCode, mainColor } from '../../common/color';
import { getHP, getWP } from '../../common/dimension';
import { AIC, BGCOLOR, FDR, PH, PV } from '../../common/styles';
import WrappedText from './WrappedText';

interface Props {
    containerStyle?: ViewStyle | ViewStyle[];
    statusBarColor: string;
    headerBackgroundColor: string;
}
class HeaderBar extends Component<Props, {}> {
    state = {};
    render() {
        const { containerStyle, statusBarColor, headerBackgroundColor } = this.props;

        return (
            <View style={[styles.container, containerStyle]}>
                <View style={[BGCOLOR(headerBackgroundColor), AIC(), FDR(), PV(0.1)]}>
                    <WrappedText
                        text={'Create your dukan'}
                        textColor={mainColor}
                        fontSize={fs28}
                        textStyle={{ marginLeft: getWP(0.5) }}
                    />
                    <WrappedText
                        text={'in 5 simple steps'}
                        textColor={colorCode.CHAKRALOW(60)}
                        fontSize={fs13}
                        textStyle={{ marginLeft: getWP(0.1) }}
                    />
                </View>
            </View>
        );
    }
}

export default HeaderBar;

const styles = StyleSheet.create({
    container: {
        //height: getHP(0.5),
        backgroundColor: colorCode.WHITE,
    },
    statusbar: {
        height: getStatusBarHeight(),
    },
});

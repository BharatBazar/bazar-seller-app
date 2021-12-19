import React, { Component } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { fs13, fs14, fs16, fs28 } from '../../common';
import { borderColor, colorCode, mainColor } from '../../common/color';
import { getHP, getWP } from '../../common/dimension';
import { AIC, BGCOLOR, FDR, PH, provideShadow, PV } from '../../common/styles';
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
            <View style={[styles.container, containerStyle, provideShadow(2)]}>
                <View style={styles.statusbar} />
                <View style={[BGCOLOR(headerBackgroundColor), AIC(), PV(0.2)]}>
                    <WrappedText
                        text={'Create your dukan'}
                        textColor={mainColor}
                        fontSize={fs16}
                        textStyle={{ marginLeft: getWP(0.5), alignSelf: 'center' }}
                    />
                    {/* <WrappedText
                        text={'in 5 simple steps'}
                        textColor={colorCode.CHAKRALOW(60)}
                        fontSize={fs13}
                        textStyle={{ marginLeft: getWP(0.1) }}
                    /> */}
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
        borderBottomWidth: 1,
        borderColor: borderColor,
    },
    statusbar: {
        height: getStatusBarHeight(),
    },
});

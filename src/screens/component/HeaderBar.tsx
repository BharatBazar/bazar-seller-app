import React, { Component } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { fs13, fs28 } from '../../common';
import { colorCode } from '../../common/color';
import { getHP, getWP } from '../../common/dimension';
import { AIC, FDR } from '../../common/styles';
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
                <View style={[styles.statusbar, { backgroundColor: statusBarColor || undefined }]} />
                <View
                    style={[
                        {
                            backgroundColor: headerBackgroundColor,
                            height: getHP(0.5),
                        },
                        AIC(),
                        FDR(),
                    ]}
                >
                    <WrappedText
                        text={'Create your dukan'}
                        textColor={colorCode.CHAKRALOW(60)}
                        fontSize={fs28}
                        textStyle={{ marginLeft: getWP(0.5) }}
                    />
                    <WrappedText
                        text={'in 4 simple steps'}
                        textColor={colorCode.CHAKRALOW(20)}
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
        height: getHP(0.5) + getStatusBarHeight(),
        backgroundColor: colorCode.WHITE,
    },
    statusbar: {
        height: getStatusBarHeight(),
    },
});

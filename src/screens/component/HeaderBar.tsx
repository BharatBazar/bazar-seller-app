import React, { Component } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { fs12, fs13, fs20, fs28 } from '../../common';
import { colorCode } from '../../common/color';
import { getHP, getWP } from '../../common/dimension';
import { commonStyles } from '../../common/styles';
import WrappedText from './WrappedText';

interface Props {
    containerStyle?: ViewStyle;
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
                        commonStyles.aic,
                        commonStyles.fdr,
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
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    statusbar: {
        height: getStatusBarHeight(),
    },
});

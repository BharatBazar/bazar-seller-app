import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colorCode } from '../../common/color';
import { BGCOLOR, BR, commonStyles, MH, MV, PH, PV } from '../../common/styles';
import WrappedRectangleButton from '../component/WrappedRectangleButton';
import WrappedText from '../component/WrappedText';
import ScreenHOC from '../hoc/ScreenHOC';
import { GlobalText, WelcomeText } from '../../common/customScreenText';
import { fs12, fs18, fs28 } from '../../common';
import { NavigationKey } from '../../labels';

export interface WelcomeProps {}

export interface WelcomeState {}

class Welcome extends React.Component<WelcomeProps, WelcomeState> {
    render() {
        const componentProps = {
            buttonProps: {
                containerStyle: styles.buttonContainerStyle,
            },
            buttonTextProps: {
                textColor: colorCode.WHITE,
            },
        };

        return (
            <ScreenHOC>
                <View style={[{ flex: 1 }, PH(0.3), BGCOLOR(colorCode.WHITE)]}>
                    <WrappedText text={GlobalText.companyName} fontSize={fs28} />
                    <WrappedText text={GlobalText.companyMessage} fontSize={fs12} />
                    <View style={styles.buttonsWrapper}>
                        <WrappedRectangleButton
                            {...componentProps.buttonProps}
                            onPress={() => {
                                this.props.navigation.navigate(NavigationKey.OPENDUKAN);
                            }}
                        >
                            <WrappedText text={WelcomeText.SHOP_EXIST} {...componentProps.buttonTextProps} />
                        </WrappedRectangleButton>
                        <WrappedRectangleButton
                            {...componentProps.buttonProps}
                            onPress={() => {
                                this.props.navigation.navigate(NavigationKey.AUTHNAVIGATOR);
                            }}
                        >
                            <WrappedText text={WelcomeText.SHOP_NOT_EXIST} {...componentProps.buttonTextProps} />
                        </WrappedRectangleButton>
                    </View>
                </View>
            </ScreenHOC>
        );
    }
}

export default Welcome;

const styles = StyleSheet.create({
    buttonContainerStyle: {
        ...PH(),
        ...PV(),
        ...MH(0.3),
        ...BR(),
        ...MV(),
        ...commonStyles.alcjcc,
        borderWidth: 1,
        borderColor: colorCode.SAFFRON,
        backgroundColor: colorCode.CHAKRALOW(70),
    },
    buttonsWrapper: {
        ...commonStyles.absoluteBottomWrapper,
        bottom: '5%',
    },
});

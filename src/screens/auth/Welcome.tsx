import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colorCode } from '../../common/color';
import { AIC, BR, FLEX, JCC, MV, PH, PV } from '../../common/styles';
import WrappedRectangleButton from '../component/WrappedRectangleButton';
import WrappedText from '../component/WrappedText';
import ScreenHOC from '../hoc/ScreenHOC';
import { GlobalText, WelcomeText } from '../../common/customScreenText';
import { FontFamily, fs12, fs28, NavigationProps } from '../../common';
import { NavigationKey } from '../../labels';
import { setUpAxios } from '../../server';
import { STATUS_BAR_HEIGHT } from '../component/StatusBar';

export interface WelcomeProps extends NavigationProps {}

export interface WelcomeState {}

class Welcome extends React.Component<WelcomeProps, WelcomeState> {
    componentDidMount() {
        setUpAxios();
    }
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
                <View style={[PV(0.2), FLEX(1), PH(0.5), { paddingTop: STATUS_BAR_HEIGHT }]}>
                    <WrappedText text={GlobalText.companyName} fontSize={fs28} fontFamily={FontFamily.RobotBold} />
                    <WrappedText
                        text={GlobalText.companyMessage}
                        fontSize={fs12}
                        fontFamily={FontFamily.RobotoMedium}
                    />
                    <View style={[FLEX(1), AIC(), JCC()]}>
                        <WrappedText text={'Some graphic will come here ...'} textColor={colorCode.BLACKLOW(20)} />
                    </View>

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

        ...BR(),
        ...MV(),
        ...AIC(),
        ...JCC(),
        borderWidth: 1,
        borderColor: colorCode.SAFFRON,
        backgroundColor: colorCode.CHAKRALOW(70),
    },
    buttonsWrapper: {
        bottom: 0,
    },
});

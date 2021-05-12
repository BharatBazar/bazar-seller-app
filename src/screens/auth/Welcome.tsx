import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colorCode } from '../../common/color';
import { AIC, BGCOLOR, BR, commonStyles, FLEX, HP, JCC, MH, MV, PH, PT, PV } from '../../common/styles';
import WrappedRectangleButton from '../component/WrappedRectangleButton';
import WrappedText from '../component/WrappedText';
import ScreenHOC from '../hoc/ScreenHOC';
import { GlobalText, WelcomeText } from '../../common/customScreenText';
import { fs12, fs18, fs28, NavigationProps } from '../../common';
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
            <ScreenHOC translucent={true}>
                <ScrollView style={[PV(0.2), FLEX(1), PH(0.5), { paddingTop: STATUS_BAR_HEIGHT }]}>
                    <WrappedText text={GlobalText.companyName} fontSize={fs28} />
                    <WrappedText text={GlobalText.companyMessage} fontSize={fs12} />
                    <View style={[FLEX(1), AIC(), JCC()]}>
                        <WrappedText text={'Some graphic will come here ...'} textColor={colorCode.BLACKLOW(20)} />
                    </View>
                    <View style={[HP(10)]} />
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
                </ScrollView>
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
        ...commonStyles.alcjcc,
        borderWidth: 1,
        borderColor: colorCode.SAFFRON,
        backgroundColor: colorCode.CHAKRALOW(70),
    },
    buttonsWrapper: {
        // ...commonStyles.absoluteBottomWrapper,
        // bottom: '5%',
        bottom: 0,
    },
});

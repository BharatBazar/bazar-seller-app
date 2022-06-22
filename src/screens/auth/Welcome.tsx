import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colorCode } from '../../common/color';
import { AIC, DSP, FLEX, JCC, PA } from '../../common/styles';
import WrappedText from '../component/WrappedText';
import ScreenHOC from '../hoc/ScreenHOC';
import { GlobalText, WelcomeText } from '../../common/customScreenText';
import { FontFamily, fs12, fs14, fs40, NavigationProps } from '../../common';
import { NavigationKey } from '../../labels';
import RightComponentButtonWithLeftText from '../components/button/RightComponentButtonWithLeftText';
import { commonButtonProps } from '../components/button';

export interface WelcomeProps extends NavigationProps {}

export interface WelcomeState {}

class Welcome extends React.Component<WelcomeProps, WelcomeState> {
    // constructor() {
    //     super();
    //     this.state = {
    //       theme:Appearance.getColorScheme()
    //     };
    //     console.log(this.state.theme);
    //   }

    render() {
        return (
            <ScreenHOC>
                <View style={[PA(DSP), FLEX(1)]}>
                    <WrappedText
                        text={GlobalText.companyName}
                        fontSize={fs40}
                        fontFamily={FontFamily.Medium}
                        textColor={'#242424'}
                    />

                    <WrappedText
                        text={GlobalText.companyMessage}
                        fontSize={fs12}
                        textColor={'#8A8A8A'}
                        fontFamily={FontFamily.Medium}
                    />
                    <View style={[FLEX(1), AIC(), JCC()]}>
                        <WrappedText text={'Some graphic will come here ...'} textColor={colorCode.BLACKLOW(20)} />
                    </View>

                    <View style={styles.buttonsWrapper}>
                        <RightComponentButtonWithLeftText
                            onPress={() => {
                                this.props.navigation.navigate(NavigationKey.OPENDUKAN);
                            }}
                            buttonText={WelcomeText.SHOP_EXIST}
                            {...commonButtonProps}
                        />
                        <RightComponentButtonWithLeftText
                            onPress={() => {
                                this.props.navigation.replace(NavigationKey.AUTHNAVIGATOR);
                            }}
                            {...commonButtonProps}
                            buttonText={WelcomeText.SHOP_NOT_EXIST}
                        />
                    </View>
                </View>
            </ScreenHOC>
        );
    }
}

export default Welcome;

const styles = StyleSheet.create({
    buttonContainerStyle: {
        // ...PH(),
        // ...PV(),

        // ...BR(),
        // ...MV(),
        // ...AIC(),
        // ...JCC(),
        borderWidth: 1,
        borderColor: colorCode.SAFFRON,
        backgroundColor: colorCode.CHAKRALOW(70),
    },
    buttonsWrapper: {
        //bottom: 0,
        marginBottom: 10,
    },
});

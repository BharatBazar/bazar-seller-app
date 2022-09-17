import * as React from 'react';
import { View, Animated, Easing } from 'react-native';
import { FontFamily } from '@app/common';
import { colorCode, mainColor } from '@app/common/color';
import { getWP } from '@app/common/dimension';
import { AIC, BGCOLOR, H, HP, JCC } from '@app/common/styles';
import WrappedText from '@app/screens/component/WrappedText';
import { PTA } from '@app/common/stylesheet';

interface SignupProgressBarProps {
    step: number;
}

const TotalProgressBarWidth = getWP(10);
const TotalStep = 5;
const ProgressPerStep = TotalProgressBarWidth / TotalStep;
const progressBarHeight = 13;
const progressBarHeightStyle = H(progressBarHeight);
const stepFontSize = progressBarHeight * 0.7;

const SignupProgressBar: React.FunctionComponent<SignupProgressBarProps> = ({ step }) => {
    const progressBarWidth = new Animated.Value(0);

    React.useEffect(() => {
        Animated.timing(progressBarWidth, {
            toValue: step == 0 ? 0 : ProgressPerStep * step,
            duration: 200,
            useNativeDriver: false,
            easing: Easing['linear'],
        }).start();
    }, [step]);

    return (
        <View style={[AIC(), JCC(), PTA(5)]}>
            {/* <WrappedText
                text={
                    step == 0
                        ? 'Hurray! You have initiated first step towards your growth'
                        : step == 4
                        ? 'Hurray! You are just one step away from completing account creation'
                        : `You are just ${TotalStep - step} steps away from creating your dukan`
                }
                fontFamily={FontFamily.Medium}
                textAlign={'center'}
                containerStyle={[PHA()]}
                fontSize={fs12}
                textColor={colorCode.SAFFRON}
            /> */}

            <View
                style={[
                    { width: TotalProgressBarWidth },
                    progressBarHeightStyle,

                    // MTA(10),
                    BGCOLOR(colorCode.BLACKLOW(10)),
                ]}
            >
                <View
                    style={[
                        { width: ProgressPerStep * (step + 1), position: 'absolute' },
                        progressBarHeightStyle,
                        //  BR(2),
                        BGCOLOR(colorCode.CHAKRALOW(10)),
                    ]}
                />
                <Animated.View
                    style={[
                        { width: progressBarWidth, position: 'absolute' },
                        progressBarHeightStyle,
                        BGCOLOR(mainColor),
                    ]}
                />
                <View style={[{ width: TotalProgressBarWidth }, H(20)]}>
                    <WrappedText
                        text={'0'}
                        textColor={'#fff'}
                        fontSize={stepFontSize}
                        fontFamily={FontFamily.Bold}
                        containerStyle={{ position: 'absolute', left: 1, alignSelf: 'center' }}
                    />

                    <WrappedText
                        text={1}
                        textColor={'#fff'}
                        fontSize={stepFontSize}
                        fontFamily={FontFamily.Bold}
                        containerStyle={{ position: 'absolute', left: ProgressPerStep * 1 - 10 }}
                    />

                    <WrappedText
                        text={2}
                        textColor={'#fff'}
                        fontSize={stepFontSize}
                        fontFamily={FontFamily.Bold}
                        containerStyle={{ position: 'absolute', left: ProgressPerStep * 2 - 10 }}
                    />
                    <WrappedText
                        text={3}
                        textColor={'#fff'}
                        fontSize={stepFontSize}
                        fontFamily={FontFamily.Bold}
                        containerStyle={{ position: 'absolute', left: ProgressPerStep * 3 - 10 }}
                    />
                    <WrappedText
                        text={4}
                        textColor={'#fff'}
                        fontSize={stepFontSize}
                        fontFamily={FontFamily.Bold}
                        containerStyle={{ position: 'absolute', left: ProgressPerStep * 4 - 10 }}
                    />
                    <WrappedText
                        text={5}
                        textColor={'#fff'}
                        fontSize={stepFontSize}
                        fontFamily={FontFamily.Bold}
                        containerStyle={{ position: 'absolute', left: ProgressPerStep * 5 - 20 }}
                    />
                </View>
            </View>
        </View>
    );
};

export default SignupProgressBar;

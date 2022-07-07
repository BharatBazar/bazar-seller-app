import * as React from 'react';
import { View, Animated, Easing } from 'react-native';
import { FontFamily, fs8 } from '@app/common';
import { colorCode, mainColor } from '@app/common/color';
import { getWP } from '@app/common/dimension';
import { AIC, BGCOLOR, H, JCC } from '@app/common/styles';
import WrappedText from '@app/screens/component/WrappedText';
import { PTA } from '@app/common/stylesheet';

interface ProgressBarProps {
    step: number;
    totalStep: number;
    totalWidth: number;
    height?: number;
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({ step, totalStep, totalWidth, height }) => {
    const progressBarWidth = React.useRef(new Animated.Value(0)).current;
    let ProgressPerStep = React.useRef(totalWidth / totalStep).current;

    React.useEffect(() => {
        Animated.timing(progressBarWidth, {
            toValue: step == 0 ? 0 : ProgressPerStep * step,
            duration: 300,

            useNativeDriver: false,
            easing: Easing['linear'],
        }).start();
    }, [step]);

    return (
        <View style={[AIC(), JCC()]}>
            <View
                style={[
                    { width: totalWidth },
                    H(height || 20),

                    // MTA(10),
                    BGCOLOR(colorCode.BLACKLOW(10)),
                ]}
            >
                {/* <View
                    style={[
                        { width: ProgressPerStep * (step + 1), position: 'absolute' },
                        H(height || 20),
                        //  BR(2),
                        BGCOLOR(colorCode.CHAKRALOW(10)),
                    ]}
                /> */}
                <Animated.View
                    style={[{ width: progressBarWidth, position: 'absolute' }, H(height || 20), BGCOLOR(mainColor)]}
                />
                <View style={[{ width: totalWidth }, H(height || 20)]}>
                    <WrappedText
                        text={'0'}
                        textColor={'#fff'}
                        fontSize={height ? height * 0.7 : fs8}
                        fontFamily={FontFamily.Bold}
                        containerStyle={{ position: 'absolute', left: 1, alignSelf: 'center' }}
                    />

                    <WrappedText
                        text={1}
                        textColor={'#fff'}
                        fontSize={height ? height * 0.7 : fs8}
                        fontFamily={FontFamily.Bold}
                        containerStyle={{ position: 'absolute', left: ProgressPerStep * 1 - 10 }}
                    />

                    <WrappedText
                        text={2}
                        textColor={'#fff'}
                        fontSize={height ? height * 0.7 : fs8}
                        fontFamily={FontFamily.Bold}
                        containerStyle={{ position: 'absolute', left: ProgressPerStep * 2 - 10 }}
                    />
                    <WrappedText
                        text={3}
                        textColor={'#fff'}
                        fontSize={height ? height * 0.7 : fs8}
                        fontFamily={FontFamily.Bold}
                        containerStyle={{ position: 'absolute', left: ProgressPerStep * 3 - 10 }}
                    />
                    <WrappedText
                        text={4}
                        textColor={'#fff'}
                        fontSize={height ? height * 0.7 : fs8}
                        fontFamily={FontFamily.Bold}
                        containerStyle={{ position: 'absolute', left: ProgressPerStep * 4 - 10 }}
                    />
                    <WrappedText
                        text={5}
                        textColor={'#fff'}
                        fontSize={height ? height * 0.7 : fs8}
                        fontFamily={FontFamily.Bold}
                        containerStyle={{ position: 'absolute', left: ProgressPerStep * 5 - 20 }}
                    />
                </View>
            </View>
        </View>
    );
};

export default ProgressBar;

import * as React from 'react';
import { View } from 'react-native';
import { fs20 } from '../../common';
import { mainColor } from '../../common/color';
import { AIC, BGCOLOR, FLEX, JCC } from '../../common/styles';
import WrappedText from '../component/WrappedText';

export interface SplashProps {}

const Splash: React.FC<SplashProps> = () => {
    return (
        <View style={[FLEX(1), BGCOLOR(mainColor), AIC(), JCC()]}>
            <WrappedText text={'Splash Screen'} textColor={'#FFFFFF'} fontSize={fs20} />
        </View>
    );
};

export default Splash;

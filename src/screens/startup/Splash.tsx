import * as React from 'react';
import { View } from 'react-native';
import { fs20, NavigationProps } from '../../common';
import { mainColor } from '../../common/color';
import { AIC, BGCOLOR, FLEX, JCC } from '../../common/styles';
import { NavigationKey } from '../../labels';
import WrappedText from '../component/WrappedText';

export interface SplashProps extends NavigationProps {}

const Splash: React.FC<SplashProps> = ({ navigation }) => {
    React.useEffect(() => {
        navigation.navigate(NavigationKey.WELCOME);
    }, []);

    return (
        <View style={[FLEX(1), BGCOLOR(mainColor), AIC(), JCC()]}>
            <WrappedText text={'Splash Screen'} textColor={'#FFFFFF'} fontSize={fs20} />
        </View>
    );
};

export default Splash;

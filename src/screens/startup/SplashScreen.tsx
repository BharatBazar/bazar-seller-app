import * as React from 'react';
import { Alert, View } from 'react-native';
import { fs20, NavigationProps } from '../../common';
import { mainColor } from '../../common/color';
import { AIC, BGCOLOR, FLEX, JCC } from '../../common/styles';
import { NavigationKey } from '../../labels';
import { Storage, StorageItemKeys } from '../../storage';
import WrappedText from '../component/WrappedText';

export interface SplashProps extends NavigationProps {}

const Splash: React.FC<SplashProps> = ({ navigation }) => {
    const checkAppState = async () => {
        //navigation.replace(NavigationKey.BHARATBAZARHOME);
        //return;

        try {
            const token = await Storage.getItem(StorageItemKeys.Token);

            if (token) {
                const isSignupComplete = await Storage.getItem(StorageItemKeys.isSignupCompleted);
                console.log(isSignupComplete, isSignupComplete == false);
                if (isSignupComplete == undefined || isSignupComplete == false) {
                    const screenName = await Storage.getItem(StorageItemKeys.currentScreen);
                    if (!screenName) {
                        navigation.replace(NavigationKey.WELCOME);
                        return;
                    }
                    let ownerDetails = await Storage.getItem(StorageItemKeys.userDetail);

                    if (screenName != NavigationKey.VERIFICATION) {
                        navigation.replace(NavigationKey.AUTHNAVIGATOR, { screen: screenName, ownerDetails });
                        return;
                    } else {
                        navigation.replace(screenName, { screen: screenName, ownerDetails });
                        return;
                    }
                } else if (isSignupComplete) {
                    navigation.replace(NavigationKey.BHARATBAZARHOME);
                    return;
                } else {
                    navigation.replace(NavigationKey.WELCOME);
                    return;
                }
            } else {
                navigation.replace(NavigationKey.WELCOME);
                return;
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Sorry!!', 'We cant fetch internal mobile state close and reopen app');
        }
    };

    React.useEffect(() => {
        checkAppState();
    }, []);

    return (
        <View style={[FLEX(1), BGCOLOR(mainColor), AIC(), JCC()]}>
            <WrappedText text={'Splash Screen'} textColor={'#FFFFFF'} fontSize={fs20} />
        </View>
    );
};

export default Splash;

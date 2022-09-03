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
        try {
            const token = await Storage.getItem(StorageItemKeys.Token);

            //already logged in
            if (token) {
                // varaible name itself explains its use
                // It is usefull to skip falling in the redirection flow if customer onboarding is completed
                // when ever user opens app
                // await Storage.setItem(StorageItemKeys.currentScreen, NavigationKey.PRODUCTDETAILS);
                // await Storage.setItem(StorageItemKeys.isCustomerOnboardingCompleted, true);

                const isCustomerOnboardingCompleted = await Storage.getItem(
                    StorageItemKeys.isCustomerOnboardingCompleted,
                );
                const screenName = await Storage.getItem(StorageItemKeys.currentScreen);
                console.log('Onboarding Completed'); // Add by garvit
                console.log(isCustomerOnboardingCompleted, screenName);
                if (screenName == undefined) {
                    console.log('replaced1'); //add by gar
                    navigation.replace(NavigationKey.WELCOME);
                    return;
                }
                let ownerDetails = await Storage.getItem(StorageItemKeys.userDetail);

                if (isCustomerOnboardingCompleted == undefined || isCustomerOnboardingCompleted == false) {
                    //It tells that what is current screen in onboarding flow
                    console.log('Screen Name G'); //Add by garvit
                    console.log(screenName, 'screen Name');
                    if (screenName != NavigationKey.VERIFICATION && screenName != NavigationKey.PRODUCTDETAILS) {
                        navigation.replace(NavigationKey.AUTHNAVIGATOR, { screen: screenName, ownerDetails });
                        return;
                    } else {
                        navigation.replace(screenName, { screen: screenName, ownerDetails });
                        return;
                    }
                } else if (isCustomerOnboardingCompleted) {
                    //It tells that what is current screen in onboarding flow
                    if (screenName) {
                        {
                            navigation.replace(screenName, { ownerDetails });
                            return;
                        }
                    } else {
                        navigation.replace(NavigationKey.BHARATBAZARHOME, { ownerDetails });
                        return;
                    }
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

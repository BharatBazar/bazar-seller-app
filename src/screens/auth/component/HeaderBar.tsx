import useLogout from '@app/hooks/useLogout';
import { NavigationKey } from '@app/labels';
import React from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { FontFamily, fs16, fs18 } from '../../../common';
import { borderColor, colorCode, mainColor } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import { AIC, BGCOLOR, FDR, JCC, PH, provideShadow, PV } from '../../../common/styles';
import WrappedFeatherIcon from '../../component/WrappedFeatherIcon';
import WrappedText from '../../component/WrappedText';
import { AlertContext } from '@app/../App';
import { IdefaultAlertState } from '@app/hooks/useAlert';
import { useRoute } from '@react-navigation/native';
import { STATUS_BAR_HEIGHT } from '../../component/StatusBar';
import { GENERAL_PADDING, PHA, PTA, PVA } from '@app/common/stylesheet';
import SignupProgressBar from './ProgressBar';

interface OnboardingHeaderProps {
    containerStyle?: ViewStyle | ViewStyle[];
    statusBarColor: string;
    headerBackgroundColor: string;
    shopOwner?: boolean;
    goBack?: any;
    showBackButton: boolean;
    step: number;
}

const OnboardingHeader: React.FunctionComponent<OnboardingHeaderProps> = ({
    containerStyle,
    statusBarColor,
    headerBackgroundColor,
    goBack,
    showBackButton,
    step,

    shopOwner,
}) => {
    const setAlertState: (data: IdefaultAlertState) => void = React.useContext(AlertContext);
    const setLogout = useLogout();
    const route = useRoute();

    return (
        <View style={[styles.container, containerStyle, provideShadow(2)]}>
            <View style={[FDR(), AIC(), JCC('space-between'), PHA()]}>
                <WrappedFeatherIcon
                    onPress={() => {
                        if (showBackButton) {
                            goBack();
                        } else {
                            setAlertState({
                                isVisible: true,
                                heading: 'Logout',
                                subHeading:
                                    'Are you sure you want to logout ?\nYou can login with same number and continue on your account',
                                onPressRightButton: () => {
                                    setLogout(true);
                                },
                            });
                        }
                    }}
                    iconName={showBackButton ? 'arrow-back' : 'close'}
                    iconColor={mainColor}
                    containerHeight={getHP(0.5)}
                    containerStyle={[provideShadow(), BGCOLOR(colorCode.WHITE)]}
                />
                <View style={[BGCOLOR(headerBackgroundColor), AIC()]}>
                    <WrappedText
                        text={'Create your dukan'}
                        textColor={mainColor}
                        fontSize={fs18}
                        fontFamily={FontFamily.Medium}
                        textStyle={{ alignSelf: 'center' }}
                    />
                </View>

                <View style={{ height: 50, width: 40 }} />

                {/* {showBackButton ? (
                    <View style={{ height: 50, width: 40 }} />
                ) : (
                    <WrappedFeatherIcon
                        iconName="logout"
                        onPress={() => {
                            setAlertState({
                                isVisible: true,
                                heading: 'Logout',
                                subHeading: 'Are you sure you want to logout !',
                                onPressRightButton: () => {
                                    // deleteShopFromServerStorage();
                                    // console.log("delete");
                                    // Alert.alert("HELLO")
                                    setLogout(true);
                                },
                            });
                        }}
                    />
                )} */}
            </View>
            <SignupProgressBar step={step} />
        </View>
    );
};

export default OnboardingHeader;

const styles = StyleSheet.create({
    container: {
        //height: getHP(0.5),
        backgroundColor: colorCode.WHITE,
        borderBottomWidth: 1,
        paddingTop: STATUS_BAR_HEIGHT,
        borderColor: borderColor,
    },
    statusbar: {
        height: getStatusBarHeight(),
    },
});

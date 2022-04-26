import useLogout from '@app/hooks/useLogout';
import { NavigationKey } from '@app/labels';
import React, { Component } from 'react';
import { View, StyleSheet, ViewStyle, Alert } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { fs13, fs14, fs16, fs28 } from '../../common';
import { borderColor, colorCode, mainColor } from '../../common/color';
import { getHP, getWP } from '../../common/dimension';
import { AIC, BGCOLOR, colorTransparency, FDR, JCC, PH, provideShadow, PV } from '../../common/styles';
import { commonButtonProps } from '../components/button';
import RightComponentButtonWithLeftText from '../components/button/RightComponentButtonWithLeftText';
import WrappedFeatherIcon from './WrappedFeatherIcon';
import WrappedText from './WrappedText';
import { AlertContext } from '@app/../App';
import { defaultAlertState, IdefaultAlertState } from '@app/hooks/useAlert';

interface Props {
    containerStyle?: ViewStyle | ViewStyle[];
    statusBarColor: string;
    headerBackgroundColor: string;
}

interface OnboardingHeaderProps {}

const OnboardingHeader: React.FunctionComponent<OnboardingHeaderProps> = ({
    containerStyle,
    statusBarColor,
    headerBackgroundColor,
    navigation
  
}) => {
    const setAlertState: (data: IdefaultAlertState) => void = React.useContext(AlertContext);
    const setLogout = useLogout();
    return (
        <View style={[styles.container, containerStyle, provideShadow(2)]}>
            <View style={styles.statusbar} />
            <View style={[FDR(), AIC(), JCC('space-between'), PH(0.5)]}>
                <View />

                {/* <WrappedFeatherIcon
                                onPress={() => {
                                   navigation.goBack()
                                }}
                                iconName={'arrow-left'}
                                iconColor="#000"
                                containerHeight={getHP(0.5)}
                                containerStyle={[provideShadow(), BGCOLOR(colorCode.WHITE)]}
                            />
                */}
                
                <View style={[BGCOLOR(headerBackgroundColor), AIC(), PV(0.2)]}>
                    <WrappedText
                        text={'Create your dukan'}
                        textColor={mainColor}
                        fontSize={fs16}
                        textStyle={{ alignSelf: 'center' }}
                    />
                </View>

                <WrappedFeatherIcon
                    iconName="log-out"
                    onPress={() => {
                        setAlertState({
                            isVisible: true,
                            heading: 'Logout',
                            subHeading: 'Are you sure you want to logout !',
                            onPressRightButton: () => {
                                // deleteShopFromServerStorage();
                                // console.log("delete");
                                // Alert.alert("HELLO")
                                setLogout(true)
                            },
                        });
                    }}
                />
            </View>
        </View>
    );
};

export default OnboardingHeader;

const styles = StyleSheet.create({
    container: {
        //height: getHP(0.5),
        backgroundColor: colorCode.WHITE,
        borderBottomWidth: 1,
        borderColor: borderColor,
    },
    statusbar: {
        height: getStatusBarHeight(),
    },
});

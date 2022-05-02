import useLogout from '@app/hooks/useLogout';
import { NavigationKey } from '@app/labels';
import React, { Component, useEffect } from 'react';
import { View, StyleSheet, ViewStyle, Alert, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { fs13, fs14, fs16, fs28 } from '../../common';
import { borderColor, colorCode, mainColor } from '../../common/color';
import { getHP, getWP } from '../../common/dimension';
import { AIC, BGCOLOR, colorTransparency, FDR, JCC, PH, provideShadow, PV } from '../../common/styles';
import { commonButtonProps } from '../components/button';
import RightComponentButtonWithLeftText from '../components/button/RightComponentButtonWithLeftText';
import WrappedFeatherIcon from './WrappedFeatherIcon';
import WrappedText from './WrappedText';
import { AlertContext, HeaderContext } from '@app/../App';
import { defaultAlertState, IdefaultAlertState } from '@app/hooks/useAlert';
import { useFocusEffect, useNavigationContainerRef } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

interface Props {
    containerStyle?: ViewStyle | ViewStyle[];
    statusBarColor: string;
    headerBackgroundColor: string;
    shopOwner?:boolean,
    goBack?:any,
    thisProps?:any
}

interface OnboardingHeaderProps {}

const OnboardingHeader: React.FunctionComponent<OnboardingHeaderProps> = ({
    containerStyle,
    statusBarColor,
    headerBackgroundColor,
    goBack,
    thisProps,
    
    shopOwner
  
}) => {
    const setAlertState: (data: IdefaultAlertState) => void = React.useContext(AlertContext);
    const setLogout = useLogout();
    const route = useRoute();
    const { header,setHeader } = React.useContext(HeaderContext);

 
    
//    console.log("ROUTE ==>",  thisProps.navigation.getState().params);
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
              {header?(
                  <WrappedFeatherIcon
                  onPress={() => {
                    goBack()
                    setHeader(false)
                }}
                   
                    iconName={'arrow-left'}
                    iconColor="#000"
                    containerHeight={getHP(0.5)}
                    containerStyle={[provideShadow(), BGCOLOR(colorCode.WHITE)]}
                />
              ):(<Text>BACKK</Text>)
            }
                
                <View style={[BGCOLOR(headerBackgroundColor), AIC(), PV(0.2)]}>
                    <WrappedText
                        text={'Create your dukan'}
                        textColor={mainColor}
                        fontSize={fs16}
                        textStyle={{ alignSelf: 'center' }}
                    />
                </View>

                {shopOwner?(<Text></Text>):(
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
                )}
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

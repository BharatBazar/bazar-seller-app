import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { FontFamily, fs14, fs18, fs20, NavigationProps } from '../../../common';
import WrappedRectangleButton from '../../component/WrappedRectangleButton';
import { NavigationKey } from '../../../labels';
import WrappedText from '../../component/WrappedText';
import { getHP, getWP } from '../../../common/dimension';
import { AIC, BGCOLOR, BR, FDR, M, MH, provideShadow, P } from '../../../common/styles';
import { black100, mainColor } from '../../../common/color';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Storage, StorageItemKeys } from '../../../storage';
import { IshopMember } from '../../../server/apis/shopMember/shopMember.interface';
import { STATUS_BAR_HEIGHT } from '../../component/StatusBar';

export const SideMenu = (props: DrawerContentComponentProps & NavigationProps) => {
    async function logOut() {
        try {
            Object.values(StorageItemKeys).forEach(async (value) => {
                await Storage.removeItem(value);
            });

            props.navigation.reset({
                index: 0,
                routes: [
                    {
                        name: NavigationKey.SPLASH,
                    },
                ],
            });
        } catch (error) {}
    }
    const [userDetail, setUserDetail] = React.useState({ name: '', phoneNumber: '' });

    const setUserDetails = async () => {
        try {
            const userDetails: IshopMember = await Storage.getItem(StorageItemKeys.userDetail);
            setUserDetail({ name: userDetails.name, phoneNumber: userDetails.phoneNumber });
        } catch (error) {}
    };
    React.useEffect(() => {
        setUserDetails();
    }, []);
    return (
        <View style={styles.container}>
            {/* <View style={[{ height: STATUS_BAR_HEIGHT }, BGCOLOR(mainColor)]} /> */}
            <View>
                <View style={[provideShadow(), BGCOLOR(mainColor), M(0.1), P(0.2), BR(0.1)]}>
                    <WrappedText
                        text={'Hi! ' + userDetail.name}
                        textColor={'#FFFFFF'}
                        fontSize={fs20}
                        fontFamily={FontFamily.RobotBold}
                    />
                    <WrappedText text={userDetail.phoneNumber} textColor={'#FFFFFF'} />
                </View>
            </View>
            <WrappedRectangleButton
                containerStyle={[styles.containerStyle, provideShadow(), BGCOLOR('#FFFFFF'), MH(0.2)]}
                onPress={() => {
                    logOut();
                }}
            >
                <View style={[FDR(), AIC()]}>
                    <MaterialIcon name={'logout'} size={fs18} />
                    <WrappedText text={'Logout'} textStyle={styles.textStyle} />
                </View>
            </WrappedRectangleButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: '100%', backgroundColor: '#F6F6F6', borderRadius: getHP(0.1) },
    pressableStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: getWP(0.1),
        borderRadius: 0,
    },
    containerStyle: {
        flexDirection: 'row',
        paddingHorizontal: '5%',
        paddingVertical: '4%',

        borderRadius: getWP(0.2),
    },
    textStyle: {
        color: black100,
        fontSize: fs14,
        fontFamily: FontFamily.RobotoRegular,
        marginLeft: getWP(0.5),
    },
    iconStyle: {
        height: getHP(0.2),
    },
});

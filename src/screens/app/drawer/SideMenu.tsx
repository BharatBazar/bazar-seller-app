import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { FontFamily, fs12, fs14, fs18, fs20, NavigationProps } from '../../../common';
import WrappedRectangleButton from '../../component/WrappedRectangleButton';
import { NavigationKey } from '../../../labels';
import WrappedText from '../../component/WrappedText';
import { getHP, getWP } from '../../../common/dimension';
import { AIC, BGCOLOR, BR, FDR, M, MH, provideShadow, P, AS, FLEX, JCC, BW, BC } from '../../../common/styles';
import { black100, borderColor, mainColor } from '../../../common/color';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Storage, StorageItemKeys } from '../../../storage';
import { IshopMember } from '../../../server/apis/shopMember/shopMember.interface';
import { STATUS_BAR_HEIGHT } from '../../component/StatusBar';
import { BRA, GENERAL_PADDING, MBA, MHA, MTA } from '@app/common/stylesheet';

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
            setUserDetail({
                name: userDetails.firstName + ' ' + userDetails.lastName,
                phoneNumber: userDetails.phoneNumber,
            });
        } catch (error) {}
    };
    React.useEffect(() => {
        setUserDetails();
    }, []);
    return (
        <View style={styles.container}>
            {/* <View style={[{ height: STATUS_BAR_HEIGHT }, BGCOLOR(mainColor)]} /> */}
            <View>
                <View style={[BGCOLOR(mainColor), MTA(), MHA(), P(0.2), BRA(10)]}>
                    <WrappedText
                        text={'Hi! ' + userDetail.name}
                        textColor={'#FFFFFF'}
                        fontSize={fs20}
                        fontFamily={FontFamily.Bold}
                    />
                    <WrappedText text={userDetail.phoneNumber} textColor={'#FFFFFF'} />
                </View>
            </View>
            <View style={[MHA(), BGCOLOR('#FFFFFF'), provideShadow(2), BRA(10), MTA()]}>
                <WrappedRectangleButton containerStyle={[styles.containerStyle]} onPress={() => {}}>
                    <View style={[FDR(), AIC()]}>
                        <MaterialIcon name={'person'} size={fs18} />
                        <WrappedText text={'Member Details'} textStyle={styles.textStyle} />
                    </View>
                </WrappedRectangleButton>
                <View style={[BW(0.5), BC(borderColor), MHA()]} />

                <WrappedRectangleButton containerStyle={[styles.containerStyle]} onPress={() => {}}>
                    <View style={[FDR(), AIC()]}>
                        <MaterialIcon name={'edit'} size={fs18} />
                        <WrappedText text={'Shop Details'} textStyle={styles.textStyle} />
                    </View>
                </WrappedRectangleButton>
                <View style={[BW(0.5), BC(borderColor), MHA()]} />
                <WrappedRectangleButton
                    containerStyle={[styles.containerStyle]}
                    onPress={() => {
                        props.navigation.navigate(NavigationKey.PRODUCTDETAILS, {
                            ownerDetails: userDetail,
                            update: true,
                        });
                    }}
                >
                    <View style={[FDR(), AIC()]}>
                        <MaterialIcon name={'checkroom'} size={fs18} />
                        <WrappedText text={'Catalogue'} textStyle={styles.textStyle} />
                    </View>
                </WrappedRectangleButton>
                <View style={[BW(0.5), BC(borderColor), MHA()]} />
                <WrappedRectangleButton
                    containerStyle={[styles.containerStyle]}
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
            {/* <WrappedText
                text={'App Version 1.2'}
                textStyle={styles.textStyle}
                containerStyle={[FLEX(1), JCC('flex-end'), MBA(), AIC()]}
            /> */}
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
        color: 'grey',
        fontSize: fs12,
        fontFamily: FontFamily.Medium,
        marginLeft: getWP(0.5),
    },
    iconStyle: {
        height: getHP(0.2),
    },
});

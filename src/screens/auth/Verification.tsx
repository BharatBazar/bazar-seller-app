import * as React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { FontFamily, fs12, fs14, fs18, fs20, fs28, NavigationProps } from '../../common';
import { getHP, getWP } from '../../common/dimension';
import { AIC, BC, BGCOLOR, BR, BW, FDR, FLEX, HP, JCC, MT, MV, PH, PV } from '../../common/styles';
import WrappedText from '../component/WrappedText';
import StatusBar from '../component/StatusBar';
import { IshopMember, shopMemberRole } from '../../server/apis/shopMember/shopMember.interface';
import { mainColor } from '../../common/color';
import { IRGetShop, IRShopVerification, verificationStatus } from '../../server/apis/shop/shop.interface';
import { deleteShop, getShop, getShopVerificationDetails } from '../../server/apis/shop/shop.api';
import { ToastHOC } from '../hoc/ToastHOC';
import TextButton from '../component/TextButton';
import { buttonContainerStyle, componentProps } from '../../common/containerStyles';
import { NavigationKey } from '../../labels';
import { border } from '../app/edit/product/component/generalConfig';
import WrappedFeatherIcon from '../component/WrappedFeatherIcon';
import StepIndicator from 'react-native-step-indicator';
import { CommonApiResponse } from '../../server/apis/common.interface';
import { Storage, StorageItemKeys } from '../../storage';
import Loader from '../component/Loader';
export interface VerificationProps extends NavigationProps {
    route: {
        params: {
            ownerDetails: IshopMember;
        };
    };
}

const labels = ['Your dukan is registered with us.', 'Dukan verification in process.', 'Dukan is verified.'];
const customStyles = {
    stepIndicatorSize: getHP(0.5),
    currentStepIndicatorSize: getHP(0.7),
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: mainColor,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: mainColor,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: mainColor,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: mainColor,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: mainColor,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: mainColor,
};

const Section = (propertyName: string, value: string) => (
    <View style={[FDR(), JCC('space-between'), MV()]}>
        <WrappedText text={propertyName} fontSize={fs14} />

        <WrappedText text={value} textColor={'#8a8a8a'} fontSize={fs14} />
    </View>
);

const showMemberDetails = (details: IshopMember[], role: shopMemberRole, dukanName: string) => {
    if (details.length == 0) {
        return <WrappedText text={'There is no ' + role + ' in your shop.'} />;
    } else {
        return details.map((item) => (
            <View style={[border, PV(), MV(), PH(), BR(0.1)]} key={item.phoneNumber}>
                <View style={[FDR(), JCC('space-between')]}>
                    <WrappedText
                        text={dukanName + ' ' + role + ' details'}
                        textColor={mainColor}
                        fontSize={fs18}
                        containerStyle={{ flex: 1 }}
                    />
                    <WrappedFeatherIcon
                        iconName={'edit'}
                        onPress={() => {}}
                        containerStyle={{ marginTop: 0, marginHorizontal: getWP(0.2) }}
                    />
                </View>
                <View style={[MT(0.1)]} />
                {Section('First Name', item.firstName)}
                {Section('Last Name', item.lastName)}
                {Section('Phone Number', item.phoneNumber)}
            </View>
        ));
    }
};

const Verification: React.SFC<VerificationProps> = ({
    navigation,
    route: {
        params: { ownerDetails },
    },
}) => {
    const [verificationDetails, setVerificationDetails] = React.useState<
        Partial<{ isVerified: boolean; verificationStatus?: verificationStatus; remarks: string }>
    >({ verificationStatus: undefined, isVerified: false });

    const [owner, setOwnerDetails] = React.useState<IshopMember[]>([]);
    const [coOwner, setcoOwner] = React.useState<IshopMember[]>([]);
    const [worker, setWorker] = React.useState<IshopMember[]>([]);
    const [dukanName, setDukanName] = React.useState<string>('');
    const [loader, setLoader] = React.useState<boolean>(false);
    const [currentPosition, setCurrentPosition] = React.useState<number>(0);
    const [indicatorLabel, setLabels] = React.useState(labels);

    const findCurrentPosition = async () => {
        const requestStatuss = verificationDetails.verificationStatus;
        let position;
        console.log('registeration status =>', requestStatuss);
        if (requestStatuss === verificationStatus.registered) {
            position = 0;
        } else if (requestStatuss == verificationStatus.processing) {
            position = 1;
        } else if (requestStatuss == verificationStatus.verified || requestStatuss == verificationStatus.rejected) {
            position = 2;
        } else {
            position = 0;
        }
        setCurrentPosition(position);
    };
    const findVerificationIndex = () => {
        findCurrentPosition();
        if (verificationDetails.shopVerificationStatus === verificationStatus.rejected) {
            let labelsi = [...indicatorLabel];
            labelsi[2] = 'Your dukan request to register bharat bazar is rejected.';
            setLabels(labelsi);
        } else {
            let labelsi = [...indicatorLabel];
            labelsi[2] = 'Your dukan is verified.';
            setLabels(labelsi);
        }
    };

    async function loadVerificationDetail() {
        try {
            const response: IRShopVerification = await getShopVerificationDetails({
                _id: ownerDetails.shop,
            });
            setVerificationDetails(response.payload);
            findVerificationIndex();
        } catch (error) {
            ToastHOC.errorAlert(error.message);
            if (error.message.includes('not exist')) {
                logout();
            }
        }
    }

    function logout() {
        Object.keys(StorageItemKeys).forEach(async (item) => {
            await Storage.removeItem(item);
        });
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: NavigationKey.SPLASH,
                },
            ],
        });
    }

    async function deleteShopFromServerStorage() {
        try {
            setLoader(true);
            const response: CommonApiResponse = await deleteShop({
                _id: ownerDetails.shop,
            });
            setLoader(false);
            if (response.status == 1) {
                logout();
            }
        } catch (error) {
            setLoader(false);
            ToastHOC.errorAlert(error.message);
        }
    }

    async function getShopDetailsFromServer() {
        try {
            const response: IRGetShop = await getShop({
                _id: ownerDetails.shop,
            });
            const shop = response.payload;
            if (shop.owner) {
                setOwnerDetails([{ ...shop.owner }]);
            }
            if (shop.coOwner.length > 0) {
                setcoOwner(shop.coOwner);
            }
            if (shop.worker.length > 0) {
                setWorker(shop.worker);
            }
            setDukanName(shop.shopName);
        } catch (error) {
            ToastHOC.errorAlert(error.message);
        }
    }

    React.useEffect(() => {
        loadVerificationDetail();
        getShopDetailsFromServer();
    }, []);

    return (
        <View style={[FLEX(1), BGCOLOR('#FFFFFF')]}>
            <StatusBar />
            <View style={[PH(0.5), FLEX(1)]}>
                <WrappedText text={'Verification of dukan'} fontSize={fs28} textColor={'#161616'} />

                <ScrollView style={[{ marginBottom: getHP(1.5) }]} showsVerticalScrollIndicator={false}>
                    <WrappedText
                        text={
                            'Hurrray!! You have successfull completed all the process to get you started in your journey of growth and success.'
                        }
                        textStyle={{ marginTop: getHP(0.3) }}
                    />
                    <WrappedText
                        text={
                            'Together we will grow & will end all the monopoly in the market. Bharat Bazar will be cheerfull as it was when there was no monopoly.'
                        }
                        textStyle={{ marginTop: getHP(0.2) }}
                    />
                    <WrappedText
                        text={
                            'Company will contact you soon for dukan verification. After that you will be able to access your dukan.'
                        }
                        textStyle={{ marginTop: getHP(0.2) }}
                    />
                    <WrappedText
                        text={'Dukan Verification Status'}
                        fontSize={fs20}
                        containerStyle={[MT(0.4)]}
                        fontFamily={FontFamily.RobotoMedium}
                    />
                    <View style={[HP(3), MT(0.1)]}>
                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={currentPosition}
                            labels={indicatorLabel}
                            stepCount={3}
                            direction={'vertical'}
                        />
                    </View>
                    <View style={[BW(1), MV(0.2), BC(mainColor), PH(0.2), PV(0.1), BR(0.1)]}>
                        <WrappedText
                            text={'Verificaiton message'}
                            fontSize={fs20}
                            fontFamily={FontFamily.RobotoMedium}
                            textColor={mainColor}
                        />
                        <WrappedText
                            text={
                                verificationDetails.remarks
                                    ? verificationDetails.remarks
                                    : 'Our organization will contact you soon..'
                            }
                            fontSize={fs12}
                            containerStyle={[MT(0.05)]}
                        />
                    </View>
                    <WrappedText
                        text={'Shop member details'}
                        fontSize={fs20}
                        textColor={mainColor}
                        textStyle={[MV(0.1)]}
                    />
                    {showMemberDetails(owner, shopMemberRole.Owner, dukanName)}
                    {showMemberDetails(coOwner, shopMemberRole.coOwner, dukanName)}
                    {showMemberDetails(worker, shopMemberRole.worker, dukanName)}
                </ScrollView>
                <View
                    style={{
                        position: 'absolute',
                        bottom: '3%',

                        left: '5%',
                        right: '5%',
                    }}
                >
                    {verificationDetails.isVerified ? (
                        <TextButton
                            onPress={() => {
                                navigation.replace(NavigationKey.PRODUCTCATEGORY, {
                                    ownerDetails,
                                });
                            }}
                            textProps={componentProps.buttonTextProps}
                            text={'Continue'}
                            containerStyle={[
                                buttonContainerStyle,
                                { marginTop: getHP(0.3) },
                                //{ position: 'absolute', top: getHP(0.1), right: getHP(0.3) },
                            ]}
                        />
                    ) : (
                        <View>
                            <TextButton
                                onPress={() => {
                                    navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                        screen: NavigationKey.ADDDUKANMEMBERS,
                                        ownerDetails,
                                        update: true,
                                    });
                                }}
                                textProps={componentProps.buttonTextProps}
                                text={'Edit dukan member details'}
                                containerStyle={[
                                    buttonContainerStyle,
                                    { marginTop: getHP(0) },
                                    //{ position: 'absolute', top: getHP(0.1), right: getHP(0.3) },
                                ]}
                            />
                            <TextButton
                                onPress={() => {
                                    Alert.alert(
                                        'Warning!',
                                        'By deleting your dukan all your data related to your dukan like member, dukan details will be deleted',
                                        [
                                            {
                                                text: 'Remove my dukan from market',
                                                onPress: deleteShopFromServerStorage,
                                            },
                                            {
                                                text: 'Cancel',
                                            },
                                        ],
                                    );
                                }}
                                textProps={componentProps.buttonTextProps}
                                text={'Remove my dukan from market'}
                                containerStyle={[buttonContainerStyle, { marginTop: getHP(0.12) }]}
                            />
                        </View>
                    )}
                </View>
            </View>
            {loader && <Loader />}
        </View>
    );
};

export default Verification;

import * as React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { FontFamily, fs12, fs14, fs16, fs18, fs20, fs28, NavigationProps } from '../../common';
import { getHP, getWP } from '../../common/dimension';
import {
    AIC,
    BC,
    BGCOLOR,
    BR,
    BW,
    colorTransparency,
    FDR,
    FLEX,
    HP,
    JCC,
    MH,
    MT,
    MV,
    PH,
    provideShadow,
    PT,
    PV,
} from '../../common/styles';
import WrappedText from '../component/WrappedText';
import StatusBar from '../component/StatusBar';
import { IshopMember, shopMemberRole } from '../../server/apis/shopMember/shopMember.interface';
import { borderColor, colorCode, mainColor } from '../../common/color';
import { IRGetShop, IRShopVerification, Shop, verificationStatus } from '../../server/apis/shop/shop.interface';
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
import ShadowWrapperHOC from '../hoc/ShadowWrapperHOC';
import RightComponentButtonWithLeftText from '../components/button/RightComponentButtonWithLeftText';
import { commonButtonProps } from '../components/button';
export interface VerificationProps extends NavigationProps {
    route: {
        params: {
            ownerDetails: IshopMember;
        };
    };
}

const labels = ['Registered', 'Verfication in process.', 'Verified.'];
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
    labelSize: 10,
    currentStepLabelColor: mainColor,
};

const Section = (propertyName: string, value: string) => (
    <View style={[FDR(), JCC('space-between'), MV(0.1)]}>
        <WrappedText text={propertyName} fontSize={fs14} />

        <WrappedText text={value} textColor={'#8a8a8a'} fontSize={fs14} />
    </View>
);

const SectionHorizontal = (propertyName: string, value: string) => (
    <View style={[FDR(), JCC('space-between'), MV(0.1)]}>
        <WrappedText text={propertyName} fontSize={fs14} />

        <WrappedText text={value} textColor={'#8a8a8a'} fontSize={fs14} />
    </View>
);

const showMemberDetails = (details: IshopMember[], role: shopMemberRole, dukanName: string, onPressEdit: Function) => {
    if (details.length == 0) {
        return <WrappedText text={'There is no ' + role + ' in your shop.'} />;
    } else {
        return details.map((item) => (
            <View style={[border, MV(), { padding: 20 }, BR(0.1)]} key={item.phoneNumber}>
                <View style={[FDR(), JCC('space-between')]}>
                    <WrappedText
                        text={role + ' details'}
                        //textColor={mainColor}
                        fontSize={fs18}
                        containerStyle={{ flex: 1 }}
                    />
                    <WrappedFeatherIcon
                        iconName={'edit'}
                        onPress={() => {
                            onPressEdit();
                        }}
                        iconSize={15}
                        iconColor="black"
                        containerHeight={20}
                        containerStyle={{ marginTop: 0, marginHorizontal: getWP(0.2) }}
                    />
                </View>
                <View style={[MT(0.1)]} />
                {Section('Full Name', item.firstName + ' ' + item.lastName)}
                {/* {Section('Last Name', item.lastName)} */}
                {Section('Phone Number', item.phoneNumber)}
            </View>
        ));
    }
};

const shopDetails = (shop: Partial<Shop>) => {
    return (
        <View style={[PV(0.2), MT(0.1), BGCOLOR('#FFFFFF')]}>
            <View style={[]}>
                <WrappedText text={shop.shopName + ' address details'} textColor={mainColor} fontSize={fs18} />
                <WrappedText text={shop.localAddress} textColor={'#8a8a8a'} fontSize={fs14} />
            </View>
            <View style={[MT(0.1)]} />
            {SectionHorizontal('State', shop.state.name || 'NA')}
            {SectionHorizontal('City', shop.city.name || 'NA')}
            {SectionHorizontal('Area', shop.area.name || 'NA')}
            {SectionHorizontal('Pincode', shop.pincode || 'NA')}

            <WrappedText
                text={'About ' + shop.shopName}
                textColor={mainColor}
                fontSize={fs18}
                containerStyle={[MT(0.2)]}
            />
            <WrappedText text={shop.shopDescription} textColor={'#8a8a8a'} fontSize={fs14} />
        </View>
    );
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
    const [shop, setShop] = React.useState({});

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
            labelsi[2] = 'Verification rejected.';
            setLabels(labelsi);
        } else {
            let labelsi = [...indicatorLabel];
            labelsi[2] = 'Verified.';
            setLabels(labelsi);
        }
    };

    async function loadVerificationDetail() {
        try {
            const response: IRShopVerification = await getShopVerificationDetails({
                _id: ownerDetails.shop,
            });
            setVerificationDetails(response.payload);
        } catch (error) {
            ToastHOC.errorAlert(error.message);
            if (error.message.includes('not exist')) {
                logout();
            }
        }
    }

    React.useEffect(() => {
        findVerificationIndex();
        return () => {};
    }, [shop]);

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
            setShop(shop);
            console.log(shop);
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
            <View style={[FLEX(1)]}>
                <ScrollView style={[{ marginBottom: 5 }]} showsVerticalScrollIndicator={false}>
                    <View style={[PH(0.5), PT(0.4)]}>
                        <WrappedText text={'Dukan Verification'} fontSize={fs28} textColor={'#161616'} />
                        {/* <WrappedText
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
                    /> */}
                        <WrappedText
                            text={
                                'Company will contact you soon for dukan verification. After that you will be able to access your dukan.'
                            }
                            textStyle={{ marginTop: getHP(0.1) }}
                        />
                    </View>
                    <View
                        style={[
                            // BW(2),
                            MV(0.2),
                            // BC(colorCode.SAFFRONLOW(10)),
                            BGCOLOR('#FFFFFF'),
                            provideShadow(1),
                            PH(0.6),
                            PV(0.3),
                            BR(0.1),
                            MH(0.5),
                            MT(0.3),
                        ]}
                    >
                        <WrappedText
                            text={'Dukan Verification Status'}
                            fontSize={fs14}
                            //containerStyle={[MT(0.4)]}
                            fontFamily={FontFamily.RobotoMedium}
                            textColor={colorCode.BLACKLOW(60)}
                        />
                        <View style={[MT(0.4)]}>
                            <StepIndicator
                                customStyles={customStyles}
                                currentPosition={currentPosition}
                                labels={indicatorLabel}
                                stepCount={3}
                                direction={'horizontal'}
                            />
                        </View>
                        <WrappedText
                            text={'Message from company'}
                            fontSize={fs14}
                            containerStyle={[MT(0.5)]}
                            fontFamily={FontFamily.RobotoMedium}
                            textColor={colorCode.SAFFRON}
                        />
                        <WrappedText
                            text={
                                verificationDetails.remarks
                                    ? verificationDetails.remarks
                                    : 'Our organization will contact you soon..'
                            }
                            fontSize={fs16}
                            containerStyle={[MT(0.05)]}
                            textColor={colorCode.BLACKLOW(30)}
                        />
                    </View>
                    <ShadowWrapperHOC containerStyle={[provideShadow(1), MH(0.5)]}>
                        <View>{shop.state ? shopDetails(shop) : <View />}</View>
                        <WrappedText
                            text={'Shop member details'}
                            fontSize={fs20}
                            textColor={mainColor}
                            textStyle={[MV(0.1)]}
                        />
                        {showMemberDetails(owner, shopMemberRole.Owner, dukanName, () => {
                            navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                screen: NavigationKey.CREATEDUKAN,
                                ownerDetails,
                                update: true,
                            });
                        })}
                        {showMemberDetails(coOwner, shopMemberRole.coOwner, dukanName, () => {
                            navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                screen: NavigationKey.ADDDUKANMEMBERS,
                                ownerDetails,
                                update: true,
                            });
                        })}
                        {showMemberDetails(worker, shopMemberRole.worker, dukanName, () => {
                            navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                screen: NavigationKey.ADDDUKANMEMBERS,
                                ownerDetails,
                                update: true,
                            });
                        })}
                    </ShadowWrapperHOC>
                </ScrollView>
                <View
                    style={{
                        paddingHorizontal: '5%',
                        marginBottom: '2%',
                        paddingTop: '2%',
                        borderTopWidth: 2,
                        borderColor: borderColor,
                    }}
                >
                    {verificationDetails.isVerified ? (
                        <TextButton
                            onPress={() => {
                                navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                    screen: NavigationKey.PRODUCTDETAILS,
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
                            <RightComponentButtonWithLeftText
                                onPress={() => {
                                    navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                        screen: NavigationKey.ADDDUKANMEMBERS,
                                        ownerDetails,
                                        update: true,
                                    });
                                }}
                                buttonText={'Edit dukan member details'}
                                {...commonButtonProps}
                            />
                            <RightComponentButtonWithLeftText
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
                                {...commonButtonProps}
                                buttonText={'Remove my dukan from market'}
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

import * as React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { FontFamily, fs12, fs14, fs16, fs18, fs20, fs28, fs6, NavigationProps } from '../../common';
import { getHP, getWP } from '../../common/dimension';
import {
    AIC,
    BC,
    BGCOLOR,
    BR,
    BW,
    colorTransparency,
    DSP,
    FDR,
    FLEX,
    HP,
    JCC,
    MH,
    MT,
    MV,
    PA,
    PH,
    provideShadow,
    PT,
    PV,
} from '../../common/styles';
import WrappedText from '../component/WrappedText';
import StatusBar from '../component/StatusBar';
import { IshopMember, shopMemberRole } from '../../server/apis/shopMember/shopMember.interface';
import { borderColor, colorCode, mainColor, messageColor } from '../../common/color';
import { IRGetShop, IRShopVerification, IShop, Shop, verificationStatus } from '../../server/apis/shop/shop.interface';
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
import Border from '../components/border/Border';
import AddMember from './add-dukan-member/AddMember';
import MemberDetails from './add-dukan-member/MemberDetails';
import { ShadowWrappper } from '../components/styles/common';
import ButtonFeatherIcon from '../components/button/ButtonFeatherIcon';
export interface VerificationProps extends NavigationProps {
    route: {
        params: {
            ownerDetails: IshopMember;
        };
    };
}

const labels = ['Registered on Platform', 'Verfication in process.', 'Verified.'];
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

const renderEditButton = (onPress: Function) => (
    <ButtonFeatherIcon iconName="edit" containerStyle={[provideShadow(1), BGCOLOR('#FFFFFF')]} onPress={onPress} />
);

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
        setLoader(true);
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
            setLoader(false);
        } catch (error) {
            setLoader(false);
            ToastHOC.errorAlert(error.message);
        }
    }

    const openEditFlow = (screen: string, details: Partial<IshopMember> | Partial<IShop>, updateCallback: Function) => {
        navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
            screen: screen,
            update: true,
            details: details,
            updateCallback: (params: any) => updateCallback(params),
        });
    };

    const shopDetails = (shop: Shop) => {
        return (
            <View>
                <View style={ShadowWrappper()}>
                    <View style={[FDR(), JCC('space-between'), AIC()]}>
                        <WrappedText text={shop.shopName} textColor={mainColor} fontFamily={FontFamily.Bold} />
                        {renderEditButton(() => {
                            openEditFlow(
                                NavigationKey.SHOPDETAILS,
                                {
                                    shopName: shop.shopName,
                                    shopDescription: shop.shopDescription,
                                    _id: shop._id,
                                },
                                (details: Partial<IShop>) => {
                                    console.log(' SHOP details =>', details);
                                    setShop({ ...shop, ...details });
                                },
                            );
                        })}
                    </View>
                    <WrappedText text={'About your dukan'} containerStyle={[MT(0.1)]} />
                    <WrappedText text={shop.shopDescription} textColor={'#8a8a8a'} containerStyle={[MT(0.1)]} />
                </View>
                <View style={ShadowWrappper()}>
                    <WrappedText text={'Address '} />
                    <WrappedText text={shop.localAddress} textColor={messageColor} containerStyle={[MT(0.1)]} />
                    <WrappedText
                        textColor={messageColor}
                        text={
                            shop.area.name + ',\n' + shop.city.name + ', ' + shop.state.name + ' (' + shop.pincode + ')'
                        }
                    />
                </View>
            </View>
        );
    };

    React.useEffect(() => {
        loadVerificationDetail();
        getShopDetailsFromServer();
    }, []);

    if (loader) {
        return <Loader />;
    } else
        return (
            <View style={[FLEX(1), BGCOLOR('#FFFFFF')]}>
                <StatusBar />
                <View style={[FLEX(1)]}>
                    <ScrollView style={[{ marginBottom: 5 }]} showsVerticalScrollIndicator={false}>
                        <View style={[BGCOLOR('#FFFFFF'), , PA(DSP)]}>
                            <View style={[]}>
                                <WrappedText text={'Dukan Verification'} fontSize={fs28} textColor={'#161616'} />

                                <WrappedText
                                    text={
                                        'Company will contact you soon for dukan verification. After that you will be able to access your dukan.'
                                    }
                                    textStyle={{ marginTop: getHP(0.1) }}
                                />
                            </View>
                            <View style={[BGCOLOR('#FFFFFF'), , PA(DSP), provideShadow(1), MT(0.2), BR(0.1)]}>
                                <WrappedText
                                    text={'Dukan Verification Status'}
                                    fontFamily={FontFamily.Medium}
                                    textColor={'#161616'}
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
                            </View>
                            <View style={[BGCOLOR('#FFFFFF'), , PA(DSP), provideShadow(1), MT(0.2), BR(0.1)]}>
                                <WrappedText text={'Message from company'} fontFamily={FontFamily.Medium} />
                                <WrappedText
                                    text={
                                        verificationDetails.remarks
                                            ? verificationDetails.remarks
                                            : 'Our organization will contact you soon..'
                                    }
                                    containerStyle={[MT(0.05)]}
                                    textColor={colorCode.BLACKLOW(30)}
                                />
                            </View>
                        </View>
                        <View style={[, BGCOLOR('#FFFFFF'), { paddingHorizontal: DSP }]}>
                            {owner.length > 0 && (
                                <MemberDetails
                                    role={shopMemberRole.Owner}
                                    onPressCross={() => {}}
                                    onPressEdit={(item, index) => {
                                        openEditFlow(NavigationKey.CREATEDUKAN, owner[0], (details: IshopMember) => {
                                            setOwnerDetails([details]);
                                        });
                                    }}
                                    onPressPlus={() => {}}
                                    item={owner[0]}
                                />
                            )}
                            <View>{shop.state ? shopDetails(shop) : <View />}</View>
                            <View style={[BGCOLOR('#FFFFFF'), , PA(DSP), provideShadow(1), MT(0.2), BR(0.1)]}>
                                <WrappedText text={'Shop member details'} textColor={mainColor} />
                                <AddMember
                                    onPressPlus={() => {
                                        // navigation.navigate(NavigationKey.EDITDUKANMEMBER, {
                                        //     message:
                                        //         'Worker are basically person who is responsible for dukan growth like your son, partner, brother etc.',
                                        //     role: shopMemberRole.worker,
                                        //     addMember: (data: member) => {
                                        //         console.log('add coowner', data);
                                        //         addWorker(data);
                                        //     },
                                        //     shop: ownerDetails.shop,
                                        // });
                                    }}
                                    onPressEdit={(member: member, index?: number) => {
                                        // navigation.navigate(NavigationKey.EDITDUKANMEMBER, {
                                        //     message:
                                        //         'Worker are basically person who is responsible for dukan growth like your son, partner, brother etc.',
                                        //     role: shopMemberRole.worker,
                                        //     addMember: (data: member) => {
                                        //         console.log('add coowner', data);
                                        //         addWorker(data, index);
                                        //     },
                                        //     shop: ownerDetails.shop,
                                        //     shopMember: member,
                                        //     openUpdateFlow: true,
                                        // });
                                    }}
                                    onPressCross={() => {}}
                                    data={coOwner}
                                    key={2}
                                    role={shopMemberRole.coOwner}
                                    message={'Worker is someone whom you hire to help in handling of your shop'}
                                />
                                <AddMember
                                    onPressPlus={() => {
                                        // navigation.navigate(NavigationKey.EDITDUKANMEMBER, {
                                        //     message:
                                        //         'Worker are basically person who is responsible for dukan growth like your son, partner, brother etc.',
                                        //     role: shopMemberRole.worker,
                                        //     addMember: (data: member) => {
                                        //         console.log('add coowner', data);
                                        //         addWorker(data);
                                        //     },
                                        //     shop: ownerDetails.shop,
                                        // });
                                    }}
                                    onPressEdit={(member: member, index?: number) => {
                                        // navigation.navigate(NavigationKey.EDITDUKANMEMBER, {
                                        //     message:
                                        //         'Worker are basically person who is responsible for dukan growth like your son, partner, brother etc.',
                                        //     role: shopMemberRole.worker,
                                        //     addMember: (data: member) => {
                                        //         console.log('add coowner', data);
                                        //         addWorker(data, index);
                                        //     },
                                        //     shop: ownerDetails.shop,
                                        //     shopMember: member,
                                        //     openUpdateFlow: true,
                                        // });
                                    }}
                                    onPressCross={() => {}}
                                    data={worker}
                                    key={2}
                                    role={shopMemberRole.worker}
                                    message={'Worker is someone whom you hire to help in handling of your shop'}
                                />
                            </View>
                        </View>
                    </ScrollView>
                    <View
                        style={[
                            {
                                padding: DSP,
                            },
                            provideShadow(),
                        ]}
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

                                    //{ position: 'absolute', top: getHP(0.1), right: getHP(0.3) },
                                ]}
                            />
                        ) : (
                            <View>
                                {/* <RightComponentButtonWithLeftText
                                    onPress={() => {
                                        navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                            screen: NavigationKey.ADDDUKANMEMBERS,
                                            ownerDetails,
                                            update: true,
                                        });
                                    }}
                                    buttonText={'Edit dukan member details'}
                                    {...commonButtonProps}
                                /> */}
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
            </View>
        );
};

export default Verification;

import * as React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { FontFamily, fs14, fs18, fs28, NavigationProps } from '../../common';
import { getHP, getWP } from '../../common/dimension';
import { AIC, BGCOLOR, BR, DSP, FDR, FLEX, JCC, MT, MV, PA, provideShadow } from '../../common/styles';
import WrappedText from '../component/WrappedText';
import StatusBar from '../component/StatusBar';
import { IshopMember, shopMemberRole } from '../../server/apis/shopMember/shopMember.interface';
import { borderColor, colorCode, errorColor, mainColor, messageColor } from '../../common/color';
import { IRGetShop, IRShopVerification, IShop, Shop, verificationStatus } from '../../server/apis/shop/shop.interface';
import { deleteShop, getShop, getShopVerificationDetails } from '../../server/apis/shop/shop.api';
import { ToastHOC } from '../hoc/ToastHOC';
import { NavigationKey } from '../../labels';
import { border } from '../app/edit/product/component/generalConfig';
import WrappedFeatherIcon from '../component/WrappedFeatherIcon';
import StepIndicator from 'react-native-step-indicator';
import { CommonApiResponse } from '../../server/apis/common.interface';
import { Storage, StorageItemKeys } from '../../storage';
import Loader from '../component/Loader';
import RightComponentButtonWithLeftText from '../components/button/RightComponentButtonWithLeftText';
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

const labels = ['Registered on Platform', 'Verfication in process', 'Verified.'];

const customStyles = {
    stepIndicatorSize: getHP(0.5),
    currentStepIndicatorSize: getHP(0.7),
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,

    stepStrokeWidth: 3,

    stepStrokeUnFinishedColor: '#aaaaaa',

    separatorUnFinishedColor: '#aaaaaa',

    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: colorCode.SAFFRON,
    stepIndicatorFinishedColor: colorCode.SAFFRON,
    separatorFinishedColor: colorCode.SAFFRON,
    stepStrokeFinishedColor: colorCode.SAFFRON,
    stepStrokeCurrentColor: colorCode.SAFFRON,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 10,
    currentStepLabelColor: colorCode.SAFFRON,
};

const RejectedColor = {
    stepIndicatorLabelCurrentColor: errorColor,
    stepIndicatorFinishedColor: errorColor,
    separatorFinishedColor: errorColor,
    stepStrokeFinishedColor: errorColor,
    stepStrokeCurrentColor: errorColor,
    currentStepLabelColor: errorColor,
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

const HeadingStyle = {
    fontFamily: FontFamily.Medium,
    textColor: '#161616',
    fontSize: fs14,
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
        if (verificationDetails.verificationStatus === verificationStatus.rejected) {
            let labelsi = [...indicatorLabel];
            labelsi[2] = 'Verification rejected';
            setLabels(labelsi);
        } else {
            let labelsi = [...indicatorLabel];
            labelsi[2] = 'Verified';
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
                    <View style={[FDR(), JCC('space-between'), AIC()]}>
                        <WrappedText text={'Address '} />
                        {renderEditButton(() => {
                            openEditFlow(
                                NavigationKey.ADDRESS,
                                {
                                    localAddress: shop.localAddress,
                                    area: shop.area._id,
                                    city: shop.city._id,
                                    state: shop.state._id,
                                    pincode: shop.pincode,
                                    _id: shop._id,
                                },
                                (details: Partial<IShop>) => {
                                    console.log(' SHOP details =>', details);
                                    setShop({ ...shop, ...details });
                                },
                            );
                        })}
                    </View>
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

    const deleteMember = async (role: shopMemberRole, index: number, deleted?: boolean) => {
        let data = role == 'Co-owner' ? [...coOwner] : [...worker];
        console.log(index);
        try {
            // await deleteShopMember({ _id: data[index]._id });
            data.splice(index, 1);

            if (role == shopMemberRole.coOwner) {
                setcoOwner([...data]);
            } else {
                setWorker([...data]);
            }
        } catch (error) {
            ToastHOC.errorAlert(error.message);
        }
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
                                <WrappedText text={'Dukan Verification Status'} {...HeadingStyle} />
                                <View style={[MT(0.4)]}>
                                    <StepIndicator
                                        customStyles={
                                            verificationDetails.verificationStatus == verificationStatus.rejected
                                                ? { ...customStyles, ...RejectedColor }
                                                : { ...customStyles }
                                        }
                                        currentPosition={currentPosition}
                                        labels={indicatorLabel}
                                        stepCount={3}
                                        direction={'horizontal'}
                                    />
                                </View>
                            </View>
                            <View style={[BGCOLOR('#FFFFFF'), , PA(DSP), provideShadow(1), MT(0.2), BR(0.1)]}>
                                <WrappedText text={'Message from company'} {...HeadingStyle} />
                                <WrappedText
                                    text={
                                        verificationDetails.remarks
                                            ? verificationDetails.remarks
                                            : 'Our organization will contact you soon..'
                                    }
                                    containerStyle={[MT(0.1)]}
                                    textColor={
                                        verificationDetails.verificationStatus == verificationStatus.rejected
                                            ? errorColor
                                            : colorCode.BLACKLOW(30)
                                    }
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
                                <WrappedText text={'Shop member details'} />
                                <AddMember
                                    onPressPlus={() => {
                                        navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                            screen: NavigationKey.EDITDUKANMEMBER,
                                            update: true,
                                            message:
                                                'Co-owner is basically person who is responsible for dukan growth like your son, partner, brother etc.',
                                            role: shopMemberRole.coOwner,
                                            addMember: (data: IshopMember) => {
                                                console.log('add coowner', data);
                                                setcoOwner((coOwner) => {
                                                    coOwner.push(data);
                                                    return [...coOwner];
                                                });
                                            },
                                            shop: ownerDetails.shop,
                                            paddingTop: true,
                                        });
                                    }}
                                    onPressEdit={(IshopMember: IshopMember, index: number) => {
                                        navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                            screen: NavigationKey.EDITDUKANMEMBER,
                                            update: true,
                                            message:
                                                'Worker are basically person who is responsible for dukan growth like your son, partner, brother etc.',
                                            role: shopMemberRole.coOwner,
                                            addMember: (data: IshopMember) => {
                                                console.log('add coowner', data, index);
                                                setcoOwner((coOwner) => {
                                                    console.log('add coowner', data, index, coOwner);
                                                    coOwner[index] = data;
                                                    return [...coOwner];
                                                });
                                            },
                                            shop: ownerDetails.shop,
                                            shopMember: IshopMember,
                                            openUpdateFlow: true,
                                            paddingTop: true,
                                        });
                                    }}
                                    onPressCross={deleteMember}
                                    data={coOwner}
                                    key={1}
                                    role={shopMemberRole.coOwner}
                                    message={
                                        'Co-owner are basically person who is responsible for dukan growth like your son, partner, brother etc.'
                                    }
                                />
                                <AddMember
                                    onPressPlus={() => {
                                        navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                            screen: NavigationKey.EDITDUKANMEMBER,
                                            update: true,
                                            message: 'Worker is someone whom you hire to help in handling of your shop',
                                            role: shopMemberRole.worker,
                                            addMember: (data: IshopMember) => {
                                                console.log('add coowner', data);
                                                setWorker((wosetWorker) => {
                                                    wosetWorker.push(data);
                                                    return [...wosetWorker];
                                                });
                                            },
                                            shop: ownerDetails.shop,
                                            paddingTop: true,
                                        });
                                    }}
                                    onPressEdit={(member: IshopMember, index: number) => {
                                        navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                            screen: NavigationKey.EDITDUKANMEMBER,
                                            update: true,
                                            message:
                                                'Worker are basically person who is responsible for dukan growth like your son, partner, brother etc.',
                                            role: shopMemberRole.coOwner,
                                            addMember: (data: IshopMember) => {
                                                console.log('add coowner', data, index);
                                                setWorker((worksetWorker) => {
                                                    console.log('add coowner', data, index, worksetWorker);
                                                    worksetWorker[index] = data;
                                                    return [...worksetWorker];
                                                });
                                            },
                                            shop: ownerDetails.shop,
                                            shopMember: member,
                                            openUpdateFlow: true,
                                            paddingTop: true,
                                        });
                                    }}
                                    onPressCross={deleteMember}
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
                                borderTopWidth: 1,
                                borderTopColor: borderColor,
                                backgroundColor: '#FFFFFF',
                            },
                        ]}
                    >
                        {verificationDetails.isVerified ? (
                            <RightComponentButtonWithLeftText
                                onPress={async () => {
                                    await Storage.setItem(StorageItemKeys.currentScreen, NavigationKey.PRODUCTDETAILS);
                                    await Storage.setItem(StorageItemKeys.isCustomerOnboardingCompleted, true);
                                    navigation.replace(NavigationKey.PRODUCTDETAILS, {
                                        ownerDetails,
                                    });
                                }}
                                buttonText={'Continue'}
                            />
                        ) : (
                            <View>
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

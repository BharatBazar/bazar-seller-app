import * as React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { FontFamily, fs12, fs20, fs28, NavigationProps } from '../../common';
import { getHP } from '../../common/dimension';
import { BC, BGCOLOR, BR, BW, FLEX, MT, PH, provideShadow, PV } from '../../common/styles';
import WrappedText from '../component/WrappedText';
import StatusBar from '../component/StatusBar';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';
import { mainColor } from '../../common/color';
import { IRGetShop, IRShopVerification, verificationStatus } from '../../server/apis/shop/shop.interface';
import { getShop, getShopVerificationDetails } from '../../server/apis/shop/shop.api';
import { ToastHOC } from '../hoc/ToastHOC';
import TextButton from '../component/TextButton';
import { buttonContainerStyle, componentProps } from '../../common/containerStyles';
import { NavigationKey } from '../../labels';

export interface VerificationProps extends NavigationProps {
    route: {
        params: {
            ownerDetails: IshopMember;
        };
    };
}

const labels = [
    'Your dukan is registered with us. Our executive\nwill be contacting you soon and will start\nprocess for verification of your dukan.',
    'Your dukan is verified.',
];
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

const Verification: React.SFC<VerificationProps> = ({
    navigation,
    route: {
        params: { ownerDetails },
    },
}) => {
    const [verificationDetails, setVerificationDetails] = React.useState<
        Partial<{ isVerified: boolean; shopVerificationStatus?: verificationStatus; remarks: string }>
    >({ shopVerificationStatus: undefined, isVerified: false });

    const [currentPosition, setCurrentPosition] = React.useState<number>(0);
    const [indicatorLabel, setLabels] = React.useState(labels);
    const findCurrentPosition = async () => {
        const requestStatuss = verificationDetails.shopVerificationStatus;
        let position;
        if (requestStatuss === verificationStatus.registered) {
            position = 0;
        } else if (requestStatuss == verificationStatus.verified || requestStatuss == verificationStatus.rejected) {
            position = 1;
        } else {
            position = 0;
        }
        setCurrentPosition(position);
    };

    async function loadVerificationDetail() {
        try {
            const response: IRShopVerification = await getShopVerificationDetails({
                _id: ownerDetails.shop,
            });
            setVerificationDetails(response.payload);
        } catch (error) {
            ToastHOC.errorAlert(error.message);
        }
    }

    async function getShopDetailsFromServer() {
        try {
            const response: IRGetShop = await getShop({
                _id: ownerDetails.shop,
            });
            console.log(response.payload);
        } catch (error) {
            ToastHOC.errorAlert(error.message);
        }
    }

    React.useEffect(() => {
        loadVerificationDetail();
        getShopDetailsFromServer();
    }, []);

    React.useEffect(() => {
        findCurrentPosition();
        if (verificationDetails.shopVerificationStatus === verificationStatus.rejected) {
            let labelsi = [...indicatorLabel];
            labelsi[1] = 'Your request is rejected';
            setLabels(labelsi);
        } else {
            let labelsi = [...indicatorLabel];
            labelsi[1] = 'Your request is accepted';
            setLabels(labelsi);
        }
    }, [verificationDetails.shopVerificationStatus]);

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
                    {/* <WrappedText
                        text={'Dukan Verification Status'}
                        fontSize={fs20}
                        containerStyle={[MT(0.4)]}
                        fontFamily={FontFamily.RobotoMedium}
                    />
                    <View style={[HP(3), MT(0.1)]}>
                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={currentPosition}
                            labels={labels}
                            stepCount={2}
                            direction={'vertical'}
                        />
                    </View> */}
                    <View
                        style={[
                            BW(1),
                            MT(0.4),
                            BC(mainColor),
                            provideShadow(10),
                            { shadowColor: mainColor, shadowOffset: { width: 10, height: 10 }, shadowRadius: 2 },

                            PH(0.2),
                            PV(0.1),
                            BR(0.1),
                        ]}
                    >
                        <WrappedText
                            text={'Message'}
                            fontSize={fs20}
                            fontFamily={FontFamily.RobotoMedium}
                            textColor={mainColor}
                        />
                        <WrappedText
                            text={verificationDetails.remarks ? verificationDetails.remarks : 'No message provided'}
                            fontSize={fs12}
                            containerStyle={[MT(0.05)]}
                        />
                    </View>
                    {verificationDetails.isVerified ? (
                        <TextButton
                            onPress={() => {
                                console.log('Continue pressed!!');
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
                        <View />
                    )}
                </ScrollView>
                <View
                    style={{
                        position: 'absolute',
                        bottom: '5%',
                        left: '5%',
                        right: '5%',
                    }}
                >
                    <TextButton
                        onPress={() => {
                            navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                screen: NavigationKey.ADDDUKANMEMBERS,
                                ownerDetails,
                                update: true,
                            });
                        }}
                        textProps={componentProps.buttonTextProps}
                        text={'Add dukan members'}
                        containerStyle={[
                            buttonContainerStyle,
                            { marginTop: getHP(0.3) },
                            //{ position: 'absolute', top: getHP(0.1), right: getHP(0.3) },
                        ]}
                    />
                    <TextButton
                        onPress={() => {
                            // navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                            //     screen: NavigationKey.ADDDUKANMEMBERS,
                            //     ownerDetails,
                            // });
                            Alert.alert(
                                'Warning!',
                                'By deleting your dukan all your data related to your dukan like member, dukan details will be deleted',
                                [
                                    {
                                        text: 'Remove my dukan from market',
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
            </View>
        </View>
    );
};

export default Verification;

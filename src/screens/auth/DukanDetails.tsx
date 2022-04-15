import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { black20, colorCode } from '../../common/color';
import { BC, BR, BW, colorTransparency, DSP, HP, MT, P, PA, PH, PV } from '../../common/styles';
import { textInputContainerStyle, buttonContainerStyle, absoluteBottomWrapper } from '../../common/containerStyles';
import { CreateDukanText, ShopDetailsText } from '../../common/customScreenText';
import { fs12, NavigationProps } from '../../common';
import { NavigationKey } from '../../labels';
import WrappedTextInput from '../component/WrappedTextInput';
import { getHP, getWP } from '../../common/dimension';
import TextButton from '../component/TextButton';
import ShadowWrapperHOC from '../hoc/ShadowWrapperHOC';
import HeaderText from './component/HeaderText';
import { IRShopUpdate } from '../../server/apis/shop/shop.interface';
import { updateShop } from '../../server/apis/shop/shop.api';
import ServerErrorText from './component/errorText';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';
import { marTop } from '../app/edit/product/component/generalConfig';
import { Storage, StorageItemKeys } from '../../storage';
import ShowInforTextBelowInput from '../components/text/ShowInfoTextBelowInput';
import TextPhotoAudioInputComponent from '../components/multimedia/TextPhotoAudioInput';
import { STATUS_BAR_HEIGHT } from '../component/StatusBar';
import { ToastHOC } from '../hoc/ToastHOC';
export interface ShopDetailsProps extends NavigationProps {
    route: {
        params: {
            ownerDetails: IshopMember;
            update?: boolean;
            details: shopDetails;
            updateCallback: Function;
        };
    };
}

interface shopDetails {
    shopName: string;
    shopDescription: string;
}

interface error {
    shopName?: string;
    shopDescription?: string;
    error?: string;
}
const ShopDetails: React.FC<ShopDetailsProps> = ({
    navigation,
    route: {
        params: { ownerDetails, update, details, updateCallback },
    },
}) => {
    const [shopDetails, setDetails] = React.useState<shopDetails>({ shopName: '', shopDescription: '' });

    React.useEffect(() => {
        if (update) setDetails({ ...details });
    }, []);
    const [error, setError] = React.useState<error>({});
    const [loading, setLoading] = React.useState(false)
    const componentProps = {
        buttonTextProps: {
            textColor: colorCode.WHITE,
        },
        textInputProps: {
            containerStyle: textInputContainerStyle,
            textInputStyle: { fontSize: fs12, color: '#000000' + colorTransparency[50] },
            paddingLeft: getWP(0.2),
        },
    };

    async function submitDetails() {
        try {
            setLoading(true)
            const response: IRShopUpdate = await updateShop(
                update ? { ...shopDetails } : { ...shopDetails, _id: ownerDetails.shop },
            );
            if (response.status == 1) {
                if (!update) {
                    await Storage.setItem(StorageItemKeys.currentScreen, NavigationKey.ADDRESS);
                    navigation.replace(NavigationKey.ADDRESS, { ownerDetails: ownerDetails });
                } else {
                    updateCallback({ ...shopDetails });
                    navigation.goBack();
                }
                setLoading(false)
            } else {
                setError({ error: response.message });
            }
        } catch (error) {
            ToastHOC.errorAlert(error.message);
        }
    }

    const validateFields = () => {
        let error: error = {};

        if (shopDetails.shopName.length < 3) {
            error['shopName'] = 'Please enter a attractive shop name.';
        }

        if (shopDetails.shopDescription.length < 3) {
            error['shopDescription'] = 'Please enter a valid shop description.';
        }

        if (Object.keys(error).length == 0) {
            setError({});
            submitDetails();
        } else {
            setError(error);
        }
    };
    return (
        <View
            style={[
                { flex: 1, backgroundColor: '#FFFFFF' },
                { padding: DSP, paddingTop: update ? STATUS_BAR_HEIGHT + DSP : DSP },
            ]}
        >
            <HeaderText
                step={update ? undefined : 'Step 3'}
                heading={update?ShopDetailsText.UPDATE_DUKAN_HEADING:ShopDetailsText.DUKAN_HEADING}
                subHeading={ShopDetailsText.MESSAGE}
                
            />
            {error['error'] && <ServerErrorText errorText={error['error']} />}
            <View style={{ marginTop: getHP(0.2) }}>
                <WrappedTextInput
                    value={shopDetails.shopName}
                    placeholder={'Dukan ka nam'}
                    errorText={error['shopName']}
                    onChangeText={(name: string) => setDetails({ ...shopDetails, shopName: name })}
                    {...componentProps.textInputProps}
                />
                <ShowInforTextBelowInput
                    text={
                        'Enter name from which you are popular in your locality as people will search this name for checking your dukan items. Also your dukan is your brand and trust.'
                    }
                />
                <WrappedTextInput
                    placeholder={'Dukan ke bare mai jankari'}
                    value={shopDetails.shopDescription}
                    multiline={true}
                    errorText={error['shopDescription']}
                    onChangeText={(name: string) => setDetails({ ...shopDetails, shopDescription: name })}
                    {...componentProps.textInputProps}
                    textAlignVertical={'top'}
                    containerStyle={[HP(2), marTop, BW(0.4), BC(black20), PV(0.05), PH(0.1), BR(0.05)]}
                />
                <TextPhotoAudioInputComponent />

                <TextButton
                    text={update ? 'Update details' : 'Submit details'}
                    textProps={componentProps.buttonTextProps}
                    containerStyle={[buttonContainerStyle, MT(0.4)]}
                    onPress={() => {
                        validateFields();
                    }}
                    isLoading={loading}
                />
            </View>
        </View>
    );
};

export default ShopDetails;

const styles = StyleSheet.create({
    buttonsWrapper: {
        ...absoluteBottomWrapper,
        bottom: '5%',
    },
});

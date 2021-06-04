import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colorCode } from '../../common/color';
import { colorTransparency, MT, PH, PV } from '../../common/styles';

import { textInputContainerStyle, buttonContainerStyle, absoluteBottomWrapper } from '../../common/containerStyles';
import { ShopDetailsText } from '../../common/customScreenText';
import { fs13, NavigationProps } from '../../common';
import { NavigationKey } from '../../labels';
import WrappedTextInput from '../component/WrappedTextInput';
import { getHP, getWP } from '../../common/dimension';
import TextButton from '../component/TextButton';
import ShadowWrapperHOC from '../hoc/ShadowWrapperHOC';
import HeaderText from './component/HeaderText';
import { DataHandling } from '../../server/DataHandlingHOC';
import { IRShopUpdate } from '../../server/apis/shop/shop.interface';
import { updateShop } from '../../server/apis/shop/shop.api';
import ServerErrorText from './component/errorText';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';

export interface ShopDetailsProps extends NavigationProps {
    route: {
        params: {
            ownerDetails: IshopMember;
        };
    };
}

const dataHandling = new DataHandling('');

interface shopDetails {
    shopName: string;
    addressOfShop: string;
}

interface error {
    shopName?: string;
    addressOfShop?: string;
    error?: string;
}
const ShopDetails: React.FC<ShopDetailsProps> = ({
    navigation,
    route: {
        params: { ownerDetails },
    },
}) => {
    const [details, setDetails] = React.useState<shopDetails>({ shopName: '', addressOfShop: '' });
    const [error, setError] = React.useState<error>({});
    const componentProps = {
        buttonTextProps: {
            textColor: colorCode.WHITE,
        },
        textInputProps: {
            containerStyle: textInputContainerStyle,
            textInputStyle: { fontSize: fs13, color: '#000000' + colorTransparency[50] },
            paddingLeft: getWP(0.2),
        },
    };

    async function submitDetails() {
        const response: IRShopUpdate = await dataHandling.fetchData(updateShop, { ...details, _id: ownerDetails.shop });
        if (response.status == 1) {
            navigation.navigate(NavigationKey.ADDDUKANMEMBERS, { ownerDetails: ownerDetails.shop });
        } else {
            setError({ error: response.message });
        }
    }

    const validateFields = () => {
        let error: error = {};

        if (details.shopName.length < 3) {
            error['shopName'] = 'Please enter a attractive shop name.';
        }

        if (details.addressOfShop.length < 3) {
            error['addressOfShop'] = 'Please enter a valid shop address.';
        }

        if (Object.keys(error).length == 0) {
            setError({});
            submitDetails();
        } else {
            setError(error);
        }
    };
    return (
        <View style={[{ flex: 1 }, PH(0.3), PV(0.4)]}>
            <ShadowWrapperHOC>
                <>
                    <HeaderText step={'Step 3'} heading={'Dukan Details'} subHeading={ShopDetailsText.MESSAGE} />
                    {error['error'] && <ServerErrorText errorText={error['error']} />}
                    <View style={{ marginTop: getHP(0.2) }}>
                        <WrappedTextInput
                            value={details.shopName}
                            placeholder={'Dukan ka nam'}
                            errorText={error['shopName']}
                            onChangeText={(name: string) => setDetails({ ...details, shopName: name })}
                            {...componentProps.textInputProps}
                        />

                        <WrappedTextInput
                            placeholder={'Dukan ka pata'}
                            value={details.addressOfShop}
                            errorText={error['addressOfShop']}
                            onChangeText={(name: string) => setDetails({ ...details, addressOfShop: name })}
                            {...componentProps.textInputProps}
                        />

                        <TextButton
                            text={'Submit'}
                            textProps={componentProps.buttonTextProps}
                            containerStyle={[buttonContainerStyle, MT(0.4)]}
                            onPress={() => {
                                validateFields();
                            }}
                        />
                    </View>
                </>
            </ShadowWrapperHOC>
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

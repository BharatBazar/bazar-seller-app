import * as React from 'react';
import { View, TextInput, Button } from 'react-native';
import { fs13, fs20, NavigationProps } from '../../common';
import { black50, colorCode, disabledColor, errorColor, generalColor } from '../../common/color';
import { buttonContainerStyle, textInputContainerStyle, componentProps } from '../../common/containerStyles';
import { getHP } from '../../common/dimension';
import { AIC, BGCOLOR, BR, FDR, FLEX, HP, JCC, ML, MT, PH, PV } from '../../common/styles';
import { checkPincode } from '../../server/apis/address/address.api';
import TextButton from '../component/TextButton';
import WrappedDropDown from '../component/WrappedDropDown';
import ShadowWrapperHOC from '../hoc/ShadowWrapperHOC';
import HeaderText from './component/HeaderText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import WrappedText from '../component/WrappedText';
import { initializeAxios } from '../../server';
import { updateShop } from '../../server/apis/shop/shop.api';
import { IRShopUpdate } from '../../server/apis/shop/shop.interface';
import { IshopMember } from '../../server/apis/shopMember/shopMember.interface';
import { IAddress } from '../../server/apis/address/address.interface';

export interface AddressProps extends NavigationProps {
    route: {
        params: {
            ownerDetails: IshopMember;
        };
    };
}

interface Error {
    pincode: string;
    area: string;
    localAddress: string;
    error: string;
}

const Address: React.FC<AddressProps> = ({
    navigation,
    route: {
        params: { ownerDetails },
    },
}) => {
    const [pincode, setPinCode] = React.useState<string>('');
    const [area, setArea] = React.useState('');
    const [error, setError] = React.useState<Partial<Error>>({});
    const [areas, setAreas] = React.useState<{ label: string | undefined; value: string | undefined }[]>([]);
    const [state, setState] = React.useState<Partial<IAddress>>({});
    const [city, setCity] = React.useState<Partial<IAddress>>({});
    const [localAddress, setLocalAddress] = React.useState('');
    const [loader, setLoader] = React.useState<number>(0);
    const [pincodeVerfied, setPincodeVerified] = React.useState(undefined);
    const [previousPin, setPreviousPin] = React.useState<undefined | string>(undefined);

    const checkPincodeInServer = async () => {
        if (pincode.length != 6) {
            setError({ pincode: 'Please provide valid pincode.' });
        } else {
            setError({});
            try {
                setLoader(1);
                const a = await checkPincode(pincode);
                setLoader(0);
                if (a.status == 1) {
                    console.log(a);
                    setState(a.payload.state);
                    setCity(a.payload.city);
                    const areas = a.payload.area.map((item) => {
                        return { label: item.name, value: item._id };
                    });
                    setAreas(areas);
                    setPreviousPin(pincode);
                }
            } catch (error) {
                setLoader(0);
                console.log(error);
                setError({ error: error.message });
            }
        }
    };

    async function submitDetails() {
        setLoader(2);
        try {
            const data = {
                state: state._id,
                city: city._id,
                area,
                localAddress,
                pincode,
                _id: ownerDetails.shop,
            };
            const response: IRShopUpdate = await updateShop(data);
            setLoader(0);
        } catch (error) {
            setError({ error: error.message });
            setLoader(0);
        }
    }

    const validateDetail = async () => {
        let error: Partial<Error> = {};
        if (area.length == 0) {
            error['area'] = 'Please select area.';
        }
        if (localAddress.length < 5) {
            error['localAddress'] = 'Please provide a valid local address so that people can reach your dukan.';
        }
        if (previousPin !== pincode) {
            error['pincode'] = 'Please verify pincode number.';
        }

        setError(error);
        if (Object.keys(error).length == 0) {
            //Submit details to server
            submitDetails();
        }
    };
    React.useEffect(() => {
        initializeAxios();
    }, []);

    return (
        <View style={[FLEX(1), PH(0.4), PV(0.2)]}>
            <ShadowWrapperHOC>
                <HeaderText
                    step={'Step 4'}
                    heading={'Provide your dukan address'}
                    subHeading={
                        'Provide address where your dukan is located in the market so that customer can reach your dukan.'
                    }
                />
                {error['error'] && (
                    <WrappedText text={error['error']} textColor={errorColor} containerStyle={[MT(0.1)]} />
                )}

                <View style={[MT(0.2)]} />
                <View style={[FDR(), AIC(), HP(0.45)]}>
                    <TextInput
                        keyboardType={'number-pad'}
                        placeholder={'Pincode'}
                        value={pincode}
                        onChangeText={(value) => {
                            setPinCode(value);
                        }}
                        style={[
                            textInputContainerStyle,
                            { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
                            { fontSize: fs13, color: black50, marginTop: 0 },
                            PH(0.2),
                            FLEX(1),
                        ]}
                    />

                    {previousPin != pincode ? (
                        <TextButton
                            text={'Verify'}
                            textProps={componentProps.buttonTextProps}
                            containerStyle={[
                                HP(0.44),
                                PH(0.5),
                                { borderTopRightRadius: 2, borderBottomRightRadius: 2 },
                            ]}
                            onPress={() => {
                                checkPincodeInServer();
                            }}
                            disabled={loader == 1}
                            isLoading={loader == 1}
                        />
                    ) : (
                        <MaterialIcons
                            name={'check-circle-outline'}
                            color={colorCode.GREENLOW(80)}
                            size={fs20}
                            style={[PH(0.5)]}
                        />
                    )}
                </View>
                {error['pincode'] && <WrappedText text={error['pincode']} textColor={errorColor} />}
                <View style={[FDR(), MT(0.1)]}>
                    <TextInput
                        keyboardType={'number-pad'}
                        placeholder={'State'}
                        editable={false}
                        value={state.name}
                        style={[
                            textInputContainerStyle,
                            BGCOLOR(disabledColor),
                            FLEX(1),
                            { fontSize: fs13, color: black50 },
                            PH(0.2),
                        ]}
                    />
                    <TextInput
                        keyboardType={'number-pad'}
                        placeholder={'City'}
                        editable={false}
                        value={city.name}
                        style={[
                            textInputContainerStyle,
                            BGCOLOR(disabledColor),
                            ,
                            FLEX(1),
                            ML(0.1),
                            { fontSize: fs13, color: black50 },
                            PH(0.2),
                        ]}
                    />
                </View>
                <View style={[MT(0.2)]} />
                <WrappedDropDown
                    data={areas}
                    arrowColor={black50}
                    header={'Select Area'}
                    callBack={() => {}}
                    zIndex={5000}
                    zIndexInverse={1000}
                    selectValue={area}
                    setValue={(value: string) => {
                        setArea(value);
                    }}
                    placeholder={'Area'}
                />
                {error['area'] && <WrappedText text={error['area']} textColor={errorColor} />}

                <View style={{ zIndex: -20 }}>
                    <TextInput
                        keyboardType={'number-pad'}
                        placeholder={'Local Address in your words so that any one can reach your dukan'}
                        multiline={true}
                        onChangeText={(value) => {
                            setLocalAddress(value);
                        }}
                        value={localAddress}
                        style={[
                            textInputContainerStyle,
                            {
                                zIndex: -1,
                                fontSize: fs13,
                                color: black50,
                                height: getHP(1),
                                textAlignVertical: 'top',
                            },

                            PH(0.2),
                            PV(0.1),
                            MT(0.2),
                            AIC('flex-start'),
                            JCC('flex-start'),
                        ]}
                    />
                    {error['localAddress'] && <WrappedText text={error['localAddress']} textColor={errorColor} />}
                    <TextButton
                        text={'Submit address details'}
                        textProps={componentProps.buttonTextProps}
                        containerStyle={[buttonContainerStyle, MT(0.4)]}
                        onPress={() => {
                            validateDetail();
                        }}
                        isLoading={loader == 2}
                        disabled={loader == 2}
                    />
                </View>
            </ShadowWrapperHOC>
        </View>
    );
};

export default Address;

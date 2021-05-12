import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { fs12, fs13, fs20, mobileValidation, NavigationProps } from '../../common';
import { colorCode } from '../../common/color';
import { getHP, getWP } from '../../common/dimension';
import { BGCOLOR, commonStyles, MH, MV, PH, provideShadow, PV } from '../../common/styles';
import WrappedRoundButton from '../component/WrappedRoundButton';
import WrappedText from '../component/WrappedText';
import Icons from 'react-native-vector-icons/Feather';
import WrappedTextInput from '../component/WrappedTextInput';
import TextButton from '../component/TextButton';
import ShadowWrapperHOC from '../hoc/ShadowWrapperHOC';
import HeaderText from './component/HeaderText';
import ServerErrorText from './component/errorText';
import {
    ICreateShopMember,
    IRCreateShopMember,
    IRShopMemberDelete,
    IshopMember,
} from '../../server/apis/shopMember/shopMember.interface';
import { DataHandling } from '../../server/DataHandlingHOC';
import { createShopMember, deleteShopMember } from '../../server/apis/shopMember/shopMember.api';
import { updateShop } from '../../server/apis/shop/shop.api';
import { IRShopUpdate } from '../../server/apis/shop/shop.interface';
import { NavigationKey } from '../../labels';
import { border } from '../app/edit/product/component/generalConfig';

const componentProps = {
    buttonTextProps: {
        textColor: colorCode.WHITE,
        textStyle: { fontSize: fs12 },
    },
    textInputProps: {
        containerStyle: { ...commonStyles.textInputContainerStyle, width: getWP(6) },
        textInputStyle: { fontSize: fs13 },
        paddingLeft: getWP(0.2),
    },
};

const AddMember = ({
    onPressPlus,
    onPressCross,
    role,
    data,
    setField,
    submitDetails,
}: {
    onPressPlus: Function;
    onPressCross: Function;
    role: 'worker' | 'Co-owner';
    data: member[];
    setField: (
        value: string | Object,
        role: 'Co-owner' | 'worker',
        index: number,
        field: 'name' | 'phoneNumber' | 'error',
    ) => void;
    submitDetails: (index: number, role: 'Co-owner' | 'worker') => void;
}) => {
    function validateField(index: number) {
        const { phoneNumber, name } = data[index];
        let error: error = {};
        if (!mobileValidation.test(phoneNumber)) {
            error['phoneNumber'] = 'Please enter correct ' + role + ' mobile number';
        }
        if (name.length < 3) {
            error['name'] = 'Please enter correct ' + role + ' name';
        }
        if (Object.keys(error).length == 0) {
            setField({}, role, index, 'error');
            submitDetails(index, role);
        } else {
            setField(error, role, index, 'error');
        }
    }

    const deleteMember = async (id: string, index: number) => {
        const response: IRShopMemberDelete = await dataHandling.fetchData(deleteShopMember, { _id: id });
        if (response.status == 1) {
            Alert.alert(response.message);
            onPressCross(role, index, true);
        } else {
            setField(response.message, role, index, 'error');
        }
    };

    return (
        <View style={[]}>
            <View style={[commonStyles.fdr, MV(0.2)]}>
                <WrappedText text={'Add ' + role + ' to your dukan'} fontSize={fs20} />
                <WrappedRoundButton
                    height={getHP(0.3)}
                    onPress={() => {
                        onPressPlus();
                    }}
                    containerStyle={[commonStyles.shadow, { backgroundColor: colorCode.WHITE, marginLeft: getWP(0.2) }]}
                >
                    <Icons name={'plus'} />
                </WrappedRoundButton>
            </View>
            {data.map((item: member, index: number) => {
                return (
                    <View
                        style={[
                            { width: '100%' },
                            border,
                            BGCOLOR(colorCode.WHITE),
                            PH(0.3),
                            PV(0.2),
                            { marginVertical: '2%', borderRadius: getWP(0.1) },
                        ]}
                        key={item.key}
                    >
                        {item.error['error'] && <ServerErrorText errorText={item.error['error']} />}
                        <WrappedTextInput
                            value={item.name}
                            placeholder={role + ' name'}
                            {...componentProps.textInputProps}
                            onChangeText={(text) => {
                                setField(text, role, index, 'name');
                            }}
                            errorText={item.error['name']}
                        />
                        <WrappedTextInput
                            placeholder={role + ' mobile number'}
                            value={item.phoneNumber}
                            onChangeText={(text) => {
                                setField(text, role, index, 'phoneNumber');
                            }}
                            errorText={item.error['phoneNumber']}
                            {...componentProps.textInputProps}
                        />
                        <View style={[commonStyles.fdr, { justifyContent: 'flex-end' }]}>
                            <TextButton
                                onPress={() => {
                                    validateField(index);
                                }}
                                textProps={componentProps.buttonTextProps}
                                text={item.added ? 'Update' : 'Add'}
                                containerStyle={[commonStyles.buttonContainerStyle, { marginHorizontal: 0 }]}
                            />
                            <TextButton
                                onPress={() => {
                                    if (item.added) {
                                        deleteMember(item._id, index);
                                    } else {
                                        onPressCross(role, index);
                                    }
                                }}
                                textProps={componentProps.buttonTextProps}
                                text={'Delete'}
                                containerStyle={[commonStyles.buttonContainerStyle, { marginHorizontal: 10 }]}
                            />
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const getId = () => {
    return new Date().getTime().toString();
};
export interface AddDukanMembersProps extends NavigationProps {
    route: {
        params: {
            ownerDetails: IshopMember;
        };
    };
}

const dataHandling = new DataHandling('');
interface error {
    name?: string;
    phoneNumber?: string;
    error?: string;
}
type member = {
    name: string;
    phoneNumber: string;
    role: 'owner' | 'Co-owner' | 'worker';
    key: string;
    error: error;
    added: boolean;
    _id: string;
};

const getDefaultValue = (role: 'Co-owner' | 'worker') => {
    return {
        name: '',
        _id: '',
        phoneNumber: '',
        key: getId(),
        error: {},
        role: role,
        added: false,
    };
};

const AddDukanMembers: React.FC<AddDukanMembersProps> = ({
    navigation,
    route: {
        params: { ownerDetails },
    },
}) => {
    const [coOwner, setcoOwner] = useState<member[]>([getDefaultValue('Co-owner')]);
    const [worker, setWorker] = useState<member[]>([getDefaultValue('worker')]);

    const [submittedCount, setSubmittedCount] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const addcoOwner = () => {
        setcoOwner([...coOwner, getDefaultValue('Co-owner')]);
    };

    const addWorker = () => {
        setWorker([...worker, getDefaultValue('worker')]);
    };

    const setField = (value: string | Object, role: 'Co-owner' | 'worker', index: number, field: keyof member) => {
        let data = role == 'Co-owner' ? [...coOwner] : [...worker];

        data[index][field] = value;

        if (role == 'Co-owner') {
            setcoOwner([...data]);
        } else {
            setWorker([...data]);
        }
    };

    const deleteMember = (role: 'Co-owner' | 'worker', index: number, deleted?: boolean) => {
        let data = role == 'Co-owner' ? [...coOwner] : [...worker];
        console.log(index);
        data.splice(index, 1);
        if (deleted) {
            setSubmittedCount(submittedCount - 1);
        }
        if (role == 'Co-owner') {
            setcoOwner([...data]);
        } else {
            setWorker([...data]);
        }
    };

    const submitDetails = async (index: number, role: 'worker' | 'Co-owner', skipped = false) => {
        let data: ICreateShopMember;
        let details: member;
        if (!skipped) {
            details = role == 'worker' ? worker[index] : coOwner[index];

            data = {
                name: details.name,
                phoneNumber: details.phoneNumber,
                role: details.role,
                shop: ownerDetails.shop,
            };
        }
        const response: IRCreateShopMember = await dataHandling.fetchData(createShopMember, data);

        if (response.status == 1) {
            Alert.alert('Member added!!');
            if (role == 'Co-owner') {
                coOwner[index] = { ...coOwner[index], added: true, _id: response.payload._id };
                setcoOwner(coOwner);
            } else {
                worker[index] = { ...worker[index], added: true, _id: response.payload._id };
                setWorker(worker);
            }
            setSubmittedCount(submittedCount + 1);
        } else {
            setField({ error: response.message }, role, index, 'error');
        }
    };

    async function ifSkipped() {
        const response: IRShopUpdate = await dataHandling.fetchData(updateShop, {
            _id: ownerDetails.shop,
            membersDetailSkipped: true,
        });
        if (response.status == 1) {
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: NavigationKey.VERIFICATION,
                    },
                ],
            });
        } else {
            setError(response.message);
        }
    }

    return (
        <ScrollView style={{ flex: 1, ...PH(0.4), ...PV(0.3) }}>
            <ShadowWrapperHOC>
                <>
                    <HeaderText
                        step={'Step 4'}
                        heading={'Add member to your dukan'}
                        subHeading={
                            'Add details related to Co-owner, worker. Co-owner are the person with whom you share ownership of your dukan also this name will be displayed to public with owner for better identification of your dukan. Please add active mobile number of the worker as their phone number will be used for login. you can change any of the details in the setting of the app.Also permission related to their account currently their account is not active you can activate or deactivate worker and Co-owner account any time.'
                        }
                    />
                    {error.length > 0 && <ServerErrorText errorText={error} />}

                    {submittedCount == 0 && (
                        <TextButton
                            onPress={() => {
                                ifSkipped();
                            }}
                            textProps={componentProps.buttonTextProps}
                            text={'Do this later'}
                            containerStyle={[
                                commonStyles.buttonContainerStyle,
                                { marginTop: getHP(0.3) },
                                //{ position: 'absolute', top: getHP(0.1), right: getHP(0.3) },
                            ]}
                        />
                    )}
                    <TextButton
                        onPress={() => {}}
                        textProps={componentProps.buttonTextProps}
                        text={'Submit'}
                        containerStyle={[
                            commonStyles.buttonContainerStyle,
                            { marginTop: getHP(0.1) },
                            //{ position: 'absolute', top: getHP(0.1), right: getHP(0.3) },
                        ]}
                    />

                    <View style={{ marginTop: getHP(0.2) }}>
                        <AddMember
                            onPressPlus={addcoOwner}
                            onPressCross={deleteMember}
                            data={coOwner}
                            role={'Co-owner'}
                            setField={setField}
                            submitDetails={submitDetails}
                        />
                        <AddMember
                            onPressPlus={addWorker}
                            onPressCross={deleteMember}
                            data={worker}
                            role={'worker'}
                            setField={setField}
                            submitDetails={submitDetails}
                        />
                    </View>
                </>
            </ShadowWrapperHOC>
        </ScrollView>
    );
};

export default AddDukanMembers;

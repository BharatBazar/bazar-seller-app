import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { fs12, fs13, fs14, fs20, mobileValidation, NavigationProps } from '../../../common';
import { colorCode, messageColor } from '../../../common/color';
import { getHP, getWP } from '../../../common/dimension';
import { BGCOLOR, DSP, FDR, FLEX, MH, ML, MT, MV, PA, PH, provideShadow, PV, WP } from '../../../common/styles';
import { textInputContainerStyle, buttonContainerStyle } from '../../../common/containerStyles';
import WrappedRoundButton from '../../component/WrappedRoundButton';
import WrappedText from '../../component/WrappedText';
import Icons from 'react-native-vector-icons/Feather';
import WrappedTextInput from '../../component/WrappedTextInput';
import TextButton from '../../component/TextButton';
import ShadowWrapperHOC from '../../hoc/ShadowWrapperHOC';
import HeaderText from '../component/HeaderText';
import ServerErrorText from '../component/errorText';
import {
    ICreateShopMember,
    IRCreateShopMember,
    IRShopMemberDelete,
    IshopMember,
} from '../../../server/apis/shopMember/shopMember.interface';
import { createShopMember, deleteShopMember } from '../../../server/apis/shopMember/shopMember.api';
import { getShop, updateShop } from '../../../server/apis/shop/shop.api';
import { IRGetShop, IRShopUpdate } from '../../../server/apis/shop/shop.interface';
import { NavigationKey } from '../../../labels';
import { border } from '../../app/edit/product/component/generalConfig';
import { Storage, StorageItemKeys } from '../../../storage';
import { ToastHOC } from '../../hoc/ToastHOC';
import RightComponentButtonWithLeftText from '../../components/button/RightComponentButtonWithLeftText';
import { commonButtonProps } from '../../components/button';
import AddMember from './AddMember';

const getId = () => {
    return new Date().getTime().toString();
};
export interface AddDukanMembersProps extends NavigationProps {
    route: {
        params: {
            ownerDetails: IshopMember;
            update?: boolean;
        };
    };
}

interface error {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    error?: string;
}
export type member = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: 'Owner' | 'Co-owner' | 'Worker';
    key: string;
    error: error;
    added: boolean;
    _id: string;
};

export const getDefaultMember = (role: 'Co-owner' | 'Worker') => {
    return {
        firstName: '',
        lastName: '',
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
        params: { ownerDetails, update },
    },
}) => {
    React.useEffect(() => {
        if (update) {
            fetchShopDetails();
        }
    }, []);

    const [coOwner, setcoOwner] = useState<member[]>([]);
    const [worker, setWorker] = useState<member[]>([]);

    const [submittedCount, setSubmittedCount] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const addcoOwner = (data: member) => {
        setcoOwner((coOwner) => {
            coOwner.push(data);
            return coOwner;
        });
    };

    const addWorker = (data: member) => {
        setWorker((worker) => {
            worker.push(data);
            return worker;
        });
    };

    const fetchShopDetails = async () => {
        try {
            const response: IRGetShop = await getShop({
                _id: ownerDetails.shop,
            });

            console.log(response.payload.coOwner);
            if (response.payload.coOwner.length != 0) {
                const coOwner = response.payload.coOwner.map((item) => {
                    return { ...item, error: {}, added: true };
                });
                setcoOwner(coOwner);
            }
            if (response.payload.worker.length != 0) {
                const worker = response.payload.worker.map((item) => {
                    return { ...item, error: {}, added: true };
                });
                setWorker(worker);
            }
        } catch (error) {
            ToastHOC.errorAlert(error.message);
        }
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
        try {
            let data: Partial<ICreateShopMember>;
            let details: member;
            if (!skipped) {
                details = role == 'worker' ? worker[index] : coOwner[index];

                data = {
                    firstName: details.firstName,
                    lastName: details.lastName,
                    phoneNumber: details.phoneNumber,
                    role: details.role,
                    shop: ownerDetails.shop,
                };

                const response: IRCreateShopMember = await createShopMember(data);

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
            }
        } catch (error) {
            setField({ error: error.message }, role, index, 'error');
        }
    };

    const goNext = () => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: NavigationKey.VERIFICATION,
                    params: { ownerDetails },
                },
            ],
        });
    };

    async function ifSkipped() {
        const response: IRShopUpdate = await updateShop({
            _id: ownerDetails.shop,
            membersDetailSkipped: true,
        });
        if (response.status == 1) {
            await Storage.setItem(StorageItemKeys.currentScreen, NavigationKey.PRODUCTDETAILS);
            goNext();
        } else {
            setError(response.message);
        }
    }

    return (
        <View style={[FLEX(1)]}>
            <ScrollView style={[FLEX(1)]} contentContainerStyle={[PA(DSP * 0.6)]}>
                <ShadowWrapperHOC>
                    <>
                        <HeaderText
                            step={'Step 5'}
                            heading={"Add dukan member's"}
                            subHeading={'Dukan member are the one who handle dukan responsibility along side you. '}
                        />
                        {error.length > 0 && <ServerErrorText errorText={error} />}

                        <View style={{ marginTop: getHP(0.2) }}>
                            <AddMember
                                onPressPlus={() => {
                                    navigation.navigate(NavigationKey.EDITDUKANMEMBER, {
                                        message:
                                            'Co-owner are basically person who is responsible for dukan growth like your son, partner, brother etc.',
                                        role: 'Co-owner',
                                    });
                                }}
                                onPressCross={deleteMember}
                                data={coOwner}
                                role={'Co-owner'}
                                setField={setField}
                                submitDetails={submitDetails}
                                message={
                                    'Co-owner are basically person who is responsible for dukan growth like your son, partner, brother etc.'
                                }
                            />
                            <AddMember
                                onPressPlus={() => {
                                    navigation.navigate(NavigationKey.EDITDUKANMEMBER, {
                                        message:
                                            'Worker are basically person who is responsible for dukan growth like your son, partner, brother etc.',
                                        role: 'Worker',
                                    });
                                }}
                                onPressCross={deleteMember}
                                data={worker}
                                role={'worker'}
                                setField={setField}
                                submitDetails={submitDetails}
                                message={'Worker is someone whom you hire to handle shop'}
                            />
                        </View>
                    </>
                </ShadowWrapperHOC>
            </ScrollView>
            <View style={[PH(0.3), BGCOLOR('#FFFFFF')]}>
                {!update && submittedCount == 0 ? (
                    <RightComponentButtonWithLeftText
                        onPress={() => {
                            ifSkipped();
                        }}
                        buttonText={'Do this later'}
                        {...commonButtonProps}
                        borderWidth={0}
                    />
                ) : (
                    <View />
                )}

                {submittedCount != 0 && (
                    <RightComponentButtonWithLeftText
                        onPress={() => {
                            goNext();
                        }}
                        buttonText={'Submit'}
                        {...commonButtonProps}
                        borderWidth={0}
                    />
                )}
            </View>
        </View>
    );
};

export default AddDukanMembers;

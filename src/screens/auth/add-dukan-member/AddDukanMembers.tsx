import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { NavigationProps } from '../../../common';
import { getHP } from '../../../common/dimension';
import { BGCOLOR, DSP, FLEX, PA } from '../../../common/styles';
import HeaderText from '../component/HeaderText';
import ServerErrorText from '../component/errorText';
import { IshopMember, shopMemberRole } from '../../../server/apis/shopMember/shopMember.interface';
import { getShop, updateShop } from '../../../server/apis/shop/shop.api';
import { IRGetShop, IRShopUpdate } from '../../../server/apis/shop/shop.interface';
import { NavigationKey } from '../../../labels';
import { Storage, StorageItemKeys } from '../../../storage';
import { ToastHOC } from '../../hoc/ToastHOC';
import RightComponentButtonWithLeftText from '../../components/button/RightComponentButtonWithLeftText';
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
        fetchShopDetails();
    }, []);

    const [coOwner, setcoOwner] = useState<member[]>([]);
    const [worker, setWorker] = useState<member[]>([]);

    const [submittedCount, setSubmittedCount] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const addcoOwner = (data: member, index?: number) => {
        setcoOwner((coOwner) => {
            if (typeof index == 'number') {
                coOwner[index] = data;
            } else coOwner.push(data);
            return [...coOwner];
        });
    };

    const addWorker = (data: member, index?: number) => {
        setWorker((worker) => {
            if (typeof index == 'number') {
                worker[index] = data;
            } else worker.push(data);
            return [...worker];
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

    const deleteMember = async (role: shopMemberRole, index: number, deleted?: boolean) => {
        let data = role == 'Co-owner' ? [...coOwner] : [...worker];
        console.log(index);
        try {
            // await deleteShopMember({ _id: data[index]._id });
            data.splice(index, 1);
            if (deleted) {
                setSubmittedCount(submittedCount - 1);
            }
            if (role == shopMemberRole.coOwner) {
                setcoOwner([...data]);
            } else {
                setWorker([...data]);
            }
        } catch (error) {
            ToastHOC.errorAlert(error.message);
        }
    };

    const goNext = async () => {
        try {
            const response: IRShopUpdate = await updateShop({
                _id: ownerDetails.shop,
                shopMemberOnBoardingDone: true,
            });
            await Storage.setItem(StorageItemKeys.currentScreen, NavigationKey.VERIFICATION);
            if (response.status == 1) {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: NavigationKey.VERIFICATION,
                            params: { ownerDetails: { ...ownerDetails, membersDetailSkipped: true } },
                        },
                    ],
                });
            }
        } catch (error) {
            ToastHOC.errorAlert(error.message);
        }
    };

    async function ifSkipped() {
        try {
            const response: IRShopUpdate = await updateShop({
                _id: ownerDetails.shop,
                shopMemberOnBoardingDone: true,
                membersDetailSkipped: true,
            });
            if (response.status == 1) {
                await Storage.setItem(StorageItemKeys.currentScreen, NavigationKey.VERIFICATION);
                goNext();
            } else {
                setError(response.message);
            }
        } catch (error) {
            ToastHOC.errorAlert(error.message);
        }
    }

    return (
        <View style={[FLEX(1)]}>
            <ScrollView style={[FLEX(1)]} contentContainerStyle={[PA(DSP), BGCOLOR('#FFFFFF')]}>
                <View>
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
                                        role: shopMemberRole.coOwner,
                                        addMember: (data: member) => {
                                            console.log('add coowner', data);
                                            addcoOwner(data);
                                        },
                                        shop: ownerDetails.shop,
                                    });
                                }}
                                onPressEdit={(member: member, index?: number) => {
                                    navigation.navigate(NavigationKey.EDITDUKANMEMBER, {
                                        message:
                                            'Co-owner are basically person who is responsible for dukan growth like your son, partner, brother etc.',
                                        role: shopMemberRole.coOwner,
                                        addMember: (data: member) => {
                                            console.log('add coowner', data);
                                            addcoOwner(data, index);
                                        },
                                        shop: ownerDetails.shop,
                                        shopMember: member,
                                        openUpdateFlow: true,
                                    });
                                }}
                                onPressCross={deleteMember}
                                data={coOwner}
                                role={shopMemberRole.coOwner}
                                message={
                                    'Co-owner are basically person who is responsible for dukan growth like your son, partner, brother etc.'
                                }
                                key={1}
                            />
                            <AddMember
                                onPressPlus={() => {
                                    navigation.navigate(NavigationKey.EDITDUKANMEMBER, {
                                        message:
                                            'Worker are basically person who is responsible for dukan growth like your son, partner, brother etc.',
                                        role: shopMemberRole.worker,
                                        addMember: (data: member) => {
                                            console.log('add coowner', data);
                                            addWorker(data);
                                        },
                                        shop: ownerDetails.shop,
                                    });
                                }}
                                onPressEdit={(member: member, index?: number) => {
                                    navigation.navigate(NavigationKey.EDITDUKANMEMBER, {
                                        message:
                                            'Worker are basically person who is responsible for dukan growth like your son, partner, brother etc.',
                                        role: shopMemberRole.worker,
                                        addMember: (data: member) => {
                                            console.log('add coowner', data);
                                            addWorker(data, index);
                                        },
                                        shop: ownerDetails.shop,
                                        shopMember: member,
                                        openUpdateFlow: true,
                                    });
                                }}
                                onPressCross={deleteMember}
                                data={worker}
                                key={2}
                                role={shopMemberRole.worker}
                                message={'Worker is someone whom you hire to help in handling of your shop'}
                            />
                        </View>
                    </>
                </View>
            </ScrollView>
            <View style={[PA(DSP * 0.5), BGCOLOR('#FFFFFF')]}>
                {coOwner.length + worker.length == 0 ? (
                    <RightComponentButtonWithLeftText
                        onPress={() => {
                            ifSkipped();
                        }}
                        buttonText={'Do this process later'}
                    />
                ) : (
                    <View />
                )}

                {coOwner.length + worker.length != 0 && (
                    <RightComponentButtonWithLeftText
                        onPress={() => {
                            goNext();
                        }}
                        buttonText={'Submit details'}
                    />
                )}
            </View>
        </View>
    );
};

export default AddDukanMembers;

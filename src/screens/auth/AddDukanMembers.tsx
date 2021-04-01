import React, { useState } from 'react';
import { View, ImageBackground, ScrollView } from 'react-native';
import { fs12, fs13, fs14, fs15, fs20, fs28 } from '../../common';
import { colorCode } from '../../common/color';
import { getHP, getWP } from '../../common/dimension';
import { BGCOLOR, commonStyles, MH, MV, PH, PV } from '../../common/styles';
import WrappedRoundButton from '../component/WrappedRoundButton';
import WrappedText from '../component/WrappedText';
import ScreenHOC from '../hoc/ScreenHOC';
import Icons from 'react-native-vector-icons/Feather';
import WrappedTextInput from '../component/WrappedTextInput';
import TextButton from '../component/TextButton';
import { STATUS_BAR_HEIGHT } from '../component/StatusBar';

export interface AddDukanMembersProps {}

type member = {
    name: string;
    phoneNumber: string;
    role: 'owner' | 'Co-owner' | 'Worker';
    _id: string;
};

const AddMember = ({
    onPressPlus,
    onPressCross,
    role,
    data,
    setField,
}: {
    onPressPlus: Function;
    onPressCross: Function;
    role: 'worker' | 'Co-owner';
    data: member[];
    setField: Function;
}) => {
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

    return (
        <View style={[]}>
            <View style={[commonStyles.fdr, MV(0.4)]}>
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
                            commonStyles.shadow,
                            BGCOLOR(colorCode.WHITE),
                            PH(0.3),
                            PV(0.2),
                            { marginVertical: '2%', borderRadius: getWP(0.2) },
                        ]}
                        key={item._id}
                    >
                        <WrappedTextInput
                            value={item.name}
                            placeholder={role + ' name'}
                            {...componentProps.textInputProps}
                            onChangeText={(text) => {
                                setField(text, 'Co-owner', index, 'name');
                            }}
                        />
                        <WrappedTextInput
                            placeholder={role + ' mobile number'}
                            value={item.phoneNumber}
                            onChangeText={(text) => {
                                setField(text, 'Co-owner', index, 'phoneNumber');
                            }}
                            {...componentProps.textInputProps}
                        />
                        <View style={[commonStyles.fdr, { justifyContent: 'flex-end' }]}>
                            <TextButton
                                onPress={() => {}}
                                textProps={componentProps.buttonTextProps}
                                text={'Add'}
                                containerStyle={[commonStyles.buttonContainerStyle, { marginHorizontal: 0 }]}
                            />
                            <TextButton
                                onPress={() => {
                                    onPressCross(role, index);
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

const AddDukanMembers: React.FC<AddDukanMembersProps> = () => {
    const [coOwner, setcoOwner] = useState<member[]>([{ name: '', phoneNumber: '', role: 'Co-owner', _id: getId() }]);
    const [worker, setWorker] = useState<member[]>([{ name: '', phoneNumber: '', role: 'worker', _id: getId() }]);

    const addcoOwner = () => {
        setcoOwner([...coOwner, { name: '', phoneNumber: '', role: 'Co-owner', _id: getId() }]);
    };

    const addWorker = () => {
        setWorker([...worker, { name: '', phoneNumber: '', role: 'worker', _id: getId() }]);
    };

    const setField = (value: string, role: 'Co-owner' | 'worker', index: number, field: 'name' | 'phoneNumber') => {
        let data = role == 'Co-owner' ? [...coOwner] : [...worker];
        data[index][field] = value;

        if (role == 'Co-owner') {
            setcoOwner([...data]);
        } else {
            setWorker([...data]);
        }
    };

    const deleteMember = (role: 'Co-owner' | 'worker', index: number) => {
        let data = role == 'Co-owner' ? [...coOwner] : [...worker];
        console.log(index);
        data.splice(index, 1);

        if (role == 'Co-owner') {
            setcoOwner([...data]);
        } else {
            setWorker([...data]);
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colorCode.WHITE, ...PH(0.5), paddingTop: STATUS_BAR_HEIGHT }}>
            <WrappedText text={'Add member to your shop'} fontSize={fs28} />
            <WrappedText
                text={
                    'Add details related to Co-owner, worker. Co-owner are the person with whom you share ownership of your dukan also this name will be displayed to public with owner for better identification of your dukan. Please add active mobile number of the worker as their phone number will be used for login. you can change any of the details in the setting of the app.Also permission related to their account currently their account is not active you can activate or deactivate worker and Co-owner account any time.'
                }
                fontSize={fs12}
                textColor={colorCode.BLACKLOW(50)}
                containerStyle={{ marginTop: getHP(0.1) }}
            />

            <View style={{ marginTop: getHP(0.4) }}>
                <AddMember
                    onPressPlus={addcoOwner}
                    onPressCross={deleteMember}
                    data={coOwner}
                    role={'Co-owner'}
                    setField={setField}
                />
                <AddMember
                    onPressPlus={addWorker}
                    onPressCross={deleteMember}
                    data={worker}
                    role={'Worker'}
                    setField={setField}
                />
            </View>
        </ScrollView>
    );
};

export default AddDukanMembers;

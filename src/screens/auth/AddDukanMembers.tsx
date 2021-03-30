import React, { useState } from 'react';
import { View } from 'react-native';
import { fs15 } from '../../common';
import { colorCode } from '../../common/color';
import { getHP, getWP } from '../../common/dimension';
import { commonStyles, PH } from '../../common/styles';
import WrappedRoundButton from '../component/WrappedRoundButton';
import WrappedText from '../component/WrappedText';
import ScreenHOC from '../hoc/ScreenHOC';
import Icons from 'react-native-vector-icons/Feather';
import WrappedTextInput from '../component/WrappedTextInput';

export interface AddDukanMembersProps {}

type member = {
    name: string;
    phoneNumber: string;
    role: 'owner' | 'coOwner' | 'worker';
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
    role: 'worker' | 'coOwner';
    data: member[];
    setField: Function;
}) => {
    const componentProps = {
        buttonTextProps: {
            textColor: colorCode.WHITE,
        },
        textInputProps: {
            containerStyle: { ...commonStyles.textInputContainerStyle, width: getWP(4) },
            textInputStyle: { fontSize: fs15 },
            paddingLeft: getWP(0.2),
        },
    };

    return (
        <View>
            <View style={[commonStyles.fdr]}>
                <WrappedText text={'Add ' + role + ' to your dukan'} />
                <WrappedRoundButton
                    height={getHP(0.4)}
                    onPress={() => {
                        onPressPlus();
                    }}
                >
                    <Icons name={'plus'} />
                </WrappedRoundButton>
            </View>
            {data.map((item: member, index: number) => {
                return (
                    <View
                        style={[
                            commonStyles.fdr,
                            commonStyles.aic,
                            { justifyContent: 'space-around' },
                            { width: '100%' },
                        ]}
                        key={item._id}
                    >
                        <WrappedTextInput
                            value={item.name}
                            placeholder={'Name'}
                            {...componentProps.textInputProps}
                            onChangeText={(text) => {
                                console.log(text);
                                setField(text, 'coOwner', index, 'name');
                            }}
                        />
                        <WrappedTextInput
                            placeholder={'Mobile number'}
                            value={item.phoneNumber}
                            onChangeText={(text) => {
                                console.log(text);
                                setField(text, 'coOwner', index, 'phoneNumber');
                            }}
                            {...componentProps.textInputProps}
                        />
                        <WrappedRoundButton
                            height={getHP(0.4)}
                            onPress={() => {
                                onPressCross(role, index);
                            }}
                            containerStyle={{ elevation: 1, backgroundColor: colorCode.WHITE }}
                        >
                            <Icons name={'x'} />
                        </WrappedRoundButton>
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
    const [coOwner, setcoOwner] = useState<member[]>([{ name: '', phoneNumber: '', role: 'coOwner', _id: getId() }]);
    const [worker, setWorker] = useState<member[]>([{ name: '', phoneNumber: '', role: 'worker', _id: getId() }]);

    const addCoOwner = () => {
        setcoOwner([...coOwner, { name: '', phoneNumber: '', role: 'coOwner', _id: getId() }]);
    };

    const addWorker = () => {
        setWorker([...worker, { name: '', phoneNumber: '', role: 'worker', _id: getId() }]);
    };

    const setField = (value: string, role: 'coOwner' | 'worker', index: number, field: 'name' | 'phoneNumber') => {
        let data = role == 'coOwner' ? [...coOwner] : [...worker];
        data[index][field] = value;

        if (role == 'coOwner') {
            setcoOwner([...data]);
        } else {
            setWorker([...data]);
        }
    };

    const deleteMember = (role: 'coOwner' | 'worker', index: number) => {
        let data = role == 'coOwner' ? [...coOwner] : [...worker];
        console.log(index);
        data.splice(index, 1);

        if (role == 'coOwner') {
            setcoOwner([...data]);
        } else {
            setWorker([...data]);
        }
    };

    console.log(coOwner);
    return (
        <ScreenHOC>
            <View style={{ flex: 1, backgroundColor: colorCode.WHITE, ...PH(0.2) }}>
                <WrappedText text={'Add member to your shop'} />
                <WrappedText text={'You can do this later'} />

                <AddMember
                    onPressPlus={addCoOwner}
                    onPressCross={deleteMember}
                    data={coOwner}
                    role={'coOwner'}
                    setField={setField}
                />
                <AddMember
                    onPressPlus={addWorker}
                    onPressCross={deleteMember}
                    data={worker}
                    role={'worker'}
                    setField={setField}
                />
            </View>
        </ScreenHOC>
    );
};

export default AddDukanMembers;

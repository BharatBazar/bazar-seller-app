import React from 'react';
import { View } from 'react-native';
import { fs10, fs12 } from '../../../common';
import { black20, black40, messageColor } from '../../../common/color';
import { AIC, BC, BR, BW, FDR, FLEX, MT } from '../../../common/styles';
import WrappedText from '../../component/WrappedText';
import Icons from 'react-native-vector-icons/Feather';
import WrappedRectangleButton from '@app/screens/component/WrappedRectangleButton';
import { member } from './AddDukanMembers';

import MemberDetails from './MemberDetails';

const AddMember = ({
    onPressPlus,
    onPressCross,
    role,
    data,

    message,
    onPressEdit,
}: {
    message: string;
    onPressPlus: Function;
    onPressCross: Function;
    role: 'Worker' | 'Co-owner';
    data: member[];

    onPressEdit: (shopMember: member, index?: number) => void;
}) => {
    return (
        <View style={[]}>
            <WrappedRectangleButton
                onPress={() => {
                    onPressPlus();
                }}
                containerStyle={[FDR(), MT(0.2), BW(1.5), BC(black20), BR(0.1), { padding: 10 }, AIC()]}
            >
                <Icons name={'plus'} size={30} style={{ height: 30, width: 30 }} color={black40} />

                <View style={[FLEX(1), { marginLeft: 10 }]}>
                    <WrappedText text={'Add ' + role.toLocaleUpperCase() + ' to your dukan'} fontSize={fs12} />
                    <WrappedText text={message} fontSize={fs10} textColor={messageColor} />
                </View>
            </WrappedRectangleButton>
            {data.map((item: member, index: number) => {
                return (
                    <MemberDetails
                        key={item._id}
                        item={item}
                        onPressCross={onPressCross}
                        onPressEdit={onPressEdit}
                        onPressPlus={onPressPlus}
                        role={role}
                        index={index}
                    />
                );
            })}
        </View>
    );
};

export default AddMember;

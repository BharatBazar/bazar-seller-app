import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { fs10, fs12, fs13, fs16, fs17, fs20, mobileValidation } from '../../../common';
import { black20, black40, black50, borderColor, colorCode, mainColor, messageColor } from '../../../common/color';
import { getWP } from '../../../common/dimension';
import { AIC, BC, BGCOLOR, BR, BW, FDR, FLEX, JCC, MH, ML, MT, PH, provideShadow, PV } from '../../../common/styles';
import WrappedText from '../../component/WrappedText';
import Icons from 'react-native-vector-icons/Feather';
import { IRShopMemberDelete, IshopMember } from '../../../server/apis/shopMember/shopMember.interface';
import { deleteShopMember } from '../../../server/apis/shopMember/shopMember.api';
import WrappedRectangleButton from '@app/screens/component/WrappedRectangleButton';
import { member } from './AddDukanMembers';
import ButtonFeatherIcon from '@app/screens/components/button/ButtonFeatherIcon';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import { AlertContext } from '@app/../App';
import { defaultAlertState, IdefaultAlertState } from '@app/hooks/useAlert';
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
    const setAlertState: (data: IdefaultAlertState) => void = React.useContext(AlertContext);

    const deleteMember = async (id: string, index: number) => {
        try {
            const response: IRShopMemberDelete = await deleteShopMember({ _id: id });
            if (response.status == 1) {
                Alert.alert(response.message);
                onPressCross(role, index, true);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            ToastHOC.errorAlert(error.message);
        }
    };

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
            {/* <WrappedText text={message} fontSize={fs12} containerStyle={[MT(0.1)]} textColor={messageColor} />
            <View style={[MT(0.1)]} /> */}
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
            {/* <MemberDetailsPopup
                selectedItem={undefined}
                role={role}
                isVisible={isPopupVisible}
                setPopup={() => {
                    setPopupVisible(false);
                }}
                message={message}
            /> */}
        </View>
    );
};

export default AddMember;

import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { fs12, fs13, fs16, fs17, fs20, mobileValidation } from '../../../common';
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

const AddMember = ({
    onPressPlus,
    onPressCross,
    role,
    data,
    setField,
    submitDetails,
    message,
    onPressEdit,
}: {
    message: string;
    onPressPlus: Function;
    onPressCross: Function;
    role: 'Worker' | 'Co-owner';
    data: member[];
    setField: (
        value: string | Object,
        role: 'Co-owner' | 'Worker',
        index: number,
        field: 'firstName' | 'phoneNumber' | 'error' | 'lastName',
    ) => void;
    submitDetails: (index: number, role: 'Co-owner' | 'worker') => void;
    onPressEdit: (shopMember: member, index?: number) => void;
}) => {
    const [selectedItem, setSelectedItem] = React.useState<member>({});

    // member details adding popup
    const [isPopupVisible, setPopupVisible] = React.useState(false);
    function validateField(index: number) {
        const { phoneNumber, firstName, lastName } = data[index];
        let error: error = {};
        if (!mobileValidation.test(phoneNumber)) {
            error['phoneNumber'] = 'Please enter correct ' + role + ' mobile number';
        }
        if (firstName.length < 3) {
            error['firstName'] = 'Please enter correct ' + role + ' first name.';
        }
        if (lastName.length < 3) {
            error['lastName'] = 'Please enter correct ' + role + ' last name.';
        }
        if (Object.keys(error).length == 0) {
            setField({}, role, index, 'error');
            submitDetails(index, role);
        } else {
            setField(error, role, index, 'error');
        }
    }

    const deleteMember = async (id: string, index: number) => {
        const response: IRShopMemberDelete = await deleteShopMember({ _id: id });
        if (response.status == 1) {
            Alert.alert(response.message);
            onPressCross(role, index, true);
        } else {
            setField(response.message, role, index, 'error');
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
                    <WrappedText text={message} fontSize={fs12} textColor={messageColor} />
                </View>
            </WrappedRectangleButton>
            {/* <WrappedText text={message} fontSize={fs12} containerStyle={[MT(0.1)]} textColor={messageColor} />
            <View style={[MT(0.1)]} /> */}
            {data.map((item: member, index: number) => {
                return (
                    <View
                        style={[
                            { width: '100%' },
                            FDR(),
                            // AIC(),
                            JCC('space-between'),
                            BGCOLOR('#FFFFFF'),
                            provideShadow(),
                            // BGCOLOR(colorCode.CHAKRALOW(20)),

                            {
                                borderRadius: getWP(0.2),

                                paddingVertical: 15,
                                paddingHorizontal: 15,
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: borderColor,
                            },
                        ]}
                        key={item.key}
                        onPress={() => {
                            setSelectedItem(item);
                        }}
                    >
                        <View>
                            <WrappedText
                                text={item.role}
                                fontSize={fs12}
                                containerStyle={[
                                    BGCOLOR(mainColor),
                                    provideShadow(),
                                    { padding: 4, borderRadius: 4, alignItems: 'center' },
                                ]}
                                textColor="#FFF"
                            />
                            <View style={[MT(0.1)]} />
                            <WrappedText text={item.firstName + ' ' + item.lastName} fontSize={fs16} />

                            <WrappedText text={item.phoneNumber} fontSize={fs13} textColor={black50} />
                        </View>
                        <View style={[{ justifyContent: 'flex-end', flexDirection: 'row' }]}>
                            <ButtonFeatherIcon
                                iconName="trash"
                                containerStyle={[provideShadow(1), BGCOLOR('#FFFFFF')]}
                            />
                            <ButtonFeatherIcon
                                iconName="edit"
                                containerStyle={[provideShadow(1), BGCOLOR('#FFFFFF'), ML(0.3)]}
                                onPress={() => {
                                    onPressEdit(item, index);
                                }}
                            />
                        </View>
                    </View>
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

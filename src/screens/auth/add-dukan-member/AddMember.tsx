import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { fs12, fs13, mobileValidation } from '../../../common';
import { black20, black40, colorCode, messageColor } from '../../../common/color';
import { getWP } from '../../../common/dimension';
import { AIC, BC, BGCOLOR, BR, BW, FDR, FLEX, MH, ML, MT, PH, PV } from '../../../common/styles';
import { textInputContainerStyle } from '../../../common/containerStyles';

import WrappedText from '../../component/WrappedText';
import Icons from 'react-native-vector-icons/Feather';
import WrappedTextInput from '../../component/WrappedTextInput';

import ServerErrorText from '../component/errorText';
import { IRShopMemberDelete, IshopMember } from '../../../server/apis/shopMember/shopMember.interface';
import { deleteShopMember } from '../../../server/apis/shopMember/shopMember.api';

import { border } from '../../app/edit/product/component/generalConfig';

import RightComponentButtonWithLeftText from '../../components/button/RightComponentButtonWithLeftText';
import { commonButtonProps } from '../../components/button';
import WrappedRectangleButton from '@app/screens/component/WrappedRectangleButton';
import ModalWithHeader from '@app/screens/components/popup/ModalWithHeader';
import { member } from './AddDukanMembers';
import Ripple from 'react-native-material-ripple';
import MemberDetailsPopup from './MemberDetailsPopup';

const componentProps = {
    buttonTextProps: {
        textColor: colorCode.WHITE,
        textStyle: { fontSize: fs12 },
    },
    textInputProps: {
        containerStyle: [textInputContainerStyle],
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
    message,
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
                    <Ripple
                        style={[
                            { width: '100%' },
                            border,
                            BGCOLOR(colorCode.WHITE),
                            PH(0.3),
                            PV(0.2),
                            { marginVertical: '2%', borderRadius: getWP(0.1) },
                        ]}
                        key={item.key}
                        onPress={() => {
                            setSelectedItem(item);
                        }}
                    >
                        {item.error && item.error['error'] && (
                            <ServerErrorText errorText={item.error['error']} marginTop={0} />
                        )}
                        <View style={[FDR()]}>
                            <View style={[FLEX(1)]}>
                                <WrappedTextInput
                                    value={item.firstName}
                                    placeholder={role + ' first name'}
                                    {...componentProps.textInputProps}
                                    onChangeText={(text) => {
                                        setField(text, role, index, 'firstName');
                                    }}
                                    errorText={item.error['firstName']}
                                />
                            </View>
                            <View style={[FLEX(1), ML(0.1)]}>
                                <WrappedTextInput
                                    value={item.lastName}
                                    placeholder={role + ' last name'}
                                    {...componentProps.textInputProps}
                                    onChangeText={(text) => {
                                        setField(text, role, index, 'lastName');
                                    }}
                                    errorText={item.error['lastName']}
                                />
                            </View>
                        </View>
                        <WrappedTextInput
                            placeholder={role + ' mobile number'}
                            value={item.phoneNumber}
                            onChangeText={(text) => {
                                setField(text, role, index, 'phoneNumber');
                            }}
                            errorText={item.error['phoneNumber']}
                            {...componentProps.textInputProps}
                        />
                        <View style={[FDR(), { justifyContent: 'flex-end', marginTop: 5 }]}>
                            <RightComponentButtonWithLeftText
                                onPress={() => {
                                    validateField(index);
                                }}
                                buttonText={item.added ? 'Update' : 'Add'}
                                {...commonButtonProps}
                                borderWidth={0}
                            />
                            <RightComponentButtonWithLeftText
                                onPress={() => {
                                    if (item.added) {
                                        deleteMember(item._id, index);
                                    } else {
                                        onPressCross(role, index);
                                    }
                                }}
                                buttonText={'Delete'}
                                {...commonButtonProps}
                                borderWidth={0}
                                marginLeft={10}
                            />
                        </View>
                    </Ripple>
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

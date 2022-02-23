import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { fs12, fs13, fs14, fs16, fs17, fs20, mobileValidation } from '../../../common';
import { black20, black40, black50, borderColor, colorCode, mainColor, messageColor } from '../../../common/color';
import { getWP } from '../../../common/dimension';
import { AIC, BC, BGCOLOR, BR, BW, FDR, FLEX, JCC, MH, ML, MT, PH, provideShadow, PV } from '../../../common/styles';
import WrappedText from '../../component/WrappedText';
import Icons from 'react-native-vector-icons/Feather';
import { IRShopMemberDelete, IshopMember, shopMemberRole } from '../../../server/apis/shopMember/shopMember.interface';
import { deleteShopMember } from '../../../server/apis/shopMember/shopMember.api';
import WrappedRectangleButton from '@app/screens/component/WrappedRectangleButton';
import { member } from './AddDukanMembers';
import ButtonFeatherIcon from '@app/screens/components/button/ButtonFeatherIcon';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import { AlertContext } from '@app/../App';
import { defaultAlertState, IdefaultAlertState } from '@app/hooks/useAlert';

interface MemberDetailsProps {
    item: IshopMember;
    onPressPlus: Function;
    onPressCross: Function;
    role: shopMemberRole;
    index?: number;
    onPressEdit: (shopMember: member, index?: number) => void;
}

const MemberDetails: React.FunctionComponent<MemberDetailsProps> = ({
    item,
    onPressCross,
    onPressEdit,
    onPressPlus,
    role,
    index,
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
        <View
            key={item._id}
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
        >
            <View>
                <WrappedText
                    text={item.role}
                    fontSize={fs12}
                    containerStyle={[
                        BGCOLOR(mainColor),
                        provideShadow(),
                        {
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            borderRadius: 4,
                            alignItems: 'center',
                            alignSelf: 'flex-start',
                        },
                    ]}
                    textColor="#FFF"
                />
                <View style={[MT(0.1)]} />
                <WrappedText text={item.firstName + ' ' + item.lastName} fontSize={fs14} />
                {role && role == shopMemberRole.Owner && (
                    <WrappedText text={item.email} fontSize={fs13} textColor={black50} />
                )}
                <WrappedText text={item.phoneNumber} fontSize={fs13} textColor={black50} />
            </View>
            <View style={[{ justifyContent: 'flex-end', flexDirection: 'row' }]}>
                {role !== shopMemberRole.Owner && (
                    <ButtonFeatherIcon
                        iconName="trash"
                        onPress={() => {
                            setAlertState({
                                isVisible: true,
                                heading: 'Delete member',
                                subHeading: 'Are you sure you want to remove ' + item.firstName + ' from your shop?',
                                onPressRightButton: () => {
                                    deleteMember(item._id, index);
                                },
                            });
                        }}
                        containerStyle={[provideShadow(1), BGCOLOR('#FFFFFF')]}
                    />
                )}
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
};

export default MemberDetails;

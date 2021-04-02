import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colorCode } from '../../common/color';
import { BGCOLOR, BR, colorTransparency, commonStyles, MH, MV, PH, PV } from '../../common/styles';

import { ShopDetailsText } from '../../common/customScreenText';
import { fs12, fs13, fs15, fs28, NavigationProps } from '../../common';
import { NavigationKey } from '../../labels';
import WrappedTextInput from '../component/WrappedTextInput';
import { getHP, getWP } from '../../common/dimension';
import TextButton from '../component/TextButton';
import ShadowWrapperHOC from '../hoc/ShadowWrapperHOC';
import HeaderText from './component/HeaderText';

export interface ShopDetailsProps extends NavigationProps {}

const ShopDetails: React.FC<ShopDetailsProps> = ({ navigation }) => {
    const componentProps = {
        buttonTextProps: {
            textColor: colorCode.WHITE,
        },
        textInputProps: {
            containerStyle: commonStyles.textInputContainerStyle,
            textInputStyle: { fontSize: fs13, color: '#000000' + colorTransparency[50] },
            paddingLeft: getWP(0.2),
        },
    };
    return (
        <View style={[{ flex: 1 }, PH(0.3), PV(0.4)]}>
            <ShadowWrapperHOC>
                <>
                    <HeaderText step={'Step 2'} heading={'Dukan Details'} subHeading={ShopDetailsText.MESSAGE} />

                    <View style={{ marginTop: getHP(0.2) }}>
                        <WrappedTextInput value={''} placeholder={'Dukan ka nam'} {...componentProps.textInputProps} />
                        <WrappedTextInput placeholder={'Dukan ka pata'} value={''} {...componentProps.textInputProps} />

                        <TextButton
                            text={'Submit'}
                            textProps={componentProps.buttonTextProps}
                            containerStyle={commonStyles.buttonContainerStyle}
                            onPress={() => {
                                navigation.navigate(NavigationKey.ADDDUKANMEMBERS);
                            }}
                        />
                    </View>
                </>
            </ShadowWrapperHOC>
        </View>
    );
};

export default ShopDetails;

const styles = StyleSheet.create({
    buttonsWrapper: {
        ...commonStyles.absoluteBottomWrapper,
        bottom: '5%',
    },
});

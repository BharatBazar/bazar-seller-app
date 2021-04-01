import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colorCode } from '../../common/color';
import { BGCOLOR, BR, colorTransparency, commonStyles, MH, MV, PH, PV } from '../../common/styles';
import WrappedRectangleButton from '../component/WrappedRectangleButton';
import WrappedText from '../component/WrappedText';
import ScreenHOC from '../hoc/ScreenHOC';
import { ShopDetailsText } from '../../common/customScreenText';
import { fs12, fs15, fs28, NavigationProps } from '../../common';
import { NavigationKey } from '../../labels';
import WrappedTextInput from '../component/WrappedTextInput';
import { getHP, getWP } from '../../common/dimension';
import TextButton from '../component/TextButton';
import { STATUS_BAR_HEIGHT } from '../component/StatusBar';

export interface ShopDetailsProps extends NavigationProps {}

const ShopDetails: React.FC<ShopDetailsProps> = ({ navigation }) => {
    const componentProps = {
        buttonTextProps: {
            textColor: colorCode.WHITE,
        },
        textInputProps: {
            containerStyle: commonStyles.textInputContainerStyle,
            textInputStyle: { fontSize: fs15, color: '#000000' + colorTransparency[50] },
            paddingLeft: getWP(0.2),
        },
    };
    return (
        <View style={[{ flex: 1 }, PH(0.2), BGCOLOR(colorCode.WHITE), { paddingTop: STATUS_BAR_HEIGHT }]}>
            <WrappedText text={'Dukan Details'} fontSize={fs28} />
            <WrappedText
                text={ShopDetailsText.MESSAGE}
                fontSize={fs12}
                textColor={'#000000' + colorTransparency[50]}
                textStyle={{ marginTop: getHP(0.1) }}
            />
            <View style={{ marginTop: getHP(0.2) }}>
                <WrappedTextInput value={''} placeholder={'Dukan ka nam'} {...componentProps.textInputProps} />
                <WrappedTextInput placeholder={'Dukan ka pata'} value={''} {...componentProps.textInputProps} />
                {/* <WrappedTextInput placeholder={'Email'} value={''} {...componentProps.textInputProps} />
                    <WrappedTextInput
                        placeholder={'Create a password'}
                        value={''}
                        eyeButton={true}
                        {...componentProps.textInputProps}
                    /> */}
                <TextButton
                    text={'Submit'}
                    textProps={componentProps.buttonTextProps}
                    containerStyle={commonStyles.buttonContainerStyle}
                    onPress={() => {
                        navigation.navigate(NavigationKey.ADDDUKANMEMBERS);
                    }}
                />
            </View>
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

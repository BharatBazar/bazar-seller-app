import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colorCode } from '../../common/color';
import { BGCOLOR, BR, commonStyles, MH, MV, PH, PV } from '../../common/styles';
import WrappedRectangleButton from '../component/WrappedRectangleButton';
import WrappedText from '../component/WrappedText';
import ScreenHOC from '../hoc/ScreenHOC';
import { CreateDukanText, GlobalText, WelcomeText } from '../../common/customScreenText';
import { fs12, fs14, fs15, fs16, fs18, fs28 } from '../../common';
import { NavigationKey } from '../../labels';
import WrappedTextInput from '../component/WrappedTextInput';
import { getHP, getWP } from '../../common/dimension';
import { color } from 'react-native-reanimated';
import TextButton from '../component/TextButton';

export interface CreateDukanProps {}

export interface CreateDukanState {}

class CreateDukan extends React.Component<CreateDukanProps, CreateDukanState> {
    render() {
        const componentProps = {
            buttonProps: {
                containerStyle: styles.buttonContainerStyle,
            },
            buttonTextProps: {
                textColor: colorCode.WHITE,
            },
            textInputProps: {
                containerStyle: commonStyles.textInputContainerStyle,
                textInputStyle: { fontSize: fs15 },
                paddingLeft: getWP(0.2),
            },
        };

        return (
            <ScreenHOC>
                <View style={[{ flex: 1 }, PH(0.2), BGCOLOR(colorCode.WHITE)]}>
                    <WrappedText text={'Create Your Dukan'} fontSize={fs28} textColor={colorCode.SAFFRON} />
                    <WrappedText text={CreateDukanText.MESSAGE} fontSize={fs12} textColor={colorCode.CHAKRALOW(30)} />
                    <WrappedTextInput {...componentProps.textInputProps} value={''} placeholder={'Name'} />
                    <WrappedTextInput placeholder={'Mobile number'} value={''} {...componentProps.textInputProps} />
                    <WrappedTextInput placeholder={'Email'} value={''} {...componentProps.textInputProps} />
                    <WrappedTextInput
                        placeholder={'Create a password'}
                        value={''}
                        eyeButton={true}
                        {...componentProps.textInputProps}
                    />
                    <TextButton
                        text={'Sign-In'}
                        textProps={componentProps.buttonTextProps}
                        containerStyle={styles.buttonContainerStyle}
                        onPress={() => {}}
                    />
                </View>
            </ScreenHOC>
        );
    }
}

export default CreateDukan;

const styles = StyleSheet.create({
    buttonContainerStyle: {
        ...PH(),
        ...PV(),
        ...MH(),
        ...BR(),
        ...MV(),
        marginTop: getHP(0.2),
        ...commonStyles.alcjcc,
        borderWidth: 1,
        borderColor: colorCode.SAFFRON,
        backgroundColor: colorCode.CHAKRALOW(70),
    },
    buttonsWrapper: {
        ...commonStyles.absoluteBottomWrapper,
        bottom: '5%',
    },
});

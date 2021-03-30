import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colorCode } from '../../common/color';
import { BGCOLOR, BR, colorTransparency, commonStyles, MH, MV, PH, PV } from '../../common/styles';
import WrappedRectangleButton from '../component/WrappedRectangleButton';
import WrappedText from '../component/WrappedText';
import ScreenHOC from '../hoc/ScreenHOC';
import { CreateDukanText } from '../../common/customScreenText';
import { fs12, fs15, fs21, fs24, fs28 } from '../../common';
import { NavigationKey } from '../../labels';
import WrappedTextInput from '../component/WrappedTextInput';
import { getHP, getWP } from '../../common/dimension';
import TextButton from '../component/TextButton';

export interface CreateDukanProps {}

export interface CreateDukanState {}

class CreateDukan extends React.Component<CreateDukanProps, CreateDukanState> {
    render() {
        const componentProps = {
            buttonTextProps: {
                textColor: colorCode.WHITE,
            },
            textInputProps: {
                containerStyle: commonStyles.textInputContainerStyle,
                textInputStyle: { fontSize: fs15, color: '#000000' },
                paddingLeft: getWP(0.2),
            },
        };

        return (
            <ScreenHOC>
                <>
                    <View style={[{ height: getHP(0.5), width: '100%', backgroundColor: colorCode.WHITE }]}>
                        <View style={[commonStyles.fdr, commonStyles.aic]}>
                            <WrappedText text={'Create Your Dukan'} fontSize={fs28} />
                        </View>
                    </View>
                    <View style={[{ flex: 1 }, PH(), BGCOLOR(colorCode.WHITE)]}>
                        <WrappedText
                            text={'Provide shop owner details'}
                            fontSize={fs21}
                            textColor={'#000'}
                            textStyle={{ marginTop: getHP(0.1) }}
                        />
                        <WrappedText
                            text={CreateDukanText.MESSAGE}
                            fontSize={fs12}
                            textColor={'#000000' + colorTransparency[50]}
                            textStyle={{ marginTop: getHP(0.1) }}
                        />
                        <View style={{ marginTop: getHP(0.2) }}>
                            <WrappedTextInput value={''} placeholder={'Name'} {...componentProps.textInputProps} />
                            <WrappedTextInput
                                placeholder={'Mobile number'}
                                value={''}
                                {...componentProps.textInputProps}
                            />
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
                                containerStyle={commonStyles.buttonContainerStyle}
                                onPress={() => {
                                    this.props.navigation.navigate(NavigationKey.SHOPDETAILS);
                                }}
                            />
                        </View>
                    </View>
                </>
            </ScreenHOC>
        );
    }
}

export default CreateDukan;

const styles = StyleSheet.create({
    buttonsWrapper: {
        ...commonStyles.absoluteBottomWrapper,
        bottom: '5%',
    },
});

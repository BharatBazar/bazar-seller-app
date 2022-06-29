import * as React from 'react';
import { View } from 'react-native';
import RightComponentButtonWithLeftText from '../../components/button/RightComponentButtonWithLeftText';
import { commonButtonProps } from '../../components/button';
import { FDR, FLEX, JCC, PV } from '@app/common/styles';
import { mainColor } from '@app/common/color';
import { MTA, PVA } from '@app/common/stylesheet';

interface ButtonPairProps {
    leftButtonText: string;
    rightButtonText: string;
    onPressLeftButton: Function;
    onPressRightButton: Function;
    fontSize?: number;
    alignMent?: 'row' | 'column';
}

const ButtonPair: React.FunctionComponent<ButtonPairProps> = ({
    leftButtonText,
    rightButtonText,
    onPressLeftButton,
    onPressRightButton,
    fontSize,
    alignMent = 'row',
}) => {
    return (
        <View style={alignMent == 'row' ? [FDR(), MTA()] : [MTA(), FDR('column-reverse')]}>
            <RightComponentButtonWithLeftText
                onPress={() => {
                    onPressLeftButton();
                }}
                buttonText={leftButtonText || 'Cancel'}
                backgroundColor="#FFF"
                borderWidth={1}
                fontSize={fontSize}
                buttonTextColor={mainColor}
                borderColor={mainColor}
                containerStyle={[JCC(), alignMent == 'column' ? MTA() : FLEX(1)]}
            />
            <RightComponentButtonWithLeftText
                onPress={() => {
                    onPressRightButton();
                }}
                buttonText={rightButtonText || 'Confirm'}
                borderWidth={0}
                fontSize={fontSize}
                marginLeft={alignMent == 'row' ? 10 : 0}
                containerStyle={[JCC(), alignMent == 'row' ? FLEX(1) : {}]}
            />
        </View>
    );
};

export default ButtonPair;

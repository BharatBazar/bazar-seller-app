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
}

const ButtonPair: React.FunctionComponent<ButtonPairProps> = ({
    leftButtonText,
    rightButtonText,
    onPressLeftButton,
    onPressRightButton,
    fontSize,
}) => {
    return (
        <View style={[FDR(), MTA()]}>
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
                containerStyle={[FLEX(1), JCC()]}
            />
            <RightComponentButtonWithLeftText
                onPress={() => {
                    onPressRightButton();
                }}
                buttonText={rightButtonText || 'Confirm'}
                borderWidth={0}
                fontSize={fontSize}
                marginLeft={10}
                containerStyle={[FLEX(1), JCC()]}
            />
        </View>
    );
};

export default ButtonPair;

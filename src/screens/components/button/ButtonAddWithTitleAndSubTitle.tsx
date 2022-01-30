import { fs14, fs16, fs18, fs22 } from '@app/common';
import { applyColorCode, borderColor, mainColor } from '@app/common/color';
import {
    AIC,
    BC,
    BGCOLOR,
    BR,
    BW,
    colorTransparency,
    DSP,
    FDR,
    FLEX,
    JCC,
    ML,
    PH,
    provideShadow,
    PV,
} from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';

import * as React from 'react';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';

interface ButtonAddWithTitleAndSubTitleProps {
    onPressPlus: Function;
    title: string;
    subTitle: string;
}

const ButtonAddWithTitleAndSubTitle: React.FunctionComponent<ButtonAddWithTitleAndSubTitleProps> = ({
    onPressPlus,
    title,
    subTitle,
}) => {
    return (
        <Ripple
            onPress={() => {
                onPressPlus();
            }}
            style={[
                FDR(),
                BW(2),
                BC(borderColor),
                { marginTop: DSP, padding: DSP * 0.8 },
                BR(0.1),
                { overflow: 'hidden' },
            ]}
        >
            <View style={[FLEX(1.5), JCC()]}>
                <WrappedFeatherIcon
                    iconName="plus"
                    onPress={onPressPlus}
                    containerHeight={35}
                    containerStyle={[BGCOLOR('#FFFFF'), BW(1), BC(borderColor)]}
                />
            </View>
            <View style={[FLEX(8)]}>
                <WrappedText text={title} textColor={mainColor} fontSize={fs16} />
                <WrappedText text={subTitle} textColor={applyColorCode(mainColor, 60)} />
            </View>
        </Ripple>
    );
};

export default ButtonAddWithTitleAndSubTitle;

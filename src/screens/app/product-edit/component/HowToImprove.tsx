import * as React from 'react';
import { Animated, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Ripple from 'react-native-material-ripple';
import WrappedText from '@app/screens/component/WrappedText';
import { AlertBox } from '@app/common/containerStyles';
import ButtonFeatherIcon from '@app/screens/components/button/ButtonFeatherIcon';
import { applyColorCode, borderColor, errorColor, mainColor } from '@app/common/color';
import { fs14, fs16, fs18 } from '@app/common';
import {
    AIC,
    BGCOLOR,
    BR,
    BW,
    colorTransparency,
    DSP,
    FDR,
    FLEX,
    JCC,
    MT,
    MV,
    PH,
    provideShadow,
    PV,
} from '@app/common/styles';
import { marHor } from './generalConfig';
import { MBA, MTA, PA, PHA, PVA } from '@app/common/stylesheet';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';

interface HowToImproveProps {
    note: string;
}

const ANIMATION_DURATION = 400;
const BC = errorColor + colorTransparency[80];

const HowToImprove: React.FunctionComponent<HowToImproveProps> = ({ note }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    // console.log(note);
    return (
        <View
            style={[
                { padding: DSP * 0.6 },
                provideShadow(5),
                BGCOLOR('#ffffff'),
                { borderBottomColor: borderColor, borderBottomWidth: 1 },
            ]}
        >
            <Ripple
                style={[
                    FDR(),
                    AIC(),
                    JCC('space-between'),
                    { paddingHorizontal: DSP },

                    {
                        borderWidth: 2,
                        borderColor: BC,

                        borderRadius: 5,
                    },
                    BGCOLOR(applyColorCode(errorColor, 80)),
                ]}
                onPress={() => {
                    setIsCollapsed(!isCollapsed);
                }}
            >
                <WrappedText
                    text={isCollapsed ? 'Show points about how to improve' : 'Hide points '}
                    textColor={'#FFFFFF'}
                    fontSize={fs16}
                    containerStyle={[FLEX(1)]}
                    fontWeight={'bold'}
                />
                <WrappedFeatherIcon
                    onPress={() => {}}
                    iconName={isCollapsed ? 'expand-more' : 'expand-less'}
                    iconColor={'#FFFFFF'}
                />
            </Ripple>
            <Collapsible duration={ANIMATION_DURATION} collapsed={isCollapsed}>
                <View
                    style={[
                        PA(DSP * 0.7),
                        MTA(2),

                        {
                            borderRadius: 5,
                            borderColor: BC,
                            borderWidth: 2,
                        },
                    ]}
                >
                    {note.map((item, index) => (
                        <WrappedText
                            text={index + 1 + '. ' + item}
                            textStyle={{ lineHeight: fs18 }}
                            fontWeight={'bold'}
                            containerStyle={[MBA(2)]}
                            fontSize={fs14}
                        />
                    ))}
                </View>
            </Collapsible>
        </View>
    );
};

export default HowToImprove;

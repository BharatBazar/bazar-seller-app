import * as React from 'react';
import { View, Animated } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Ripple from 'react-native-material-ripple';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import { fs14, fs16 } from '@app/common';
import { applyColorCode, borderColor, errorColor } from '@app/common/color';
import { AIC, BGCOLOR, colorTransparency, DSP, FDR, FLEX, JCC, MT, PA, provideShadow } from '@app/common/styles';
import { MBA, MTA } from '@app/common/stylesheet';

interface CollapsibleErrorComponentProps {
    error: string[];
}

const ANIMATION_DURATION = 400;
const BC = errorColor + colorTransparency[80];

const CollapsibleErrorComponent: React.FunctionComponent<CollapsibleErrorComponentProps> = ({ error }) => {
    const [collapsed, setCollapsed] = React.useState(false);

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
                onPress={() => {
                    setCollapsed(!collapsed);
                }}
                rippleColor={errorColor}
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
            >
                <WrappedText
                    text={collapsed ? 'Show Error' : 'Hide Error'}
                    textColor={'#FFFFFF'}
                    fontSize={fs16}
                    containerStyle={[FLEX(1)]}
                    fontWeight={'bold'}
                />
                <WrappedFeatherIcon
                    onPress={() => {}}
                    iconName={collapsed ? 'expand-more' : 'expand-less'}
                    iconColor={'#FFFFFF'}
                />
            </Ripple>
            <Collapsible duration={ANIMATION_DURATION} collapsed={collapsed}>
                <View
                    style={[
                        PA(DSP * 0.7),
                        MTA(2),

                        {
                            borderRadius: 5,
                            borderColor: BC,
                            borderWidth: 2,
                        },
                        // BGCOLOR(applyColorCode(errorColor, 40)),
                    ]}
                >
                    {error.map((item, index) => (
                        <WrappedText
                            text={index + 1 + '. ' + item}
                            //textColor={'#FFFFFF'}
                            fontSize={fs14}
                            fontWeight={'bold'}
                            containerStyle={[MBA(2)]}
                        />
                    ))}
                </View>
            </Collapsible>
        </View>
    );
};

export default CollapsibleErrorComponent;

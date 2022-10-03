import { fs12, fs14, fs16 } from '@app/common';
import { applyColorCode, borderColor, errorColor } from '@app/common/color';
import { AIC, BGCOLOR, colorTransparency, DSP, FDR, FLEX, JCC, MT, PA, provideShadow, PT } from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import * as React from 'react';
import { View, Animated } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Ripple from 'react-native-material-ripple';
import { border } from '../component/generalConfig';

interface CollapsibleErrorComponentProps {
    error: string[];
}

const ANIMATION_DURATION = 200;
const BC = errorColor + colorTransparency[80];

const CollapsibleErrorComponent: React.FunctionComponent<CollapsibleErrorComponentProps> = ({ error }) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const borderBottomRadius = new Animated.Value(0);

    React.useEffect(() => {
        if (collapsed) {
            Animated.timing(borderBottomRadius, {
                toValue: 5,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }).start();
        }
    }, [collapsed]);

    return (
        <View
            style={[
                { paddingHorizontal: DSP * 0.7, paddingVertical: DSP },
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
                        borderTopRightRadius: 5,
                        borderTopLeftRadius: 5,
                        borderBottomRightRadius: borderBottomRadius,
                        borderBottomLeftRadius: borderBottomRadius,
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

                        {
                            borderBottomRightRadius: 5,
                            borderBottomLeftRadius: 5,
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
                            containerStyle={[MT(0.06)]}
                        />
                    ))}
                </View>
            </Collapsible>
        </View>
    );
};

export default CollapsibleErrorComponent;

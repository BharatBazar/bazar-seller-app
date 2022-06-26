import { fs12, fs14, fs16 } from '@app/common';
import { applyColorCode, borderColor, errorColor } from '@app/common/color';
import { AIC, BGCOLOR, colorTransparency, DSP, FDR, FLEX, JCC, MT, PA, PT } from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import * as React from 'react';
import { View, Animated } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Ripple from 'react-native-material-ripple';
import { border } from '../../edit/product/component/generalConfig';

interface CollapsibleErrorComponentProps {
    error: string[];
}

const ANIMATION_DURATION = 200;

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
        <View style={[{ paddingHorizontal: DSP * 0.7, paddingTop: DSP }]}>
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
                        borderColor: errorColor + colorTransparency[30],
                        borderTopRightRadius: 5,
                        borderTopLeftRadius: 5,
                        borderBottomRightRadius: borderBottomRadius,
                        borderBottomLeftRadius: borderBottomRadius,
                    },
                    BGCOLOR(applyColorCode(errorColor, 40)),
                ]}
            >
                <WrappedText
                    text={collapsed ? 'Fix this error for sending product live' : 'hide error'}
                    textColor={'#FFFFFF'}
                    fontSize={fs16}
                    containerStyle={[FLEX(1)]}
                    fontWeight={'bold'}
                />
                <WrappedFeatherIcon iconName={collapsed ? 'chevron-down' : 'chevron-up'} iconColor={errorColor} />
            </Ripple>
            <Collapsible duration={ANIMATION_DURATION} collapsed={collapsed}>
                <View
                    style={[
                        PA(DSP * 0.7),

                        { borderBottomRightRadius: 5, borderBottomLeftRadius: 5 },
                        BGCOLOR(applyColorCode(errorColor, 40)),
                    ]}
                >
                    {error.map((item, index) => (
                        <WrappedText
                            text={index + 1 + '. ' + item}
                            textColor={'#FFFFFF'}
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

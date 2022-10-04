import * as React from 'react';
import { Animated, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Ripple from 'react-native-material-ripple';
import WrappedText from '@app/screens/component/WrappedText';
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
    provideShadow,
    PV,
} from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import { PA } from '@app/common/stylesheet';

interface HowToImproveProps {
    note: string;
}

const ANIMATION_DURATION = 500;
const BC = errorColor + colorTransparency[80];

const HowToImprove: React.FunctionComponent<HowToImproveProps> = ({ note }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const borderBottomRadius = React.useRef(new Animated.Value(0));

    React.useEffect(() => {
        if (isCollapsed) {
            Animated.timing(borderBottomRadius.current, {
                toValue: 5,
                duration: ANIMATION_DURATION,
                useNativeDriver: true,
            }).start();
        }

        return () => {
            console.log('Returned');
        };
    }, [isCollapsed]);
    // console.log(note);
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
                        borderBottomRightRadius: borderBottomRadius.current,
                        borderBottomLeftRadius: borderBottomRadius.current,
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
            <Collapsible collapsed={isCollapsed}>
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
                    {note.map((item, index) => (
                        <WrappedText
                            text={`[${index + 1}] ` + item}
                            textStyle={{ lineHeight: fs18 }}
                            fontSize={fs14}
                            containerStyle={[MT(0.05)]}
                            fontWeight={'bold'}
                        />
                    ))}
                </View>
            </Collapsible>
        </View>
    );
};

export default HowToImprove;

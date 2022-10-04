import * as React from 'react';
import { View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Ripple from 'react-native-material-ripple';
import WrappedText from '@app/screens/component/WrappedText';
import { AlertBox } from '@app/common/containerStyles';
import ButtonFeatherIcon from '@app/screens/components/button/ButtonFeatherIcon';
import { applyColorCode, borderColor, errorColor, mainColor } from '@app/common/color';
import { fs14, fs16, fs18 } from '@app/common';
import { AIC, BC, BGCOLOR, BR, BW, DSP, FDR, FLEX, JCC, MT, MV, PH, provideShadow, PV } from '@app/common/styles';
import { marHor } from './generalConfig';
import { PHA, PVA } from '@app/common/stylesheet';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';

interface HowToImproveProps {
    note: string;
}

const HowToImprove: React.FunctionComponent<HowToImproveProps> = ({ note }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    // console.log(note);
    return (
        <View
            style={[
                PHA(),
                PVA(),
                { backgroundColor: '#ffffff' },
                provideShadow(5),
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
                        borderColor: errorColor,
                        borderRadius: 5,
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
            <Collapsible collapsed={isCollapsed}>
                <View style={[AlertBox()]}>
                    {note.map((item, index) => (
                        <WrappedText
                            text={`[${index + 1}] ` + item}
                            textColor={errorColor}
                            textStyle={{ lineHeight: fs18 }}
                            containerStyle={[MT(0.05)]}
                        />
                    ))}
                </View>
            </Collapsible>
        </View>
    );
};

export default HowToImprove;

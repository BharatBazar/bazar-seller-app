import * as React from 'react';
import Collapsible from 'react-native-collapsible';
import { AlertBox } from '@app/common/containerStyles';
import { View } from 'react-native';
import WrappedText from '@app/screens/component/WrappedText';
import { borderColor, errorColor, mainColor } from '@app/common/color';
import { marHor, marTop } from '../product/component/generalConfig';
import { fs14, fs16, fs18 } from '@app/common';
import Accordion from 'react-native-collapsible/Accordion';
import Ripple from 'react-native-material-ripple';
import { BC, BGCOLOR, BR, BW, FDR, JCC, MT, MV, PH, provideShadow } from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';

interface HowToImproveProps {
    note: string;
}

const HowToImprove: React.FunctionComponent<HowToImproveProps> = ({ note }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    console.log(note);
    return (
        <View style={[marHor, MV(0.1), { backgroundColor: '#00000000' }]}>
            <Collapsible collapsed={isCollapsed} style={[{ position: 'absolute', zIndex: 1000 }]}>
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
            <Ripple
                style={[FDR(), JCC('space-between'), BW(1), PH(0.3), BR(0.05), BC(mainColor)]}
                onPress={() => {
                    setIsCollapsed(!isCollapsed);
                }}
            >
                <WrappedText text={'How to improve'} textColor={mainColor} fontSize={fs14} />
                <WrappedFeatherIcon iconName={isCollapsed ? 'chevron-up' : 'chevron-down'} iconColor={mainColor} />
            </Ripple>
        </View>
    );
};

export default HowToImprove;

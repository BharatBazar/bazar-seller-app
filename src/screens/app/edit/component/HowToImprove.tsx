import * as React from 'react';
import Collapsible from 'react-native-collapsible';
import { AlertBox } from '@app/common/containerStyles';
import { View } from 'react-native';
import WrappedText from '@app/screens/component/WrappedText';
import { errorColor } from '@app/common/color';
import { marHor, marTop } from '../product/component/generalConfig';
import { fs16 } from '@app/common';
import Accordion from 'react-native-collapsible/Accordion';
import Ripple from 'react-native-material-ripple';
import { FDR } from '@app/common/styles';

interface HowToImproveProps {
    note: string;
}

const HowToImprove: React.FunctionComponent<HowToImproveProps> = ({ note }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
        <View style={[marHor, marTop]}>
            <Ripple
                style={[FDR(), AlertBox()]}
                onPress={() => {
                    setIsCollapsed(!isCollapsed);
                }}
            >
                <WrappedText text={'How to improve'} textColor={errorColor} fontSize={fs16} />
            </Ripple>
            <Collapsible collapsed={isCollapsed}>
                <View style={[]}>
                    <WrappedText text={note} />
                </View>
            </Collapsible>
        </View>
    );
};

export default HowToImprove;

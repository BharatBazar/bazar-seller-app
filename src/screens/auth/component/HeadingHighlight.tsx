import * as React from 'react';
import { View } from 'react-native';
import { colorCode, mainColor } from '../../../common/color';
import { AIC, BBW, FDR, FLEX } from '../../../common/styles';
import WrappedText from '../../component/WrappedText';

export interface HeadingHighlightProps {
    front: string;
    middle: string;
    last: string;
    fontSize: number;
    highlightColor?: string;
    normalColor?: string;
}

const HeadingHighlight: React.SFC<HeadingHighlightProps> = ({
    front,
    middle,
    last,
    highlightColor,
    fontSize,
    normalColor,
}) => {
    return (
        <View style={[FDR()]}>
            <WrappedText text={front + ' '} fontSize={fontSize} textColor={normalColor || colorCode.BLACK} />
            <WrappedText text={middle + ' '} fontSize={fontSize} textColor={highlightColor || mainColor} />
            <WrappedText text={last} fontSize={fontSize} textColor={normalColor} />
        </View>
    );
};

export default HeadingHighlight;

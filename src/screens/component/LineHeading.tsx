import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { fs12 } from '../../common';
import { colorCode } from '../../common/color';
import { AIC, FDR, MT, PH } from '../../common/styles';
import WrappedText from './WrappedText';

export interface LineHeadingProps {
    text: string;
}

const LineHeading: React.FC<LineHeadingProps> = ({ text }) => {
    return (
        <View style={[FDR(), { width: '100%' }, AIC(), MT(0.4)]}>
            <View style={styles.line} />
            <WrappedText text={text} textStyle={[PH(0.3)]} textColor={colorCode.BLACKLOW(30)} fontSize={fs12} />
            <View style={styles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
    line: {
        borderBottomWidth: 0.8,
        borderRadius: 10,
        height: 1,
        flex: 1,
        borderBottomColor: colorCode.BLACKLOW(20),
    },
});

export default LineHeading;

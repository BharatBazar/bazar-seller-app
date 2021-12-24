import { mainColor } from '@app/common/color';
import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface BorderProps {
    marginTop?: string | number;
    borderStyle?: ViewStyle | ViewStyle[];
}

const Border: React.FunctionComponent<BorderProps> = ({ marginTop, borderStyle }) => {
    return <View style={[styles.borderStyle, borderStyle, { marginTop: marginTop != undefined ? marginTop : '4%' }]} />;
};

export default Border;

const styles = StyleSheet.create({
    borderStyle: {
        borderTopWidth: 2,
        borderColor: mainColor,
        opacity: 0.1,
        marginTop: '4%',
    },
});

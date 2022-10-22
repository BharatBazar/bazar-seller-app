import { mainColor } from '@app/common/color';
import { GENERAL_PADDING } from '@app/common/stylesheet';
import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface BorderProps {
    marginTop?: string | number;
    borderStyle?: ViewStyle | ViewStyle[];
}

const Border: React.FunctionComponent<BorderProps> = ({ marginTop, borderStyle }) => {
    return (
        <View
            style={[
                styles.borderStyle,
                borderStyle,
                { marginTop: marginTop != undefined ? marginTop : GENERAL_PADDING },
            ]}
        />
    );
};

export default Border;

const styles = StyleSheet.create({
    borderStyle: {
        borderTopWidth: 1,
        borderColor: mainColor,
        opacity: 0.1,
        marginTop: '4%',
    },
});

import { fs12, fs16 } from '@app/common';
import { mainColor } from '@app/common/color';
import { AIC, FDR, FLEX } from '@app/common/styles';
import WrappedText from '@app/screens/component/WrappedText';
import CheckBox from '@react-native-community/checkbox';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

interface NormalCheckboxProps {
    value: boolean;
    placeholder?: string;
    setValue: (value: boolean) => void;
    containerStyle?: StyleProp<ViewStyle>;
}

const NormalCheckbox: React.FunctionComponent<NormalCheckboxProps> = (props) => {
    const { value, placeholder, setValue, containerStyle } = props;

    return (
        <View style={[FDR(), AIC(), containerStyle]}>
            <CheckBox
                value={value}
                onValueChange={setValue}
                boxType={'square'}
                tintColors={{ true: mainColor }}
                onCheckColor={mainColor}
                onTintColor={mainColor}
                style={{ height: fs16 }}
            />
            {placeholder != undefined && (
                <WrappedText textStyle={styles.placeholderStyle} containerStyle={{ flex: 1 }} text={placeholder} />
            )}
        </View>
    );
};

export default NormalCheckbox;

const styles = StyleSheet.create({
    placeholderStyle: {
        color: '#00000080',
        fontSize: fs12,
        lineHeight: 20,
        fontWeight: '600',
    },
});

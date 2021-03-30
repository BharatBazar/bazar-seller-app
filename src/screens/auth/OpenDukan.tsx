import * as React from 'react';
import { View } from 'react-native';
import { fs15 } from '../../common';
import { colorCode } from '../../common/color';
import { getWP } from '../../common/dimension';
import { commonStyles } from '../../common/styles';
import ScreenHOC from '../hoc/ScreenHOC';

export interface OpenDukanProps {}

const OpenDukan: React.FC<OpenDukanProps> = () => {
    const componentProps = {
        buttonTextProps: {
            textColor: colorCode.WHITE,
        },
        textInputProps: {
            containerStyle: commonStyles.textInputContainerStyle,
            textInputStyle: { fontSize: fs15 },
            paddingLeft: getWP(0.2),
        },
    };
    return (
        <ScreenHOC>
            <View></View>
        </ScreenHOC>
    );
};

export default OpenDukan;

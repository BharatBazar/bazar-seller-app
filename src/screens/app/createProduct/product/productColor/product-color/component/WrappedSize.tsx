import { FontFamilies } from '@app/constants';
import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { mainColor } from '../../../../../../../common/color';
import { getHP, getWP } from '../../../../../../../common/dimension';
import { BGCOLOR, BR, commonStyles, MH } from '../../../../../../../common/styles';
import WrappedRectangleButton from '../../../../../../component/WrappedRectangleButton';

interface Props {
    size: string;
    selected: boolean;
    onPress: Function;
}

interface State {}

class WrappedSize extends Component<Props, State> {
    state = {};
    render() {
        const { size, onPress, selected } = this.props;
        return (
            <WrappedRectangleButton
                containerStyle={[
                    BGCOLOR(selected ? mainColor : '#ffffff'),
                    { height: getWP(0.8), width: getWP(0.8) },
                    BR(100),
                    MH(0.2),
                    commonStyles.shadow,
                    commonStyles.alcjcc,
                ]}
                onPress={() => {
                    if (!selected) {
                        onPress();
                    }
                }}
            >
                <Text
                    style={{
                        color: !selected ? mainColor : '#ffffff',
                    }}
                >
                    {size}
                </Text>
            </WrappedRectangleButton>
        );
    }
}

export default WrappedSize;

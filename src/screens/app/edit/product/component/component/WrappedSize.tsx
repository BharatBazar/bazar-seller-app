import { FontFamilies } from '@app/constants';
import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { colorCode, mainColor } from '../../../../../../common/color';
import { getHP, getWP } from '../../../../../../common/dimension';
import { AIC, BC, BGCOLOR, BR, JCC, MH, provideShadow } from '../../../../../../common/styles';
import WrappedRectangleButton from '../../../../../component/WrappedRectangleButton';
import { ToastHOC } from '../../../../../hoc/ToastHOC';

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
                    { height: getWP(0.8), width: getWP(0.8), overflow: 'hidden' },
                    BR(100),
                    MH(0.2),
                    provideShadow(),
                    AIC(),
                    JCC(),
                ]}
                onPress={() => {
                    if (!selected) {
                        onPress();
                    } else {
                        ToastHOC.infoAlert('You can deselect a size from delete seciton in size table.');
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

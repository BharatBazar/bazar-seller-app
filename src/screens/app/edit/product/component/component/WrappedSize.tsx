import { MLA, MRA } from '@app/common/stylesheet';
import React, { Component } from 'react';
import { Text } from 'react-native';
import { mainColor } from '../../../../../../common/color';
import { getWP } from '../../../../../../common/dimension';
import { AIC, BGCOLOR, BR, JCC, MH, provideShadow } from '../../../../../../common/styles';
import WrappedRectangleButton from '../../../../../component/WrappedRectangleButton';

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
                    { height: getWP(1), width: getWP(1), overflow: 'hidden' },
                    BR(100),
                    MRA(7),
                    { marginLeft: 1 },
                    !selected && provideShadow(),
                    AIC(),
                    JCC(),
                ]}
                onPress={() => {
                    onPress();
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

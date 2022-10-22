import React, { Component } from 'react';
import { Text } from 'react-native';
import { MRA } from '@app/common/stylesheet';
import { mainColor } from '@app/common/color';
import { getWP } from '@app/common/dimension';
import { AIC, BGCOLOR, BR, JCC, provideShadow } from '@app/common/styles';
import WrappedRectangleButton from '@app/screens/component/WrappedRectangleButton';

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

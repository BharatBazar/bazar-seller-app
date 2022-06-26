import React, { Component } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { fs15, fs16, fs20 } from '../../../../../../common';
import { borderColor, colorCode, mainColor } from '../../../../../../common/color';
import { getHP, getWP } from '../../../../../../common/dimension';
import TextButton from '../../../../../component/TextButton';
import WrappedText from '../../../../../component/WrappedText';
import WrappedTextInput from '../../../../../component/WrappedTextInput';

interface Props {
    containerStyle?: ViewStyle | ViewStyle[];
    counter: number;
    setCounter: Function;
}

interface State {}

class CounterComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            counter: props.counter,
        };
    }

    setCounter = (action: string) => {
        const { counter } = this.props;
        if (action == 'Increment') {
            this.props.setCounter(counter + 1);
        } else if (counter != 0) {
            this.props.setCounter(counter - 1);
        }
    };

    render() {
        const { containerStyle } = this.props;
        return (
            <View style={[styles.container, containerStyle]}>
                <TextButton
                    text={'-'}
                    textProps={{ textColor: colorCode.WHITE }}
                    onPress={() => this.setCounter('Decrement')}
                    containerStyle={styles.containerStyle}
                />
                <WrappedTextInput
                    value={this.props.counter.toString()}
                    containerStyle={{
                        height: getHP(0.35),
                        borderWidth: 2,
                        borderColor: borderColor,
                        paddingHorizontal: getWP(0.1),
                        //width: getWP(1),
                        borderRadius: 5,
                        marginHorizontal: getWP(0.1),
                    }}
                    textInputStyle={{ textAlign: 'center', fontSize: fs15 }}
                />
                <TextButton
                    text={'+'}
                    textProps={{ textColor: colorCode.WHITE }}
                    onPress={() => this.setCounter('Increment')}
                    containerStyle={styles.containerStyle}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: getHP(0.25),
        width: getHP(0.25),
        borderRadius: getHP(0.04),
    },
});

export default CounterComponent;

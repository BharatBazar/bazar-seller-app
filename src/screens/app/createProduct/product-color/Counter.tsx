import React, { Component } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { fs15, fs16, fs20 } from '../../../../common';
import { colorCode, mainColor } from '../../../../common/color';
import { getHP, getWP } from '../../../../common/dimension';
import TextButton from '../../../component/TextButton';
import WrappedText from '../../../component/WrappedText';
import WrappedTextInput from '../../../component/WrappedTextInput';

interface Props {
    containerStyle?: ViewStyle | ViewStyle[];
    counter: number;
}

interface State {
    counter: number;
}

class CounterComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            counter: props.counter,
        };
    }

    setCounter = (action: string) => {
        const { counter } = this.state;

        if (action == 'Increment') {
            this.setState({ counter: this.state.counter + 1 });
        } else if (counter != 0) {
            this.setState({ counter: this.state.counter - 1 });
        }
    };

    render() {
        const { counter } = this.state;
        const { containerStyle } = this.props;
        return (
            <View style={[styles.container, containerStyle]}>
                <TextButton
                    text={'+'}
                    textProps={{ textColor: colorCode.WHITE }}
                    onPress={() => this.setCounter('Increment')}
                    containerStyle={styles.containerStyle}
                />
                <WrappedTextInput
                    value={counter.toString()}
                    containerStyle={{
                        height: getHP(0.35),
                        borderWidth: 0.5,
                        paddingHorizontal: getWP(0.1),
                        //width: getWP(1),
                        marginHorizontal: getWP(0.1),
                    }}
                    textInputStyle={{ textAlign: 'center', fontSize: fs15 }}
                />

                <TextButton
                    text={'-'}
                    textProps={{ textColor: colorCode.WHITE }}
                    onPress={() => this.setCounter('Decrement')}
                    containerStyle={styles.containerStyle}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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

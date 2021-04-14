import React, { Component } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { fs16, fs20 } from '../../../../common';
import { mainColor } from '../../../../common/color';
import { getHP, getWP } from '../../../../common/dimension';
import TextButton from '../../../component/TextButton';
import WrappedText from '../../../component/WrappedText';

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
                    text={'-'}
                    textProps={{ textColor: mainColor }}
                    onPress={() => this.setCounter('Decrement')}
                    containerStyle={styles.containerStyle}
                />
                <WrappedText
                    text={counter.toString()}
                    fontSize={fs16}
                    containerStyle={{ flex: 4, alignItems: 'center' }}
                />
                <TextButton
                    text={'+'}
                    textProps={{ textColor: mainColor }}
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
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        height: getHP(0.12),
        width: getHP(0.12),
        borderRadius: getHP(0.06),
    },
});

export default CounterComponent;

import { StackCardInterpolationProps } from '@react-navigation/stack/src/types';
import { Animated } from 'react-native';

export const Fade = ({ current, next, index, closing, layouts }: StackCardInterpolationProps) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

export const Zoom: ({
    current,
    next,
    inverted,
    layouts: { screen },
}: StackCardInterpolationProps) => { cardStyle: { opacity: Animated.AnimatedInterpolation } } = ({
    current,
    next,
    inverted,
    layouts: { screen },
}: StackCardInterpolationProps) => {
    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }),
        next
            ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
              })
            : 0,
    );

    return {
        cardStyle: {
            transform: [
                {
                    scaleX: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                            0,
                            1, // Fully unfocused
                        ],
                        extrapolate: 'clamp',
                    }),
                },
                {
                    scaleY: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                            0,
                            1, // Fully unfocused
                        ],
                        extrapolate: 'clamp',
                    }),
                },
            ],
        },
    };
};

export const Right = ({ current, layouts }: StackCardInterpolationProps) => {
    return {
        cardStyle: {
            opacity: current.progress,
            transform: [
                {
                    translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                    }),
                },
            ],
        },
    };
};

export const Bottom = ({ current, layouts }: StackCardInterpolationProps) => {
    return {
        cardStyle: {
            opacity: current.progress,
            transform: [
                {
                    translateY: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.height, 0],
                    }),
                },
            ],
        },
    };
};

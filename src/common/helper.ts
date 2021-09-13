import { Alert } from 'react-native';
export const getId = () => {
    return new Date().getTime().toString();
};

export const returnEmptyStringOrValue = (value: any) => {
    return value ? value : '';
};

export const provideAlert = ({
    heading,
    subHeading,
    onPressFirstButton,
    onPressSecondButton,
    buttonText1,
    buttonText2,
}: {
    heading: string;
    subHeading: string;
    buttonText1: string;
    buttonText2: string;
    onPressFirstButton: Function;
    onPressSecondButton?: Function;
}) => {
    Alert.alert(heading, subHeading, [
        {
            text: buttonText1,
            onPress: () => onPressFirstButton(),
        },
        {
            text: buttonText2,
            onPress: () => {
                onPressSecondButton && onPressSecondButton();
            },
        },
    ]);
};

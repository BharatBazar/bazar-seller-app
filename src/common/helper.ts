import { Alert } from 'react-native';
export const getId = () => {
    return new Date().getTime().toString();
};

export const returnEmptyStringOrValue = (value: any) => {
    return value ? value : '';
};

export const compareObjects = (object1: Object, object2: Object) => {
    console.log(Object.keys(object1));
    const a = Object.keys(object1).every((property) => {
        let a = object1[property];
        let b = object2[property];

        if (a != undefined && b != undefined) {
            return a == b;
        } else {
            return false;
        }
    });
    console.log('a', a);
    return a;
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

import { useIsFocused } from '@react-navigation/native';
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

    return a;
};

export const isArrayEqual = (array1: any[], array2: any[]) => {
    if (array1.length != array2.length) {
        return false;
    } else {
        return array1.every((item, index) => {
            let b = array2[index];

            return item == b;
        });
    }
};

export const timeLine = [
    '1 day',
    '2 days',
    '3 days',
    '4 days',
    '5 days',
    '6 days',
    '1 week',
    '2 weeks',
    '3 weeks',
    '4 weeks',
];

export const provideIndex = (initialValue: string) => {
    const a = +initialValue;
    if (a > 6) {
        return 6 + a / 7;
    } else {
        return a - 1;
    }
};

export const parseDays = (data: string) => {
    const [count, denotion] = data.split(' ');
    if (denotion[0] == 'w') {
        return (+count * 7).toString();
    } else {
        return (+count).toString();
    }
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



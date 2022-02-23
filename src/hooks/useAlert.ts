import * as React from 'react';

export interface IdefaultAlertState {
    isVisible: boolean;
    onPressRightButton: Function;
    heading: string;
    subHeading: string;
}

export const defaultAlertState: IdefaultAlertState = {
    isVisible: false,
    onPressRightButton: () => {},
    heading: '',
    subHeading: '',
};

export default function useAlert() {
    const [alertState, setAlertStateInside] = React.useState<IdefaultAlertState>(defaultAlertState);

    const setAlertState = React.useCallback(
        (alertState: IdefaultAlertState) => {
            console.log('set ALer', alertState);
            let rightUserGivenFunction = alertState.onPressRightButton;
            alertState.onPressRightButton = () => {
                rightUserGivenFunction();
                setAlertStateInside(defaultAlertState);
            };
            console.log('setAl af', alertState);
            setAlertStateInside(alertState);
        },
        [alertState],
    );

    const value = React.useMemo(() => {
        return {
            alertState,
            setAlertState,
        };
    }, [alertState, setAlertState]);

    return value;
}

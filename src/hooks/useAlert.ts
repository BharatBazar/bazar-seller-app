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
    const [alertState, setAlertState] = React.useState<IdefaultAlertState>(defaultAlertState);

    const value = React.useMemo(() => {
        return {
            alertState,
            setAlertState,
        };
    }, [alertState, setAlertState]);

    return value;
}

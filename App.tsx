/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { createContext } from 'react';
import type { Node } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import { initializeAxios } from './src/server';
import useAlert, { defaultAlertState } from '@app/hooks/useAlert';
import AlertBox from '@app/screens/components/popup/AlertBox';
import FlashMessage from 'react-native-flash-message';

export const AlertContext = createContext(() => {});

const App: () => Node = () => {
    const { alertState, setAlertState } = useAlert();

    async function initializeApp() {
        console.log('App initialization');
        initializeAxios();
    }

    React.useMemo(() => {
        initializeApp();
    }, []);

    return (
        <>
            <AlertContext.Provider value={setAlertState}>
                <StatusBar translucent={true} backgroundColor={'#00000000'} />
                <AppNavigation />
                <AlertBox
                    {...alertState}
                    onPressLeftButton={() => {
                        setAlertState(defaultAlertState);
                    }}
                    setPopup={() => {
                        setAlertState(defaultAlertState);
                    }}
                />
            </AlertContext.Provider>
            <FlashMessage position={'top'} />
        </>
    );
};

export default App;

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
import Loader from '@app/screens/component/Loader';

export const AlertContext = createContext<Function>(() => {});
export const LoaderContext = createContext<Function>(() => {});

const App: () => Node = () => {
    const { alertState, setAlertState } = useAlert();
    const [loader, setLoader] = React.useState(false);

    async function initializeApp() {
        console.log('App initialization');
        initializeAxios();
    }

    React.useMemo(() => {
        initializeApp();
    }, []);

    const setLoaderCallback = React.useCallback(
        (loaderComingValue: boolean) => {
            if (loaderComingValue) {
                if (loader) {
                }
            } else {
                setLoader(false);
            }
        },
        [loader],
    );

    return (
        <>
            <LoaderContext.Provider value={setLoaderCallback}>
                <AlertContext.Provider value={setAlertState}>
                    <StatusBar translucent={true} backgroundColor={'#00000000'} />
                    <AlertBox
                        {...alertState}
                        onPressLeftButton={() => {
                            setAlertState(defaultAlertState);
                        }}
                        setPopup={() => {
                            setAlertState(defaultAlertState);
                        }}
                    />
                    <AppNavigation />
                </AlertContext.Provider>
            </LoaderContext.Provider>
            <FlashMessage position={'top'} />
            {loader && <Loader />}
        </>
    );
};

export default App;

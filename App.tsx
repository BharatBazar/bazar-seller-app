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
import { StatusBar, View } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import { initializeAxios } from './src/server';
import useAlert, { defaultAlertState } from '@app/hooks/useAlert';
import AlertBox from '@app/screens/components/popup/AlertBox';
import FlashMessage from 'react-native-flash-message';
import Loader from '@app/screens/component/Loader';
import { BGCOLOR, FLEX } from '@app/common/styles';
import { colorCode } from '@app/common/color';

export const AlertContext = createContext<Function>(() => {});
export const LoaderContext = createContext<Function>(() => {});
export const HeaderContext = createContext<any>(() => {});

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

    const setLoaderCallback = React.useCallback((loaderComingValue: boolean) => {
        console.log('laoder value', loaderComingValue);
        if (loaderComingValue) {
            if (loader) {
            } else {
                setLoader(true);
            }
        } else {
            setLoader(false);
        }
    }, []);

    return (
        <View style={[FLEX(1), BGCOLOR(colorCode.BLACK)]}>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
            <LoaderContext.Provider value={setLoaderCallback}>
                <AlertContext.Provider value={setAlertState}>
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
        </View>
    );
};

export default App;

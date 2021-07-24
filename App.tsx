/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';
import { initializeAxios } from './src/server';

const App: () => Node = () => {
    async function initializeApp() {
        console.log('App initialization');
        initializeAxios();
    }

    React.useMemo(() => {
        initializeApp();
    }, []);

    return (
        <>
            <StatusBar translucent={true} backgroundColor={'#00000000'} />
            <AppNavigation />
        </>
    );
};

export default App;

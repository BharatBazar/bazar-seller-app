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
import { SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme, View, StatusBar } from 'react-native';
import AppNavigation from './src/navigation/AppNavigation';

const App: () => Node = () => {
    return (
        <>
            <StatusBar hidden={true} />
            <AppNavigation />
        </>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;

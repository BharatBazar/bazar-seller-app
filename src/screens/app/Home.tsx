import * as React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { fs28 } from '../../common';
import { getHP } from '../../common/dimension';
import { commonStyles, PH, PV } from '../../common/styles';
import WrappedText from '../component/WrappedText';

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
    return (
        <View style={[commonStyles.containerPadidng, PH(0.6), PV(0.5)]}>
            <WrappedText text={'Home of Dukan'} fontSize={fs28} />
        </View>
    );
};

export default Home;

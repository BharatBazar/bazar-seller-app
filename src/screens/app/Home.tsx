import * as React from 'react';
import { Component } from 'react';
import { FlatList, View } from 'react-native';
import { fs28 } from '../../common';
import { colorCode } from '../../common/color';
import { getHP, getWP } from '../../common/dimension';
import { BGCOLOR, BR, commonStyles, MH, MT, MV, PH, PV } from '../../common/styles';
import WrappedText from '../component/WrappedText';

export interface HomeProps {}

const data = [
    {
        name: 'Footwear',
        totalItem: 8,
    },
    {
        name: 'Travels',
        totalItem: 10,
    },
    {
        name: 'Clothes',
        totalItem: 3,
    },
    {
        name: 'Babys',
        totalItem: 2,
    },
];

const Home: React.SFC<HomeProps> = () => {
    return (
        <View>
            <View style={[BGCOLOR(colorCode.WHITE), { borderBottomWidth: 1, borderColor: colorCode.BLACKLOW(10) }]}>
                <WrappedText
                    text={'Product you sell in bharat bazar from your dukan'}
                    containerStyle={{ margin: '5%' }}
                    textColor={colorCode.BLACKLOW(40)}
                />
            </View>
            <FlatList
                data={data}
                numColumns={2}
                style={[PH(0.3)]}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) => (
                    <View
                        style={[
                            MH(0.1),
                            MT(0.1),

                            BR(0.1),
                            {
                                height: getHP(1),
                                flex: 1,
                                backgroundColor: colorCode.WHITE,
                                padding: '5%',
                                borderWidth: 1,
                                borderColor: colorCode.BLACKLOW(20),
                            },
                        ]}
                    >
                        <WrappedText text={item.name} textColor={colorCode.BLACKLOW(60)} containerStyle={{ flex: 1 }} />
                        <WrappedText text={item.totalItem} textColor={colorCode.BLACK} containerStyle={{ flex: 1 }} />
                    </View>
                )}
            />
        </View>
    );
};

export default Home;

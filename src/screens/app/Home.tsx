import * as React from 'react';
import { FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { fs20, NavigationProps } from '../../common';
import { colorCode } from '../../common/color';
import { getHP } from '../../common/dimension';
import { BGCOLOR, commonStyles, PH } from '../../common/styles';
import { NavigationKey } from '../../labels';
import WrappedText from '../component/WrappedText';
import { ShowProductDetails, ShowSubCategory } from './component';

export interface HomeProps extends NavigationProps {}

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

const Home: React.SFC<HomeProps> = ({ navigation }) => {
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
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) => (
                    <ShowSubCategory
                        item={item}
                        onPress={() => {
                            navigation.navigate(NavigationKey.PRODUCT);
                        }}
                    />
                )}
            />
        </View>
    );
};

export default Home;

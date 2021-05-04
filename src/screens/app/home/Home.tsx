import React from 'react';
import { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { fs20, NavigationProps } from '../../../common';
import { colorCode } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import { BGCOLOR, commonStyles, PH } from '../../../common/styles';
import { NavigationKey } from '../../../labels';
import { getShop } from '../../../server/apis/shop/shop.api';
import { IRGetShop, Shop } from '../../../server/apis/shop/shop.interface';
import { DataHandling } from '../../../server/DataHandlingHOC';
import WrappedText from '../../component/WrappedText';
import { ShowProductDetails, ShowSubCategory } from '../component';

export interface HomeProps extends NavigationProps {}

const Home: React.SFC<HomeProps> = ({ navigation }) => {
    const [shop, setShop] = React.useState<Partial<Shop>>({});

    const getShopDetails = async () => {
        let response: IRGetShop = await new DataHandling('').fetchData(getShop, {
            _id: '60694f8582ea63ad28a2ec1f',
        });
        if (response.status == 1) {
            setShop(response.payload);
        } else {
        }
    };

    useEffect(() => {
        getShopDetails();
        return () => {};
    }, []);

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
                data={shop.category}
                keyExtractor={(item) => item.name}
                renderItem={({ item, index }) => (
                    <ShowSubCategory
                        item={item}
                        onPress={() => {
                            if (item.subCategoryExist) {
                                navigation.navigate(NavigationKey.PRODUCTCATEGORY, {
                                    current: shop.subCategory[index],
                                    categoryName: item.name,
                                    forward: shop.subCategory1[index],
                                });
                            } else {
                                navigation.navigate(NavigationKey.PRODUCT, { itemType: item.name });
                            }
                        }}
                    />
                )}
            />
        </View>
    );
};

export default Home;

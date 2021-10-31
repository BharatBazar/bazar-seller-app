import axios from 'axios';
import * as React from 'react';
import { View, TextInput, Alert } from 'react-native';
import { fs18, fs24, NavigationProps } from '../../../common';
import { colorCode, mainColor } from '../../../common/color';
import { getHP, getWP } from '../../../common/dimension';
import { AIC, BGCOLOR, FDR, FLEX, JCC, PH, PV } from '../../../common/styles';
import { NavigationKey } from '../../../labels';
import { apiEndPoint } from '../../../server';
import StatusBar from '../../component/StatusBar';
import WrappedFeatherIcon from '../../component/WrappedFeatherIcon';
import WrappedText from '../../component/WrappedText';
import Status from './component/Status';
import ProductTab from './Tabs';
import IconIcons from 'react-native-vector-icons/MaterialIcons';
import WrappedRoundButton from '@app/screens/component/WrappedRoundButton';
import { APIProductStatus } from '@app/server/apis/product/product.api';
import { IProductStatus } from '@app/server/apis/product/product.interface';

export interface ProductProps extends NavigationProps {
    route: {
        params: { itemType: string; shopId: string; category: string; subCategory: string; subCategory1: string };
    };
}

const Product: React.FC<ProductProps> = ({
    navigation,
    route: {
        params: { itemType, shopId, category, subCategory, subCategory1 },
    },
}) => {
    const [searchedText, setSearchedText] = React.useState('');
    const [status, setStatus] = React.useState<IProductStatus[]>([]);

    const setBaseUrl = () => {
        if (subCategory1) {
            axios.defaults.baseURL = apiEndPoint + `/catalogue/${subCategory1.toLowerCase()}`;
        } else if (subCategory) {
            axios.defaults.baseURL = apiEndPoint + `/catalogue/${subCategory.toLowerCase()}`;
        } else if (category) {
            axios.defaults.baseURL = apiEndPoint + `/catalogue/${category.toLowerCase()}`;
        }
    };

    const getCatalogueStatus = async (data: { shopId: string }) => {
        try {
            console.log(data);
            const a = await APIProductStatus(data);
            setStatus(a.payload);
            console.log(a);
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    React.useMemo(() => {
        setBaseUrl();
        getCatalogueStatus({ shopId: shopId._id });
        // return () => {
        //     axios.defaults.baseURL = apiEndPoint;
        // };
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colorCode.WHITELOW(20) }}>
            <StatusBar statusBarColor={colorCode.CHAKRALOW(70)} />
            <View style={[PV(0.1), BGCOLOR(mainColor)]}>
                <View style={[FDR(), JCC('space-between'), AIC('center'), PH(0.3)]}>
                    <View style={[FDR()]}>
                        <WrappedFeatherIcon
                            onPress={() => {
                                navigation.goBack();
                            }}
                            iconName={'chevron-left'}
                            iconColor={colorCode.WHITE}
                        />
                        <WrappedText text={itemType} textColor={colorCode.WHITE} fontSize={fs18} />
                    </View>

                    <View style={[FDR(), AIC()]}>
                        <WrappedRoundButton onPress={() => {}}>
                            <IconIcons
                                name={'search'}
                                size={fs24}
                                color={'#FFFFFF'}
                                style={{ height: fs24, width: fs24 }}
                            />
                        </WrappedRoundButton>
                        <WrappedFeatherIcon
                            onPress={() => {
                                navigation.navigate(NavigationKey.CREATEPRODUCT, {
                                    update: false,
                                    shopId: shopId,
                                    category,
                                    subCategory1,
                                    subCategory,
                                });
                            }}
                            // containerStyle={{ backgroundColor: colorCode.WHITE }}
                            iconName={'plus'}
                            containerHeight={getHP(0.3)}
                            iconSize={fs24}
                            iconColor={'#FFFFFF'}
                        />
                    </View>
                </View>
                {/* <View
                    style={[
                        {
                            height: getHP(0.5),
                            justifyContent: 'center',
                            paddingTop: getHP(0.1),
                            paddingHorizontal: getWP(0.5),
                        },
                    ]}
                >
                    <TextInput
                        style={[
                            {
                                backgroundColor: colorCode.WHITE,
                                flex: 1,
                                padding: 0,
                                paddingLeft: getWP(0.2),
                                height: getHP(0.5),
                                borderRadius: getHP(0.05),
                            },
                        ]}
                        value={searchedText}
                        onChangeText={(searchedText: string) => setSearchedText(searchedText)}
                        placeholder={'Search listing with PID or title'}
                    />
                </View> */}
            </View>
            {/* <View style={[FLEX(1), FDR(), BGCOLOR('#F3F3F3'), JCC('space-between'), { flexWrap: 'wrap' }, PH(0.3)]}>
                {status.map((item) => (
                    <Status name={item.name} count={item.count} onPress={() => {}} message={item.description} />
                ))}
            </View> */}
            <ProductTab
                tabs={status}
                initialIndex={3}
                navigation={navigation}
                shopId={shopId}
                category={category}
                subCategory={subCategory}
                subCategory1={subCategory1}
            />
        </View>
    );
};

export default Product;

import * as React from 'react';
import { View, TextInput } from 'react-native';
import { color } from 'react-native-reanimated';
import { fs18, fs20, NavigationProps } from '../../../common';
import { colorCode, mainColor } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import { AIC, BGCOLOR, commonStyles, FDR, FLEX, JCC, PH, PV } from '../../../common/styles';
import { NavigationKey } from '../../../labels';
import StatusBar from '../../component/StatusBar';
import WrappedFeatherIcon from '../../component/WrappedFeatherIcon';
import WrappedText from '../../component/WrappedText';
import Status from './component/Status';
import ProductTab from './Tabs';

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
    return (
        <View style={{ flex: 1, backgroundColor: colorCode.WHITELOW(20) }}>
            <StatusBar statusBarColor={colorCode.CHAKRALOW(70)} />
            <View style={[PH(0.3), PV(0.1), BGCOLOR(mainColor)]}>
                <View style={[FDR(), JCC('space-between'), AIC('center')]}>
                    <View style={[commonStyles.fdr]}>
                        <WrappedFeatherIcon
                            onPress={() => {
                                navigation.goBack();
                            }}
                            iconName={'chevron-left'}
                            iconColor={colorCode.WHITE}
                        />
                        <WrappedText text={itemType} textColor={colorCode.WHITE} fontSize={fs18} />
                    </View>

                    <View style={[commonStyles.fdr]}>
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
                            containerStyle={{ backgroundColor: colorCode.WHITE }}
                            iconName={'plus'}
                            containerHeight={getHP(0.3)}
                            iconSize={fs18}
                            iconColor={colorCode.CHAKRALOW(50)}
                        />
                    </View>
                </View>
                <View style={[{ height: getHP(0.5), justifyContent: 'center', paddingTop: getHP(0.1) }]}>
                    <TextInput
                        style={[
                            {
                                paddingHorizontal: '3%',
                                backgroundColor: colorCode.WHITE,
                                flex: 1,
                                height: getHP(0.5),
                                borderRadius: getHP(0.05),
                            },
                        ]}
                        value={searchedText}
                        onChangeText={(searchedText: string) => setSearchedText(searchedText)}
                        placeholder={'Search listing with PID or title'}
                    />
                </View>
            </View>
            <View style={[FLEX(1), FDR(), BGCOLOR('#F3F3F3'), JCC('space-between'), PH(0.3), { flexWrap: 'wrap' }]}>
                <Status
                    name={'Incomplete'}
                    count={10}
                    onPress={() => {}}
                    message={'In this section the item which you have not completed yet.'}
                />
                <Status
                    name={'Completed'}
                    count={5}
                    onPress={() => {}}
                    message={
                        'Items which are completed and available in the inventory but not live. You can scan brcode and can do billing for them.'
                    }
                />
                <Status
                    name={'Waiting for approval'}
                    count={5}
                    onPress={() => {}}
                    message={
                        'Items which you have applied for going live in the market. Our authority will check the product and will inform you if there is any problem related to product.'
                    }
                />
                <Status
                    name={'Rejected from being live'}
                    count={3}
                    onPress={() => {}}
                    message={'Items which are rejected from going live due to some problem.'}
                />
                <Status
                    name={'Live in the bazar'}
                    count={3}
                    onPress={() => {}}
                    message={'Items which are live in the market.Your grahak can check this items.'}
                />
                {/* <ProductTab
                    navigation={navigation}
                    shopId={shopId}
                    category={category}
                    subCategory={subCategory}
                    subCategory1={subCategory1}
                /> */}
            </View>
        </View>
    );
};

export default Product;

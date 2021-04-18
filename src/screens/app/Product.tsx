import * as React from 'react';
import { View, TextInput } from 'react-native';
import { fs18, fs20, NavigationProps } from '../../common';
import { colorCode, mainColor } from '../../common/color';
import { getHP } from '../../common/dimension';
import { BGCOLOR, commonStyles, PH, PV } from '../../common/styles';
import { NavigationKey } from '../../labels';
import StatusBar from '../component/StatusBar';
import WrappedFeatherIcon from '../component/WrappedFeatherIcon';
import WrappedText from '../component/WrappedText';
import ProductTab from './ProductTabs';

export interface ProductProps extends NavigationProps {}

const Product: React.FC<ProductProps> = ({ navigation }) => {
    const [searchedText, setSearchedText] = React.useState('');
    return (
        <View style={{ flex: 1, backgroundColor: mainColor }}>
            <StatusBar statusBarColor={colorCode.CHAKRALOW(70)} />
            <View style={[PH(0.3), PV(0.1)]}>
                <View style={[commonStyles.fdr, commonStyles.aic, commonStyles.spbtw]}>
                    <View style={[commonStyles.fdr]}>
                        <WrappedFeatherIcon
                            onPress={() => {
                                navigation.goBack();
                            }}
                            iconName={'chevron-left'}
                            iconColor={colorCode.WHITE}
                        />
                        <WrappedText text={'Shoes'} textColor={colorCode.WHITE} fontSize={fs18} />
                    </View>

                    <View style={[commonStyles.fdr]}>
                        <WrappedFeatherIcon
                            onPress={() => {
                                navigation.navigate(NavigationKey.CREATEPRODUCT, { update: false });
                            }}
                            containerStyle={{ backgroundColor: colorCode.WHITE }}
                            iconName={'plus'}
                            containerHeight={getHP(0.3)}
                            iconSize={fs18}
                            iconColor={colorCode.CHAKRALOW(50)}
                        />
                    </View>
                </View>
                <View style={[{ height: getHP(0.7), justifyContent: 'center', paddingTop: getHP(0.1) }]}>
                    <TextInput
                        style={[
                            {
                                paddingLeft: '3%',
                                backgroundColor: colorCode.WHITE,
                                flex: 1,
                                height: getHP(0.7),
                                borderRadius: getHP(0.05),
                            },
                        ]}
                        value={searchedText}
                        onChangeText={(searchedText: string) => setSearchedText(searchedText)}
                        placeholder={'Search listing with PID or title'}
                    />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <ProductTab />
            </View>
        </View>
    );
};

export default Product;

import * as React from 'react';
import { Component, useEffect } from 'react';
import { Picker, View } from 'react-native';
import { BR, commonStyles, componentProps, MT, PH, PV } from '../../common/styles';
import {
    categoryType,
    IRGetProductCatalogue,
    product,
} from '../../server/apis/productCatalogue/productCatalogue.interface';
import { DataHandling } from '../../server/DataHandlingHOC';
import { getProductCatalogueAPI } from '../../server/apis/productCatalogue/productCatalogue.api';
import { setUpAxios } from '../../server';
import HeaderText from './component/HeaderText';
import ShadowWrapperHOC from '../hoc/ShadowWrapperHOC';
import Icon from 'react-native-vector-icons/Feather';
import { getHP, getWP } from '../../common/dimension';
import { colorCode } from '../../common/color';
import WrappedText from '../component/WrappedText';
import WrappedRoundButton from '../component/WrappedRoundButton';
import { FlatList } from 'react-native-gesture-handler';
import { FastImageWrapper } from '../component/FastImage';
import { fs10, fs11, fs12, fs13, fs15 } from '../../common';
import WrappedRectangleButton from '../component/WrappedRectangleButton';
import TextButton from '../component/TextButton';

export interface ProductDetail {}

const dataHandling = new DataHandling('');

interface selected {
    selected: boolean;
}

interface productData extends product, selected {}

const ProductDetails: React.SFC<ProductDetail> = () => {
    const [data, setData] = React.useState<productData[]>([]);
    const [selectedItems, setSelectedItems] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState([]);

    const fetchProductDetails = async (data: { categoryType: String }) => {
        const response: IRGetProductCatalogue = await dataHandling.fetchData(getProductCatalogueAPI, data);
        console.log(response);
        if (response.status == 1) {
            const data: productData = response.payload.map((item) => {
                return { ...item, selected: false };
            });
            setData(data);
        } else {
        }
    };

    useEffect(() => {
        setUpAxios();

        fetchProductDetails({ categoryType: 'Category' });
        return () => {};
    }, []);

    return (
        <View style={[{ flex: 1 }, PH(0.3), PV(0.4)]}>
            <ShadowWrapperHOC containerStyle={{ height: getHP(8) }}>
                <>
                    <HeaderText
                        step={'Step 3'}
                        heading={'Dukan Details'}
                        subHeading={'Select what services you provide by your dukan by clicking on the category'}
                    />
                    {/* {error['error'] && <ServerErrorText errorText={error['error']} />}
                     */}

                    <FlatList
                        data={data}
                        numColumns={2}
                        style={{ height: getHP(2), marginTop: getHP(0.2) }}
                        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                        keyExtractor={(item) => item.name}
                        renderItem={({ item, index }: { item: productData; index: number }) => {
                            return (
                                <WrappedRectangleButton
                                    containerStyle={[
                                        BR(0.05),
                                        commonStyles.aic,
                                        item.selected ? commonStyles.shadow : {},
                                        {
                                            backgroundColor: colorCode.WHITE,
                                            borderColor: colorCode.GREENLOW(50),
                                            borderWidth: item.selected ? 0.5 : 0,
                                            flex: 1,
                                            paddingVertical: '2%',
                                            marginHorizontal: '5%',
                                            marginVertical: '3%',
                                        },
                                    ]}
                                    onPress={() => {
                                        const prodcutCategory = [...data];
                                        prodcutCategory[index].selected = !prodcutCategory[index].selected;
                                        prodcutCategory.sort((item) => !item.selected);
                                        setData(prodcutCategory);
                                    }}
                                >
                                    <>
                                        {item.selected ? (
                                            <Icon
                                                name={'check-circle'}
                                                color={colorCode.GREEN}
                                                style={{ position: 'absolute', top: '4%', right: '4%', zIndex: 100 }}
                                            />
                                        ) : (
                                            <View style={{ height: getHP(0.1) }} />
                                        )}
                                        <FastImageWrapper
                                            source={{ uri: item.image }}
                                            imageStyle={{
                                                height: getHP(0.6),
                                                width: getHP(0.6),
                                            }}
                                        />
                                        <View style={[PV(0.1), PH(0.1), commonStyles.aic]}>
                                            <WrappedText
                                                text={item.name}
                                                textColor={
                                                    item.selected ? colorCode.GREENLOW(50) : colorCode.CHAKRALOW(70)
                                                }
                                                fontSize={fs11}
                                                textStyle={{ textAlign: 'center' }}
                                            />
                                            <WrappedText
                                                text={item.description}
                                                textColor={colorCode.BLACKLOW(40)}
                                                fontSize={fs10}
                                                textStyle={{ textAlign: 'center', marginTop: getHP(0.05) }}
                                            />
                                        </View>
                                    </>
                                </WrappedRectangleButton>
                            );
                        }}
                    />
                    <TextButton
                        text={'Submit'}
                        textProps={componentProps.buttonTextProps}
                        containerStyle={{ ...commonStyles.buttonContainerStyle, marginTop: getHP(0.4) }}
                        onPress={() => {
                            //validateFields();
                        }}
                    />
                </>
            </ShadowWrapperHOC>
        </View>
    );
};

export default ProductDetails;

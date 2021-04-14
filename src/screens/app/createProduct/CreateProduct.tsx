import * as React from 'react';
import { FlatList, View, StyleSheet, ScrollView } from 'react-native';
import { fs13, fs18, fs20, fs28, fs40 } from '../../../common';
import { BGCOLOR, commonStyles, componentProps, MT, MV, PH, PV } from '../../../common/styles';
import StatusBar from '../../component/StatusBar';
import WrappedText from '../../component/WrappedText';
import { getHP, getWP } from '../../../common/dimension';
import { mainColor, productColor } from '../../../common/color';
import ColorModal from './component/ColorModal';
import TextButton from '../../component/TextButton';
import Color from './component/Color';
import WrappedFeatherIcon from '../../component/WrappedFeatherIcon';

import Header from './component/Header';
import { ProductColor } from '../../../server/apis/product/product.interface';
import ProductDetails from './component/ProductDetails';

export interface CreateProductProps {}

export interface Icolor {
    name: string;
    colorCode: string;
    rgbaColorCode?: string;
    selected: boolean;
}

export interface Isize {
    value: number;
    selected: boolean;
}

const size: Isize[] = [
    { value: 20, selected: false },
    { value: 21, selected: false },
    { value: 22, selected: false },
    { value: 23, selected: false },
    { value: 24, selected: false },
    { value: 25, selected: false },
];

const productStructure: ProductColor = {
    productSize: size,
};

const CreateProduct: React.FC<CreateProductProps> = () => {
    const [colors, setColors] = React.useState<Icolor[]>([]);
    const [chosenColor, setChosenColor] = React.useState<Icolor[]>([]);
    const [colorPopup, setColorPopup] = React.useState<boolean>(false);
    const [product, setProduct] = React.useState<ProductColor[]>([]);

    const updateColorArray = (index: number) => {
        let updatedColors: Icolor[] = [...colors];
        updatedColors[index].selected = !updatedColors[index].selected;
        setColors(updatedColors.sort((item) => !item.selected));
        setChosenColor(updatedColors.filter((item) => item.selected));
    };

    React.useEffect(() => {
        const data: Icolor[] = productColor.map((item) => {
            item['selected'] = false;
            return item;
        });
        setColors(data);
        return () => {};
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <StatusBar />
            <Header headerTitle={'Create Product'} />
            <ScrollView style={[PV(0.2), PH(0.4)]}>
                {/* <WrappedText text={'Create Product'} fontSize={fs28} /> */}
                <WrappedText text={'Select colors in which product is available??'} fontSize={fs18} />
                {/* <FlatList
                    data={chosenColor}
                    numColumns={2}
                    renderItem={({ item, index }) => <Color item={item} onPress={() => {}} showCancel={true} />}
                    keyExtractor={(item) => item.colorCode}
                /> */}
                <TextButton
                    text={'Edit chosen color'}
                    textProps={componentProps.buttonTextProps}
                    containerStyle={{
                        ...commonStyles.buttonContainerStyle,
                        marginTop: getHP(0.2),
                    }}
                    onPress={() => {
                        setColorPopup(true);
                    }}
                />

                {chosenColor.map((color, index) => (
                    <ProductDetails size={[...size]} index={index} color={color} />
                ))}
            </ScrollView>
            <ColorModal
                isVisible={colorPopup}
                setPopup={setColorPopup}
                updateColorArray={updateColorArray}
                colors={colors}
            />
        </View>
    );
};

export default CreateProduct;

import * as React from 'react';
import { View } from 'react-native';
import { BGCOLOR, commonStyles, componentProps, provideShadow } from '../../../../../common/styles';
import WrappedText from '../../../../component/WrappedText';
import { getHP } from '../../../../../common/dimension';
import { colorCode, productColor } from '../../../../../common/color';
import ColorModal from '../../component/ColorModal';
import TextButton from '../../../../component/TextButton';
import ProductContainer from '../component/productContainerHOC';
import ProductDetailsHeading from '../component/ProductDetailsHeading';
import { fs18 } from '../../../../../common';
import ProductDetails from '../../product-color/ProductDetails';
import { generalSpacing, marHor, marTop } from '../component/generalConfig';

export interface ProductColorProps {}

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

const ProductColor: React.FC<ProductColorProps> = () => {
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
        <View
            style={[
                marTop,
                { paddingBottom: generalSpacing * 2 },
                BGCOLOR(colorCode.WHITE),
                provideShadow(),
                { borderTopRightRadius: getHP(0.2), borderTopLeftRadius: getHP(0.2) },
            ]}
        >
            <View style={[marHor, marTop]}>
                <ProductDetailsHeading
                    heading={'Select Color'}
                    subHeading={'Select color variant for product by clicking on add color.'}
                />

                <TextButton
                    text={'Add color'}
                    textProps={componentProps.buttonTextProps}
                    containerStyle={{
                        ...commonStyles.buttonContainerStyle,
                        marginTop: getHP(0.2),
                    }}
                    onPress={() => {
                        setColorPopup(true);
                    }}
                />
            </View>
            <ColorModal
                isVisible={colorPopup}
                setPopup={setColorPopup}
                updateColorArray={updateColorArray}
                colors={colors}
            />
            {chosenColor.map((color, index) => (
                <ProductDetails size={[...size]} index={index} color={color} />
            ))}
        </View>
    );
};

export default ProductColor;

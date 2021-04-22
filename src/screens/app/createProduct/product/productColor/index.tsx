import * as React from 'react';
import { View } from 'react-native';
import { BGCOLOR, commonStyles, componentProps, provideShadow } from '../../../../../common/styles';
import { getHP } from '../../../../../common/dimension';
import { colorCode, productColor } from '../../../../../common/color';
import ColorModal from '../../component/ColorModal';
import TextButton from '../../../../component/TextButton';
import ProductDetailsHeading from '../component/ProductDetailsHeading';
import ProductDetails from '../../product-color/ProductDetails';
import { generalSpacing, marHor, marTop } from '../component/generalConfig';

export interface ProductColorProps {}

export interface Icolor {
    name: string;
    colorCode: string;
    rgbaColorCode?: string;
    selected: boolean;
}

export type Isize = number[];

const size: Isize = [20, 21, 22, 23, 24, 25, 26, 27];

const productStructure: ProductColor = {
    productSize: size,
};

const ProductColor: React.FC<ProductColorProps> = () => {
    const [colors, setColors] = React.useState<Icolor[]>([]);
    const [chosenColor, setChosenColor] = React.useState<Icolor[]>([]);
    const [colorPopup, setColorPopup] = React.useState<boolean>(false);
    const [product, setProduct] = React.useState<ProductColor[]>([]);

    const updateColorArray = (index: number, updateColorArray?: boolean) => {
        let updatedColors: Icolor[] = [...colors];
        updatedColors[index].selected = !updatedColors[index].selected;
        setColors(updatedColors.sort((item) => !item.selected));
        if (!updateColorArray) {
            setChosenColor(updatedColors.filter((item) => item.selected));
        }
    };

    const deleteColor = (index: number) => {
        let updatedColors: Icolor[] = [...chosenColor];
        updateColorArray(index, true);
        updatedColors.splice(index, 1);
        setChosenColor(updatedColors);
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
                <ProductDetails
                    key={color.colorCode}
                    size={[...size]}
                    index={index}
                    color={color}
                    onDelete={() => {
                        deleteColor(index);
                    }}
                />
            ))}
        </View>
    );
};

export default ProductColor;

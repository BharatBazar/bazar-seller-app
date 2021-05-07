import * as React from 'react';
import { View } from 'react-native';
import { BGCOLOR, commonStyles, componentProps, provideShadow } from '../../../../common/styles';
import { getHP } from '../../../../common/dimension';
import { colorCode, productColor } from '../../../../common/color';
import ColorModal from '../component/ColorModal';
import TextButton from '../../../component/TextButton';
import ProductDetailsHeading from './component/ProductDetailsHeading';
import Color from './Color';
import {
    generalProductColorSchema,
    generalSpacing,
    IPostDataToServer,
    marHor,
    marTop,
} from './component/generalConfig';
import { IProductColor } from '../../../../server/apis/product/product.interface';

export interface ProductColorProps {
    update: boolean;
    postDataToServer: IPostDataToServer;
    productId?: string;
    setProductId: (productId: string) => void;
    productColors: IProductColor[];
    productTypeDetails: {
        category: string;
        subCategory1: string;
        subCategory: string;
    };
}

export interface Icolor {
    name: string;
    colorCode: string;
    rgbaColorCode?: string;
    selected: boolean;
}

export type Isize = string[];

const size: Isize = ['20', '21', '22', '23', '24', '25', '26', '27'];

const ProductColor: React.FC<ProductColorProps> = ({
    update,
    postDataToServer,
    productId,
    setProductId,
    productColors,
    productTypeDetails,
}) => {
    const [colors, setColors] = React.useState<Icolor[]>([]);
    const [chosenColor, setChosenColor] = React.useState<IProductColor[]>(productColors);
    const [colorPopup, setColorPopup] = React.useState<boolean>(false);

    const updateColorArray = (index: number, updateColorArray?: boolean) => {
        let updatedColors: Icolor[] = [...colors];
        updatedColors[index].selected = !updatedColors[index].selected;
        setColors(updatedColors.sort((item) => !item.selected));
        if (!updateColorArray) {
            setChosenColor([
                ...chosenColor,
                {
                    ...generalProductColorSchema,
                    new: true,
                    productColorCode: colors[index].colorCode,
                    productColorName: colors[index].name,
                },
            ]);
        }
    };

    const deleteColor = (index: number) => {
        let updatedColors: IProductColor[] = [...chosenColor];
        updatedColors.splice(index, 1);
        const indexToUpdate: number = colors.findIndex((item) => item.name == chosenColor[index].productColorName);
        updateColorArray(indexToUpdate, true);
        setChosenColor(updatedColors);
    };

    React.useEffect(() => {
        const data: Icolor[] = productColor.map((item) => {
            if (chosenColor.findIndex((color) => color.productColorCode == item.colorCode) > -1) {
                item['selected'] = true;
            } else {
                item['selected'] = false;
            }
            return item;
        });
        setColors(data);
        return () => {};
    }, []);

    React.useEffect(() => {
        setChosenColor(productColors);
    }, [productColors]);

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
                    error={''}
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
                <Color
                    productTypeDetails={productTypeDetails}
                    productColorId={color._id}
                    postDataToServer={postDataToServer}
                    update={update}
                    productId={productId}
                    setProductId={setProductId}
                    key={color.productColorName}
                    color={{ colorCode: color.productColorCode, name: color.productColorName }}
                    size={[...size]}
                    index={index}
                    productColor={color}
                    onDelete={() => {
                        deleteColor(index);
                    }}
                />
            ))}
        </View>
    );
};

export default ProductColor;

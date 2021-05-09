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
import { IProductColor, IProductSize } from '../../../../server/apis/product/product.interface';

export interface Icolor {
    name: string;
    colorCode: string;
    rgbaColorCode?: string;
    selected: boolean;
}

export type Isize = string[];

const size: Isize = ['20', '21', '22', '23', '24', '25', '26', '27'];
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
    errorValue: number;
    setError: (value: number) => void;
}

interface Error {
    generalError?: string;
}

export type possibleValue = 0 | 1 | 2 | 3;
interface AllError {
    [key: string]: possibleValue;
}

const ProductColor: React.FC<ProductColorProps> = ({
    update,
    postDataToServer,
    productId,
    setProductId,
    productColors,
    productTypeDetails,
    errorValue,
    setError,
}) => {
    const [colors, setColors] = React.useState<Icolor[]>([]);
    const [chosenColor, setChosenColor] = React.useState<IProductColor[]>(productColors);
    const [colorPopup, setColorPopup] = React.useState<boolean>(false);
    const [defaultSize, setDefaultSize] = React.useState<IProductSize[]>([]);
    const [error, setErrors] = React.useState<Error>({});
    const [childError, setChildError] = React.useState<possibleValue[]>([]);

    const updateColorArray = (index: number, updateColorArray?: boolean) => {
        let updatedColors: Icolor[] = [...colors];
        updatedColors[index].selected = !updatedColors[index].selected;
        setColors(updatedColors.sort((item) => !item.selected));
        if (!updateColorArray) {
            pushErrorKey();
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

    const checkError = () => {
        let error: Error = {};
        if (chosenColor.length == 0) {
            error['generalError'] = 'Please add atleast one color.';
        }

        setErrors(error);
        if (Object.keys(error).length == 0) {
            return false;
        } else {
            return true;
        }
    };

    const deleteColor = (index: number) => {
        let updatedColors: IProductColor[] = [...chosenColor];
        updatedColors.splice(index, 1);
        removeErrorKey(index);
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

    function pushErrorKey() {
        let error = [...childError];
        error.push(0);
        setChildError(error);
    }

    function removeErrorKey(index: number) {
        let error = [...childError];
        error.splice(index, 1);
        setChildError(error);
    }

    function changeErrorValueAtIndex(index: number, value: possibleValue) {
        let error = [...childError];
        error[index] = value;
        setChildError(error);
    }

    function setAllErrorToParticularValue(value: possibleValue) {
        var error = [...childError];
        childError.splice(0);
        error = error.map((item) => value);
        setChildError(error);
    }

    React.useEffect(() => {
        if (errorValue == 1) {
            const isError = checkError();
            if (isError) {
                setError(3);
            } else {
                setAllErrorToParticularValue(1);
            }
        }
    }, [errorValue]);

    React.useEffect(() => {
        if (errorValue == 1 && childError.length > 0) {
            if (childError.every((item) => item == 2)) {
                //All checks passed
                console.log('All checks passed!');
                setAllErrorToParticularValue(0);
                setError(2);
            } else if (childError.every((item) => item == 3 || item == 2)) {
                //Not All check passed
                console.log(childError, 'Not all checks passed!');
                setAllErrorToParticularValue(0);
                setError(3);
            }
        }
    }, [childError]);

    React.useEffect(() => {
        setChosenColor(productColors);
        if (update && productColors.length > 0) {
            productColors.forEach((item) => pushErrorKey());
            setDefaultSize(productColors[0].productSize);
        }
    }, [productColors]);

    const colorProps = (index: number) => {
        if (index == 0) {
            return { defaultSize: defaultSize, setDeafultSize: setDefaultSize };
        } else
            return {
                defaultSize,
            };
    };

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
                    error={error['generalError']}
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
                    {...colorProps(index)}
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
                    errorValue={childError[index]}
                    setError={(value: possibleValue) => {
                        setTimeout(() => {
                            changeErrorValueAtIndex(index, value);
                        }, 10 + index * 10);
                    }}
                />
            ))}
        </View>
    );
};

export default ProductColor;

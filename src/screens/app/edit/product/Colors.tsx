import * as React from 'react';
import { View } from 'react-native';
import { BGCOLOR, MT, provideShadow } from '../../../../common/styles';
import { componentProps, buttonContainerStyle } from '../../../../common/containerStyles';
import { getHP } from '../../../../common/dimension';
import { colorCode } from '../../../../common/color';
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
import {
    IClassifier,
    IColorApp,
    IFilter,
    IProductColor,
    IProductSize,
} from '../../../../server/apis/product/product.interface';

// Format of productColors data
// [{
//     color: {name:string,description:string,_id:string},
//     sizes: {
//         size:  {name:string,description:string,_id:string},
//         mrp:string,
//         sp: string
//     }
// }]
export interface ProductColorProps {
    update: boolean; //If it is first time or else true means not first time
    distribution: IFilter[]; //distribution gives data about the colors and sizes
    postDataToServer: IPostDataToServer; // To post data to the main prodcut schema for updating color in it mainly
    productId?: string; // productId is main product schema product id
    setProductId: (productId: string) => void; // If nothing is created and you are creating in the lower layer first then product id will be returned from there
    productColors: IProductColor[]; // It is the default data that is alreay provided or created for this product it is complex structure

    productTypeDetails: {
        category: string;
        subCategory: string;
        subCategory1: string;
    }; // This tell about the category or location of product it is basically address to reach product house

    errorValue: number; //Here for every error 3 state arr possible 0 meanse neutral, 1 means start checking, 2 means passed, 3 means failed
    // It basically trigers the error checking in this component
    setError: (value: number) => void; // If error checking has started then it set value of errorNumber that it is passed or failed
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
    distribution,
}) => {
    //Function to set color schema for the component so that it is easily updatable
    const getProductColor = () => {
        let data: { [key: string]: IColorApp } = {};
        productColors.forEach((color) => {
            data[color.color._id] = {
                ...color,
                name: color.color.name,
                description: color.color.description,
                new: false,
            };
        });
        return data;
    };

    //This are all the colors
    const [colors, setColors] = React.useState<IClassifier[]>(distribution[0].values);

    // This are chosen colors
    const [chosenColor, setChosenColor] = React.useState<{ [key: string]: IColorApp }>(getProductColor());

    // Show color popup to select deselect colors
    const [colorPopup, setColorPopup] = React.useState<boolean>(false);

    // Default size is a concept or a secondary flow through which all
    // the component can get a default size according to first component so that they
    // dont need to provide manually as the values are repeating mostly Its value will be
    // always equal to size strucutre of index first color
    const [defaultSize, setDefaultSize] = React.useState<IProductSize[]>([]);

    // Set Errors in the component
    const [error, setErrors] = React.useState<Error>({});

    // Child error is basically a flag for running error handling in the Color Component
    const [childError, setChildError] = React.useState<possibleValue[]>([]);

    // Adding item to selected colors or chosen colors object
    const addItem = (data: IColorApp) => {
        let colors = { ...chosenColor };
        colors[data._id] = data;
        setChosenColor(colors);
    };

    // It is trigered when we need to delete color
    const deleteItem = (data: IColorApp) => {
        let colors = { ...chosenColor };
        delete colors[data._id];
        setChosenColor(colors);
    };

    //
    const updateColorArray = (index: number, updateColorArray?: boolean) => {
        let colorNow = colors[index];

        if (chosenColor[colorNow._id]) {
            deleteItem(colorNow);
        } else {
            if (!updateColorArray) {
                addItem({
                    ...generalProductColorSchema,
                    name: colorNow.name,
                    description: colorNow.description,
                    _id: colorNow._id,
                    new: true,
                });
            } else {
                addItem(colorNow);
            }
        }
        // let updatedColors: Icolor[] = [...colors];
        // updatedColors[index].selected = !updatedColors[index].selected;
        // setColors(updatedColors.sort((item) => !item.selected));
        // if (!updateColorArray) {
        //     pushErrorKey();
        //     setChosenColor([
        //         ...chosenColor,
        //         {
        //             ...generalProductColorSchema,
        //             new: true,
        //             code: colors[index].colorCode,
        //             name: colors[index].name,
        //         },
        //     ]);
        // }
    };

    const checkError = () => {
        let error: Error = {};
        if (Object.keys(chosenColor).length == 0) {
            error['generalError'] = 'Please add atleast one color.';
        }

        setErrors(error);
        if (Object.keys(error).length == 0) {
            return false;
        } else {
            return true;
        }
    };

    const deleteColor = (id: string) => {
        let colors = { ...chosenColor };
        delete colors[id];
        setChosenColor(colors);
    };

    React.useEffect(() => {
        // const data: IClassifier & { selected: boolean }[] = productColor.map((item) => {
        //     if (chosenColor.findIndex((color) => color.name == item.name) > -1) {
        //         item['selected'] = true;
        //     } else {
        //         item['selected'] = false;
        //     }
        //     return item;
        // });
        // setColors(data);

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
                    containerStyle={[MT(0.2), buttonContainerStyle]}
                    onPress={() => {
                        setColorPopup(true);
                    }}
                />
            </View>
            <ColorModal
                chosenColor={chosenColor}
                isVisible={colorPopup}
                setPopup={setColorPopup}
                updateColorArray={updateColorArray}
                colors={colors}
            />
            {Object.values(chosenColor).map((color, index) => (
                <Color
                    //this function provides default size
                    //Default size is to set size for all the other colors it will be always equal to size at index 0
                    {...colorProps(index)}
                    productTypeDetails={productTypeDetails}
                    productColorId={color._id}
                    postDataToServer={postDataToServer}
                    update={update}
                    productId={productId}
                    setProductId={setProductId}
                    key={color.name}
                    color={color}
                    size={distribution[1].values}
                    index={index}
                    productColor={color}
                    onDelete={() => {
                        deleteColor(color._id);
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

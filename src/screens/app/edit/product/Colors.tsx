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
    ErrorState,
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
    ISizeApp,
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
    shopId: string;
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
    shopId,
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
                colorId: color.color._id,
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
    // dont need to provide manually as the values are repeating mostly so
    // all the size will get size at index first..
    const [defaultSize, setDefaultSize] = React.useState<ISizeApp[]>([]);

    // Set Errors in the component
    const [error, setErrors] = React.useState<Error>({});

    // Child error is basically a flag for running error handling in the Color Component
    const [childError, setChildError] = React.useState<ErrorState[]>([]);

    // Adding item to selected colors or chosen colors object
    const addItem = (data: IColorApp) => {
        let colors = { ...chosenColor };
        colors[data.colorId] = data;
        setChosenColor(colors);
    };

    // It is trigered when we need to delete color
    const deleteItem = (data: IClassifier) => {
        let colors = { ...chosenColor };
        delete colors[data._id];
        setChosenColor(colors);
    };

    // delete color
    const deleteColor = (id: string) => {
        let colors = { ...chosenColor };

        delete colors[id];
        setChosenColor(colors);
    };

    // it basically add new color to this color component
    //  and push error key so that it can be tested
    // or else remove error key and delete color from the component
    const updateColorArray = (index: number, updateColorArray?: boolean) => {
        let colorNow = colors[index];

        pushErrorKey();
        const data: IColorApp = {
            ...generalProductColorSchema,
            name: colorNow.name,
            description: colorNow.description,
            colorId: colorNow._id,
            new: true,
        };
        addItem(data);
    };

    //check error on this component itself
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

    // push error or add new error as color is added
    function pushErrorKey() {
        let error = [...childError];
        childError.splice(0);
        error.push(0);

        setChildError(error);
    }

    //remove error key as a color is deleted
    function removeErrorKey(index: number) {
        let error = [...childError];
        error.splice(index, 1);
        setChildError(error);
    }

    //change error value at particular index
    function changeErrorValueAtIndex(index: number, value: possibleValue) {
        let error = [...childError];
        error[index] = value;
        setChildError(error);
    }

    // set all error to particular value so that error check can be triggered
    // into the component where this particular index value is passed
    function setAllErrorToParticularValue(value: possibleValue) {
        var error = [...childError];
        childError.splice(0);
        error = error.map((item) => value);
        setChildError(error);
    }

    // This hook trigger error state if 1 means start checking error
    React.useEffect(() => {
        if (errorValue == 1) {
            //check error in the component first if error is here then
            //pass 3 to parent which means error exist

            const isError = checkError();
            if (isError) {
                setError(3);
            }
            // If error is not in the component then check further in the child compoentn
            else {
                // set all the child error value to 1 which means start testing error values..
                setAllErrorToParticularValue(1);
            }
        }
    }, [errorValue]);

    // when ever child error changes for example the error
    // check is triggered by setting value to one that
    // itself will trigger error check in the child component
    // after child component checks the error it will return its status that is
    // either 2 or 3 if all 2 then it means that error does not exist in the component and it can
    // pass 2 to parent component telling him that no error and 3 for error existence
    // it will be checked only when errorValue is 1 that means trigger error check
    React.useEffect(() => {
        if (errorValue == 1 && childError.length > 0) {
            if (childError.every((item) => item == 2)) {
                //All checks passed
                setAllErrorToParticularValue(0);
                setError(2);
            } else if (childError.every((item) => item == 3 || item == 2)) {
                //Not All check passed
                setAllErrorToParticularValue(0);
                setError(3);
            }
        }
    }, [childError]);

    // when product colors changes it means new color has arrived or the state has to be updated
    // Sometimes the default or if it is update flow then product color data comes after render
    React.useEffect(() => {
        console.log('child error length', productColors.length, update);
        if (productColors.length > 0) {
            setChosenColor(getProductColor());
        }
        if (update && productColors.length > 0) {
            //If update flow then by default size exist so need to add error key
            const errorArray: ErrorState[] = productColors.map((item) => ErrorState.NEUTRAL);
            setChildError(errorArray);
            console.log('child error length', productColors.length, update, childError);
            //updating default size with existing sizes
            const data: ISizeApp[] = productColors[0].sizes.map((size) => {
                return {
                    ...size,
                    name: size.size.name,
                    sizeId: size.size._id,
                };
            });
            setDefaultSize(data);
        }
    }, [productColors.length]);

    // return props to child component
    // pass setDefaultSize to index 0 as only
    // it has right to change default size
    // other component are allowed to copy only
    const colorProps = (index: number) => {
        if (index == 0) {
            return { defaultSize: defaultSize, setDeafultSize: setDefaultSize };
        } else
            return {
                defaultSize,
            };
    };

    console.log(childError);

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
                    heading={distribution[0].name}
                    subHeading={distribution[0].description}
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
                    //Default size is to set size for all the other sizes it will be always equal to size at index 0
                    {...colorProps(index)}
                    shopId={shopId}
                    productTypeDetails={productTypeDetails}
                    productColorId={color.new ? '' : color._id}
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
                        removeErrorKey(index);
                        deleteColor(color.colorId);
                    }}
                    errorValue={childError[index]}
                    setError={(value: possibleValue) => {
                        setTimeout(() => {
                            changeErrorValueAtIndex(index, value);
                        }, 5 + index * 5);
                    }}
                />
            ))}
        </View>
    );
};

export default ProductColor;

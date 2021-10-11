import * as React from 'react';
import { View } from 'react-native';
import { BC, BGCOLOR, BR, BW, JCC, MT, MV, PV } from '../../../../common/styles';
import { ErrorState, IFilter, IPostDataToServer } from './component/generalConfig';
import WrappedText from '../../../component/WrappedText';
import ProductDetailsHeading from './component/ProductDetailsHeading';
import ProductContainer from './component/productContainerHOC';
import ShowFilterModal, { ShowFilter } from './component/ShowFilter';
import { fs18 } from '../../../../common';
import { getHP } from '../../../../common/dimension';
import TextButton from '../../../component/TextButton';
import { borderColor, errorColor, mainColor } from '../../../../common/color';
import { IClassifier, IProduct } from '../../../../server/apis/product/product.interface';
import { APIDeleteFilter } from '../../../../server/apis/product/product.api';
import { ToastHOC } from '../../../hoc/ToastHOC';

export enum selectAction {
    add = 'Add',
    remove = 'Remove',
}

interface Error {
    generalError: string;
}

interface renderFilterProps {
    filter: IFilter;
    index: number;
    fitlerValues: IClassifier | IClassifier[];
    postDataToServer: IPostDataToServer;
    productId: string;
    errorValue: ErrorState;
    setErrorValue: Function;
}
const RenderFilter: React.FunctionComponent<renderFilterProps> = ({
    filter,
    fitlerValues,
    index,
    postDataToServer,
    productId,
    errorValue,
    setErrorValue,
}) => {
    const [showPopup, setPopup] = React.useState<boolean>(false);
    const [selectedTags, setSelected] = React.useState<{ [key: string]: IClassifier }>({});
    const [loading, setLoader] = React.useState(false);
    const [error, setErrors] = React.useState<Partial<Error>>({});

    const addData = (data: IClassifier) => {
        const array = { ...selectedTags };
        array[data._id] = data;
        setSelected(array);
    };

    const deleteData = (data: IClassifier) => {
        const array = { ...selectedTags };
        delete array[data._id];
        setSelected(array);
    };

    const getTypeDetails = () => {
        let exist: IClassifier | undefined | IClassifier[] = fitlerValues || undefined;
        if (exist) {
            var isArr = exist instanceof Array;

            if (!isArr) {
                let data = {};
                data[exist._id] = exist;
                setSelected(data);
            } else {
                let data = {};

                if (exist.length > 0) {
                    exist.forEach((element, index) => {
                        data[element._id] = element;
                        if (exist.length - 1 == index) {
                            setSelected(data);
                        }
                    });
                } else {
                    setSelected({});
                }
            }
        } else {
            setSelected({});
        }
    };

    const addDataInServer = (filterValue: string) => {
        // if (Object.keys(selectedTags).length == 0) {
        //     setErrors({ generalError: 'Please select atleast one filter.' });
        // } else {
        setLoader(true);
        setErrors({});

        const data = {};
        data[filter.type] = [filterValue];

        postDataToServer(
            data,
            () => {
                setLoader(false);
                //setLastSubmittedState({ lastTitle: productTitle, lastSubtitle: productSubTitle });
            },
            (error: string) => {
                setLoader(false);
                setErrors({ generalError: error });
            },
        );
        //}
    };
    const removeDataFromServer = async (filterValue: IClassifier) => {
        try {
            console.log(filterValue);
            setLoader(true);
            setErrors({});

            const data = {};
            data[filter.type] = filterValue._id;

            const response = await APIDeleteFilter({ _id: productId, filter: data, multiple: filter.multiple });
            setLoader(false);
            if (response.status == 1) {
                ToastHOC.successAlert('Filter value deleted!!');
                deleteData(filterValue);
            }
        } catch (error) {
            setLoader(false);
            ToastHOC.errorAlert(error.message, 'Problem deleting filter value from product!!');
        }
    };

    const onSelect = (data: IClassifier) => {
        //  console.log('filter =>', filter, !selectedTags[data._id]);
        if (!filter.multiple) {
            if (selectedTags[data._id]) {
                removeDataFromServer(data);
            } else {
                const array = {};
                array[data._id] = data;
                addDataInServer(data._id);
                setSelected(array);
            }
        } else {
            if (!selectedTags[data._id]) {
                addData(data);
                addDataInServer(data._id);
            } else {
                removeDataFromServer(data._id);
                deleteData(data);
            }
        }
    };

    React.useEffect(() => {
        getTypeDetails();
        // if (isArr && selectedTags && Object.values(selectedTags).length != fitlerValues.length) {
        //     setSelected(getTypeDetails());
        // } else if (!isArr && fitlerValues instanceof Object && selectedTags == {}) {
        //     setSelected(getTypeDetails());
        // }
        return () => {};
    }, [fitlerValues]);

    const checkError = () => {
        if (Object.keys(selectedTags).length == 0) {
            setErrors({ generalError: 'Please select atleast one filter value.' });
            return true;
        } else {
            return false;
        }
    };

    React.useEffect(() => {
        if (errorValue == ErrorState.STARTCHECKING) {
            if (!filter.mandatory) {
                setErrorValue(ErrorState.PASSED);
            } else {
                const isError = checkError();

                setErrorValue(isError ? ErrorState.FAILED : ErrorState.PASSED);
            }
        }
    }, [errorValue]);

    React.useEffect(() => {
        if (Object.keys(selectedTags).length > 0) {
            setErrors({});
        }
    }, [Object.keys(selectedTags).length]);

    return (
        <View
            key={index}
            style={[MT(0.1), { borderBottomWidth: 1, borderColor: '#e5e5e5', paddingBottom: getHP(0.2) }]}
        >
            <WrappedText text={filter.name} fontSize={fs18} />
            <WrappedText text={filter.description} textColor={'#8A8A8A'} />
            {error['generalError'] && (
                <WrappedText text={error.generalError || ''} textColor={errorColor} containerStyle={[MV(0.1)]} />
            )}
            <View style={[MT(0.1)]} />

            <TextButton
                text={selectedTags && Object.keys(selectedTags).length > 0 ? 'Selected Filter' : 'Select Filters'}
                containerStyle={[
                    PV(0.1),
                    BR(0.1),
                    JCC('center'),
                    MT(0.1),
                    BW(1.5),
                    BC(selectedTags && Object.keys(selectedTags).length > 0 ? mainColor : borderColor),
                    BGCOLOR('#FFFFFF'),
                    { marginBottom: getHP(0.2) },
                ]}
                textProps={{ textColor: selectedTags && Object.keys(selectedTags).length > 0 ? mainColor : '#8A8A8A' }}
                onPress={() => {
                    setPopup(true);
                }}
            />
            {selectedTags &&
                Object.values(selectedTags).map((classifier: IClassifier, index: number) => {
                    return (
                        <ShowFilter
                            key={index}
                            item={classifier}
                            onPress={(data) => {
                                onSelect(data);
                            }}
                            selected={selectedTags[classifier._id] != null}
                        />
                    );
                })}
            <View style={[MT(0.1)]} />

            <ShowFilterModal
                isVisible={showPopup}
                setPopup={setPopup}
                title={filter.name}
                description={filter.description}
                placeholderText={filter.name}
                data={filter.values}
                selectedData={selectedTags}
                onSelect={onSelect}
            />
        </View>
    );
};

interface FilterProps {
    filters: IFilter[];
    postDataToServer: IPostDataToServer;
    productDetails: Partial<IProduct>;
    productId: string;
    errorValue: number;
    setError: (value: number) => void;
}

const Filter: React.SFC<FilterProps> = ({
    filters,
    postDataToServer,
    productDetails,
    productId,
    errorValue,
    setError,
}) => {
    // Child error is basically a flag for running error handling in the Color Component
    const [childError, setChildError] = React.useState<ErrorState[]>([]);

    React.useEffect(() => {
        let error = filters.map((item) => ErrorState.NEUTRAL);
        setChildError(error);
    }, [filters]);

    //change error value at particular index
    function changeErrorValueAtIndex(index: number, value: ErrorState) {
        let error = [...childError];
        error[index] = value;
        childError.splice(0);
        setChildError(error);
    }

    // set all error to particular value so that error check can be triggered
    // into the component where this particular index value is passed
    function setAllErrorToParticularValue(value: ErrorState) {
        var error = [...childError];
        childError.splice(0);
        error = error.map((item) => value);
        setChildError(error);
    }

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

    React.useEffect(() => {
        if (errorValue == ErrorState.STARTCHECKING) {
            setAllErrorToParticularValue(ErrorState.STARTCHECKING);
        }
    }, [errorValue]);

    console.log('filter child array error', childError);

    return (
        <ProductContainer>
            <ProductDetailsHeading
                heading={'Filters'}
                subHeading={
                    'Please select filter according to match of product. Filter helps grahak to find suitable product.'
                }
                error={''}
            />
            <View style={[{ borderBottomWidth: 1, borderColor: '#E5E5E5', paddingBottom: getHP(0.2) }]} />
            {filters.map((item, index) => (
                <RenderFilter
                    filter={item}
                    index={index}
                    fitlerValues={productDetails[item.type]}
                    postDataToServer={postDataToServer}
                    productId={productId}
                    errorValue={childError[index]}
                    setErrorValue={(value: ErrorState) => {
                        changeErrorValueAtIndex(index, value);
                    }}
                />
            ))}
        </ProductContainer>
    );
};

export default Filter;

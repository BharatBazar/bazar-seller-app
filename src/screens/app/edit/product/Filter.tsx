import * as React from 'react';
import { View } from 'react-native';
import { BC, BGCOLOR, BR, BW, FDR, JCC, ML, MT, PV } from '../../../../common/styles';
import { IFilter, IPostDataToServer } from './component/generalConfig';
import WrappedText from '../../../component/WrappedText';
import ProductDetailsHeading from './component/ProductDetailsHeading';
import ProductContainer from './component/productContainerHOC';
import ShowFilterModal, { ShowFilter } from './component/ShowFilter';
import { fs12, fs18 } from '../../../../common';
import { getHP } from '../../../../common/dimension';
import ProductButton from './component/ProductButton';
import TextButton from '../../../component/TextButton';
import { borderColor, mainColor } from '../../../../common/color';
import { IClassifier, IProduct } from '../../../../server/apis/product/product.interface';

interface FilterProps {
    filters: IFilter[];
    postDataToServer: IPostDataToServer;
    productDetails: Partial<IProduct>;
}

export enum selectAction {
    add = 'Add',
    remove = 'Remove',
}

interface Error {
    generalError: string;
}

const Filter: React.SFC<FilterProps> = ({ filters, postDataToServer, productDetails }) => {
    const getTypeDetails = (type: keyof IProduct) => {
        let exist: IClassifier | undefined | IClassifier[] = productDetails ? productDetails[type] : undefined;
        if (exist) {
            if (typeof exist === 'object') {
                let data = {};
                data[exist._id] = exist;
                return data;
            } else {
                let data = {};
                exist.forEach((element) => {
                    data[element._id] = element;
                });
                return data;
            }
        } else {
            return {};
        }
    };

    const renderFilter = (filter: IFilter, index: number) => {
        const [showPopup, setPopup] = React.useState<boolean>(false);
        const [selectedTags, setSelected] = React.useState<{ [key: string]: IClassifier }>(getTypeDetails(filter.type));
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

        const submitData = () => {
            if (Object.keys(selectedTags).length == 0) {
                setErrors({ generalError: 'Please select atleast one filter.' });
            } else {
                setLoader(true);
                setErrors({});

                const data = {};
                data[filter.type] = filter.multiple ? Object.keys(selectedTags) : Object.keys(selectedTags)[0];

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
            }
        };

        const onSelect = (data: IClassifier) => {
            if (!filter.multiple) {
                if (selectedTags[data._id]) {
                    deleteData(data);
                } else {
                    const array = {};
                    array[data._id] = data;
                    setSelected(array);
                }
            } else {
                if (!selectedTags[data._id]) {
                    addData(data);
                } else {
                    deleteData(data);
                }
            }
        };

        return (
            <View
                key={index}
                style={[MT(0.1), { borderBottomWidth: 1, borderColor: '#e5e5e5', paddingBottom: getHP(0.2) }]}
            >
                <WrappedText text={filter.name} fontSize={fs18} />
                <WrappedText text={filter.description} textColor={'#8A8A8A'} />
                <WrappedText text={error.generalError || ''} fontSize={fs12} />
                <View style={[MT(0.1)]} />

                <TextButton
                    text={Object.keys(selectedTags).length > 0 ? 'Selected Filter' : 'Select Filters'}
                    containerStyle={[
                        PV(0.1),
                        BR(0.1),
                        JCC('center'),
                        MT(0.2),
                        BW(1.5),
                        BC(Object.keys(selectedTags).length > 0 ? mainColor : borderColor),
                        BGCOLOR('#FFFFFF'),
                        { marginBottom: getHP(0.2) },
                    ]}
                    textProps={{ textColor: Object.keys(selectedTags).length > 0 ? mainColor : '#8A8A8A' }}
                    onPress={() => {
                        setPopup(true);
                    }}
                />
                {Object.values(selectedTags).map((classifier: IClassifier) => {
                    return (
                        <ShowFilter
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
                <View style={[FDR(), JCC('flex-end')]}>
                    <ProductButton
                        buttonText={'Save'}
                        onPress={() => {
                            submitData();
                        }}
                        isLoading={loading}
                    />
                    <View style={[ML(0.1)]} />
                    <ProductButton buttonText={'Undo'} onPress={() => {}} />
                </View>
            </View>
        );
    };

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
            {filters.map((item, index) => renderFilter(item, index))}
        </ProductContainer>
    );
};

export default Filter;

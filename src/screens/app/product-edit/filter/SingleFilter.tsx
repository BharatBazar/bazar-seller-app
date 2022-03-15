import * as React from 'react';
import { View } from 'react-native';
import { BC, BGCOLOR, BR, BW, JCC, MT, MV, PV } from '../../../../common/styles';
import { ErrorState, IFilter, IPostDataToServer } from './component/generalConfig';
import WrappedText from '../../../component/WrappedText';

import ShowFilterModal, { ShowFilter } from './FilterValues';
import { fs18 } from '../../../../common';
import { getHP } from '../../../../common/dimension';
import TextButton from '../../../component/TextButton';
import { borderColor, errorColor, mainColor } from '../../../../common/color';
import { IClassifier, IProduct } from '../../../../server/apis/product/product.interface';
import { APIDeleteFilter } from '../../../../server/apis/product/product.api';
import { ToastHOC } from '../../../hoc/ToastHOC';
import ButtonAddWithTitleAndSubTitle from '@app/screens/components/button/ButtonAddWithTitleAndSubTitle';
import { updateProduct } from '../../edit/product/component/generalConfig';
import { showMessage } from 'react-native-flash-message';
import { ProductIdContext } from '../data-types';
import Loader from '@app/screens/component/Loader';

export enum selectAction {
    add = 'Add',
    remove = 'Remove',
}

interface Error {
    generalError: string;
}

interface SingleFilterProps {
    filter: IFilter;
    index: number;
    filterValues: IClassifier[];
    setFilterValues: (key: string, value: IClassifier[]) => void;

    // postDataToServer: IPostDataToServer;
    // productId: string;
    // errorValue: ErrorState;
    // setErrorValue: Function;
}
const SingleFilter: React.FunctionComponent<SingleFilterProps> = ({
    filter,
    filterValues,
    index,
    setFilterValues,
    // postDataToServer,
    // productId,
    // errorValue,
    // setErrorValue,
}) => {
    const { productId } = React.useContext(ProductIdContext);
    const [showPopup, setPopup] = React.useState<boolean>(false);

    const [loading, setLoader] = React.useState(false);
    const [error, setErrors] = React.useState<Partial<Error>>({});

    const addDataInServer = async (filterValue: IClassifier) => {
        setErrors({});

        const data: Partial<IProduct> = {
            _id: productId,
        };
        let filterValuee: IClassifier[] = filter.multiple
            ? [...filterValues.map((item) => item._id), filterValue._id]
            : [filterValue._id];
        data[filter.type] = filterValuee;
        console.log('data', data, filter);
        try {
            setLoader(true);
            const response = await updateProduct(data);
            if (response.status == 1) {
                setFilterValues(filter.type, filter.multiple ? [...filterValues, filterValue] : [filterValue]);
            }
            setLoader(false);
        } catch (error) {
            showMessage({ type: 'danger', message: error.message });
            setLoader(false);
        }
    };
    const removeDataFromServer = async (filterValue: IClassifier) => {
        try {
            console.log(filterValue);
            setLoader(true);
            setErrors({});

            const data = {};
            data[filter.type] = value;

            const response = await APIDeleteFilter({ _id: productId, filter: data, multiple: filter.multiple });
            setLoader(false);
            if (response.status == 1) {
                ToastHOC.successAlert('Filter value deleted!!');
                //deleteData(filterValue);
            }
        } catch (error) {
            setLoader(false);
            ToastHOC.errorAlert(error.message, 'Problem deleting filter value from product!!');
        }
    };

    const onSelect = (data: IClassifier) => {
        //  console.log('filter =>', filter, !selectedTags[data._id]);
        // if (!filter.multiple) {
        //     if (selectedTags[data._id]) {
        //         removeDataFromServer(data);
        //     } else {
        //         const array = {};
        //         array[data._id] = data;
        //         addDataInServer(data._id);
        //         setSelected(array);
        //     }
        // } else {

        addDataInServer(data);

        // if (!selectedTags[data._id]) {
        //     addData(data);
        //     addDataInServer(data._id);
        // } else {
        //     removeDataFromServer(data._id);
        //     deleteData(data);
        // }
        //}
    };
    console.log('fitler values', filterValues);
    return (
        <View
            key={index}
            style={[MT(0.2), { borderBottomWidth: 1, borderColor: '#e5e5e5', paddingBottom: getHP(0.2) }]}
        >
            {/* <WrappedText text={filter.name} fontSize={fs18} />
            <WrappedText text={filter.description} textColor={'#8A8A8A'} />
            {error['generalError'] && (
                <WrappedText text={error.generalError || ''} textColor={errorColor} containerStyle={[MV(0.1)]} />
            )} */}
            {/* <View style={[MT(0.1)]} /> */}

            {/* <TextButton
                text={
                    selectedTags && Object.keys(selectedTags).length > 0 ? 'Selected Filter' : 'Select value for filter'
                }
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
            /> */}
            <ButtonAddWithTitleAndSubTitle
                title={filter.name}
                subTitle={filter.description}
                onPressPlus={() => {
                    setPopup(true);
                    //setOpenChooseColor(true);
                }}
            />
            {filterValues &&
                filterValues.map((classifier: IClassifier, index: number) => {
                    return (
                        <ShowFilter
                            key={index}
                            item={classifier}
                            onPress={(data) => {
                                onSelect(data);
                            }}
                            selected={true}
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
                selectedData={filterValues || []}
                onSelect={onSelect}
                onDelete={() => {}}
                loading={loading}
            />
            {/* {loading && <Loader />} */}
        </View>
    );
};

export default SingleFilter;

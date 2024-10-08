import * as React from 'react';
import { View } from 'react-native';

import ShowFilterModal, { ShowFilter } from './FilterValues';

import { getHP } from '../../../../common/dimension';

import { FilterInterface, FilterValueInterface, IProduct } from '../../../../server/apis/product/product.interface';

import { ToastHOC } from '../../../hoc/ToastHOC';
import ButtonAddWithTitleAndSubTitle from '@app/screens/components/button/ButtonAddWithTitleAndSubTitle';
import { updateProduct } from '../component/generalConfig';
import { showMessage } from 'react-native-flash-message';
import { ProductIdContext } from '../data-types';

export enum selectAction {
    add = 'Add',
    remove = 'Remove',
}

interface Error {
    generalError: string;
}

interface SingleFilterProps {
    filter: FilterInterface;
    index: number;
    filterValues: FilterValueInterface[];
    setFilterValues: (key: string, value: FilterValueInterface[]) => void;

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

    const addDataInServer = async (filterValue: FilterValueInterface) => {
        setErrors({});
        console.log('data in server');
        const data: Partial<IProduct> = {
            _id: productId,
        };
        let filterValuee: string[] = filter.multiple
            ? filterValues
                ? [...filterValues.map((item) => item._id), filterValue._id]
                : [filterValue._id]
            : [filterValue._id];
        //  console.log('data', data, filterValuee, filterValues);
        data[filter.key] = filterValuee;
        //  console.log('data', data, filter);
        try {
            setLoader(true);
            const response = await updateProduct(data);
            if (response.status == 1) {
                console.log('respo se', response);
                setFilterValues(
                    filter.key,
                    filter.multiple ? (filterValues ? [...filterValues, filterValue] : [filterValue]) : [filterValue],
                );
            }
            setLoader(false);
        } catch (error) {
            showMessage({ type: 'danger', message: error.message });
            setLoader(false);
        }
    };
    const removeDataFromServer = async (filterValue: FilterValueInterface) => {
        try {
            console.log(filterValue);
            setLoader(true);
            setErrors({});

            const data = {
                _id: productId,
            };
            let selectedValue = filter.multiple
                ? filterValues.filter((item) => item._id != filterValue._id).map((item) => item._id)
                : [];
            data[filter.key] = selectedValue;

            //const response = await APIDeleteFilter({ _id: productId, filter: data, multiple: filter.multiple });
            const response = await updateProduct(data);

            if (response.status == 1) {
                setFilterValues(
                    filter.key,
                    filter.multiple ? filterValues.filter((item) => item._id != filterValue._id) : [],
                );
                setLoader(false);
                ToastHOC.successAlert('Filter value deleted!!');
                //deleteData(filterValue);
            }
        } catch (error) {
            setLoader(false);
            ToastHOC.errorAlert(error.message, 'Problem deleting filter value from product!!');
        }
    };

    const onSelect = (data: FilterValueInterface) => {
        addDataInServer(data);
    };

    const onDelete = (data: FilterValueInterface) => {
        removeDataFromServer(data);
    };

    return (
        <View key={index} style={[, { borderBottomWidth: 1, borderColor: '#e5e5e5', paddingBottom: getHP(0.2) }]}>
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
                filterValues.map((classifier: FilterValueInterface, index: number) => {
                    return (
                        <ShowFilter
                            key={index}
                            item={classifier}
                            onPress={(data) => {
                                onDelete(classifier);
                            }}
                            selected={true}
                        />
                    );
                })}

            <ShowFilterModal
                isVisible={showPopup}
                setPopup={setPopup}
                title={filter.name}
                description={filter.description}
                placeholderText={filter.name}
                data={filter.values}
                selectedData={filterValues || []}
                onSelect={onSelect}
                onDelete={onDelete}
                loading={loading}
            />
            {/* {loading && <Loader />} */}
        </View>
    );
};

export default SingleFilter;

import * as React from 'react';
import { View } from 'react-native';
import { MT } from '../../../../common/styles';
import { IFilter } from './component/generalConfig';
import WrappedText from '../../../component/WrappedText';
import ProductDetailsHeading from './component/ProductDetailsHeading';
import ProductContainer from './component/productContainerHOC';
import ShowFilterModal from './component/ShowFilter';

interface FilterProps {
    filters: IFilter[];
}

const Filter: React.SFC<FilterProps> = ({ filters }) => {
    const renderFilter = (filter: IFilter) => {
        const [showPopup, setPopup] = React.useState(false);
        const [selectedTags, setSelected] = React.useState([]);

        return (
            <View style={[MT(0.1)]}>
                <WrappedText text={filter.name} />
                <WrappedText text={filter.description} textColor={'#8A8A8A'} />

                <ShowFilterModal isVisible={showPopup} setPopup={setPopup} />
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
            {filters.map((item) => renderFilter(item))}
        </ProductContainer>
    );
};

export default Filter;

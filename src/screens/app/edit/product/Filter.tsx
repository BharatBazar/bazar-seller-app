import * as React from 'react';
import { View } from 'react-native';
import { BC, BGCOLOR, BR, BW, FDR, JCC, ML, MT, PV } from '../../../../common/styles';
import { IFilter } from './component/generalConfig';
import WrappedText from '../../../component/WrappedText';
import ProductDetailsHeading from './component/ProductDetailsHeading';
import ProductContainer from './component/productContainerHOC';
import ShowFilterModal, { ShowFilter } from './component/ShowFilter';
import { fs18 } from '../../../../common';
import { getHP } from '../../../../common/dimension';
import ProductButton from './component/ProductButton';
import TextButton from '../../../component/TextButton';
import { borderColor, mainColor } from '../../../../common/color';

interface FilterProps {
    filters: IFilter[];
}

const Filter: React.SFC<FilterProps> = ({ filters }) => {
    const renderFilter = (filter: IFilter) => {
        const [showPopup, setPopup] = React.useState(false);
        const [selectedTags, setSelected] = React.useState([]);

        return (
            <View style={[MT(0.1), { borderBottomWidth: 1, borderColor: '#e5e5e5', paddingBottom: getHP(0.2) }]}>
                <WrappedText text={filter.name} fontSize={fs18} />
                <WrappedText text={filter.description} textColor={'#8A8A8A'} />
                <View style={[MT(0.1)]} />

                <TextButton
                    text={selectedTags.length == 0 ? 'Selected Filter' : 'Select Filters'}
                    containerStyle={[
                        PV(0.1),
                        BR(0.1),
                        JCC('center'),
                        MT(0.2),
                        BW(1.5),
                        BC(selectedTags.length == 0 ? mainColor : borderColor),
                        BGCOLOR('#FFFFFF'),
                        { marginBottom: getHP(0.2) },
                    ]}
                    textProps={{ textColor: selectedTags.length == 0 ? mainColor : '#8A8A8A' }}
                    onPress={() => {
                        setPopup(true);
                    }}
                />
                <View style={[MT(0.1)]} />
                <ShowFilter selected={true} />
                <ShowFilter selected={true} />
                <ShowFilter selected={true} />

                <ShowFilterModal isVisible={showPopup} setPopup={setPopup} />
                <View style={[FDR(), JCC('flex-end')]}>
                    <ProductButton buttonText={'Save'} onPress={() => {}} />
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
            {filters.map((item) => renderFilter(item))}
        </ProductContainer>
    );
};

export default Filter;

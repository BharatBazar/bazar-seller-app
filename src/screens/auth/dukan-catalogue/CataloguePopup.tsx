import ModalWithHeaderAndButton from '@app/screens/components/popup/ModalWithHeader';
import * as React from 'react';
import { View } from 'react-native';
import LoadProductDetails from '../component/LoadProductDetails';

interface CataloguePopupProps {
    isVisible: boolean;
    setPopup: Function;
    title: string;
    query: { parent: string; active: boolean };
}

const CataloguePopup: React.FunctionComponent<CataloguePopupProps> = ({
    isVisible = false,
    setPopup = () => {},
    title = '',
    query,
}) => {
    return (
        <ModalWithHeaderAndButton
            contentContainerStyle={{ backgroundColor: '#FFFFFF' }}
            heading={title}
            isVisible={isVisible}
            setPopup={setPopup}
        >
            <View>
                <LoadProductDetails
                    query={query}
                    data={subCategory[newSubCategory._id]}
                    setData={(data: productData[]) => {
                        updateSubCategory(data, newSubCategory._id);
                    }}
                />
            </View>
        </ModalWithHeaderAndButton>
    );
};

export default CataloguePopup;

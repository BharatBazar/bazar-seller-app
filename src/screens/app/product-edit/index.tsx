import HeaderWithBackButtonTitleAndrightButton from '@app/screens/components/header/HeaderWithBackButtonTitleAndrightButton';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

interface EditProductProps {
    update?: boolean;
}

const EditProduct: React.FunctionComponent<EditProductProps> = ({ update }) => {
    return (
        <View style={styles.container}>
            <HeaderWithBackButtonTitleAndrightButton title={update ? 'Update Product' : 'Create Product'} />
        </View>
    );
};

export default EditProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

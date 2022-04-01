import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { productStatus } from '@app/server/apis/product/product.interface';
import * as React from 'react';
import { View } from 'react-native';

interface ProductCompleteCTAProps {
    status: productStatus;
    onPress: Function;
}

const ProductCompleteCTA: React.FunctionComponent<ProductCompleteCTAProps> = ({ status, onPress }) => {
    const buttonText =
        status == productStatus.INVENTORY
            ? 'Send For Approval'
            : status == productStatus.REJECTED
            ? 'Apply again for approval'
            : status == productStatus.WAITINGFORAPPROVAL
            ? 'Your product will be approved soon'
            : '';

    console.log(status);
    return (
        <View>
            <RightComponentButtonWithLeftText
                buttonText={buttonText}
                containerStyle={[]}
                onPress={() => {
                    onPress();
                }}
            />
        </View>
    );
};

export default ProductCompleteCTA;

import * as React from 'react';
import { View } from 'react-native';
import { MT } from '../../../../common/styles';
import WrappedCheckBox from '../../../component/WrappedCheckBox';
import WrappedRectangleButton from '../../../component/WrappedRectangleButton';
import WrappedTextInput from '../../../component/WrappedTextInput';
import ProductButton from '../product/component/ProductButton';
import ProductContainer from '../product/component/productContainerHOC';
import ProductDetailsHeading from '../product/component/ProductDetailsHeading';
import { padVer } from '../product/component/styles';

export interface ShowPriceProps {}

const ShowPrice: React.FC<ShowPriceProps> = () => {
    const [showProductPrice, setShowProductPrice] = React.useState<boolean>(false);
    return (
        <ProductContainer>
            <ProductDetailsHeading
                heading={'Product price'}
                subHeading={
                    'Show product price to your customer when product goes live in the market. If no then they can query product price in chat.'
                }
            />
            <WrappedRectangleButton
                onPress={() => {
                    setShowProductPrice(!showProductPrice);
                }}
            >
                <WrappedCheckBox
                    placeholder={'Yes show price to my cutomer.'}
                    value={showProductPrice}
                    setValue={(value) => {
                        setShowProductPrice(value);
                    }}
                    containerStyle={[padVer]}
                />
            </WrappedRectangleButton>
            <ProductButton buttonText={'Save'} onPress={() => {}} />
        </ProductContainer>
    );
};

export default ShowPrice;

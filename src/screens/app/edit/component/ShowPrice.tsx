import * as React from 'react';
import WrappedCheckBox from '../../../component/WrappedCheckBox';
import WrappedRectangleButton from '../../../component/WrappedRectangleButton';
import ProductButton from '../product/component/ProductButton';
import ProductContainer from '../product/component/productContainerHOC';
import ProductDetailsHeading from '../product/component/ProductDetailsHeading';
import { padVer } from '../product/component/generalConfig';

export interface ShowPriceProps {
    showPrice: boolean;
}

const ShowPrice: React.FC<ShowPriceProps> = ({ showPrice }) => {
    const [showProductPrice, setShowProductPrice] = React.useState<boolean>(showPrice || false);
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

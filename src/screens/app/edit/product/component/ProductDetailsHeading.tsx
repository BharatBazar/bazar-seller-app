import * as React from 'react';
import { View } from 'react-native';
import { fs12, fs15, fs16, fs18 } from '../../../../../common';
import { colorCode } from '../../../../../common/color';
import WrappedText from '../../../../component/WrappedText';
import { generalSpacing, marTop } from './generalConfig';

export interface ProductDetailsHeadingProps {
    heading: string;
    subHeading: string;
    error?: string;
}

const ProductDetailsHeading: React.SFC<ProductDetailsHeadingProps> = ({ heading, subHeading, error }) => {
    return (
        <View>
            {heading.length > 0 && <WrappedText text={heading} fontSize={fs16} />}
            {subHeading.length > 0 && (
                <WrappedText
                    text={subHeading}
                    fontSize={fs12}
                    textColor={colorCode.BLACKLOW(30)}
                    containerStyle={[{ marginTop: generalSpacing / 2 }]}
                />
            )}
            {error ? <WrappedText text={error} fontSize={fs12} textColor={colorCode.RED} /> : <View />}
        </View>
    );
};

export default ProductDetailsHeading;

import * as React from 'react';
import TextButton from '../../../../component/TextButton';
import { BR, commonStyles, componentProps } from '../../../../../common/styles';
import { getHP } from '../../../../../common/dimension';
import { fs10, fs11, fs12, fs9 } from '../../../../../common';
import { borRad, marTop, padHor } from './styles';
import { colorCode } from '../../../../../common/color';

export interface ProductButtonProps {
    buttonText: string;
    onPress: Function;
}

const ProductButton: React.SFC<ProductButtonProps> = ({ buttonText, onPress }) => {
    return (
        <TextButton
            text={buttonText}
            onPress={() => {
                onPress();
            }}
            textProps={{ fontSize: fs11, textColor: colorCode.WHITE }}
            containerStyle={[
                {
                    alignSelf: 'flex-start',

                    height: getHP(0.3),
                    width: '40%',
                    justifyContent: 'center',
                },
                padHor,
                borRad,
                marTop,
            ]}
        />
    );
};

export default ProductButton;

import * as React from 'react';
import TextButton from '../../../../component/TextButton';
import { BR, componentProps } from '../../../../../common/styles';
import { getHP } from '../../../../../common/dimension';
import { fs10, fs11, fs12, fs9 } from '../../../../../common';
import { borRad, marTop, padHor } from './generalConfig';
import { colorCode } from '../../../../../common/color';

export interface ProductButtonProps {
    buttonText: string;
    onPress: Function;
    isLoading?: boolean;
    disabled?: boolean;
    buttonWidth?: number;
}

const ProductButton: React.SFC<ProductButtonProps> = ({ buttonText, onPress, isLoading, disabled, buttonWidth }) => {
    return (
        <TextButton
            text={buttonText}
            onPress={() => {
                onPress();
            }}
            isLoading={isLoading}
            disabled={disabled}
            textProps={{ fontSize: fs11, textColor: colorCode.WHITE }}
            containerStyle={[
                {
                    alignSelf: 'flex-start',

                    height: getHP(0.3),
                    width: buttonWidth || '30%',
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

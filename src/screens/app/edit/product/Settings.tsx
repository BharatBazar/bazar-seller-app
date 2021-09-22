import TextSwitch from './component/TextSwitch';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { BC, BGCOLOR, BR, BW, JCC, MT, PV } from '../../../../common/styles';
import WrappedCheckBox from '../../../component/WrappedCheckBox';
import { getHP } from '../../../../common/dimension';
import { fs13, fs17 } from '../../../../common';
import { borderColor, colorCode, mainColor } from '../../../../common/color';
import DeadlineContainer from './component/DeadlineContainer';
import TextButton from '../../../component/TextButton';
import ProductContainer from './component/productContainerHOC';
import WrappedRectangleButton from '../../../component/WrappedRectangleButton';
import ProductButton from './component/ProductButton';
import ProductDetailsHeading from './component/ProductDetailsHeading';
import { marTop, padVer } from './component/generalConfig';
import { IProduct } from '@app/server/apis/product/product.interface';

interface ProductSettingsProps {}

const ProductSettings: React.FunctionComponent<ProductSettingsProps> = () => {
    const [isVisible, setPopup] = React.useState(false);
    const [newDeadline, setDeadline] = React.useState(null);
    const [showTag, setTag] = React.useState(false);

    const values: Partial<IProduct> = {
        showPrice: false,
        returnAllowed: false,
        new: false,
        newDeadline: undefined,
    };

    const setValues = (property: keyof Partial<IProduct>, value: boolean | Date) => {
        values[property] = value;
    };

    return (
        <ProductContainer>
            <ProductDetailsHeading heading={'Product settings'} subHeading={'This are product settings'} />
            <TextSwitch
                heading={'Show NEW tag'}
                subHeading={"New tag tell's grahak that the product is new and has arrived recently."}
                onToggle={(show: boolean) => {
                    if (show) {
                        setPopup(true);
                        setTag(true);
                    } else {
                        setTag(false);
                    }
                }}
            >
                {showTag && (
                    <TextButton
                        text={newDeadline || 'Select for how much time you want to show new tag.'}
                        containerStyle={[
                            PV(0.1),
                            BR(0.1),
                            JCC('center'),
                            MT(0.2),
                            BW(1.5),
                            BC(newDeadline ? mainColor : borderColor),
                            BGCOLOR(colorCode.WHITE),
                        ]}
                        textProps={{ textColor: newDeadline ? mainColor : colorCode.BLACKLOW(40) }}
                        onPress={() => {
                            setPopup(true);
                        }}
                    />
                )}
                <DeadlineContainer isVisible={isVisible} setPopup={setPopup} onSubmit={setDeadline} />
            </TextSwitch>
            <TextSwitch
                heading={'Show Product price'}
                subHeading={
                    'Show product price to your customer when product goes live in the market. If no then they can query product price in chat.'
                }
                onToggle={() => {}}
            />
            <TextSwitch
                heading={'Return allowed for product'}
                subHeading={'Customer can return the product with a certain days to shop again.'}
                onToggle={() => {}}
            />
        </ProductContainer>
    );
};

export default ProductSettings;

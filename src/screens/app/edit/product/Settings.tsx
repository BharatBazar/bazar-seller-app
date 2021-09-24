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
import { compareObjects } from '@app/common/helper';

interface IProductSetting {
    showPrice: boolean;
    new: boolean;
    newDeadline?: string;
    returnAllowed: boolean;
}
interface ProductSettingsProps {
    data: IProductSetting;
}

const ProductSettings: React.FunctionComponent<ProductSettingsProps> = ({ data }) => {
    const [isVisible, setPopup] = React.useState(false);
    const [deadline, setDeadline] = React.useState(null);
    const [showTag, setTag] = React.useState(false);
    const [showButton, setShowButton] = React.useState(false);

    React.useEffect(() => {
        if (data) {
            values = data;
        }
    }, [data]);

    var lastValues: IProductSetting = {
        showPrice: false,
        returnAllowed: false,
        new: false,
        newDeadline: undefined,
    };

    React.useEffect(() => {
        console.log('data => ', data);
        values = { ...data };
        setDeadline(data.newDeadline);
    }, [data]);

    var values: IProductSetting = {
        showPrice: false,
        returnAllowed: false,
        new: false,
        newDeadline: '',
    };

    const setValues = (property: keyof IProductSetting, value: boolean | Date) => {
        values[property] = value;

        // console.log(compareObjects(values, data), values, data);
        if (!compareObjects(values, data)) {
            setShowButton(true);
        } else {
            if (showButton) {
                setShowButton(false);
            }
        }
    };

    return (
        <ProductContainer>
            <ProductDetailsHeading heading={'Product Settings'} subHeading={'This are product settings'} />
            <TextSwitch
                initialValue={data['new']}
                heading={'Show NEW tag'}
                subHeading={"New tag tell's grahak that the product is new and has arrived recently."}
                onToggle={(show: boolean) => {
                    setValues('new', show);
                    if (show) {
                        setPopup(true);
                        setTag(true);
                    } else {
                        setValues('newDeadline', '');
                        setTag(false);
                    }
                }}
            >
                {showTag && (
                    <TextButton
                        text={deadline || 'Select for how much time you want to show new tag.'}
                        containerStyle={[
                            PV(0.1),
                            BR(0.1),
                            JCC('center'),
                            MT(0.2),
                            BW(1.5),
                            BC(deadline ? mainColor : borderColor),
                            BGCOLOR(colorCode.WHITE),
                        ]}
                        textProps={{ textColor: deadline ? mainColor : colorCode.BLACKLOW(40) }}
                        onPress={() => {
                            setPopup(true);
                        }}
                    />
                )}
                <DeadlineContainer
                    isVisible={isVisible}
                    setPopup={(value: boolean) => {
                        setPopup(value);
                        if (!deadline) {
                        }
                    }}
                    onSubmit={(value1: string, value2: Date) => {
                        setDeadline(value1);
                        setValues(value2);
                    }}
                />
            </TextSwitch>
            <TextSwitch
                initialValue={data['showPrice']}
                heading={'Show Product price'}
                subHeading={
                    'Show product price to your customer when product goes live in the market. If no then they can query product price in chat.'
                }
                onToggle={(isOn: boolean) => {
                    setValues('showPrice', isOn);
                }}
            />
            <TextSwitch
                initialValue={data['returnAllowed']}
                heading={'Return allowed for product'}
                subHeading={'Customer can return the product with a certain days to shop again.'}
                onToggle={(isOn: boolean) => {
                    setValues('returnAllowed', isOn);
                }}
            />
            {showButton && (
                <ProductButton
                    buttonText={'Update'}
                    onPress={() => {
                        //submitData();
                    }}
                />
            )}
        </ProductContainer>
    );
};

export default ProductSettings;

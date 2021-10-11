import TextSwitch from './component/TextSwitch';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { BC, BGCOLOR, BR, BW, JCC, MT, PV } from '../../../../common/styles';

import { borderColor, colorCode, mainColor } from '../../../../common/color';
import DeadlineContainer from './component/DeadlineContainer';
import TextButton from '../../../component/TextButton';
import ProductContainer from './component/productContainerHOC';
import ProductButton from './component/ProductButton';
import ProductDetailsHeading from './component/ProductDetailsHeading';
import { compareObjects, parseDays } from '@app/common/helper';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';

interface IProductSetting {
    showPrice: boolean;
    new: boolean;
    newDeadline?: string;
    returnAllowed: boolean;
}
interface ProductSettingsProps {
    data: IProductSetting;
    postDataToServer: Function;
}

const ProductSettings: React.FunctionComponent<ProductSettingsProps> = ({ data, postDataToServer }) => {
    const [isVisible, setPopup] = React.useState(false);
    const [deadline, setDeadline] = React.useState(null);
    const [showTag, setTag] = React.useState(false);
    const [showButton, setShowButton] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const newRef = React.useRef(null);
    const lastValues = React.useRef<IProductSetting>({
        showPrice: false,
        returnAllowed: false,
        new: false,
        newDeadline: '',
    });
    const values = React.useRef<IProductSetting>({
        showPrice: false,
        returnAllowed: false,
        new: false,
        newDeadline: '',
    });

    React.useEffect(() => {
        if (data) {
            console.log('data is initializing', data);
            values.current = { ...data };
            lastValues.current = { ...data };
            setDeadline(data.newDeadline);
        }
    }, [data.returnAllowed, data.new, data.showPrice]);

    const submitData = () => {
        setLoader(true);

        postDataToServer(
            values.current,
            () => {
                console.log(lastValues, values);
                lastValues.current = { ...values.current };
                console.log(lastValues);
                setLoader(false);
                setShowButton(false);
            },
            (error) => {
                ToastHOC.errorAlert(error.message);
                setLoader(false);
            },
        );
    };

    // React.useEffect(() => {
    //     values.current = { ...data };
    //     setDeadline(data.newDeadline);
    // }, [data]);

    const setValues = (property: keyof IProductSetting, value: boolean | Date) => {
        console.log('1 =>', values);
        values.current[property] = value;
        console.log('2 =>', values);
        if (!compareObjects(values.current, lastValues.current)) {
            setShowButton(true);
        } else {
            if (showButton) {
                setShowButton(false);
            }
        }
    };

    return (
        <ProductContainer loader={loader}>
            <ProductDetailsHeading heading={'Product Settings'} subHeading={'This are product settings'} />
            <TextSwitch
                initialValue={data['new']}
                heading={'Show NEW tag'}
                subHeading={"New tag tell's grahak that the product is new and has arrived recently."}
                onToggle={(show: boolean) => {
                    setValues('new', show);
                    if (show) {
                        setPopup(true);
                    } else {
                        setDeadline('');
                        setValues('newDeadline', '');
                        setTag(false);
                    }
                }}
                ref={newRef}
            >
                {(deadline !== '' || deadline != null) && (
                    <TextButton
                        text={
                            'Up to ' + parseDays(deadline) + ' from the product lauch' ||
                            'Select for how much time you want to show new tag.'
                        }
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
                    initialValue={deadline}
                    isVisible={isVisible}
                    setPopup={(value: boolean, deadline?: string) => {
                        setPopup(value);
                        if (deadline) {
                            setDeadline('');

                            newRef.current.setOn(false);
                        }
                    }}
                    onSubmit={(value1: string, value2: Date) => {
                        setDeadline(value1);
                        setValues('newDeadline', value2);
                        setValues('new', true);
                        setPopup(false);
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
                        submitData();
                    }}
                />
            )}
        </ProductContainer>
    );
};

export default ProductSettings;

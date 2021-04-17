import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { BC, BGCOLOR, BR, BW, JCC, MT, PV } from '../../../../../common/styles';
import WrappedCheckBox from '../../../../component/WrappedCheckBox';
import { getHP } from '../../../../../common/dimension';
import { fs13, fs17 } from '../../../../../common';
import { borderColor, colorCode, mainColor } from '../../../../../common/color';
import DeadlineContainer from './DeadlineContainer';
import TextButton from '../../../../component/TextButton';
import ProductContainer from '../component/productContainerHOC';
import WrappedRectangleButton from '../../../../component/WrappedRectangleButton';
import ProductButton from '../component/ProductButton';
import ProductDetailsHeading from '../component/ProductDetailsHeading';
import { marTop, padVer } from '../component/styles';
export interface NewProductProps {}

const NewProduct: React.FC<NewProductProps> = () => {
    const [isVisible, setPopup] = React.useState(false);
    const [newDeadline, setDeadline] = React.useState(null);
    const [showTag, setTag] = React.useState(false);
    return (
        <ProductContainer>
            <ProductDetailsHeading
                heading={'Show NEW tag'}
                subHeading={"New tag tell's grahak that the product is new and has arrived recently."}
            />
            <View style={[marTop]} />
            <WrappedRectangleButton onPress={() => setTag(!showTag)}>
                <WrappedCheckBox
                    placeholder={'Yes show new tag to my cutomer.'}
                    value={showTag}
                    setValue={(value) => setTag(value)}
                    containerStyle={[padVer]}
                />
            </WrappedRectangleButton>
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
                        { marginBottom: getHP(0.2) },
                    ]}
                    textProps={{ textColor: newDeadline ? mainColor : colorCode.BLACKLOW(40) }}
                    onPress={() => {
                        setPopup(true);
                    }}
                />
            )}
            <DeadlineContainer isVisible={isVisible} setPopup={setPopup} onSubmit={setDeadline} />
            <ProductButton buttonText={'Save'} onPress={() => {}} />
        </ProductContainer>
    );
};

const styles = StyleSheet.create({
    dropDownText: {
        color: '#1A202C4D',
        fontSize: fs13,

        paddingLeft: getHP(0.1),
    },
    dropDownContainer: {
        height: getHP(0.4),
        marginTop: getHP(0.2),
        borderRadius: 6,
    },
    dropDownStyle: {
        borderWidth: 1.5,
        borderColor: borderColor,
    },
    itemContainer: {
        borderWidth: 1.5,
        borderColor: borderColor,
    },
});

export default NewProduct;

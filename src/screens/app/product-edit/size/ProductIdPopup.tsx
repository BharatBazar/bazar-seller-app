import {
    HP,
    WP,
    AIC,
    BGCOLOR,
    BR,
    BW,
    FDR,
    JCC,
    ML,
    PH,
    PV,
    FLEX,
    MV,
    MH,
    MT,
    BC,
    provideShadow,
    PL,
} from '@app/common/styles';
import WrappedText from '@app/screens/component/WrappedText';
import * as React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import WrappedRectangleButton from '@app/screens/component/WrappedRectangleButton';
import { mainColor } from '@app/common/color';
import { fs11, fs13, fs15, fs20 } from '@app/common';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import TextButton from '@app/screens/component/TextButton';
import { showMessage } from 'react-native-flash-message';

interface ProductIdPopupProps {
    isVisible: boolean;
    setPopup: Function;
    onPressRightButton: Function;
    onPressLeftButton: Function;
    rightButtonText: string;
    leftButtonText: string;
    generatedId?: string;
}

const ProductIdPopup: React.FunctionComponent<ProductIdPopupProps> = ({
    isVisible,
    setPopup,
    onPressLeftButton,
    onPressRightButton,
    leftButtonText,
    rightButtonText,
    generatedId,
}) => {
    const [id, setId] = React.useState<string>('');

    return (
        <Modal
            isVisible={isVisible}
            style={[MH(0.5), JCC('center')]}
            onBackdropPress={() => {
                setPopup(false);
                //ToastHOC.errorAlert('Please click on create product.');
            }}
            useNativeDriverForBackdrop
        >
            <View style={[BGCOLOR('#FFFFFF'), BR(0.1), PH(0.5), PV(0.2)]}>
                <WrappedText text={'Unique identification code is'} fontSize={fs20} />
                <WrappedText
                    text={'Provide this id to the product.'}
                    fontSize={fs11}
                    textColor={'#8a8a8a'}
                    containerStyle={[MT(0.2)]}
                />
                <WrappedText
                    text={generatedId}
                    textColor={'#646464'}
                    containerStyle={[BW(1), MT(0.1), BC('#EEEEEE'), BR(0.06), HP(0.5), BGCOLOR('#FFFFFF')]}
                    fontSize={fs13}
                    textStyle={[ML(0.2)]}
                />
                <WrappedText
                    text={'Please enter this Id on the item to confirm you have provided Id to the product.'}
                    containerStyle={[MT(0.2)]}
                    fontSize={fs11}
                    textColor={'#8a8a8a'}
                />
                <TextInput
                    value={id}
                    onChangeText={(id: string) => {
                        setId(id);
                    }}
                    placeholder={'enter item Id here'}
                    style={[
                        BW(1),
                        BC('#EEEEEE'),
                        BR(0.06),
                        HP(0.5),
                        BGCOLOR('#FFFFFF'),
                        MT(0.1),
                        PL(0.2),
                        { padding: 0 },
                    ]}
                />

                <View style={[MT(0.3)]}>
                    <WrappedRectangleButton
                        onPress={() => {
                            if (id == generatedId) {
                                onPressRightButton(generatedId);
                            } else {
                                showMessage({ type: 'danger', message: 'Please enter correct id' });
                            }
                        }}
                        containerStyle={[FDR(), JCC(), AIC(), BGCOLOR(mainColor), PH(0.5), PV(0.12), BR(0.05)]}
                    >
                        <WrappedText text={'Create product'} textColor={'#FFFFFF'} fontSize={fs13} />
                    </WrappedRectangleButton>
                </View>
            </View>
        </Modal>
    );
};

export default ProductIdPopup;

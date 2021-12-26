import { BGCOLOR, BR, BTR, DSP, HP, MH, PA } from '@app/common/styles';
import * as React from 'react';
import { View } from 'react-native';
import ModalWithHeaderAndButton from './ModalWithHeader';

interface AlertBoxProps {
    heading?: string;
    subHeading?: string;
    isVisible: boolean;
    setPopup: Function;
    onPressLeftButton: Function;
    onPressRightButton: Function;
}

const AlertBox: React.FunctionComponent<AlertBoxProps> = ({
    heading,
    subHeading,
    isVisible,
    setPopup,
    onPressLeftButton,
    onPressRightButton,
}) => {
    return (
        <ModalWithHeaderAndButton
            heading={heading}
            subHeading={subHeading}
            contentContainerStyle={[BGCOLOR('#FFFFFF'), PA(DSP), BR(0.1), MH(0.4)]}
            isVisible={isVisible}
            setPopup={() => {
                setPopup(false);
            }}
            modalStyle="centerPlaced"
            onPressRightButton={onPressRightButton}
            onPressLeftButton={onPressLeftButton}
        >
            <View style={[HP(0.3)]} />
        </ModalWithHeaderAndButton>
    );
};

export default AlertBox;

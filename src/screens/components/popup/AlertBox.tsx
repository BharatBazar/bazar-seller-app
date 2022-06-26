import { BGCOLOR, BR, BTR, DSP, HP, MH, PA } from '@app/common/styles';
import { BTRA, GENERAL_PADDING } from '@app/common/stylesheet';
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
            contentContainerStyle={[BGCOLOR('#FFFFFF'), PA(GENERAL_PADDING * 1.2), BTRA()]}
            isVisible={isVisible}
            setPopup={() => {
                setPopup(false);
            }}
            modalStyle="bottomPlaced"
            onPressRightButton={() => {
                onPressRightButton();
            }}
            statusBarTranslucent={true}
            onPressLeftButton={onPressLeftButton}
        >
            <View />
        </ModalWithHeaderAndButton>
    );
};

export default AlertBox;

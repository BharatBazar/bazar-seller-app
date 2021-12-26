import * as React from 'react';
import { Platform, View, StyleSheet, ViewStyle, ScrollView, TextStyle } from 'react-native';
import Modal from 'react-native-modal';
import HeaderWithTitleAndSubHeading from '../header/HeaderWithTitleAndSubHeading';

import RightComponentButtonWithLeftText from '../../components/button/RightComponentButtonWithLeftText';
import { commonButtonProps } from '../../components/button';
import WrappedRectangleButton from '@app/screens/component/WrappedRectangleButton';
import { FDR, FLEX, JCC, PV } from '@app/common/styles';
import { mainColor } from '@app/common/color';

interface ModalWithHeaderAndButtonProps {
    heading?: string;
    subHeading?: string;
    isVisible: boolean;
    setPopup: Function;
    children: React.ReactChild;
    headerStyle?: TextStyle;
    modalStyle?: 'bottomPlaced' | 'centerPlaced';
    contentContainerStyle: ViewStyle | ViewStyle[];
    headerContainerStyle?: ViewStyle | ViewStyle[];
    onPressLeftButton: Function;
    onPressRightButton: Function;
}

const ModalWithHeaderAndButton: React.FunctionComponent<ModalWithHeaderAndButtonProps> = ({
    isVisible,
    setPopup,
    heading,
    subHeading,
    modalStyle,
    contentContainerStyle,
    children,
    headerStyle,
    headerContainerStyle,
    onPressLeftButton,
    onPressRightButton,
}) => {
    const ModalProps =
        Platform.OS === 'ios'
            ? {
                  statusBarTranslucent: true,
                  hideModalContentWhileAnimating: true,
              }
            : {};

    return (
        <Modal
            isVisible={isVisible}
            useNativeDriver
            onBackdropPress={() => {
                setPopup(false);
            }}
            backdropTransitionOutTiming={0}
            style={modalStyle === 'centerPlaced' ? styles.modalCenter : styles.modalBottom}
            {...ModalProps}
        >
            <View style={[contentContainerStyle]}>
                {typeof heading === 'string' && (
                    <HeaderWithTitleAndSubHeading
                        heading={heading}
                        subHeading={subHeading}
                        headerStyle={headerStyle}
                        headerContainerStyle={headerContainerStyle}
                    />
                )}
                {children}
                <View style={[FDR()]}>
                    <RightComponentButtonWithLeftText
                        onPress={() => {
                            onPressLeftButton();
                        }}
                        buttonText={'Cancel'}
                        {...commonButtonProps}
                        backgroundColor="#FFF"
                        borderWidth={1}
                        buttonTextColor={mainColor}
                        borderColor={mainColor}
                        containerStyle={[FLEX(1), JCC(), PV(0.18)]}
                    />
                    <RightComponentButtonWithLeftText
                        onPress={() => {
                            onPressRightButton();
                        }}
                        buttonText={'Confirm'}
                        {...commonButtonProps}
                        borderWidth={0}
                        marginLeft={10}
                        containerStyle={[FLEX(1), JCC()]}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBottom: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalCenter: {
        justifyContent: 'center',
        margin: 0,
    },
});

export default ModalWithHeaderAndButton;

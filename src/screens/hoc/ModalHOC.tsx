import * as React from 'react';
import { Component } from 'react';
import { Platform, StyleSheet, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import FlashMessage, { MessageType } from 'react-native-flash-message';
import { getHP } from '@app/common/dimension';
import { STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
export interface ModalProps {
    isVisible: boolean;
    setPopup: Function;

    showErrorMessage?: string;
    refer?: any;
    statusBarTranlucent?: boolean;
    modalStyle?: ViewStyle | ViewStyle[];
    children: any;
}

const ModalHOC: React.FC<ModalProps> = ({
    isVisible,
    setPopup,
    children,
    showErrorMessage,
    refer,
    statusBarTranlucent,
    modalStyle,
}) => {
    const flastRef = React.useRef<FlashMessage>(null);

    const showError = (message: string, type: MessageType) => {
        flastRef.current?.showMessage({
            message,
            type: 'danger',
        });
    };

    React.useEffect(() => {
        if (refer)
            refer({
                showError,
            });
    }, []);

    return (
        <Modal
            isVisible={isVisible}
            useNativeDriver
            style={modalStyle || styles.view}
            onBackdropPress={() => {
                setPopup();
            }}
            onBackButtonPress={() => {
                // setPopup();
            }}
            deviceHeight={getHP(10) + STATUS_BAR_HEIGHT}
            statusBarTranslucent={Platform.OS == 'android' ? statusBarTranlucent : false}
            backdropTransitionOutTiming={0}
        >
            {children}
            <FlashMessage ref={flastRef} />
        </Modal>
    );
};

const styles = StyleSheet.create({
    view: {
        justifyContent: 'flex-end',
        margin: 0,
    },
});
export default ModalHOC;

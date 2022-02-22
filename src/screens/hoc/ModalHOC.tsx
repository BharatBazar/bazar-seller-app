import * as React from 'react';
import { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import FlashMessage, { MessageType } from 'react-native-flash-message';
export interface ModalProps {
    isVisible: boolean;
    setPopup: Function;
    children: React.ReactChild;
    showErrorMessage?: string;
    refer?: any;
    statusBarTranlucent?: boolean;
}

const ModalHOC: React.FC<ModalProps> = ({
    isVisible,
    setPopup,
    children,
    showErrorMessage,
    refer,
    statusBarTranlucent,
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
            style={styles.view}
            onBackdropPress={() => {
                setPopup();
            }}
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

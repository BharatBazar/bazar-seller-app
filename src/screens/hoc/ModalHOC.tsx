import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

export interface ModalProps {
    isVisible: boolean;
    setPopup: Function;
    children: React.ReactChild;
}

const ModalHOC: React.FC<ModalProps> = ({ isVisible, setPopup, children }) => {
    return (
        <Modal
            isVisible={isVisible}
            useNativeDriver
            style={styles.view}
            onBackdropPress={() => {
                setPopup();
            }}
        >
            {children}
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

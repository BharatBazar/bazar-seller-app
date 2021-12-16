import {FLEX} from '@app/constants/style/common'
import {children} from 'cheerio/lib/api/traversing'
import * as React from 'react'
import {Platform, View, StyleSheet, ViewStyle, ScrollView, TextStyle} from 'react-native'
import Modal from 'react-native-modal'
import HeaderWithTitleAndSubHeading from '../header/HeaderWithTitleAndSubHeading'

interface ModalWithHeaderProps {
    heading?: string
    subHeading?: string
    isVisible: boolean
    setPopup: Function
    children: React.ReactChild
    headerStyle?: TextStyle
    modalStyle?: 'bottomPlaced' | 'centerPlaced'
    contentContainerStyle: ViewStyle | ViewStyle[]
    headerContainerStyle?: ViewStyle | ViewStyle[]
}

const ModalWithHeader: React.FunctionComponent<ModalWithHeaderProps> = ({
    isVisible,
    setPopup,
    heading,
    subHeading,
    modalStyle,
    contentContainerStyle,
    children,
    headerStyle,
    headerContainerStyle
}) => {
    const ModalProps =
        Platform.OS === 'ios'
            ? {
                  statusBarTranslucent: true,
                  hideModalContentWhileAnimating: true
              }
            : {}

    return (
        <Modal
            isVisible={isVisible}
            useNativeDriver
            onBackdropPress={() => {
                setPopup(false)
            }}
            backdropTransitionOutTiming={0}
            style={modalStyle === 'centerPlaced' ? styles.modalCenter : styles.modalBottom}
            {...ModalProps}>
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
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBottom: {
        justifyContent: 'flex-end',
        margin: 0
    },
    modalCenter: {
        justifyContent: 'center',
        margin: 0
    }
})

export default ModalWithHeader

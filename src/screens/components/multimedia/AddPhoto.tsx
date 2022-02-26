import { fs13, fs14, fs15, fs20, fs28 } from '@app/common';
import { mainColor } from '@app/common/color';
import { getHP, getWP } from '@app/common/dimension';
import { AIC, BGCOLOR, BR, FDR, FLEX, HP, JCC, ML, PH, PV } from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import * as React from 'react';
import { Image, View, StyleSheet, ViewStyle } from 'react-native';
import ImageCropPicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface AddPhotoProps {
    addImage: Function;
    containerStyle?: ViewStyle[] | ViewStyle;
    onPressDoLater: (photos: [string]) => void;
}

interface IconTextButtonProps {
    onPress: Function;
    iconName: string;
    buttonText: string;
}

const IconTextButton: React.FunctionComponent<IconTextButtonProps> = ({ onPress, iconName, buttonText }) => {
    return (
        <Ripple
            style={[FDR(), AIC(), HP(0.7), PH(0.5)]}
            onPress={() => {
                onPress();
            }}
        >
            <FeatherIcon name={iconName} size={fs20} />
            <WrappedText text={buttonText} containerStyle={[ML(0.4)]} fontSize={fs13} />
        </Ripple>
    );
};

const AddPhoto: React.FunctionComponent<AddPhotoProps> = ({ addImage, containerStyle }) => {
    const [showImageSelect, setShowImageSelect] = React.useState<boolean>(false);

    const openImageSelector = async (selector: 'file' | 'camera') => {
        try {
            let images = [];
            if (selector == 'file') {
                images = await ImageCropPicker.openPicker({
                    compressImageMaxWidth: 1000,
                    compressImageMaxHeight: 1000,
                    multiple: true,
                    mediaType: 'photo',
                });
            } else {
                images = await ImageCropPicker.openCamera({
                    compressImageMaxWidth: 1000,
                    compressImageMaxHeight: 1000,
                    multiple: true,
                    mediaType: 'photo',
                });
            }

            const result = [];

            for (const image of images) {
                let data = {
                    path: image.path,
                    width: 1000,
                    height: 1000,
                };
                result.push(await ImageCropPicker.openCropper(data));
            }
            console.log(result);
            addImage(result);
            setShowImageSelect(false);
        } catch (error: Error) {
            setShowImageSelect(false);
            ToastHOC.errorAlert(error.message);
        }
    };

    return (
        <View style={[styles.photoContainer, containerStyle]}>
            <WrappedFeatherIcon
                iconName={'camera'}
                iconSize={fs28}
                iconColor={mainColor}
                onPress={() => {
                    setShowImageSelect(true);
                }}
            />
            <WrappedText
                text={'Add Photos'}
                textColor={'#707070'}
                textStyle={{
                    color: '#707070',
                    fontSize: fs13,
                }}
            />
            <Modal
                isVisible={showImageSelect}
                onBackdropPress={() => {
                    setShowImageSelect(false);
                }}
                useNativeDriverForBackdrop
            >
                <View style={[BGCOLOR('#FFFFFF'), BR(0.1), PV(0.1)]}>
                    <IconTextButton
                        iconName={'file'}
                        onPress={() => {
                            openImageSelector('file');
                        }}
                        buttonText={'Upload from internal storage'}
                    />
                    <IconTextButton
                        iconName={'camera'}
                        onPress={() => {
                            openImageSelector('camera');
                        }}
                        buttonText={'Open camera'}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default AddPhoto;

const styles = StyleSheet.create({
    photoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: mainColor,
        borderRadius: getHP(0.1),
        borderStyle: 'dashed',
        alignSelf: 'flex-start',
        borderWidth: 2,
        height: getWP(2.5),
        width: getWP(2.5),
        backgroundColor: undefined,
    },
    colorStyle: {
        height: getHP(0.2),
        width: getHP(0.2),
    },
});

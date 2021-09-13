import { fs13, fs14, fs15, fs20, fs28 } from '@app/common';
import { mainColor } from '@app/common/color';
import { getHP } from '@app/common/dimension';
import { AIC, BGCOLOR, BR, FDR, FLEX, HP, JCC, ML, PH, PV } from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import * as React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import ImageCropPicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface AddPhotoProps {
    addImage: Function;
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

const AddPhoto: React.FunctionComponent<AddPhotoProps> = ({ addImage }) => {
    const [showImageSelect, setShowImageSelect] = React.useState<boolean>(false);

    const openCamera = () => {
        setShowImageSelect(false);
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true,
        })
            .then((image) => {
                setShowImageSelect(false);
            })
            .catch((error) => {
                setShowImageSelect(false);
            });
    };

    const openPicker = async () => {
        try {
            const images = await ImageCropPicker.openPicker({
                compressImageMaxWidth: 1000,
                compressImageMaxHeight: 1000,
                multiple: true,
                mediaType: 'photo',
            }).then(async (images) => {
                const result = [];
                for (const image of images) {
                    let data = {
                        path: image.path,
                        width: 1000,
                        height: 1000,
                    };
                    result.push(await ImageCropPicker.openCropper(data));
                }
                return result;
            });

            addImage(images);
            setShowImageSelect(false);
        } catch (error) {
            console.log('error =>', error);
        }
    };

    return (
        <View style={[styles.photoContainer]}>
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
            >
                <View style={[BGCOLOR('#FFFFFF'), BR(0.1), PV(0.1)]}>
                    <IconTextButton
                        iconName={'file'}
                        onPress={() => {
                            openPicker();
                        }}
                        buttonText={'Upload from internal storage'}
                    />
                    <IconTextButton
                        iconName={'camera'}
                        onPress={() => {
                            openCamera();
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
        paddingHorizontal: '2%',
        paddingVertical: '4%',
        backgroundColor: undefined,
    },
    colorStyle: {
        height: getHP(0.2),
        width: getHP(0.2),
    },
});

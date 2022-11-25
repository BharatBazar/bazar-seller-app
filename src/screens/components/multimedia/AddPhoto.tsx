import { fs13, fs14, fs15, fs20, fs28 } from '@app/common';
import { mainColor } from '@app/common/color';
import { getHP, getWP } from '@app/common/dimension';
import { AIC, BGCOLOR, BR, FDR, FLEX, HP, JCC, ML, PH, PV } from '@app/common/styles';
import { useUploadImage } from '@app/hooks/useUploadImage';
import Loader from '@app/screens/component/Loader';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import { s3BucketKeys } from '@app/server/apis/multimedia/multimedia.interface';
import * as React from 'react';
import { Image, View, StyleSheet, ViewStyle } from 'react-native';
import ImageCropPicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface AddPhotoProps {
    addImage: Function;
    containerStyle?: ViewStyle[] | ViewStyle;
    openCamera?: boolean;
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

const AddPhoto: React.FunctionComponent<AddPhotoProps> = ({ addImage, containerStyle, openCamera }) => {
    const [showImageSelect, setShowImageSelect] = React.useState<boolean>(false);
    const [loader, setLoader] = React.useState(false);
    const uploadImageFunction = useUploadImage(s3BucketKeys.productImage, setLoader);

    const openImageSelector = async (selector: 'file' | 'camera') => {
        try {
            let images;
            if (selector == 'file') {
                images = await uploadImageFunction(false);
            } else {
                images = await uploadImageFunction(true);
            }

            // const url =

            // const result = [];

            // for (const image of images) {
            //     let data = {
            //         path: image.path,
            //         width: 1000,
            //         height: 1000,
            //     };
            //     result.push(await ImageCropPicker.openCropper(data));
            // }
            // console.log(result);
            if (images) {
                addImage(images.map((item) => ({ path: item, _id: new Date().getTime().toString() })));
                setShowImageSelect(false);
            } else {
                setShowImageSelect(false);
                ToastHOC.errorAlert('Problem');
            }
        } catch (error: Error) {
            setShowImageSelect(false);
            ToastHOC.errorAlert(error.message);
        }
    };

    React.useEffect(() => {
        if (openCamera) {
            setShowImageSelect(true);
        }
    }, [openCamera]);
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
            {loader && <Loader />}
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

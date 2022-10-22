import * as React from 'react';
import { Image, Platform } from 'react-native';
import { FontFamily, fs14 } from '@app/common';
import { errorColor } from '@app/common/color';
import { AIC, BC, BR, BW, HP, JCC } from '@app/common/styles';
import Ripple from 'react-native-material-ripple';
import ImageCropPicker from 'react-native-image-crop-picker';
import WrappedText from '@app/screens/component/WrappedText';
import { getHP } from '@app/common/dimension';
import Permission from 'react-native-permissions';
import { deleteImage, getSignedPhotoUrl } from '@app/server/apis/multimedia/multimedia.api';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
//import OpenSettings from 'react-native-open-settings';

export const GENERAL_S3_URL = 'https://lababeen-admin-multimedia-bucket.s3.ap-south-1.amazonaws.com/';

interface UploadImageProps {
    text: string;
    textColor?: string;
    imageKey?: string;
    setLoader: Function;
    update?: string;
    folder: string;
    successCallBack: Function;
    error?: string;
}

interface UploadImageState {
    image:
        | undefined
        | {
              path: string;
          };
    key?: string;
}

class UploadImage extends React.Component<UploadImageProps, UploadImageState> {
    state = {
        image: undefined,
        key: undefined,
    };

    getUrl = async (key: string) => {
        const url = await getSignedPhotoUrl({ key });

        return url.payload.url;
    };

    createFormData = (photo: { fileName: string; mime: string; path: string }, body = {}) => {
        return {
            name: `${photo.fileName}`,
            type: photo.mime,
            uri: Platform.OS === 'ios' ? photo.path.replace('file://', '') : photo.path,
        };
    };

    getBlob = async (fileUri: string) => {
        const resp = await fetch(fileUri);
        const imageBody = await resp.blob();
        return imageBody;
    };
    uploadImage = async (url: string) => {
        const formData = this.createFormData(this.state.image, {});

        await fetch(url, {
            method: 'PUT',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    uploadPhoto = async () => {
        try {
            this.props.setLoader(true);
            if (this.state.key) {
                await deleteImage({ key: this.state.key as string });
            }
            let key = `${this.props.folder}/${new Date().getTime()}`;
            let url = await this.getUrl(key);
            await this.uploadImage(url);
            this.props.setLoader(false);
            this.props.successCallBack(key);
            ToastHOC.successAlert('Photo uploaded');
        } catch (error) {
            console.log(error, error.response);
            this.props.setLoader(false);
            //ToastHOC.errorAlert(error);
        }
    };

    componentDidUpdate(nextProps: UploadImageProps) {
        console.log(nextProps, this.props.imageKey, this.state.key);
        if (this.props.imageKey !== nextProps.imageKey || (!this.state.key && this.props.imageKey)) {
            this.setState({ key: this.props.imageKey });
        }
    }

    render() {
        return (
            <Ripple
                style={[
                    { borderStyle: 'dashed', overflow: 'hidden' },
                    AIC(),
                    JCC(),
                    BC(this.props.error ? errorColor : '#d1d5d8'),
                    HP(2),
                    BR(0.1),
                    BW(2),
                ]}
                onPress={() => {
                    Permission.request(
                        Platform.OS === 'ios'
                            ? Permission.PERMISSIONS.IOS.CAMERA
                            : Permission.PERMISSIONS.ANDROID.CAMERA,
                    )
                        .then((res) => {
                            // if (res == Permission.RESULTS.BLOCKED) {
                            //     OpenSettings.openSettings();
                            // } else
                            ImageCropPicker.openPicker({
                                width: 200,
                                height: 200,
                                cropping: true,
                            })
                                .then((image) => {
                                    this.setState({ image, key: undefined });
                                    this.uploadPhoto();
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                            ToastHOC.errorAlert(error.message);
                        });
                }}
            >
                {this.state.image || this.state.key ? (
                    <Image
                        source={{ uri: this.state.key ? GENERAL_S3_URL + this.state.key : this.state.image.path }}
                        style={{ height: '100%', width: '100%', borderRadius: getHP(0.1) }}
                        resizeMode={'cover'}
                    />
                ) : (
                    <WrappedText
                        text={this.props.text || 'Upload image'}
                        textColor={this.props.textColor || '#1A202C4D'}
                        fontFamily={FontFamily.Medium}
                        fontSize={fs14}
                    />
                )}
            </Ripple>
        );
    }
}

export default UploadImage;

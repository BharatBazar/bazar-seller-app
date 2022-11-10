import { getWP } from '@app/common/dimension';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import { deleteImage, getSignedPhotoUrl } from '@app/server/apis/multimedia/multimedia.api';
import { s3BucketKeys } from '@app/server/apis/multimedia/multimedia.interface';
import { Platform } from 'react-native';
import ImageCropPicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import Permission from 'react-native-permissions';

const GENERAL_S3_URL = 'https://lababeen-admin-multimedia-bucket.s3.ap-south-1.amazonaws.com/';
interface imageType {
    fileName: string;
    mime: string;
    path: string;
}
export const useUploadImage = (folder: s3BucketKeys, setLoader: Function) => {
    const getUrl = async (key: string) => {
        const url = await getSignedPhotoUrl({ key });
        console.log('url singed', url);
        return url.payload.url;
    };

    const createFormData = (photo: ImageOrVideo, body = {}) => {
        return {
            name: `${photo.fileName}`,
            type: photo.mime,
            uri: Platform.OS === 'ios' ? photo.path.replace('file://', '') : photo.path,
        };
    };

    const getBlob = async (fileUri: string) => {
        const resp = await fetch(fileUri);
        const imageBody = await resp.blob();
        return imageBody;
    };
    const uploadImage = async (url: string, image: ImageOrVideo) => {
        const formData = createFormData(image, {});
        console.log('Form data', formData);
        await fetch(url, {
            method: 'PUT',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    const uploadPhoto = async (image: ImageOrVideo, Key?: string) => {
        if (Key) {
            await deleteImage({ key: Key as string });
        }
        let key = `${folder}/${new Date().getTime()}`;

        console.log('key', key);
        let url = await getUrl(key);
        console.log('Url', url);
        await uploadImage(url, image);
        console.log('Photo uploaded');
        ToastHOC.successAlert('Photo uploaded');
        return GENERAL_S3_URL + key;
    };

    const initiateUploadFromCamera = (fromCamera: boolean, key?: string) => {
        return Permission.request(
            Platform.OS === 'ios' ? Permission.PERMISSIONS.IOS.CAMERA : Permission.PERMISSIONS.ANDROID.CAMERA,
        )
            .then(async (res) => {
                // if (res == Permission.RESULTS.BLOCKED) {
                //     OpenSettings.openSettings();
                // } else

                const imageOption = {
                    width: 1000,
                    height: 1000,
                    cropping: true,
                };
                const image: ImageOrVideo = !fromCamera
                    ? await ImageCropPicker.openPicker(imageOption)
                    : await ImageCropPicker.openCamera(imageOption);
                if (image) {
                    setLoader(true);
                    const url = await uploadPhoto(image, key);
                    setLoader(false);
                    console.log('url', url);
                    return url;
                } else {
                    throw new Error('Cant upload image');
                }
            })
            .catch((error) => {
                setLoader(false);
                ToastHOC.errorAlert(error.message);
                return;
            });
    };

    return initiateUploadFromCamera;
};

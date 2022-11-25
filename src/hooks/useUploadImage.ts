import { getWP } from '@app/common/dimension';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import { deleteImage, getSignedPhotoUrl } from '@app/server/apis/multimedia/multimedia.api';
import { s3BucketKeys } from '@app/server/apis/multimedia/multimedia.interface';
import { Platform } from 'react-native';
import ImageCropPicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import Permission from 'react-native-permissions';

const GENERAL_S3_URL = 'https://lababeen-admin-multimedia-bucket.s3.ap-south-1.amazonaws.com/';
export const useUploadImage = (folder: s3BucketKeys, setLoader: Function) => {
    const getUrl = async (key: [string]) => {
        const response = key.map(async (item) => {
            const response = await getSignedPhotoUrl({ key: item });
            return response.payload.url;
        });
        console.log('url singed', response);
        return response;
    };

    const createFormData = (photo: ImageOrVideo & { fileName: string }, body = {}) => {
        return {
            name: `${photo.fileName}`,
            type: photo.mime,
            uri: Platform.OS == 'ios' ? photo.path.replace('file://', '') : photo.path,
        };
    };

    const uploadImage = async (url: [string], image: ImageOrVideo[]) => {
        try {
            url.every(async (item, index) => {
                const url = await item;
                const formData = createFormData(image[index], {});
                //console.log('Form data', item, url);
                const response = await fetch(url, {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // console.log('respnse from upoad', response);
            });
        } catch (error) {
            ToastHOC.errorAlert('Problem in putting image data to s3');
        }
    };

    const uploadPhoto = async (image: ImageOrVideo[], Key?: [string]) => {
        if (Key) {
            Key.every(async (item) => await deleteImage({ key: item }));
        }
        let key: [string] = image.map((item, index) => `${folder}/${new Date().getTime() + index}`);

        console.log('key', key);
        let url = await getUrl(key);
        console.log('Url', url);
        await uploadImage(url, image);
        console.log('Photo uploaded');
        ToastHOC.successAlert('Photo uploaded');
        return key.map((key) => GENERAL_S3_URL + key);
    };

    const initiateUpload = (fromCamera: boolean, key?: [string], multiple?: boolean) => {
        return Permission.request(
            Platform.OS === 'ios' ? Permission.PERMISSIONS.IOS.CAMERA : Permission.PERMISSIONS.ANDROID.CAMERA,
        )
            .then(async (res) => {
                // if (res == Permission.RESULTS.BLOCKED) {
                //     OpenSettings.openSettings();
                // } else

                const imageOption = {
                    multiple,
                };
                const image: ImageOrVideo = !fromCamera
                    ? await ImageCropPicker.openPicker(imageOption)
                    : await ImageCropPicker.openCamera(imageOption);
                if (image) {
                    setLoader(true);
                    const url = await uploadPhoto(multiple ? image : [image], key);
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

    return initiateUpload;
};

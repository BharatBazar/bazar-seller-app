import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import WrappedText from '@app/screens/component/WrappedText';
import { FDR, MT } from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import { fs13, fs15, fs20, fs28 } from '@app/common';
import { errorColor, mainColor } from '@app/common/color';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { getHP, getWP } from '@app/common/dimension';
import { FlatList } from 'react-native-gesture-handler';
import DragSort from '@app/screens/app/edit/product/component/component/DragSort';
import DeleteImagePopup from './DeleteImage';
import Ripple from 'react-native-material-ripple';

import ImageZoomViewer from './ImageViewer';
import AddPhoto from './AddPhoto';
import { ErrorState } from '../generalConfig';
import { ErrorText } from '@app/common/customScreenText';
import { productStatus } from '@app/server/apis/product/product.interface';

export interface PhotoUploadProps {
    photoError: ErrorState;
    setPhotoError: (e: ErrorState) => void;
    status: productStatus;
}

const PhotoUpload: React.SFC<PhotoUploadProps> = ({ photoError, setPhotoError, status }) => {
    const [photos, setPhotos] = React.useState<ImageOrVideo[]>([]);
    const [showImageViewer, setShowImageViewer] = React.useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(undefined);
    const [currentViewIndex, setCurrentViewIndex] = React.useState(0);
    const [error, setError] = React.useState('');

    const deleteImage = (index: number) => {
        const photo = [...photos];
        photo.splice(index, 1);
        setPhotos(photo);
        setSelectedIndex(undefined);
    };

    const addImageInArray = (image: ImageOrVideo[]) => {
        let images = [...photos];
        images = [...images, ...image];
        setPhotos(images);
    };

    const updateImageArrary = (index: number, file: ImageOrVideo) => {
        const photo = [...photos];
        photo[index] = file;
        setPhotos(photo);
    };

    /**
     * Error Checking Flow Start
     */

    React.useEffect(() => {
        if (photoError == 1) {
            const isError = checkError();
            if (isError) {
                setPhotoError(ErrorState.FAILED);
            } else {
                setPhotoError(ErrorState.PASSED);
            }
        }
    }, [photoError]);

    const checkError = () => {
        if (status == productStatus.NOTCOMPLETED && photos.length == 0) {
            setError('Please add atleast 1 photo for identification.');
            return true;
        } else if (photos.length != 8) {
            setError("Please add atleast 8 photo's for better product recognition.");
            return true;
        } else {
            return false;
        }
    };

    /**
     * End
     */

    return (
        <View>
            <AddPhoto addImage={addImageInArray} />
            {error.length > 0 && photos.length == 0 && (
                <WrappedText text={error} textColor={errorColor} containerStyle={[MT(0.1)]} />
            )}
            <View style={[MT(0.1)]} />
            <FlatList
                data={photos}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                height: getWP(2.5),
                                width: getWP(2.5),
                                borderRadius: getHP(0.1),

                                marginLeft: (index + 1) % 3 == 1 ? 0 : getWP(0.3),
                            }}
                        >
                            <Ripple
                                onPress={() => {
                                    setShowImageViewer(true);
                                    setCurrentViewIndex(index);
                                }}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                            >
                                <Image
                                    source={{ uri: item.path }}
                                    style={{ height: getWP(2.5), width: getWP(2.5), borderRadius: getHP(0.1) }}
                                    resizeMode={'cover'}
                                />
                            </Ripple>
                            <WrappedFeatherIcon
                                iconName={'trash-2'}
                                iconColor={'#FFFFFF'}
                                onPress={() => {
                                    setSelectedIndex(index + 1);
                                }}
                                containerHeight={fs20}
                                iconSize={fs15}
                                containerStyle={[
                                    {
                                        position: 'absolute',
                                        top: getWP(0.1),
                                        right: getWP(0.1),
                                        zIndex: 10000,
                                        backgroundColor: '#00000066',
                                    },
                                ]}
                            />
                        </View>
                    );
                }}
                columnWrapperStyle={{ marginVertical: '2%' }}
                horizontal={false}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
            />
            <DragSort
                data={photos}
                setPhotosArrayAfterReordering={(images) => {
                    setPhotos(images);
                }}
            />

            <ImageZoomViewer
                isVisible={showImageViewer}
                setPopup={setShowImageViewer}
                data={photos.map((item) => {
                    return { url: item.path };
                })}
                setSelectedIndex={setSelectedIndex}
                currentViewIndex={currentViewIndex}
                updateImageArrayWhenImageIsCropped={updateImageArrary}
            />
            <DeleteImagePopup
                isVisible={selectedIndex ? true : false}
                setPopup={() => {
                    setSelectedIndex(undefined);
                }}
                rightButtonText={'No'}
                leftButtonText={'Yes'}
                onPressRightButton={() => {
                    setSelectedIndex(undefined);
                }}
                onPressLeftButton={() => {
                    deleteImage((selectedIndex as number) - 1);
                }}
                question={'Do you want to delete the below image?'}
                image={selectedIndex ? photos[(selectedIndex - 1) as number] : undefined}
            />
        </View>
    );
};

export default PhotoUpload;

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

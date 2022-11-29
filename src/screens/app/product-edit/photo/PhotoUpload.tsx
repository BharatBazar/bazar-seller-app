import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { fs14, fs15, fs20 } from '@app/common';
import { BGCOLOR, DSP, MT } from '@app/common/styles';
import { colorCode, errorColor, mainColor } from '@app/common/color';
import { getHP, getWP } from '@app/common/dimension';
import DragSort from './DragSort';
import DeleteImagePopup from './DeleteImage';
import ImageZoomViewer from './ImageViewer';
import AddPhoto from '@app/screens/components/multimedia/AddPhoto';
import Border from '@app/screens/components/border/Border';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import ButtonFeatherIconRightText from '@app/screens/components/button/ButtonFeatherIconWithRightText';
import WrappedText from '@app/screens/component/WrappedText';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import { MTA } from '@app/common/stylesheet';
import { FastImageWrapper } from '@app/screens/component/FastImage';
import { isArrayEqual } from '@app/common/helper';
import ImageDisplay from './ImageDisplay';
export interface PhotoUploadProps {
    existingPhotos: string[];
    updatePhotoArray: Function;
    openCamera?: boolean;
    setPopup: Function;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ existingPhotos, updatePhotoArray, openCamera, setPopup }) => {
    const [photos, setPhotos] = React.useState<{ path: string; _id: string }[]>([]);
    const [showImageViewer, setShowImageViewer] = React.useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(undefined);
    const [currentViewIndex, setCurrentViewIndex] = React.useState(0);
    const [showReorderView, setShowReorderView] = React.useState(false);

    const [error, setError] = React.useState('');

    React.useEffect(() => {
        console.log('existing photo', existingPhotos);
        if (existingPhotos && existingPhotos.length > 0) {
            setPhotos([
                ...existingPhotos.map((item, index) => {
                    return { path: item, _id: new Date().getTime().toString() + index.toString() };
                }),
            ]);
        }
    }, [existingPhotos]);

    const deleteImage = (index: number) => {
        const photo = [...photos];
        photo.splice(index, 1);
        setPhotos(photo);
        setSelectedIndex(undefined);
    };

    const addImageInArray = (image: { path: string; _id: string }[]) => {
        setPhotos((item) => {
            console.log('image before', item, image, typeof item, typeof image);

            return [...item, ...image];
        });
    };

    const updateImageArrary = (index: number, file: { path: string; _id: String }) => {
        const photo = [...photos];
        photo[index] = file;
        setPhotos(photo);
    };

    return (
        <View style={{ flex: 1 }}>
            {error.length > 0 && photos.length == 0 && (
                <WrappedText text={error} textColor={errorColor} containerStyle={[MT(0.1)]} />
            )}
            <ScrollView>
                <Border />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {photos.map((item, index) => {
                        return (
                            <ImageDisplay
                                setShowImageViewer={setShowImageViewer}
                                showDeleteButton={photos.length > 1}
                                setCurrentViewIndex={setCurrentViewIndex}
                                setSelectedIndex={setSelectedIndex}
                                index={index}
                                item={{ ...item }}
                                key={index}
                            />
                        );
                    })}
                    <AddPhoto
                        openCamera={openCamera}
                        addImage={addImageInArray}
                        containerStyle={{ marginTop: DSP, marginRight: getWP(0.3) }}
                    />
                </View>
                <Border />

                {photos.length > 1 && (
                    <ButtonFeatherIconRightText
                        onPress={() => {
                            setShowReorderView(true);
                        }}
                        iconName="edit"
                        buttonText="Reorder images"
                        fontSize={fs14}
                        containerStyle={[BGCOLOR(colorCode.CHAKRALOW(20)), MTA()]}
                        iconColor={mainColor}
                        buttonTextColor={mainColor}
                        textStyle={{ marginLeft: 20 }}
                    />
                )}
            </ScrollView>
            <Border />
            {photos.length > 1 && (
                <DragSort
                    isVisible={showReorderView}
                    setPopup={() => {
                        setShowReorderView(false);
                    }}
                    data={photos}
                    setPhotosArrayAfterReordering={(images) => {
                        setPhotos(images);
                    }}
                />
            )}
            <RightComponentButtonWithLeftText
                buttonText={'Continue'}
                containerStyle={[MT(0.1)]}
                onPress={() => {
                    if (
                        isArrayEqual(
                            photos.map((item) => item.path),
                            existingPhotos,
                        )
                    ) {
                        setPopup(false);
                    } else {
                        updatePhotoArray(photos.map((item) => item.path));
                    }
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

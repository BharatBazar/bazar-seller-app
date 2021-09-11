import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import WrappedText from '../../../../../component/WrappedText';
import { BGCOLOR, FDR, JCC, MT, P, provideShadow } from '../../../../../../common/styles';
import WrappedFeatherIcon from '../../../../../component/WrappedFeatherIcon';
import { fs13, fs15, fs20, fs28 } from '../../../../../../common';
import { mainColor } from '../../../../../../common/color';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { getHP, getWP } from '../../../../../../common/dimension';
import { FastImageWrapper } from '../../../../../component/FastImage';
import { FlatList } from 'react-native-gesture-handler';
import DragSort from '@app/screens/app/edit/product/component/component/DragSort';
import { absoluteBottomWrapper } from '@app/common/containerStyles';
import ModalHOC from '@app/screens/hoc/ModalHOC';
import DeleteImagePopup from './DeleteImage';
import ImageViewer from 'react-native-image-zoom-viewer';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { padHor } from '../generalConfig';

export interface PhotoUploadProps {}

const PhotoUpload: React.SFC<PhotoUploadProps> = () => {
    const [photos, setPhotos] = React.useState<ImageOrVideo[]>([]);
    const [showImageViewer, setShowImageViewer] = React.useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(undefined);
    const [currentViewIndex, setCurrentViewIndex] = React.useState(0);

    const openCamera = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true,
        })
            .then((image) => {
                let images = [...photos];

                images = [...images, ...image];
                //console.log(images.length, images);
                setPhotos(images);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteImage = (index: number) => {
        const photo = [...photos];
        photo.splice(index, 1);
        setPhotos(photo);
        setSelectedIndex(undefined);
    };

    const updateImageArrary = (index: number, file: ImageOrVideo) => {
        console.log('UPDATE IMAGE =>', index, file);
        const photo = [...photos];
        photo[index] = file;
        setPhotos(photo);
    };

    return (
        <View>
            <View style={[FDR(), MT(0.1)]}>
                <View style={[styles.photoContainer]}>
                    <WrappedFeatherIcon
                        iconName={'camera'}
                        iconSize={fs28}
                        iconColor={mainColor}
                        onPress={() => {
                            openCamera();
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
                </View>
            </View>

            <View style={[MT(0.1)]} />
            <FlatList
                data={photos}
                renderItem={({ item, index }) => {
                    return (
                        <Ripple
                            onPress={() => {
                                setShowImageViewer(true);
                                setCurrentViewIndex(index);
                            }}
                            style={{
                                height: getWP(2.5),
                                width: getWP(2.5),
                                borderRadius: getHP(0.1),
                                marginLeft: (index + 1) % 3 == 1 ? 0 : getWP(0.3),
                            }}
                        >
                            <Image
                                source={{ uri: item.path }}
                                style={{ height: getWP(2.5), width: getWP(2.5), borderRadius: getHP(0.1) }}
                                resizeMode={'cover'}
                            />
                            <WrappedFeatherIcon
                                iconName={'trash-2'}
                                iconColor={mainColor}
                                onPress={() => {
                                    setSelectedIndex(index + 1);
                                }}
                                containerHeight={fs20}
                                iconSize={fs15}
                                containerStyle={[{ position: 'absolute', top: getWP(0.1), right: getWP(0.1) }]}
                            />
                        </Ripple>
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
            <Modal isVisible={showImageViewer} style={{ margin: 0 }}>
                <ImageViewer
                    imageUrls={photos.map((item) => {
                        return { url: item.path };
                    })}
                    index={currentViewIndex}
                    renderImage={(item) => {
                        console.log(item);
                        return <Image {...item} />;
                    }}
                    // renderArrowRight={() => (
                    //     <WrappedFeatherIcon
                    //         iconName={'chevron-left'}
                    //         onPress={() => {
                    //             setShowImageViewer(false);
                    //         }}
                    //     />
                    // )}
                    renderIndicator={() => <View />}
                    renderHeader={(currentIndex: number) => (
                        <View
                            style={[
                                FDR(),
                                JCC('space-between'),
                                BGCOLOR('#000000'),
                                { marginTop: getStatusBarHeight() },
                                padHor,
                            ]}
                        >
                            <WrappedFeatherIcon
                                iconName={'x'}
                                iconColor={'#FFFFFF'}
                                onPress={() => {
                                    setShowImageViewer(false);
                                    setCurrentViewIndex(0);
                                }}
                                iconSize={fs20}
                            />
                            <WrappedFeatherIcon
                                iconName={'crop'}
                                iconColor={'#FFFFFF'}
                                onPress={() => {
                                    ImagePicker.openCropper({ path: photos[currentIndex].path })
                                        .then((image) => {
                                            console.log('image cropper =>', image);
                                            updateImageArrary(currentIndex, image);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                }}
                                iconSize={fs20}
                            />
                        </View>
                    )}
                />
            </Modal>
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

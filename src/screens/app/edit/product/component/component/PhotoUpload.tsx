import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import WrappedText from '../../../../../component/WrappedText';
import { FDR, MT, P, provideShadow } from '../../../../../../common/styles';
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

export interface PhotoUploadProps {}

const PhotoUpload: React.SFC<PhotoUploadProps> = () => {
    const [photos, setPhotos] = React.useState<ImageOrVideo[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(undefined);

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
                        <View
                            style={{
                                height: getWP(2.5),
                                width: getWP(2.5),
                                borderRadius: getHP(0.1),
                                marginLeft: (index + 1) % 3 == 1 ? 0 : getWP(0.3),
                            }}
                        >
                            <Image
                                source={{ uri: item.sourceURL }}
                                style={{ height: getWP(2.5), width: getWP(2.5), borderRadius: getHP(0.1) }}
                                resizeMode={'cover'}
                            />
                            <WrappedFeatherIcon
                                iconName={'trash-2'}
                                iconColor={mainColor}
                                onPress={() => {
                                    setSelectedIndex(index);
                                }}
                                containerHeight={fs20}
                                iconSize={fs15}
                                containerStyle={[{ position: 'absolute', top: getWP(0.1), right: getWP(0.1) }]}
                            />
                        </View>
                    );
                }}
                columnWrapperStyle={{ marginVertical: '2%' }}
                horizontal={false}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
            />
            <DragSort data={photos} />
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
                    deleteImage(selectedIndex as number);
                }}
                question={'Do you want to delete the above image?'}
                image={selectedIndex ? photos[selectedIndex as number] : undefined}
            />
            {/* {photos.map((item) => {
                return (
                    <FastImageWrapper
                        source={{ uri: item.sourceURL }}
                        imageStyle={{ height: getHP(1), width: getHP(1), borderRadius: getHP(0.1) }}
                        resizeMode={'cover'}
                    />
                );
            })} */}
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

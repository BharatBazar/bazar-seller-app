import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import WrappedText from '../../../../../component/WrappedText';
import { FDR, MT } from '../../../../../../common/styles';
import WrappedFeatherIcon from '../../../../../component/WrappedFeatherIcon';
import { fs13, fs28 } from '../../../../../../common';
import { mainColor } from '../../../../../../common/color';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { getHP, getWP } from '../../../../../../common/dimension';
import { FastImageWrapper } from '../../../../../component/FastImage';
import { FlatList } from 'react-native-gesture-handler';
import DragSort from '@app/screens/app/edit/product/component/component/DragSort';

export interface PhotoUploadProps {}

const PhotoUpload: React.SFC<PhotoUploadProps> = () => {
    const [photos, setPhotos] = React.useState<ImageOrVideo[]>([]);

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
                renderItem={({ item }) => {
                    return (
                        <Image
                            source={{ uri: item.sourceURL }}
                            style={{ height: getHP(1), width: getHP(1), borderRadius: getHP(0.1) }}
                            resizeMode={'cover'}
                        />
                    );
                }}
                columnWrapperStyle={{ justifyContent: 'space-between', marginVertical: '2%' }}
                horizontal={false}
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
            />
            <DragSort data={photos} />

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

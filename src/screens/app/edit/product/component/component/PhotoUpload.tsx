import React from 'react';
import { View, StyleSheet } from 'react-native';
import WrappedText from '../../../../../component/WrappedText';
import { MT } from '../../../../../../common/styles';
import WrappedFeatherIcon from '../../../../../component/WrappedFeatherIcon';
import { fs13, fs28 } from '../../../../../../common';
import { mainColor } from '../../../../../../common/color';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { getHP } from '../../../../../../common/dimension';
import { FastImageWrapper } from 'screens/component/FastImage';

export interface PhotoUploadProps {}

const PhotoUpload: React.SFC<PhotoUploadProps> = () => {
    const [photos, setPhotos] = React.useState<ImageOrVideo[]>([]);

    return (
        <View>
            <View style={[styles.photoContainer, MT(0.1)]}>
                <WrappedFeatherIcon
                    iconName={'camera'}
                    iconSize={fs28}
                    iconColor={mainColor}
                    onPress={() => {
                        ImagePicker.openCamera({
                            width: 300,
                            height: 400,
                            cropping: true,
                            multiple: true,
                        })
                            .then((image) => {
                                let images = photos;
                                images.push(...image);
                                setPhotos(images);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
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
            {photos.map((item) => {
                return (
                    <FastImageWrapper
                        source={{ uri: item.path }}
                        imageStyle={styles.photoContainer}
                        resizeMode={'cover'}
                    />
                );
            })}
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

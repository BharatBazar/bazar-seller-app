import React from 'react';
import { View } from 'react-native';
import { BGCOLOR, FDR, JCC } from '../../../../../../common/styles';
import WrappedFeatherIcon from '../../../../../component/WrappedFeatherIcon';
import { fs20, fs28 } from '../../../../../../common';
import ImagePicker from 'react-native-image-crop-picker';
import { getHP, getWP } from '../../../../../../common/dimension';

import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { padHor } from '../generalConfig';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';

interface ImageZoomViewerProps {
    isVisible: boolean;
    setPopup: Function;
    data: { url: string }[];
    currentViewIndex: number;
    updateImageArrayWhenImageIsCropped: Function;
}

const ImageZoomViewer: React.FunctionComponent<ImageZoomViewerProps> = ({
    isVisible,
    setPopup,
    data,
    currentViewIndex,
    updateImageArrayWhenImageIsCropped,
}) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        setCurrentIndex(currentViewIndex);
    }, [currentIndex]);

    const imageViewerHeader = (currentIndex: number) => (
        <View
            style={[
                // { position: 'absolute', top: getStatusBarHeight(), left: 0, right: 0 },
                FDR(),
                JCC('space-between'),
                BGCOLOR('#000000'),

                { paddingTop: getStatusBarHeight() },
                padHor,
            ]}
        >
            <WrappedFeatherIcon
                iconName={'x'}
                iconColor={'#FFFFFF'}
                onPress={() => {
                    setPopup(false);
                }}
                iconSize={fs28}
            />
            <WrappedFeatherIcon
                iconName={'crop'}
                iconColor={'#FFFFFF'}
                onPress={() => {
                    ImagePicker.openCropper({ path: data[currentIndex].path })
                        .then((image) => {
                            updateImageArrayWhenImageIsCropped(currentIndex, image);
                        })
                        .catch((error) => {
                            ToastHOC.errorAlert(error, 'Cannot crop image');
                        });
                }}
                iconSize={fs20}
            />
        </View>
    );
    return (
        <Modal
            isVisible={isVisible}
            style={{ margin: 0 }}
            onBackdropPress={() => {
                setPopup(false);
            }}
        >
            <View style={{ flex: 1 }}>
                {imageViewerHeader(currentIndex)}
                <ImageViewer
                    imageUrls={data}
                    backgroundColor={'#000000'}
                    style={{ height: getHP(10), width: getWP(10) }}
                    index={currentViewIndex}
                    onChange={(index: number) => {
                        setCurrentIndex(index);
                    }}
                />
            </View>
        </Modal>
    );
};

export default ImageZoomViewer;

import React from 'react';
import { View } from 'react-native';
import { AIC, BGCOLOR, FDR, JCC, MH } from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import { fs20, fs28 } from '@app/common';
import ImagePicker from 'react-native-image-crop-picker';
import { getHP, getWP } from '@app/common/dimension';

import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import { STATUS_BAR_HEIGHT } from '@app/common/stylesheet';

interface ImageZoomViewerProps {
    isVisible: boolean;
    setPopup: Function;
    data: { url: string }[];
    currentViewIndex: number;
    updateImageArrayWhenImageIsCropped: Function;
    setSelectedIndex: Function;
}

const ImageZoomViewer: React.FunctionComponent<ImageZoomViewerProps> = ({
    isVisible,
    setPopup,
    data,
    currentViewIndex,
    updateImageArrayWhenImageIsCropped,
    setSelectedIndex,
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

                { paddingTop: 10 },
            ]}
        >
            <WrappedFeatherIcon
                iconName={'close'}
                iconColor={'#FFFFFF'}
                onPress={() => {
                    setPopup(false);
                }}
                iconSize={fs28}
            />
            <View style={[FDR(), AIC()]}>
                <WrappedFeatherIcon
                    iconName={'crop'}
                    iconColor={'#FFFFFF'}
                    onPress={() => {
                        console.log(data[currentIndex].path, data);
                        ImagePicker.openCropper({ path: data[currentIndex].url })
                            .then((image) => {
                                updateImageArrayWhenImageIsCropped(currentIndex, image);
                            })
                            .catch((error) => {
                                ToastHOC.errorAlert(error.message, 'Cannot crop image');
                            });
                    }}
                    containerStyle={[MH(0.2)]}
                    iconSize={fs20}
                />
                {/* <WrappedFeatherIcon
                    iconName={'trash-2'}
                    iconColor={'#FFFFFF'}
                    onPress={() => {
                        setSelectedIndex(currentIndex + 1);
                    }}
                    containerStyle={[MH(0.2)]}
                    containerHeight={fs20}
                    iconSize={fs20}
                /> */}
            </View>
        </View>
    );
    return (
        <Modal
            isVisible={isVisible}
            style={{ margin: 0, justifyContent: 'flex-end' }}
            onBackdropPress={() => {
                setPopup(false);
            }}
            statusBarTranslucent={true}
            useNativeDriverForBackdrop
        >
            <View style={{ flex: 1, marginTop: STATUS_BAR_HEIGHT }}>
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

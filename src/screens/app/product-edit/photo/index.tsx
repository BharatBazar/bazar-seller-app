import { DEFAULT_IMAGE_URL, fs14 } from '@app/common';
import { colorCode, mainColor } from '@app/common/color';
import { DSP, FLEX } from '@app/common/styles';
import { STATUS_BAR_HEIGHT } from '@app/screens/component/StatusBar';
import TextRippleButton from '@app/screens/components/button/TextRippleB';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import ModalHOC from '@app/screens/hoc/ModalHOC';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import PhotoUpload from './PhotoUpload';

interface AddPhotoPopupProps {
    isVisible: boolean;
    setPopup: Function;
    onPressDoLater: Function;
    existingPhotos: string[];
    updatePhotoArray: Function;
}

const AddPhotoPopup: React.FunctionComponent<AddPhotoPopupProps> = ({
    isVisible,
    setPopup,
    onPressDoLater,
    existingPhotos,
    updatePhotoArray,
}) => {
    const [photo, setPhotos] = React.useState<string[]>([]);

    return (
        <ModalHOC isVisible={isVisible} setPopup={setPopup}>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', padding: DSP, paddingTop: STATUS_BAR_HEIGHT + DSP }}>
                <TextRippleButton
                    onPress={() => {
                        setPopup();
                    }}
                    buttonText="do later"
                    fontSize={fs14}
                    buttonTextColor={colorCode.CHAKRALOW(100)}
                    containerStyle={{
                        alignSelf: 'flex-end',
                        backgroundColor: colorCode.CHAKRALOW(20),
                        paddingHorizontal: '5%',
                        paddingVertical: '1%',
                        borderRadius: 4,
                    }}
                />

                <HeaderWithTitleAndSubHeading
                    borderNeeded={false}
                    heading="Add Photos"
                    subHeading="Please add more photos of the current product color"
                />
                <PhotoUpload
                    existingPhotos={existingPhotos}
                    updatePhotoArray={(photos: { path: string }[]) => {
                        updatePhotoArray(photos.map((item) => item.path));
                    }}
                />
            </View>
        </ModalHOC>
    );
};

export default AddPhotoPopup;

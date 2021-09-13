import { FontFamily, fs12, fs13, fs18 } from '@app/common';
import { mainColor } from '@app/common/color';
import { getHP } from '@app/common/dimension';
import { HP, WP, AIC, BGCOLOR, BR, BW, FDR, JCC, ML, PH, PV, FLEX, MV, MH, MT } from '@app/common/styles';
import { FastImageWrapper } from '@app/screens/component/FastImage';
import TextButton from '@app/screens/component/TextButton';
import WrappedRectangleButton from '@app/screens/component/WrappedRectangleButton';
import WrappedText from '@app/screens/component/WrappedText';
import ModalHOC from '@app/screens/hoc/ModalHOC';
import * as React from 'react';
import { View } from 'react-native';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import { padHor, padVer } from '../generalConfig';

interface DeleteImagePopupProps {
    isVisible: boolean;
    setPopup: Function;
    image?: ImageOrVideo;
    onPressRightButton: Function;
    onPressLeftButton: Function;
    rightButtonText: string;
    leftButtonText: string;
    question: string;
}

const DeleteImagePopup: React.FunctionComponent<DeleteImagePopupProps> = ({
    isVisible,
    setPopup,
    image,
    onPressLeftButton,
    onPressRightButton,
    rightButtonText,
    leftButtonText,
    question,
}) => {
    return (
        <Modal
            useNativeDriverForBackdrop
            isVisible={isVisible}
            style={{ margin: 0, alignItems: 'center' }}
            onBackdropPress={() => {
                setPopup();
            }}
        >
            <View style={[BGCOLOR('#FFFFFF'), WP(8), BR(0.1)]}>
                <WrappedText
                    text={question}
                    textColor={mainColor}
                    fontSize={fs13}
                    containerStyle={[MV(0.2), MH(0.2)]}
                    textStyle={{ textAlign: 'center' }}
                    fontFamily={FontFamily.RobotoRegular}
                />
                {image && (
                    <FastImageWrapper
                        source={{ uri: image.path }}
                        imageStyle={{ height: getHP(3), width: '100%' }}
                        resizeMode={'cover'}
                    />
                )}
                <View style={[MH(0.3)]}>
                    <View style={[FDR(), MV(0.2)]}>
                        <WrappedRectangleButton
                            onPress={onPressLeftButton}
                            containerStyle={[
                                FDR(),
                                JCC(),
                                AIC(),
                                BGCOLOR(mainColor),
                                PH(0.5),
                                PV(0.1),
                                BR(0.05),
                                FLEX(1),
                            ]}
                        >
                            <WrappedText text={leftButtonText} textColor={'#FFFFFF'} />
                        </WrappedRectangleButton>
                        <WrappedRectangleButton
                            onPress={onPressRightButton}
                            containerStyle={[
                                FDR(),
                                JCC(),
                                AIC(),
                                BGCOLOR(mainColor),
                                PH(0.5),
                                PV(0.1),
                                BR(0.05),
                                FLEX(1),
                                ML(0.2),
                            ]}
                        >
                            <WrappedText text={rightButtonText} textColor={'#FFFFFF'} />
                        </WrappedRectangleButton>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DeleteImagePopup;

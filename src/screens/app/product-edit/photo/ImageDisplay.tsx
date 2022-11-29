import { fs15, fs20 } from '@app/common';
import { getHP, getWP } from '@app/common/dimension';
import { DSP } from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';

import { Image, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { FastImageWrapper } from '@app/screens/component/FastImage';

interface ImageDisplayProps {
    showDeleteButton: boolean;
    index: number;
    setShowImageViewer: Function;
    setCurrentViewIndex: Function;
    item: { path: string; _id: string };
    setSelectedIndex: Function;
}

const ImageDisplay: FC<ImageDisplayProps> = ({
    setCurrentViewIndex,
    setShowImageViewer,
    showDeleteButton,
    index,
    item,
    setSelectedIndex,
}) => {
    return (
        <View
            style={{
                height: getWP(2.5),
                width: getWP(2.5),
                borderRadius: getHP(0.1),

                marginRight: getWP(0.3),
                marginTop: DSP,
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    setShowImageViewer(true);
                    setCurrentViewIndex(index);
                }}
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'red',
                }}
            >
                <FastImageWrapper
                    source={{ uri: item.path }}
                    imageStyle={{
                        height: getWP(2.5),
                        width: getWP(2.5),
                        borderRadius: getHP(0.1),
                        //  backgroundColor: 'red',
                    }}
                    resizeMode={'cover'}
                    key={index}
                />
            </TouchableOpacity>

            {showDeleteButton && (
                <WrappedFeatherIcon
                    iconName={'delete'}
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
            )}
        </View>
    );
};

export default ImageDisplay;

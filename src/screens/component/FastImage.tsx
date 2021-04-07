import * as React from 'react';
import { ImageStyle, StyleProp } from 'react-native';
import FastImage, { ResizeMode, Priority } from 'react-native-fast-image';
import { getHP, getWP } from '../../common/dimension';

interface FastImageWrapperProps {
    imageStyle?: StyleProp<ImageStyle>;
    resizeMode?: ResizeMode;
    source: {
        uri: string;
        header?: Object;
        priority?: Priority;
    };
}

export const FastImageWrapper = ({ imageStyle, resizeMode, source }: FastImageWrapperProps) => (
    <FastImage
        style={imageStyle || { width: getWP(2), height: getHP(1) }}
        source={source}
        resizeMode={resizeMode || FastImage.resizeMode.contain}
    />
);

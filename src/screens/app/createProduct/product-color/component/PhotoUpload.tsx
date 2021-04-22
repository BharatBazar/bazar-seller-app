import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import WrappedText from '../../../../component/WrappedText';
import { MT } from '../../../../../common/styles';
import WrappedFeatherIcon from '../../../../component/WrappedFeatherIcon';
import { fs12, fs13, fs16, fs19, fs20, fs28, fs40 } from '../../../../../common';
import { colorCode, mainColor } from '../../../../../common/color';
import { Heading } from '../ProductDetails';
import { getHP } from '../../../../../common/dimension';

export interface PhotoUploadProps {}

const PhotoUpload: React.SFC<PhotoUploadProps> = () => {
    return (
        <View>
            <View style={[styles.photoContainer, MT(0.1)]}>
                <WrappedFeatherIcon iconName={'camera'} iconSize={fs28} iconColor={mainColor} onPress={() => {}} />
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
    );
};

export default PhotoUpload;

const styles = StyleSheet.create({
    photoContainer: {
        // height: getWP(2.4),
        // width: getWP(2.4),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: mainColor,
        borderRadius: getHP(0.1),
        borderStyle: 'dashed',
        alignSelf: 'flex-start',
        borderWidth: 2,
        paddingHorizontal: '2%',
        paddingVertical: '4%',
        backgroundColor: null,
    },
    colorStyle: {
        height: getHP(0.2),
        width: getHP(0.2),
    },
});

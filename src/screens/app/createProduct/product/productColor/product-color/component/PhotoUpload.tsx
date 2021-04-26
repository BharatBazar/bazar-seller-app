import React from 'react';
import { View, StyleSheet } from 'react-native';
import WrappedText from '../../../../../../component/WrappedText';
import { MT } from '../../../../../../../common/styles';
import WrappedFeatherIcon from '../../../../../../component/WrappedFeatherIcon';
import { fs13, fs28 } from '../../../../../../../common';
import { mainColor } from '../../../../../../../common/color';

import { getHP } from '../../../../../../../common/dimension';

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

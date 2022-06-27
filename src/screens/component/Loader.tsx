import { mainColor } from '@app/common/color';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, View, ViewStyle } from 'react-native';
import { colorTransparency } from '../../common/styles';
//import {Bars} from "react-native-loader";

interface LoaderProps {
    backgroundColor?: string;
    containerStyle?: ViewStyle | ViewStyle[];
}

const Loader = ({ containerStyle, backgroundColor }: LoaderProps) => {
    return (
        <View
            style={[
                {
                    zIndex: 999,
                    elevation: 1000,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: backgroundColor || '#000000' + colorTransparency[20],
                },
                containerStyle,
            ]}
        >
            <ActivityIndicator color={'#FFF'} size={'large'} />
        </View>
    );
};

export default Loader;

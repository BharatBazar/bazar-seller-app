import { getHP } from '@app/common/dimension';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { fs10, fs12, fs13 } from '../../../../common';
import { colorCode } from '../../../../common/color';
import { BR, BW, HP, ML, MT, PV, W, WP } from '../../../../common/styles';
import WrappedText from '../../../component/WrappedText';
import { border, marHor, marTop, padHor, padVer } from '../../edit/product/component/generalConfig';

export interface StatusProps {
    name: string;
    count: string;
    onPress: Function;
    message: string;
}

const Status: React.SFC<StatusProps> = ({ name, count, onPress, message }) => {
    return (
        <Ripple
            onPress={() => {
                onPress();
            }}
            rippleContainerBorderRadius={getHP(0.1)}
            style={[border, BR(0.1), WP(4.6), padHor, padVer, marTop]}
        >
            <View>
                <WrappedText text={name.toLocaleUpperCase()} fontSize={fs12} />
                <WrappedText text={count} containerStyle={[MT(0.1)]} fontSize={fs13} fontWeight={'bold'} />
                <WrappedText
                    text={message}
                    fontSize={fs10}
                    containerStyle={[MT(0.1)]}
                    textColor={colorCode.BLACKLOW(50)}
                    numberOfLines={6}
                />
            </View>
        </Ripple>
    );
};

export default Status;

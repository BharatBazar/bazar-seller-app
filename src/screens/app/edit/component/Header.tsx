import * as React from 'react';
import { View } from 'react-native';
import { fs18 } from '../../../../common';
import { colorCode } from '../../../../common/color';
import { AIC, BGCOLOR, FDR, JCC, provideShadow, PV } from '../../../../common/styles';

import WrappedFeatherIcon from '../../../component/WrappedFeatherIcon';
import WrappedText from '../../../component/WrappedText';
import { padHor } from '../product/component/generalConfig';

export interface HeaderProps {
    headerTitle: string;
    onPressBack: Function;
    onPressDelete: Function;
    onPressCorrect: Function;
}

const Header: React.SFC<HeaderProps> = ({ headerTitle, onPressBack, onPressCorrect, onPressDelete }) => {
    return (
        <View style={[padHor, PV(0.1), BGCOLOR(colorCode.CHAKRALOW(70)), provideShadow()]}>
            <View style={[FDR(), AIC(), JCC('space-between')]}>
                <View style={[FDR()]}>
                    <WrappedFeatherIcon
                        onPress={() => {
                            // navigation.goBack();
                            onPressBack();
                        }}
                        iconName={'chevron-left'}
                        iconColor={colorCode.WHITE}
                    />
                    <WrappedText text={headerTitle} textColor={colorCode.WHITE} fontSize={fs18} />
                </View>

                <View style={[FDR()]}>
                    <WrappedFeatherIcon
                        onPress={() => {
                            onPressDelete();
                        }}
                        iconName={'trash-2'}
                        iconColor={colorCode.WHITE}
                    />
                </View>
            </View>
        </View>
    );
};

export default Header;

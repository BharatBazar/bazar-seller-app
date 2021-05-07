import * as React from 'react';
import { View } from 'react-native';
import { fs18 } from '../../../../common';
import { colorCode } from '../../../../common/color';
import { getHP } from '../../../../common/dimension';
import { BGCOLOR, commonStyles, componentProps, PH, provideShadow, PV } from '../../../../common/styles';
import TextButton from '../../../component/TextButton';
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
            <View style={[commonStyles.fdr, commonStyles.aic, commonStyles.spbtw]}>
                <View style={[commonStyles.fdr]}>
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

                <View style={[commonStyles.fdr]}>
                    <WrappedFeatherIcon
                        onPress={() => {
                            onPressCorrect();
                        }}
                        iconName={'check'}
                        iconColor={colorCode.WHITE}
                    />
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

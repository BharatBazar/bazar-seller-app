import * as React from 'react';
import { View } from 'react-native';
import { fs18 } from '../../../../common';
import { colorCode } from '../../../../common/color';
import { getHP } from '../../../../common/dimension';
import { BGCOLOR, commonStyles, componentProps, PH, PV } from '../../../../common/styles';
import TextButton from '../../../component/TextButton';
import WrappedFeatherIcon from '../../../component/WrappedFeatherIcon';
import WrappedText from '../../../component/WrappedText';
import { padHor } from '../product/component/generalConfig';

export interface HeaderProps {
    headerTitle: string;
    onPressBack: Function;
    rightFeatherIcon?: string;
    onPressRightIcon?: Function;
}

const Header: React.SFC<HeaderProps> = ({ headerTitle, onPressBack, onPressRightIcon, rightFeatherIcon }) => {
    return (
        <View style={[padHor, PV(0.1), BGCOLOR(colorCode.CHAKRALOW(70))]}>
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
                            // navigation.goBack();
                        }}
                        iconName={'check'}
                        iconColor={colorCode.WHITE}
                    />
                    <WrappedFeatherIcon
                        onPress={() => {
                            // navigation.goBack();
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

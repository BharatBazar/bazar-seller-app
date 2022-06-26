import * as React from 'react';
import { View } from 'react-native';
import { fs18 } from '../../../common';
import { colorCode } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import { AIC, BGCOLOR, FDR, JCC, PH, PV } from '../../../common/styles';
import WrappedFeatherIcon from '../../component/WrappedFeatherIcon';
import WrappedText from '../../component/WrappedText';

export interface HeaderProps {
    headerTitle: string;
    onPressBack: Function;
    rightFeatherIcon?: string;
    onPressRightIcon?: Function;
}

const Header: React.SFC<HeaderProps> = ({ headerTitle, onPressBack, onPressRightIcon, rightFeatherIcon }) => {
    return (
        <View style={[PH(0.3), PV(0.1), BGCOLOR(colorCode.CHAKRALOW(70))]}>
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

                {rightFeatherIcon && (
                    <View style={[FDR()]}>
                        <WrappedFeatherIcon
                            onPress={() => {
                                onPressRightIcon && onPressRightIcon();
                                // navigation.navigate(NavigationKey.CREATEPRODUCT);
                            }}
                            containerStyle={{ backgroundColor: colorCode.WHITE }}
                            iconName={rightFeatherIcon}
                            containerHeight={getHP(0.3)}
                            iconSize={fs18}
                            iconColor={colorCode.CHAKRALOW(50)}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

export default Header;

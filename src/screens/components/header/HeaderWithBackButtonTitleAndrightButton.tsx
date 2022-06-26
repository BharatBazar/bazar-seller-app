import { fs14, fs18, fs20 } from '@app/common';
import { mainColor } from '@app/common/color';
import { BGCOLOR, FDR, FLEX, JCC, PV } from '@app/common/styles';
import { PVA } from '@app/common/stylesheet';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, ViewStyle } from 'react-native';

interface HeaderWithBackButtonTitleAndrightButtonProps {
    onPressBack?: Function;
    title: string;
    rightComponent?: Function;
    containerStyle?: ViewStyle | ViewStyle[];
}

const HeaderWithBackButtonTitleAndrightButton: React.FunctionComponent<
    HeaderWithBackButtonTitleAndrightButtonProps
> = ({ onPressBack, title, rightComponent, containerStyle }) => {
    const navigation = useNavigation();
    return (
        <View style={[PVA(), FDR(), JCC('space-between'), BGCOLOR(mainColor), containerStyle]}>
            <View style={[FDR()]}>
                <WrappedFeatherIcon
                    iconName="chevron-left"
                    iconColor="#FFF"
                    onPress={onPressBack ? onPressBack : () => navigation.goBack()}
                />
            </View>
            <WrappedText text={title} textColor="#FFF" fontSize={fs18} />
            {rightComponent && rightComponent()}
        </View>
    );
};

export default HeaderWithBackButtonTitleAndrightButton;

import { FDR, FLEX, JCC, PV } from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';

interface HeaderWithBackButtonTitleAndrightButtonProps {
    onPressBack?: Function;
    title: string;
    rightComponent?: Function;
}

const HeaderWithBackButtonTitleAndrightButton: React.FunctionComponent<HeaderWithBackButtonTitleAndrightButtonProps> = ({
    onPressBack,
    title,
    rightComponent,
}) => {
    const navigation = useNavigation();
    return (
        <View style={[FLEX(1), PV(0.1), FDR(), JCC('space-between')]}>
            <View>
                <WrappedFeatherIcon
                    iconName="chevron-left"
                    onPress={onPressBack ? onPressBack : () => navigation.goBack()}
                />
                <WrappedText text={title} textColor="#FFF" />
            </View>
            {rightComponent && rightComponent()}
        </View>
    );
};

export default HeaderWithBackButtonTitleAndrightButton;

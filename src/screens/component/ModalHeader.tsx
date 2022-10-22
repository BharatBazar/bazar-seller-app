import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { fs12, fs14, fs20, fs24, fs28, fs40 } from '../../common';
import { AIC, BGCOLOR, FDR, FLEX, JCC, provideShadow } from '../../common/styles';
import WrappedText from './WrappedText';
import { colorCode } from '../../common/color';
import WrappedFeatherIcon from './WrappedFeatherIcon';
import Border from '../components/border/Border';
import ButtonMaterialIcons from '../components/button/ButtonMaterialIcons';

export interface ModalHeaderProps {
    heading: string;
    subHeading?: string;
    setPopup: Function;
    containerStyle: ViewStyle[];
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ setPopup, heading, subHeading = '', containerStyle }) => {
    return (
        <View style={[FDR(), JCC('space-between'), containerStyle]}>
            <View style={[FLEX(1)]}>
                <WrappedText text={heading} fontSize={fs24} textColor={'#242424'} />
                {subHeading.length > 0 && <WrappedText text={subHeading} textColor={'#646464'} fontSize={fs12} />}
            </View>
            <ButtonMaterialIcons
                iconSize={fs20}
                iconName={'close'}
                containerHeight={fs40}
                onPress={() => {
                    setPopup(false);
                }}
                containerStyle={[provideShadow(), BGCOLOR(colorCode.WHITE)]}
            />
        </View>
    );
};

export default ModalHeader;

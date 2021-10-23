import * as React from 'react';
import { View } from 'react-native';
import { fs20, fs28, fs40 } from '../../common';
import { AIC, BGCOLOR, FDR, FLEX, JCC, provideShadow } from '../../common/styles';
import WrappedText from './WrappedText';
import { colorCode } from '../../common/color';
import WrappedFeatherIcon from './WrappedFeatherIcon';

export interface ModalHeaderProps {
    heading: string;
    subHeading?: string;
    setPopup: Function;
}

const ModalHeader: React.SFC<ModalHeaderProps> = ({ setPopup, heading, subHeading = '' }) => {
    return (
        <View style={[FDR(), JCC('space-between')]}>
            <View style={[FLEX(1)]}>
                <WrappedText text={heading} fontSize={fs28} textColor={'#242424'} />
                {subHeading.length > 0 && <WrappedText text={subHeading} textColor={'#646464'} />}
            </View>
            <WrappedFeatherIcon
                iconSize={fs20}
                iconName={'x'}
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

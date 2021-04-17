import * as React from 'react';
import { View } from 'react-native';
import { fs20, fs28, fs40 } from '../../common';
import { BGCOLOR, commonStyles } from '../../common/styles';
import WrappedText from './WrappedText';
import { colorCode } from '../../common/color';
import WrappedFeatherIcon from './WrappedFeatherIcon';

export interface ModalHeaderProps {
    heading: string;
    subHeading: string;
    setPopup: Function;
}

const ModalHeader: React.SFC<ModalHeaderProps> = ({ setPopup, heading, subHeading }) => {
    return (
        <View style={[commonStyles.fdr, commonStyles.spbtw]}>
            <View>
                <WrappedText text={heading} fontSize={fs28} />
                <WrappedText text={subHeading} textColor={colorCode.BLACKLOW(40)} />
            </View>
            <WrappedFeatherIcon
                iconSize={fs20}
                iconName={'x'}
                containerHeight={fs40}
                onPress={() => {
                    setPopup(false);
                }}
                containerStyle={[commonStyles.shadow, BGCOLOR(colorCode.WHITE)]}
            />
        </View>
    );
};

export default ModalHeader;

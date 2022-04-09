import { FontFamily, fs12, fs16, fs20, fs25, fs30 } from '@app/common';
import { MT } from '@app/common/styles';
import WrappedText from '@app/screens/component/WrappedText';
import * as React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle } from 'react-native';

import Border from '../border/Border';

interface HeaderWithTitleAndSubHeadingProps {
    heading: string;
    subHeading?: string;
    headerStyle?: TextStyle;
    bottomBorderStyle?: ViewStyle | ViewStyle[];
    headerContainerStyle?: ViewStyle | ViewStyle[];
    borderNeeded?: boolean;
}

const HeaderWithTitleAndSubHeading: React.FunctionComponent<HeaderWithTitleAndSubHeadingProps> = ({
    heading,
    subHeading,
    bottomBorderStyle,
    headerStyle,
    headerContainerStyle,
    borderNeeded = true,
}) => {
    return (
        <View style={headerContainerStyle}>
            <WrappedText text={heading} fontFamily={FontFamily.Medium} fontSize={fs20} textStyle={headerStyle} />
            {typeof subHeading === 'string' && (
                <WrappedText
                    text={subHeading}
                    fontSize={fs12}
                    textColor={'#8a8a8a'}
                    fontFamily={FontFamily.Medium}
                    containerStyle={{ marginTop: 2 }}
                />
            )}
            {borderNeeded && <Border borderStyle={bottomBorderStyle} />}
        </View>
    );
};

const styles = StyleSheet.create({
    borderStyle: {
        borderTopWidth: 2,
        borderColor: '#500061',
        opacity: 0.1,
        marginTop: '2%',
    },
});

export default HeaderWithTitleAndSubHeading;

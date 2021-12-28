import { BGCOLOR, provideShadow } from '@app/common/styles';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { FontFamily, fs12, fs14, fs16, fs21, fs28 } from '../../../common';
import { colorCode } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import WrappedText from '../../component/WrappedText';

export interface ErrorTextProps {
    step: string;
    heading: string;
    subHeading?: string;
}

const HeaderText: React.SFC<ErrorTextProps> = ({ step, heading, subHeading }) => {
    const navigation = useNavigation();
    return (
        <>
            {typeof step == 'undefined' && (
                <WrappedFeatherIcon
                    onPress={() => {
                        navigation.goBack();
                    }}
                    iconName={'arrow-left'}
                    iconColor="#000"
                    containerHeight={getHP(0.45)}
                    containerStyle={[provideShadow(), BGCOLOR(colorCode.WHITE), { marginBottom: 10 }]}
                />
            )}
            {typeof step == 'string' && (
                <WrappedText text={step} fontSize={fs16} textColor={colorCode.SAFFRON} fontFamily={FontFamily.Bold} />
            )}
            <WrappedText
                text={heading}
                fontSize={fs21}
                textColor={'#000'}
                textStyle={{ marginTop: getHP(0.05) }}
                fontFamily={FontFamily.Medium}
            />
            {typeof subHeading === 'string' && (
                <WrappedText
                    text={subHeading}
                    fontSize={fs12}
                    textColor={colorCode.BLACKLOW(50)}
                    textStyle={{ marginTop: getHP(0.1) }}
                    fontFamily={FontFamily.Regular}
                />
            )}
        </>
    );
};

export default HeaderText;

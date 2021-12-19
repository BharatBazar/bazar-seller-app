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
    return (
        <>
            <WrappedText text={step} fontSize={fs16} textColor={colorCode.SAFFRON} fontFamily={FontFamily.RobotBold} />
            <WrappedText
                text={heading}
                fontSize={fs21}
                textColor={'#000'}
                textStyle={{ marginTop: getHP(0.05) }}
                fontFamily={FontFamily.RobotoMedium}
            />
            {typeof subHeading === 'string' && (
                <WrappedText
                    text={subHeading}
                    fontSize={fs12}
                    textColor={colorCode.BLACKLOW(50)}
                    textStyle={{ marginTop: getHP(0.1) }}
                    fontFamily={FontFamily.RobotoRegular}
                />
            )}
        </>
    );
};

export default HeaderText;

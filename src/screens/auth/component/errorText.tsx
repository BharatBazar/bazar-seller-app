import * as React from 'react';
import { Component } from 'react';
import { FontFamily, fs12 } from '../../../common';
import { errorColor } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import WrappedText from '../../component/WrappedText';

export interface ErrorTextProps {
    errorText?: string;
    marginTop?: number;
}

const ServerErrorText: React.SFC<ErrorTextProps> = ({ errorText, marginTop }) => {
    return (
        <WrappedText
            text={errorText}
            textColor={errorColor}
            textStyle={{ marginTop: marginTop || getHP(0.2) }}
            fontSize={fs12}
            fontFamily={FontFamily.Regular}
        />
    );
};

export default ServerErrorText;

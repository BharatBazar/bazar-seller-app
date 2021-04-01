import * as React from 'react';
import { Component } from 'react';
import { fs12 } from '../../../common';
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
            textColor={'red'}
            textStyle={{ marginTop: marginTop || getHP(0.2) }}
            fontSize={fs12}
        />
    );
};

export default ServerErrorText;

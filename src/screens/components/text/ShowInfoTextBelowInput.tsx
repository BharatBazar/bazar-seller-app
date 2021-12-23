import { messageColor } from '@app/common/color';
import WrappedText from '@app/screens/component/WrappedText';
import * as React from 'react';

interface ShowInforTextBelowInputProps {
    text: string;
    color?: string;
}

const ShowInforTextBelowInput: React.FunctionComponent<ShowInforTextBelowInputProps> = ({ text, color }) => {
    return <WrappedText text={text} fontSize={10} textColor={messageColor || color} />;
};

export default ShowInforTextBelowInput;

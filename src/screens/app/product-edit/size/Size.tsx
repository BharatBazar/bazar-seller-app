import { fs12, fs15 } from '@app/common';
import { colorCode, mainColor } from '@app/common/color';
import { AIC, BGCOLOR, BR, BW, FDR, JCC, ML, MT, MV, PH, PV } from '@app/common/styles';
import WrappedText from '@app/screens/component/WrappedText';
import TextRippleButton from '@app/screens/components/button/TextRippleB';
import * as React from 'react';
import { View } from 'react-native';
import CounterComponent from '../../edit/product/component/component/Counter';
import { choosenSize } from '../data-types';
import Icon from 'react-native-vector-icons/Feather';
import { border } from '../../edit/product/component/generalConfig';
import Border from '@app/screens/components/border/Border';

interface SizeProps {
    size: choosenSize;
    setSize: (a: keyof choosenSize) => void;
    removeSize: Function;
    createSize: Function;
    updateSize: Function;
}

const Size: React.FunctionComponent<SizeProps> = ({
    size: {
        quantity,
        itemId,
        size: { name, description },
    },
    setSize,
}) => {
    console.log('quantity', quantity, itemId.length);
    const previousValue = React.useRef<null | Partial<choosenSize>>(null);

    React.useEffect(() => {
        previousValue.current = { quantity, itemId };
        return () => {};
    }, []);

    return (
        <View style={[PH(0.2), BR(0.05), JCC(), PV(0.2)]}>
            <View style={[FDR(), AIC(), JCC('space-between')]}>
                <View style={[FDR(), AIC()]}>
                    <Icon name={'minus-circle'} color={colorCode.RED} size={fs15} onPress={() => {}} />
                    <WrappedText text={name} containerStyle={[ML(0.2)]} />
                </View>
                <CounterComponent counter={quantity} setCounter={() => {}} />
                {(previousValue.current?.quantity != quantity || itemId.length == 0) && (
                    <View style={[FDR(), JCC('flex-end')]}>
                        <TextRippleButton
                            buttonText={itemId.length == 0 ? 'Create' : 'Save'}
                            onPress={() => {}}
                            buttonTextColor={'#fff'}
                            fontSize={fs12}
                            containerStyle={[PH(0.4), PV(0.03), BGCOLOR(mainColor), BR(0.05)]}
                        />
                    </View>
                )}
            </View>
            <Border borderStyle={{ borderTopWidth: 1 }} />
        </View>
    );
};

export default Size;

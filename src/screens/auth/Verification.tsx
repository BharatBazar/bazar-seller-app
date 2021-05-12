import * as React from 'react';
import { View } from 'react-native';
import { fs28 } from '../../common';
import { getHP } from '../../common/dimension';
import { FLEX, PH, PV } from '../../common/styles';
import WrappedText from '../component/WrappedText';

export interface VerificationProps {}

const Verification: React.SFC<VerificationProps> = () => {
    return (
        <View style={[FLEX(1), PH(0.6), PV(0.5)]}>
            <WrappedText text={'Verification of dukan'} fontSize={fs28} />
            <WrappedText
                text={
                    'Hurrray! You have successfull completed all the process to get you started in your journey of growth and success.'
                }
                textStyle={{ marginTop: getHP(0.3) }}
            />
            <WrappedText
                text={
                    'Together we will grow & will end all the monopoly in the market. Bharat Bazar will be cheerfull as it was when there was no monopoly.'
                }
                textStyle={{ marginTop: getHP(0.3) }}
            />
            <WrappedText
                text={
                    'Company will contact you soon for dukan verification. After that you will be able to access your dukan.'
                }
                textStyle={{ marginTop: getHP(0.3) }}
            />
        </View>
    );
};

export default Verification;

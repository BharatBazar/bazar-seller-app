import { BGCOLOR, BR, DSP, FLEX, MT, PA, provideShadow } from '@app/common/styles';
import { STATUS_BAR_HEIGHT } from '@app/screens/component/StatusBar';

export const ShadowWrappper = () => {
    return [BGCOLOR('#FFFFFF'), , PA(DSP), provideShadow(1), MT(0.2), BR(0.1)];
};

export const generalContainerStyle = () => {
    return [BGCOLOR('#FFFFFF'), , PA(DSP), FLEX(1), { paddingTop: STATUS_BAR_HEIGHT + DSP }];
};

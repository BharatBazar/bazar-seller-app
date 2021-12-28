import { BGCOLOR, BR, DSP, MT, PA, provideShadow } from '@app/common/styles';

export const ShadowWrappper = () => {
    return [BGCOLOR('#FFFFFF'), , PA(DSP), provideShadow(1), MT(0.2), BR(0.1)];
};

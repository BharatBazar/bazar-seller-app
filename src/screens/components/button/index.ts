import { colorCode } from '@app/common/color';
import { AIC, JCC } from '@app/common/styles';
export const commonButtonProps = {
    backgroundColor: colorCode.CHAKRALOW(70),
    buttonTextColor: '#FFFFFF',
    containerStyle: [AIC(), JCC()],
    marginTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colorCode.SAFFRON,
};

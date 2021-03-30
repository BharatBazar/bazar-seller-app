import { colorTransparency } from './styles';

const applyColorCode = (color: string, percentage: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100) =>
    color + colorTransparency[percentage];

export const colorCode = {
    SAFFRON: '#FF9933',
    SAFFRONLOW: (percentage?: any) => applyColorCode(colorCode.SAFFRON, percentage),
    CHAKRA: '#000088',
    CHAKRALOW: (percentage?: any) => applyColorCode(colorCode.CHAKRA, percentage),
    GREEN: '#138808',
    GREENLOW: (percentage?: any) => applyColorCode(colorCode.GREEN, percentage),
    WHITE: '#FFFFFF',
    WHITELOW: (percentage?: any) => applyColorCode(colorCode.WHITE, percentage),
    BLACK: '#000000',
    BLACKLOW: (percentage?: any) => applyColorCode(colorCode.BLACK, percentage),
};

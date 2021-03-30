import { StackNavigationProp } from '@react-navigation/stack';
import { getHP, getWP } from './dimension';
const ratio = getHP(1) / getWP(1);

const scaleRatio = ratio > 2 ? 0.45 : 0.5;

export function provideFontSize(fontSize: number) {
    return ratio * fontSize * scaleRatio;
}

export const fs12 = provideFontSize(12);
export const fs13 = provideFontSize(13);
export const fs14 = provideFontSize(14);
export const fs15 = provideFontSize(15);
export const fs16 = provideFontSize(16);
export const fs17 = provideFontSize(17);
export const fs18 = provideFontSize(18);
export const fs19 = provideFontSize(19);
export const fs20 = provideFontSize(20);
export const fs21 = provideFontSize(21);
export const fs24 = provideFontSize(24);
export const fs25 = provideFontSize(25);
export const fs26 = provideFontSize(26);
export const fs28 = provideFontSize(28);
export const fs29 = provideFontSize(29);
export const fs30 = provideFontSize(30);
export const fs32 = provideFontSize(32);
export const fs44 = provideFontSize(44);
export const fs52 = provideFontSize(52);

export const fs51 = provideFontSize(51);
export const fs40 = provideFontSize(40);
export const fs48 = provideFontSize(48);
export const fs9 = provideFontSize(9);
export const fs42 = provideFontSize(42);
export const fs80 = provideFontSize(80);
export const fs90 = provideFontSize(90);
export const fs104 = provideFontSize(104);

export interface NavigationProps {
    navigation: StackNavigationProp<any>;
}

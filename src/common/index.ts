import { font_family_type } from './stylesheet';
import { Platform, PixelRatio } from 'react-native';
import { getHP, getWP } from './dimension';
//const ratio = getHP(1) / getWP(1);

const scale = getWP(10) / (Platform.OS == 'ios' ? 400 : 375);

export function provideFontSize(fontSize: number) {
    const newSize = fontSize * scale;
    if (Platform.OS == 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
    // return ratio * fontSize * scaleRatio;
    // return fontSize;
}

// const scaleRatio = ratio > 2 ? 0.47 : 0.49;
// //const scaleRatio = getWP(1) * 0.015;
// export function provideFontSize(fontSize: number) {
//     return fontSize * scaleRatio * ratio;
//     //return fontSize;
// }

export const fs3 = provideFontSize(3);
export const fs4 = provideFontSize(4);
export const fs5 = provideFontSize(5);
export const fs6 = provideFontSize(6);
export const fs7 = provideFontSize(7);
export const fs8 = provideFontSize(8);
export const fs9 = provideFontSize(9);
export const fs10 = provideFontSize(10);
export const fs11 = provideFontSize(12);
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
export const fs22 = provideFontSize(22);
export const fs23 = provideFontSize(23);
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
export const fs42 = provideFontSize(42);
export const fs80 = provideFontSize(80);
export const fs90 = provideFontSize(90);
export const fs104 = provideFontSize(104);

export interface NavigationProps {
    navigation: any;
}

export const emailValidation = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
export const mobileValidation = /^[1-9]{1}[0-9]{9}$/;
export const pinCodeValidation = /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/;
export const passwordValidation = [
    {
        regex: /^(?=.*[a-z])/,
        error: 'Atleast one lowercase character',

        matched: false,
    },
    {
        regex: /^(?=.*[A-Z])/,
        error: 'Atleast one uppercase character',

        matched: false,
    },
    {
        regex: /^(?=.*[0-9])/,
        error: 'Atleast one numeric character',

        matched: false,
    },
    {
        regex: /^(?=.*[!@#$%^&*])/,
        error: 'Atleast one special character(!,@,#,$,%,^,&,*)',

        matched: false,
    },
    {
        regex: /(?=.{8,})/,
        error: 'Minimum 8 characters',

        matched: false,
    },
];

export const FontFamily = {
    Regular: 'Roboto-Regular',
    Thin: 'Roboto-Thin',
    Light: 'Roboto-Light',
    Black: 'Roboto-Black',
    Medium: 'Roboto-Medium',
    Bold: 'Roboto-Bold',
    Helvatica: 'Helvetica',
};

export type font_family_type = 'Regular' | 'Thin' | 'Light' | 'Black' | 'Medium' | 'Bold' | 'Helvatica';

export const DEFAULT_IMAGE_URL =
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80';

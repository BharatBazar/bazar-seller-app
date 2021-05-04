import Toast from 'react-native-toast-message';

export class ToastHOC {
    static errorAlert(text2: string, text1?: string) {
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: text1 || 'Error',
            text2: text2,
            autoHide: true,
        });
    }
}

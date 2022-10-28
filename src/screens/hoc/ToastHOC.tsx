import Toast from 'react-native-toast-message';

export class ToastHOC {
    static errorAlert(text2: string, text1?: string,position?:string) {
        Toast.show({
            type: 'error',
            position: position === "top"?"top":"bottom",
            text1: text1 || 'Error',
            text2: text2,
            autoHide: true,
            // onPress:()=>Toast.hide()
            
        });
    }
    static successAlert(text2: string, text1?: string) {
        Toast.show({
            type: 'success',
            position: 'bottom',
            text1: text1 || 'Success',
            text2: text2,
            autoHide: true,
        });
    }
    static infoAlert(text2: string, text1?: string,position?:string) {
        Toast.show({
            type: 'info',
            position: position === "top"?"top":"bottom",
            text1: text1 || 'Info',
            text2: text2,
            autoHide: true,
        });
    }
}

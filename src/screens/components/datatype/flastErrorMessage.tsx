import { MessageType } from 'react-native-flash-message';

export interface FlashErrorMessageType {
    showError: (message: string, type?: MessageType) => void;
}

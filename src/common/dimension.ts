import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Dimensions, Platform } from 'react-native';

// window: reports width/height without the soft menu bar
// screen: reports entire screen's width/height
const getGlobalHeight = () => {
    const SCREEN_HEIGHT = Dimensions.get('screen').height;
    const WINDOW_HEIGHT = Dimensions.get('window').height;
    const STATUS_BAR_HEIGHT = Math.round(getStatusBarHeight());
    const a = Math.round(SCREEN_HEIGHT) - Math.round(WINDOW_HEIGHT);

    if (a == STATUS_BAR_HEIGHT || a - 1 == STATUS_BAR_HEIGHT || a + 1 == STATUS_BAR_HEIGHT) {
        // It means status bar was not included in windows and status bar is soft menu here
        return WINDOW_HEIGHT * 0.1 - (Platform.OS === 'ios' ? 2 : 0);
    } else {
        return (WINDOW_HEIGHT - STATUS_BAR_HEIGHT) * 0.1 - (Platform.OS === 'ios' ? 2 : 0);
    }
};
export const globalHeight = getGlobalHeight();
export const globalWidth = Dimensions.get('screen').width * 0.1;

export const getHP = (value) => globalHeight * value;
export const getWP = (value) => globalWidth * value;

import { NavigationProps } from './../common/index';
import { NavigationKey } from './../labels/index';
import { Storage } from './../storage/index';
import { StorageItemKeys } from '@app/storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ToastHOC } from '@app/screens/hoc/ToastHOC';
import React from 'react';

function useLogout(successCallback = () => {}, failCallback = () => {}) {
    const [logout, setLogout] = React.useState(false);
    const navigation = useNavigation();
    React.useEffect(() => {
        const logOut = async () => {
            try {
                const token = await Storage.getItem(StorageItemKeys.Token);
                if (token) {
                    // navigate to the login page incase of token expiry
                    //Freshchat.resetUser();
                    //messaging().deleteToken();
                    await Storage.removeItem(StorageItemKeys.Token);
                    Object.values(StorageItemKeys).forEach(async (value) => {
                        await Storage.removeItem(value);
                    });
                    axios.defaults.headers.common['Auth-Token'] = undefined;
                    axios.defaults.baseURL = '';
                    //await EncryptedStorage.setItem(EncryptedStorageItemKeys.PIN, '');
                    //props.userDetailsUpdate(user);
                    navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: NavigationKey.WELCOME,
                            },
                        ],
                    });
                    setLogout(false);
                    successCallback();
                }
            } catch (error) {
                //crashError(error);
                ToastHOC.errorAlert(error.message);
                failCallback();
            }
        };
        if (logout) logOut();
    }, [logout]);

    const value = React.useMemo(() => setLogout, [setLogout]);

    return value;
}

export default useLogout;

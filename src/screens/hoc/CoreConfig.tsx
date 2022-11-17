import { Storage, StorageItemKeys } from '@app/storage';

class CoreConfig {
    checkData(data: string, name: string) {
        if (!data) {
            throw new Error(`setting empty ${name} in coreconfig`);
        }
    }

    static async setUserId(userId: string) {
        this.checkData(userId, 'userId');
        await Storage.setItem(StorageItemKeys.userId, userId);
    }

    static async setShopId(shopId: string) {
        this.checkData(shopId, 'shopId');
        await Storage.setItem(StorageItemKeys.shopId, shopId);
    }

    static async getUserId() {
        return await Storage.getItem(StorageItemKeys.userId);
    }

    static async getShopId() {
        return await Storage.getItem(StorageItemKeys.shopId);
    }
}

export default CoreConfig;

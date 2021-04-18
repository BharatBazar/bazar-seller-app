export enum productStatus {
    CREATED = 'Created',
    READYTOROLLOUT = 'Rollout',
    OUTOFSTOCK = 'Out of stock',
    WAITINGFORAPPROVAL = 'Waiting for approval',
    LIVE = 'Live',
}

export interface Product {
    //Also i need to think about how i will be dealing with language preferences how can i use multiple language.

    productCategory: string;
    productSubCategory1: string;
    productSubCategory2: string | undefined;
    //Above field will have predifined information about the size, unit etc.
    productTitle: string;
    productSubtitle: string;
    productColor: [string];
    showPrice: boolean; //Whether dukandar wants to show price to customer or not
    productStatus: productStatus;
    productRating?: number;
    productNew: boolean; // Sometimes customer comes to shop asking what is new in the shop so this will show all the new available products
    productNewDeadline?: Date;
    productDescription: string; // Will be a audio as audio is better to understand in common language
    productDiscount?: [number]; // If a dukandar has decided that he wants to give special discount on particular product so discount will for each color
    productDiscountDeadline?: [Date];
}

export interface IProductColor {
    //One more thing productcolor id should be user generated id or a barcode id something like that so that
    //shopkeeper can easily identify product by barcode scan or manually typing and update it need to think about it.
    productParent: string; // Will refer to above product schema
    productColor: string; //Predefined color name should be there
    productSize: [number]; // Quantity, Mrp and Sp will match the index of size
    productQuantity: [number]; // Quanitity for each size
    productMrp: [number]; //Mrp for each size
    productSp: [number]; // Selling price for each size
    productPhotos: [string]; //Minimum 6 photo is required we need to guide dukandar about how to take photo
}

export interface IProductColorModel extends Document {}

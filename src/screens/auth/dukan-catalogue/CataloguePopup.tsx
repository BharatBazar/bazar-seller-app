import { fs14 } from '@app/common';
import { subHeadingColor } from '@app/common/color';
import { BGCOLOR, BTR, DSP, FDR, FLEX, ML, MT, PA } from '@app/common/styles';
import Loader from '@app/screens/component/Loader';
import WrappedText from '@app/screens/component/WrappedText';
import Border from '@app/screens/components/border/Border';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import ModalHOC from '@app/screens/hoc/ModalHOC';
import { getProductCatalogueAPI } from '@app/server/apis/catalogue/catalogue.api';
import { categoryType, IProductCatalogue, IRGetProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';
import { updateShop } from '@app/server/apis/shop/shop.api';
import { IRShopUpdate, updateShopData } from '@app/server/apis/shop/shop.interface';
import { Storage, StorageItemKeys } from '@app/storage';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CatalogueItem from './CatalogueItem';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { FlashErrorMessageType } from '@app/screens/components/datatype/flastErrorMessage';
interface CataloguePopupProps {
    isVisible: boolean;
    setPopup: Function;

    parentCatalogue: IProductCatalogue;

    successCallback: Function;
    alreadySelectedCategory: string[];
    failureCallback: Function;
}

const CataloguePopup: React.FunctionComponent<CataloguePopupProps> = ({
    isVisible = false,
    setPopup = () => {},

    parentCatalogue = {},

    successCallback,

    failureCallback,
    alreadySelectedCategory,
}) => {
    const [loader, setLoader] = React.useState(false);

    //all the selected catelgory
    const [currentSelectedCategory, setSelectedCategory] = React.useState<string[]>([]);
    const [error, setError] = React.useState('');

    //It is basically all the child for the current item
    const [currentItem, setCurrentItem] = React.useState<IProductCatalogue[]>([]);

    const getCatalogueDetails = async () => {
        setLoader(true);
        const response1: IRGetProductCatalogue = await getProductCatalogueAPI({
            active: true,
            parent: parentCatalogue._id,
            categoryType: categoryType.SubCategory1,
        });
        setCurrentItem(response1.payload);
        setLoader(false);
    };

    const modalRef = React.useRef<null | FlashErrorMessageType>(null);

    //While updating full subCategory and subCategory1 is going
    //So we have to carefully update index
    const updateCatalogueDetails = async (data: updateShopData) => {
        setLoader(true);
        const ownerDetails = await Storage.getItem(StorageItemKeys.userDetail);

        const response: IRShopUpdate = await updateShop({
            ...data,
            _id: ownerDetails.shop,
        });

        if (response.status == 1) {
            setLoader(false);
            setPopup();
            successCallback();
            setSelectedCategory([]);
        } else {
            setLoader(false);
            setError(response.message);
        }
    };

    React.useEffect(() => {
        if (isVisible) {
            getCatalogueDetails();

            setSelectedCategory(alreadySelectedCategory);
        }
    }, [isVisible]);

    const onPressSubmitDetails = async () => {
        if (currentSelectedCategory.length == 0) {
            if (modalRef.current) modalRef.current.showError('Please select atleast one category', 'danger');
        } else {
            successCallback(true, currentSelectedCategory);
        }
    };

    return (
        <ModalHOC
            refer={(ref) => (modalRef.current = ref)}
            isVisible={isVisible}
            setPopup={() => {
                successCallback(false);
            }}
            showErrorMessage={error}
        >
            <View style={[BGCOLOR('#FFFFFF'), PA(DSP), BTR(20), { overflow: 'hidden' }]}>
                <View style={[FDR()]}>
                    <FastImage source={{ uri: parentCatalogue.image }} style={{ height: 50, width: 50 }} />
                    <View style={[ML(0.6), FLEX(1)]}>
                        <WrappedText
                            text={'What you sell under ' + parentCatalogue.name + ' category ?'}
                            fontSize={fs14}
                        />
                        <WrappedText
                            text={'Select item you sell under ' + parentCatalogue.name + ' cateogry by clicking on it'}
                            textColor={subHeadingColor}
                        />
                    </View>
                </View>
                <Border />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{}}>
                        {currentItem.map((item) => {
                            const isSelected = currentSelectedCategory.includes(item._id);

                            return (
                                <CatalogueItem
                                    item={item}
                                    onPressCategory={() => {
                                        if (!isSelected) {
                                            currentSelectedCategory.push(item._id);
                                            setSelectedCategory([...currentSelectedCategory]);
                                        } else {
                                            setSelectedCategory([
                                                ...currentSelectedCategory.filter((id) => id != item._id),
                                            ]);
                                        }
                                    }}
                                    selected={isSelected}
                                />
                            );
                        })}
                    </View>
                </ScrollView>
                <Border />
                <RightComponentButtonWithLeftText
                    buttonText="Submit selected catalogue"
                    onPress={onPressSubmitDetails}
                    containerStyle={[MT(0.2)]}
                />

                {loader && <Loader containerStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }} />}
            </View>
        </ModalHOC>
    );
};

export default CataloguePopup;

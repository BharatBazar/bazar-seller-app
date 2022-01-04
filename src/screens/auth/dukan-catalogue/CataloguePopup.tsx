import { fs18, fs22 } from '@app/common';
import { subHeadingColor } from '@app/common/color';
import { AIC, BGCOLOR, BTR, DSP, FLEX, MT, PA } from '@app/common/styles';
import Loader from '@app/screens/component/Loader';
import WrappedText from '@app/screens/component/WrappedText';
import Border from '@app/screens/components/border/Border';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import ModalWithHeaderAndButton from '@app/screens/components/popup/ModalWithHeader';
import { generalContainerStyle } from '@app/screens/components/styles/common';
import ModalHOC from '@app/screens/hoc/ModalHOC';
import { getProductCatalogueAPI } from '@app/server/apis/catalogue/catalogue.api';
import { categoryType, IProductCatalogue, IRGetProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';
import { getShop, updateShop } from '@app/server/apis/shop/shop.api';
import { IRGetShop, IRShopUpdate, updateShopData } from '@app/server/apis/shop/shop.interface';
import { Storage, StorageItemKeys } from '@app/storage';
import * as React from 'react';
import { ScrollView, View } from 'react-native';
import CatalogueCardVertical from '../component/CatalogueCardVertical';
import CatalogueItem from './CatalogueItem';

interface CataloguePopupProps {
    isVisible: boolean;
    setPopup: Function;

    parentCatalogue: IProductCatalogue;
    subCategory: IProductCatalogue[][];
    subCategory1: IProductCatalogue[][][];
    currentCatalogueIndex: number;
    successCallback: Function;
    currentSelectedIndex: number;
}

const CataloguePopup: React.FunctionComponent<CataloguePopupProps> = ({
    isVisible = false,
    setPopup = () => {},

    parentCatalogue,
    subCategory,
    subCategory1,
    successCallback,
    currentCatalogueIndex,
    currentSelectedIndex,
}) => {
    const [loader, setLoader] = React.useState(false);

    //all the selected catelgory
    const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);
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
        } else {
            setLoader(false);
            setError(response.message);
        }
    };

    React.useEffect(() => {
        if (isVisible) {
            getCatalogueDetails();
        }
    }, [isVisible]);

    return (
        <ModalHOC isVisible={isVisible} setPopup={setPopup}>
            <View style={[BGCOLOR('#FFFFFF'), PA(DSP), BTR(20), { overflow: 'hidden' }]}>
                <View style={[AIC()]}>
                    <WrappedText text="What you sell under Mens category ?" fontSize={fs22} textAlign="center" />
                    <WrappedText
                        text="Select item you sell under mens cateogry by clicking on it"
                        textColor={subHeadingColor}
                    />
                </View>
                <Border />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{}}>
                        {currentItem.map((item) => {
                            const isSelected = selectedCategory.includes(item._id);

                            return (
                                <CatalogueItem
                                    item={item}
                                    onPressCategory={() => {
                                        if (!isSelected) {
                                            selectedCategory.push(item._id);
                                            setSelectedCategory([...selectedCategory]);
                                        } else {
                                            setSelectedCategory([...selectedCategory.filter((id) => id != item._id)]);
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
                    buttonText="Continue"
                    onPress={async () => {
                        var a = [...subCategory];
                        if (a.length == 0) {
                            a.push([parentCatalogue._id]);
                        } else {
                            a[currentCatalogueIndex].push(parentCatalogue._id);
                        }
                        var b = [...subCategory1];
                        if (b.length == 0) {
                            b.push([[...selectedCategory]]);
                        } else {
                            b[currentCatalogueIndex][currentSelectedIndex] = selectedCategory;
                        }
                        await updateCatalogueDetails({ subCategory: a, subCategory1: b });
                    }}
                    containerStyle={[MT(0.2)]}
                />

                {loader && <Loader containerStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }} />}
            </View>
        </ModalHOC>
    );
};

export default CataloguePopup;

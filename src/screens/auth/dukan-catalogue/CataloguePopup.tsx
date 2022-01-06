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
    subCategory: string[][];
    subCategory1: string[][][];
    currentCatalogueIndex: number;
    successCallback: Function;
    failureCallback: Function;
    currentSelectedIndex: number;

    //To check whether it already has children or not so that to initiate the failure call back or clean up..
    childrenAvailable: boolean;
}

const CataloguePopup: React.FunctionComponent<CataloguePopupProps> = ({
    isVisible = false,
    setPopup = () => {},

    parentCatalogue = {},
    subCategory,
    subCategory1,
    successCallback,
    currentCatalogueIndex,
    failureCallback,
    currentSelectedIndex,
    childrenAvailable,
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
            if (
                subCategory1.length >= currentCatalogueIndex + 1 &&
                subCategory1[currentCatalogueIndex].length >= currentSelectedIndex + 1
            ) {
                setSelectedCategory(subCategory1[currentCatalogueIndex][currentSelectedIndex]);
            }
        }
    }, [isVisible]);

    const onPressSubmitDetails = async () => {
        if (selectedCategory.length == 0) {
            if (modalRef.current) modalRef.current.showError('Please select atleast one category', 'danger');
        } else {
            var a = [...subCategory];

            if (a.length < currentCatalogueIndex + 1) {
                a.push([parentCatalogue._id]);
            } else {
                a[currentCatalogueIndex].push(parentCatalogue._id);
            }

            var b = [...subCategory1];
            if (b.length < currentCatalogueIndex + 1) {
                b.push([[...selectedCategory]]);
            } else {
                if (b[currentCatalogueIndex].length < currentSelectedIndex + 1) {
                    b[currentCatalogueIndex].push(selectedCategory);
                } else b[currentCatalogueIndex][currentSelectedIndex] = selectedCategory;
            }

            await updateCatalogueDetails({ subCategory: a, subCategory1: b });
        }
    };

    return (
        <ModalHOC
            refer={(ref) => (modalRef.current = ref)}
            isVisible={isVisible}
            setPopup={() => {
                if (!childrenAvailable) failureCallback();

                setPopup();
                setSelectedCategory([]);
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

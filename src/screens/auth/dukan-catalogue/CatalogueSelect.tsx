import { fs14 } from '@app/common';
import { subHeadingColor } from '@app/common/color';
import { getHP } from '@app/common/dimension';
import { BGCOLOR, BTR, DSP, FDR, FLEX, ML, MT, PA, provideShadow } from '@app/common/styles';
import { FastImageWrapper } from '@app/screens/component/FastImage';
import Loader from '@app/screens/component/Loader';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedText from '@app/screens/component/WrappedText';
import Border from '@app/screens/components/border/Border';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import { FlashErrorMessageType } from '@app/screens/components/datatype/flastErrorMessage';

import ModalHOC from '@app/screens/hoc/ModalHOC';
import { getProductCatalogueAPI } from '@app/server/apis/catalogue/catalogue.api';
import { IProductCatalogue, IRGetProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';

import * as React from 'react';
import { ScrollView, View } from 'react-native';
import CatalogueItem from './CatalogueItem';

interface CatalogueProps {
    isVisible: boolean;
    setPopup: Function;
    catalgoueTree: string[][];

    callBack: (path: IProductCatalogue[]) => void;
    onPressDelete: (path: IProductCatalogue[]) => void;
    parentCatalogue: IProductCatalogue;
}

const Catalogue: React.FunctionComponent<CatalogueProps> = ({
    isVisible,
    setPopup,
    parentCatalogue,
    catalgoueTree,
    onPressDelete,
    callBack,
}) => {
    // All the parent catalogue or subcategory like mens, women etc
    // const [parentCatalogue, setParentCatalogue] = React.useState<IProductCatalogue[]>([]);

    //loader function
    const [loader, setLoader] = React.useState(false);

    //all the selected catelgory in this particular catalogue
    const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);
    const [error, setError] = React.useState('');

    //It is basically all the child for the current selected or top category item
    const [currentItem, setCurrentItem] = React.useState<IProductCatalogue[]>([]);

    const modalRef = React.useRef<null | FlashErrorMessageType>(null);

    const sortFunction = (a: IProductCatalogue, b: IProductCatalogue, selectedCategory: string[]) => {
        const indexOfA = selectedCategory.findIndex((item) => item == a._id);
        const indexOfB = selectedCategory.findIndex((item) => item == b._id);
        console.log(indexOfA, indexOfB, selectedCategory);
        if (indexOfA == -1 && indexOfB == -1) {
            return 0;
        } else if (indexOfA > -1 && indexOfB > -1) {
            if (indexOfA < indexOfB) {
                return -1;
            } else if (indexOfA == indexOfB) {
                return 0;
            } else {
                return 1;
            }
        } else if (indexOfA > -1 && indexOfB == -1) {
            return -1;
        } else if (indexOfB > -1 && indexOfA == -1) {
            return 1;
        }
    };

    const getCatalogueDetails = async () => {
        setLoader(true);

        // setSelectedCategory();
        const response1: IRGetProductCatalogue = await getProductCatalogueAPI({
            active: false,
            parent: parentCatalogue._id,
        });

        // console.log(response1.payload);
        if (response1.status == 1) {
            response1.payload.sort((a, b) => sortFunction(a, b, []));
            setCurrentItem([...response1.payload]);
            setLoader(false);
        } else {
            setError(response1.message);
            setLoader(false);
        }
    };

    React.useEffect(() => {
        if (isVisible) getCatalogueDetails();
        else {
            setSelectedCategory([]);
        }
    }, [isVisible]);

    const currentCatalogue: IProductCatalogue | { name: string; image: '' } = parentCatalogue
        ? parentCatalogue
        : { name: '', image: '' };
    return (
        <ModalHOC
            refer={(ref) => (modalRef.current = ref)}
            isVisible={isVisible}
            setPopup={() => {
                setPopup(false);
            }}
            statusBarTranlucent={true}
            showErrorMessage={error}
        >
            <View style={[BGCOLOR('#FFFFFF'), PA(DSP), BTR(20), { overflow: 'hidden', maxHeight: getHP(9) }]}>
                <View style={[]}>
                    <View style={[FDR()]}>
                        <WrappedFeatherIcon
                            onPress={() => {
                                setPopup(false);
                            }}
                            iconName="chevron-left"
                            containerStyle={[BGCOLOR('#FFFFFF'), provideShadow(1)]}
                        />

                        {currentCatalogue && (
                            <FastImageWrapper
                                source={{ uri: currentCatalogue.image }}
                                imageStyle={{ height: 50, width: 50, marginLeft: 20 }}
                            />
                        )}
                        <View style={[ML(0.6), FLEX(1)]}>
                            <WrappedText
                                text={'What you sell under ' + currentCatalogue.name + ' category ?'}
                                fontSize={fs14}
                            />
                            <WrappedText
                                text={
                                    'Select item you sell under ' +
                                    currentCatalogue.name +
                                    ' cateogry by clicking on it'
                                }
                                textColor={subHeadingColor}
                            />
                        </View>
                    </View>
                </View>
                <Border />
                <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
                    <View style={[]}>
                        {currentItem.map((item, index) => {
                            const isSelected = catalgoueTree.length > 0 ? catalgoueTree[0].includes(item._id) : false;
                            const indx = isSelected ? catalgoueTree[0].findIndex((id) => id == item._id) : -1;
                            const currentIndex = indx == -1 ? 0 : indx;
                            console.log(item.name, isSelected);
                            return (
                                <CatalogueItem
                                    key={item._id + index.toString()}
                                    item={item}
                                    index={0}
                                    selectedTree={catalgoueTree}
                                    onPressDelete={(path) => {
                                        onPressDelete(item.child.length > 0 ? [item, ...path] : [item]);
                                    }}
                                    onPressCategory={(path) => {
                                        console.log('isSelected', isSelected, path, item.name);

                                        callBack(item.child.length > 0 ? [item, ...path] : [item]);
                                    }}
                                    selected={isSelected}
                                />
                            );
                        })}
                    </View>
                </ScrollView>
                <Border />
                <View style={[]}>
                    <RightComponentButtonWithLeftText
                        buttonText="Close"
                        onPress={() => {
                            setPopup(false);
                        }}
                        containerStyle={[MT(0.2)]}
                    />
                </View>

                {loader && <Loader />}
            </View>
        </ModalHOC>
    );
};

export default Catalogue;

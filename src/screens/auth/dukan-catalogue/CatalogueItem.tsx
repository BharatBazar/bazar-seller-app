import * as React from 'react';
import { black100, black60, colorCode, mainColor } from '../../../common/color';
import { AIC, BGCOLOR, BR, FDR, ML, MR, MT, PH, provideShadow, PV } from '../../../common/styles';
import Icon from 'react-native-vector-icons/Feather';
import { View, ViewStyle } from 'react-native';
import { getHP, getWP } from '../../../common/dimension';
import { FastImageWrapper } from '../../component/FastImage';
import WrappedText from '../../component/WrappedText';
import { FontFamily, fs12, fs14 } from '../../../common';
import { IProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';
import Ripple from 'react-native-material-ripple';
import ButtonFeatherIcon from '@app/screens/components/button/ButtonFeatherIcon';
import Catalogue from './CatalogueSelect';

export interface CatalogueItemProps {
    item: IProductCatalogue;
    containerStyle?: ViewStyle | ViewStyle[];
    onPressCategory: (item: string | string[]) => void;
    onPressEdit?: Function;
    //selectedItems: IProductCatalogue[];
    selected: boolean;

    // children's are basically items inside that catalogue

    children?: string;
    index: number;
    selectedTree: string[][];
}

const CatalogueItem: React.SFC<CatalogueItemProps> = ({
    item,
    onPressCategory,

    onPressEdit,
    selected,

    selectedTree,
    index,
}) => {
    const [showChildPopup, setShowChildPopup] = React.useState(false);

    const ComponentType = selected ? View : Ripple;

    const renderSelectedItems = () => {
        if (selectedTree.length > index + 1 && selectedTree[index + 1].length > 0) {
            let items = item.child.filter((data) => selectedTree[index + 1].includes(data._id));
            return (
                <View>
                    <WrappedText
                        text="Item you sell inside this category"
                        containerStyle={[MT(0.05)]}
                        textColor="#242424"
                    />
                    <View style={[FDR(), { flexWrap: 'wrap' }]}>
                        {items.map((item) => (
                            <WrappedText
                                key={item._id}
                                text={item.name}
                                containerStyle={[BGCOLOR(mainColor), PH(0.1), PV(0.05), MR(0.1), BR(0.05), MT(0.1)]}
                                textColor="#FFFFFF"
                            />
                        ))}
                    </View>
                </View>
            );
        } else {
            return <View />;
        }
    };

    return (
        <ComponentType
            style={[
                PH(0.2),
                FDR(),
                { flex: 1 },
                MT(0.1),
                AIC(),
                PV(0.1),

                { borderRadius: getWP(0.3), backgroundColor: selected ? colorCode.CHAKRALOW(20) : colorCode.WHITE },
            ]}
            onPress={() => {
                if (selected) {
                } else {
                    if (item.child.length > 0) {
                        setShowChildPopup(true);
                    } else {
                        onPressCategory();
                    }
                }
            }}
        >
            <FastImageWrapper
                source={{ uri: item.image }}
                imageStyle={{
                    height: getHP(0.8),
                    width: getHP(0.4),
                }}
                resizeMode={'contain'}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <WrappedText
                    text={item.name}
                    textColor={!selected ? black60 : black100}
                    fontSize={fs14}
                    fontFamily={FontFamily.Medium}
                />
                {selected && item.child.length > 0 ? (
                    renderSelectedItems()
                ) : (
                    <WrappedText
                        text={item.description}
                        textColor={colorCode.BLACKLOW(40)}
                        fontSize={fs12}
                        textStyle={{ marginTop: getHP(0.05) }}
                    />
                )}
            </View>

            {selected && onPressEdit && item.child.length > 0 && (
                <ButtonFeatherIcon
                    iconName="edit"
                    containerStyle={[provideShadow(1), BGCOLOR('#FFFFFF'), ML(0.3)]}
                    onPress={() => {
                        setShowChildPopup(true);
                        //onPressEdit(item, index);
                    }}
                />
            )}
            {selected && (
                <ButtonFeatherIcon
                    iconName="x"
                    onPress={() => {}}
                    containerStyle={[provideShadow(1), BGCOLOR('#FFFFFF'), ML(0.3)]}
                />
            )}
            {!selected && (
                <Icon
                    name={selected ? 'check' : 'circle'}
                    style={{ marginLeft: 20 }}
                    size={18}
                    color={!selected ? black60 : black100}
                />
            )}

            <Catalogue
                isVisible={showChildPopup}
                setPopup={() => {
                    setShowChildPopup(false);
                }}
                catalgoueTree={[...selectedTree.slice(1)]}
                parentCatalogue={item}
                successCallback={(item: string | string[]) => {
                    onPressCategory(item);
                }}
            />
        </ComponentType>
    );
};

export default CatalogueItem;

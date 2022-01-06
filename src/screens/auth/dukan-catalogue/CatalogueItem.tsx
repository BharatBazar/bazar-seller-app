import * as React from 'react';
import { black100, black60, colorCode, mainColor } from '../../../common/color';
import { AIC, BGCOLOR, BR, FDR, ML, MR, MT, PH, provideShadow, PV } from '../../../common/styles';
import WrappedRectangleButton from '../../component/WrappedRectangleButton';

import Icon from 'react-native-vector-icons/Feather';
import { View, ViewStyle } from 'react-native';
import { getHP, getWP } from '../../../common/dimension';
import { FastImageWrapper } from '../../component/FastImage';
import WrappedText from '../../component/WrappedText';
import { FontFamily, fs10, fs12, fs13, fs14, fs16, fs9 } from '../../../common';
import { IProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';
import Ripple from 'react-native-material-ripple';
import ButtonFeatherIcon from '@app/screens/components/button/ButtonFeatherIcon';

export interface CatalogueItemProps {
    item: IProductCatalogue;
    containerStyle?: ViewStyle | ViewStyle[];
    onPressCategory: () => void;
    onPressEdit?: Function;
    //selectedItems: IProductCatalogue[];
    selected: boolean;

    // children's are basically items inside that catalogue

    children?: string;
}

const CatalogueItem: React.SFC<CatalogueItemProps> = ({
    item,
    onPressCategory,
    containerStyle,
    onPressEdit,
    selected,
    children,
}) => {
    const ComponentType = selected ? View : Ripple;

    console.log(children);

    const renderSelectedItems = () => {
        return (
            <View>
                <WrappedText text="item you sell inside clothes" containerStyle={[MT(0.05)]} textColor="#242424" />
                <View style={[FDR(), { flexWrap: 'wrap' }]}>
                    {children.map((item) => (
                        <WrappedText
                            text={item.name}
                            containerStyle={[BGCOLOR(mainColor), PH(0.1), PV(0.05), MR(0.1), BR(0.05), MT(0.1)]}
                            textColor="#FFFFFF"
                        />
                    ))}
                </View>
            </View>
        );
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
            onPress={onPressCategory}
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
                {selected && item.subCategoryExist && children ? (
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

            {selected && onPressEdit && item.subCategoryExist && (
                <ButtonFeatherIcon
                    iconName="edit"
                    containerStyle={[provideShadow(1), BGCOLOR('#FFFFFF'), ML(0.3)]}
                    onPress={() => {
                        onPressEdit();
                        //onPressEdit(item, index);
                    }}
                />
            )}
            {selected && (
                <ButtonFeatherIcon
                    iconName="x"
                    onPress={() => {
                        onPressCategory();
                    }}
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
        </ComponentType>
    );
};

export default CatalogueItem;

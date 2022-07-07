import * as React from 'react';
import { black100, black60, borderColor, colorCode, mainColor } from '../../../common/color';
import { AIC, BGCOLOR, BR, FDR, ML, MR, MT, PH, provideShadow, PV } from '../../../common/styles';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { getHP, getWP } from '../../../common/dimension';
import { FastImageWrapper } from '../../component/FastImage';
import WrappedText from '../../component/WrappedText';
import { FontFamily, fs12, fs14 } from '../../../common';
import { IProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';

import ButtonFeatherIcon from '@app/screens/components/button/ButtonFeatherIcon';
import { IFilter } from '@app/server/apis/product/product.interface';
import { border } from '../edit/product/component/generalConfig';
import { MTA, PVA } from '@app/common/stylesheet';

export interface FilterValueProps {
    item: IFilter;
    containerStyle?: ViewStyle | ViewStyle[];
    onPress: Function;

    selected: boolean;
}

const FilterValue: React.FC<FilterValueProps> = ({
    item,

    selected,
    onPress,
}) => {
    return (
        <TouchableOpacity
            key={item._id}
            disabled={selected}
            style={[
                PH(0.2),
                FDR(),
                { flex: 1 },

                AIC(),
                MTA(),
                PVA(),
                { borderBottomWidth: 0.5, borderColor: borderColor },
                { borderRadius: getWP(0.3), backgroundColor: selected ? colorCode.CHAKRALOW(20) : colorCode.WHITE },
            ]}
            onPress={() => {
                onPress();
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

                <WrappedText
                    text={item.description}
                    textColor={colorCode.BLACKLOW(40)}
                    fontSize={fs12}
                    textStyle={{ marginTop: getHP(0.05) }}
                />
            </View>

            {selected && (
                <ButtonFeatherIcon
                    iconName="x"
                    onPress={() => {
                        onPress();
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
        </TouchableOpacity>
    );
};

export default FilterValue;

import * as React from 'react';
import { black100, black60, colorCode, mainColor } from '../../../common/color';
import { AIC, BGCOLOR, FDR, ML, MT, PH, provideShadow, PV } from '../../../common/styles';
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
    selected: boolean;
}

const CatalogueItem: React.SFC<CatalogueItemProps> = ({ item, onPressCategory, containerStyle, selected }) => {
    const ComponentType = selected ? View : Ripple;
    return (
        <ComponentType
            style={[
                PH(0.2),
                FDR(),
                { flex: 1 },
                MT(0.1),
                AIC(),

                { borderRadius: getWP(0.1), backgroundColor: selected ? colorCode.CHAKRALOW(20) : colorCode.WHITE },
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
                <WrappedText
                    text={item.description}
                    textColor={colorCode.BLACKLOW(40)}
                    fontSize={fs12}
                    textStyle={{ marginTop: getHP(0.05) }}
                />
            </View>

            {selected && (
                <ButtonFeatherIcon
                    iconName="edit"
                    containerStyle={[provideShadow(1), BGCOLOR('#FFFFFF'), ML(0.3)]}
                    onPress={() => {
                        //onPressEdit(item, index);
                    }}
                />
            )}
            {selected && (
                <ButtonFeatherIcon
                    iconName="x"
                    onPress={() => {
                        onPressCategory();
                        // setAlertState({
                        //     isVisible: true,
                        //     heading: 'Delete member',
                        //     subHeading: 'Are you sure you want to remove ' + item.firstName + ' from your shop?',
                        //     onPressRightButton: () => {
                        //         setAlertState(defaultAlertState);
                        //         deleteMember(item._id, index);
                        //     },
                        // });
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

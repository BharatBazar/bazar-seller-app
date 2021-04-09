import * as React from 'react';
import WrappedRectangleButton from '../../component/WrappedRectangleButton';
import { View } from 'react-native';
import { colorCode } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import { BR, MH, MT } from '../../../common/styles';
import WrappedText from '../../component/WrappedText';

export interface ShopProductDetailProps {
    item: { name: string; totalItem: number };
}

const ShopProductDetail: React.FC<ShopProductDetailProps> = ({ item }) => {
    return (
        <WrappedRectangleButton
            onPress={() => {}}
            containerStyle={[
                MH(0.1),
                MT(0.1),
                BR(0.1),
                {
                    height: getHP(1),
                    flex: 1,
                    backgroundColor: colorCode.WHITE,
                    padding: '5%',
                    borderWidth: 1,
                    borderColor: colorCode.BLACKLOW(20),
                },
            ]}
        >
            <View style={{ flex: 1 }}>
                <WrappedText text={item.name} textColor={colorCode.BLACKLOW(60)} containerStyle={{ flex: 1 }} />
                <WrappedText
                    text={item.totalItem.toString()}
                    textColor={colorCode.BLACK}
                    containerStyle={{ flex: 1 }}
                />
            </View>
        </WrappedRectangleButton>
    );
};

export default ShopProductDetail;

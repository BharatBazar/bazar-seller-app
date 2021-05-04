import * as React from 'react';
import WrappedRectangleButton from '../../component/WrappedRectangleButton';
import { View } from 'react-native';
import { colorCode } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import WrappedText from '../../component/WrappedText';
import Icon from 'react-native-vector-icons/Feather';
import { fs20 } from '../../../common';
import { product } from '../../../server/apis/productCatalogue/productCatalogue.interface';
import { FastImageWrapper } from '../../component/FastImage';
import { AIC, FDR, ML } from '../../../common/styles';

export interface ShowSubCategoryProps {
    item: product;
    onPress: Function;
}

const ShowSubCategory: React.FC<ShowSubCategoryProps> = ({ item, onPress }) => {
    return (
        <WrappedRectangleButton
            onPress={() => {
                onPress();
            }}
            containerStyle={[
                {
                    marginTop: getHP(0.05),
                    // height: getHP(0.7),
                    backgroundColor: colorCode.WHITE,
                    width: '100%',
                    borderBottomWidth: 0.5,
                    borderColor: colorCode.BLACKLOW(20),
                    paddingHorizontal: '5%',
                    paddingVertical: '4%',
                },
            ]}
        >
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={[FDR(), AIC()]}>
                    <FastImageWrapper
                        source={{ uri: item.image }}
                        imageStyle={{
                            height: getHP(0.6),
                            width: getHP(0.6),
                            borderRadius: getHP(0.05),
                        }}
                        resizeMode={'cover'}
                    />
                    <View style={[ML(0.4)]}>
                        <WrappedText text={item.name} textColor={colorCode.BLACKLOW(60)} />
                        <WrappedText text={'0'} textColor={colorCode.BLACK} />
                    </View>
                </View>
                <Icon name={'chevron-right'} size={fs20} color={colorCode.BLACKLOW(60)} />
            </View>
        </WrappedRectangleButton>
    );
};

export default ShowSubCategory;

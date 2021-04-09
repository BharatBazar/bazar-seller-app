import * as React from 'react';
import WrappedRectangleButton from '../../component/WrappedRectangleButton';
import { View } from 'react-native';
import { colorCode } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import WrappedText from '../../component/WrappedText';
import Icon from 'react-native-vector-icons/Feather';
import { fs20 } from '../../../common';

export interface ShowSubCategoryProps {
    item: { name: string; totalItem: number };
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
                    height: getHP(0.7),
                    backgroundColor: colorCode.WHITE,
                    width: '100%',
                    borderBottomWidth: 0.5,
                    borderColor: colorCode.BLACKLOW(20),
                    paddingHorizontal: '5%',
                    paddingVertical: '1%',
                },
            ]}
        >
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <WrappedText text={item.name} textColor={colorCode.BLACKLOW(60)} containerStyle={{ flex: 1 }} />
                    <WrappedText
                        text={item.totalItem.toString()}
                        textColor={colorCode.BLACK}
                        containerStyle={{ flex: 1 }}
                    />
                </View>
                <Icon name={'chevron-right'} size={fs20} color={colorCode.BLACKLOW(60)} />
            </View>
        </WrappedRectangleButton>
    );
};

export default ShowSubCategory;

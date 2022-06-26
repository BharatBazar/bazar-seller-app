import { FontFamily, fs10, fs12, fs16, fs20 } from '@app/common';
import { black10, black20, black30, colorCode } from '@app/common/color';
import { getId } from '@app/common/helper';
import { AIC, BGCOLOR, BR, FDR, JCC } from '@app/common/styles';
import { GENERAL_PADDING } from '@app/common/stylesheet';
import WrappedText from '@app/screens/component/WrappedText';
import * as React from 'react';
import {
    View,
    FlatList,
    NativeSyntheticEvent,
    NativeScrollEvent,
    ViewStyle,
    TextStyle,
    StyleSheet,
} from 'react-native';
import { ItemType } from 'react-native-dropdown-picker';
import GeneralText from '../text/GeneralText';

type ItemType = any;
interface CarouselWithNumberIndicatorProps {
    items: ItemType[];
    renderItem: (item: ItemType) => any;
    itemWidth: number;
    wrapperContainerStyle?: ViewStyle | ViewStyle[];
    flatlistContainerStyle?: ViewStyle | ViewStyle[];
    numberIndicatorWrapperStyle?: ViewStyle | ViewStyle[];
    indicatorTextStyle?: TextStyle | TextStyle[];
}

const CarouselWithNumberIndicator: React.FunctionComponent<CarouselWithNumberIndicatorProps> = ({
    items,
    renderItem,
    itemWidth,
    wrapperContainerStyle,
    flatlistContainerStyle,
    numberIndicatorWrapperStyle,
    indicatorTextStyle,
}) => {
    const [currentIndex, setCurrentIndex] = React.useState(1);

    const onChange = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const active = Math.floor(nativeEvent.contentOffset.x / (itemWidth * 0.5)) + 1;

        if (active !== currentIndex && active != 0) setCurrentIndex(active);
    };

    return (
        <View style={[wrapperContainerStyle]}>
            <View style={[FDR(), JCC('space-between'), AIC()]}>
                <GeneralText text={'Items you are selling'} fontSize={fs16} textAlign="center" fontFamily={'Medium'} />
                <WrappedText
                    text={currentIndex + '/' + items.length}
                    textColor={'#FFF'}
                    fontSize={fs12}
                    fontFamily={FontFamily.Bold}
                    textStyle={indicatorTextStyle}
                    containerStyle={[styles.productCategory, numberIndicatorWrapperStyle]}
                />
            </View>
            <FlatList
                data={items}
                renderItem={({ item }) => renderItem(item)}
                horizontal
                keyExtractor={(item, index) => {
                    let key = getId() + index.toString();

                    return key;
                }}
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onChange}
                contentContainerStyle={[flatlistContainerStyle]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    productCategory: {
        ...BR(100),
        ...AIC(),
        ...JCC(),
        alignSelf: 'flex-start',

        backgroundColor: black30,

        paddingVertical: '2%',

        paddingHorizontal: '5%',
    },
});

export default CarouselWithNumberIndicator;

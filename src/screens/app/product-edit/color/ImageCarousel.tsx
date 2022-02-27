import { FontFamily, fs10, fs14 } from '@app/common';
import { mainColor } from '@app/common/color';
import { getId } from '@app/common/helper';
import { BGCOLOR, MT, PH, PV } from '@app/common/styles';
import WrappedText from '@app/screens/component/WrappedText';
import ButtonFeatherIconRightText from '@app/screens/components/button/ButtonFeatherIconWithRightText';
import * as React from 'react';
import { View, FlatList, Animated, ScrollView, StyleSheet } from 'react-native';

interface ImageCarouselProps {
    screens: string[];
    renderImage: (item: any) => any;
    itemWidth: number;
    onPressDragSort: Function;
    onPressAddMoreImage: Function;
}

const ImageCarousel: React.FunctionComponent<ImageCarouselProps> = ({
    screens,
    renderImage,
    itemWidth,
    onPressDragSort,
    onPressAddMoreImage,
}) => {
    const scrollX = new Animated.Value(0);

    const [currentIndex, setCurrentIndex] = React.useState(1);

    const onChange = ({ nativeEvent }) => {
        const active = Math.floor(nativeEvent.contentOffset.x / itemWidth) + 1;

        if (active !== currentIndex) setCurrentIndex(active);
    };

    const buttonProps = {
        iconColor: '#FFFFFF',
        containerStyle: [BGCOLOR(mainColor), styles.buttonStyle],
        iconSize: fs14,
        textStyle: { marginLeft: 5 },
    };

    return (
        <View style={[MT(0.1)]}>
            <FlatList
                data={screens}
                renderItem={(item) => renderImage(item)}
                horizontal
                keyExtractor={(item, index) => getId() + index.toString()}
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onChange}
                contentContainerStyle={[PH(0.5)]}
            />
            <View style={styles.bottomBarStyle}>
                <ScrollView horizontal={true}>
                    <View style={[BGCOLOR('#00000066'), styles.carouseIndexContainerStyle]}>
                        <WrappedText
                            text={currentIndex + '/' + screens.length}
                            textColor={'#FFF'}
                            fontSize={fs10}
                            fontFamily={FontFamily.Bold}
                        />
                    </View>

                    <ButtonFeatherIconRightText
                        iconName="plus"
                        buttonText={'Add More Images'}
                        onPress={() => {
                            onPressAddMoreImage();
                        }}
                        {...buttonProps}
                    />
                    <ButtonFeatherIconRightText
                        iconName="edit"
                        buttonText={'Reorder Images'}
                        onPress={() => {
                            onPressDragSort();
                        }}
                        {...buttonProps}
                    />
                </ScrollView>
            </View>
        </View>
    );
};

export default ImageCarousel;

const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginLeft: 10,
    },
    carouseIndexContainerStyle: {
        borderRadius: 30,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBarStyle: {
        flexDirection: 'row',
        marginTop: 15,
        marginHorizontal: '5%',
        justifyContent: 'space-around',
        flex: 1,
    },
});

import { FontFamily, fs10, fs14 } from '@app/common';
import { mainColor } from '@app/common/color';
import { BGCOLOR, MT, PH, PV } from '@app/common/styles';
import WrappedText from '@app/screens/component/WrappedText';
import ButtonFeatherIconRightText from '@app/screens/components/button/ButtonFeatherIconWithRightText';
import * as React from 'react';
import { View, FlatList, ListRenderItem, Animated, ScrollView } from 'react-native';

interface ImageCarouselProps {
    screens: string[];
    renderImage: (item: any) => any;
    itemWidth: number;
}

const ImageCarousel: React.FunctionComponent<ImageCarouselProps> = ({ screens, renderImage, itemWidth }) => {
    const scrollX = new Animated.Value(0);
    const position = Animated.divide(scrollX, itemWidth);
    var scrollValue = React.useRef(0);
    var scrolled = React.useRef(0);
    const [currentIndex, setCurrentIndex] = React.useState(1);

    const setSlideTimer = (x) => {
        scrollValue.current = x + itemWidth;
        scrolled.current = parseInt(x) / itemWidth;

        if (scrolled.current == screens.length) {
        } else {
        }
    };

    const onChange = ({ nativeEvent }) => {
        const active = Math.floor(nativeEvent.contentOffset.x / itemWidth) + 1;

        if (active !== currentIndex) setCurrentIndex(active);
    };

    const currentIndexx = position.interpolate({ inputRange: [0, screens.length], outputRange: [0, screens.length] });

    return (
        <View style={[MT(0.1)]}>
            <FlatList
                data={screens}
                renderItem={(item) => renderImage(item)}
                horizontal
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onChange}
                contentContainerStyle={[PH(0.5)]}
            />
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 15,
                    marginHorizontal: '5%',
                    justifyContent: 'space-around',
                    flex: 1,
                }}
            >
                <ScrollView horizontal={true}>
                    <View
                        style={[
                            BGCOLOR('#00000066'),
                            {
                                borderRadius: 30,
                                paddingHorizontal: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                        ]}
                    >
                        <WrappedText
                            text={currentIndex + '/' + screens.length}
                            textColor={'#FFF'}
                            fontSize={fs10}
                            fontFamily={FontFamily.Bold}
                        />
                    </View>

                    <ButtonFeatherIconRightText
                        iconColor="#FFFFFF"
                        containerStyle={[
                            BGCOLOR(mainColor),
                            {
                                borderRadius: 30,
                                paddingHorizontal: 15,
                                paddingVertical: 5,
                                marginLeft: 10,
                            },
                        ]}
                        iconSize={fs14}
                        iconName="plus"
                        textStyle={[{ marginLeft: 5 }]}
                        onPress={() => {}}
                        buttonText={'Add More Images'}
                    />
                    <ButtonFeatherIconRightText
                        iconColor="#FFFFFF"
                        containerStyle={[
                            BGCOLOR(mainColor),
                            {
                                borderRadius: 30,
                                paddingHorizontal: 15,
                                paddingVertical: 5,
                                marginLeft: 10,
                            },
                        ]}
                        iconSize={fs14}
                        iconName="edit"
                        textStyle={[{ marginLeft: 5 }]}
                        onPress={() => {}}
                        buttonText={'Reorder Images'}
                    />
                </ScrollView>
            </View>
        </View>
    );
};

export default ImageCarousel;

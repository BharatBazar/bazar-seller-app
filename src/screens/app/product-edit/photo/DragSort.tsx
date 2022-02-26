import { FontFamily, fs13, fs15, fs20 } from '@app/common';
import { mainColor } from '@app/common/color';
import { getHP, getWP } from '@app/common/dimension';
import { AIC, BGCOLOR, BR, BW, FDR, JCC, MH, ML, MT, PH, provideShadow, PV } from '@app/common/styles';
import { FastImageWrapper } from '@app/screens/component/FastImage';
import WrappedFeatherIcon from '@app/screens/component/WrappedFeatherIcon';
import WrappedRectangleButton from '@app/screens/component/WrappedRectangleButton';
import WrappedText from '@app/screens/component/WrappedText';
import ModalHOC from '@app/screens/hoc/ModalHOC';
import React, { createRef } from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import { AnySizeDragSortableView } from 'react-native-drag-sort';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');
const headerViewHeight = 160;
const bottomViewHeight = 40;

const getW = (index, isWidth) => (isWidth ? (index % 3 === 0 ? width - 40 : (width - 60) / 2) : 80);
// const getW = (index, isWidth) => 120 + Math.floor((Math.random() - 0.5) * 100);
// const getW = (index, isWidth) => 150;

interface DragSortProps {
    data: ImageOrVideo[];
    isVisible: boolean;
    setPopup: Function;
    setPhotosArrayAfterReordering: (data: ImageOrVideo[]) => void;
}

interface DragSortState {
    isVisible: boolean;
    movedKey: string | undefined;
    items: ImageOrVideo[];
}

export default class DragSort extends React.Component<DragSortProps, DragSortState> {
    constructor(props: DragSortProps) {
        super(props);
        this.state = {
            items: props.data,
            movedKey: undefined,
            isVisible: false,
        };

        this.sortableViewRef = createRef();
    }

    onDeleteItem = (item, index) => {
        const items = [...this.state.items];
        items.splice(index, 1);
        this.setState({ items });
    };

    _renderItem = (item: ImageOrVideo, index: number, isMoved: boolean) => {
        const { movedKey } = this.state;
        return (
            <TouchableOpacity
                onPressIn={() => {
                    this.setState({ movedKey: item.modificationDate });
                    this.sortableViewRef.current.startTouch(item, index);
                }}
                onPressOut={() => this.sortableViewRef.current.onPressOut()}
            >
                <View style={[styles.item_wrap, { opacity: movedKey === item.modificationDate && !isMoved ? 1 : 1 }]}>
                    <FastImageWrapper
                        source={{ uri: item.path }}
                        imageStyle={{ height: getWP(2.5), width: getWP(2.5), borderRadius: getHP(0.1) }}
                        resizeMode={'cover'}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    componentDidUpdate(nextProps: DragSortProps) {
        if (nextProps.data.length != this.props.data.length) {
            this.setState({ items: this.props.data });
        }
    }

    render() {
        const { items } = this.state;

        return (
            <View style={[ML(0.1)]}>
                <ModalHOC
                    isVisible={this.props.isVisible}
                    setPopup={() => {
                        this.props.setPopup(false);
                    }}
                >
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                        <View style={[MH(0.5)]}>
                            <WrappedFeatherIcon
                                iconName={'chevron-left'}
                                onPress={() => {
                                    this.props.setPopup(false);
                                }}
                                iconColor={mainColor}
                                containerStyle={[provideShadow(), BGCOLOR('#FFFFFF')]}
                            />
                            <WrappedText
                                text={'Re-order images'}
                                fontFamily={FontFamily.Medium}
                                fontSize={fs20}
                                containerStyle={[MT(0.1)]}
                                textColor={'#1f1f1f'}
                            />
                            <WrappedText
                                text={'Click on image and place it in order you want'}
                                fontFamily={FontFamily.Medium}
                                fontSize={fs13}
                                textColor={'#646464'}
                                containerStyle={[MT(0.05)]}
                            />
                            <WrappedRectangleButton
                                containerStyle={[
                                    FDR(),
                                    JCC(),
                                    AIC(),
                                    BGCOLOR(mainColor),
                                    PH(0.5),
                                    PV(0.1),
                                    BR(0.05),
                                    MT(0.1),
                                ]}
                                onPress={() => {
                                    this.props.setPhotosArrayAfterReordering(items);
                                }}
                            >
                                <WrappedText
                                    text={'Reorder'}
                                    textColor={'#FFFFFF'}
                                    textStyle={{
                                        color: '#FFFFFF',
                                        fontSize: fs15,
                                    }}
                                    containerStyle={[ML(0.2)]}
                                />
                            </WrappedRectangleButton>
                        </View>

                        <AnySizeDragSortableView
                            ref={this.sortableViewRef}
                            dataSource={items}
                            keyExtractor={(item: ImageOrVideo) => item.path}
                            renderItem={this._renderItem}
                            onDataChange={(data, callback) => {
                                this.setState({ items: data }, () => {
                                    callback();
                                });
                            }}
                            // headerViewHeight={headerViewHeight}
                            bottomViewHeight={0}
                            movedWrapStyle={styles.item_moved}
                            onDragEnd={() => {
                                this.setState({
                                    movedKey: undefined,
                                });
                            }}
                        />
                    </SafeAreaView>
                </ModalHOC>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    photoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: mainColor,
        borderRadius: getHP(0.1),
        borderStyle: 'dashed',
        alignSelf: 'flex-start',
        borderWidth: 2,
        paddingHorizontal: '2%',
        paddingVertical: '4%',
        backgroundColor: undefined,
    },
    item_wrap: {
        position: 'relative',
        paddingLeft: 20,
        paddingTop: 20,
    },
    item: {
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f39c12',
        borderRadius: 4,
    },
    item_clear_wrap: {
        position: 'absolute',
        left: 10,
        top: 10,
        width: 20,
        height: 20,
        zIndex: 999,
    },
    item_clear: {
        width: 20,
        height: 20,
    },
    item_moved: {
        opacity: 0.95,
        borderRadius: 4,
        marginTop: getHP(0.1),
        marginLeft: getHP(0.1),
    },
    item_icon_swipe: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 50 * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    item_text_swipe: {
        backgroundColor: '#fff',
        width: 56,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_text: {
        color: '#444',
        fontSize: 20,
        fontWeight: 'bold',
    },
    header: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#2ecc71',
        borderBottomWidth: 2,
    },
    header_title: {
        color: '#333',
        fontSize: 24,
        fontWeight: 'bold',
    },
    aheader: {
        height: headerViewHeight,
        flexDirection: 'row',
        borderBottomColor: '#2ecc71',
        borderBottomWidth: 2,
        zIndex: 100,
        backgroundColor: '#fff',
    },
    aheader_img: {
        width: headerViewHeight * 0.6,
        height: headerViewHeight * 0.6,
        resizeMode: 'cover',
        borderRadius: headerViewHeight * 0.3,
        marginLeft: 16,
        marginTop: 10,
    },
    aheader_context: {
        marginLeft: 8,
        height: headerViewHeight * 0.4,
        marginTop: 10,
    },
    aheader_title: {
        color: '#333',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    aheader_desc: {
        color: '#444',
        fontSize: 16,
        width: width - headerViewHeight * 0.6 - 32,
    },
    abottom: {
        justifyContent: 'center',
        alignItems: 'center',
        height: bottomViewHeight,
        backgroundColor: '#fff',
        zIndex: 100,
        borderTopColor: '#2ecc71',
        borderTopWidth: 2,
    },
    abottom_desc: {
        color: '#333',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

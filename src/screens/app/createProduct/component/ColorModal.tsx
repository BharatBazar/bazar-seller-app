import * as React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { fs18, fs20, fs28, fs40 } from '../../../../common';
import { BGCOLOR, commonStyles } from '../../../../common/styles';
import WrappedText from '../../../component/WrappedText';
import { getHP, getWP } from '../../../../common/dimension';
import { colorCode, mainColor, productColor } from '../../../../common/color';
import WrappedRectangleButton from '../../../component/WrappedRectangleButton';
import WrappedFeatherIcon from '../../../component/WrappedFeatherIcon';
import { Icolor } from '../CreateProduct';
import ModalHOC from '../../../hoc/ModalHOC';
import Color from './Color';

export interface ColorModalProps {
    setPopup: Function;
    isVisible: boolean;
    colors: Icolor[];
    updateColorArray: Function;
}

const ColorModal: React.FC<ColorModalProps> = ({ setPopup, isVisible, colors, updateColorArray }) => {
    return (
        <ModalHOC isVisible={isVisible} setPopup={setPopup}>
            <View
                style={{
                    backgroundColor: colorCode.WHITE,
                    paddingTop: '5%',
                    paddingHorizontal: '5%',
                    borderTopLeftRadius: getHP(0.2),
                    borderTopRightRadius: getHP(0.2),
                }}
            >
                <View style={[commonStyles.fdr, commonStyles.spbtw]}>
                    <View>
                        <WrappedText text={'Choose Color'} fontSize={fs28} />
                        <WrappedText text={'Click on the closest match of the color\navailable of the product.'} />
                    </View>
                    <WrappedFeatherIcon
                        iconSize={fs20}
                        iconName={'x'}
                        containerHeight={fs40}
                        onPress={() => {
                            setPopup(false);
                        }}
                        containerStyle={[commonStyles.shadow, BGCOLOR(colorCode.WHITE)]}
                    />
                </View>
                <FlatList
                    data={colors}
                    style={{ height: getHP(7), marginTop: getHP(0.2) }}
                    numColumns={2}
                    keyExtractor={(item) => item.colorCode}
                    columnWrapperStyle={{ alignItems: 'stretch', justifyContent: 'space-evenly' }}
                    renderItem={({ item, index }) => {
                        return <Color item={item} onPress={() => updateColorArray(index)} />;
                    }}
                />
            </View>
        </ModalHOC>
    );
};

export default ColorModal;

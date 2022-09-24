import * as React from 'react';
import { FlatList, View } from 'react-native';
import { getHP } from '../../../../common/dimension';
import { colorCode } from '../../../../common/color';
import { Icolor } from '../Edit';
import ModalHOC from '../../../hoc/ModalHOC';
import Color from './Color';
import ModalHeader from '../../../component/ModalHeader';
import { IClassifier, IColorApp, IProductColor } from '../../../../server/apis/product/product.interface';

export interface ColorModalProps {
    setPopup: Function;
    isVisible: boolean;
    colors: Icolor[];
    chosenColor: { [key: string]: IColorApp };

    updateColorArray: Function;
}

const ColorModal: React.FC<ColorModalProps> = ({ setPopup, isVisible, colors, updateColorArray, chosenColor }) => {
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
                <ModalHeader
                    heading={'Choose Color'}
                    subHeading={'Click on the closest match of the color\navailable of the product.'}
                    setPopup={() => setPopup(false)}
                />
                <FlatList
                    data={colors}
                    style={{ height: getHP(7), marginTop: getHP(0.2) }}
                    numColumns={2}
                    keyExtractor={(item) => item.colorCode}
                    columnWrapperStyle={{ alignItems: 'stretch', justifyContent: 'space-evenly' }}
                    renderItem={({ item, index }) => {
                        return (
                            <Color
                                item={item}
                                selected={chosenColor[item._id] ? true : false}
                                onPress={() => {
                                    updateColorArray(index);
                                }}
                            />
                        );
                    }}
                />
            </View>
        </ModalHOC>
    );
};

export default ColorModal;

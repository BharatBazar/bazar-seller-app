import * as React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { fs18, fs20, fs28, fs40 } from '../../../common';
import { BGCOLOR, commonStyles, componentProps, PH, PV } from '../../../common/styles';
import StatusBar from '../../component/StatusBar';
import WrappedText from '../../component/WrappedText';
import { getHP, getWP } from '../../../common/dimension';
import { colorCode, mainColor, productColor } from '../../../common/color';
import ColorModal from './component/ColorModal';
import TextButton from '../../component/TextButton';
import { color } from 'react-native-reanimated';
import Color from './component/Color';

export interface CreateProductProps {}

export interface Icolor {
    name: string;
    colorCode: string;
    rgbaColorCode?: string;
    selected: boolean;
}
const CreateProduct: React.FC<CreateProductProps> = () => {
    const [colors, setColors] = React.useState<Icolor[]>([]);
    const [colorPopup, setColorPopup] = React.useState<boolean>(false);

    const updateColorArray = (index: number) => {
        let updatedColors: Icolor[] = [...colors];
        updatedColors[index].selected = !updatedColors[index].selected;
        setColors(updatedColors);
    };
    React.useEffect(() => {
        const data: Icolor[] = productColor.map((item) => {
            item['selected'] = false;
            return item;
        });
        setColors(data);
        return () => {};
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            <View style={[PV(0.2)]}>
                <WrappedText text={'Create Product'} fontSize={fs28} />
                <WrappedText text={'Select colors in which product is available??'} fontSize={fs18} />
                <FlatList
                    data={colors.filter((item, index1) => item.selected)}
                    numColumns={2}
                    renderItem={({ item, index }) => <Color item={item} onPress={() => {}} showCancel={true} />}
                    keyExtractor={(item) => item.colorCode}
                />
                <TextButton
                    text={'Add Color'}
                    textProps={componentProps.buttonTextProps}
                    containerStyle={{
                        ...commonStyles.buttonContainerStyle,
                        marginTop: getHP(0.2),
                        // alignSelf: 'flex-start',
                    }}
                    onPress={() => {
                        setColorPopup(true);
                    }}
                />
            </View>
            <ColorModal
                isVisible={colorPopup}
                setPopup={setColorPopup}
                updateColorArray={updateColorArray}
                colors={colors}
            />
        </View>
    );
};

export default CreateProduct;

const styles = StyleSheet.create({});

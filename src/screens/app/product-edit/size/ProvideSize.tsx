import { fs12 } from '@app/common';
import { mainColor } from '@app/common/color';
import { AIC, colorTransparency, DSP, FDR, MT, MV } from '@app/common/styles';
import { STATUS_BAR_HEIGHT } from '@app/screens/component/StatusBar';
import WrappedText from '@app/screens/component/WrappedText';
import TextRippleButton from '@app/screens/components/button/TextRippleB';
import ModalHOC from '@app/screens/hoc/ModalHOC';
import { IClassifier } from '@app/server/apis/product/product.interface';
import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import WrappedSize from '../../edit/product/component/component/WrappedSize';
import { choosenSize } from '../data-types';

interface ProvideSizeProps {
    isVisible: boolean;
    setPopup: Function;
    avaialbleSize: IClassifier[] | [];
    choosenSize: choosenSize[];
    setChoosenSize: (a: choosenSize) => void;
}

const ProvideSize: React.FunctionComponent<ProvideSizeProps> = ({
    setPopup,
    isVisible,
    avaialbleSize,
    choosenSize,
    setChoosenSize,
}) => {
    const [selectedSize, setSelectedSize] = React.useState<choosenSize[]>([]);

    React.useEffect(() => {
        if (choosenSize && choosenSize.length > 0) {
            setSelectedSize(choosenSize);
        }
        return () => {};
    }, [choosenSize]);

    return (
        <ModalHOC isVisible={isVisible} setPopup={setPopup}>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', padding: DSP }}>
                <TextRippleButton
                    onPress={() => {
                        setPopup(false);
                    }}
                    buttonText="do later"
                    fontSize={fs12}
                    buttonTextColor={mainColor}
                    containerStyle={{ alignSelf: 'flex-end', backgroundColor: mainColor + colorTransparency[30] }}
                />
                <WrappedText text="Select Size" />
                <WrappedText text="Select all the size for this color" />
                <ScrollView horizontal={true} contentContainerStyle={[MV(0.1)]}>
                    {avaialbleSize.map((size: IClassifier, index: number) => (
                        <WrappedSize
                            key={size.name}
                            size={size.name}
                            selected={false}
                            //  selected={selectedSize[size._id] ? true : false}
                            onPress={() => {
                                //   selectSize(size);
                            }}
                        />
                    ))}
                </ScrollView>
            </View>
        </ModalHOC>
    );
};

export default ProvideSize;

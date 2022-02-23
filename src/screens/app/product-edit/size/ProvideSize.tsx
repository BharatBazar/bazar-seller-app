import { fs12 } from '@app/common';
import { mainColor } from '@app/common/color';
import { AIC, colorTransparency, DSP, FDR, JCC, MT, MV } from '@app/common/styles';
import { STATUS_BAR_HEIGHT } from '@app/screens/component/StatusBar';
import WrappedText from '@app/screens/component/WrappedText';
import Border from '@app/screens/components/border/Border';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import TextRippleButton from '@app/screens/components/button/TextRippleB';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import ModalHOC from '@app/screens/hoc/ModalHOC';
import { IClassifier, IFilter } from '@app/server/apis/product/product.interface';
import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import WrappedSize from '../../edit/product/component/component/WrappedSize';
import { choosenSize, provideDefaultSizeState } from '../data-types';
import Size from './Size';

interface ProvideSizeProps {
    isVisible: boolean;
    setPopup: Function;
    avaialbleSize: IFilter[] | [];
    choosenSize: choosenSize[];
    setChoosenSize: (a: choosenSize) => void;
    colorId: string;
    shopId: string;
}

const ProvideSize: React.FunctionComponent<ProvideSizeProps> = ({
    setPopup,
    isVisible,
    avaialbleSize,
    choosenSize,
    setChoosenSize,
    colorId,
    shopId,
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
                <ScrollView>
                    <HeaderWithTitleAndSubHeading
                        borderNeeded={false}
                        heading="Select Size"
                        subHeading="Select all the size for this color"
                    />
                    <View style={[MV(0.3), FDR('row'), JCC('space-between'), { flexWrap: 'wrap' }]}>
                        {avaialbleSize.map((size: IFilter, index: number) => {
                            let selectedIndex = selectedSize.findIndex((item) => item.size._id == size._id);

                            return (
                                <WrappedSize
                                    key={size.name}
                                    size={size.name}
                                    selected={selectedIndex > -1}
                                    onPress={() => {
                                        if (selectedIndex == -1) {
                                            let sizes = [...selectedSize];
                                            sizes.push(provideDefaultSizeState(size, colorId, shopId));
                                            setSelectedSize(sizes);
                                        } else {
                                            let sizes = [...selectedSize];
                                            sizes.splice(selectedIndex, 1);
                                            setSelectedSize(sizes);
                                        }
                                    }}
                                />
                            );
                        })}
                    </View>
                    <Border marginTop={0} />
                    <View style={[MT(0.3)]} />
                    <HeaderWithTitleAndSubHeading
                        borderNeeded={false}
                        heading="Selected Size"
                        subHeading="Provide details related to each size"
                    />

                    {selectedSize.map((item, index) => (
                        <Size key={index} size={item} setSize={() => {}} />
                    ))}
                </ScrollView>
                <Border />

                <RightComponentButtonWithLeftText
                    buttonText={'close'}
                    containerStyle={[MT(0.1)]}
                    onPress={() => {
                        setPopup(false);
                    }}
                />
            </View>
        </ModalHOC>
    );
};

export default ProvideSize;

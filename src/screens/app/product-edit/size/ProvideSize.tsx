import { AlertContext, LoaderContext } from '@app/../App';
import { fs12, fs14 } from '@app/common';
import { colorCode, mainColor } from '@app/common/color';
import { AIC, colorTransparency, DSP, FDR, JCC, MT, MV } from '@app/common/styles';
import Loader from '@app/screens/component/Loader';
import { STATUS_BAR_HEIGHT } from '@app/screens/component/StatusBar';
import WrappedText from '@app/screens/component/WrappedText';
import Border from '@app/screens/components/border/Border';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import TextRippleButton from '@app/screens/components/button/TextRippleB';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import ModalHOC from '@app/screens/hoc/ModalHOC';
import {
    APICreateProductSize,
    APIdeleteProduct,
    APIDeleteProductSize,
    APIUpdateProductSize,
} from '@app/server/apis/product/product.api';
import { IClassifier, IFilter, IRProductSize } from '@app/server/apis/product/product.interface';
import * as React from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
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

    const [loader, setLoader] = React.useState(false);

    React.useEffect(() => {
        if (choosenSize && choosenSize.length > 0) {
            setSelectedSize(choosenSize);
        }

        return () => {};
    }, [choosenSize]);

    const setAlertState = React.useContext(AlertContext);

    console.log('shop id', shopId, colorId);

    const createSize = async (data: Partial<choosenSize>, index: number) => {
        try {
            setLoader(true);
            let sizeData = {
                shopId: shopId,
                parentId: colorId,

                ...data,
            };
            console.log('size', sizeData);
            const id: IRProductSize = await APICreateProductSize(sizeData);
            setLoader(false);
            if (id && id.status == 1) {
                let sizes = [...selectedSize];
                sizes[index] = { ...sizes[index], ...id.payload, size: sizes[index].size };
                setSelectedSize(sizes);
            } else {
                throw new Error(id.message);
            }
        } catch (error) {
            setLoader(false);
            console.log('error=>', error);
            showMessage({ type: 'danger', message: error.message });
            // .errorAlert(error.message, 'Error in generating product id');
        }
    };

    const updateSize = async (data: Partial<choosenSize>, index: number) => {
        try {
            setLoader(true);
            let sizeData = {
                ...data,
            };
            console.log('size', sizeData);
            const id: IRProductSize = await APIUpdateProductSize(sizeData);
            setLoader(false);
            if (id && id.status == 1) {
                return true;
            } else {
                throw new Error(id.message);
            }
        } catch (error) {
            setLoader(false);
            console.log('error=>', error);
            showMessage({ type: 'danger', message: error.message });
            // .errorAlert(error.message, 'Error in generating product id');
        }
    };

    const deleteSize = async (data: Partial<choosenSize>, index: number) => {
        if (data.itemId?.length > 0) {
            try {
                setLoader(true);
                const id: IRProductSize = await APIDeleteProductSize({ _id: data._id, parentId: data.parentId });
                setLoader(false);
                if (id && id.status == 1) {
                    let sizes = [...selectedSize];
                    sizes.splice(index, 1);
                    setSelectedSize(sizes);
                } else {
                    throw new Error(id.message);
                }
            } catch (error) {
                setLoader(false);
                console.log(error);
                showMessage({ type: 'danger', message: error.message });
                // .errorAlert(error.message, 'Error in generating product id');
            }
        } else {
            let sizes = [...selectedSize];
            sizes.splice(index, 1);
            setSelectedSize(sizes);
        }
    };

    const onPressDoLater = () => {
        const totalUncreatedProduct = selectedSize.findIndex((item) => item.itemId.length == 0);
        if (totalUncreatedProduct > -1) {
            setAlertState({
                isVisible: true,
                heading: 'Do Later',
                subHeading: 'Are you sure you dont want to save created sizes and go back?',
                onPressRightButton: () => {
                    setPopup(false);
                },
            });
        } else {
            setPopup(false);
        }
    };

    return (
        <ModalHOC isVisible={isVisible} setPopup={setPopup}>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', padding: DSP }}>
                <TextRippleButton
                    onPress={() => {
                        onPressDoLater();
                    }}
                    buttonText="do later"
                    fontSize={fs14}
                    buttonTextColor={mainColor}
                    containerStyle={{
                        alignSelf: 'flex-end',
                        backgroundColor: colorCode.CHAKRALOW(20),
                        paddingHorizontal: '5%',
                        paddingVertical: '1%',
                        borderRadius: 4,
                    }}
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
                                            deleteSize(selectedSize[selectedIndex], selectedIndex);
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
                        <Size
                            setLoader={setLoader}
                            shopId={shopId}
                            key={index}
                            size={item}
                            setSize={(a: Partial<choosenSize>) => {
                                let sizes = [...selectedSize];
                                sizes[index] = { ...sizes[index], ...a };
                                setSelectedSize(sizes);
                            }}
                            createSize={(data: Partial<choosenSize>) => {
                                createSize(data, index);
                            }}
                            removeSize={() => {
                                deleteSize(item, index);
                            }}
                            updateSize={() => {
                                return updateSize(item, index);
                            }}
                        />
                    ))}
                </ScrollView>
                <Border />

                <RightComponentButtonWithLeftText
                    buttonText={'continue'}
                    containerStyle={[MT(0.1)]}
                    onPress={() => {
                        setPopup(false);
                    }}
                />
            </View>
            {loader && <Loader />}
        </ModalHOC>
    );
};

export default ProvideSize;

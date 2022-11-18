import { StyleSheet, View, FlatList, Alert, } from 'react-native';
import React, { useRef } from 'react';
import { AIC, BGCOLOR, FC, FDR, FLEX, FS, JCC, ML, MT, PH, PT } from '@app/common/styles';
import { GENERAL_PADDING, MLA, PTA, PVA, STATUS_BAR_HEIGHT } from '@app/common/stylesheet';
import ButtonMaterialIcons from '@app/screens/components/button/ButtonMaterialIcons';
import { colorCode, mainColor } from '@app/common/color';
import WrappedText from '@app/screens/component/WrappedText';
import { FontFamily, fs18 } from '@app/common';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import BottomSheet from './BottomSheet';
import ProductRender from './ProductRenders/ProductsRender';
import GeneralText from '@app/screens/components/text/GeneralText';

const CreateBill: React.FC = ({ navigation, route }: any) => {
    const [modalHeight, setModalHeight] = React.useState<number>(500);
    const [openContinueModal, setOpenContinueModal] = React.useState<string>('');
    const [allProducts, setAllProducts]: any = React.useState<[]>([]);
    const [everyItem, setEveryItem]: any = React.useState<[]>([]);
    const [preEditItem, setPreEditItem] = React.useState<[]>([]);

    const refRBSheet: any = useRef();

    var total = 0;

    everyItem.forEach((i: any) => {
        total += i.price * i.quantity;
    });



    return (
        <View style={[FLEX(1), BGCOLOR('#ffffff')]}>
            <View style={[BGCOLOR(mainColor), PVA(), AIC(), PTA(STATUS_BAR_HEIGHT + GENERAL_PADDING), FDR('row')]}>
                {
                    <ButtonMaterialIcons
                        onPress={() => {
                            navigation.goBack();
                        }}
                        iconName={'arrow-back'}
                        containerStyle={[MLA()]}
                        iconColor={colorCode.WHITE}
                    />
                }
                <WrappedText
                    text={'Create Bill'}
                    fontSize={fs18}
                    textColor={'#ffffff'}
                    textAlign="center"
                    containerStyle={[ML(0.2)]}
                    fontFamily={FontFamily.Medium}
                />
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <RightComponentButtonWithLeftText
                    buttonText={'Add Product'}
                    containerStyle={[MT(0.1)]}
                    onPress={() => {
                        setOpenContinueModal('ADD_PRODUCT');
                        refRBSheet.current.open();
                        setModalHeight(500);
                        setAllProducts([])
                    }}
                />
            </View>

            <View style={[FLEX(0.8), PH(0.5)]}>
                {everyItem.length > 0 ? (
                    <>
                        <FlatList
                            data={everyItem}
                            renderItem={({ item }) => (
                                <ProductRender
                                    item={item}
                                    everyItem={everyItem}
                                    refRBSheet={refRBSheet}
                                    setEveryItem={setEveryItem}
                                    setModalHeight={setModalHeight}
                                    setPreEditItem={setPreEditItem}
                                    setOpenContinueModal={setOpenContinueModal}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                        <View style={[FDR(), JCC('space-between')]}>
                            <GeneralText
                                text="Total Price"
                                textStyle={[{ fontFamily: FontFamily.Black }, FC('#252525'), FS(16)]}
                            />
                            <GeneralText
                                text={'₹' + total}
                                textStyle={[{ fontFamily: FontFamily.Black }, FC('#252525'), FS(16)]}
                            />
                        </View>
                    </>
                ) : null}
            </View>
            <View style={[PH(), PT()]}>
                <View style={{ paddingTop: 20 }}>
                    <RightComponentButtonWithLeftText
                        buttonText={'Continue'}
                        containerStyle={[MT(0.1), { borderRadius: 30, width: '70%', alignSelf: 'center' }]}
                        onPress={() => {
                            setOpenContinueModal('CONTINUE');
                            refRBSheet.current.open();
                            setModalHeight(600);
                        }}
                        disabled={everyItem.length > 0 ? false : true}
                    />
                </View>
            </View>

            <BottomSheet
                allProducts={allProducts}
                modalHeight={modalHeight}
                openContinueModal={openContinueModal}
                refRBSheet={refRBSheet}
                setAllProducts={setAllProducts}
                preEditItem={preEditItem}
                setEveryItem={setEveryItem}
                everyItem={everyItem}
                setOpenContinueModal={setOpenContinueModal}
                navigation={navigation}
                route={route}
                total={total}
            />
        </View>
    );
};

export default CreateBill;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    card: {
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    circle: {
        alignSelf: 'center',
        borderRadius: 30,
        padding: 1,
        backgroundColor: mainColor,
    },
});

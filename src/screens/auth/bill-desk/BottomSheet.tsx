import { StyleSheet, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import React, { useEffect } from 'react';
import { IBottomSheet } from './billInterface/Interfaces';
import Continue from './modalsProduct/Continue';
import Add_Product from './modalsProduct/Add_Product';
import Edit from './modalsProduct/Edit';
import PreEdit from './modalsProduct/PreEdit';

const BottomSheet: React.FC<IBottomSheet> = ({
    modalHeight,
    openContinueModal,
    route,
    refRBSheet,
    changeQuantity,
    allProducts,
    everyItem,
    total,
    removeItem,
    price,
    quantity,
    navigation,
    preEditItem,
    errorText,
    setEveryItem,
    setOpenContinueModal,
    setErrorText,
    setAllProducts,
    setQuantity,
    setPrice
}) => {
    useEffect(() => {
        if (route.params.openModal === true) {
            setOpenContinueModal('ADD_PRODUCT');
            refRBSheet.current.open();
        }
    }, []);

    return (
        <View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                dragFromTopOnly={true}
                height={modalHeight}
                animationType={'slide'}
                customStyles={{
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                    container: {
                        backgroundColor: '#fff',
                    },
                }}
            >
                {openContinueModal === 'CONTINUE' ? (
                    <>
                        <Continue
                            setEveryItem={setEveryItem}
                            refRBSheet={refRBSheet}
                            navigation={navigation}
                            everyItem={everyItem}
                            total={total}
                            removeItem={removeItem}
                        />
                    </>
                ) : openContinueModal === 'ADD_PRODUCT' ? (
                    <>
                        <Add_Product
                            refRBSheet={refRBSheet}
                            allProducts={allProducts}
                            quantity={quantity}
                            price={price}
                            changeQuantity={changeQuantity}
                            errorText={errorText}
                            setErrorText={setErrorText}
                            setAllProducts={setAllProducts}
                            setQuantity={setQuantity}
                            everyItem={everyItem}
                            setEveryItem={setEveryItem}
                            setPrice={setPrice}
                        />
                    </>
                ) : openContinueModal === 'EDIT' ? (
                    <>
                        <Edit changeQuantity={changeQuantity} />
                    </>
                ) : openContinueModal === 'PRE-EDIT' ? (
                    <>
                        <PreEdit
                            setEveryItem={setEveryItem}
                            everyItem={everyItem}
                            preEditItem={preEditItem}
                            refRBSheet={refRBSheet}
                        />
                    </>
                ) : null}
            </RBSheet>
        </View>
    );
};

export default BottomSheet;

const styles = StyleSheet.create({});

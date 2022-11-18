import { StyleSheet, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import React, { useEffect } from 'react';
import { IBottomSheet } from './billInterface/Interfaces';
import Continue from './modalsProduct/Continue';
import Add_Product from './modalsProduct/Add_Product';
import Edit from './modalsProduct/Edit';
import PreEdit from './modalsProduct/PreEdit';

const BottomSheet: React.FC<IBottomSheet> = ({
    item,
    modalHeight,
    openContinueModal,
    showEnter,
    setShowEnter,
    setItem,
    id,
    route,
    refRBSheet,
    setId,
    setOpenContinueModal,
    changeQuantity,
    allProducts,
    everyItem,
    total,
    removeItem,
    loading,
    setEveryItem,
    price,
    quantity,
    navigation,
    preEditItem,
    errorText,
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
                            setItem={setItem}
                            setId={setId}
                            setShowEnter={setShowEnter}
                            id={id}
                            showEnter={showEnter}
                            loading={loading}
                            item={item}
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

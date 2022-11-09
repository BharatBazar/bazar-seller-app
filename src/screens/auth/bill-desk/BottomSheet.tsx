import { StyleSheet, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import React, { useEffect } from 'react'
import { IBottomSheet } from './billInterface/Interfaces';
import Continue from './modalsProduct/Continue';
import Add_Product from './modalsProduct/Add_Product';
import Edit from './modalsProduct/Edit';


const BottomSheet: React.FC<IBottomSheet> = ({
    Add,
    item,
    modalHeight,
    openContinueModal,
    showEnter,
    setShowEnter,
    setItem,
    findProduct,
    id,
    route,
    refRBSheet,
    setId,
    setOpenContinueModal,
    ChangeQuantity,
    allProducts,
    everyItem,
    total,
    removeItem,
    loading,
    setEveryItem,
    ChangeSellingPrice,
    price,
    quantity,
    navigation

}) => {

    useEffect(() => {
        if (route.params.openModal === true) {
            setOpenContinueModal("ADD_PRODUCT")
            refRBSheet.current.open();
        }
    }, []);


    return (
        <View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={modalHeight}
                animationType={"slide"}
                customStyles={{
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                    container: {
                        backgroundColor: "#fff"
                    }
                }}
            >
                {openContinueModal === "CONTINUE" ? (

                    <>
                        <Continue
                            setEveryItem={setEveryItem}
                            refRBSheet={refRBSheet}
                            navigation={navigation}
                            everyItem={everyItem}
                            total={total}
                            removeItem={removeItem} />
                    </>

                ) : openContinueModal === "ADD_PRODUCT" ? (

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
                            findProduct={findProduct}
                            allProducts={allProducts}
                            quantity={quantity}
                            price={price}
                            ChangeQuantity={ChangeQuantity}
                            Add={Add}
                            ChangeSellingPrice={ChangeSellingPrice}
                        />
                    </>

                ) : openContinueModal === "EDIT" ? (

                    <>
                        <Edit ChangeQuantity={ChangeQuantity} />
                    </>

                ) : (null)}



            </RBSheet>
        </View>
    )
}

export default BottomSheet

const styles = StyleSheet.create({})
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import { IBottomSheet } from './billInterface/Interfaces';
import Continue from './modalsProduct/Continue';
import Add_Product from './modalsProduct/Add_Product';
import PreEdit from './modalsProduct/PreEdit';

const BottomSheet: React.FC<IBottomSheet> = ({
    modalHeight,
    openContinueModal,
    route,
    refRBSheet,
    allProducts,
    everyItem,
    total,
    navigation,
    preEditItem,
    setEveryItem,
    setOpenContinueModal,
    setAllProducts,
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
                {openContinueModal == 'CONTINUE' ? (
                    <>
                        <Continue
                            setEveryItem={setEveryItem}
                            refRBSheet={refRBSheet}
                            navigation={navigation}
                            everyItem={everyItem}
                            total={total}
                        />
                    </>
                ) : openContinueModal == 'ADD_PRODUCT' ? (
                    <>
                        <Add_Product
                            refRBSheet={refRBSheet}
                            allProducts={allProducts}
                            setAllProducts={setAllProducts}
                            everyItem={everyItem}
                            setEveryItem={setEveryItem}
                        />
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

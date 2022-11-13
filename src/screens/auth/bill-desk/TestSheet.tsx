import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import { BW, FLEX, PH, PV } from '@app/common/styles'
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetScrollView } from "@gorhom/bottom-sheet"

const TestSheet = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 3, 4, 5, 6, 8, 9]
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}

            >
                <BottomSheetScrollView style={styles.contentContainer}>
                    {a.map((e) => {
                        return <Text>{e}</Text>
                    })}
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    )
}

export default TestSheet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});
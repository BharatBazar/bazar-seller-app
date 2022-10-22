import { mainColor } from '@app/common/color';
import { getHP } from '@app/common/dimension';
import { AIC, BGCOLOR, BR, JCC, ML, MT, MV, PH, PV } from '@app/common/styles';
import ModalHeader from '@app/screens/component/ModalHeader';
import NormalButton from '@app/screens/component/NormalButton';
import WrappedCheckBox from '@app/screens/component/WrappedCheckBox';

import { productStatus } from '@app/server/apis/product/product.interface';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { border } from './generalConfig';

interface ImproveListProps {
    notes: [string];
    status: productStatus;
    onPress: Function;
}

const ImproveList: React.FunctionComponent<ImproveListProps> = ({ notes, status, onPress }) => {
    const [isVisible, setVisible] = React.useState(false);

    const [allChecked, setAllChecked] = React.useState<[boolean]>([]);

    React.useEffect(() => {
        if (notes && notes.length > 0) {
            let allChecked: [boolean] = notes.map((item) => false);
            setAllChecked(allChecked);
        }
        return () => {};
    }, [notes]);

    const setValue = (index: number, value: boolean) => {
        let allCheckedI: [boolean] = [...allChecked];
        allCheckedI[index] = value;
        setAllChecked(allCheckedI);
    };

    return (
        <View>
            <NormalButton
                onPress={() => {
                    if (status == productStatus.REJECTED) {
                        setVisible(true);
                    } else onPress();
                }}
                buttonText={
                    status == productStatus.NOTCOMPLETED
                        ? 'Add to inventory'
                        : status == productStatus.INVENTORY
                        ? 'Send for approval'
                        : status == productStatus.REJECTED
                        ? 'Send for approval again'
                        : 'Waiting for approval'
                }
                containerStyle={[PH(0.2), ML(0.1)]}
            />
            <Modal
                useNativeDriver
                backdropTransitionOutTiming={0}
                isVisible={isVisible}
                onBackdropPress={() => {
                    setVisible(false);
                }}
                style={{ justifyContent: 'center', marginHorizontal: '2%' }}
            >
                <View style={styles.container}>
                    <ModalHeader
                        heading={'How to improve'}
                        subHeading={
                            'Please check all the points you have completed\nso that you can request again for approval.'
                        }
                        setPopup={() => {
                            setVisible(false);
                        }}
                    />
                    <View style={[MT(0.1)]} />

                    {allChecked.map((item, index) => (
                        <WrappedCheckBox
                            value={item}
                            setValue={(value) => setValue(index, value)}
                            containerStyle={[MV(0.1), PV(0.1), PH(0.2), BR(0.05), border]}
                            placeholder={notes[index]}
                        />
                    ))}
                    {allChecked.every((item) => item) && (
                        <NormalButton
                            onPress={() => {
                                setVisible(false);
                                onPress();
                            }}
                            buttonText={'Send for approval again'}
                            marginTop={getHP(0.1)}
                        />
                    )}
                </View>
            </Modal>
        </View>
    );
};

export default ImproveList;

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        backgroundColor: '#FFFFFF',
        borderRadius: getHP(0.1),
    },
});

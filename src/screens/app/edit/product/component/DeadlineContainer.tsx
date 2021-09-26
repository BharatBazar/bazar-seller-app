import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { getHP } from '../../../../../common/dimension';
import ModalHeader from '../../../../component/ModalHeader';
import ModalHOC from '../../../../hoc/ModalHOC';
import WrappedText from '../../../../component/WrappedText';
import TextButton from '../../../../component/TextButton';
import { AIC, BGCOLOR, BR, FC, FS, JCC, MT, MV, PV, W } from '../../../../../common/styles';
import { fs15, fs20, fs28 } from '../../../../../common';
import { borderColor, colorCode, errorColor, mainColor } from '../../../../../common/color';
import { componentProps } from '../../../../../common/containerStyles';

export interface DeadlineContainerProps {
    isVisible: boolean;
    setPopup: Function;
    onSubmit: Function;
    initialValue: string;
}

const data = ['1 day', '2 days', '3 days', '4 days', '5 days', '6 days', '1 week', '2 weeks', '3 weeks', '4 weeks'];

const DeadlineContainer: React.FC<DeadlineContainerProps> = ({ isVisible, setPopup, onSubmit, initialValue }) => {
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const parseDays = (data: string) => {
        const [count, denotion] = data.split(' ');
        if (denotion[0] == 'w') {
            return (+count * 7).toString();
        } else {
            return (+count).toString();
        }
    };

    const setValue = () => {
        const a = +initialValue;
        if (a > 6) {
            setSelectedIndex(6 + a / 7);
        } else {
            setSelectedIndex(a - 1);
        }
    };

    React.useEffect(() => {
        setValue();
    }, [initialValue]);

    return (
        <ModalHOC isVisible={isVisible} setPopup={setPopup}>
            <View style={styles.containerStyle}>
                <ModalHeader
                    heading={'Select Deadline'}
                    subHeading={'Select for how much time you want to show \nnew flag on product after release.'}
                    setPopup={() => setPopup(false)}
                />
                {error.length > 0 && <WrappedText text={error} textColor={errorColor} />}
                <WrappedText text={'Up to'} textStyle={[MT(0.3), FS(fs28), FC(colorCode.BLACKLOW(50))]} />

                <View
                    style={{ borderBottomWidth: 2, borderTopWidth: 2, borderColor: borderColor, marginTop: getHP(0.2) }}
                >
                    <FlatList
                        data={data}
                        style={{
                            height: getHP(2),
                            backgroundColor: colorCode.WHITELOW(20),
                        }}
                        // contentContainerStyle={[PV(0.3)]}
                        renderItem={({ item, index }) => (
                            <TextButton
                                text={item}
                                textProps={{
                                    fontSize: fs15,
                                    textColor: index == selectedIndex ? colorCode.WHITE : colorCode.BLACKLOW(30),
                                }}
                                onPress={() => {
                                    setSelectedIndex(index);
                                }}
                                containerStyle={[
                                    BGCOLOR(index == selectedIndex ? mainColor : colorCode.WHITE),
                                    PV(index == selectedIndex ? 0.06 : 0),
                                    BR(index == selectedIndex ? 0.1 : 0),
                                    AIC('center'),
                                    JCC('center'),
                                    MT(0.1),
                                    { zIndex: -1 },
                                ]}
                            />
                        )}
                    />
                </View>
                <WrappedText
                    text={'after product goes live.'}
                    containerStyle={{ alignSelf: 'flex-end' }}
                    textStyle={[MT(0.1), FS(fs20), FC(colorCode.BLACKLOW(50)), { alignSelf: 'flex-end' }]}
                />
                {/* <LineHeading text={'OR'} />
                  <DatePicker date={date} onDateChange={setDate} mode={'date'} style={{ alignSelf: 'center' }} />
                <WrappedText
                    text={'after product release.'}
                    containerStyle={{ alignSelf: 'flex-end' }}
                    textStyle={[MT(0.1), FS(fs20), FC(colorCode.BLACKLOW(50)), { alignSelf: 'flex-end' }]}
                /> */}
                {/* <WrappedText text={date.toLocaleDateString()} /> */}
                <TextButton
                    text={'Submit'}
                    containerStyle={[PV(0.1), BR(0.1), JCC('center'), MT(0.2), { marginBottom: getHP(0.2) }]}
                    textProps={componentProps.buttonTextProps}
                    onPress={() => {
                        if (selectedIndex !== -1) {
                            setError('');
                            onSubmit(
                                'Up to ' + data[selectedIndex] + ' after product goes live.',
                                parseDays(data[selectedIndex]),
                            );
                        } else {
                            setError('Please select option');
                        }
                    }}
                />
            </View>
        </ModalHOC>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#ffffff',
        padding: '5%',
        borderTopLeftRadius: getHP(0.15),
        borderTopRightRadius: getHP(0.15),
    },
});

export default DeadlineContainer;

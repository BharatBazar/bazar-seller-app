import * as React from 'react';
import { View, FlatList } from 'react-native';
import { getHP } from '../../../../common/dimension';
import { AIC, BC, BR, BW, DSP, FDR, FLEX, HP, JCC, MT, MV, PL, PV } from '../../../../common/styles';
import ModalHOC from '../../../hoc/ModalHOC';
import ModalHeader from '../../../component/ModalHeader';
import WrappedText from '../../../component/WrappedText';
import { mainColor } from '../../../../common/color';
import { FontFamily, fs14, fs20 } from '../../../../common';
import Icon from 'react-native-vector-icons/Feather';
import WrappedRectangleButton from '../../../component/WrappedRectangleButton';
import { IClassifier } from '../../../../server/apis/product/product.interface';
import Ripple from 'react-native-material-ripple';
import Loader from '@app/screens/component/Loader';

export const ShowFilter = ({
    selected,
    item,

    onPress,
}: {
    selected?: boolean;
    item: IClassifier;
    onPress: (id: IClassifier) => void;
}) => {
    return (
        <Ripple
            style={[
                BW(1),
                BC('#8A8A8A'),
                PV(0.1),
                PL(0.3),
                BR(0.1),
                FDR(),
                { marginBottom: getHP(0.05), marginTop: DSP },
            ]}
            onPress={() => {
                onPress(item);
            }}
        >
            <View style={[FLEX(1)]}>
                <WrappedText text={item.name} fontSize={fs14} textColor={'#1f1f1f'} fontFamily={FontFamily.Bold} />
                <WrappedText
                    text={item.description}
                    textColor={'#8A8A8A'}
                    containerStyle={[MT(0.05)]}
                    numberOfLines={1}
                />
            </View>
            {selected && (
                <WrappedRectangleButton onPress={() => {}} containerStyle={[FLEX(0.2), AIC(), JCC()]}>
                    <Icon name={'x-circle'} size={fs20} color={mainColor} />
                </WrappedRectangleButton>
            )}
        </Ripple>
    );
};

interface ShowFilterModalProps {
    isVisible: boolean;
    setPopup: Function;
    title: string;
    description: string;
    placeholderText: string;
    data: IClassifier[];
    selectedData: IClassifier[];
    onSelect: (data: IClassifier) => void;
    onDelete: (data: IClassifier) => void;
    loading: boolean;
}

const ShowFilterModal: React.SFC<ShowFilterModalProps> = ({
    isVisible,
    setPopup,
    title,
    description,
    placeholderText,
    data,
    selectedData,
    onSelect,
    onDelete,
    loading,
}) => {
    // console.log(selectedData, 'selectedAta');
    return (
        <ModalHOC isVisible={isVisible} setPopup={setPopup}>
            <View
                style={{
                    backgroundColor: '#FFFFFF',
                    paddingVertical: '5%',
                    paddingHorizontal: '5%',
                    borderTopLeftRadius: getHP(0.2),
                    borderTopRightRadius: getHP(0.2),
                }}
            >
                <ModalHeader heading={title} subHeading={description} setPopup={setPopup} />
                {/* <SearchComponent containerStyle={[MV(0.1), HP(0.5)]} placeholder={placeholderText} /> */}
                <FlatList
                    data={data}
                    style={{ height: getHP(5), marginTop: getHP(0.1) }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        let selected = selectedData.findIndex((value) => value._id == item._id) > -1;
                        return (
                            <ShowFilter
                                selected={selected}
                                item={item}
                                onPress={(data: IClassifier) => {
                                    if (selected) {
                                        onDelete(item);
                                    } else {
                                        onSelect(data);
                                    }
                                }}
                            />
                        );
                    }}
                />
            </View>
            {loading && <Loader />}
        </ModalHOC>
    );
};

export default ShowFilterModal;

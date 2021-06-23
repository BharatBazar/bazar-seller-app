import * as React from 'react';
import { View, TextInput, FlatList } from 'react-native';
import { getHP } from '../../../../../common/dimension';
import {
    AIC,
    BC,
    BGCOLOR,
    BR,
    BW,
    FDR,
    FLEX,
    HP,
    JCC,
    MT,
    MV,
    PH,
    PL,
    provideShadow,
    PV,
} from '../../../../../common/styles';
import ModalHOC from '../../../../hoc/ModalHOC';
import ModalHeader from '../../../../component/ModalHeader';
import WrappedText from '../../../../component/WrappedText';
import { mainColor } from '../../../../../common/color';
import { FontFamily, fs14, fs20 } from '../../../../../common';
import SearchComponent from '../../../search/component/SearchComponent';
import Icon from 'react-native-vector-icons/Feather';
import ProductButton from './ProductButton';

interface ShowFilterModalProps {
    isVisible: boolean;
    setPopup: Function;
}

export const ShowFilter = ({ selected }: { selected?: boolean }) => {
    return (
        <View style={[BW(1), BC('#8A8A8A'), PV(0.1), PL(0.3), BR(0.1), FDR(), { marginBottom: getHP(0.05) }]}>
            <View style={[FLEX(1)]}>
                <WrappedText text={'Damaged'} fontSize={fs14} textColor={'#1f1f1f'} fontFamily={FontFamily.RobotBold} />
                <WrappedText
                    text={'If a jeans has some torn look it belong to damaged category.'}
                    textColor={'#8A8A8A'}
                    containerStyle={[MT(0.05)]}
                    numberOfLines={1}
                />
            </View>
            {selected && (
                <View style={[FLEX(0.2), AIC(), JCC()]}>
                    <Icon name={'x-circle'} size={fs20} color={mainColor} />
                </View>
            )}
        </View>
    );
};

const ShowFilterModal: React.SFC<ShowFilterModalProps> = ({ isVisible, setPopup }) => {
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
                <ModalHeader
                    heading={'Select Category'}
                    subHeading={'Click on the closest match of the pattern\navailable of the product.'}
                    setPopup={setPopup}
                />
                <SearchComponent containerStyle={[MV(0.1), HP(0.5)]} placeholder={'Search for category'} />
                <FlatList
                    data={[1, 2, 3, 4]}
                    style={{ height: getHP(5), marginTop: getHP(0.1) }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return <ShowFilter selected={index % 2 == 0 ? true : false} />;
                    }}
                />
            </View>
        </ModalHOC>
    );
};

export default ShowFilterModal;

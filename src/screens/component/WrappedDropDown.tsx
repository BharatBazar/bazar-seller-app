import DropDownPicker from 'react-native-dropdown-picker';
import * as React from 'react';
import { BW, colorTransparency, H, MT, provideShadow } from '../../common/styles';
import { getHP } from '../../common/dimension';
import { fs12, fs20 } from '../../common';

export interface WrappedDropDownProps {
    data: { label: string; value: string }[];
    selectValue: string;
    setValue: Function;
    callBack?: Function;
    zIndex: number;
    arrowColor?: string;
    header: string;
    placeholder: string;
    zIndexInverse: number;
    provideController?: Function;
}

const dropDownProps = {
    min: 0,
    max: 10,

    style: [
        BW(0),
        {
            borderTopRightRadius: getHP(0.2),
            borderTopLeftRadius: getHP(0.2),
            borderBottomRightRadius: getHP(0.2),
            borderBottomLeftRadius: getHP(0.2),
        },
    ],
    containerStyle: [H(getHP(0.7))],
    itemStyle: {
        justifyContent: 'flex-start',
    },
    dropDownStyle: [
        BW(0),
        provideShadow(6),
        {
            borderTopRightRadius: getHP(0.2),
            borderTopLeftRadius: getHP(0.2),
            borderBottomRightRadius: getHP(0.2),
            borderBottomLeftRadius: getHP(0.2),
        },
    ],
    arrowSize: fs20,
    labelStyle: { letterSpacing: 0.5, color: '#000000' + colorTransparency[80], fontSize: fs12 },
};

const WrappedDropDown: React.SFC<WrappedDropDownProps> = ({
    data,
    selectValue,
    setValue,
    callBack = () => {},
    zIndex,
    arrowColor,
    header,
    placeholder,
    provideController,
    zIndexInverse,
}) => {
    return (
        <DropDownPicker
            controller={provideController}
            items={data}
            noBottomRadius={false}
            noTopRadius={false}
            defaultValue={data.length > 0 && (selectValue || undefined)}
            placeholder={placeholder}
            onChangeItem={(item) => {
                if (item.value != selectValue) {
                    setValue(item.value);

                    callBack();
                }
            }}
            zIndex={zIndex}
            zIndexInverse={zIndexInverse}
            {...dropDownProps}
            arrowColor={arrowColor || '#800947' + colorTransparency[60]}
        />
        // </View>
        // <View style={[{ zIndex: zIndex }]}>
        // <WrappedText
        //     text={header}
        //     fontFamily={FontFamily.RobotoRegular}
        //     textStyle={{ letterSpacing: 0.5 }}
        //     textColor={'#000000' + colorTransparency[70]}
        //     fontSize={fs14}
        // />
    );
};

export default WrappedDropDown;

import DropDownPicker from 'react-native-dropdown-picker';
import * as React from 'react';
import { BGCOLOR, BW, colorTransparency, H, MT, PH, provideShadow } from '../../common/styles';
import { getHP } from '../../common/dimension';
import { fs12, fs14, fs20 } from '../../common';
import { black50 } from '../../common/color';

export interface WrappedDropDownProps {
    open:boolean;
    setOpen:boolean;
    data: { label?: string; value?: string }[];
    selectValue: string;
    
    setValue: Function; //GARY ADD OBJECT
    callBack?: Function;
    zIndex: number;
    arrowColor?: string;
    header?: string;
    placeholder: string;
    zIndexInverse: number;
    provideController?: Function;
    dropDownMaxHeight?: number;
    searchable?: boolean;
}

const dropDownProps = {
    min: 0,
    max: 10,

    style: [
        BW(1),
        {
            borderTopRightRadius: getHP(0.05),
            borderTopLeftRadius: getHP(0.05),
            borderBottomRightRadius: getHP(0.05),
            borderBottomLeftRadius: getHP(0.05),
        },
    ],
    containerStyle: [H(getHP(0.45))],
    itemStyle: {
        justifyContent: 'flex-start',
    },
    dropDownStyle: [
        BW(0),
        provideShadow(6),
        {
            borderTopRightRadius: getHP(0.05),
            borderTopLeftRadius: getHP(0.05),
            borderBottomRightRadius: getHP(0.05),
            borderBottomLeftRadius: getHP(0.05),
        },
    ],
    arrowSize: fs20,
    labelStyle: { letterSpacing: 0.5, color: black50, fontSize: fs12 },
};

const WrappedDropDown: React.SFC<WrappedDropDownProps> = ({
    open,
    setOpen,
    data,
    selectValue,
    setValue,
    callBack = () => {},
    zIndex,

    placeholder,
    provideController,
    zIndexInverse,
    dropDownMaxHeight,
    searchable,
}) => {
    return (
        <DropDownPicker
       
        open={open}
        setOpen={setOpen}
            controller={provideController}
            items={data}
            noBottomRadius={false}
            noTopRadius={false}
            defaultValue={data.length > 0 && (selectValue || undefined)}
            bac
            textStyle={{
                fontSize: 15
              }}
              
            placeholder={placeholder}
            // onChangeItem={(item) => {
            //     if (item.value != selectValue) {
            //         setValue(item.value);

            //         callBack();
            //     }
            // }}
            setValue={setValue}
            
            dropDownMaxHeight={dropDownMaxHeight}
            searchable={searchable}
            showArrow={true}
            zIndex={zIndex}
            zIndexInverse={zIndexInverse}
            {...dropDownProps}
            arrowSize={fs14}
            arrowStyle={{ height: fs14, width: fs14 }}
            arrowColor={black50}
        />
        // </View>
        // <View style={[{ zIndex: zIndex }]}>
        // <WrappedText
        //     text={header}
        //     fontFamily={FontFamily.Regular}
        //     textStyle={{ letterSpacing: 0.5 }}
        //     textColor={'#000000' + colorTransparency[70]}
        //     fontSize={fs14}
        // />
    );
};

export default WrappedDropDown;

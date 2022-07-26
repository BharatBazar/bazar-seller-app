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
    placeholderTextColor:string;
    setValue: any; //GARY ADD OBJECT
    value:any;
    callBack?: Function;
    zIndex: number;
    onSelectItem:Function;
    arrowColor?: string;
    header?: string;
    placeholder: string;
    zIndexInverse: number;
    provideController?: Function;
    dropDownMaxHeight?: number;
    searchable?: boolean;
    borderColor:string;
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
            borderWidth:1,
            borderColor:"#8a8a8a33",
            minHeight:41,
            
            
        }
    ],
    containerStyle: [H(getHP(0.45))],
    itemStyle: {
        justifyContent: 'flex-start',
       

        
    },
    dropDownStyle: [
        BW(1),
        provideShadow(6),
        {
            borderTopRightRadius: getHP(0.05),
            borderTopLeftRadius: getHP(0.05),
            borderBottomRightRadius: getHP(0.05),
            borderBottomLeftRadius: getHP(0.05),
            borderColor:"#8a8a8a33",
            
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
    value,
    borderColor,
    onSelectItem,
    placeholderTextColor,
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
       
       placeholderTextColor={placeholderTextColor}
       
        open={open}
        setOpen={setOpen}
            controller={provideController}
            items={data}
            noBottomRadius={false}
            noTopRadius={false}
            defaultValue={data.length > 0 && (selectValue || undefined)}
            searchContainerStyle={{
                borderBottomColor:borderColor,
                
                
              }}
              
             
              searchTextInputStyle={{
                borderColor: "#8a8a8a33",
              }}
            


              dropDownContainerStyle={{
                borderColor,
               shadowColor:borderColor,
               elevation:7,
               backgroundColor:'#ffffff'
               
                
              }}
            
              
            //   placeholder={value?value:"Area"}
            placeholder={placeholder}
            placeholderStyle={{
                color:black50
            }}

           
            
            autoScroll={true}
            setValue={setValue}
            value={value}
            dropDownMaxHeight={dropDownMaxHeight}
            searchable={searchable}
            showArrow={true}
            zIndex={zIndex}
            zIndexInverse={zIndexInverse}
            {...dropDownProps}
            arrowSize={fs14}
            // maxHeight={200}
            onSelectItem={onSelectItem}
            arrowStyle={{ height: fs14, width: fs14 }}
            arrowColor={black50}
            searchPlaceholder="Search area"
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

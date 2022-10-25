import * as React from 'react';
import { View, TextInput, ViewStyle, Text } from 'react-native';

import { getHP } from '@app/common/dimension';
import { AIC, BC, BR, BW, FDR, MH } from '@app/common/styles';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { fs20, NavigationProps } from '@app/common';
export interface SearchProps {
    containerStyle?: ViewStyle[] | ViewStyle;
    placeholder: string;
    searchText: string;
    setSearchString: Function;
}

const GeneralSearch: React.FC<SearchProps> = ({ containerStyle, placeholder, searchText, setSearchString }) => {
    return (
        <View
            style={[
                FDR(),
                AIC(),
                BW(1),
                BC('#e5e5e5'),
                BR(0.08),
                {
                    height: getHP(0.6),
                },
                containerStyle,
            ]}
        >
            <MaterialIcon name={'search'} size={fs20} color={'#8A8A8A'} onPress={() => {}} style={[MH(0.2)]} />
            <TextInput
                style={[
                    {
                        paddingLeft: '1%',
                        flex: 1,
                    },
                ]}
                value={searchText}
                onChangeText={(searchedText: string) => setSearchString(searchedText)}
                placeholder={placeholder}
                placeholderTextColor={'#8A8A8A'}
            />
            {searchText.length > 0 && (
                <Icon
                    name={'x-circle'}
                    size={fs20}
                    color={'#8A8A8A'}
                    onPress={() => {
                        setSearchString('');
                    }}
                    style={[MH(0.2)]}
                />
            )}
           
        </View>
    );
};

export default GeneralSearch;

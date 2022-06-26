import * as React from 'react';
import { Component } from 'react';
import { View, TextInput, ViewStyle } from 'react-native';
import { colorCode } from '../../../../common/color';
import { getHP } from '../../../../common/dimension';
import { AIC, BC, BR, BW, FDR, MH } from '../../../../common/styles';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { fs20, NavigationProps } from '../../../../common';
export interface SearchComponentProps {
    containerStyle?: ViewStyle[] | ViewStyle;
    placeholder: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ containerStyle, placeholder }) => {
    const [searchedText, setSearchText] = React.useState('');
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
                value={searchedText}
                onChangeText={(searchedText: string) => setSearchText(searchedText)}
                placeholder={placeholder}
                placeholderTextColor={'#8A8A8A'}
            />
            {searchedText.length > 0 && (
                <Icon
                    name={'x-circle'}
                    size={fs20}
                    color={'#8A8A8A'}
                    onPress={() => {
                        setSearchText('');
                    }}
                    style={[MH(0.2)]}
                />
            )}
        </View>
    );
};

export default SearchComponent;

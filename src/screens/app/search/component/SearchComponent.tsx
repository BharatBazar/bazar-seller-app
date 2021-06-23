import * as React from 'react';
import { Component } from 'react';
import { View, TextInput, ViewStyle } from 'react-native';
import { colorCode } from '../../../../common/color';
import { getHP } from '../../../../common/dimension';
import { AIC, BC, BR, BW, FDR } from '../../../../common/styles';
import Icon from 'react-native-vector-icons/Feather';
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
            />
            {searchedText.length > 0 && (
                <Icon
                    name={'x'}
                    size={fs20}
                    color={colorCode.BLACKLOW(50)}
                    onPress={() => {
                        setSearchText('');
                    }}
                />
            )}
        </View>
    );
};

export default SearchComponent;

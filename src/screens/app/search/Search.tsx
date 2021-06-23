import * as React from 'react';
import { Component } from 'react';
import { View, TextInput } from 'react-native';
import { colorCode } from '../../../common/color';
import { getHP } from '../../../common/dimension';
import { AIC, FDR } from '../../../common/styles';
import StatusBar from '../../component/StatusBar';
import Icon from 'react-native-vector-icons/Feather';
import { fs20, NavigationProps } from '../../../common';
import SearchComponent from './component/SearchComponent';

interface ProductSearchProps extends NavigationProps {}

interface ProductSearchState {
    searchedText: string;
}
export default class ProdcutSearch extends Component<ProductSearchProps, ProductSearchState> {
    constructor(props: ProductSearchProps) {
        super(props);
        this.state = {
            searchedText: '',
        };
    }

    render() {
        const { searchedText } = this.state;
        return (
            <View>
                <StatusBar statusBarColor={colorCode.CHAKRALOW(70)} />
                <View
                    style={[
                        FDR(),
                        AIC(),
                        {
                            backgroundColor: colorCode.WHITE,
                            borderBottomWidth: 0.5,
                            borderColor: colorCode.BLACKLOW(20),
                            paddingHorizontal: '3%',
                        },
                    ]}
                >
                    <Icon
                        name={'chevron-left'}
                        size={fs20}
                        color={colorCode.CHAKRALOW(70)}
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <SearchComponent />
                </View>
            </View>
        );
    }
}

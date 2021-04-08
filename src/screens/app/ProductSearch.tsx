import * as React from 'react';
import { Component } from 'react';
import { View, TextInput } from 'react-native';
import { colorCode } from '../../common/color';
import { getHP } from '../../common/dimension';
import { commonStyles } from '../../common/styles';
import StatusBar, { STATUS_BAR_HEIGHT } from '../component/StatusBar';
import Icon from 'react-native-vector-icons/Feather';
import { fs20 } from '../../common';

export default class ProdcutSearch extends Component {
    render() {
        return (
            <View>
                <StatusBar statusBarColor={colorCode.CHAKRALOW(70)} />
                <View
                    style={[
                        commonStyles.fdr,
                        commonStyles.aic,
                        {
                            backgroundColor: colorCode.WHITE,
                            borderBottomWidth: 0.5,
                            borderColor: colorCode.BLACKLOW(20),
                            paddingLeft: '3%',
                        },
                    ]}
                >
                    <Icon
                        name={'chevron-left'}
                        size={fs20}
                        color={colorCode.CHAKRALOW(70)}
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <TextInput
                        style={[
                            {
                                height: getHP(0.6),
                                paddingLeft: '3%',
                                flex: 1,
                            },
                        ]}
                        placeholder={'Search for any item by their product number'}
                    />
                </View>
            </View>
        );
    }
}

import * as React from 'react';
import { View } from 'react-native';
import { AIC, FDR, FLEX, JCC, MT } from '../../../../../../common/styles';
import WrappedText from '../../../../../component/WrappedText';
import { headerTitleI } from '../../Color';

export interface TableHeaderProps {
    headerTitle: headerTitleI[];
    flex: number[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headerTitle, flex }) => {
    return (
        <View style={[FDR(), AIC(), FLEX(1), MT(0.2)]}>
            {headerTitle.map((item, index) => (
                <WrappedText text={item.title} containerStyle={[FLEX(flex[index]), AIC(), JCC()]} fontWeight={'600'} />
            ))}
        </View>
    );
};

export default TableHeader;

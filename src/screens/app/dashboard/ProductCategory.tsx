import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationProps } from '../../../common';
import { NavigationKey } from '../../../labels';
import StatusBar, { STATUS_BAR_HEIGHT } from '../../component/StatusBar';
import Header from './component/Header';
import { AIC, BGCOLOR, DSP, FLEX, JCC, PA } from '../../../common/styles';

import WrappedText from '../../component/WrappedText';
import { ShowSubCategory } from '../component';
import { product } from '../../../server/apis/catalogue/catalogue.interface';

export interface CategoryProps extends NavigationProps {
    route: {
        params: {
            categoryName: string;
            current: product[];
            forward: product[][];
        };
    };
}

const Category: React.FC<CategoryProps> = ({
    navigation,
    route: {
        params: { categoryName, current, forward },
    },
}) => {
    const [showLoader, setLoader] = React.useState<boolean>(true);
    const [showFooter, setShowFooter] = React.useState<boolean>(false);

    return (
        <View style={[FLEX(1), BGCOLOR('#F4F4F4'), PA(DSP), { paddingTop: STATUS_BAR_HEIGHT + DSP }]}>
            <StatusBar />
            <Header headerTitle={categoryName} onPressBack={() => navigation.goBack()} />
            {current && current.length == 0 ? (
                <View style={[FLEX(1), AIC(), JCC()]}>
                    <WrappedText text={'No result found :)'} />
                </View>
            ) : (
                <FlatList
                    data={current}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item, index }) => (
                        <ShowSubCategory
                            item={item}
                            onPress={() => {
                                if (item.subCategoryExist) {
                                    navigation.navigate(NavigationKey.PRODUCTCATEGORY, {
                                        current: forward[index],
                                        categoryName: item.name,
                                        forward: [[]],
                                    });
                                } else {
                                    navigation.push(NavigationKey.PRODUCT, { itemType: item.name });
                                }
                            }}
                        />
                    )}
                />
            )}
            {/* {showLoader && <Loader />} */}
        </View>
    );
};

export default Category;

// import React from 'react';
// import { useEffect } from 'react';
// import { FlatList, View, Text, StyleSheet } from 'react-native';
// import { fs20, NavigationProps } from '../../../common';
// import { colorCode } from '../../../common/color';
// import { BGCOLOR, PH } from '../../../common/styles';
// import { NavigationKey } from '../../../labels';
// import { getShop } from '../../../server/apis/shop/shop.api';
// import { IRGetShop, Shop } from '../../../server/apis/shop/shop.interface';
// import { DataHandling } from '../../../server/DataHandlingHOC';
// import WrappedText from '../../component/WrappedText';
// import { ShowProductDetails, ShowSubCategory } from '../component';
// import TreeView from 'react-native-final-tree-view';
// import Accordion from 'react-native-collapsible/Accordion';

// function getIndicator(isExpanded, hasChildrenNodes) {
//     if (!hasChildrenNodes) {
//         return '-';
//     } else if (isExpanded) {
//         return '\\/';
//     } else {
//         return '>';
//     }
// }

// export interface HomeProps extends NavigationProps {}

// const SECTIONS = [
//     {
//         title: 'First',
//         content: 'Lorem ipsum...',
//     },
//     {
//         title: 'Second',
//         content: 'Lorem ipsum...',
//     },
// ];

// const family = [
//     {
//         id: 'Grandparent',
//         name: 'Grandpa',
//         age: 78,
//         children: [
//             {
//                 id: 'Me',
//                 name: 'Me',
//                 age: 30,
//                 children: [
//                     {
//                         id: 'Erick',
//                         name: 'Erick',
//                         age: 10,
//                     },
//                     {
//                         id: 'Rose',
//                         name: 'Rose',
//                         age: 12,
//                     },
//                 ],
//             },
//         ],
//     },
// ];

// const Home: React.SFC<HomeProps> = ({ navigation }) => {
//     const [shop, setShop] = React.useState<Partial<Shop>>({});
//     const [activeSections, setSection] = React.useState([]);
//     const getShopDetails = async () => {
//         let response: IRGetShop = await new DataHandling('').fetchData(getShop, {
//             _id: '60694f8582ea63ad28a2ec1f',
//         });
//         if (response.status == 1) {
//             setShop(response.payload);
//         } else {
//         }
//     };

//     useEffect(() => {
//         getShopDetails();
//         return () => {};
//     }, []);

//     const _renderSectionTitle = (section) => {
//         return (
//             <View style={styles.content}>
//                 <Text>{section.content}</Text>
//             </View>
//         );
//     };

//     const _renderHeader = (section) => {
//         return (
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>{section.title}</Text>
//             </View>
//         );
//     };

//     const _renderContent = (section) => {
//         return (
//             <View style={styles.content}>
//                 <Text>{section.content}</Text>
//             </View>
//         );
//     };

//     const _updateSections = (activeSections) => {
//         setSection({ activeSections });
//     };

//     return (
//         <View>
//             <View style={[BGCOLOR(colorCode.WHITE), { borderBottomWidth: 1, borderColor: colorCode.BLACKLOW(10) }]}>
//                 <WrappedText
//                     text={'Product you sell in bharat bazar from your dukan'}
//                     containerStyle={{ margin: '5%' }}
//                     textColor={colorCode.BLACKLOW(40)}
//                 />
//             </View>
//             <FlatList
//                 data={shop.category}
//                 keyExtractor={(item) => item.name}
//                 renderItem={({ item, index }) => (
//                     <ShowSubCategory
//                         item={item}
//                         onPress={() => {
//                             if (item.subCategoryExist) {
//                                 navigation.navigate(NavigationKey.PRODUCTCATEGORY, {
//                                     current: shop.subCategory[index],
//                                     categoryName: item.name,
//                                     forward: shop.subCategory1[index],
//                                 });
//                             } else {
//                                 navigation.navigate(NavigationKey.PRODUCT, { itemType: item.name });
//                             }
//                         }}
//                     />
//                 )}
//             />
//             <Accordion
//                 sections={SECTIONS}
//                 activeSections={activeSections}
//                 renderSectionTitle={_renderSectionTitle}
//                 renderHeader={_renderHeader}
//                 renderContent={_renderContent}
//                 onChange={_updateSections}
//             />
//         </View>
//     );
// };

// export default Home;

// const styles = StyleSheet.create({});
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { NavigationProps } from '../../../common';
import { colorCode } from '../../../common/color';
import { BGCOLOR } from '../../../common/styles';
import { NavigationKey } from '../../../labels';
import { getShop } from '../../../server/apis/shop/shop.api';
import { IRGetShop, Shop } from '../../../server/apis/shop/shop.interface';
import { DataHandling } from '../../../server/DataHandlingHOC';
import WrappedText from '../../component/WrappedText';
import { ShowSubCategory } from '../component';
import { product } from '../../../server/apis/productCatalogue/productCatalogue.interface';
import AccordionHOC from './component/Accordion';

const SELECTORS = [
    {
        title: 'First',
        value: 0,
    },
    {
        title: 'Third',
        value: 2,
    },
    {
        title: 'None',
    },
];

interface Props extends NavigationProps {}

interface ISection {
    category: product;
    subCategory: product[];
    subCategory1: product[][];
}
interface State {
    activeSections: number[];
    shop: Partial<Shop>;
    section: ISection[];
}

export default class Home extends DataHandling<Props, State> {
    state = {
        activeSections: [],
        shop: {},
        section: [],
    };

    setSections = (sections: number[]) => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };

    getShopDetails = async () => {
        let response: IRGetShop = await this.fetchData(getShop, {
            _id: '60694f8582ea63ad28a2ec1f',
        });
        if (response.status == 1) {
            this.setState({
                shop: response.payload,
                section: response.payload.category.map((cat, index) => {
                    return {
                        category: cat,
                        subCategory: response.payload.subCategory[index],
                        subCategory1: response.payload.subCategory1[index],
                    };
                }),
            });
        } else {
        }
    };

    componentDidMount() {
        this.getShopDetails();
    }

    renderHeader = (section: ISection, _, isActive: boolean) => {
        return (
            <Animatable.View
                duration={400}
                // style={[styles.header, isActive ? styles.active : styles.inactive]}
                // transition="backgroundColor"
            >
                <ShowSubCategory
                    item={section.category}
                    touch={!section.category.subCategoryExist}
                    onPress={() => {
                        this.props.navigation.navigate(NavigationKey.PRODUCT, {
                            itemType: section.category.name,
                            shopId: '60694f8582ea63ad28a2ec1f',
                            category: section.category.name,
                            subCategory: '',
                            subCategory1: '',
                        });
                    }}
                    active={isActive}
                />
            </Animatable.View>
        );
    };

    renderContent = (section: ISection, _: any, isActive: boolean) => {
        return (
            <Animatable.View
                duration={400}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                {section.category.subCategoryExist ? (
                    <AccordionHOC
                        category={section.category.name}
                        section={section.subCategory.map((cat, index) => {
                            return {
                                category: cat,
                                subCategory: section.subCategory1[index] || [],
                                subCategory1: [],
                            };
                        })}
                        shopId={'60694f8582ea63ad28a2ec1f'}
                        navigation={this.props.navigation}
                    />
                ) : (
                    <View />
                )}
            </Animatable.View>
        );
    };

    render() {
        const { activeSections } = this.state;

        return (
            <View style={styles.container}>
                <View style={[BGCOLOR(colorCode.WHITE), { borderBottomWidth: 1, borderColor: colorCode.BLACKLOW(10) }]}>
                    <WrappedText
                        text={'Product you sell in bharat bazar from your dukan'}
                        containerStyle={{ margin: '5%' }}
                        textColor={colorCode.BLACKLOW(40)}
                    />
                </View>
                <ScrollView>
                    <Accordion
                        activeSections={activeSections}
                        sections={this.state.section}
                        touchableComponent={TouchableOpacity}
                        renderHeader={this.renderHeader}
                        renderContent={this.renderContent}
                        duration={400}
                        onChange={this.setSections}
                        renderAsFlatList={false}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        //paddingTop: Stat,
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
    },
    header: {
        backgroundColor: '#FFFFFF',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: '#FFFFFF',
    },
    inactive: {
        backgroundColor: '#FFFFFF',
    },
    selectors: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',

        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
});

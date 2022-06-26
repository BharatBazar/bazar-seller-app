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
import WrappedText from '../../component/WrappedText';
import { ShowSubCategory } from '../component';
import { product } from '../../../server/apis/catalogue/catalogue.interface';
import AccordionHOC from './component/Accordion';
import { IshopMember } from '../../../server/apis/shopMember/shopMember.interface';
import { Storage, StorageItemKeys } from '../../../storage';

interface Props extends NavigationProps {}

interface ISection {
    category: product;
    subCategory: product[];
    subCategory1: product[][];
}
interface State {
    activeSections: number[];
    shop: Shop;
    section: ISection[];
    userDetails: Partial<IshopMember>;
}

export default class Home extends React.Component<Props, State> {
    state = {
        activeSections: [],
        shop: {},
        userDetails: {},
        section: [],
    };

    setSections = (sections: number[]) => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };

    getShopDetails = async () => {
        try {
            const userDetails: IshopMember = await Storage.getItem(StorageItemKeys.userDetail);

            this.setState({ userDetails });
            console.log('userDetails provided', userDetails);
            let response: IRGetShop = await getShop({
                _id: userDetails.shop,
            });
            if (response.status == 1) {
                console.log('Resposen', response);
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
        } catch (error) {
            console.log('error =>', error);
        }
    };

    componentDidMount() {
        this.getShopDetails();
    }

    renderHeader = (section: ISection, _, isActive: boolean) => {
        console.log('render Header', this.state.userDetails);
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
                            shopId: this.state.userDetails.shop,
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
                        shopId={this.state.shop}
                        navigation={this.props.navigation}
                    />
                ) : (
                    <View />
                )}
            </Animatable.View>
        );
    };

    render() {
        const { activeSections, userDetails } = this.state;

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

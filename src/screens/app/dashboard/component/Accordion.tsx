import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { fs14, fs16, fs22, NavigationProps } from '../../../../common';
import { NavigationKey } from '../../../../labels';
import { ShowSubCategory } from '../../component';
import { product } from '../../../../server/apis/catalogue/catalogue.interface';
import { getHP, getWP } from '../../../../common/dimension';

interface ISection {
    category: product;
    subCategory: product[];
    subCategory1: product[][];
}

interface Props extends NavigationProps {
    section: ISection[];
    shopId: string;
    category: string;
}

interface State {
    activeSections: number[];
}

export default class AccordionHOC extends React.Component<Props, State> {
    state = {
        activeSections: [],
        shop: {},
    };

    setSections = (sections: number[]) => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };

    renderHeader = (section: ISection, _, isActive: boolean) => {
        return (
            <Animatable.View
                duration={400}
                style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <ShowSubCategory
                    item={section.category}
                    touch={!section.category.subCategoryExist}
                    onPress={() => {
                        this.props.navigation.navigate(NavigationKey.PRODUCT, {
                            itemType: section.category.name,
                            shopId: this.props.shopId,
                            category: this.props.category,
                            subCategory: section.category.name,
                            subCategory1: '',
                        });
                    }}
                    active={isActive}
                    paddingVertical={'1%'}
                    height={getHP(0.5)}
                    //paddingLeft={getWP(1)}
                />
            </Animatable.View>
        );
    };

    renderContent = (section: ISection, _: any, isActive: boolean) => {
        return (
            <Animatable.View
                duration={400}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                //transition="backgroundColor"

                animation={'slideInLeft'}
            >
                {section.category.subCategoryExist ? (
                    section.subCategory.map((item, index) => (
                        <Animatable.View key={item.name + index.toString()}>
                            <ShowSubCategory
                                item={item}
                                touch={!item.subCategoryExist}
                                onPress={() => {
                                    this.props.navigation.navigate(NavigationKey.PRODUCT, {
                                        itemType: section.category.name + ' ' + item.name + ' ',
                                        shopId: this.props.shopId,
                                        category: this.props.category,
                                        subCategory: section.category.name,
                                        subCategory1: item.name,
                                    });
                                }}
                                active={false}
                                paddingVertical={'1%'}
                                height={getHP(0.3)}
                            />
                        </Animatable.View>
                    ))
                ) : (
                    <View />
                )}
            </Animatable.View>
        );
    };

    render() {
        const { activeSections } = this.state;

        return (
            <Accordion
                activeSections={activeSections}
                sections={this.props.section}
                touchableComponent={TouchableOpacity}
                renderHeader={this.renderHeader}
                renderContent={this.renderContent}
                duration={400}
                onChange={this.setSections}
                renderAsFlatList={false}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        //paddingTop: Stat,
    },
    title: {
        textAlign: 'center',
        fontSize: fs22,
        fontWeight: '300',
    },
    header: {
        backgroundColor: '#FFFFFF',
    },
    headerText: {
        textAlign: 'center',
        fontSize: fs16,
        fontWeight: '500',
    },
    content: {
        marginLeft: getWP(0.5),
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgb(255,255,255)',
    },
    inactive: {
        backgroundColor: '#FFFFFF',
    },
    selectors: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#FFFFFF',
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: fs14,
        fontWeight: '500',
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',

        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: fs16,
        marginRight: 8,
    },
});

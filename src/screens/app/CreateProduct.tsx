import * as React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { fs18, fs28 } from '../../common';
import { BGCOLOR, commonStyles, PH, PV } from '../../common/styles';
import StatusBar from '../component/StatusBar';
import WrappedText from '../component/WrappedText';
import { ColorPicker, TriangleColorPicker } from 'react-native-color-picker';
import Slider from '@react-native-community/slider';
import { getHP, getWP } from '../../common/dimension';
import { colorCode, productColor } from '../../common/color';
import Accordion from 'react-native-collapsible/Accordion';
import WrappedRectangleButton from '../component/WrappedRectangleButton';

export interface CreateProductProps {}

const CreateProduct: React.FC<CreateProductProps> = () => {
    const [activeSections, setActiveSection] = React.useState([]);
    const renderSectionTitle = (section) => {
        return (
            <View style={styles.content}>
                <Text>{section.content}</Text>
            </View>
        );
    };

    const renderHeader = (section) => {
        return (
            <View style={[{ height: getHP(0.4), backgroundColor: colorCode.WHITE }, commonStyles.alcjcc]}>
                <Text style={styles.headerText}>{'Click on closest color in which item is available..'}</Text>
            </View>
        );
    };

    const renderContent = (section) => {
        return (
            <FlatList
                data={productColor}
                renderItem={({ item }) => {
                    return (
                        <WrappedRectangleButton onPress={() => {}}>
                            <View style={[commonStyles.fdr, BGCOLOR(colorCode.WHITE)]}>
                                <View
                                    style={{
                                        backgroundColor: item.colorCode,
                                        height: getHP(0.7),
                                        width: getHP(0.7),
                                    }}
                                />
                                <WrappedText text={item.name.trim()} containerStyle={{ marginLeft: getWP(0.5) }} />
                            </View>
                        </WrappedRectangleButton>
                    );
                }}
            />
        );
    };

    const updateSections = (activeSections) => {
        setActiveSection(activeSections);
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            <View style={[PH(0.2), PV(0.2)]}>
                <WrappedText text={'Create Product'} fontSize={fs28} />
                <WrappedText text={'Select colors in which product is available??'} fontSize={fs18} />
                <Accordion
                    duration={300}
                    sections={['section1', 'section2']}
                    activeSections={activeSections}
                    renderSectionTitle={renderSectionTitle}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    onChange={updateSections}
                />
            </View>
        </View>
    );
};

export default CreateProduct;

const styles = StyleSheet.create({});

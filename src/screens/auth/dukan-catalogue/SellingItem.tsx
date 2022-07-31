import { AlertContext } from '@app/../App';
import { fs10, fs14 } from '@app/common';
import { black100, black40, borderColor, mainColor } from '@app/common/color';
import { getHP } from '@app/common/dimension';
import { AIC, AS, BGCOLOR, FDR, FLEX, JCC, provideShadow } from '@app/common/styles';
import { GENERAL_PADDING, MBA, MTA, PBA, PVA } from '@app/common/stylesheet';
import { IdefaultAlertState } from '@app/hooks/useAlert';
import { FastImageWrapper } from '@app/screens/component/FastImage';
import ButtonIconsIcons from '@app/screens/components/button/ButtonMaterialIcons';
import GeneralText from '@app/screens/components/text/GeneralText';
import { IProductCatalogue } from '@app/server/apis/catalogue/catalogue.interface';

import * as React from 'react';
import { Button, View, ViewStyle } from 'react-native';
import { productData } from '../ProductDetails';

interface SellingItemProps {
    item: IProductCatalogue;
    onPressDelete: Function;
    containerStyle: ViewStyle | ViewStyle[];
}

const SellingItem: React.FunctionComponent<SellingItemProps> = ({ item, containerStyle, onPressDelete }) => {
    const setAlertState: (data: IdefaultAlertState) => void = React.useContext(AlertContext);

    return (
        <View
            style={[
                PVA(),
                MBA(),
                MTA(GENERAL_PADDING),
                provideShadow(2),
                BGCOLOR('#FFF'),
                { borderRightWidth: 0.8, borderColor: borderColor },
                containerStyle,
            ]}
        >
            <View style={[FDR(), JCC('space-between'), AIC()]}>
                <View style={[FLEX(1)]}>
                    <GeneralText text={'Under'} fontSize={fs10} fontFamily={'Medium'} textColor={mainColor} />
                    <GeneralText
                        text={item.path.reduce((a, b) => a + (a.length > 0 ? ' --> ' : '') + b.name, '')}
                        fontSize={fs10}
                        fontFamily={'Medium'}
                        textColor={mainColor}
                    />
                </View>
                <ButtonIconsIcons
                    iconName="delete"
                    containerStyle={[AS('flex-end'), BGCOLOR('#FFFFFF'), provideShadow(2)]}
                    onPress={() => {
                        setAlertState({
                            isVisible: true,
                            heading: 'Remove ' + item.name + ' catalogue',
                            subHeading:
                                'Are you sure you want to remove ' +
                                item.name +
                                ' catalogue' +
                                ' from your shop it will delete all your saved data under this catalogue?',
                            onPressRightButton: () => {
                                onPressDelete(item._id);
                            },
                        });
                    }}
                />
            </View>
            <FastImageWrapper
                source={{ uri: item.image }}
                imageStyle={{
                    height: getHP(0.5),
                    width: getHP(0.5),
                    marginTop: GENERAL_PADDING,
                    alignSelf: 'center',
                }}
                resizeMode={'cover'}
            />
            <View style={[MTA(), AIC()]}>
                <GeneralText
                    text={item.name}
                    textColor={black100}
                    fontSize={fs14}
                    fontFamily={'Medium'}
                    textAlign="center"
                />
                <GeneralText
                    text={item.description}
                    textColor={black40}
                    fontSize={fs10}
                    textStyle={{ marginTop: getHP(0.05) }}
                    textAlign="center"
                />
            </View>
        </View>
    );
};

export default SellingItem;

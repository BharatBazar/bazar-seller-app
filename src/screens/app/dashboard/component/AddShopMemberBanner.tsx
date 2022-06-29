import { AlertContext } from '@app/../App';
import { FontFamily, fs12, fs14, fs16, fs18, fs20 } from '@app/common';
import { colorCode, subHeadingColor } from '@app/common/color';
import { getHP } from '@app/common/dimension';
import { AIC, AS, BBR, BGCOLOR, BR, FDR, FLEX, HP, JCC, MR, PA, provideShadow } from '@app/common/styles';
import { BRA, BTRA, GENERAL_BORDER_RADIUS, GENERAL_HEIGHT, MHA, MRA, MTA, PHA, PVA } from '@app/common/stylesheet';
import ButtonIconsIcons from '@app/screens/components/button/ButtonMaterialIcons';
import ButtonPair from '@app/screens/components/button/ButtonPair';
import RightComponentButtonWithLeftText from '@app/screens/components/button/RightComponentButtonWithLeftText';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import GeneralText from '@app/screens/components/text/GeneralText';
import ModalHOC from '@app/screens/hoc/ModalHOC';
import * as React from 'react';
import { Modal, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface AddShopMemberBannerProps {
    heading: string;
    subHeading: string;
    rightButtonText: string;
    leftButtonText: string;
    onPressRightButton: Function;
    onPressLeftButton: Function;
}

const AddShopMemberBanner: React.FunctionComponent<AddShopMemberBannerProps> = ({
    heading,
    subHeading,
    leftButtonText,
    rightButtonText,
    onPressLeftButton,
    onPressRightButton,
}) => {
    const setAlertState = React.useContext(AlertContext);
    const [isVisible, setIsVisible] = React.useState(false);
    return (
        <View style={[BGCOLOR('#fff'), PHA(), PVA(), provideShadow(2), MTA()]}>
            <GeneralText text={subHeading} fontSize={fs12} fontFamily={'Medium'} textColor={subHeadingColor} />

            <View style={[FDR(), AIC(), MTA()]}>
                {/* <View>
                    <GeneralText text={subHeading} fontSize={fs12} textColor={subHeadingColor} />
                </View> */}
                <RightComponentButtonWithLeftText
                    onPress={() => {
                        onPressLeftButton();
                    }}
                    buttonText={rightButtonText || 'Confirm'}
                    borderWidth={0}
                    fontSize={fs12}
                    rightComponent={() => (
                        <Icon name={'arrow-forward'} size={fs16} style={{ height: fs16, width: fs16 }} color={'#FFF'} />
                    )}
                    containerStyle={[FLEX(1), MRA(), JCC('space-between')]}
                />
                <ButtonIconsIcons
                    containerStyle={[BGCOLOR('#FFF'), provideShadow(2), AS('flex-end'), BRA(5)]}
                    iconName="close"
                    containerHeight={GENERAL_HEIGHT * 0.8}
                    onPress={() => {
                        setIsVisible(true);
                    }}
                />
            </View>
            <View style={[FDR()]}></View>
            <ModalHOC
                modalStyle={{ margin: 0, justifyContent: 'center' }}
                isVisible={isVisible}
                setPopup={() => {
                    setIsVisible(false);
                }}
            >
                <View
                    style={[
                        BTRA(),
                        {
                            borderBottomRightRadius: GENERAL_BORDER_RADIUS,
                            borderBottomLeftRadius: GENERAL_BORDER_RADIUS,
                        },
                        BGCOLOR('#FFFFFF'),
                        MHA(),
                        PVA(),
                        PHA(),
                    ]}
                >
                    <View style={[FDR(), JCC('space-between')]}>
                        <GeneralText text={'Remove Banner'} fontSize={fs18} fontFamily={'Medium'} />
                        <ButtonIconsIcons
                            containerStyle={[AS('flex-end'), BGCOLOR('#FFF'), provideShadow(2)]}
                            iconName="close"
                            containerHeight={GENERAL_HEIGHT * 0.5}
                            onPress={() => {
                                setIsVisible(false);
                            }}
                        />
                    </View>
                    <GeneralText
                        text={'You can always add member from settings.'}
                        fontSize={fs12}
                        fontFamily={'Medium'}
                        textColor={subHeadingColor}
                    />
                    <View style={[BRA(), HP(2), BGCOLOR(colorCode.BLACKLOW(10)), MTA()]}></View>
                    <RightComponentButtonWithLeftText
                        onPress={() => {
                            onPressRightButton();
                            setIsVisible(false);
                        }}
                        buttonText={'Continue'}
                        borderWidth={0}
                        containerStyle={[MTA()]}
                    />
                </View>
            </ModalHOC>
            {/* <ButtonPair
                alignMent={'column'}
                leftButtonText={leftButtonText || 'Hide'}
                rightButtonText={rightButtonText || ''}
                onPressLeftButton={() => {
                    onPressLeftButton && onPressLeftButton();
                }}
                fontSize={fs12}
                onPressRightButton={() => {
                    onPressRightButton && onPressRightButton();
                }}
            /> */}
        </View>
    );
};

export default AddShopMemberBanner;

//  <View>
//      <GeneralButtonWithNormalBg
//          backgroundColor={'#FFF'}
//          buttonText={'Add worker to your dukan'}
//          onPress={() => {
//              props.navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
//                  screen: NavigationKey.EDITDUKANMEMBER,
//                  update: true,
//                  message: 'Worker is someone whom you hire to help in handling of your shop',
//                  role: shopMemberRole.worker,
//                  addMember: (data: IshopMember) => {
//                      setShop((shop) => {
//                          shop.coOwner?.push(data);
//                          return { ...shop };
//                      });
//                  },
//                  shop: shop._id,
//                  paddingTop: true,
//              });
//          }}
//          textColor={subHeadingColor}
//          textStyle={{ fontSize: fs14 }}
//          leftToTextComponent={() => <Icon name={'person-add'} size={getHP(0.3)} color={subHeadingColor} />}
//          rightToTextComponent={() => <Icon name={'chevron-right'} size={getHP(0.3)} color={subHeadingColor} />}
//          containerStyle={[PVA(), MTA(), FDR(), provideShadow(3), JCC('space-between'), PHA()]}
//      />
//  </View>;

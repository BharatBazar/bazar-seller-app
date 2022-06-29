import { fs12, fs14 } from '@app/common';
import { BGCOLOR, FDR, FLEX, provideShadow } from '@app/common/styles';
import { BRA, MHA, MTA, PHA, PVA } from '@app/common/stylesheet';
import ButtonPair from '@app/screens/components/button/ButtonPair';
import HeaderWithTitleAndSubHeading from '@app/screens/components/header/HeaderWithTitleAndSubHeading';
import * as React from 'react';
import { View } from 'react-native';

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
    return (
        <View style={[BGCOLOR('#fff'), PHA(), PVA(), provideShadow(2), MTA()]}>
            <View style={[FDR()]}>
                <HeaderWithTitleAndSubHeading
                    headerStyle={{ fontSize: fs14 }}
                    heading={heading}
                    subHeading={subHeading}
                />
            </View>
            <ButtonPair
                leftButtonText={leftButtonText || 'Hide'}
                rightButtonText={rightButtonText || ''}
                onPressLeftButton={() => {
                    onPressLeftButton && onPressLeftButton();
                }}
                fontSize={fs12}
                onPressRightButton={() => {
                    onPressRightButton && onPressRightButton();
                }}
            />
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

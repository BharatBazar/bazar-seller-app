import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NavigationProps } from '../../../common';
import { colorCode } from '../../../common/color';
import { BGCOLOR, FLEX } from '../../../common/styles';
import { getShop } from '../../../server/apis/shop/shop.api';
import { IRGetShop, IShop } from '../../../server/apis/shop/shop.interface';
import WrappedText from '../../component/WrappedText';
import { ShowSubCategory } from '../component';
import { IshopMember, shopMemberRole } from '../../../server/apis/shopMember/shopMember.interface';
import { Storage, StorageItemKeys } from '../../../storage';
import Loader from '@app/screens/component/Loader';
import { getHP } from '@app/common/dimension';
import { NavigationKey } from '@app/labels';
import AddShopMemberBanner from './component/AddShopMemberBanner';

interface Props extends NavigationProps {}

const Home = (props: Props) => {
    const [shop, setShop] = React.useState<Partial<IShop>>({});
    const [userDetails, setUserDetails] = React.useState<Partial<IshopMember>>({});
    const [loader, setLoader] = React.useState(false);

    const getShopDetails = async () => {
        try {
            setLoader(true);
            const userDetails: IshopMember = await Storage.getItem(StorageItemKeys.userDetail);

            setUserDetails(userDetails);
            console.log('userDetails provided', userDetails);
            let response: IRGetShop = await getShop({
                _id: userDetails.shop,
            });
            console.log('response', response);
            setLoader(false);
            if (response.status == 1) {
                setShop(response.payload);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            setLoader(false);
            console.log('error =>', error);
        }
    };

    React.useEffect(() => {
        getShopDetails();
    }, []);

    return (
        <View style={styles.container}>
            <View style={[BGCOLOR(colorCode.WHITE), { borderBottomWidth: 1, borderColor: colorCode.BLACKLOW(10) }]}>
                <WrappedText
                    text={'Product you sell in bharat bazar from your dukan'}
                    containerStyle={{ margin: '5%' }}
                    textColor={colorCode.BLACKLOW(40)}
                />
            </View>
            <ScrollView style={[FLEX(1)]} contentContainerStyle={[FLEX(1)]}>
                {shop?.sellingItems?.map((item, index) => (
                    <ShowSubCategory
                        key={index}
                        item={item}
                        touch={true}
                        onPress={() => {
                            console.log(shop.filterProvidedForSellingItems, item.totalFilterAdded);
                            // if (item.totalFilterAdded != shop.filterProvidedForSellingItems[item._id]) {
                            //     props.navigation.navigate(NavigationKey.SELECTFILTER, {
                            //         item: item,
                            //     });
                            // } else {
                            //     props.navigation.navigate(NavigationKey.PRODUCT, { item: item });
                            // }
                        }}
                        active={true}
                        paddingVertical={'1%'}
                        height={getHP(0.5)}
                        //paddingLeft={getWP(1)}
                    />
                ))}

                {userDetails.role == shopMemberRole.Owner && shop.coOwner?.length == 0 && (
                    <AddShopMemberBanner
                        heading={'Add co-owner account'}
                        subHeading={'You have not added any co-owner account in your shop'}
                        leftButtonText={'Will do it later from settings'}
                        rightButtonText={'Add Co-owner Account'}
                        onPressLeftButton={() => {
                            props.navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                screen: NavigationKey.EDITDUKANMEMBER,
                                update: true,
                                message:
                                    'Co-owner is partner in your shop and shares same responsibility as you like your brother, son,daughter etc.',
                                role: shopMemberRole.coOwner,
                                addMember: (data: IshopMember) => {
                                    setShop((shop) => {
                                        shop.coOwner?.push(data);
                                        return { ...shop };
                                    });
                                },
                                shop: shop._id,
                                paddingTop: true,
                            });
                        }}
                        onPressRightButton={() => {
                            {
                            }
                        }}
                    />
                )}
                {userDetails.role == shopMemberRole.Owner && shop.worker?.length == 0 && (
                    <AddShopMemberBanner
                        heading={'Add worker account'}
                        subHeading={'You have not added any worker account in your shop'}
                        leftButtonText={'Will do it later from settings'}
                        rightButtonText={'Add Worker Account'}
                        onPressLeftButton={() => {
                            props.navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                screen: NavigationKey.EDITDUKANMEMBER,
                                update: true,
                                message: 'Worker is someone whom you hire to help in handling of your shop',
                                role: shopMemberRole.worker,
                                addMember: (data: IshopMember) => {
                                    setShop((shop) => {
                                        shop.coOwner?.push(data);
                                        return { ...shop };
                                    });
                                },
                                shop: shop._id,
                                paddingTop: true,
                            });
                        }}
                        onPressRightButton={() => {
                            {
                            }
                        }}
                    />
                )}
            </ScrollView>
            {loader && <Loader />}
        </View>
    );
};

export default Home;

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

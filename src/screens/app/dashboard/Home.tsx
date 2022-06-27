import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { fs12, fs14, NavigationProps } from '../../../common';
import { black100, colorCode, mainColor, subHeadingColor } from '../../../common/color';
import { BGCOLOR, FDR, FLEX, JCC, provideShadow, PV } from '../../../common/styles';
import { getShop } from '../../../server/apis/shop/shop.api';
import { IRGetShop, IShop, Shop } from '../../../server/apis/shop/shop.interface';
import WrappedText from '../../component/WrappedText';
import { ShowSubCategory } from '../component';
import { IshopMember, shopMemberRole } from '../../../server/apis/shopMember/shopMember.interface';
import { Storage, StorageItemKeys } from '../../../storage';
import Loader from '@app/screens/component/Loader';
import { getHP } from '@app/common/dimension';
import GeneralButtonWithNormalBg from '@app/screens/components/button/ButtonWithBgAndRightIconOrComponent';
import { BRA, MHA, MTA, MVA, PHA, PVA } from '@app/common/stylesheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationKey } from '@app/labels';

interface Props extends NavigationProps {}

interface ISection {
    sellingItems: {
        name: string;
        image: string;
        path: { name: string }[];
    };
}
interface State {
    activeSections: number[];
    shop: Shop;
    section: ISection[];
    userDetails: Partial<IshopMember>;
}

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
                            console.log('propes', this.props);
                            // props.navigation.navigate(NavigationKey.PRODUCT, {
                            //     itemType: section.category.name,
                            //     shopId: this.props.shopId,
                            //     category: this.props.category,
                            //     subCategory: section.category.name,
                            //     subCategory1: '',
                            // });
                        }}
                        active={true}
                        paddingVertical={'1%'}
                        height={getHP(0.5)}
                        //paddingLeft={getWP(1)}
                    />
                ))}

                {userDetails.role == shopMemberRole.Owner && shop.membersDetailSkipped && (
                    <WrappedText
                        text={'Product you sell in bharat bazar from your dukan'}
                        containerStyle={{ margin: '5%' }}
                        textColor={colorCode.BLACKLOW(40)}
                    />
                )}
                {userDetails.role == shopMemberRole.Owner && shop.coOwner?.length == 0 && (
                    <WrappedText
                        text={'Added co-owner to your shop'}
                        containerStyle={{ margin: '5%' }}
                        textColor={colorCode.BLACKLOW(40)}
                    />
                )}
                {userDetails.role == shopMemberRole.Owner && shop.worker?.length == 0 && (
                    <View>
                        <GeneralButtonWithNormalBg
                            backgroundColor={'#FFF'}
                            buttonText={'Add worker to your dukan'}
                            onPress={() => {
                                props.navigation.navigate(NavigationKey.AUTHNAVIGATOR, {
                                    screen: NavigationKey.EDITDUKANMEMBER,
                                    update: true,
                                    message: 'Worker is someone whom you hire to help in handling of your shop',
                                    role: shopMemberRole.worker,
                                    addMember: (data: IshopMember) => {
                                        console.log('add coowner', data);
                                        //  setWorker((wosetWorker) => {
                                        //      wosetWorker.push(data);
                                        //      return [...wosetWorker];
                                        //  });
                                    },
                                    shop: shop._id,
                                    paddingTop: true,
                                });
                            }}
                            textColor={subHeadingColor}
                            textStyle={{ fontSize: fs14 }}
                            leftToTextComponent={() => (
                                <Icon name={'person-add'} size={getHP(0.3)} color={subHeadingColor} />
                            )}
                            rightToTextComponent={() => (
                                <Icon name={'chevron-right'} size={getHP(0.3)} color={subHeadingColor} />
                            )}
                            containerStyle={[PVA(), MTA(), FDR(), provideShadow(3), JCC('space-between'), PHA()]}
                        />
                    </View>
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

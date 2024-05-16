import * as React from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Box, CheckCircleIcon, Divider, FlatList, HStack, HamburgerIcon, Image, Input, Menu, Pressable, Stack, VStack } from 'native-base';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { ArrowForward, BackIcon, NotificationIcon } from '../../global-components/icons';
import { CheckFullIcon, CheckOutlineIcon } from '../../delivery/components/icons';
import { PopularCat } from '../../home/components/product-card';
import { FetchBargains } from '../../home/models/model-index';
import { NumberWithCommas, formatDate } from '../../utils';
import { fetchUserData } from '../models/user-model';
import { User } from '../../redux';

const Colors = Color()
function Account({ navigation, appState, disp_Login }) {

    const User = appState.User;
    const Products = appState.products;
    const ViewedProducts = appState.viewedProduct;
    const [loading, setloading] = React.useState(false)
    const [data, setdata] = React.useState([])


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {

        });

        return unsubscribe;

    }, [navigation]);



    React.useEffect(() => {
        fetchData()
    }, [])


    //  fetch products uploaded by this vendor
    function fetchData() {
        setloading(true)
        FetchBargains({
            UUID: User.UUID
        })
            .then(response => {
                // console.log(response)
                setloading(false)
                setdata(response.data)
            })
            .catch(error => {

            })
    }

    // refresh user data
    function getUserData() {
        setloading(true)
        fetchData()
        fetchUserData({ UUID: User.UUID })
            .then(response => {
                setloading(false)
                disp_Login({
                    ...User,
                    ...response.data
                })
            })
            .catch(error => {

            })
    }


    function renderItem() {

        return <Box bg={Colors.primary}
            style={{
                width: "95%",
                marginLeft: "2.5%",
                // height: 110,
                borderRadius: 10,
                padding: 15,
                marginTop: 20


            }} >
            <VStack>
                <HStack style={{
                    justifyContent: "space-between",
                    // alignItems: "center", 
                }} >
                    <BoldText1 size={17} text={User && User.brandName ? User.brandName : User.name} color="#fff" />
                    {/* <BoldText size={12} text="65219074" color="#000" /> */}
                </HStack>
                <HStack style={{
                    justifyContent: "space-between",
                    marginTop: 60
                    // alignItems: "center"
                }} >
                    <BoldText1 size={17} text={`NGN ${NumberWithCommas(User && User.wallet)}.00`} color="#fff" />

                    {User.account_type != "Buyer Account" &&
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("withdrawal")
                        }} >
                            <HStack alignItems='space-between' >
                                <CheckCircleIcon color="white" marginRight={1} />
                                <BoldText size={15} text="Withdraw" color="#fff" />
                            </HStack>
                        </TouchableOpacity>
                    }
                </HStack>
            </VStack>

        </Box>
    }


    return User == null ? navigation.replace("Login") : (
        // return (
        <>

            {console.log(User)}
            <SafeAreaView style={styles.container} >


                <ScrollView  >

                    <HStack style={{
                        padding: 10,
                        marginTop: 20,
                        justifyContent: "space-between",
                        // alignItems: "center"
                    }}>
                        <HStack style={{
                            justifyContent: "center",
                            alignItems: "center"
                        }} >
                            <Image
                                style={{
                                    height: 45,
                                    width: 45,
                                    borderRadius: 45,
                                    objectFit: "cover",
                                }}
                                source={{
                                    uri: `https://cdn-icons-png.flaticon.com/512/4018/4018431.png`
                                }} alt="Alternate Text" size="xl" />

                            <VStack style={{ marginLeft: 10 }}>
                                <BoldText1 size={13} text={User && User.name} color="#000" />
                                <BoldText size={12} text={User && User.UUID.slice(-10)} color="#000" />
                            </VStack>

                        </HStack>
                        {/* <HStack style={{ width: 90, justifyContent: "space-between" }}>
                            <Menu style={{ marginRight: 20 }} w="190" trigger={triggerProps => {
                                return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                                    <HamburgerIcon />
                                </Pressable>;
                            }}>
                                <Menu.Item>Arial</Menu.Item>
                                <Menu.Item>Nunito Sans</Menu.Item>
                                <Menu.Item>Roboto</Menu.Item>
                                <Menu.Item>Poppins</Menu.Item>
                            </Menu>
                            <NotificationIcon navigation={navigation} />
                        </HStack> */}
                    </HStack>


                    <FlatList
                        data={[{}]}
                        renderItem={renderItem}
                        // keyExtractor={(item) => item.id.toString()}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={getUserData} />
                        }
                    />




                    {/* 
                    <HStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 20,
                        backgroundColor: Colors.lightgray,
                        padding: 15,
                        borderRadius: 8
                    }}>
                        <BoldText size={14} text="Paypal" color="#000" />
                        <CheckFullIcon status />
                    </HStack> */}



                    {User.account_type == "Vendor Account" &&
                        <>
                            {Products.length > 0 && <>
                                <HStack style={{
                                    justifyContent: "space-between",
                                    alignItems: "space between",
                                    marginHorizontal: 15,
                                    marginTop: 30,
                                    borderRadius: 8
                                }}>
                                    <BoldText1 size={14} text="Uploaded Products" color="#000" />
                                    {/* <BoldText size={12} text="See more" color={Colors.primary} /> */}
                                </HStack>

                                <ScrollView horizontal style={{ height: 100, marginTop: 10 }} >
                                    {
                                        Products.map((item, index) => {
                                            return <PopularCat navigation={navigation} item={item} Key={index} />
                                        })
                                    }
                                </ScrollView>
                            </>
                            }

                            <CustomButtons width="95%" height={50} text="Upload a product" primary Style={{
                                marginBottom: 30,
                                marginLeft: "2.5%",
                                marginTop: 20
                            }} callBack={() => {
                                navigation.navigate("Upload-product")
                            }} />
                        </>
                    }


                    {User.account_type == "Buyer Account" &&
                        <>

                            {/* <CustomButtons width="95%" height={50} text="Top up" Style={{
                                marginBottom: 30,
                                marginLeft: "2.5%",
                                marginTop: 30
                            }} callBack={() => {
                                navigation.navigate("Top up")
                            }} />

                            {ViewedProducts.length > 0 && <>
                                <HStack style={{
                                    justifyContent: "space-between",
                                    alignItems: "space between",
                                    marginHorizontal: 15,
                                    marginTop: 30,
                                    borderRadius: 8
                                }}>
                                    <BoldText1 size={14} text="Recently viewed" color="#000" />
                                    <BoldText size={12} text="See more" color={Colors.primary} />
                                </HStack>

                                <ScrollView horizontal style={{ height: 100, marginTop: 10 }} >
                                    {
                                        Products.map((item, index) => {
                                            return <PopularCat navigation={navigation} item={item} Key={index} />
                                        })
                                    }
                                </ScrollView>
                            </>} */}

                        </>
                    }



                    {data.length > 0 &&
                        <VStack alignItems="flex-start" style={{ marginHorizontal: 10, marginVertical: 30 }}>
                            <BoldText1 size={15} text="My Orders " color="#000" />
                        </VStack>
                    }



                    {loading == false &&
                        <>
                            {
                                data && data.map((item, index) => {
                                    return <TouchableOpacity onPress={() => {
                                        if (item.deal == true) {
                                            navigation.navigate("View-order", { Data: item })
                                        } else if (item.deal == false) {
                                            navigation.navigate("View-order", { Data: item })
                                        } else {
                                            navigation.push("Negotiate", { NewData: item })
                                        }
                                        console.log(item.deal)
                                    }} style={{
                                        justifyContent: "space-between",
                                        alignItems: "space between",
                                        marginHorizontal: 15,
                                        marginVertical: 7,
                                        display: "flex",
                                        flexDirection: "row",
                                        backgroundColor: item.deal == true ? "#F8F8F8" : Colors.accent,
                                        padding: 10,
                                        borderRadius: 5
                                    }}>
                                        <VStack>
                                            <BoldText1 size={14} text={item.product_objects.name} color="#000" />
                                            <BoldText text={formatDate(item.created_at)} color="#000" />
                                        </VStack>
                                        <VStack alignItems="flex-end" >
                                            <BoldText1 size={14} text={`₦${item.product_objects.price}`} color="#000" />
                                            {/* <BoldText text="Processed" size={12} color={Colors.primary} /> */}
                                            <HStack>
                                                {/* <CheckOutlineIcon /> */}
                                                {item.deal == true && <CheckFullIcon status />}
                                            </HStack>
                                        </VStack>
                                    </TouchableOpacity>
                                })
                            }

                            {data.length > 5 &&
                                <Stack style={{
                                    // backgroundColor: "#F8F8F8",
                                    marginBottom: 20
                                }} >


                                    <HStack style={{
                                        justifyContent: "flex-end",
                                        margin: 10,
                                        alignItems: "center"
                                    }} >
                                        <TouchableOpacity
                                            onPress={() => { navigation.navigate("Orders") }}
                                            style={{ display: "flex", flexDirection: "row", alignItems: "center" }} >
                                            <BoldText size={14} text="See More" color={Colors.primary} />
                                            <ArrowForward color={Colors.primary} />
                                        </TouchableOpacity>
                                    </HStack>
                                </Stack>
                            }

                        </>
                    }




                </ScrollView>




                {data.length < 1 && <Stack style={{
                    width: "100%",
                    // backgroundColor: "green",
                    // display: "flex",
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "center"
                }} >
                    {!loading ? <BoldText1 text="No record found" color="grey" /> :
                        <ActivityIndicator />}
                </Stack>}

            </SafeAreaView >

        </>
    );
}


const mapStateToProps = (state) => {
    return {
        appState: state.user,
    };
};


const mapDispatchToProps = (dispatch, encoded) => {
    return {
        disp_Login: (payload) => dispatch(User(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Account);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 10,
        backgroundColor: "#fff"
    },
    top: {
        marginBottom: "auto",
        marginTop: 20
    },
})


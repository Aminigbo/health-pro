import * as React from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, TouchableOpacity, Vibration, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Box, Divider, FlatList, HStack, HamburgerIcon, Image, Input, Menu, Pressable, Stack, VStack } from 'native-base';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { ArrowForward, BackIcon, NotificationIcon } from '../../global-components/icons';
import { CheckFullIcon, CheckOutlineIcon } from '../../delivery/components/icons';
import { PopularCat } from '../../home/components/product-card';
import { FetchBargains } from '../models/model-index';
import { NumberWithCommas, formatDate } from '../../utils';

const Colors = Color()
function Notifications({ navigation, appState }) {

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


    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.push("Negotiate", { NewData: item })  
            }}
            style={{
                justifyContent: "space-between",
                alignItems: "space between",
                marginHorizontal: 10,
                display: "flex",
                flexDirection: "row",
                backgroundColor: item.deal ? "#fff" : "#F7FBF2",
                padding: 15,
                borderRadius: 4,
                marginVertical: 4
            }}>
            <VStack>
                <BoldText size={12} text={item.type} color="#000" />
                <BoldText1 size={13} text={item.product_objects.name} color="#000" />
                <BoldText size={12} text={formatDate(item.created_at)} color="#000" />
            </VStack>
            <VStack alignItems="flex-end" >
                <BoldText1 size={12} text={`₦${NumberWithCommas(item.price)}`} color="#000" />
                {item.deal == null ? <BoldText text="No deal" color="orange" /> :
                    item.deal == false ? <BoldText text="closed" color="crimson" /> :
                        <BoldText text="Deal" color={Colors.primary}  />}
            </VStack>
        </TouchableOpacity>
    );

    function fetchData() {
        setloading(true)
        FetchBargains({
            UUID: User.UUID
        })
            .then(response => {
                console.log(response)
                setloading(false)
                setdata(response.data)
            })
            .catch(error => {

            })
    }

    return User == null ? navigation.replace("Login") : (
        // return (
        <>
            <SafeAreaView style={styles.container} >

                <HStack style={{
                    // padding: 10,
                    marginTop: 20,
                    // justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableOpacity style={{
                        justifyContent: "center",
                        alignItems: "flex-start",
                        height: 50,
                        // width:50,
                        // backgroundColor: "red"
                    }} >
                        <BackIcon navigation={navigation} />
                    </TouchableOpacity>
                    <BoldText1 style={{ marginLeft: 20 }} size={13} text="Notification" color="#000" />
                </HStack>



                {loading != true &&
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={fetchData} />
                        }
                    />
                }


                {loading == true &&
                    <Stack style={{ flex: 1, height: 300, justifyContent: "center", alignItems: "item" }} >
                        <ActivityIndicator />
                    </Stack>
                }
            </SafeAreaView >
            {loading != true && data.length < 1 &&
                <Stack style={{ flex: 1, alignItems: "center", backgroundColor:"#fff" }} >
                    <BoldText text="There are no notifications" color="grey" />
                </Stack>
            }



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
        // disp_Login: (payload) => dispatch(User(payload)), 
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Notifications);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 10,
        backgroundColor: "#fff",
        paddingBottom: 30
    },
    top: {
        marginBottom: "auto",
        marginTop: 20
    },
})


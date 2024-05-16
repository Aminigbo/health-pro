import * as React from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, TouchableOpacity, View, } from 'react-native';
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
import { FetchBargains } from '../../home/models/model-index';
import { formatDate } from '../../utils';

const Colors = Color()
function Orders({ navigation, appState }) {

    const User = appState.User;
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

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            if (item.deal == true) {
                navigation.navigate("View-order", { Data: item })
            }else  if (item.deal == false) {
                navigation.navigate("View-order", { Data: item })
            }else{
                navigation.push("Negotiate", { NewData: item })
            }
            console.log(item.deal) 
        }} style={{
            justifyContent: "space-between",
            alignItems: "space between",
            marginHorizontal: 15,
            marginVertical:5,
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
    )



    // return User == null ? navigation.replace("Login") : (
    return (
        <>
            <SafeAreaView style={styles.container} >

                {/* <HStack style={{
                    padding: 10,
                    marginTop: 3,
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}>
                    <BackIcon navigation={navigation} />
                    <BoldText1 size={16} color="#000"
                        style={{
                            marginLeft: 30
                        }}
                        text="Orders"
                    />

                </HStack> */}
                {/* <ScrollView > */}

                <VStack alignItems="flex-start" style={{ marginTop: 40, marginLeft: 15 }}>
                    <BoldText1 size={20} text="My Orders " color="#000" />
                </VStack>

                <Stack style={{
                    backgroundColor: "#F8F8F8",
                    marginBottom: 20
                }} >


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


                </Stack>




                {/* </ScrollView> */}


                {loading == true &&
                    <Stack style={{ flex: 1, height: 300, justifyContent: "center", alignItems: "item" }} >
                        <ActivityIndicator />
                    </Stack>
                }
            </SafeAreaView >
            {loading != true && data.length < 1 &&
                <Stack style={{ flex: 1, alignItems: "center", backgroundColor: "#F8F8F8" }} >
                    <BoldText text="There are no Orders" color="grey" />
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


export default connect(mapStateToProps, mapDispatchToProps)(Orders);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 10,
        backgroundColor: "#F8F8F8"
    },
    top: {
        marginBottom: "auto",
        marginTop: 20
    },
})


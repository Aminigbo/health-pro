import * as React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Inputs } from '../../global-components/inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center, HStack, VStack, Stack, Pressable, Divider, useToast, Spinner } from 'native-base';
import { BoldText, BoldText1 } from '../../global-components/texts';
import { BackIcon, DropoffIcon, EmailIcon, FoodIcon, PackageSizeIcon, PackageSizeLarge, PackageSizeMedium, PackageSizeSmall, PhoneIcon, PickupIcon } from '../../global-components/icons';
import { Color } from '../../utils/colors';
import { CustomButtons, LinkButtons } from '../../global-components/buttons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CheckFullIcon, CheckOutlineIcon, PhoneIcon2, RefreshIcon, UserIcon, UserIcon2 } from '../components/icons';
import { connect } from 'react-redux';
import { RideOrderToView } from '../../redux';
import { GetSingleOrder, RiderOrderHistoryModel } from '../models/get-rider-history';
import { supabase } from '../../../configurations/supabase-config';
import { HandleFPN } from '../../services/handleFPN';
const Colors = Color()
function DeliveryDetails({ navigation, setRideToView, appState, route }) {
    const Order = appState.RideToView;
    const User = appState.User;
    const toast = useToast();
    const [loading, setloading] = React.useState(true)

    function CheckOrderStatus() {
        console.log("getting order")
        GetSingleOrder(Order.id)
            .then(response => {
                if (response.error != null) {

                } else {
                    console.log(response)
                    // alert("Hello")
                    setRideToView(response.data[0])
                    toast.show({
                        placement: "top",
                        render: () => {
                            return <Box bg="green.500" px="2" py="1" rounded="sm" mb={5}>
                                Order status updated
                            </Box>;
                        }
                    })
                }
            })
            .catch(error => {

            })
    }
    //  listen to ride request
    function ListenToRequest() {
        supabase.channel('custom-insert-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'orders' },
                (payload) => {
                    // console.log('Change received!', payload)
                    CheckOrderStatus()
                }
            )
            .subscribe()
    }

    React.useEffect(() => {
        console.log(Order)
        ListenToRequest();
        const unsubscribe = navigation.addListener('focus', async () => {
            if (route.params != undefined) {
                let OrderID = route.params.id;
                GetSingleOrder(OrderID)
                    .then(response => {
                        if (response.error != null) {
                            // setloading(false);
                            alert("A network error occured")
                        } else {
                            setRideToView(response.data[0]);
                            console.log(OrderID)
                            console.log(response.data)
                            setloading(false)
                        }
                    })
            } else {
                setloading(false)
            }

        });

        return unsubscribe;


    }, [])
    HandleFPN(navigation, CheckOrderStatus)



    return (
        <>
            {console.log(Order)}
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <Stack style={{ paddingHorizontal: 10, }} >
                        <HStack mb={2} style={{
                            marginTop: 30, marginBottom: 30, justifyContent: "space-between"
                        }} >
                            <HStack  >
                                <BackIcon navigation={navigation} />
                                <BoldText color="black"
                                    style={{ marginLeft: 28 }}
                                    text="Order Tracking" />
                            </HStack>
                            {loading == true && <Spinner style={{ marginRight: 28 }} />
                                // <TouchableOpacity style={{ marginRight: 28 }} onPress={() => FetchHistory()} >
                                //     <RefreshIcon />
                                // </TouchableOpacity>
                            }
                        </HStack>

                        {loading == false && <>
                            {Order && <>
                                <Stack>
                                    <VStack mt={10}>
                                        <BoldText style={{ fontWeight: 500, marginBottom: 15 }}
                                            color="#0E0C0C" text="Driver details" />
                                        <HStack mb={10} style={{ justifyContent: "space-between" }} >
                                            <HStack style={{ marginLeft: 5, alignItems: "center" }}>
                                                <UserIcon2 />
                                                <BoldText style={{ marginLeft: 9 }} color="#0E0C0C" text={Order.status < 2 ? "Waiting for Riders..." : Order.rider} />
                                            </HStack>
                                            <TouchableOpacity onPress={() => {
                                                Linking.openURL(`tel:${Order.data.receiverPhone}`).catch((err) =>
                                                    console.error('An error occurred', err)
                                                );

                                            }} style={{ marginRight: 10 }} >
                                                <PhoneIcon2 />
                                            </TouchableOpacity>
                                        </HStack>

                                        <BoldText style={{ fontWeight: 500, marginBottom: 15 }}
                                            color="#0E0C0C" text="Status" />


                                        <Stack>


                                            <VStack mb={17} >
                                                <HStack  >
                                                    <CheckFullIcon status={Order.status > 1 ? true : false} />
                                                    <VStack style={{ marginLeft: 15 }}>
                                                        <BoldText style={{ fontWeight: 400 }} color={Order.status > 1 ? Colors.primary : "lightgrey"}
                                                            text="Order accepted" />
                                                    </VStack>
                                                </HStack>
                                                <Divider orientation="vertical" h={10} ml={15} _light={{
                                                    bg: "muted.800"
                                                }} _dark={{
                                                    bg: "muted.50"
                                                }} />
                                                <HStack  >
                                                    <CheckFullIcon status={Order.status > 2 ? true : false} />
                                                    <VStack style={{ marginLeft: 15 }}>
                                                        <BoldText style={{ fontWeight: 400 }} color={Order.status > 2 ? Colors.primary : "lightgrey"}
                                                            text="Arrived pickup location" />
                                                    </VStack>
                                                </HStack>
                                                <Divider orientation="vertical" h={10} ml={15} _light={{
                                                    bg: "muted.800"
                                                }} _dark={{
                                                    bg: "muted.50"
                                                }} />
                                                <HStack  >
                                                    <CheckFullIcon status={Order.status > 3 ? true : false} />
                                                    <VStack style={{ marginLeft: 15 }}>
                                                        <BoldText style={{ fontWeight: 400 }} color={Order.status > 3 ? Colors.primary : "lightgrey"}
                                                            text="Arrived dropoff location" />
                                                    </VStack>
                                                </HStack>
                                                <Divider orientation="vertical" h={10} ml={15} _light={{
                                                    bg: "muted.800"
                                                }} _dark={{
                                                    bg: "muted.50"
                                                }} />
                                                <HStack  >
                                                    <CheckFullIcon status={Order.status > 4 ? true : false} />
                                                    <VStack style={{ marginLeft: 15 }}>
                                                        <BoldText style={{ fontWeight: 400 }} color={Order.status > 4 ? Colors.primary : "lightgrey"}
                                                            text="Item delivered" />
                                                    </VStack>
                                                </HStack>
                                                <Divider orientation="vertical" h={10} ml={15} _light={{
                                                    bg: "muted.800"
                                                }} _dark={{
                                                    bg: "muted.50"
                                                }} />
                                                <HStack  >
                                                    <CheckFullIcon status={Order.status > 5 ? true : false} />
                                                    <VStack style={{ marginLeft: 15 }}>
                                                        <BoldText style={{ fontWeight: 400 }} color={Order.status > 5 ? Colors.primary : "lightgrey"}
                                                            text="Completed" />
                                                    </VStack>
                                                </HStack>



                                            </VStack>
                                        </Stack>


                                        <BoldText style={{ fontWeight: 500, marginBottom: 15 }}
                                            color="#0E0C0C" text="Details" />

                                        <HStack mb={10} >
                                            <PickupIcon />
                                            <VStack style={{ marginLeft: 15, marginRight: 30 }}>
                                                <BoldText color="#B9ACAC" text="Pick up location:" />
                                                <BoldText style={{ fontWeight: 500 }} color="#0E0C0C" text={Order.data.PickupLocation.address} />
                                            </VStack>
                                        </HStack>

                                        <HStack mb={10} >
                                            <DropoffIcon />
                                            <VStack style={{ marginLeft: 15, marginRight: 30 }}>
                                                <BoldText color="#B9ACAC" text="Drop off location:" />
                                                <BoldText style={{ fontWeight: 500 }} color="#0E0C0C" text={Order.data.DropoffLocation.address} />
                                            </VStack>
                                        </HStack>
                                        <HStack mb={10} >
                                            <PhoneIcon />
                                            <VStack style={{ marginLeft: 15 }}>
                                                <BoldText color="#B9ACAC" text="Receiver phone number:" />
                                                <BoldText style={{ fontWeight: 500 }} color="#0E0C0C" text={Order.data.receiverPhone} />
                                            </VStack>
                                        </HStack>

                                        <HStack mb={10} >
                                            <FoodIcon />
                                            <VStack style={{ marginLeft: 15 }}>
                                                <BoldText color="#B9ACAC" text="Package type:" />
                                                <BoldText style={{ fontWeight: 500 }} color="#0E0C0C" text={Order.data.ItemType} />
                                            </VStack>
                                        </HStack>

                                        <HStack mb={10} >
                                            <PackageSizeIcon />
                                            <VStack style={{ marginLeft: 15 }}>
                                                <BoldText color="#B9ACAC" text="Package size:" />
                                                <BoldText style={{ fontWeight: 500 }} color="#0E0C0C" text={Order.data.PackageSize} />
                                            </VStack>
                                        </HStack>




                                    </VStack>

                                    <VStack style={{
                                        alignItems: "center"
                                    }} >
                                        <BoldText color="black"
                                            style={{}}
                                            text="Price" />
                                        <BoldText1 color="black"
                                            style={{}}
                                            text="₦3,380" />
                                    </VStack>

                                    <HStack style={{
                                        justifyContent: "center",
                                        marginTop: 40,
                                        marginBottom: 40
                                    }} >
                                        <CustomButtons
                                            callBack={() => {
                                                navigation.replace("Rideissues")
                                            }}
                                            width={333} height={58} text="Report an issue" />
                                    </HStack>
                                </Stack>
                            </>}
                        </>}
                    </Stack>

                </ScrollView>
            </SafeAreaView>
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
        setRideToView: (payload) => dispatch(RideOrderToView(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DeliveryDetails);





const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: "#fff"
    }
})


// export default DeliveryDetails;
import * as React from 'react';
import { ActivityIndicator, Alert, StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { AlertDialog, Box, Button, Center, CheckCircleIcon, CloseIcon, HStack, IconButton, Image, Input, Skeleton, Stack, Text, VStack, useToast } from 'native-base';
import { PopularCat, ProductCard } from '../components/product-card';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { GetAllProducts } from '../../services/product-services';
import { Insurance_, Notification, Products, Schedules_ } from '../../redux';
import { ListenToNegotiation } from '../../utils/supabase-chanel';
import { BackIcon, BigInsuranceIcon, BigScheduleIcon, CaregiverIcon, NotificationIcon, OrdersIcon, SearchIcon, StarIcon } from '../../global-components/icons';
import { HandleFPN } from '../../services/handleFPN';
import { Inputs } from '../../global-components/inputs';
import { NumberWithCommas } from '../../utils';

const Colors = Color()
function Viewinsurance({ navigation, appState, disp_Insurance_, route }) {
    const toast = useToast()
    const User = appState.User;
    const Insurance = appState.Insurance;
    const [loading, setloading] = React.useState(false)
    const [time, settime] = React.useState(null)
    const [date, setdate] = React.useState(null)
    const [item, setitem] = React.useState(route.params.data)

    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    React.useEffect(() => {
        console.log(route.params)
    }, [navigation]);

    // HandleFPN(navigation, toast)

    React.useEffect(() => {

    }, [])


    function getCurrentMonthDates() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const numDays = new Date(year, month + 1, 0).getDate(); // Get the number of days in the current month

        const datesArray = [];

        for (let i = 1; i <= numDays; i++) {
            const date = new Date(year, month, i);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' }); // Get the day name

            datesArray.push({ date: i, day: day });
        }

        return datesArray;
    }

    const currentMonthDates = getCurrentMonthDates();


    function generateTimeArray(startHour, endHour, intervalMinutes) {
        const timesArray = [];
        let currentTime = new Date();
        currentTime.setHours(startHour);
        currentTime.setMinutes(0);
        currentTime.setSeconds(0);

        const endTime = new Date();
        endTime.setHours(endHour);
        endTime.setMinutes(0);
        endTime.setSeconds(0);

        while (currentTime <= endTime) {
            timesArray.push(currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
            currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
        }

        return timesArray;
    }

    const startHour = 6; // Start time (in 24-hour format)
    const endHour = 17; // End time (in 24-hour format)
    const intervalMinutes = 60; // Interval between times in minutes

    const timeArray = generateTimeArray(startHour, endHour, intervalMinutes);


    function AlertDialogue() {
        return <>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={() => {
                // navigation.push("Home");
                navigation.push("EnterOTP", { OTP: Data.OTP, UUID: Data.UUID, name: Data.name })
                onClose()
            }}>
                <AlertDialog.Content>
                    {/* <AlertDialog.CloseButton onPress={() => {
                        navigation.push("Home")
                        navigation.push("EnterOTP")
                    }} /> */}
                    <AlertDialog.Header>Success</AlertDialog.Header>
                    <AlertDialog.Body>
                        <Center>

                            <BoldText style={{ marginTop: 1 }} text={"Your subscription was successful"} color="#000" />
                        </Center>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>

                            <Button colorScheme="success" style={{ backgroundColor:item.color }} onPress={() => {
                                onClose()
                                navigation.navigate("Insurance")
                            }}>
                                View package
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    }



    return User == null ? navigation.replace("Login") : (
        // return (
        <>
            {/* {console.log(timeArray)} */}

            <AlertDialogue />
            <StatusBar
                animated={true}
                backgroundColor={item.color}
                barStyle="light-content"
            // showHideTransition={statusBarTransition}
            // hidden={hidden}
            />

            <SafeAreaView style={styles.container} >
                <ScrollView  >

                    <HStack style={{
                        padding: 15,
                        marginBottom: 20,
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: item.color,
                        height: 70
                    }}>

                        <BackIcon />
                        <BoldText size={16} text="Appointment" color="#fff" />

                        <CheckCircleIcon color={item.color} />


                    </HStack>



                    <VStack style={{
                        elevation: 2,
                        shadowColor: "#8F9DE7",
                        backgroundColor: "#fff",
                        width: "95%",
                        marginLeft: "2.5%",
                        borderRadius: 10,
                        // height: 100,
                        padding: 15,
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <HStack style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>

                            <VStack flex={1.9} >
                                <Text style={{
                                    backgroundColor: item.color,
                                    textAlign: "center",
                                    width: 90,
                                    // height:40,
                                    justifyContent: "center",
                                    paddingVertical: 15,
                                    borderRadius: 6
                                }} >
                                    <OrdersIcon />
                                </Text>

                            </VStack>


                            <VStack flex={3} >
                                <BoldText2 text={item.package} color="#000" />
                                {/* <BoldText style={{ marginTop: 1 }} text="Cardiologist" color="#000" />
                                <HStack>
                                    <BoldText style={{ marginTop: 1 }} text=" 4.7 (943)" color="#000" />
                                </HStack> */}
                            </VStack>


                        </HStack>

                    </VStack>


                    <VStack justifyContent="space-between" alignItems="space-between" style={{
                        marginTop: 20,
                        marginHorizontal: 10,
                        elevation: 3,
                        shadowColor: "#8F9DE7",
                        backgroundColor: "#F4ECEB",
                        borderRadius: 10,
                        paddingHorizontal: 15,
                    }} >

                        <HStack justifyContent="space-between" alignItems="space-between" style={{
                            marginTop: 20,
                            marginHorizontal: 10,
                            elevation: 3,
                        }} >
                            <TouchableOpacity
                                style={{

                                    height: 70,
                                    width: 100,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >


                                <BoldText1 text={`${item.duration} months`} color={Colors.primary} />
                                <BoldText text="Duration" color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{

                                    height: 70,
                                    width: 100,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >


                                <BoldText1 text={`₦${NumberWithCommas(item.price)} `} color={Colors.primary} />
                                <BoldText text="Cost" color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{

                                    height: 70,
                                    width: 100,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >


                                <BoldText1 text={item.benefits.length} color={Colors.primary} />
                                <BoldText text="Benefits" color="#000" />
                            </TouchableOpacity>

                        </HStack>


                        <Text style={{
                            fontSize: 14,
                            // marginTop: 10,
                            marginLeft: 10,
                            color: "#000",
                            padding: 15,
                            // fontWeight: 500,

                        }}>
                            {item.description}
                        </Text>

                    </VStack>



                    <Text style={{
                        fontSize: 17,
                        // marginTop: 30,
                        marginLeft: 10,
                        color: "#000",
                        fontWeight: 500,
                        padding: 15,

                    }}>
                        Benefits
                    </Text>


                    <VStack>
                        {item.benefits.map((value, index) => {
                            return <Text key={index} style={{
                                fontSize: 14,
                                // marginTop: 10,
                                marginLeft: 10,
                                color: "#000",
                                padding: 15,
                                // fontWeight: 500,

                            }}>
                                {index + 1} :  {value}
                            </Text>
                        })}
                    </VStack>




                </ScrollView>

                <HStack style={{
                    marginTop: 30,
                    justifyContent: "center",
                    marginBottom: 30
                }}  >
                    <CustomButtons callBack={() => {
                        setloading(true)
                        setTimeout(() => {
                            Insurance.push(item)
                            disp_Insurance_(Insurance)
                            setIsOpen(true)
                        }, 3000);
                    }}
                        bg={item.color}
                        Loading={loading} LoadingText="Please wait..." width={333} height={50} text={`Subscribe to ${item.package}`} />
                </HStack>

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
        disp_Notification: (payload) => dispatch(Notification(payload)),
        disp_Products: (payload) => dispatch(Products(payload)),
        disp_Insurance_: (payload) => dispatch(Insurance_(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Viewinsurance);



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


import * as React from 'react';
import { ActivityIndicator, Alert, StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { AddIcon, AlertDialog, Box, Button, Center, CheckCircleIcon, CloseIcon, Divider, HStack, IconButton, Image, Input, Skeleton, Stack, Text, VStack, useToast } from 'native-base';
import { PopularCat, ProductCard } from '../components/product-card';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { GetAllProducts } from '../../services/product-services';
import { Notification, Products, Schedules_ } from '../../redux';
import { ListenToNegotiation } from '../../utils/supabase-chanel';
import { BackIcon, BigInsuranceIcon, BigScheduleIcon, CaregiverIcon, NotificationIcon, OrdersIcon, SearchIcon, StarIcon } from '../../global-components/icons';
import { HandleFPN } from '../../services/handleFPN';
import { Inputs } from '../../global-components/inputs';
import { NumberWithCommas } from '../../utils';

const Colors = Color()
function Insurance({ navigation, appState, disp_Products, disp_Notification, disp_Schedules_ }) {
    const toast = useToast()
    const User = appState.User;
    const Insurance = appState.Insurance;
    const Products = appState.products;
    const Notifications = appState.Notification;
    const [search, setsearch] = React.useState("")
    const [loading, setloading] = React.useState(false)
    const [time, settime] = React.useState(null)
    const [date, setdate] = React.useState(null)

    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    React.useEffect(() => {

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
                    <AlertDialog.Header>Appointment Scheduled</AlertDialog.Header>
                    <AlertDialog.Body>
                        <Center>
                            <BoldText1 text="Dr. Jessica Lee" color="#000" />
                            <BoldText style={{ marginTop: 1 }} text="Cardiologist" color="#000" />
                            <BoldText style={{ marginTop: 1 }} text={`${date && date.date} ${date && date.day}`} color="#000" />
                            <BoldText style={{ marginTop: 1 }} text={time} color="#000" />
                        </Center>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>

                            <Button colorScheme="success" style={{ backgroundColor: Colors.primary }} onPress={() => {
                                onClose()
                                navigation.navigate("ViewSchedule")
                            }}>
                                View schedules
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
                backgroundColor={Colors.primary}
                barStyle="light-content"
            // showHideTransition={statusBarTransition}
            // hidden={hidden}
            />

            <SafeAreaView style={styles.container} >
                <HStack style={{
                    padding: 15,
                    // marginBottom: 20,
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: Colors.primary,
                    height: 70
                }}>

                    <BackIcon />
                    <BoldText size={16} text="Active Insurance packages" color="#fff" />

                    <TouchableOpacity onPress={() => {
                        navigation.navigate("choose-insurance")
                    }} style={{
                        padding: 10,
                        backgroundColor: "#fff",
                        borderRadius: 6
                    }} >
                        <AddIcon color={Colors.primary} />
                    </TouchableOpacity>


                </HStack>




                <ScrollView marginTop={20} >



                    {
                        Insurance.map((item, index) => {
                            return <TouchableOpacity key={index} onPress={() => { navigation.navigate("ViewInsurance", { data: item }) }} >
                                <VStack style={{
                                    elevation: 2,
                                    // shadowColor: "#8F9DE7",
                                    backgroundColor: "#fff",
                                    width: "95%",
                                    marginLeft: "2.5%",
                                    borderRadius: 10,
                                    // height: 100,
                                    padding: 15,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 15
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
                                            <BoldText1 text={item.package} color="#000" />
                                            <BoldText style={{ marginTop: 1 }} text={`${item.benefits.length} benefits`} color="#000" />
                                            <HStack>

                                                <BoldText style={{ marginTop: 1 }} text={`${item.duration} months`} color="#000" />
                                                <BoldText style={{ marginTop: 1, marginLeft: 10 }} text={`₦${NumberWithCommas(item.price)}`} color="#000" />

                                            </HStack>

                                        </VStack>


                                    </HStack>
                                    <Divider style={{ marginTop: 10 }} />
                                    <Text style={{
                                        fontSize: 14,
                                        // marginTop: 10,
                                        // marginLeft: 10,
                                        color: "#000",
                                        padding: 15,
                                        // fontWeight: 500,

                                    }}>
                                        {item.description}
                                    </Text>
                                </VStack>
                            </TouchableOpacity>
                        })
                    }


                    {Insurance.length < 1 && <Stack height={600} justifyContent="center" alignItems="center">
                        <BoldText text="You have no active insurance package" color="grey" />
                    </Stack>}

                </ScrollView>

                {Insurance.length < 1 &&
                    <HStack style={{
                        marginTop: 30,
                        justifyContent: "center",
                        marginBottom: 30
                    }}  >
                        <CustomButtons callBack={() => {
                            navigation.navigate("choose-insurance")
                        }}
                            primary Loading={loading} LoadingText="Please wait..." width={333} height={50} text="See Insurance packages" />
                    </HStack>
                }



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
        disp_Schedules_: (payload) => dispatch(Schedules_(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Insurance);



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


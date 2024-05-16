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
function Chooseinsurance({ navigation, appState, disp_Products, disp_Notification, disp_Insurance_ }) {
    const toast = useToast()
    const User = appState.User;
    const Insurance = appState.Insurance;
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
                    <BoldText size={16} text="Insurance packages" color="#fff" />

                    <CheckCircleIcon color={Colors.primary} />


                </HStack>

                <HStack justifyContent="center" alignItems="space-between" style={{
                    // marginTop: 20,
                    // marginHorizontal: 10,
                    elevation: 3,
                    shadowColor: "#8F9DE7",
                    backgroundColor: "#F4ECEB",
                    borderRadius: 10,
                    // paddingHorizontal: 15,
                }} >
                    <TouchableOpacity
                        style={{

                            height: 70,
                            // width: 100,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >


                        {/* <BoldText1 text="43" color="#000" /> */}
                        <BoldText text="Select the best insurance package that fits your pocket" color="#000" />
                    </TouchableOpacity>


                </HStack>


                <ScrollView  >



                    {
                        [
                            {
                                package: "Life Insurance",
                                price: 10000,
                                duration: 12,
                                description: "Provides financial protection for your loved ones in the event of your passing",
                                color: "brown",
                                benefits: [
                                    "Provides a financial safety net for your loved ones in the event of your passing",
                                    "Can be used to pay funeral expenses, outstanding debts, and living expenses",
                                    "Can provide a source of income for your dependents"
                                ]
                            },
                            {
                                package: "Health Insurance",
                                price: 10000,
                                duration: 12,
                                description: "Covers medical expenses and provides access to healthcare services",
                                color: "mediumseagreen",
                                benefits: [
                                    "Covers medical expenses, including hospital stays, surgeries, and doctor visits",
                                    "Helps protect you from financial ruin due to medical bills",
                                    "May provide access to preventive care and wellness programs",
                                    "Offers financial support for chronic disease management",
                                    "Reduces out-of-pocket medical expenses"
                                ]
                            },
                            {
                                package: "Auto Insurance",
                                price: 10000,
                                duration: 12,
                                description: "Protects you and your vehicle in the event of an accident or other vehicle-related damages",
                                color: "gold",
                                benefits: [
                                    "Covers damages to your vehicle and other property in the event of an accident",
                                    "Provides liability coverage in case you cause harm to others",
                                    "May offer additional benefits like roadside assistance, car rental coverage, towing and labor costs, and glass repair and replacement"
                                ]
                            },
                            {
                                package: "Home Insurance",
                                price: 10000,
                                duration: 12,
                                description: "Protects your home and belongings from damage or loss due to natural disasters, theft, or other events",
                                color: "black",
                                benefits: [
                                    "Protects your home and belongings from damage or loss due to natural disasters, theft, or other events",
                                    "Provides temporary housing and living expenses if you're unable to live in your home",
                                    "May offer additional benefits like liability coverage, identity theft protection, sewer and drain backup coverage, and sump pump failure coverage"
                                ]
                            },
                            {
                                package: "Travel Insurance",
                                price: 10000,
                                duration: 12,
                                description: "Covers unexpected events that may occur while traveling, such as trip cancellations or medical emergencies",
                                color: "grey",
                                benefits: [
                                    "Covers unexpected events like trip cancellations, delays, or interruptions",
                                    "May provide medical coverage while traveling abroad",
                                    "Offers assistance with lost or stolen luggage and travel documents, travel delays and cancellations, emergency evacuations, and 24/7 travel assistance"
                                ]
                            },
                            {
                                package: "Disability Insurance",
                                price: 10000,
                                duration: 12,
                                description: "Provides income replacement if you become unable to work due to illness or injury",
                                color:Colors.primary,
                                benefits: [
                                    "Provides income replacement if you become unable to work due to illness or injury",
                                    "Helps you maintain your standard of living and financial independence",
                                    "May offer additional benefits like rehabilitation and retraining programs, death benefit for beneficiaries, and cost-of-living adjustments"
                                ]
                            },
                            {
                                package: "Business Insurance",
                                price: 10000,
                                duration: 12,
                                description: "Protects your business from financial losses due to unexpected events, lawsuits, or employee injuries",
                                color: "orange",
                                benefits: [
                                    "Protects your business from financial losses due to unexpected events like natural disasters, lawsuits, or employee injuries",
                                    "Provides liability coverage and property damage coverage",
                                    "May offer additional benefits like business interruption insurance, cyber insurance, employee dishonesty coverage, and umbrella liability coverage"
                                ]
                            }
                        ].map((item, index) => {
                            return <TouchableOpacity key={index} onPress={() => { navigation.navigate("ViewInsurance",{data:item}) }} >
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
                                            <BoldText style={{ marginTop: 1 }} text={` ₦${NumberWithCommas(item.price)} `} color="#000" />
                                            <HStack>

                                                <BoldText style={{ marginTop: 1 }} text={`${item.duration} months`} color="#000" />

                                            </HStack>
                                        </VStack>


                                    </HStack>
                                </VStack>
                            </TouchableOpacity>
                        })
                    }



                </ScrollView>

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


export default connect(mapStateToProps, mapDispatchToProps)(Chooseinsurance);



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


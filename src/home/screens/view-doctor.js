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
import { Notification, Products, Schedules_ } from '../../redux';
import { ListenToNegotiation } from '../../utils/supabase-chanel';
import { BackIcon, BigInsuranceIcon, BigScheduleIcon, CaregiverIcon, NotificationIcon, SearchIcon, StarIcon, SuccessIcon } from '../../global-components/icons';
import { HandleFPN } from '../../services/handleFPN';
import { Inputs } from '../../global-components/inputs';

const Colors = Color()
function Home({ navigation, appState, disp_Products, disp_Notification, disp_Schedules_, route }) {
    const toast = useToast()
    const User = appState.User;
    const Scedules = appState.Schedues;
    const Products = appState.products;
    const Notifications = appState.Notification;
    const [doctor, setDoctor] = React.useState(route.params.doctor)
    const [loading, setloading] = React.useState(true)
    const [miniloading, setminiloading] = React.useState(false)
    const [time, settime] = React.useState(null)
    const [date, setdate] = React.useState(null)

    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    React.useEffect(() => {

    }, [navigation]);

    // HandleFPN(navigation, toast)

    React.useEffect(() => {
        setTimeout(() => {
            setloading(false)
        }, 2000);
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
                            <SuccessIcon />
                            <BoldText1 text={doctor.name} color="#000" style={{marginTop:30}}/>
                            <BoldText style={{ marginTop: 1 }} text={doctor.dpt} color="#000" /> 
                        </Center>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>

                            <Button colorScheme="success" style={{ backgroundColor: Colors.primary }} onPress={() => {
                                onClose()
                                navigation.navigate("Index")
                            }}>
                               Done
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    }

    function MiniLoading() {
        return <>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={miniloading} onClose={() => { }}>
                <AlertDialog.Content>
                    {/* <AlertDialog.CloseButton onPress={() => {
                        navigation.push("Home")
                        navigation.push("EnterOTP")
                    }} /> */}
                    <AlertDialog.Header>Creating appointment</AlertDialog.Header>
                    <AlertDialog.Body>
                        <Center>
                            <ActivityIndicator color={Colors.primary} />
                        </Center>
                    </AlertDialog.Body>

                </AlertDialog.Content>
            </AlertDialog>
        </>
    }


    return User == null ? navigation.replace("Login") : (
        // return (
        <>

            <AlertDialogue />
            <MiniLoading />

            <StatusBar
                animated={true}
                backgroundColor={Colors.primary}
                barStyle="light-content"
            // showHideTransition={statusBarTransition}
            // hidden={hidden}
            />

            <SafeAreaView style={styles.container} >


                {loading ? <Stack style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <ActivityIndicator color={Colors.primary} />
                </Stack> :

                    <ScrollView  >

                        <HStack style={{
                            padding: 15,
                            marginBottom: 20,
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: Colors.primary,
                            height: 70
                        }}>

                            <BackIcon />
                            <BoldText size={16} text="Appointment" color="#fff" />

                            <CheckCircleIcon color="#fff" />


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
                                    <Image
                                        style={{
                                            width: 100, height: 100,
                                            borderRadius: 10
                                        }}
                                        source={{
                                            uri: doctor.img
                                        }}
                                        alt='Health-pro' />

                                </VStack>


                                <VStack flex={3} >
                                    <BoldText1 text={doctor.name} color="#000" />
                                    <BoldText style={{ marginTop: 1 }} text={doctor.dpt} color="#000" />
                                    <HStack>
                                        {doctor.rate.map((item, index) => {
                                            return <StarIcon key={index} Style={{ marginLeft: 10 }} />
                                        })}
                                        <BoldText style={{ marginTop: 1 }} text={doctor.count} color="#000" />
                                    </HStack>
                                </VStack>


                            </HStack>

                        </VStack>



                        <HStack justifyContent="space-between" alignItems="space-between" style={{
                            marginTop: 20,
                            marginHorizontal: 10,
                            elevation: 3,
                            shadowColor: "#8F9DE7",
                            backgroundColor: "#F4ECEB",
                            borderRadius: 10,
                            paddingHorizontal: 15,
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


                                <BoldText1 text={doctor.patients} color="#000" />
                                <BoldText text="Patients" color="#000" />
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


                                <BoldText1 text={`${doctor.years} years`} color="#000" />
                                <BoldText text="Experience" color="#000" />
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


                                <BoldText1 text={doctor.reviews} color="#000" />
                                <BoldText text="Reviews" color="#000" />
                            </TouchableOpacity>

                        </HStack>

                        <Text style={{
                            fontSize: 17,
                            marginTop: 30,
                            marginLeft: 10,
                            color: "#000",
                            fontWeight: 500,
                            padding: 15,

                        }}>
                            Profile
                        </Text>


                        <Text style={{
                            fontSize: 14,
                            // marginTop: 10,
                            marginLeft: 10,
                            color: "#000",
                            padding: 15,
                            // fontWeight: 500,

                        }}>
                            {doctor.profile}
                        </Text>


                        <Text style={{
                            fontSize: 17,
                            // marginTop: 20,
                            marginLeft: 10,
                            color: "#000",
                            fontWeight: 500,
                            padding: 15,

                        }}>
                            Select Date
                        </Text>

                        <ScrollView horizontal style={{
                            height: 120,
                            // backgroundColor:"red", 
                            paddingTop: 10,
                            // marginTop: 10,
                            padding: 15,
                        }}>

                            {
                                currentMonthDates.map((item, index) => {
                                    return <TouchableOpacity
                                        onPress={() => {
                                            setdate(item)
                                        }}
                                        key={index}
                                        style={{
                                            elevation: 3,
                                            backgroundColor: "#fff",
                                            height: 90,
                                            width: 70,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: 10,
                                            borderRadius: 10,
                                            borderWidth: date && date.date == item.date ? 1 : 0,
                                            borderColor: date && date.date == item.date ? Colors.primary : "#fff"
                                        }}
                                    >


                                        <BoldText1 text={item.date} color="#000" />
                                        <BoldText text={item.day.split(",")[0]} color="#000" />
                                    </TouchableOpacity>
                                })
                            }
                        </ScrollView>

                        <Text style={{
                            fontSize: 17,
                            // marginTop: 20,
                            marginLeft: 10,
                            color: "#000",
                            fontWeight: 500,
                            padding: 15,

                        }}>
                            Select Time
                        </Text>

                        <ScrollView horizontal style={{
                            height: 90,
                            // backgroundColor:"red", 
                            paddingTop: 10,
                            // marginTop: 10,
                            padding: 15,
                        }}>

                            {
                                timeArray.map((item, index) => {
                                    return <TouchableOpacity
                                        onPress={() => {
                                            settime(item)
                                        }} key={index}
                                        style={{
                                            elevation: 3,
                                            backgroundColor: "#fff",
                                            height: 50,
                                            width: 100,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginLeft: 10,
                                            borderRadius: 10,
                                            borderWidth: time == item ? 1 : 0,
                                            borderColor: time == item ? Colors.primary : "#fff"
                                        }}
                                    >

                                        <BoldText1 text={item} color="#000" />

                                    </TouchableOpacity>
                                })
                            }
                        </ScrollView>


                        <HStack style={{
                            marginTop: 30,
                            justifyContent: "center",
                            marginBottom: 30
                        }}  >
                            <CustomButtons callBack={() => {
                                if (time && date) {
                                    setminiloading(true)
                                    setTimeout(() => {
                                        Scedules.push({
                                            doctor: doctor.name,
                                            data: doctor,
                                            date: date.date,
                                            day: date.day,
                                            time
                                        })
                                        disp_Schedules_(Scedules)
                                        setIsOpen(true)
                                        setminiloading(false)
                                    }, 2000);

                                } else {

                                }
                            }}
                                primary={date && time ? true : false} Loading={loading} LoadingText="Please wait..." width={333} height={50} text="Book now" />
                        </HStack>

                    </ScrollView>
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


export default connect(mapStateToProps, mapDispatchToProps)(Home);



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

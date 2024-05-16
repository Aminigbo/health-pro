import * as React from 'react';
import { ActivityIndicator, Alert, StyleSheet, View, StatusBar, PermissionsAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { AlertDialog, Box, Button, Center, CloseIcon, Divider, HStack, IconButton, Image, Input, Skeleton, Stack, Text, VStack, useToast } from 'native-base';
import { PopularCat, ProductCard } from '../components/product-card';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { GetAllProducts } from '../../services/product-services';
import { Notification, Products } from '../../redux';
import { ListenToNegotiation } from '../../utils/supabase-chanel';
import { BigInsuranceIcon, BigScheduleIcon, CaregiverIcon, NotificationIcon, OrdersIcon, SearchIcon, SettingIcon, StarIcon } from '../../global-components/icons';
import { HandleFPN } from '../../services/handleFPN';
import { Inputs } from '../../global-components/inputs';
import { NumberWithCommas } from '../../utils';
import { PhoneIcon } from '../../delivery/components/icons';

const Colors = Color()
function Home({ navigation, appState, disp_Products, disp_Notification }) {
    const toast = useToast()
    const User = appState.User;
    const Products = appState.products;
    const Notifications = appState.Notification;
    const [search, setsearch] = React.useState("")
    const [loading, setloading] = React.useState(false)

    React.useEffect(() => {

    }, [navigation]);

    // HandleFPN(navigation, toast)

    React.useEffect(() => {

    }, [])

    function AlertDialogue() {
        // return <>
        //     <AlertDialog leastDestructiveRef={() => {

        //     }} isOpen={Notifications.status} onClose={() => {
        //         // navigation.push("Home");
        //         // navigation.push("EnterOTP", { OTP: Data.OTP, UUID:Data.UUID, name:Data.name })
        //         // onClose()
        //     }}>
        //         <AlertDialog.Content>
        //             {/* <AlertDialog.CloseButton onPress={() => {
        //                 navigation.push("Home")
        //                 navigation.push("EnterOTP")
        //             }} /> */}
        //             <AlertDialog.Header>Notification</AlertDialog.Header>
        //             <AlertDialog.Body>
        //                 You have an offer for one of your products
        //             </AlertDialog.Body>
        //             <AlertDialog.Footer>
        //                 <Button.Group space={2}>

        //                     <Button colorScheme="success" onPress={() => {
        //                         //    console.log(Notifications.data.new)
        //                         navigation.push("Negotiate", { NewData: Notifications.data })
        //                         disp_Notification({
        //                             ...Notifications,
        //                             status: false
        //                         })
        //                     }}>
        //                         See offer
        //                     </Button>
        //                 </Button.Group>
        //             </AlertDialog.Footer>
        //         </AlertDialog.Content>
        //     </AlertDialog>
        // </>
    }

    function getFormattedDate() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const today = new Date();

        const dayOfWeek = days[today.getDay()];
        const month = months[today.getMonth()];
        const dayOfMonth = today.getDate();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${formattedHours}:${formattedMinutes} ${ampm}`;

        return formattedDate;
    }

    const requestLocationPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'App needs access to your location for functionality.',
                        buttonPositive: 'OK',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Location permission granted');
                    // You can now access the location
                } else {
                    console.log('Location permission denied');
                    // Handle denial of permission
                }
            } else {
                const permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
                if (permissionStatus === 'granted') {
                    console.log('Location permission granted');
                    // You can now access the location
                } else {
                    console.log('Location permission denied');
                    // Handle denial of permission
                }
            }
        } catch (error) {
            console.error('Error requesting location permission:', error);
        }
    };


    React.useEffect(() => {
        requestLocationPermission()
    }, [])

    return User == null ? navigation.replace("Login") : (
        // return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={Colors.primary}
                barStyle="light-content"
            // showHideTransition={statusBarTransition}
            // hidden={hidden}
            />

            <SafeAreaView style={styles.container} >
                {/* {console.log(User)} */}
                <AlertDialogue />

                <HStack style={{
                    padding: 10,
                    marginBottom: 20,
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    backgroundColor: Colors.primary,
                    height: 120
                }}>
                    <VStack style={{
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginTop: 20,

                    }}>
                        <BoldText size={16} text={`Welcome back, ${User.name}`} color="#fff" />
                        <Text style={{
                            fontSize: 22,
                            marginTop: 10,
                            color: "#fff",
                            fontWeight: 900
                        }}>
                            Keep Healthy!
                        </Text>
                        {/* <BoldText1 size={24} text={User.name} color="#fff" /> */}
                    </VStack>


                    <HStack
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            // backgroundColor: "grey"
                        }}
                    >
                        <TouchableOpacity style={{
                            // backgroundColor: "red",
                            height: 50, width: 50,
                            justifyContent: "center",
                            alignItems: "center"
                        }} >
                            {/* <SearchIcon size={30} /> */}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Login") }}
                            style={{
                                // backgroundColor: "green",
                                height: 50, width: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: 20,
                                paddingTop: 10,
                            }} >
                            {/* <NotificationIcon size={20} /> */}
                            <BoldText text="Exit" color="#fff" />
                        </TouchableOpacity>
                    </HStack>
                </HStack>

                <Stack style={{
                    // paddingHorizontal:20,
                    marginTop: -40,
                    backgroundColor: "#fff",
                    width: "90%",
                    marginLeft: "5%",
                    borderRadius: 10
                }}>
                    <Input
                        style={{
                            // backgroundColor:"#fff"
                        }}
                        value={search}
                        onChangeText={(value) => setsearch(value)}
                        w={{
                            base: "75%",
                            x: "100%",
                        }}
                        h={45}
                        mb={7}
                        borderRadius={10}
                        InputLeftElement={<SearchIcon />}
                        placeholder="Search for doctors or anything"
                    />


                </Stack>

                <ScrollView  >



                    <Text style={{
                        fontSize: 20,
                        marginTop: 10,
                        marginLeft: 10,
                        color: "#000",
                        fontWeight: 500
                    }}>
                        Daily Health Tip
                    </Text>

                    <VStack style={{
                        // paddingHorizontal:20,
                        marginTop: 20,
                        backgroundColor: Colors.primary,
                        width: "95%",
                        marginLeft: "2.5%",
                        borderRadius: 10,
                        // height: 100,
                        padding: 10,
                        justifyContent: "space-between",
                        alignItems: "center",
                        opacity: 0.8,
                        // 1C38D1
                    }}>
                        <HStack style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>

                            <VStack flex={1.3} >
                                <Image
                                    style={{
                                        width: 70, height: 70, marginRight: 40,
                                        borderRadius: 10
                                    }}
                                    source={{
                                        uri: "https://c7.alamy.com/comp/2AJPBRH/thirsty-young-african-man-holding-glass-of-drinking-water-for-body-health-healthy-lifestyle-thirst-and-hydration-concept-free-space-2AJPBRH.jpg"
                                    }}
                                    alt='Health-pro' />

                            </VStack>


                            <VStack flex={3} >
                                <BoldText2 text="Drink Water" color="#fff" />
                                <BoldText size={13} style={{ marginTop: 10 }} text=" Drink at least 2 liters of water daily to remain hydrated." color="#fff" />
                            </VStack>

                        </HStack>

                        <Stack style={{
                            backgroundColor: "#1C38D1",
                            // height: 100,
                            width: "100%",
                            marginTop: 15,
                            padding: 10,
                            alignItems: "center",
                            borderRadius: 6,
                            opacity: 1,
                            zIndex: 1000
                        }} >
                            <Text style={{
                                fontSize: 18,
                                color: "#fff",
                                fontWeight: 500
                            }}>
                                {getFormattedDate()}
                            </Text>
                        </Stack>

                    </VStack>


                    <HStack justifyContent="space-between" alignItems="space-between" style={{
                        marginTop: 20,
                        marginHorizontal: 10
                    }} >
                        {[{ name: "Schedules", link: "ViewSchedule" }, { name: "Care-Giver", link: "ViewSchedule" }, { name: "Insurance", link: "Insurance_" }].map((items, index) => {
                            return <TouchableOpacity key={index}
                                onPress={() => {
                                    // navigation.push(items.link)
                                    requestLocationPermission()
                                }}
                                style={{
                                    elevation: 3,
                                    shadowColor: "#000",
                                    backgroundColor: "#fff",
                                    height: 100,
                                    width: 100,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                {items.name == "Schedules" && <SettingIcon />}
                                {items.name == "Care-Giver" && <CaregiverIcon />}
                                {items.name == "Insurance" && <OrdersIcon />}

                                <BoldText text={items.name} color="#000" size={11} />
                            </TouchableOpacity>
                        })}

                    </HStack>

                    <Text style={{
                        fontSize: 20,
                        marginTop: 30,
                        marginLeft: 10,
                        color: "#000",
                        fontWeight: 500,

                    }}>
                        Doctors at your service
                    </Text>

                    <Stack style={{
                        marginBottom: 25
                    }} >

                        {
                            [
                                {
                                    name: "Dr. James Henry",
                                    dpt: "Cardiologist - Rivers state university",
                                    rate: [1, 1, 1, 1],
                                    count: "4.7 (143)",
                                    img: "https://thumbs.dreamstime.com/z/african-doctor-14739009.jpg?ct=jpeg",
                                    profile: "Compassionate and dedicated physician with a passion for delivering high-quality patient care. With years of experience in [specialty], I strive to provide empathetic and personalized treatment plans that prioritize my patients' well-being and health goals. Let's work together to achieve optimal health and wellness!",
                                    patients: 91,
                                    years: 9,
                                    reviews: 110
                                },
                                {
                                    name: "Dr. Mathew Mba",
                                    dpt: "Nephrologist",
                                    rate: [1, 1],
                                    count: "2.7 (43)",
                                    img: "https://as2.ftcdn.net/v2/jpg/02/98/28/35/1000_F_298283594_2XriWgG0saYJ65I86BTyIkiH5DrQ1fIt.jpg",
                                    profile: "As a skilled and knowledgeable doctor, I am committed to staying up-to-date with the latest medical advancements and best practices in [specialty]. My approach is centered around patient-centered care, open communication, and a collaborative approach to diagnosis and treatment. I look forward to partnering with you to address your health concerns and improve your quality of life.",
                                    patients: 21,
                                    years: 3,
                                    reviews: 40
                                },
                                {
                                    name: "DR. Grace Udo",
                                    dpt: "Oncologist",
                                    rate: [1, 1, 1],
                                    count: "3.4 (73)",
                                    img: "https://www.shutterstock.com/shutterstock/photos/1936087690/display_1500/stock-photo-beautiful-african-american-nurse-with-arms-folded-1936087690.jpg",
                                    profile: "With a strong foundation in [medical school] and extensive training in [residency/fellowship], I bring a depth of expertise and expertise to my practice. My goal is to provide comprehensive, evidence-based care that addresses the whole person - body, mind, and spirit. I am dedicated to empowering my patients with knowledge, support, and compassionate care to help them thrive and live their best lives.",
                                    patients: 53,
                                    years: 5,
                                    reviews: 74
                                },
                            ].map((items, index) => {
                                return <TouchableOpacity
                                    onPress={() => {
                                        navigation.push("ViewDoctor", { doctor: items })
                                    }}
                                    key={index} >
                                    <VStack style={{
                                        // paddingHorizontal:20,
                                        marginTop: 20,
                                        elevation: 2,
                                        shadowColor: "#000",
                                        backgroundColor: "#fff",
                                        width: "95%",
                                        marginLeft: "2.5%",
                                        borderRadius: 10,
                                        // height: 100,
                                        padding: 10,
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}>
                                        <HStack style={{
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}>

                                            <VStack flex={1.3} >
                                                <Image
                                                    style={{
                                                        width: 70, height: 70, marginRight: 40,
                                                        borderRadius: 10
                                                    }}
                                                    source={{
                                                        uri: items.img
                                                    }}
                                                    alt='Health-pro' />

                                            </VStack>


                                            <VStack flex={3} >
                                                <BoldText1 text={items.name} color="#000" />
                                                <BoldText style={{ marginTop: 1 }} text={items.dpt} color="#000" />
                                                <HStack>
                                                    {items.rate.map((item, index) => {
                                                        return <StarIcon key={index} Style={{ marginLeft: 10 }} />
                                                    })}
                                                    <BoldText style={{ marginTop: 1 }} text={items.count} color="#000" />
                                                </HStack>
                                            </VStack>


                                        </HStack>

                                    </VStack>

                                </TouchableOpacity>


                            })
                        }
                    </Stack>


                    <ScrollView horizontal backgroundColor="#fff" height={190} marginBottom={30}>
                        {
                            [
                                {
                                    name: "Dr. James Henry",
                                    dpt: "14 Testimony lane, Port Harcourt",
                                    rate: [1, 1, 1, 1],
                                    count: "4.7 (143)",
                                    img: "https://thumbs.dreamstime.com/z/african-doctor-14739009.jpg?ct=jpeg",
                                    profile: "Compassionate and dedicated physician with a passion for delivering high-quality patient care. With years of experience in [specialty], I strive to provide empathetic and personalized treatment plans that prioritize my patients' well-being and health goals. Let's work together to achieve optimal health and wellness!",
                                    patients: 91,
                                    years: 9,
                                    reviews: 110,
                                    price: 90000
                                },
                                {
                                    name: "Dr. Mathew Mba",
                                    dpt: "Nephrologist",
                                    rate: [1, 1],
                                    count: "2.7 (43)",
                                    img: "https://as2.ftcdn.net/v2/jpg/02/98/28/35/1000_F_298283594_2XriWgG0saYJ65I86BTyIkiH5DrQ1fIt.jpg",
                                    profile: "As a skilled and knowledgeable doctor, I am committed to staying up-to-date with the latest medical advancements and best practices in [specialty]. My approach is centered around patient-centered care, open communication, and a collaborative approach to diagnosis and treatment. I look forward to partnering with you to address your health concerns and improve your quality of life.",
                                    patients: 21,
                                    years: 3,
                                    reviews: 40,
                                    price: 72000
                                },
                                {
                                    name: "DR. Grace Udo",
                                    dpt: "Oncologist",
                                    rate: [1, 1, 1],
                                    count: "3.4 (73)",
                                    img: "https://www.shutterstock.com/shutterstock/photos/1936087690/display_1500/stock-photo-beautiful-african-american-nurse-with-arms-folded-1936087690.jpg",
                                    profile: "With a strong foundation in [medical school] and extensive training in [residency/fellowship], I bring a depth of expertise and expertise to my practice. My goal is to provide comprehensive, evidence-based care that addresses the whole person - body, mind, and spirit. I am dedicated to empowering my patients with knowledge, support, and compassionate care to help them thrive and live their best lives.",
                                    patients: 53,
                                    years: 5,
                                    reviews: 74,
                                    price: 30000
                                },
                            ].map((items, index) => {
                                return <TouchableOpacity
                                    onPress={() => {
                                        navigation.push("ViewCaregiver", { doctor: items })
                                    }}
                                    key={index} >
                                    <VStack style={{
                                        // paddingHorizontal:20,
                                        marginTop: 20,
                                        elevation: 2,
                                        shadowColor: "#000",
                                        backgroundColor: "#fff",
                                        // width: "0%",
                                        marginLeft: 10,
                                        borderRadius: 10,
                                        // height: 100,
                                        padding: 10,
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}>
                                        <HStack style={{
                                            justifyContent: "space-between",
                                            // alignItems: "center",
                                        }}>

                                            <VStack flex={1} alignItems="center" justifyContent="space-between" >
                                                <Image
                                                    style={{
                                                        width: 70, height: 70, marginRight: 20,
                                                        borderRadius: 40,
                                                        objectFit: "contain"
                                                        // aspectRatio:1
                                                    }}
                                                    source={{
                                                        uri: items.img
                                                    }}
                                                    alt='Health-pro' />

                                                <PhoneIcon color={Colors.primary} />

                                            </VStack>


                                            <VStack flex={3.5} >
                                                <BoldText1 text={items.name} color="#000" />
                                                <BoldText style={{ marginTop: 1 }} text={items.dpt} color="#000" />
                                                <HStack>

                                                    <BoldText style={{ marginTop: 3, backgroundColor: Colors.primary, padding: 4, borderRadius: 6 }} text={items.count} color="#fff" />
                                                </HStack>
                                                <Divider mt={3} />
                                                <HStack mt={2} justifyContent="space-between">
                                                    <VStack>
                                                        <BoldText1 style={{ marginTop: 1 }} text={`${items.years} years`} color="#000" />
                                                        <BoldText style={{ marginTop: 1 }} text="Experience" color="#000" />
                                                    </VStack>
                                                    <VStack>
                                                        <BoldText1 style={{ marginTop: 1 }} text={`${NumberWithCommas(items.price)} / month`} color="#000" />
                                                        <BoldText style={{ marginTop: 1 }} text="Price" color="#000" />
                                                    </VStack>
                                                </HStack>
                                            </VStack>


                                        </HStack>

                                    </VStack>

                                </TouchableOpacity>


                            })
                        }
                    </ScrollView>
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


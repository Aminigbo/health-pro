import React from 'react';
import { Provider } from "react-redux";
import { useState, useEffect } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Color } from './src/utils/colors';
import store from './src/redux/store';
import { StyleSheet, Animated, Dimensions, Alert, PermissionsAndroid } from 'react-native';
import Onboading from './src/onboarding/screens';
import Signup from './src/auth/screens/create-account';
import { extendTheme, NativeBaseProvider } from "native-base";
import Login from './src/auth/screens/login';
import GetOTP from './src/auth/screens/getotp';
import EnterOTP from './src/auth/screens/enterOTP';
import Home from './src/home/screens/home'; 
import SplashScreen from 'react-native-splash-screen' 
import verify from './src/auth/screens/verify';
import { HomeIcon, OrdersIcon, ProfileIcon, SettingIcon } from './src/global-components/icons';


import viewProduct from './src/home/screens/view-doctor';
// import negotiation from './src/home/screens/negotiation';
// import makepayment from './src/home/screens/makepayment';
import Paymentsuccess from "./src/home/screens/success"
import searchDeliveryService from './src/home/screens/search-delivery-service';
import allDeliveryServices from './src/home/screens/all-delivery-services';

// account
import Account from './src/account/screens/index';
import uploadProduct from './src/account/screens/upload-product';

// orders
import Orders from './src/orders/screen/index';
import viewOrder from './src/orders/screen/view-order';

// settings
import Settings from "./src/setting/screen/index"
import Accountsetting from "./src/setting/screen/settings"
import notifications from './src/home/screens/notifications';
// import dispatchNegotiation from './src/home/screens/dispatch-negotiation';
import editProduct from './src/account/screens/edit-product';
import withdrawal from './src/account/screens/withdrawal';
import viewSchedule from './src/home/screens/view-schedule';
import insurance from './src/home/screens/insurance';
import viewInsurance from './src/home/screens/view-insurance';
import chooseInsurance from './src/home/screens/choose-insurance';
import viewCaregiver from './src/home/screens/view-caregiver';

const headerColor = '#fffdfb'
const navTheme = DefaultTheme;
const Colors = Color()
navTheme.colors.background = Colors.light;


const newColorTheme = {
    brand: {
        900: "#8287af",
        800: "#7c83db",
        700: "#b3bef6",
    },
};
const theme = extendTheme({ colors: newColorTheme });
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

const tabs = [
    {
        name: 'Home',
        screen: Home,
    },
    {
        name: 'Search',
        screen: Home,
    },
    {
        name: 'Favorite',
        screen: Home,
    }, 
];


const { width, height } = Dimensions.get('window');


function App() {

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1500);
        // RequestUserPermission();
        // requestNotificationPermission()
    }, [])


    // const requestNotificationPermission = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    //             {
    //                 // title: 'Cool Photo App Camera Permission',
    //                 // message:
    //                 //     'Cool Photo App needs access to your camera ' +
    //                 //     'so you can take awesome pictures.',
    //                 buttonNeutral: 'Ask Me Later',
    //                 buttonNegative: 'Cancel',
    //                 buttonPositive: 'OK',
    //             },
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             // console.log('You can use the camera');
    //         } else {
    //             requestNotificationPermission()
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // };




    const offsetAnimation = React.useRef(new Animated.Value(0)).current;

    const HomeStacks = () => {
        return (
            <>
                <Tab.Navigator
                    // tabBar={props => <MyTabBar {...props} />}

                    initialRouteName="Home"
                    screenOptions={({ route }) => ({
                        headerStyle: {
                            backgroundColor: headerColor,
                        },
                        tabBarIcon: ({ focused, color, size }) => {

                            if (route.name === 'Index') {
                                return <>
                                    <HomeIcon status={focused} />
                                </>
                            } 
                            else if (route.name === 'Insurance') {
                                return <>
                                    <OrdersIcon status={focused} />
                                </>
                            } else if (route.name === 'ViewSchedule') {
                                return <>
                                    <SettingIcon status={focused} />
                                </>
                            }

                        },
                        tabBarActiveTintColor: Colors.primary,
                        tabBarInactiveTintColor: 'gray',
                        headerShown: false,
                        tabBarLabelStyle: {
                            fontSize: 13,
                            fontWeight: 300,
                            marginBottom: 11
                        },
                        tabBarStyle: [
                            {
                                display: "flex",
                                // backgroundColor:"red",
                                height: 70
                            },
                            null
                        ]
                        // tabBarShowLabel: false,


                    })}
                >
                    <Tab.Screen name="Index" component={Home} options={{ header: () => null, tabBarLabel: "Home" }}
                        listeners={{
                            focus: () => {
                                Animated.spring(offsetAnimation, {
                                    toValue: 0 * (width / tabs.length),
                                    useNativeDriver: true,
                                }).start();
                            },
                        }}
                    />


                    <Tab.Screen
                        listeners={{
                            focus: () => {
                                Animated.spring(offsetAnimation, {
                                    toValue: 1 * (width / tabs.length),
                                    useNativeDriver: true,
                                }).start();
                            },
                        }} name="Insurance" component={insurance} options={{ header: () => null, tabBarLabel: "Insurance" }} />

                    <Tab.Screen
                        listeners={{
                            focus: () => {
                                Animated.spring(offsetAnimation, {
                                    toValue: 2 * (width / tabs.length),
                                    useNativeDriver: true,
                                }).start();
                            },
                        }} name="ViewSchedule" component={viewSchedule} options={{ header: () => null, tabBarLabel: "Schedules" }} />


                    {/* <Tab.Screen
                        listeners={{
                            focus: () => {
                                Animated.spring(offsetAnimation, {
                                    toValue: 3 * (width / tabs.length),
                                    useNativeDriver: true,
                                }).start();
                            },
                        }} name="Account" component={Account} options={{ header: () => null, tabBarLabel: "Account" }} /> */}


                </Tab.Navigator>
                <Animated.View
                    style={[
                        styles.indicator,
                        {
                            transform: [
                                {
                                    translateX: offsetAnimation,
                                },
                            ],

                        },
                    ]}
                />
            </>
        )
    }





    return (
        <>
            <Provider store={store().store}>
                <PersistGate loading={null} persistor={store().persistor}>
                    <NavigationContainer theme={navTheme}  >
                        <NativeBaseProvider theme={theme}>

                            <Stack.Navigator
                                tabBar={props => <MyTabBar {...props} />}

                                initialRouteName="Home"
                                screenOptions={({ route }) => ({
                                    headerStyle: {
                                        backgroundColor: headerColor,
                                    },
                                })}
                            >
                                <Stack.Screen name="onboard" component={Onboading} options={{ header: () => null, }} />
                                <Stack.Screen name="Signup" component={Signup} options={{ header: () => null, }} />
                                <Stack.Screen name="Verify" component={verify} options={{ header: () => null, }} />
                                <Stack.Screen name="Login" component={Login} options={{ header: () => null, }} />
                                <Stack.Screen name="GetOTP" component={GetOTP} options={{ header: () => null, }} />
                                <Stack.Screen name="EnterOTP" component={EnterOTP} options={{ header: () => null, }} />

                                <Stack.Screen name="Home" component={HomeStacks} options={{ header: () => null, }} />
                                <Stack.Screen name="Notifications" component={notifications} options={{ header: () => null, }} />

                                <Stack.Screen name="ViewDoctor" component={viewProduct} options={{ header: () => null, }} />
                                <Stack.Screen name="ViewCaregiver" component={viewCaregiver} options={{ header: () => null, }} />
                                <Stack.Screen name="Insurance_" component={insurance} options={{ header: () => null, }} />
                                {/* <Stack.Screen name="ViewSchedule" component={viewSchedule} options={{ header: () => null, }} /> */}
                                <Stack.Screen name="ViewInsurance" component={viewInsurance} options={{ header: () => null, }} />
                                <Stack.Screen name="choose-insurance" component={chooseInsurance} options={{ header: () => null, }} />

                                <Stack.Screen name="editProduct" component={editProduct} options={{ header: () => null, }} />

                                {/* <Stack.Screen name="Negotiate" component={negotiation} options={{ header: () => null, }} /> */}
                                {/* <Stack.Screen name="dispatch-negotiate" component={dispatchNegotiation} options={{ header: () => null, }} /> */}
                                {/* <Stack.Screen name="Makepayment" component={makepayment} options={{ header: () => null, }} /> */}
                                <Stack.Screen name="payment-success" component={Paymentsuccess} options={{ header: () => null, }} />
                                <Stack.Screen name="Search-delivery" component={searchDeliveryService} options={{ header: () => null, }} />
                                <Stack.Screen name="All-delivery-services" component={allDeliveryServices} options={{ header: () => null, }} />

                                <Stack.Screen name="Upload-product" component={uploadProduct} options={{ header: () => null, }} />

                                <Stack.Screen name="View-order" component={viewOrder} options={{ header: () => null, }} />

                                <Stack.Screen name="Account-setting" component={Accountsetting} options={{ header: () => null, }} />

                                <Stack.Screen name="withdrawal" component={withdrawal} options={{ header: () => null, }} />

                            </Stack.Navigator>
                        </NativeBaseProvider>
                    </NavigationContainer>

                </PersistGate>
            </Provider>
        </>
    )
}
const styles = StyleSheet.create({
    indicator: {
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 20,
        left: width / tabs.length / 2 - 5,
        bottom: 50,
        backgroundColor: Colors.primary,
        zIndex: 100,
    },
});



export default App;

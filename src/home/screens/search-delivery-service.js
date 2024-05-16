import * as React from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Divider, HStack, Image, Input, Pressable, Stack, VStack } from 'native-base';
import { PopularCat, ProductCard } from '../components/product-card';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { BackIcon, MapSvgIcon } from '../../global-components/icons';
import { CheckFullIcon, CheckOutlineIcon } from '../../delivery/components/icons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { FetchActiveLogistics } from '../models/model-index';

const Colors = Color()
function Searchdelivery({ navigation, appState, route }) {

    const User = appState.User;
    const [Data, setdata] = React.useState(route.params.Data);


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {

        });

        return unsubscribe;
    }, [navigation]);

    function SearchForDispatch() {
        setloading(true)
        FetchActiveLogistics()
            .then(response => {
                setloading(false)
                if (!response.error) {
                    if (response.data.length < 1) {
                        return Alert.alert("Error", "There are no dispatch services available.", [
                            { text: "Ok" }
                        ])
                    }
                    navigation.navigate("All-delivery-services", { Data: { Rider: response.data, Data: Data } })
                } else {
                    Alert.alert("Error", response.error.message, [
                        {
                            text: "close", onPress: () => {

                            }
                        }
                    ])
                }

            })
            .catch(error => {
                setloading(false)
                console.log(error)
                Alert.alert("Error", "An error occured", [
                    {
                        text: "close", onPress: () => {

                        }
                    }
                ])
            })
    }

    const [pickup, setpickup] = React.useState("");
    const [dropoff, setdropoff] = React.useState("");
    const [pickedDate, setPickedDate] = React.useState(false)
    const [date, setDate] = React.useState(new Date());
    const [loading, setloading] = React.useState(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
        setPickedDate(true)
    };




    // return User == null ? navigation.replace("Login") : (
    return (
        <>


            <SafeAreaView style={styles.container} >

                <ScrollView  >

                    <HStack style={{
                        padding: 10,
                        marginTop: 20,
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <BackIcon navigation={navigation} />
                    </HStack>



                    <VStack style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 15,
                        marginTop: 2,
                        marginBottom: 4
                    }}>
                        <BoldText1 size={19} text="Delivery" color="#000" />
                        {/* <BoldText size={13} text="Delivery" color="#000" /> */}
                    </VStack>







                    <VStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 30
                    }}>
                        <BoldText size={14} text="Pickup location" color="#000" />
                        <Input
                            value={pickup}
                            onChangeText={(value) => {
                                setpickup(value)
                            }}
                            placeholder='Pickup location'
                            width="100%"
                            height={45}
                            style={{
                                backgroundColor: Colors.lightgray,
                                borderRadius: 8,
                            }}
                        />
                    </VStack>

                    <VStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 30
                    }}>
                        <BoldText size={14} text="Dropoff location" color="#000" />
                        <Input
                            value={dropoff}
                            onChangeText={(value) => {
                                setdropoff(value)
                            }}
                            placeholder='Dropoff location'
                            width="100%"
                            height={45}
                            style={{
                                backgroundColor: Colors.lightgray,
                                borderRadius: 8,
                            }}
                        />
                    </VStack>



                    <TouchableOpacity
                        onPress={showDatepicker}
                        style={{
                            justifyContent: "space-between",
                            alignItems: "space between",
                            marginHorizontal: 15,
                            marginTop: 40,
                            height: 45,
                            backgroundColor: Colors.lightgray,
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 3,
                            borderColor: "lightgrey"
                        }}>
                        {/* <BoldText size={14} text="Pickup date" color="#000" /> */}
                        {pickedDate == true ?
                            <Text>{date.toLocaleString()}</Text> :
                            <Text>Select date</Text>
                        }
                    </TouchableOpacity>




                    {/* <Divider style={{ marginVertical: 20, backgroundColor: Colors.lightgray }} /> */}

                    {/* <VStack style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 15,
                    }}>
                        <MapSvgIcon />
                    </VStack> */}


                    <CustomButtons
                        Loading={loading}
                        LoadingText="Searching for dispatch services"
                        width="90%"
                        height={50}
                        text="Find the nearest delivery service "
                        primary Style={{
                            marginBottom: 50,
                            marginLeft: "5%",
                            marginTop:50
                        }} callBack={() => {
                            // navigation.navigate("All-delivery-services")
                            if (!pickup || !dropoff || !date) {
                                return false
                            } else {
                                setloading(true)
                                // setTimeout(() => {
                                //     setloading(false)
                                // }, 4000);
                                SearchForDispatch()
                            }

                        }} />
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
        // disp_Login: (payload) => dispatch(User(payload)), 
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Searchdelivery);



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


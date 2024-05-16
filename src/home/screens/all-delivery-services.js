import * as React from 'react';
import { StyleSheet, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Divider, HStack, Image, Input, Pressable, Stack, VStack } from 'native-base';
import { PopularCat, ProductCard } from '../components/product-card';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { BackIcon, StarIcon } from '../../global-components/icons';
import { CheckFullIcon, CheckOutlineIcon } from '../../delivery/components/icons';
import { assignDispactToBuyer } from '../models/model-index';

const Colors = Color()
function Alldeliveryservices({ navigation, appState, route }) {

    const User = appState.User;
    const [Data, setdata] = React.useState(route.params.Data);


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {

        });

        return unsubscribe;


    }, [navigation]);



    React.useEffect(() => {

    }, [])



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
                        marginTop: 2
                    }}>
                        <BoldText1 size={19} text="Delivery Services" color="#000" />
                        <BoldText style={{ marginTop: 20 }} text="Select a delivery service for your product." color="#000" />
                    </VStack>

                    <Stack style={{ marginBottom: 30 }} >
                        {
                            Data.Rider.map((item, index) => { 
                                return <TouchableOpacity onPress={() => {
                                    // console.log(Data.Data.id)
                                    assignDispactToBuyer(Data.Data.id, item.uuid)
                                        .then(response => {
                                            if (!response.error) {
                                                navigation.navigate("dispatch-negotiate", {
                                                    Data: response.data[0]
                                                })
                                                // console.log(response.data)
                                            }
                                            // console.log(response)
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        })
                                }} key={index} >
                                    <VStack style={{
                                        justifyContent: "space-between",
                                        alignItems: "space between",
                                        marginHorizontal: 15,
                                        marginTop: 20,
                                        backgroundColor: Colors.lightgray,
                                        padding: 10,
                                        borderRadius: 8
                                    }} >

                                        <HStack
                                            style={{
                                                justifyContent: "space-between",
                                                alignItems: "space between",
                                            }}
                                        >
                                            <BoldText1 size={14} text={item.name} color="#000" />

                                        </HStack>
                                        <HStack
                                            style={{
                                                justifyContent: "space-between",
                                                alignItems: "space between",
                                                marginTop: 3
                                            }}
                                        >
                                            <BoldText size={13} text="Rating" color="#000" />
                                            <HStack>
                                                <StarIcon />
                                                {/* <StarIcon />
                                                <StarIcon />
                                                <StarIcon /> */}
                                            </HStack>

                                        </HStack>
                                    </VStack>
                                </TouchableOpacity>
                            })
                        }

                    </Stack>
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


export default connect(mapStateToProps, mapDispatchToProps)(Alldeliveryservices);



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


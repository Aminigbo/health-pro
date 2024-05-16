import * as React from 'react';
import { StyleSheet, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Button, Center, Divider, HStack, Image, Input, Pressable, Stack, VStack } from 'native-base';
import { PopularCat, ProductCard } from '../components/product-card';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { BackIcon, SuccessIcon } from '../../global-components/icons';
import { CheckFullIcon, CheckOutlineIcon } from '../../delivery/components/icons';
import { NumberWithCommas } from '../../utils';

const Colors = Color()
function Paymentsuccess({ navigation, appState, route }) {

    const User = appState.User;
    const [Data, setData] = React.useState(route.params.Data)


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
            {console.log(Data)}

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
                        <BoldText1 size={19} text="Payment Successful" color="#000" />
                    </VStack>


                    <HStack style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: "center",
                    }} >

                    </HStack>

                    <HStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 20
                    }}>
                        {/* icon */}
                    </HStack>

                    <Divider style={{ marginVertical: 20, backgroundColor: Colors.lightgray }} />
                    <VStack style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 15,
                        width: "60%",
                        marginLeft: "20%"
                    }}>
                        <BoldText size={14} text={`Your payment of ₦${NumberWithCommas(Data.best_offer)} was made successfully.`} color="#000" />
                        {/* <BoldText1 size={14} text={Data.product_objects} color="#000" /> */}
                    </VStack>

                    <Center style={{ marginTop: 70 }} >
                        <SuccessIcon />
                    </Center>
                </ScrollView>


                <VStack style={{
                    padding: 30,
                }}>
                    <Center>
                        <BoldText1 size={15} style={{ marginLeft: 10 }} text="Do you need a delivery service?" color="#000" />
                    </Center>
                    <HStack style={{
                        alignItems: "space-between",
                        justifyContent: "space-around",
                        marginTop: 10
                    }}>
                        <CustomButtons callBack={() => {
                            navigation.replace("Search-delivery", { Data })
                        }} width={140} height={45} text="Yes" primary Style={{}} />


                        <TouchableOpacity
                            callBack={() => {
                                navigation.replace("Orders", { Data })
                            }}
                        >
                            <Button
                                // isLoading={Loading} isLoadingText={LoadingText}
                                style={{
                                    backgroundColor: Colors.accent,
                                    padding: 10,
                                    width: 140,
                                    borderRadius: 9,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 45,
                                }}>
                                <BoldText1 color={Colors.primary} text="No" />
                            </Button>
                        </TouchableOpacity>
                    </HStack>



                </VStack>
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


export default connect(mapStateToProps, mapDispatchToProps)(Paymentsuccess);



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


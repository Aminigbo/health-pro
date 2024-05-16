import * as React from 'react';
import { StyleSheet, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Divider, HStack, Image, Input, Pressable, Stack, VStack } from 'native-base';
import { PopularCat, ProductCard } from '../components/product-card';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { BackIcon } from '../../global-components/icons';
import { CheckFullIcon, CheckOutlineIcon } from '../../delivery/components/icons';
import { NumberWithCommas, formatDate } from '../../utils';
import { supabase } from '../../../configurations/supabase-config';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import { InitiateNegotiationModel } from '../../services/product-services';


const Colors = Color()
function Makepayment({ navigation, appState, route }) {

    const User = appState.User;
    const [Data, setData] = React.useState(route.params.Data)
    const [loading, setloading] = React.useState(false)
    const paystackWebViewRef = React.useRef();

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

                <Paystack
                    paystackKey="pk_test_0ae598740dd4cbdfc0b09614de18230643765609"
                    billingEmail="paystackwebview@something.com"
                    amount={Data.best_offer}
                    onCancel={(e) => {
                        // handle response here
                        console.log("cancelled.")
                    }}
                    onSuccess={(res) => {
                        setloading(true)
                        InitiateNegotiationModel({ product: Data.id, amount: Data.best_offer, UUID: User.UUID, stage: 4, payment: res })
                            .then(response => {
                                // console.log(response)
                                if (response.success == false) {
                                    setloading(false)
                                    // setnegotiation("")
                                   
                                    return toast.show({
                                        render: () => {
                                            return <Box bg="crimson.500" px="2" py="1" rounded="sm" mb={5}>
                                                {response.message}
                                            </Box>;
                                        }
                                    }); 
                                }

                                // console.log("Something", response)
                                setData({
                                    ...Data,
                                    ...response.data,
                                })
                                setloading(false)
                                navigation.replace("payment-success", { Data })
                                // return toast.show({
                                //     render: () => {
                                //         return <Box bg="crimson.500" px="2" py="1" rounded="sm" mb={5}>
                                //             Payment made successfully
                                //         </Box>;
                                //     }
                                // });

                            }).catch(error => {
                                // console.log(error)
                                setloading(false)
                                // setnegotiation("")
                                toast.show({
                                    render: () => {
                                        return <Box bg="crimson.500" px="2" py="1" rounded="sm" mb={5}>
                                            error fetching products
                                        </Box>;
                                    }
                                });
                            })
                    }}
                    ref={paystackWebViewRef}
                />



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
                        <BoldText1 size={19} text="Checkout" color="#000" />
                        <BoldText style={{ marginTop: 20 }} text="Please select payment method" color="#000" />
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
                        marginTop: 20,
                        backgroundColor: Colors.lightgray,
                        padding: 15,
                        borderRadius: 8
                    }}>
                        <BoldText size={14} text="Paystack" color="#000" />
                        <CheckFullIcon status />
                    </HStack>

                    <HStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 20,
                        backgroundColor: Colors.lightgray,
                        padding: 15,
                        borderRadius: 8,
                        opacity: 0.3
                    }}>
                        <BoldText size={14} text="Paypal" color="#000" />
                        <CheckOutlineIcon status />
                    </HStack>
                    <HStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 20,
                        backgroundColor: Colors.lightgray,
                        padding: 15,
                        borderRadius: 8,
                        opacity: 0.3
                    }}>
                        <BoldText size={14} text="Debit/Credit Card" color="#000" />
                        <CheckOutlineIcon />
                    </HStack>


                    <HStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 30
                    }}>
                        <BoldText1 size={14} text="Product" color="#000" />
                        <BoldText text={Data.product_objects.name} color="#000" />
                    </HStack>

                    <HStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 20
                    }}>
                        <BoldText1 size={14} text="Quantity" color="#000" />
                        <BoldText text={1} color="#000" />
                    </HStack>
                    <HStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 20
                    }}>
                        <BoldText1 size={14} text="Harvest Date" color="#000" />
                        <BoldText text={formatDate(Data.product_objects.harvest_date)} color="#000" />
                    </HStack>

                    <Divider style={{ marginVertical: 20, backgroundColor: Colors.lightgray }} />
                    <VStack style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 15,
                    }}>
                        <BoldText size={14} text="Total price" color="#000" />
                        <BoldText2 size={19} style={{ marginTop: 6 }} text={`₦${NumberWithCommas(Data.best_offer)}`} color="#000" />
                    </VStack>


                </ScrollView>

                <CustomButtons
                LoadingText="Finishing up"
                Loading={loading} width="90%" height={50} text="Pay now" primary Style={{
                    marginBottom: 50,
                    marginLeft: "5%"
                }} callBack={() => {
                    setloading(true)
                    paystackWebViewRef.current.startTransaction()
                }} />
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


export default connect(mapStateToProps, mapDispatchToProps)(Makepayment);



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


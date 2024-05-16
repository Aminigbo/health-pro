import * as React from 'react';
import { ActivityIndicator, StyleSheet, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Actionsheet, AlertDialog, Box, Button, Center, FormControl, HStack, Image, Input, Popover, Pressable, Stack, Text, VStack, useDisclose, useToast } from 'native-base';
import { PopularCat, ProductCard } from '../components/product-card';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { BackIcon } from '../../global-components/icons';
import { NumberWithCommas } from '../../utils';
import { InitiateNegotiationModel, UpdateNegotiation } from '../../services/product-services';
import { supabase } from '../../../configurations/supabase-config';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import { cancelDispatchRequest } from '../models/model-index';


const Colors = Color()
function dispatchNegotiation({ navigation, appState, route }) {
    const initialFocusRef = React.useRef(null);
    const User = appState.User;
    const [Data, setData] = React.useState(route.params.Data)
    const [openNegotiation, setopenNegotiation] = React.useState(true)
    const [negotiation, setnegotiation] = React.useState(null)
    const [loading, setloading] = React.useState(false)
    const toast = useToast()
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            // console.log(route.params)
            // if (Data.deal == false) {
            //     setTimeout(() => {
            //         navigation.pop()
            //     }, 4000);
            // }
        });

        return unsubscribe;

    }, [navigation]);


    function Listen() {
        supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'negotiations' },
                (payload) => {
                    // setData({
                    //     ...Data,
                    //     ...payload.new
                    // }) 
                    // if (payload.new.product == Data.product) {
                    if (payload.new.id == Data.id) {
                        console.log("Same product")
                        if (payload.new.buyer == User.UUID || payload.new.vendor == User.UUID) {
                            if (payload.new.deal == false) {

                                // setTimeout(() => {
                                //     navigation.pop()
                                // }, 4000);
                            }

                            setData({
                                ...payload.new
                            })

                            console.log(payload.new.id)
                            console.log(Data.id)
                        } else {
                            console.log("Not the user")
                            console.log("Buyer", payload.new.buyer)
                            console.log("vendor", payload.new.vendor)
                        }
                    } else {
                        console.log("product is", payload.new.id)
                    }
                }
            )
            .subscribe()
    }

    React.useEffect(() => {

        Listen()


        // supabase.channel('custom-all-channel')
        //     .on(
        //         'postgres_changes',
        //         { event: '*', schema: 'public', table: 'negotiations' },
        //         (payload) => {
        //             setData({
        //                 ...Data,
        //                 ...payload.new
        //             })

        //         }
        //     )
        //     .subscribe()


    }, [])


    function InitiateNegotiation(stage) {
        // console.log(negotiation)
        setloading(true)
        // setTimeout(() => {
        //     setloading(false)
        // }, 3000);
        // console.log(Data.id)
        InitiateNegotiationModel({ product: Data.id, amount: negotiation, UUID: User.UUID, stage })
            .then(response => {
                // console.log(response)
                if (response.success == false) {
                    setloading(false)
                    setnegotiation("")
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
            }).catch(error => {
                // console.log(error)
                setloading(false)
                setnegotiation("")
                toast.show({
                    render: () => {
                        return <Box bg="crimson.500" px="2" py="1" rounded="sm" mb={5}>
                            error fetching products
                        </Box>;
                    }
                });
            })
    }

    function UpdateNegotiationController(status) {
        setloading(true)
        setnegotiation("")
        UpdateNegotiation({ UUID: User.UUID, id: Data.id, status })
            .then(response => {
                setloading(false)
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                setloading(false)
                toast.show({
                    render: () => {
                        return <Box bg="crimson.500" px="2" py="1" rounded="sm" mb={5}>
                            error fetching products
                        </Box>;
                    }
                });
            })
    }

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    const paystackWebViewRef = React.useRef();

    // return User == null ? navigation.replace("Login") : (
    return (
        <>
            {/* {console.log("Data.idData.id", Data)} */}
            {/*  {console.log("vendor", Data.vender)}*/}
            {/* {console.log(Data)} */}
            {Listen()}



            <SafeAreaView style={styles.container} >
                <Paystack
                    paystackKey="pk_test_0ae598740dd4cbdfc0b09614de18230643765609"
                    billingEmail="paystackwebview@something.com"
                    amount={Data.price}
                    onCancel={(e) => {
                        // handle response here
                        console.log("cancelled.")
                    }}
                    onSuccess={(res) => {
                        setloading(true)
                        InitiateNegotiationModel({ product: Data.id, amount: negotiation, UUID: User.UUID, stage: 4, payment: res })
                            .then(response => {
                                // console.log(response)
                                if (response.success == false) {
                                    setloading(false)
                                    setnegotiation("")
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
                                return toast.show({
                                    render: () => {
                                        return <Box bg="crimson.500" px="2" py="1" rounded="sm" mb={5}>
                                            Payment made successfully
                                        </Box>;
                                    }
                                });

                            }).catch(error => {
                                // console.log(error)
                                setloading(false)
                                setnegotiation("")
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
                        // padding: 10,
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
                        marginTop: 1
                    }}>
                        <BoldText1 size={19} text="Negotiation table" color="#000" />
                        <BoldText text={`For ${Data.product_objects.name} delivery`} color="#000" />
                    </VStack>

                    {/* <VStack style={{
                        // backgroundColor: "red",
                        width: "50%",
                        padding: 8,
                        alignItems: "flex-start"
                    }}>
                        <BoldText text="Cost price" color="lightgrey" />
                        <CustomButtons width={140} height={40} text={`₦${Data && NumberWithCommas(Data && Data.price)}`} Style={{}} />
                    </VStack> */}

                    {Data.dispatch_data ?
                        <>

                            {/* Bargain */}
                            <VStack style={{
                                // backgroundColor: "green",
                                width: "100%",
                                padding: 10,
                                alignItems: "flex-start",

                            }}>
                                {Data.dispatch_data && Data.dispatch_data.negotiate ? <>
                                    <BoldText text="Bargain" color="lightgrey" />
                                    <CustomButtons
                                        callBack={() => { }}
                                        width={140} height={45} text={`₦${NumberWithCommas(Data.negotiate)}`} Style={{}} />
                                </> :
                                    <>
                                        {/* Data.user == who created the product */}
                                        {User.UUID == Data.dispatchUUID &&
                                            <Popover initialFocusRef={initialFocusRef} trigger={triggerProps => {
                                                return <>
                                                    <Button

                                                        color={Colors.primary}
                                                        style={{
                                                            backgroundColor: Colors.primary,
                                                            width: 120,
                                                            borderRadius: 9,
                                                            color: Colors.white,
                                                            borderColor: Colors.accent,
                                                            borderWidth: 1
                                                        }}
                                                        {...triggerProps}>
                                                        <BoldText text="Negiotiate" color={Colors.white} />
                                                    </Button>
                                                </>;
                                            }}>
                                                <Popover.Content width="56">
                                                    <Popover.Arrow />
                                                    {/* <Popover.CloseButton /> */}
                                                    {
                                                        /* @ts-ignore */
                                                    }
                                                    {/* <Popover.Header>Negotiate</Popover.Header> */}
                                                    <Popover.Body >

                                                        <Input rounded="sm" fontSize="xs" ref={initialFocusRef}
                                                            placeholder='Enter amount'
                                                            keyboardType='numeric'
                                                            value={negotiation}
                                                            onChangeText={(value) => {
                                                                setnegotiation(value)
                                                            }}
                                                        />
                                                    </Popover.Body>
                                                    <Popover.Footer>
                                                        <Button.Group>
                                                            <Button
                                                                isLoading={loading}
                                                                isLoadingText='sending..'
                                                                onPress={() => {
                                                                    InitiateNegotiation(1)
                                                                }}
                                                                style={{
                                                                    backgroundColor: Colors.primary,
                                                                    width: 100
                                                                }}
                                                            >Bargain</Button>
                                                        </Button.Group>

                                                    </Popover.Footer>
                                                </Popover.Content>
                                            </Popover>
                                        }
                                    </>
                                }
                            </VStack>



                            {/* Bargain */}
                            <VStack style={{
                                // backgroundColor: "green",
                                width: "100%",
                                padding: 10,
                                alignItems: "flex-end",

                            }}>
                                {Data.dispatch_data && Data.dispatch_data.best_price ? <>
                                    <BoldText text="Bargain" color="lightgrey" />
                                    <CustomButtons
                                        callBack={() => { }}
                                        width={140} height={45} text={`₦${NumberWithCommas(Data.negotiate)}`} Style={{}} />
                                </> :
                                    <>
                                        {/* Data.user == who created the product */}
                                        {User.UUID == Data.buyer &&
                                            <Popover initialFocusRef={initialFocusRef} trigger={triggerProps => {
                                                return <>
                                                    <Button

                                                        color={Colors.primary}
                                                        style={{
                                                            backgroundColor: Colors.primary,
                                                            width: 120,
                                                            borderRadius: 9,
                                                            color: Colors.white,
                                                            borderColor: Colors.accent,
                                                            borderWidth: 1
                                                        }}
                                                        {...triggerProps}>
                                                        <BoldText text="Negiotiate" color={Colors.white} />
                                                    </Button>
                                                </>;
                                            }}>
                                                <Popover.Content width="56">
                                                    <Popover.Arrow />
                                                    {/* <Popover.CloseButton /> */}
                                                    {
                                                        /* @ts-ignore */
                                                    }
                                                    {/* <Popover.Header>Negotiate</Popover.Header> */}
                                                    <Popover.Body >

                                                        <Input rounded="sm" fontSize="xs" ref={initialFocusRef}
                                                            placeholder='Enter amount'
                                                            keyboardType='numeric'
                                                            value={negotiation}
                                                            onChangeText={(value) => {
                                                                setnegotiation(value)
                                                            }}
                                                        />
                                                    </Popover.Body>
                                                    <Popover.Footer>
                                                        <Button.Group>
                                                            <Button
                                                                isLoading={loading}
                                                                isLoadingText='sending..'
                                                                onPress={() => {
                                                                    InitiateNegotiation(1)
                                                                }}
                                                                style={{
                                                                    backgroundColor: Colors.primary,
                                                                    width: 100
                                                                }}
                                                            >Bargain</Button>
                                                        </Button.Group>

                                                    </Popover.Footer>
                                                </Popover.Content>
                                            </Popover>
                                        }
                                    </>
                                }


                            </VStack>


                            {/* Vendor best price */}
                            <>
                                {Data.dispatch_data &&
                                    <>
                                        {Data.dispatch_data.best_price ?
                                            <VStack style={{
                                                // backgroundColor: "red",
                                                width: "50%",
                                                padding: 8,
                                                alignItems: "flex-start"
                                            }}>
                                                <BoldText text="Best price" color="lightgrey" />
                                                <CustomButtons width={140} height={40} text={`₦${Data && NumberWithCommas(Data && Data.best_price)}`} Style={{}} />
                                            </VStack> :
                                            <>
                                                {User.UUID == Data.dispatchUUID &&
                                                    <Popover initialFocusRef={initialFocusRef} trigger={triggerProps => {
                                                        return <>
                                                            <Button

                                                                color={Colors.primary}
                                                                style={{
                                                                    backgroundColor: Colors.primary,
                                                                    width: 120,
                                                                    borderRadius: 9,
                                                                    color: Colors.white,
                                                                    borderColor: Colors.accent,
                                                                    borderWidth: 1
                                                                }}
                                                                {...triggerProps}>
                                                                <BoldText text="Best price" color={Colors.white} />
                                                            </Button>
                                                        </>;
                                                    }}>
                                                        <Popover.Content width="56">
                                                            <Popover.Arrow />
                                                            {/* <Popover.CloseButton /> */}
                                                            {
                                                                /* @ts-ignore */
                                                            }
                                                            {/* <Popover.Header>Negotiate</Popover.Header> */}
                                                            <Popover.Body >

                                                                <Input rounded="sm" fontSize="xs" ref={initialFocusRef}
                                                                    placeholder='Enter amount'
                                                                    keyboardType='numeric'
                                                                    value={negotiation}
                                                                    onChangeText={(value) => {
                                                                        setnegotiation(value)
                                                                    }}
                                                                />
                                                            </Popover.Body>
                                                            <Popover.Footer>
                                                                <Button.Group>
                                                                    <Button
                                                                        isLoading={loading}
                                                                        isLoadingText='sending..'
                                                                        onPress={() => {
                                                                            InitiateNegotiation(2)
                                                                        }}
                                                                        style={{
                                                                            backgroundColor: Colors.primary,
                                                                            width: 100
                                                                        }}
                                                                    >Bargain</Button>
                                                                </Button.Group>

                                                            </Popover.Footer>
                                                        </Popover.Content>
                                                    </Popover>
                                                }
                                            </>
                                        }
                                    </>
                                }
                            </>


                            {/* Buyer best offer */}
                            {Data.dispatch_data &&
                                <>
                                    {/* Best offer */}
                                    <VStack style={{
                                        // backgroundColor: "green",
                                        width: "100%",
                                        padding: 10,
                                        alignItems: "flex-end",

                                    }}>
                                        {Data.dispatch_data.last_offer ? <>
                                            <BoldText text="Best offer" color="lightgrey" />
                                            <CustomButtons
                                                callBack={() => { }}
                                                width={140} height={45} text={`₦${NumberWithCommas(Data.best_offer)}`} Style={{}} />
                                        </> :
                                            <>
                                                {User.UUID != Data.buyer &&
                                                    <Popover initialFocusRef={initialFocusRef} trigger={triggerProps => {
                                                        return <>
                                                            <Button

                                                                color={Colors.primary}
                                                                style={{
                                                                    backgroundColor: Colors.primary,
                                                                    width: 120,
                                                                    borderRadius: 9,
                                                                    color: Colors.white,
                                                                    borderColor: Colors.accent,
                                                                    borderWidth: 1
                                                                }}
                                                                {...triggerProps}>
                                                                <BoldText text="Best offer" color={Colors.white} />
                                                            </Button>
                                                        </>;
                                                    }}>
                                                        <Popover.Content width="56">
                                                            <Popover.Arrow />
                                                            {/* <Popover.CloseButton /> */}
                                                            {
                                                                /* @ts-ignore */
                                                            }
                                                            {/* <Popover.Header>Negotiate</Popover.Header> */}
                                                            <Popover.Body >

                                                                <Input rounded="sm" fontSize="xs" ref={initialFocusRef}
                                                                    placeholder='Enter amount'
                                                                    keyboardType='numeric'
                                                                    value={negotiation}
                                                                    onChangeText={(value) => {
                                                                        setnegotiation(value)
                                                                    }}
                                                                />
                                                            </Popover.Body>
                                                            <Popover.Footer>
                                                                <Button.Group>
                                                                    <Button
                                                                        isLoading={loading}
                                                                        isLoadingText='sending..'
                                                                        onPress={() => {
                                                                            InitiateNegotiation(3)
                                                                        }}
                                                                        style={{
                                                                            backgroundColor: Colors.primary,
                                                                            width: 100
                                                                        }}
                                                                    >Bargain</Button>
                                                                </Button.Group>

                                                            </Popover.Footer>
                                                        </Popover.Content>
                                                    </Popover>
                                                }
                                            </>
                                        }


                                    </VStack>
                                </>
                            }
                        </>
                        :
                        <>
                            <Center style={{
                                marginVertical: 130
                            }} >

                                <BoldText color="#000" text="Waiting for response" />

                            </Center>
                        </>}





                </ScrollView>

                {Data.negotiate &&
                    <HStack style={{
                        padding: 30,
                        alignItems: "space-between",
                        justifyContent: "space-around"
                    }}>

                        {Data.deal == null && Data.vendor == User.UUID && <>
                            <CustomButtons
                                Loading={loading}
                                callBack={() => {
                                    // navigation.navigate("Makepayment",{Data})
                                    // console.log(Data)
                                    UpdateNegotiationController(true)
                                }} width={140} height={45} text="Deal" primary Style={{}} />


                            <TouchableOpacity
                                onPress={onOpen}
                            >
                                <Button
                                    isLoading={loading}
                                    style={{
                                        backgroundColor: Colors.accent,
                                        padding: 10,
                                        width: 140,
                                        borderRadius: 9,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: 45,
                                    }}>
                                    <BoldText1 color={Colors.primary} text="No Deal" />
                                </Button>
                            </TouchableOpacity>
                        </>}



                        {Data.deal == false && <Button
                            style={{
                                backgroundColor: Colors.accent,
                                borderRadius: 9,
                                height: 45,
                                width: "100%"
                                // flex: 1
                            }} >
                            <BoldText text="Deal closed" color={Colors.white} />
                        </Button>}

                        {Data.deal == true && Data.payment == null && <>
                            {Data.buyer == User.UUID ?

                                < Button
                                    isLoading={loading}
                                    onPress={() => {
                                        // paystackWebViewRef.current.startTransaction()
                                        navigation.navigate("Makepayment", { Data })
                                    }}
                                    style={{
                                        backgroundColor: Colors.primary,
                                        borderRadius: 9,
                                        height: 45,
                                        width: "100%"
                                        // flex: 1
                                    }} >
                                    <BoldText text="Proceed to checkout" color={Colors.white} />
                                </Button> :
                                <BoldText text="Awaiting payment" color={Colors.dark} />
                            }
                        </>
                        }


                        <VStack>
                            {!Data.dispatch_data &&
                                <>

                                    {Data.buyer == User.UUID &&

                                        <>
                                            <Center>
                                                <BoldText size={15} style={{ marginLeft: 10 }} text="Do you need another delivery service?" color="#000" />
                                            </Center>
                                            <HStack style={{
                                                alignItems: "space-between",
                                                justifyContent: "space-around",
                                                marginTop: 10
                                            }}>
                                                <CustomButtons
                                                    Loading={loading}
                                                    callBack={() => {
                                                        navigation.navigate("Search-delivery", { Data })
                                                    }} width={140} height={45} text="Yes" primary Style={{}} />

                                                <TouchableOpacity onPress={() => {

                                                }}  >
                                                    <Button
                                                        onPress={() => {
                                                            setloading(true)
                                                            cancelDispatchRequest(Data.id)
                                                                .then(response => {
                                                                    setloading(false)
                                                                })
                                                                .catch(error => {
                                                                    setloading(false)
                                                                })
                                                        }}
                                                        isLoading={loading}
                                                        style={{
                                                            backgroundColor: Colors.accent,
                                                            padding: 10,
                                                            width: 140,
                                                            borderRadius: 9,
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            height: 45,
                                                            marginLeft: 20
                                                        }}>
                                                        <BoldText1 color={Colors.primary} text="No" />
                                                    </Button>
                                                </TouchableOpacity>

                                            </HStack>
                                        </>
                                    }
                                </>
                            }

                        </VStack>


                    </HStack>
                }

            </SafeAreaView >


            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                        <Text fontSize="16" color="gray.500" _dark={{
                            color: "gray.300"
                        }}>
                            This will close the negotiation session.
                        </Text>
                    </Box>
                    {/* <Actionsheet.Item
                        onPress={() => {
                            onClose() 
                        }}
                        style={{
                            backgroundColor: Colors.primary,
                            borderRadius: 9,
                            alignItems: "center",
                            justifyContent: "center",
                            color: Colors.white,
                            width: 300
                        }}
                    >
                        <BoldText1 color={Colors.white} size={17} text="Renegotiate" />

                    </Actionsheet.Item> */}
                    <Actionsheet.Item
                        style={{
                            backgroundColor: Colors.accent,
                            borderRadius: 9,
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 20,
                            marginBottom: 20,
                            // width: 200,

                        }}
                        onPress={() => {
                            onClose()
                            UpdateNegotiationController(false)
                        }}
                    >
                        <BoldText color={Colors.primary} size={17} text="End negotiation" />
                    </Actionsheet.Item>

                </Actionsheet.Content>
            </Actionsheet>


            {/* {Data.deal == false && <AlertDialog isOpen={true} >
                <AlertDialog.Content>

                    <AlertDialog.Header>Offer declined</AlertDialog.Header>
                    <AlertDialog.Body>
                        <Center>
                            <BoldText text="Cleaning up" color="grey" />
                            <ActivityIndicator />
                        </Center>
                    </AlertDialog.Body>

                </AlertDialog.Content>
            </AlertDialog>} */}


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


export default connect(mapStateToProps, mapDispatchToProps)(dispatchNegotiation);



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


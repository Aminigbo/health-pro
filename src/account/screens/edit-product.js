import * as React from 'react';
import { ActivityIndicator, StyleSheet, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Actionsheet, Box, HStack, Image, Input, Pressable, Stack, VStack, useDisclose, useToast } from 'native-base';
import { PopularCat, ProductCard } from '../components/product-card';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { BackIcon } from '../../global-components/icons';
import { NumberWithCommas, formatDate } from '../../utils';
import { InitiateNegotiationModel } from '../../services/product-services';
import { Text } from 'react-native-svg';
import { Inputs } from '../../global-components/inputs';
import { FetUserProducts, deleteProductModel } from '../models/product-model';
import { Products } from '../../redux';

const Colors = Color()
function EditProduct({ navigation, appState, route, disp_Products }) {

    const User = appState.User;
    const [Data, setData] = React.useState(route.params.item)
    const toast = useToast()
    const [loading, setloading] = React.useState(false)
    const [negotiation, setnegotiation] = React.useState(null)
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {

        });

        return unsubscribe;


    }, [navigation]);


    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();

    React.useEffect(() => {
        // console.log(route.params)
    }, [])


    function DeleteProduct() {
        deleteProductModel({
            product: Data.id, image: Data.file, UUID: Data.user
        })
            .then(deleted => {
                if (deleted.success == false) {
                    toast.show({
                        title: "An error occured",
                        placement: "top",
                        duration: 1000,
                    })
                }

                toast.show({
                    title: "Product deleted successfully",
                    placement: "top",
                    duration: 1000,
                    onCloseComplete: () => {
                        FetUserProducts({ UUID: User.UUID })
                            .then(response => {
                                if (response.success == false) {
                                    setloading(false)

                                } else {
                                    disp_Products(response.data)
                                    navigation.pop()
                                }
                            })
                    }
                })


            })
            .catch(error => {
                console.log(error)
                setloading(false)
            })
    }

    // return User == null ? navigation.replace("Login") : (
    return (
        <>
            {/* {console.log(Data.user)} */}

            <SafeAreaView style={styles.container} >
                <HStack style={{
                    padding: 10,
                    marginTop: 20,
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <BackIcon navigation={navigation} />
                </HStack>
                <ScrollView >



                    <VStack style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 15,
                        marginTop: 2,
                        marginBottom: 20
                    }}>
                        <BoldText1 size={19} text={Data.name} color="#000" />
                        <BoldText text={Data.category} color="#000" />
                    </VStack>


                    <HStack style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: "center",
                    }} >
                        <Pressable

                            onPress={() => {
                                // navigation.navigate("ViewProduct")
                            }}
                            style={{
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <Image
                                style={{
                                    height: 260,
                                    // zIndex: 1000
                                    objectFit: "cover",
                                    aspectRatio: 1,
                                }}
                                source={{
                                    uri: `https://ypxvrpogluvtermjqiro.supabase.co/storage/v1/object/public/products/${Data.file}`
                                }} alt="Alternate Text" size="xl" />

                        </Pressable>
                    </HStack>


                    <HStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 20
                    }}>
                        <BoldText1 size={14} text="Estimated price" color="#000" />
                        <BoldText size={12} text={`₦${NumberWithCommas(Data.price)}`} color="#000" />
                    </HStack>
                    <HStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 20
                    }}>
                        <BoldText1 size={14} text="Harvest date" color="#000" />
                        <BoldText size={12} text={formatDate(Data.harvest_date)} color="#000" />
                    </HStack>
                    <HStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 20
                    }}>
                        <BoldText1 size={14} text="Category" color="#000" />
                        <BoldText size={12} text={Data.category} color="#000" />
                    </HStack>

                    <VStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 20
                    }}>
                        <BoldText1 size={14} text="Description" color="#000" />
                        <BoldText size={12} text={Data.Description} color="#000" />
                    </VStack>

                    <CustomButtons
                    bg="crimson"
                    width="90%"
                    height={50}
                    text="Delete product"
                    Style={{
                        marginBottom: 20,
                        marginTop: 20,
                        marginLeft: "5%", 
                        // opacity: Data.user == User.UUID ? 0.2 : 1
                    }}
                        Loading={loading}
                        callBack={() => {
                            setloading(true)
                            DeleteProduct()
                        }} />
                </ScrollView>
            </SafeAreaView >



            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Box w="100%" h={490} px={4} justifyContent="flex-start" >
                        <Text fontSize="16" color="gray.500" _dark={{
                            color: "gray.300"
                        }}>
                            This will close the negotiation session.
                        </Text>
                        <Inputs
                            placeholder="What's your bargain?"
                            data={negotiation}
                            setData={setnegotiation}
                            type="numeric" />
                        <Actionsheet.Item
                            isLoading={loading}
                            onPress={() => {
                                setloading(true)
                                InitiateNegotiationModel({ product: Data.id, amount: negotiation, UUID: User.UUID, stage: 1 })
                                    .then(response => {
                                        // console.log(response)
                                        if (response.success == false) {
                                            setloading(false)
                                            return toast.show({
                                                render: () => {
                                                    return <Box bg="crimson.500" px="2" py="1" rounded="sm" mb={5}>
                                                        {response.message}
                                                    </Box>;
                                                }
                                            });
                                        }
                                        setloading(false)
                                        navigation.navigate("Negotiate", { NewData: response.data })
                                    }).catch(error => {
                                        // console.log(error)
                                        setloading(false)
                                        toast.show({
                                            render: () => {
                                                return <Box bg="crimson.500" px="2" py="1" rounded="sm" mb={5}>
                                                    error fetching products
                                                </Box>;
                                            }
                                        });
                                    })
                            }}
                            style={{
                                backgroundColor: Colors.primary,
                                borderRadius: 9,
                                alignItems: "center",
                                justifyContent: "center",
                                color: Colors.white,
                                // width: 300
                            }}
                        >

                            {loading == true ?
                                <ActivityIndicator />
                                :
                                <BoldText1 color={Colors.white} size={17} text="Make offer" />
                            }

                        </Actionsheet.Item>
                    </Box>


                </Actionsheet.Content>
            </Actionsheet>


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
        disp_Products: (payload) => dispatch(Products(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);



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


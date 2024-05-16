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

const Colors = Color()
function Vieworder({ navigation, appState, route }) {

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


            <SafeAreaView style={styles.container} >


                <HStack style={{
                    padding: 10,
                    marginTop: 20,
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <BackIcon navigation={navigation} />
                </HStack>
                <ScrollView  >




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
                                    uri: `https://ypxvrpogluvtermjqiro.supabase.co/storage/v1/object/public/products/${Data.product_objects.file}`
                                }} alt="Alternate Text" size="xl" />

                        </Pressable>
                    </HStack>


                    <VStack style={{
                        // justifyContent: "center",
                        // alignItems: "center",
                        marginHorizontal: 15,
                        marginVertical: 15,
                    }}>
                        {Data.dispatch == true ?
                            <BoldText size={14} text="Delivered" color={Colors.primary} />
                            :
                            <BoldText size={14} text="Not Delivered" color="crimson" />
                        }

                    </VStack>

                    <HStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 20,
                        backgroundColor: Colors.lightgray,
                        padding: 15,
                        borderRadius: 8
                    }}>
                        <HStack>
                            <BoldText size={14} text="Payment method" color="#000" />
                        </HStack>
                        <HStack>
                            <BoldText1 size={14} text="Paystack " color="#000" />
                            <CheckFullIcon status />
                        </HStack>
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


                    <VStack style={{
                        justifyContent: "space-between",
                        alignItems: "space between",
                        marginHorizontal: 15,
                        marginTop: 20
                    }}>
                        <BoldText1 size={14} text="Description" color="#000" />
                        <BoldText text={Data.product_objects.Description} color="#000" />
                    </VStack>


                    <VStack style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 15,
                        marginBottom: 50,
                        marginTop: 30
                    }}>
                        <BoldText size={14} text="Total price" color="#000" />
                        <BoldText2 size={19} style={{ marginTop: 6 }} text={`₦${NumberWithCommas(Data.best_price)}`} color="#000" />
                    </VStack>



                    {/* <CustomButtons width="90%" height={50} text="Buy again" Style={{
                        marginBottom: 50,
                        marginLeft: "5%"
                    }} callBack={() => {
                        navigation.navigate("Negotiate")
                    }} /> */}
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


export default connect(mapStateToProps, mapDispatchToProps)(Vieworder);



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


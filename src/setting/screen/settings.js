import * as React from 'react';
import { StyleSheet, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Divider, HStack, HamburgerIcon, Image, Input, Menu, Pressable, Stack, VStack } from 'native-base';
import { PopularCat, ProductCard } from '../components/product-card';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { ArrowForward, BackIcon, NotificationIcon } from '../../global-components/icons';
import { CheckFullIcon, CheckOutlineIcon } from '../../delivery/components/icons';
import { Inputs } from '../../global-components/inputs';

const Colors = Color()
function Accountsetting({ navigation, appState }) {

    const User = appState.User;


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



                <ScrollView style={{ padding: 10 }} >
                    <HStack style={{
                        // padding: 10,
                        // marginTop: 20,
                        justifyContent: "space-between",
                        // alignItems: "center"
                    }}>
                        <HStack style={{
                            justifyContent: "center",
                            alignItems: "center"
                        }} >
                            <Image
                                style={{
                                    height: 70,
                                    width: 70,
                                    borderRadius: 55,
                                    objectFit: "cover",
                                }}
                                source={{
                                    uri: `https://cdn-icons-png.flaticon.com/512/4018/4018431.png`
                                }} alt="Alternate Text" size="xl" />

                            <VStack style={{ marginLeft: 10 }}>
                                <BoldText1 size={13} text="Frank Lawson" color="#000" />
                                <BoldText size={12} text="License 562829" color="#000" />
                            </VStack>

                        </HStack>

                    </HStack>
                    <BoldText size={12} color="#000"
                        text="Account type"
                        style={{ marginBottom: 10, marginTop: 20 }}
                    />
                    <Inputs
                        isDisabled={true}
                        data="Vendor"
                        type="email-address"
                        onChange={() => {

                        }} placeholder="Harvesting Date" />

                    <BoldText size={12} color="#000"
                        text="Full Name"
                        style={{ marginBottom: 10 }}
                    />
                    <Inputs
                        isDisabled={true}
                        data="Aminigbo paul"
                        type="email-address"
                        onChange={() => {

                        }} placeholder="Harvesting Date" />

                    <BoldText size={12} color="#000"
                        text="Email"
                        style={{ marginBottom: 10 }}
                    />
                    <Inputs
                        isDisabled={true}

                        data="aminigbopaul@gmail.com"
                        type="email-address"
                        onChange={() => {

                        }} placeholder="Harvesting Date" />

                    <BoldText size={12} color="#000"
                        text="Phone"
                        style={{ marginBottom: 10 }}
                    />
                    <Inputs
                        isDisabled={true}
                        data="2349011684637"
                        type="email-address"
                        onChange={() => {

                        }}
                    // placeholder="Harvesting Date" 
                    />



                    {/* <CustomButtons primary width="90%" height={50} text="Logout" Style={{
                        marginBottom: 50,
                        marginLeft: "5%",
                        marginTop: 20
                        // backgroundColor:Colors.danger
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


export default connect(mapStateToProps, mapDispatchToProps)(Accountsetting);



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


import * as React from 'react';
import { StyleSheet, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utils/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Divider, HStack, HamburgerIcon, Image, Input, Menu, Pressable, Stack, VStack } from 'native-base';
import { PopularCat, ProductCard } from '../components/product-card';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { ArrowForward, BackIcon, NotificationIcon } from '../../global-components/icons';
import { CheckFullIcon, CheckOutlineIcon } from '../../delivery/components/icons';
import { User } from '../../redux';

const Colors = Color()
function Settings({ navigation, appState, disp_Login }) {

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
                            <BoldText1 size={13} text={User && User.name} color="#000" />
                            <BoldText size={12} text={User && User.UUID.slice(-10)} color="#000" />
                        </VStack>

                    </HStack>

                </HStack>

                <ScrollView  >


                    {
                        [
                            // { text: "Profile", link: "" },
                            { text: "History", link: "Orders" },
                            { text: "Settings", link: "Account-setting" },
                            { text: "Help & Support", link: "" },
                            { text: "Community", link: "" },
                            { text: "About Us", link: "" }

                        ].map((items, index) => {
                            return <TouchableOpacity onPress={() => {
                                if (items.text == "Settings") {
                                }
                                navigation.navigate(items.link)
                            }} key={index} style={{
                                justifyContent: "space-between",
                                alignItems: "space between",
                                marginHorizontal: 15,
                                marginTop: 20,
                                backgroundColor: Colors.lightgray,
                                padding: 15,
                                borderRadius: 8,
                                display: "flex",
                                flexDirection: "row"
                            }}>
                                <HStack>
                                    <BoldText size={14} text={items.text} color="#000" />
                                </HStack>
                                <ArrowForward color={Colors.primary} />
                            </TouchableOpacity>
                        })
                    }





                    <CustomButtons primary width="90%" height={50} text="Logout" Style={{
                        marginBottom: 50,
                        marginLeft: "5%",
                        marginTop: 30
                        // backgroundColor:Colors.danger
                    }} callBack={() => {
                        disp_Login(null)
                        navigation.replace("Login")
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
        disp_Login: (payload) => dispatch(User(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Settings);



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


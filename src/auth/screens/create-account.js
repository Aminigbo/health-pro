import * as React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Inputs } from '../../global-components/inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center, HStack, VStack, Stack, Alert, CloseIcon, Text, IconButton, AlertDialog, Button, Switch, Actionsheet, Box, useDisclose, useToast, Image } from 'native-base';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { AppLogo, ArrowDown, EmailIcon } from '../../global-components/icons';
import { Color } from '../../utils/colors';
import { CustomButtons, LinkButtons } from '../../global-components/buttons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { isValidEmail } from '../../utils/validations';
import { PublicSignupModel, SignupModel, UserPublicSignupModel } from '../models/signup-model';
import { User, initAuth } from '../../redux';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Colors = Color()

function Signup({ navigation, disp_Login, set_initAuth }) {
    const [name, setname] = React.useState(null);
    const [phone, setphone] = React.useState(null);
    const [email, setemail] = React.useState(null);
    const [password, setpassword] = React.useState(null);
    const [password2, setpassword2] = React.useState("");
    const [location, setlocation] = React.useState("");
    const [city, setcity] = React.useState(null)
    const [Loading, setLoading] = React.useState(false);
    const [SelectType, setSelectType] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    const [Data, setData] = React.useState(null)
    const [error, seterror] = React.useState({
        status: false,
        msg: ""
    });
    const toast = useToast()

    const toastAlert = (type, title, message) => {

        return toast.show({
            placement: "top",
            duration: 3000,
            render: () => {
                return <Alert status="danger" colorScheme="danger"> <VStack w="300">
                    <HStack justifyContent="space-between">
                        <HStack flexShrink={1} space={2}  >
                            <Alert.Icon />
                            <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                {title}
                            </Text>
                        </HStack>
                        <IconButton onPress={() => { toast.closeAll(); }} variant="unstyled" _focus={{
                            borderWidth: 0
                        }} icon={<CloseIcon size="3" />} _icon={{
                            color: "coolGray.600"
                        }} />
                    </HStack>
                    <Box pl="6" _text={{
                        color: "coolGray.600"
                    }}>
                        {message}
                    </Box>
                </VStack>
                </Alert>;
            }
        });
    }

    async function CreateAccount() {
        let fcmToken = await AsyncStorage.getItem("FcmToken")
        if (!name || !password || !city || !phone) {

            return toastAlert('danger', "Error", "Fill out all forms")

        }
        else if (name && name.split(" ").length < 2) {
            toastAlert('danger', "Error", "Provide your fullname")
        } else if (password && password.length < 6) {
            toastAlert('danger', "Error", "Password length must be at least six characters")
        } else {
            setLoading(true)

            setTimeout(() => {
                setLoading(false)
                setIsOpen(!isOpen)
                // set_initAuth()
                // disp_Login({

                // })
            }, 3000);
        }
    }


    function AlertDialogue() {
        return <>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={() => {
                // navigation.push("Home");
                navigation.push("EnterOTP", { OTP: Data.OTP, UUID: Data.UUID, name: Data.name })
                onClose()
            }}>
                <AlertDialog.Content>
                    {/* <AlertDialog.CloseButton onPress={() => {
                        navigation.push("Home")
                        navigation.push("EnterOTP")
                    }} /> */}
                    <AlertDialog.Header>Account Created</AlertDialog.Header>
                    <AlertDialog.Body>
                        Your Health-Pro account have been created successfully, proceed to dashboard.
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>

                            <Button colorScheme="success" style={{backgroundColor:Colors.primary}} onPress={() => {
                                set_initAuth()
                                disp_Login({
                                    name,
                                    phone,
                                    city,
                                    password
                                })
                                navigation.push("Home");
                                onClose()
                            }}>
                                Proceed
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    }



    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={Colors.primary}
                barStyle="dark-content"
            // showHideTransition={statusBarTransition}
            // hidden={hidden}
            />
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <Stack style={{
                        // paddingHorizontal: 10, 
                    }} >
                        <AlertDialogue />

                        <VStack mb={10} style={{
                            height: 200,
                            backgroundColor: Colors.primary,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            // borderBottomLeftRadius:30,
                            // borderBottomRightRadius:30,
                        }} >

                            <Image
                                style={{ width: "55%", height: "25%", marginBottom: 20 }}
                                source={require('../../assets/icon.png')}
                                alt='Health-pro' />

                            <BoldText1 size={20} color={Colors.white}
                                text="Sign up"
                            />

                        </VStack>

                        <Stack style={{
                            paddingHorizontal: 10,
                        }} >
                            <BoldText size={13} color="#000"
                                text="Fullname"
                                style={{ marginBottom: 4 }}
                            />

                            <Inputs data={name}
                                setData={setname} placeholder="Name" />


                            <BoldText size={13} color="#000"
                                text="Phone number"
                                style={{ marginBottom: 4 }}
                            />

                            <Inputs data={phone}
                                type="numeric"
                                setData={setphone} placeholder="Phone number" />


                            <BoldText size={13} color="#000"
                                text="Your city"
                                style={{ marginBottom: 4 }}
                            />
                            <TouchableOpacity onPress={() => { setSelectType(true) }} style={{
                                justifyContent: "space-between",
                                alignItems: "space between",
                                // marginHorizontal: 15,
                                marginBottom: 20,
                                backgroundColor: Colors.white,
                                padding: 10,
                                borderRadius: 8,
                                display: "flex",
                                flexDirection: "row",
                                borderWidth: 1,
                                borderColor: "lightgrey"
                            }}>
                                <HStack>
                                    <BoldText size={14} text={city ? city : "Select your city"} color="#000" />
                                </HStack>
                                <ArrowDown color={Colors.primary} />
                            </TouchableOpacity>





                            <BoldText size={13} color="#000"
                                text="Password"
                                style={{ marginBottom: 4 }}
                            />
                            <Inputs data={password}
                                setData={setpassword} type="visible-password" placeholder="Password" />

                            {/* <BoldText size={13} color="#000"
                            text="Confirm Password"
                            style={{ marginBottom: 10 }}
                        />
                        <Inputs data={password2}
                            setData={setpassword2} type="visible-password" placeholder="Confirm Password" /> */}
                            {/* <VStack mt={1} >
                                <HStack
                                    style={{
                                        justifyContent: "center",
                                    }}
                                >
                                    <BoldText
                                        size={13}
                                        color="grey"
                                        text="By registering, you are agreeing with our Terms of Use and Privacy Policy" />
                                </HStack>

                            </VStack> */}
                            <VStack
                                style={{
                                    marginTop: 10
                                }}
                            // mt={10}
                            >
                                <HStack style={{
                                    justifyContent: "center"
                                }} >
                                    <CustomButtons Loading={Loading} LoadingText="Please wait..." callBack={() => {
                                        // 
                                        CreateAccount()
                                        // navigation.push("Verify")
                                        // navigation.push("EnterOTP")

                                    }} primary width={333} height={50} text="Get started" />
                                </HStack>
                                <HStack mt={5} mb={10} style={{
                                    justifyContent: "center"
                                }} >
                                    <BoldText color="#000" text="Already have an account?" />
                                    <LinkButtons
                                        text="Sign in"
                                        callBack={() => {
                                            navigation.push("Login")
                                        }} />
                                </HStack>
                            </VStack>
                        </Stack>

                    </Stack>
                </ScrollView>
            </SafeAreaView>


            <Actionsheet isOpen={SelectType} onClose={() => { setSelectType(false) }}>
                <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                        <Text fontSize="16" color="gray.500" _dark={{
                            color: "gray.300"
                        }}>
                            Select your city
                        </Text>
                    </Box>
                    <Actionsheet.Item onPress={() => { setLoading(false); setSelectType(false); setcity("Buyer Account") }} >Buyer account</Actionsheet.Item>
                    <Actionsheet.Item onPress={() => { setSelectType(false); setcity("Logistics Account") }} >Logistics account</Actionsheet.Item>
                    <Actionsheet.Item onPress={() => { setSelectType(false); setcity("Vendor Account") }} >Vendor / Seller account</Actionsheet.Item>
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
        disp_Login: (payload) => dispatch(User(payload)),
        set_initAuth: (payload) => dispatch(initAuth()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Signup);




const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 10,
        backgroundColor: "#fff"
    }
})


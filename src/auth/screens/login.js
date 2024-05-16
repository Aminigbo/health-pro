import * as React from 'react';
import { Pressable, StatusBar, StyleSheet } from 'react-native';
import { Inputs } from '../../global-components/inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center, HStack, VStack, Stack, Alert, Text, IconButton, CloseIcon, useToast, Box, Image } from 'native-base';
import { BoldText, BoldText1 } from '../../global-components/texts';
import { EmailIcon } from '../../global-components/icons';
import { Color } from '../../utils/colors';
import { CustomButtons, LinkButtons } from '../../global-components/buttons';
import { ScrollView } from 'react-native-gesture-handler';
import { isValidEmail } from '../../utils/validations';
import { LoginModel } from '../models/login-model';
import { User, initAuth } from '../../redux';
import { connect } from 'react-redux';
import { RequestUserPermission } from '../../utils/fcmtoken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateRiderOrderTokens, UpdateRiderPublicToken, UpdateUserOrderTokens, UpdateUserPublicTable } from '../models/update-profile';
const Colors = Color()

function Login({ navigation, disp_Login, set_initAuth }) {
    let [email, setemail] = React.useState(null)
    let [password, setpassword] = React.useState(null)
    const toast = useToast()

    const [Loading, setLoading] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    const [error, seterror] = React.useState({
        status: false,
        msg: ""
    });


    async function Login() {
        if (!password || !email ) {

            return toast.show({
                placement: "top",
                duration: 3000,
                render: () => {
                    return <Alert status="danger" colorScheme="danger"> <VStack w="300">
                        <HStack justifyContent="space-between">
                            <HStack flexShrink={1} space={2}  >
                                <Alert.Icon />
                                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                    Error
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
                            Fill out all forms
                        </Box>
                    </VStack>
                    </Alert>;
                }
            });

        }  else {
            set_initAuth()
            disp_Login({
                name:"Helen John",
                phone:"09011684637",
                city:"Port Harcourt",
                password:"123456"
            })
            navigation.replace("Home")

        }
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
            {/* {error.status == true && <Error />} */}
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <Stack style={{}} >

                        <VStack mb={10} style={{
                            height: 200,
                            backgroundColor: Colors.primary,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }} >

                            <Image
                                style={{ width: "55%", height: "25%", marginBottom: 20 }}
                                source={require('../../assets/icon.png')}
                                alt='Health-pro' />

                            <BoldText1 size={20} color={Colors.white}
                                text="Sign in"
                            />

                        </VStack>

                        <Stack style={{
                            paddingHorizontal: 10,
                            marginTop: 30
                        }}>


                            <BoldText size={16} color="#000"
                                text="Phone"
                                style={{ marginBottom: 10 }}
                            />

                            <Inputs
                                data={email}
                                // data="ogapredictor@gmail.com"
                                setData={setemail} type="numeric" placeholder="Enter Phone number" />

                            <BoldText size={16} color="#000"
                                text="Password"
                                style={{ marginBottom: 10 }}
                            />

                            <Inputs
                                // data="123456"
                                data={password}
                                setData={setpassword} type="visible-password" placeholder="Enter Password" />
                            {/* <VStack mt={1} >
                            <HStack justifyContent={"flex-end"} >
                                <Pressable onPress={() => {
                                    // navigation.push("GetOTP")
                                    setLoading(false)
                                }} >
                                    <BoldText color="#000" text="Forgot Password?" />
                                </Pressable>

                            </HStack>

                        </VStack> */}
                            <VStack mt={10} >
                                <HStack style={{
                                    justifyContent: "center"
                                }}  >
                                    <CustomButtons callBack={() => {
                                        // navigation.replace("Home")
                                        Login()
                                    }}
                                        primary Loading={Loading} LoadingText="Please wait..." width={333} height={50} text="Sign in" />
                                </HStack>
                                <HStack mt={5} style={{
                                    justifyContent: "center"
                                }} >
                                    <BoldText1 text="Don't have an account?" />
                                    <LinkButtons
                                        text="Sign up"
                                        callBack={() => {

                                            navigation.push("Signup")
                                        }} />
                                </HStack>

                            </VStack>
                        </Stack>
                    </Stack>
                </ScrollView>
            </SafeAreaView>
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


export default connect(mapStateToProps, mapDispatchToProps)(Login);




const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 10,
        backgroundColor: "#fff"
    }
})

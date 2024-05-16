import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Inputs } from '../../global-components/inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center, HStack, VStack, Stack, AlertDialog, Button, Modal, useToast, Box } from 'native-base';
import { BoldText, BoldText1 } from '../../global-components/texts';
import { BackIcon, EmailIcon } from '../../global-components/icons';
import { Color } from '../../utils/colors';
import { CustomButtons } from '../../global-components/buttons';
import { ScrollView } from 'react-native-gesture-handler';
import { ResetPasswordAPI } from '../models/requestotp';
import { VerifyAccountModel } from '../models/verify-account';
const Colors = Color()

function EnterOTP({
    navigation, route
}) {

    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpen2, setIsOpen2] = React.useState(false);
    const onClose = () => {
        setIsOpen(false);
        setIsOpen2(false);
    };
    const cancelRef = React.useRef(null);
    const [loading, setloading] = React.useState(null)
    const [data, setdata] = React.useState(null)
    const [otp, setotp] = React.useState(null)
    const [password, setpassword] = React.useState(null)
    const toast = useToast()


    function ResetPassword() {

        ResetPasswordAPI({
            uuid: data.uuid,
            password: password
        })
            .then(response => {
                if (response.success == true) {
                    setIsOpen(false)
                    setIsOpen2(true)
                } else {
                    // setIsOpen(false)
                    toast.show({
                        placement: "top",
                        render: () => {
                            return <Box bg="orange.500" px="2" py="1" rounded="sm" mb={5}>
                                {response.message}
                            </Box>
                        }
                    })
                }
            })
    }

    function AlertDialogue() {
        return <>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen2} onClose={() => {
                navigation.push("Login");
                onClose()
            }}>
                <AlertDialog.Content style={{ marginTop: -200 }}>
                    <AlertDialog.CloseButton onPress={() => {
                        navigation.push("Login");
                        onClose()
                    }} />
                    <AlertDialog.Header>Success</AlertDialog.Header>
                    <AlertDialog.Body>
                        Your password reset was successful.
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button colorScheme="success" onPress={() => {
                                navigation.push("Login");
                                onClose()
                            }}>
                                Login
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    }

    function VerifyOTP() {
        if (otp != data.OTP) {
            toast.show({
                placement: "top",
                render: () => {
                    return <Box bg="orange.500" px="2" py="1" rounded="sm" mb={5}>
                        Invalid OTP
                    </Box>
                }
            })
        } else {
            if (data.changePWD) {
                return setIsOpen(true)
            }
            VerifyAccountModel(data.UUID)
                .then(response2 => {
                    if (response2.success == true) {
                        return navigation.replace("Verify", { UUID: data.UUID, name: data.name })
                    }

                    toast.show({
                        placement: "top",
                        render: () => {
                            return <Box bg="orange.500" px="2" py="1" rounded="sm" mb={5}>
                                {response2.message}
                            </Box>
                        }
                    })

                })
                .catch(error => {
                    toast.show({
                        placement: "top",
                        render: () => {
                            return <Box bg="orange.500" px="2" py="1" rounded="sm" mb={5}>
                                An error occured
                            </Box>
                        }
                    })
                })

        }
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setdata(route.params)
            console.log(route.params)
        });
        return unsubscribe;

    }, [])




    return (
        <>
            {/* {console.log(data)} */}
            <Modal size="xl" isOpen={isOpen} onClose={(e) => {
                // setIsOpen(false) 
            }}>
                <Modal.Content maxWidth="400px" style={{ marginTop: -200 }} >
                    {/* <Modal.CloseButton /> */}
                    <Modal.Header>Reset your password</Modal.Header>
                    <Modal.Body>
                        <Inputs
                            type="visible-password"
                            data={password}
                            setData={setpassword}
                            placeholder="Enter new password"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => navigation.pop()}>
                                Cancel
                            </Button>
                            <Button
                                isLoading={loading}
                                isLoadingText='Please wait'
                                style={{
                                    // backgroundColor: profileUpdateData != null ? Colors.primary : "grey"
                                }} onPress={() => {
                                    if (password) { ResetPassword() }
                                }}>
                                Save
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <AlertDialogue />

            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <VStack  >
                        <HStack style={{

                            marginTop: 50
                        }} >
                            <BackIcon navigation={navigation} />
                            <BoldText1 color="black"
                                style={{ marginLeft: 48 }}
                                text="Enter Your Authentication Code" />
                        </HStack>

                        <HStack style={{
                            alignItems: "center",
                            marginTop: 50,
                            marginLeft: 10,
                        }} >
                            <BoldText
                                color="grey"
                                text="We have sent an authentication code to your
                                registered email to help you finish your
                                WasteMoni registration."
                            />
                        </HStack>


                    </VStack>

                    <VStack style={{
                        marginTop: 40,
                    }}  >
                        <Stack style={{ width: "50%", marginLeft: "25%" }} >
                            <Inputs data={otp} setData={setotp} type="numeric" placeholder="Enter OTP" />
                        </Stack>

                        <BoldText style={{ marginTop: 40 }} text="Resend code" />

                        <HStack style={{
                            marginTop: 40,
                        }} >
                            <CustomButtons callBack={() => {
                                if (data) {
                                    VerifyOTP()
                                } else {
                                    navigation.pop()
                                }
                                // navigation.push("Verify")
                            }} primary width={333} height={50} text="Authenticate" />
                        </HStack>

                    </VStack>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        flex: 1
    }
})


export default EnterOTP;
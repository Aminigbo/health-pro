import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Inputs } from '../../global-components/inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center, HStack, VStack, Stack, useToast, Box } from 'native-base';
import { BoldText, BoldText1 } from '../../global-components/texts';
import { BackIcon, EmailIcon } from '../../global-components/icons';
import { Color } from '../../utils/colors';
import { CustomButtons } from '../../global-components/buttons';
import { ScrollView } from 'react-native-gesture-handler';
import { RequestOTP_Call } from '../models/requestotp';
import { isValidEmail } from '../../utils/validations';
const Colors = Color()
function GetOTP({
    navigation
}) {
    const [loading, setloading] = React.useState(null)
    const [email, setemail] = React.useState("")
    const toast = useToast()

    function GetOTPAPI() {
        setloading(true)
        RequestOTP_Call(email)
            .then(response => {
                if (response.success == true) {
                    navigation.replace("EnterOTP", response.data)
                } else {  
                    toast.show({
                        placement: "top",
                        render: () => {
                            return <Box bg="orange.500" px="2" py="1" rounded="sm" mb={5}>
                                {response.message}
                            </Box>
                        }
                    })
                } 
                setloading(false)
            })
            .catch(error => { 
                toast.show({
                    placement: "top",
                    render: () => {
                        return <Box bg="orange.500" px="2" py="1" rounded="sm" mb={5}>
                            A network error occured
                        </Box>;
                    }
                })
                setloading(false)
            })
    }

    return (
        <>
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <VStack  >
                        <HStack style={{

                            marginTop: 50
                        }} >
                            <BackIcon navigation={navigation} />
                            <BoldText1 color="black"
                                style={{ marginLeft: 48 }}
                                text="Request OTP" />
                        </HStack>

                        <HStack style={{
                            alignItems: "center",
                            marginTop: 50,
                            marginLeft: 10,
                        }} >
                            <BoldText
                                color="grey"
                                text="Enter your registered email to reset your password"
                            />
                        </HStack>


                    </VStack>

                    <VStack style={{
                        marginTop: 40,
                    }}  >
                        <Inputs
                            data={email}
                            setData={setemail}
                            type="email-address" placeholder="Email address" />
                        <HStack style={{
                            marginTop: 40,
                        }} >
                            {isValidEmail(email) == true && <>
                                <CustomButtons Loading={loading} LoadingText="Please wait.." callBack={() => {
                                    // navigation.replace("EnterOTP")
                                    GetOTPAPI()
                                }} primary width={333} height={58} text="Next" />

                            </>}
                        </HStack>

                    </VStack>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    }
})


export default GetOTP;
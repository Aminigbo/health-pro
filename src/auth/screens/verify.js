import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Inputs } from '../../global-components/inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center, HStack, VStack, Stack, Alert, CloseIcon, Text, IconButton, AlertDialog, Button, Switch, Input, Actionsheet, Box, Image, useToast, CheckCircleIcon } from 'native-base';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { AddIcon, ArrowDown, EditIcon, EmailIcon, UploadFileIcon } from '../../global-components/icons';
import { Color } from '../../utils/colors';
import { CustomButtons, LinkButtons } from '../../global-components/buttons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { isValidEmail } from '../../utils/validations';
import { PublicSignupModel, SignupModel, UserPublicSignupModel } from '../models/signup-model';
import { User, initAuth } from '../../redux';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImagePicker } from '../../utils';
import { ActivateAccountModel } from '../models/verify-account';
import { supabase } from '../../../configurations/supabase-config';
import axios from 'axios';
const Colors = Color()

function Verify({ navigation, route, disp_Login }) {
    const [name, setname] = React.useState(null);
    const [miniloading, setminiloading] = React.useState(false);
    const [Data, setData] = React.useState(route.params);
    const [description, setdescription] = React.useState(null);
    const [accountname, setaccountname] = React.useState(null);
    const [accountnumber, setaccountnumber] = React.useState("");
    const [Loading, setLoading] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [AccountBank, setAccountBank] = React.useState("")
    const [bankCode, setbankCode] = React.useState("")
    const [SelectBank, setSelectBank] = React.useState(false)
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    const [PickedImage, setPickedImage] = React.useState({
        status: false
    })
    let toast = useToast()

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

    function UpdateDetails() {
        if (!name || !description || !accountname || !accountnumber || !AccountBank) {

            return toastAlert("danger", "Error", "You cannot submit an empty form.")

        }
        // console.log(PickedImage)
        setLoading(true)
        supabase.storage
            .from("ID_card")
            .upload(PickedImage.fileName, PickedImage.formData)
            .then(response => {
                let Img = response.data.path;
                // console.log(response)
                // setLoading(false)
                ActivateAccountModel({
                    UUID: Data.UUID, IDCard: Img,
                    name, description, accountname, accountnumber, AccountBank
                })
                    .then(response => {
                        // setLoading(false)
                        disp_Login(response.data)
                        navigation.replace("Home")
                    })
                    .catch(error => {
                        console.log(error)
                        setLoading(false)
                        return seterror({
                            status: true,
                            msg: "An error occured"
                        })
                    })

            })

    }

    const inputRef = React.useRef(null);

    const nigerianBanks = [ 
        {
            "name": "Access Bank Nigeria",
            "code": "044",
            "type": "Commercial Bank"
        },
        {
            "name": "Citibank Nigeria",
            "code": "023",
            "type": "Commercial Bank"
        },
        {
            "name": "Coronation Merchant Bank",
            "code": "559",
            "type": "Commercial Bank"
        },
        {
            "name": "Ecobank Nigeria",
            "code": "050",
            "type": "Commercial Bank"
        },
        {
            "name": "Fidelity Bank Nigeria",
            "code": "070",
            "type": "Commercial Bank"
        },
        {
            "name": "First Bank of Nigeria",
            "code": "011",
            "type": "Commercial Bank"
        },
        {
            "name": "First City Monument Bank (FCMB)",
            "code": "214",
            "type": "Commercial Bank"
        },
        {
            "name": "Globus Bank",
            "code": "001",
            "type": "Commercial Bank"
        },
        {
            "name": "Guaranty Trust Bank (GTBank)",
            "code": "058",
            "type": "Commercial Bank"
        },
        {
            "name": "Heritage Bank Plc",
            "code": "030",
            "type": "Commercial Bank"
        },
        {
            "name": "Keystone Bank Limited",
            "code": "082",
            "type": "Commercial Bank"
        },
        {
            "name": "Polaris Bank",
            "code": "076",
            "type": "Commercial Bank"
        },
        {
            "name": "Providus Bank",
            "code": "101",
            "type": "Commercial Bank"
        },
        {
            "name": "Stanbic IBTC Bank Nigeria",
            "code": "221",
            "type": "Commercial Bank"
        },
        {
            "name": "Standard Chartered Bank Nigeria",
            "code": "068",
            "type": "Commercial Bank"
        },
        {
            "name": "Sterling Bank Nigeria",
            "code": "232",
            "type": "Commercial Bank"
        },
        {
            "name": "SunTrust Bank Nigeria Limited",
            "code": "100",
            "type": "Commercial Bank"
        },
        {
            "name": "Titan Trust Bank Limited",
            "code": "022",
            "type": "Commercial Bank"
        },
        {
            "name": "Union Bank of Nigeria",
            "code": "032",
            "type": "Commercial Bank"
        },
        {
            "name": "United Bank for Africa (UBA)",
            "code": "033",
            "type": "Commercial Bank"
        },
        {
            "name": "Unity Bank Plc",
            "code": "215",
            "type": "Commercial Bank"
        },
        {
            "name": "Wema Bank Nigeria",
            "code": "035",
            "type": "Commercial Bank"
        },
        {
            "name": "Zenith Bank Nigeria",
            "code": "057",
            "type": "Commercial Bank"
        },
        {
            "name": "Jaiz Bank Plc",
            "code": "301",
            "type": "Non-Interest Bank"
        },
        {
            "name": "Bank of Industry (BOI)",
            "code": "030",
            "type": "Development Finance Institution"
        },
        {
            "name": "Bank of Agriculture (BOA)",
            "code": "030",
            "type": "Development Finance Institution"
        },
        {
            "name": "Nigeria Export-Import Bank (NEXIM)",
            "code": "030",
            "type": "Development Finance Institution"
        },
        {
            "name": "Development Bank of Nigeria (DBN)",
            "code": "030",
            "type": "Development Finance Institution"
        },
        {
            "name": "Microfinance Banks",
            "code": "N/A",
            "type": "Microfinance Bank"
        }
    ];

    function AlertDialogue() {
        return <>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={() => {
                navigation.push("Home");
                onClose()
            }}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton onPress={() => {
                        navigation.push("Home")
                    }} />
                    <AlertDialog.Header>Account Created</AlertDialog.Header>
                    <AlertDialog.Body>
                        Your Fastapp account have been created successfully, proceed to send your
                        first package.
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>

                            <Button colorScheme="success" onPress={() => {
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

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setData(route.params)
            console.log(route.params)
        });
        return unsubscribe;

    }, [])



    const FetchData = async () => {
        console.log(accountnumber)
        setminiloading(true)
        try {
            const response = await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountnumber}&bank_code=${bankCode}`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer sk_test_17334e29f8f9e30b93280139000150d524fbf80b'
                }
            });

            if (!response.ok) {
                setminiloading(false)
                return toastAlert("danger", "Error", "Invalid account number, make you you selected the correct bank.")
            }

            const data = await response.json(); 
            setaccountname(data.data.account_name)
            setminiloading(false)
        } catch (error) {
            console.log(error);
            setminiloading(false)
        }
    };


    return (
        <>
            {/* {accountnumber.length == 10 && <FetchData } */}
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <Stack style={{
                        paddingHorizontal: 10,
                        marginTop: 30
                    }} >
                        <AlertDialogue />

                        <VStack mb={10} mt={8} >
                            <VStack alignItems="center" >
                                <BoldText1 size={20} color={Colors.primary}
                                    text={`You’re welcome ${Data.name.split(" ")[0]}`}
                                />

                            </VStack>
                        </VStack>

                        <BoldText size={16} color="#000"
                            text="Brand Name"
                            style={{ marginBottom: 10 }}
                        />

                        <Inputs data={name}

                            setData={setname} type="default" placeholder="Enter your brand name" />

                        <BoldText size={16} color="#000"
                            text="Brief description of your brand"
                            style={{ marginBottom: 10 }}
                        />
                        <Input height={90} value={description}
                            onChangeText={(value) => setdescription(value)}
                            multiline
                            placeholder="Enter your brand description" />




                        <BoldText size={16} color="#000"
                            text="Bank Name"
                            style={{ marginBottom: 10, marginTop: 20 }}
                        />

                        <TouchableOpacity onPress={() => { setSelectBank(true) }} style={{
                            justifyContent: "space-between",
                            alignItems: "space between",
                            // marginHorizontal: 15,
                            marginBottom: 20,
                            backgroundColor: Colors.white,
                            padding: 15,
                            borderRadius: 8,
                            display: "flex",
                            flexDirection: "row",
                            borderWidth: 1,
                            borderColor: "lightgrey"
                        }}>
                            <HStack>
                                <BoldText size={14} text={AccountBank ? AccountBank : "Select your bank"} color="#000" />
                            </HStack>
                            <ArrowDown color={Colors.primary} />
                        </TouchableOpacity>



                        <BoldText size={16} color="#000"
                            text="Account Number"
                            style={{ marginBottom: 10 }}
                        />
                        {/* <Inputs data={accountnumber}
                            setData={setaccountnumber} type="numeric" placeholder="Enter your account number" /> */}
                        <Input
                        ref={inputRef}
                            keyboardType={"numeric"}
                            value={accountnumber}
                            onChangeText={(value) => {
                                // if (accountnumber.length == 10) {
                                //     FetchData()
                                // }
                                setaccountnumber(value)
                                console.log(inputRef.current.value)
                            }}
                            w={{
                                base: "75%",
                                x: "100%",
                            }}
                            h={50}
                            pr={20}
                            pl={3}
                            mb={7}
                            borderRadius={10}
                            placeholder="Enter your account number"
                        />




                        <HStack alignItems="center" style={{ marginBottom: 35, marginTop: -20 }} >
                            {miniloading == false ?
                                <>
                                    {accountname && <>
                                        <CheckCircleIcon style={{ marginRight: 10 }} />
                                        <BoldText size={12} color="#000"
                                            text={accountname}
                                        />
                                    </>}
                                </>
                                :
                                <ActivityIndicator />}
                        </HStack>


                        <HStack
                            justifyContent="space-between"
                            alignItems="center"
                            mb={5}
                            style={{
                                paddingHorizontal: 15
                            }}
                        >

                            {/* <BoldText size={16} color="#000"
                                text="Means of identification"
                                style={{ marginBottom: 10 }}
                            /> */}
                            {PickedImage.status == true &&
                                <TouchableOpacity
                                    onPress={() => {
                                       
                                        ImagePicker({
                                            setPickedImage
                                        })
                                    }}
                                    style={{
                                        marginTop: 10
                                    }} >
                                    <EditIcon />
                                </TouchableOpacity>
                            }
                        </HStack>

                        <TouchableOpacity
                            onPress={() => {
                                FetchData()
                                ImagePicker({
                                    setPickedImage
                                })
                            }}
                        >




                            {PickedImage.status == true ?
                                <>
                                    <Image
                                        style={[{
                                            // width: 50,
                                            // height: 50,
                                            // marginTop: 20,
                                            borderRadius: 4,
                                            aspectRatio: PickedImage.height / PickedImage.width
                                        }]}
                                        alt='Img'
                                        source={PickedImage.source}
                                    // resizeMode={'contain'}
                                    />
                                </>
                                :
                                <UploadFileIcon />
                            }

                        </TouchableOpacity>


                        <VStack mb={10}  >
                            <HStack style={{
                                marginTop: 30,
                                justifyContent: "center"
                            }} >
                                <CustomButtons Loading={Loading} LoadingText="Please wait..." callBack={() => {
                                    // 
                                    // CreateAccount()
                                    // navigation.push("Home")


                                    UpdateDetails()


                                }} primary width="100%" height={50} text="Verify account number" />
                            </HStack>

                        </VStack>

                    </Stack>
                </ScrollView>
            </SafeAreaView>


            <Actionsheet isOpen={SelectBank} onClose={() => { setSelectBank(false) }}>
                <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                        <Text fontSize="16" color="gray.500" _dark={{
                            color: "gray.300"
                        }}>
                            Select account type
                        </Text>
                    </Box>
                    <ScrollView style={{ width: "100%" }} >
                        {
                            nigerianBanks.map((item, index) => {
                                return <Actionsheet.Item key={index} onPress={() => {
                                    setSelectBank(false);
                                    setbankCode(item.code);
                                    setAccountBank(item.name)
                                }} >{item.name}</Actionsheet.Item>
                            })
                        }

                    </ScrollView>
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


export default connect(mapStateToProps, mapDispatchToProps)(Verify);




const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 10,
        backgroundColor: "#fff"
    }
})


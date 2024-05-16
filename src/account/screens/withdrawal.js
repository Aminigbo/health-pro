import * as React from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../utils/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Alert, Box, CheckCircleIcon, CloseIcon, Divider, FlatList, HStack, HamburgerIcon, IconButton, Image, Input, Menu, Pressable, Stack, Text, VStack, useToast } from 'native-base';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { ArrowForward, BackIcon, NotificationIcon } from '../../global-components/icons';
import { CheckFullIcon, CheckOutlineIcon } from '../../delivery/components/icons';
import { PopularCat } from '../../home/components/product-card';
import { FetchBargains } from '../../home/models/model-index';
import { NumberWithCommas, formatDate } from '../../utils';
import { fetchUserData, fetchWithdrawalHistory, placeWithdrawal } from '../models/user-model';
import { User } from '../../redux';
import { Inputs } from '../../global-components/inputs';

const Colors = Color()
function Withdrawal({ navigation, appState, disp_Login }) {

    const User = appState.User;
    const Products = appState.products;
    const ViewedProducts = appState.viewedProduct;
    const [loading, setloading] = React.useState(false)
    const [buttonloading, setbuttonloading] = React.useState(false)
    const [data, setdata] = React.useState("")
    const [history, sethistory] = React.useState([])
    const inputRef = React.useRef;
    const toast = useToast()


    function getHistory() {
        setloading(true)
        getUserData()
        fetchWithdrawalHistory(User.UUID)
            .then(response => {
                if (response.error) {
                    setloading(false)
                    return toast.show({
                        placement: "top",
                        render: () => {
                            return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                                Error fetching withdrawal history
                            </Box>;
                        }
                    });
                }
                setloading(false)
                sethistory(response.data)
            })
    }

    function getUserData() {
        setloading(true)
        fetchUserData({ UUID: User.UUID })
            .then(response => {
                disp_Login({
                    ...User,
                    ...response.data
                })
                setloading(false)
            })
            .catch(error => {

            })
    }


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            getHistory()
        });

        return unsubscribe;

    }, [navigation]);



    React.useEffect(() => {

    }, [])


    function withdraw() {
        if (!data || data < 1000) {
            return toast.show({
                placement: "top",
                render: () => {
                    return <Alert status="danger" colorScheme="danger"> <VStack w="300">

                        <Box  px="1" py="1" rounded="sm" mb={5}>
                            Enter amount to withdraw.
                        </Box>
                    </VStack>
                    </Alert>
                }
            });
        }

        if (User.wallet < data) {
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
                            Insufficient wallet balance
                        </Box>
                    </VStack>
                    </Alert>
                }
            });
        }
        setbuttonloading(true)
        // inputRef.current.blur();

        placeWithdrawal({ UUID: User.UUID, amount: data })
            .then(response => {
                setbuttonloading(false)
                setdata("")

                if (response.success == false) {
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
                                    {response.message}
                                </Box>
                            </VStack>
                            </Alert>
                        }
                    });
                }
                getHistory()
                return toast.show({
                    placement: "top",
                    duration: 6000,
                    render: () => {
                        return <Alert status="success" colorScheme="success"> <VStack w="300">
                            <HStack justifyContent="space-between">
                                <HStack flexShrink={1} space={2}  >
                                    <Alert.Icon />
                                    <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                        Success
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
                                Withdrawal places successfully.
                                The exact amount will be sent to your verified account number upon confirmation. This whole process may take up to 24hrs.
                            </Box>
                        </VStack>
                        </Alert>
                    }
                });

            })
            .catch(error => {
                setbuttonloading(false)
            })
    }


    function renderItem() {

        return <Box
            //  bg={Colors.primary}
            style={{
                width: "100%",
                // marginLeft: "2.5%",
                // height: 110,
                borderRadius: 10,
                // padding: 15,
                marginTop: 20


            }} >
            <VStack padding={15} >
                <Inputs

                    type="numeric"
                    placeholder="Amount to withdraw"
                    data={`${NumberWithCommas(data)}`}
                    setData={setdata}
                />

                <HStack
                    mb={2}
                    justifyContent="space-between"
                    alignItems="center" >
                    <BoldText size={13} text="Withdrawal charge" color="#000" />
                    <BoldText1 size={13} text={"₦0.00"} color="#000" />
                </HStack>
                <HStack
                    mb={2}
                    justifyContent="space-between"
                    alignItems="center" >
                    <BoldText size={13} text="Account number" color="#000" />
                    <BoldText1 size={13} text={User && User.accountNo} color="#000" />
                </HStack>
                <HStack
                    mb={2}
                    justifyContent="space-between"
                    alignItems="center" >
                    <BoldText size={13} text="Bank name" color="#000" />
                    <BoldText1 size={13} text={User && User.accountBank} color="#000" />
                </HStack>
                <HStack
                    mb={2}
                    justifyContent="space-between"
                    alignItems="center" >
                    <BoldText size={13} text="Account name" color="#000" />
                    <BoldText1 size={13} text={User && User.accountName} color="#000" />
                </HStack>

                <CustomButtons width="100%" height={50}
                    Loading={buttonloading}
                    text="Place withdrawal" primary Style={{
                        // marginBottom: 30,
                        // marginLeft: "2.5%",
                        marginTop: 60
                    }} callBack={() => {
                        withdraw()
                        // navigation.navigate("Place withdrawal")
                    }} />
                <BoldText size={12} text="The exact amount will be sent to your verified account number upon confirmation. This whole process may take up to 24hrs." color="grey" />
            </VStack>

            <Divider mt={19} mb={19} />

            <VStack paddingHorizontal={15} >
                {history.length > 0 && <BoldText1 size={15} text="Withdrawal history" color="#000" />}

                <Stack mt={5}>
                    {
                        history.map((item, index) => {
                            console.log(item)
                            return <TouchableOpacity key={index} onPress={() => {
                                console.log(item.deal)
                            }} style={{
                                justifyContent: "space-between",
                                alignItems: "space between",
                                // marginHorizontal: 15,
                                marginVertical: 7,
                                display: "flex",
                                flexDirection: "row",
                                backgroundColor: "#fffff4",
                                padding: 10,
                                borderRadius: 5
                            }}>
                                <VStack>
                                    <HStack
                                        mb={2}
                                        justifyContent="space-between"
                                        alignItems="center" >
                                        {/* <BoldText size={13} text="Account number" color="#000" /> */}
                                        <BoldText1 size={13} text={item.data.accountNo} color="#000" />
                                    </HStack>
                                    <HStack
                                        mb={2}
                                        justifyContent="space-between"
                                        alignItems="center" >
                                        {/* <BoldText size={13} text="Bank name" color="#000" /> */}
                                        <BoldText1 size={13} text={item.data.bank} color="#000" />
                                    </HStack>
                                    <HStack
                                        mb={2}
                                        justifyContent="space-between"
                                        alignItems="center" >
                                        <BoldText size={10} text={formatDate(item.created_at)} color="#000" />
                                        {/* <BoldText1 size={13} text={User && User.accountName} color="#000" /> */}
                                    </HStack>
                                </VStack>
                                <VStack alignItems="flex-end" >
                                    <BoldText1 size={14} text={`₦${NumberWithCommas(item.amount)}`} color="#000" />
                                    {/* <BoldText text="Processed" size={12} color={Colors.primary} /> */}
                                    <HStack>
                                        {/* <CheckOutlineIcon /> */}
                                        {item.approved == true ?
                                            <CheckFullIcon status />
                                            :
                                            <BoldText text="pending" size={12} color="crimson" />
                                        }
                                    </HStack>
                                </VStack>
                            </TouchableOpacity>
                        })
                    }
                </Stack>

                {history.length < 1 && <Stack style={{
                    width: "100%",
                    // backgroundColor: "green",
                    height: 200,
                    // flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }} >
                    <BoldText1 text="No record found" color="grey" />
                </Stack>}
            </VStack>
        </Box>
    }


    return User == null ? navigation.replace("Login") : (
        // return (
        <>

            {/* {console.log(User)} */}
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
                        <BackIcon />

                        <VStack style={{ marginLeft: 10 }}>
                            <BoldText1 size={17} text="Withdrawal" color="#000" />
                            <BoldText size={12} text={`Balance: ₦${NumberWithCommas(User.wallet)}`} color="#000" />
                        </VStack>

                    </HStack>

                </HStack>


                <FlatList
                    data={[{}]}
                    renderItem={renderItem}
                    // keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={getHistory} />
                    }
                />

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


export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal);



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


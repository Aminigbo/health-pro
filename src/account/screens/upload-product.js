import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Inputs } from '../../global-components/inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center, HStack, VStack, Stack, Alert, CloseIcon, Text, IconButton, AlertDialog, Button, Switch, Input, Image, useToast, View, ChevronDownIcon, Actionsheet, Box } from 'native-base';
import { BoldText, BoldText1, BoldText2 } from '../../global-components/texts';
import { BackIcon, EditIcon, EmailIcon, UploadFileIcon, UploadProductIcon } from '../../global-components/icons';
import { Color } from '../../utils/colors';
import { CustomButtons } from '../../global-components/buttons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Products, User, initAuth } from '../../redux';
import { connect } from 'react-redux';
import { ImagePicker } from '../../utils';
import { FetUserProducts, UploadProductsModel } from '../models/product-model';
import { supabase } from '../../../configurations/supabase-config';



const Colors = Color()

function Uploadproduct({ navigation, disp_Products, appState }) {
    const User = appState.User
    const [name, setname] = React.useState(null);
    const [description, setdescription] = React.useState(null);
    const [SelectType, setSelectType] = React.useState(false);
    const [category, setcategory] = React.useState(null);
    const [Loading, setLoading] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    const [price, setprice] = React.useState("")
    const [pickedDate, setPickedDate] = React.useState(false)
    const [error, seterror] = React.useState({
        status: false,
        msg: ""
    });
    const [PickedImage, setPickedImage] = React.useState({
        status: false
    })
    const [date, setDate] = React.useState(new Date());
    let toast = useToast()


    function UploadProductController() {
        if (!name || !category || !description || PickedImage.status == false || !price) {
            console.log("error")
            seterror({
                status: true,
                msg: "You cannot submit an empty form"
            })
        } else {
            setLoading(true)

            supabase.storage
                .from("products")
                .upload(PickedImage.fileName, PickedImage.formData)
                .then(response => {
                    let Img = response.data.path;


                    UploadProductsModel({ category, name, harvest_date: date, price, file: Img, Description: description, UUID: User.UUID })
                        .then(response => {
                            if (response.success == false) {
                                seterror({
                                    status: true,
                                    msg: response.message
                                })
                                setLoading(false)
                            } else {
                                // console.log(response)
                                toast.show({
                                    title: "Product uploaded successfully",
                                    placement: "top",
                                    duration: 1000,
                                    onCloseComplete: () => {
                                        setIsOpen(true)
                                        FetUserProducts({ UUID: User.UUID })
                                            .then(response => {
                                                if (response.success == false) {
                                                    setLoading(false)
                                                    return seterror({
                                                        status: true,
                                                        msg: response.message
                                                    })
                                                } else {
                                                    disp_Products(response.data)
                                                    navigation.pop()
                                                }
                                            })
                                    }
                                })

                            }

                        })
                        .catch(error => {
                            console.log(error)
                            setLoading(false)
                        })

                })
        }
    }


    function Error() {
        return <>
            <Alert w="100%" mb={10} status="error">
                <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} justifyContent="space-between">
                        <HStack space={2} flexShrink={1}>
                            <Alert.Icon mt="1" />
                            <Text fontSize="md" color="coolGray.800">
                                {error.msg}
                            </Text>
                        </HStack>
                        <IconButton onPress={() => {
                            seterror({
                                status: false
                            })
                        }} variant="unstyled" _focus={{
                            borderWidth: 0
                        }} icon={<CloseIcon onPress={() => {
                            seterror({
                                status: false
                            })
                        }} size="3" />} _icon={{
                            color: "coolGray.600"
                        }} />
                    </HStack>
                </VStack>
            </Alert>
        </>
    }


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
        setPickedDate(true)
    };

    const showTimepicker = () => {
        showMode('time');
    };



    return (
        <>
            {/* {console.log(User)} */}
            {error.status == true && <Error />}
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <Stack style={{
                        paddingHorizontal: 10,
                    }} >

                        <HStack style={{
                            // padding: 10,
                            marginTop: 30,
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}>
                            <BackIcon navigation={navigation} />
                            <BoldText1 size={16} color="#000"
                                style={{
                                    marginLeft: 30
                                }}
                                text="Upload Product"
                            />

                        </HStack>


                        <BoldText size={14} color="#000"
                            text="Product name"
                            style={{ marginBottom: 10, marginTop: 40 }}
                        />

                        <Inputs data={name}

                            setData={setname} type="default" placeholder="Name" />


                        <BoldText size={14} color="#000"
                            text="Product category"
                            style={{ marginBottom: 10, }}
                        />
                        <TouchableOpacity
                            onPress={() => { setSelectType(true) }}
                            style={{
                                borderWidth: 1,
                                borderColor: "lightgrey",
                                borderRadius: 10,
                                marginBottom: 30,
                                padding: 10,
                                paddingVertical: 15,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                            {category ?
                                <Text>{category}</Text> :
                                <Text>Select category</Text>
                            }
                            <ChevronDownIcon />
                        </TouchableOpacity>


                        {/* <Inputs data={category}

                            setData={setcategory} type="default" placeholder="Category" /> */}


                        <BoldText size={14} color="#000"
                            text="Estimated price"
                            style={{ marginBottom: 10, }}
                        />

                        <Inputs data={price}
                            setData={setprice} type="numeric" placeholder="Price" />



                        <BoldText size={16} color="#000"
                            text="Harvesting Date"
                            style={{ marginBottom: 10 }}
                        />
                        {/* <Button onPress={showDatepicker} title="Show date picker!" />
                        <Button onPress={showTimepicker} title="Show time picker!" /> */}
                        <TouchableOpacity
                            onPress={showDatepicker}
                            style={{
                                borderWidth: 1,
                                borderColor: "lightgrey",
                                borderRadius: 10,
                                marginBottom: 30,
                                padding: 10,
                                paddingVertical: 15,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                            {pickedDate == true ?
                                <Text>{date.toLocaleString()}</Text> :
                                <Text>Select date</Text>
                            }

                            <ChevronDownIcon />
                        </TouchableOpacity>




                        <BoldText size={16} color="#000"
                            text="Description"
                            style={{ marginBottom: 10 }}
                        />
                        <Input value={description}
                            onChangeText={(value) => setdescription(value)}
                            multiline
                            h={100}
                            placeholder="Provide a brief description of your product" />




                        <HStack
                            justifyContent="space-between"
                            alignItems="center"
                            mt={10}
                            mb={5}
                            style={{
                                // paddingHorizontal: 10
                            }}
                        >

                            <BoldText size={16} color="#000"
                                text="Product image"
                                style={{ marginBottom: 10 }}
                            />
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
                                ImagePicker({
                                    setPickedImage
                                })
                            }}
                        >
                            {PickedImage.status == true ?
                                <>
                                    <Image
                                        style={[{
                                            width: "100%",
                                            height: 200,
                                            // marginTop: 20,
                                            borderRadius: 4,
                                            // aspectRatio: PickedImage.height / PickedImage.width
                                        }]}
                                        alt='Img'
                                        source={PickedImage.source}
                                    // resizeMode={'contain'}
                                    />
                                </>
                                :
                                <UploadProductIcon />
                            }


                        </TouchableOpacity>


                        <Stack style={{ marginVertical: 30 }} >
                            <CustomButtons Loading={Loading} LoadingText="Please wait..." callBack={() => {
                                // 
                                UploadProductController()
                                // navigation.push("Home")
                            }} primary width="100%" height={50} text="Upload" />
                        </Stack>

                    </Stack>
                </ScrollView>
            </SafeAreaView>



            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>

                    <AlertDialog.Header>Finishing up........</AlertDialog.Header>
                    <AlertDialog.Body>
                        <ActivityIndicator />
                    </AlertDialog.Body>

                </AlertDialog.Content>
            </AlertDialog>


            <Actionsheet isOpen={SelectType} onClose={() => { setSelectType(false) }}>
                <Actionsheet.Content>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                        <Text fontSize="16" color="gray.500" _dark={{
                            color: "gray.300"
                        }}>
                            Select Product category
                        </Text>
                    </Box>
                    <Actionsheet.Item onPress={() => { setSelectType(false); setcategory("Grains") }} >Grains</Actionsheet.Item>
                    <Actionsheet.Item onPress={() => { setSelectType(false); setcategory("Tubbers") }} >Tubbers</Actionsheet.Item>
                    <Actionsheet.Item onPress={() => { setSelectType(false); setcategory("Vegetables") }} >Vegetables</Actionsheet.Item>
                    <Actionsheet.Item onPress={() => { setSelectType(false); setcategory("Poultry") }} >Poultry</Actionsheet.Item>
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
        disp_Products: (payload) => dispatch(Products(payload)),
        set_initAuth: (payload) => dispatch(initAuth()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Uploadproduct);




const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 10,
        backgroundColor: "#fff"
    }
})


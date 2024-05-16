import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Inputs } from '../../global-components/inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center, HStack, VStack, Stack, Pressable, Divider } from 'native-base';
import { BoldText, BoldText1 } from '../../global-components/texts';
import { ArrowForward, BackIcon, DropoffIcon, EmailIcon, FoodIcon, PackageSizeIcon, PackageSizeLarge, PackageSizeMedium, PackageSizeSmall, PhoneIcon, PickupIcon, ThumbsDown, ThumbsUp } from '../../global-components/icons';
import { Color } from '../../utils/colors';
import { CustomButtons, LinkButtons } from '../../global-components/buttons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { DataHolder } from '../components/data-holder';
const Colors = Color()
function Helpful({ navigation, route }) {
    const [Response, setResponse] = React.useState(null)
    return (
        <>
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <VStack mb={2}  >
                        <HStack style={{
                            marginTop: 30
                        }} >
                            <BackIcon navigation={navigation} />
                            <BoldText color="black"
                                style={{ marginLeft: 48 }}
                                text="Get Help" />
                        </HStack>

                        <VStack mt={8} style={{
                            alignItems: "center"
                        }} >

                        </VStack>
                    </VStack>
                    <VStack mb={10} >

                        {/* <DataHolder navigation={navigation} /> */}

                        {Response == null &&
                            <>
                                <Center>
                                    <BoldText1 color="black"
                                        style={{ marginTop: 30 }}
                                        text={route.params.header}/>

                                    <Stack w={310} >
                                        <BoldText style={{ fontWeight: 300, marginTop: 10 }} color="black"
                                            text={route.params.text}/>
                                    </Stack>
                                </Center>

                                <Center mt={20} >
                                    <BoldText1 color="black"
                                        style={{ marginTop: 30 }}
                                        text="Was this helpful?" />

                                    <HStack style={{ justifyContent: "space-between" }}>
                                        <Pressable onPress={() => {
                                            setResponse("SORRY")
                                        }} style={{
                                            margin: 25
                                        }}>
                                            <ThumbsDown />
                                        </Pressable>

                                        <Pressable onPress={() => {
                                            setResponse("GREAT")
                                        }} style={{
                                            margin: 25
                                        }}>
                                            <ThumbsUp />
                                        </Pressable>
                                    </HStack>
                                </Center>
                            </>
                        }

                    </VStack>



                    {Response == "GREAT" &&
                        < Center >
                            <BoldText1 color="black"
                                style={{ marginTop: 30 }}
                                text="Great !" />

                            <Stack w={310} >
                                <BoldText style={{ fontWeight: 300, marginTop: 10 }} color="black"
                                    text="We are glad it was helpful . Do you 
                            want to leave a review for us? " />
                            </Stack>

                            <HStack p={10} style={{ justifyContent: "space-around" }}>
                                <CustomButtons callBack={() => {
                                    setResponse(null)
                                }} width={130} text="Maybe later" />

                                <Stack ml={10} >
                                    <CustomButtons callBack={() => {
                                        setResponse(null)
                                    }} width={130} primary text="Sure" />
                                </Stack>
                            </HStack>
                        </Center>
                    }

                    {Response == "SORRY" &&
                        <Center >
                            <BoldText1 color="black"
                                style={{ marginTop: 30 }}
                                text="Sorry !" />

                            <Stack w={220} >
                                <BoldText style={{ fontWeight: 300, marginTop: 10 }} color="black"
                                    text="We are sorry. Please contact our support team" />
                            </Stack>

                            <HStack p={10} style={{ justifyContent: "space-around" }}>
                                <CustomButtons callBack={() => {
                                    setResponse(null)
                                }} width={230} primary text="Contact Support" />
                            </HStack>
                        </Center>
                    }



                </ScrollView>
            </SafeAreaView >
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#fff"
    }
})


export default Helpful;
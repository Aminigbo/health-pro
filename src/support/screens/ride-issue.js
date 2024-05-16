import * as React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Inputs } from '../../global-components/inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center, HStack, VStack, Stack, Pressable, Divider } from 'native-base';
import { BoldText, BoldText1 } from '../../global-components/texts';
import { ArrowForward, BackIcon, DropoffIcon, EmailIcon, FoodIcon, PackageSizeIcon, PackageSizeLarge, PackageSizeMedium, PackageSizeSmall, PhoneIcon, PickupIcon } from '../../global-components/icons';
import { Color } from '../../utils/colors';
import { CustomButtons, LinkButtons } from '../../global-components/buttons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { DataHolder } from '../components/data-holder';
const Colors = Color()
function Rideissues({ navigation }) {

    return (
        <>
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <VStack mb={2}  >
                        <HStack style={{
                            marginTop: 30,
                            justifyContent: "flex-start"
                        }} >
                            <BackIcon navigation={navigation} />
                            <BoldText color="black"
                                style={{ marginLeft: 48, }}
                                text="Get Help" />
                        </HStack>

                        <VStack mt={8} style={{
                            alignItems: "center"
                        }} >

                        </VStack>
                    </VStack>

                    <Stack style={{ paddingHorizontal: 10, }} >
                        <VStack mb={10} >

                            {/* <DataHolder navigation={navigation} /> */}

                            <BoldText style={{ fontWeight: 300, marginTop: 30 }} color="black"
                                text="Get in touch with our support team to solve your ride related issues." />

                        </VStack>

                        <HStack style={{ justifyContent: "flex-start" }} >
                            <BoldText
                                color="grey"
                                callBack={() => {

                                }} text="Quick help" />
                        </HStack>


                        <Pressable onPress={() => {
                            navigation.push("Helpful",
                                {
                                    header: "Recovering a lost item",
                                    text: `We understand how important your items are. Please reach out to our support team at [contact@blake.com] with details about your lost item, and we will do our best to assist you in locating it.`
                                })
                        }} >
                            <HStack style={{
                                marginTop: 30,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }} >
                                <BoldText color="black"
                                    style={{}}
                                    text="Recovering a lost item" />
                                <ArrowForward navigation={navigation} />
                            </HStack>
                        </Pressable>

                        <Pressable onPress={() => {
                            navigation.push("Helpful", { header: "Price higher than expected",
                             text: `We apologize for any confusion. Prices may vary based on factors such as distance and service level. You can view the cost breakdown in the app before confirming your order. If you have specific concerns, please contact our support team for further clarification` })
                        }} >
                            <HStack style={{
                                marginTop: 30,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }} >
                                <BoldText color="black"
                                    style={{}}
                                    text="Price higher than expected" />
                                <ArrowForward navigation={navigation} />
                            </HStack>
                        </Pressable>

                        <Pressable onPress={() => {
                            navigation.push("Helpful", { header: "My dispatch rider was rude", 
                            text: `We apologize for any inconvenience caused by the behavior of our dispatch rider. Blake values professionalism and courtesy. Please report the incident through the app, and we will take appropriate action to address the issue.` })
                        }} >
                            <HStack style={{
                                marginTop: 30,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }} >
                                <BoldText color="black"
                                    style={{}}
                                    text="My dispatch rider was rude" />
                                <ArrowForward navigation={navigation} />
                            </HStack>
                        </Pressable>

                        <Pressable onPress={() => {
                            navigation.push("Helpful", { header: `We apologize for any delay you experienced. Factors such as demand and rider availability may impact dispatch times. We appreciate your patience. If you encounter persistent issues, please contact our support team for further assistance` })
                        }} >
                            <HStack style={{
                                marginTop: 30,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }} >
                                <BoldText color="black"
                                    style={{}}
                                    text="Took time to get a dispatch rider" />
                                <ArrowForward navigation={navigation} />
                            </HStack>
                        </Pressable>


                        <Pressable onPress={() => {
                            navigation.push("Helpful", { header: `We apologize for any inconvenience caused by the delay. We strive to provide timely deliveries, and we appreciate your understanding. If you have specific concerns about a particular incident, please report it through the app so we can investigate and improve our service` })
                        }} >
                            <HStack style={{
                                marginTop: 30,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }} >
                                <BoldText color="black"
                                    style={{}}
                                    text="Dispatcher Took Time to Arrive at Drop-off Location" />
                                <ArrowForward navigation={navigation} />
                            </HStack>
                        </Pressable>

                        <Pressable onPress={() => {
                           Linking.openURL("https://test1.harvoxx.com/").catch((err) =>
                           console.error('An error occurred', err)
                         );
                            // navigation.push("Helpful")
                        }} >
                            <HStack style={{
                                marginTop: 30,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }} >
                                <BoldText color="black"
                                    style={{}}
                                    text="FAQ" />
                                <ArrowForward navigation={navigation} />
                            </HStack>
                        </Pressable>

                        <Pressable onPress={() => {
                             Linking.openURL("https://test1.harvoxx.com/").catch((err) =>
                             console.error('An error occurred', err)
                           );
                            // navigation.push("Helpful")
                        }} >
                            <HStack style={{
                                marginTop: 30,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }} >
                                <BoldText color="black"
                                    style={{}}
                                    text="About Us" />
                                <ArrowForward navigation={navigation} />
                            </HStack>
                        </Pressable>


                    </Stack>


                </ScrollView>
            </SafeAreaView>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 10,
        backgroundColor: "#fff"
    }
})


export default Rideissues;
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Inputs } from '../../global-components/inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center, HStack, VStack, Stack, Pressable, Divider } from 'native-base';
import { BoldText, BoldText1 } from '../../global-components/texts';
import { BackIcon, DropoffIcon, EmailIcon, FoodIcon, PackageSizeIcon, PackageSizeLarge, PackageSizeMedium, PackageSizeSmall, PhoneIcon, PickupIcon } from '../../global-components/icons';
import { Color } from '../../utils/colors';
import { CustomButtons, LinkButtons } from '../../global-components/buttons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { DataHolder } from '../components/data-holder';
const Colors = Color()
function Gethelp({ navigation }) {

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
                        <BoldText style={{ fontWeight: 500, marginBottom: 30 }} color="#0E0C0C"
                            text="Get help with a recent ride" />
                        {
                            [0, 0, 0, 0, 0].map((res, index) => {
                                return <>
                                    <DataHolder navigation={navigation} to="Rideissues" key={index} />
                                </>
                            })
                        }
                        <HStack style={{ justifyContent: "flex-end" }} >
                            <LinkButtons callBack={() => {

                            }} text="See More" />
                        </HStack>

                        <VStack mt={15} >
                            <TouchableOpacity
                                onPress={() => { }}
                                style={{
                                    marginBottom:30
                                }} >
                                <BoldText color="#000"
                                    style={{ marginLeft: 8, fontWeight: 500, fontSize: 14, color: Colors.primary }} text="FAQ" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { }}
                                style={{
                                }} >
                                <BoldText color="#000"
                                    style={{ marginLeft: 8, fontWeight: 500, fontSize: 14, color: Colors.primary }} text="About Us" />
                            </TouchableOpacity>


                        </VStack>
                    </VStack>


                </ScrollView>
            </SafeAreaView>
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


export default Gethelp;
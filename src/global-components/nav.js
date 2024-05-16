import { Divider, HStack, VStack } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FileIcon, HomeIcon, ProfileIcon } from "./icons";

export function BottomNav({
    navigation,
    page,
    Rider
}) {
    return <>

        <VStack style={{
            //  justifyContent: "center",
            backgroundColor: "#fff",
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 80,
            alignItems: "center"
        }}  >
            <Divider _light={{
                bg: "muted.300"
            }} _dark={{
                bg: "muted.20"
            }} thickness="1" mx="2" orientation="horizontal" mb={5} />
            <HStack style={{
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                // backgroundColor: "red"
            }}  >
                <TouchableOpacity
                    style={{
                        // backgroundColor: "blue",
                        width:100,
                        justifyContent:"center",
                        alignItems:"center",
                        height:50
                    }}
                    onPress={() => {
                        if (page != "FILE") {
                            if (Rider == true) {

                                navigation.navigate("RiderOrderHistory")
                            } else {

                                navigation.navigate("AllHistory")
                            }
                        }
                    }} >
                    <FileIcon page={page} />
                </TouchableOpacity >
                <TouchableOpacity style={{
                    // backgroundColor: "green",
                    width:100,
                    justifyContent:"center",
                    alignItems:"center",
                    height:50
                }}
                    onPress={() => {
                        navigation.navigate("Home")
                    }} >
                    <HomeIcon page={page} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        // backgroundColor: "orange",
                        width:100,
                        justifyContent:"center",
                        alignItems:"center",
                        height:50
                    }}
                    onPress={() => {
                        navigation.navigate("Profile")
                    }} >
                    <ProfileIcon page={page} />
                </TouchableOpacity>
            </HStack>

        </VStack>
    </>
}
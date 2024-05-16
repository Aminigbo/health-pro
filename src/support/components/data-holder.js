import { HStack, Pressable, VStack } from "native-base";
import { BoldText } from "../../global-components/texts";
import { HistoryIcon } from "../../delivery/components/icons";

export function DataHolder({
    navigation
}) {
    return <>
        <Pressable
            onPress={() => {
                navigation.push("Rideissues")
            }}
            style={{ marginBottom: 20 }}>
            <HStack>
                <HistoryIcon state="successful" />
                <VStack style={{ marginLeft: 15 }}>
                    <HStack> 
                        <BoldText style={{ fontWeight: 500 }} color="#0E0C0C" text="Wesham Filling Station by Alcon, Woji." />
                    </HStack>
                    <BoldText color="#B9ACAC" text="30 Sep, 18:49" />
                </VStack>
            </HStack>
        </Pressable>
    </>
}
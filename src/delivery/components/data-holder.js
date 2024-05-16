import { HStack, Pressable, VStack } from "native-base";
import { HistoryIcon } from "./icons";
import { BoldText } from "../../global-components/texts";

export function DataHolder({
    navigation,
    key,
    data,
    setRiderState,
    user
}) {

    const originalTimestamp = data && data.created_at;
    const dateObject = new Date(originalTimestamp);

    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
        timeZone: "UTC",
    };
    const formattedDate = dateObject.toLocaleString("en-US", options);

    return <>
        <Pressable
            key={key}
            onPress={() => {
                if (user.rider == true) {
                    setRiderState(data)
                    navigation.push("RiderOrderPage")
                } else {
                    navigation.push("DeliveryDetails")
                    setRiderState(data) 
                    // console.log(data)
                }
            }}
            style={{ marginBottom: 20 }}>
            <HStack>
                <HistoryIcon state={data.status} />
                <VStack style={{ marginLeft: 15 }}>
                    <BoldText style={{ fontWeight: 500 }} color="#0E0C0C" text={data.data.PickupLocation.address} />
                    <BoldText color="#B9ACAC" text={formattedDate} />
                </VStack>
            </HStack>
        </Pressable>
    </>
}
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from "react-native-push-notification";
import { Pressable, Vibration } from "react-native"
import { Alert, AlertDialog, Box, Button, CloseIcon, HStack, IconButton, Text, VStack } from 'native-base';



export function HandleFPN(navigation, toast) {

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        // console.log('Background Message:', remoteMessage);
    });


    messaging().onNotificationOpenedApp(remoteMessage => {
        // console.log(
        //     'Notification caused app to open from background state:',
        //     remoteMessage.notification,
        // );

    });



    PushNotification.createChannel(
        {
            channelId: "channel-id", // (required)
            channelName: "My channel", // (required)
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            // importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => { } // (optional) callback returns whether the channel was created, false means it already existed.
    );


    // quiet state
    messaging()
        .getInitialNotification()
        .then((remoteMessage) => {
            if (remoteMessage) {
                const notificationType = remoteMessage;
                // console.log(" .I have migrated()", notificationType)
                // navigation.navigate('Jobs');
            }
        });

    PushNotification.configure({
        onNotification: function (notification) {
            // console.log("Notification data", notification)
            const clicked = notification.userInteraction;
            const clickedNotification = notification;
            // ToastAndroid.show(notification.message, ToastAndroid.CENTER);
            // ============
            const notificationTypeSplit = clickedNotification.data.id.split(":")

            let notificationUserType = notificationTypeSplit[0]
            let notificationOrderID = notificationTypeSplit[1]
            // =======================
            if (clicked) {

                if (notificationUserType == "NEGOTIATION") { navigation.push("Negotiate", { id: notificationOrderID }) }

                // if (notificationUserType == "USER") { navigation.navigate("DeliveryDetails", { id: notificationOrderID }) } // view order
                // ===============
                // console.log("Notification type", notificationUserType)
                // console.log("id", notificationOrderID)


            } else {
                if (notification.foreground == true) {

                    console.log("Recieved notification in foregroundr")

                    PushNotification.localNotification({
                        // largeIcon: "ic_launcher",
                        largeIconUrl: notification.data.largeImg,
                        smallIcon: "ic_notifications",
                        bigText: notification.message,
                        message: notification.message,
                        details: { repeted: false },
                        channelId: "channel-id",
                        subText: notification.title,
                        // bigLargeIcon: "ic_launcher",
                        bigPictureUrl: notification.data.largeImg,
                        // actions: ['Accept', 'Reject'],
                    })


                    return toast.show({
                        placement: "top",
                        duration: 120000,
                        render: () => {
                            return <Alert maxW="400" status="success" colorScheme="success">
                                <Pressable onPress={() => {
                                    navigation.push("Negotiate", { id: notificationOrderID })
                                    toast.closeAll();
                                }} >
                                    <VStack space={2} flexShrink={1} w="100%">
                                        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                                            <HStack flexShrink={1} space={2} alignItems="center">
                                                <Alert.Icon />
                                                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                                    {notification.title}
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
                                            {notification.message}
                                        </Box>
                                    </VStack>
                                </Pressable>
                            </Alert>;
                        }
                    });

                } else {
                    console.log("Recieved notification in background")
                    PushNotification.localNotification({
                        // largeIcon: "ic_launcher",
                        largeIconUrl: notification.data.largeImg,
                        smallIcon: "ic_notifications",
                        bigText: notification.message,
                        message: notification.message,
                        details: { repeted: false },
                        channelId: "channel-id",
                        subText: notification.title,
                        // bigLargeIcon: "ic_launcher",
                        bigPictureUrl: notification.data.largeImg,
                        // actions: ['Accept', 'Reject'],
                    })
                }
            }
        },

        requestPermissions: Platform.OS === 'ios'
    })

} 

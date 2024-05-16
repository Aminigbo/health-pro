import * as React from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { Inputs } from '../../global-components/inputs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Center, HStack, VStack, Stack, Pressable, Divider, useToast, Spinner } from 'native-base';
import { BoldText, BoldText1 } from '../../global-components/texts';
import { BackIcon, DropoffIcon, EmailIcon, FoodIcon, PackageSizeIcon, PackageSizeLarge, PackageSizeMedium, PackageSizeSmall, PhoneIcon, PickupIcon } from '../../global-components/icons';
import { Color } from '../../utils/colors';
import { CustomButtons, LinkButtons } from '../../global-components/buttons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { DataHolder } from '../components/data-holder';
import { BottomNav } from '../../global-components/nav';
import { connect } from 'react-redux';
import { RideOrderToView, Riderstate } from '../../redux';
import { UserOrderHistoryModel } from '../models/get-rider-history';
import { RefreshIcon } from '../components/icons';
const Colors = Color()
function AllHistory({ navigation, appState, setRideToView }) {
    const User = appState.User;
    const [loading, setloading] = React.useState(false)
    const [History, sethistory] = React.useState(null)
    const toast = useToast();

    function FetchHistory() {
        setloading(true)
        UserOrderHistoryModel(User.id)
            .then(response => {
                // console.log(response.data)
                if (response.error != null) {
                    toast.show({
                        placement: "top",
                        render: () => {
                            return <Box bg="orange.500" px="2" py="1" rounded="sm" mb={5}>
                                {response.error.message}
                            </Box>;
                        }
                    })
                } else {
                    sethistory(response.data)
                }
                setloading(false)
            })
            .catch(error => {
                setloading(false)
                toast.show({
                    placement: "top",
                    render: () => {
                        return <Box bg="orange.500" px="2" py="1" rounded="sm" mb={5}>
                            An error occured
                        </Box>;
                    }
                })
            })
    }
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            FetchHistory()
        });

        return unsubscribe;


    }, [navigation]);


    return (
        <>
            <SafeAreaView style={styles.container} >
                <ScrollView>
                    <HStack mb={2} style={{
                        marginTop: 30, marginBottom: 30, justifyContent: "space-between"
                    }} >
                        <HStack  >
                            <BackIcon navigation={navigation} />
                            <BoldText color="black"
                                style={{ marginLeft: 28 }}
                                text="Order Tracking" />
                        </HStack>
                        {loading == true ? <Spinner style={{ marginRight: 28 }} /> :
                            <TouchableOpacity style={{ marginRight: 28 }} onPress={() => FetchHistory()} >
                                <RefreshIcon />
                            </TouchableOpacity>
                        }
                    </HStack>
                    <VStack mb={10} >

                        {History && History.length > 0 ? <>
                            <BoldText text="All orders" color="grey" style={{ marginBottom: 10 }} />
                        </> :
                            <>
                                {loading == false && <BoldText text="No order history" color="grey" style={{ marginBottom: 10 }} />}
                            </>}
                        {loading == true ?
                            <>
                                {/* <Spinner /> */}
                            </>
                            :

                            <>
                                {History && History.map((item, index) => {
                                    return <>
                                        <DataHolder
                                            setRiderState={setRideToView}
                                            data={item && item}
                                            navigation={navigation}
                                            key={index} 
                                            user={User}
                                        />
                                    </>
                                })
                                }
                            </>
                        }

                    </VStack>


                </ScrollView>
            </SafeAreaView>

            <BottomNav page="FILE" navigation={navigation} />
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
        // disp_Login: (payload) => dispatch(User(payload)),
        setRiderState: (payload) => dispatch(Riderstate(payload)),
        // setActiveOrders: (payload) => dispatch(ActiveOrders(payload)),
        setRideToView: (payload) => dispatch(RideOrderToView(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AllHistory);




const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#fff"
    }
})


// export default AllHistory;
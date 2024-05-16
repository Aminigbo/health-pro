import * as React from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper'
import Svg, { Path } from "react-native-svg"
import { FirstOnboarding, SecondOnboarding, ThirdOnboarding } from '../components';
import { BoldText, BoldText1 } from '../../global-components/texts';
import { CustomButtons } from '../../global-components/buttons';
import { connect } from 'react-redux';
import { supabase } from '../../../configurations/supabase-config';
import { Color } from '../../utils/colors';
import { StatusBar } from 'native-base';

function Onboading({ navigation, appState }) {
    const User = appState.User;
    const initialized = appState.initialized;
    const [activeIndex, setActiveIndex] = React.useState(0);
    const width = Dimensions.get('window').width;
    const data = [1, 2, 3, 4, 5];
    const handleSlideChange = (index) => {
        setActiveIndex(index);
    };


const Colors = Color()

    return initialized == true ? navigation.replace("Home") : (

        <>
            <StatusBar
                animated={true}
                backgroundColor={Colors.white}
                // barStyle={statusBarStyle}
                // showHideTransition={statusBarTransition}
                hidden={false}
            />
            <Swiper
                style={styles.wrapper}
                loop={false}
            // showsButtons={true}
            >
                <View style={styles.slide}>
                    <FirstOnboarding />
                    <View style={{ width: "80%", marginTop: 50, alignItems: "center" }} >
                        {/* <BoldText1 color="black" text="Send parcels at your convinience" /> */}
                        <BoldText color="grey" text="Manage crops and optimize resources effortlessly. " />
                    </View>
                </View>
                <View style={styles.slide}>
                    <SecondOnboarding />
                    <View style={{ width: "80%", marginTop: 50, alignItems: "center" }} >
                        {/* <BoldText1 color="black" text="Track your parcel anytime" /> */}
                        <BoldText color="grey" text="Explore farms, negotiate deals, and build partnerships." />
                    </View>
                </View>
                <View style={styles.slide}>
                    <ThirdOnboarding />
                    <View style={{ width: "80%", marginTop: 30, alignItems: "center", marginBottom: 25 }} >
                        {/* <BoldText1 color="black" text="Fast and timely " /> */}
                        <BoldText color="grey" text="Enhance logistics, track orders and boost supply chain efficiency." />
                    </View>

                    <CustomButtons  text="Get started" width={200}
                        callBack={() => {
                            navigation.replace("Login")
                        }}
                    />
                </View>
            </Swiper>

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
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Onboading);




const styles = StyleSheet.create({
    wrapper: { backgroundColor: '#fff',},
    slide: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop:90
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})


// export default Onboading;
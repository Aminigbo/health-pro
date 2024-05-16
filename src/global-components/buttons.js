import { Button } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BoldText, BoldText1 } from "./texts";
import { Color } from "../utils/colors";
let Colors = Color()
export function CustomButtons({
    width,
    primary,
    text,
    height,
    callBack,
    Loading,
    LoadingText,
    Style,
    bg
}) {
    return <>
        <TouchableOpacity
            onPress={() => {
                callBack()
            }}
        >
            <Button
                isLoading={Loading} isLoadingText={LoadingText}
                style={[Style, {
                    backgroundColor: primary ? Colors.primary : bg,
                    padding: 10,
                    width: width,
                    borderRadius: 9,
                    alignItems: "center",
                    justifyContent: "center",
                    height: height,
                    borderColor:primary ? Colors.white : bg,
                    borderWidth:1
                }]}>
                <BoldText1 color={primary ? "white" : "lightgrey"} text={text} />
            </Button>
        </TouchableOpacity>
    </>
}


 

export function LinkButtons({
    text,
    callBack,
    Style,
    Color
}) {
    return <>
        <TouchableOpacity
            onPress={() => {
                callBack()
            }}
            style={{
            }} >
            <BoldText color={Color ? Color : Colors.primary }
                style={[Style, { marginLeft: 8, fontWeight: 300, fontSize: 12, } ]} text={text} />
        </TouchableOpacity>
    </>
}



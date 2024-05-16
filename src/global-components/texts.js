import { Text } from "native-base"
import { Color } from "../utils/colors"
const Colors = Color()


export const BoldText = ({
    text,
    style,
    color,
    size
}) => {
    return <>
        <Text
            style={[style, {
                fontSize: size ? size : 15,
                color: color ? color : Colors.primary,
                // fontWeight: 400
            }]}
        >
            {text}
        </Text>
    </>
}

export const BoldText1 = ({
    text,
    style,
    color,
    size
}) => {
    return <>
        <Text
            style={[style, {
                fontSize: size,
                color: color ? color : Colors.primary,
                fontWeight: 700
            }]}
        >
            {text}
        </Text>
    </>
}

export const BoldText2 = ({
    text,
    style,
    color
}) => {
    return <>
        <Text
            style={[style, {
                fontSize: 19,
                color: color ? color : Colors.primary,
                fontWeight: 700
            }]}
        >
            {text}
        </Text>
    </>
}
import { Input, Icon, Stack, Pressable, Center, NativeBaseProvider } from "native-base";
import { EmailIcon } from "./icons";

export function Inputs({
    type,
    placeholder,
    icon,
    setData, data,
    isDisabled,
    ref
}) {
    // numeric
    return <>
        <Input
        style={{
            // backgroundColor:"#fff"
        }}
            ref={ref && ref}
            isDisabled={isDisabled ? true : false}
            keyboardType={type ? type : "default"}
            value={data}
            onChangeText={(value) => setData(value)}
            w={{
                base: "75%",
                x: "100%",
            }}
            h={45}
            pr={20}
            pl={3}
            mb={7}
            borderRadius={10}
            InputLeftElement={icon && <EmailIcon />}
            placeholder={placeholder}
        />
    </>
}

/**
 * num("default", 'numeric', 'email-address', "ascii-capable", 
 * 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 
 * 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 
 * 'visible-password') Determines which keyboard to open, e.g.numeric. 
 * The following values work across platforms: - default - numeric - email-address - phone-pad 
 * The following values work on iOS: - ascii-capable - numbers-and-punctuation - url 
 * - number-pad - name-phone-pad - decimal-pad - twitter - web-search 
 * The following values work on Android: - visible-password
 * 
 */
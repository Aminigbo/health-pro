import { Divider, HStack, Image, Pressable, Skeleton, VStack, View } from "native-base";
import { Color } from "../../utils/colors";
import { BoldText } from "../../global-components/texts";
import { BucketUrl, ProductsUrl } from "../../utils";

const Colors = Color()

export function PopularCat({
    item, navigation
}) {
    // console.log(item)
    return <View style={{
        width: 85,
        // backgroundColor: "red",
        margin: 7
    }}>
        <Pressable

            onPress={() => {
                navigation.navigate("editProduct", { item })
            }}>

            <Image
                style={{
                    height: 79,
                    borderRadius: 10,
                    objectFit: "cover",
                }}
                source={{
                    uri: `https://ypxvrpogluvtermjqiro.supabase.co/storage/v1/object/public/products/${item.file}`
                }} alt="Img" size="xl" />

        </Pressable>

    </View>
}
export function ProductCard({
    item, navigation
}) {
    return <>
        <Pressable

            onPress={() => {
                navigation.navigate("ViewProduct", { item })
            }}
            style={{
                marginBottom: 20, height: 200, width: "48%",
                backgroundColor: Colors.white,
                margin: 1,
                padding: 7
            }}>
            <View style={{
                height: "75%",
                position: "relative"
                // backgroundColor: "red", 
                // padding:10
            }}>
                <Image
                    style={{
                        // width: "100%", 
                        zIndex: 10000,
                        objectFit: "cover",
                        // aspectRatio:1,
                        width: "100%",
                        borderTopRightRadius: 7,
                        borderTopLeftRadius: 7,
                        position: "absolute",
                    }}
                    source={{
                        uri: `https://ypxvrpogluvtermjqiro.supabase.co/storage/v1/object/public/products/${item.file}`
                    }} alt="Alternate Text" size="xl" />
                <Skeleton style={{ height: "90%", position: "absolute", top: 0 }} />

            </View>
            <View style={{
                height: "13%",
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 6
            }}>
                <BoldText text={item.name} color="#000" />
            </View>
            <View style={{
                height: "18%",
                backgroundColor: Colors.primary,
                borderBottomRightRadius: 7,
                borderBottomLeftRadius: 7,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <BoldText text="Buy now" color="#fff" />
            </View>

        </Pressable>
    </>
}
import { launchImageLibrary } from "react-native-image-picker";

export const NumberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
 
export const ProductsUrl = "https://ypxvrpogluvtermjqiro.supabase.co/storage/v1/object/public/"
export const BucketUrl = "https://ypxvrpogluvtermjqiro.supabase.co/storage/v1/object/public/ID_card/"

export const BaseUrl = "https://agrogeni-server.vercel.app/api/v1/"

export function ImagePicker({
    setPickedImage, prop
}) {
    const options = {
        storageOptions: {
            path: "images",
            mediaType: "photo"
        },
        includeBase64: true,
        quality: 0.7
    }
    launchImageLibrary(options, response => {
        // console.log("ResponseXX", response.assets.id)

        if (response.didCancel) {

        } else if (response.error) {

        } else if (response.customButton) {
            console.log(response.customButton)
        } else {
            const source = {
                uri: response.assets[0].uri
            }


            const fileExt = response.assets[0].uri.substring(response.assets[0].uri.lastIndexOf(".") + 1);
            const fileName = `${Math.random()}.${fileExt}`;
            var formData = new FormData();
            formData.append("files", {
                uri: response.assets[0].uri,
                name: fileName,
                type: `image/${fileExt}`
            })

            console.log(formData)
            setPickedImage({
                source,
                fileName,
                formData,
                height: response.assets[0].height,
                width: response.assets[0].width,
                status: true,
                type: prop
            })

        }
    })

}

export const formatDate = (inputDate) => {
    const date = new Date(inputDate);
  
    const day = date.getDate();
    const year = date.getFullYear();
  
    // Define an array to get the month name in the desired format
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    // Get the month in the desired format from the array
    const month = months[date.getMonth()]; 
  
    // Get the ordinal suffix for the day (e.g., 1st, 2nd, 3rd, etc.)
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    const ordinalDay = `${day}${getOrdinalSuffix(day)}`;
  
    // Construct the formatted date string
    // const formattedDate = `${ordinalDay} ${month} ${year}`;
    const formattedDate = `${ordinalDay} ${month}, ${year}`;
  
    return formattedDate;
  };
  
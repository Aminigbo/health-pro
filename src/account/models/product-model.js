import { BaseUrl } from "../../utils";

export async function UploadProductsModel({
    category, name, harvest_date, file, Description, UUID, price
}) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${UUID}`);

    var raw = JSON.stringify({
        "category": category,
        "name": name,
        "harvest_date": harvest_date,
        "file": file,
        "Description": Description,
        "price": price
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BaseUrl}/product/upload-product`, requestOptions);
        const result_1 = await response.text();
        // console.log(result_1)
        let Data = JSON.parse(result_1)
        return Data;
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Network error",
            data: null
        };
    }
}


export async function FetUserProducts({
    UUID
}) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${UUID}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BaseUrl}product/get-vendor-products`, requestOptions);
        const result_1 = await response.text();
        // console.log(result_1)
        let Data = JSON.parse(result_1)
        return Data;
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Network error",
            data: null
        };
    }
}


export async function deleteProductModel({
    product, image, UUID
}){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${UUID}`);

    const raw = JSON.stringify({
        "product": product,
        "image": image
      });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BaseUrl}/product/delet-product`, requestOptions);
        const result_1 = await response.text();
        // console.log(result_1)
        let Data = JSON.parse(result_1)
        return Data;
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Network error",
            data: null
        };
    }
}
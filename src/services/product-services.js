import { BaseUrl } from "../utils";

export async function GetAllProducts({ UUID, toast }) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${UUID}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BaseUrl}product/get-all-products`, requestOptions);
        const result_1 = await response.text();
        let Data = JSON.parse(result_1)
        return Data;
    } catch (error) {
        return {
            success: false,
            message: "Network error"
        }
    }
}

export async function InitiateNegotiationModel({ product, amount, UUID, stage, payment }) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${UUID}`);

    var raw = JSON.stringify({
        "product": product,
        "stage": {
            "stage": stage,
            "amount": amount,
            "payment":payment
        },
        "id": product
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BaseUrl}product/negotiate`, requestOptions);
        const result_1 = await response.text();
        let Data = JSON.parse(result_1)
        return Data;
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Network error"
        }
    }
}




export async function UpdateNegotiation({ UUID, id, status }) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${UUID}`);

    var raw = JSON.stringify({
        "status": status,
        "id": id
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BaseUrl}product/accept-decline`, requestOptions);
        const result_1 = await response.text();
        let Data = JSON.parse(result_1)
        return Data;
    } catch (error) {
        return {
            success: false,
            message: "Network error"
        }
    }
}
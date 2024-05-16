import { supabase } from "../../../configurations/supabase-config";
import { BaseUrl } from "../../utils";

export async function SignupModel({
    name, email, password, phone, location, AccountType, fcmToken
}) {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "fullname": name,
        "email": email,
        "phone": phone,
        "password": password,
        "account_type": AccountType,
        "location": {
            "latitude": 1.23434989843,
            "longitude": 3.43434443,
            "address": location
        },
        "fcmToken": fcmToken
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`https://agrogeni-server.vercel.app/api/v1/auth/signup`, requestOptions);
        const result_1 = await response.text();
        console.log(result_1)
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



export function PublicSignupModel({
    name, id, token, email
}) {
    return supabase
        .from("Rider")
        .insert([{
            name: name,
            phone: "",
            data: {},
            userID: id,
            token: token,
            email: email
        }])
        .then(res => {

        })
}

export function UserPublicSignupModel({
    name, id, token, email
}) {
    return supabase
        .from("userpublic")
        .insert([{
            name: name,
            phone: "",
            data: {},
            userID: id,
            token: token,
            email: email
        }])
        .then(res => {

        })
}

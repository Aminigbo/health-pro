import { supabase } from "../../../configurations/supabase-config";

export async function LoginModel({
    email, password, fcmToken
}) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email,
        "password": password,
        "fcmToken":fcmToken
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {

        // const response = await fetch("192.168.1.102:2025/api/v1/auth/login", requestOptions);
        const response = await fetch("https://agrogeni-server.vercel.app/api/v1/auth/login", requestOptions);
        const result_1 = await response.text();
        // console.log(result_1)
        let Data = JSON.parse(result_1)
        return Data;
    } catch (error) {
        return console.log('error', error);
    }
}
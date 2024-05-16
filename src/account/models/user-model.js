import { supabase } from "../../../configurations/supabase-config";
import { BaseUrl } from "../../utils";

export async function fetchUserData({
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
        const response = await fetch(`${BaseUrl}user/user-by-id`, requestOptions);
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

export async function placeWithdrawal({
    amount, UUID
}) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${UUID}`);

    const raw = JSON.stringify({
        "amount": amount,
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BaseUrl}/user/withdraw`, requestOptions);
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


export function fetchWithdrawalHistory(UUID) {
    return supabase
        .from("withdrawal")
        .select("*")
        .eq("user", UUID)
}
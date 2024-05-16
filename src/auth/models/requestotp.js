const BaseURL = "https://fastapp-server.vercel.app/"

export async function RequestOTP_Call(email) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BaseURL}/api/v1/auth/requet-otp`, requestOptions);
        const result_1 = await response.text();
        const data = JSON.parse(result_1)
        return data;
    } catch (error) {
        return error;
    }
}

export async function ResetPasswordAPI(payload) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "password": payload.password,
        "uuid": payload.uuid
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${BaseURL}/api/v1/auth/reset-password`, requestOptions);
        const result_1 = await response.text();
        console.log(result_1)
        const data = JSON.parse(result_1)
        return data;
    } catch (error) {
        return error;
    }
}
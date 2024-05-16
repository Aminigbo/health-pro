export async function VerifyAccountModel(UUID) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${UUID}`);

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://agrogeni-server.vercel.app/api/v1/auth/activate-account", requestOptions);
        const result_1 = await response.text();
        // console.log(result_1)
        let Data = JSON.parse(result_1)
        return Data;
    } catch (error) {
        return {
            success: false,
            message: "Network error",
            data: null
        };
    }
}

export async function ActivateAccountModel({
    UUID, IDCard,
    name, description, accountname, accountnumber, AccountBank
}) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${UUID}`);

    var raw = JSON.stringify({
        "brandName": name,
        description,
        "accountName": accountname,
        "accountNo": accountnumber,
        "accountBank": AccountBank,
        IDCard
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://agrogeni-server.vercel.app/api/v1/user/update-info", requestOptions);
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
const BaseURL = "https://fastapp-server.vercel.app/"


export function NotifyRidersForARide(payload) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": payload.username,
        "title": "Active delivery order",
        "tokens": payload.tokens,
        "notificationMessage": "There is an active delivery order waiting for a Rider.",
        "largeImg": "https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/images/0.5203534930645486.jpg",
        "id": "RIDER:Home"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://fastapp-server.vercel.app/api/v1/firebase/multiple", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


export function NotifyUserForUpdate(payload) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": "Aminigbo Paul ",
        "title": "Delivery update",
        "token": payload.token,
        "notificationMessage": "There is a delivery update for one of your orders.",
        "largeImg": "https://ddhqtepvmjgbfndcjrkn.supabase.co/storage/v1/object/public/images/0.5203534930645486.jpg",
        "id": `USER:${payload.orderID}`
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`${BaseURL}api/v1/firebase/`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
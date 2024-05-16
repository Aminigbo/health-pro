import { supabase } from "../../../configurations/supabase-config";

export function UpdateProfile(payload) {
    return supabase.auth.updateUser({
        data: payload
    })
}

export function UpdateRiderPublicTable(User) {
    return supabase
        .from("Rider")
        .update({
            name: User.name,
            phone: User.Phone,
            data: User,
            userID: User.id,
        })
        .eq("userID", User.id)
}

export function UpdateIDCARD(card, id) {
    return supabase
        .from("Rider")
        .update({
            id_card: card,
        })
        .eq("userID", id)
}

export function UpdateILicence(card, id) {
    return supabase
        .from("Rider")
        .update({
            licence: card,
        })
        .eq("userID", id)
}

export function SwitchStatus(status, id, disp_Login, User, setloading, FetchAllActiveRides) {
    setloading(true)
    // disp_Login({
    //     ...User,
    //     RiderState: status
    // })
    supabase
        .from("Rider")
        .update({
            status: status,
        })
        .eq("userID", id)
        .then(res => {
            supabase.auth.updateUser({
                data: { RiderState: status }
            })
                .then(res2 => {
                    disp_Login({
                        ...User,
                        RiderState: status
                    })
                    setloading(false)
                    FetchAllActiveRides()
                })
                .catch(error => {
                    setloading(false)
                })
        }).catch(error => {
            setloading(false)
        })
}

export function UpdateUserPublicTable(User) {
    return supabase
        .from("userpublic")
        .update({
            token: User.token,
        })
        .eq("userID", User.id)
}

export function UpdateRiderPublicToken(User) {
    return supabase
        .from("Rider")
        .update({
            token: User.token,
        })
        .eq("userID", User.id)
}


// update token foe all orders user created

export function UpdateUserOrderTokens(User) {
    return supabase
        .from("orders")
        .update({
            userToken: User.token,
        })
        .eq("user", User.user)
}

// update token for all orders Rider accepted
export function UpdateRiderOrderTokens(User) {
    return supabase
        .from("orders")
        .update({
            riderToken: User.token,
        })
        .eq("user", User.user)
}


import { supabase } from "../../../configurations/supabase-config";

export function FetchActiveLogistics() {
    return supabase
        .from("users_public")
        .select("*")
        .eq("account_type", "Logistics Account")
    // ends here too
}

export function cancelDispatchRequest(id) {
    return supabase
        .from("negotiations")
        .update({
            dispatch: false,
        })
        .eq("id", id)
    // ends here too
}

export function FetchBargains({
    UUID
}) {
    return supabase
        .from("negotiations")
        .select("*")
        .or(`vendor.eq.${UUID},buyer.eq.${UUID}, dispatchUUID.eq.${UUID}`)
        // .neq("deal", false)
        // .or(`vendor.eq.${UUID},buyer.eq.${UUID}, deal.neq${false}`)

        .order('id', { ascending: false })
    // ends here too
}

export function assignDispactToBuyer(id, dispatchUUID) {
    console.log(dispatchUUID)
    return supabase
        .from("negotiations")
        .update({
            dispatchUUID
        })
        .eq("id", id)
        .select()
    // ends here too
}

export function getNegotiationById(id) { 
    return supabase
        .from("negotiations")
        .select("*")
        .eq("id", id) 
    // ends here too
}
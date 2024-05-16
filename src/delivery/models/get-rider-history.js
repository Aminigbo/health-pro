import { supabase } from "../../../configurations/supabase-config";

export function RiderOrderHistoryModel(id) {
    return supabase
        .from("orders")
        .select("*")
        .eq('riderID', id)
        .order('id', { ascending: false })

}

export function UserOrderHistoryModel(id) {
    return supabase
        .from("orders")
        .select("*")
        .eq('user', id)
        .order('id', { ascending: false })

}

export function GetSingleOrder(id) {
    return supabase
        .from("orders")
        .select("*")
        .eq('id', id)

}
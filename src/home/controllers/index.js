import { supabase } from "../../../configurations/supabase-config";

export function CreateRideOrder(data){
    return supabase
    .from("orders")
    .upsert([{
        user:data.user.id,
        rider:null,
        status:1,
        data:data,
        user_name:data.user.name,
        userToken:data.token
    }])
    .select()
}

export function GetAllActiveRidersToken(){
    return supabase.from("Rider")
    .select("token")
    .eq("status", true)
}
import { Box, CloseIcon, HStack, IconButton, Text, VStack } from "native-base";
import { supabase } from "../../configurations/supabase-config";
import { Alert } from "react-native";

export function ListenToNegotiation(User, toast, disp_Notification) {
    supabase.channel('custom-all-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'negotiations' },
            (payload) => {
                console.log("VendorXX", payload.new.vendor)
                console.log("User", User.UUID)
                if (payload.new.vendor == User.UUID) {
                    disp_Notification({
                        status: true,
                        data: { ...payload.new, negotiation_id: payload.new.product }
                    })
                }
            }
        )
        .subscribe()
}
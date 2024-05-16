import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { setupURLPolyfill } from 'react-native-url-polyfill'

const supabaseUrl = "https://ypxvrpogluvtermjqiro.supabase.co";
const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlweHZycG9nbHV2dGVybWpxaXJvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNDg3MTMxMiwiZXhwIjoyMDIwNDQ3MzEyfQ.PYX71OVn5nOxL5gIJbZivob77MSaXQDeIeakcQ2ZY7Y";
setupURLPolyfill()

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        detectSessionInUrl: false,
        storage: AsyncStorage,
      },
    }
  );
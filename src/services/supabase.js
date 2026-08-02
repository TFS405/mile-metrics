import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://macmdcpgaktssvkcqujc.supabase.co';
const supabaseKey = 'sb_publishable_kX2tYN5PQBirzRPylMpKnQ_pk_IVCc6';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

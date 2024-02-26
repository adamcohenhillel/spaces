import type { GetServerSidePropsContext } from 'next';

import { createClient as createServerClient } from '@/utils/supabase/server-props';
import { createClient } from '@/utils/supabase/component';
import Chat from '@/components/Chat';

export default function Index() {
  const supabase = createClient();

  return <Chat supabaseClient={supabase} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerClient(context);
  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

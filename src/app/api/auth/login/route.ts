import { createClient } from '@/shared/lib/supabase/server';
import { encodedRedirect } from '@/shared/lib/utils';
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: email!,
    password: password!,
  });

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message);
  }

  return redirect('/protected');
}

import { useSupabaseClient } from '@supabase/auth-helpers-react';

const useSignIn = () => {
  const supabase = useSupabaseClient();

  const signInWithEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
      });
      if (error) throw error;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { signInWithEmail, signOut };
};

export default useSignIn;

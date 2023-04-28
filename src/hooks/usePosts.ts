import { useCallback, useState } from 'react';
import { Database } from '@/types/database.types';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Post } from '@/types/Post';

const useGetPosts = () => {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const getPosts = useCallback(
    async (limit?: number) => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .limit(limit || 50);
        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        setPosts([]);
        console.log(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [supabase]
  );

  const createPost = async (title: string, body: string) => {
    if (!user) throw new Error('User not found');
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title,
        body,
        author: user.id,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  const updatePost = async (id: string, title: string, body: string) => {
    if (!user) throw new Error('User not found');
    const { data, error } = await supabase
      .from('posts')
      .update({
        title,
        body,
      })
      .match({ id, author: user.id })
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  return {
    getPosts,
    updatePost,
    createPost,
    posts,
    loading,
  };
};

export default useGetPosts;

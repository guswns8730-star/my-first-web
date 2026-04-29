import { Post } from './posts';
import supabase from './supabase';

export async function fetchPublishedPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id,title,summary,content,published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(12);

    if (error) throw error;
    if (!data) return [];

    return data.map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.summary ?? (p.content ? JSON.stringify(p.content) : ''),
      date: p.published_at ? new Date(p.published_at).toISOString().split('T')[0] : ''
    }));
  } catch (e) {
    console.error('fetchPublishedPosts error', e);
    return [];
  }
}

export async function fetchPostById(id: string): Promise<Post | undefined> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id,title,summary,content,published_at')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      title: data.title,
      description: data.summary ?? (data.content ? JSON.stringify(data.content) : ''),
      date: data.published_at ? new Date(data.published_at).toISOString().split('T')[0] : ''
    };
  } catch (e) {
    console.error('fetchPostById error', e);
    return undefined;
  }
}

import { createClient } from "./supabase/server";

export interface Post {
  id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  profiles?: {
    username: string | null;
  };
}

export async function getPosts(): Promise<Post[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getPosts Error:", error);
    return [];
  }

  return data as Post[];
}

export async function getPostById(id: string): Promise<Post | undefined> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getPostById Error:", error);
    return undefined;
  }

  return data as Post;
}

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

export async function createPost({
  title,
  content,
  user_id,
}: {
  title: string;
  content: string;
  user_id: string;
}): Promise<Post | undefined> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .insert({ title, content, user_id })
    .select("*, profiles(username)")
    .single();

  if (error) {
    console.error("createPost Error:", error);
    return undefined;
  }

  return data as Post;
}

export async function updatePost(
  id: string,
  { title, content }: { title?: string; content?: string }
): Promise<Post | undefined> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .update({ title, content })
    .eq("id", id)
    .select("*, profiles(username)")
    .single();

  if (error) {
    console.error("updatePost Error:", error);
    return undefined;
  }

  return data as Post;
}

export async function deletePost(id: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error("deletePost Error:", error);
    return false;
  }

  return true;
}

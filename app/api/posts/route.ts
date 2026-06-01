import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, user_id } = body;

    if (!title || !content || !user_id) {
      return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("posts")
      .insert({ title, content, user_id })
      .select("id, user_id, title, content, created_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

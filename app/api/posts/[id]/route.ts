import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

export async function PUT(req: Request, context: any) {
  try {
    const params = context?.params;
    const id = params?.id ?? (typeof params === "function" ? (await params()).id : undefined) ?? (await params)?.id;
    const body = await req.json();
    const { title, content } = body;

    if (!title && !content) {
      return NextResponse.json({ error: "수정할 값이 없습니다." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("posts")
      .update({ title, content })
      .eq("id", id)
      .select("id, user_id, title, content, created_at")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, context: any) {
  try {
    const params = context?.params;
    const id = params?.id ?? (typeof params === "function" ? (await params()).id : undefined) ?? (await params)?.id;

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

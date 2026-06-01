import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";

async function resolveIdFromContext(context: any) {
  const params = context?.params;
  const id = params?.id ?? (typeof params === "function" ? (await params()).id : undefined) ?? (await params)?.id;
  return id;
}

export async function PUT(req: Request, context: any) {
  try {
    const supabase = await createServerClient();
    const id = await resolveIdFromContext(context);

    // 인증된 사용자 확인
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr || !user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const body = await req.json();
    const { title, content } = body;

    if (!title && !content) {
      return NextResponse.json({ error: "수정할 값이 없습니다." }, { status: 400 });
    }

    // 작성자 확인
    const { data: existing, error: fetchErr } = await supabase.from("posts").select("user_id").eq("id", id).single();
    if (fetchErr || !existing) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    if (existing.user_id !== user.id) {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
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
    const supabase = await createServerClient();
    const id = await resolveIdFromContext(context);

    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr || !user) {
      return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    // 작성자 확인
    const { data: existing, error: fetchErr } = await supabase.from("posts").select("user_id").eq("id", id).single();
    if (fetchErr || !existing) {
      return NextResponse.json({ error: "게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    if (existing.user_id !== user.id) {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "서버 에러" }, { status: 500 });
  }
}

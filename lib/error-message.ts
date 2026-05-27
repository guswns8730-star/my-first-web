/**
 * Supabase 또는 네트워크 에러를 사용자 친화적인 한글 메시지로 변환합니다.
 */
export function getErrorMessage(error: any): string {
  if (!error) return "알 수 없는 오류가 발생했습니다.";

  // Supabase RLS 또는 권한 에러 코드: 42501
  const code = error.code || (error.status ? String(error.status) : "");
  const message = error.message || "";

  if (code === "42501" || message.includes("row-level security")) {
    return "이 작업을 수행할 권한이 없습니다.";
  }

  if (message.includes("Failed to fetch") || message.includes("network error")) {
    return "인터넷 연결을 확인하고 다시 시도해 주세요.";
  }

  if (code === "PGRST116" || message.includes("not found")) {
    return "요청하신 게시글을 찾을 수 없습니다.";
  }

  if (message.includes("Invalid login credentials") || code === "invalid_credentials") {
    return "이메일 또는 비밀번호가 일치하지 않습니다.";
  }

  if (message.includes("User already registered") || code === "user_already_exists") {
    return "이미 가입된 이메일 주소입니다.";
  }

  // 기본 에러 메시지
  return "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
}

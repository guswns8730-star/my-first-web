# Context — my-first-web 프로젝트 상태

## 현재 요약
- 프로젝트: 개인 블로그 템플릿 (Next.js App Router + Supabase)
- 진행 상황: CRUD 및 보안(RLS) 적용 완료. 에러 처리, 로딩 UX, 폼 검증을 포함한 완성도 높은 블로그 구축 완료.

## 상세 상태
- 완료:
  - 홈, 목록, 상세 페이지 UI 및 데이터 연동
  - 게시글 작성/수정/삭제 기능 (CRUD)
  - Supabase Auth 인증 및 미들웨어 보호
  - **Ch11 Row Level Security (RLS)** DB 레벨 보안 적용
  - **Ch12 에러 처리와 UX 완성**
    - `error.tsx`, `loading.tsx` (스켈레톤 UI) 적용
    - 게시글 작성/수정 폼 유효성 검증
    - 사용자 친화적 에러 메시지 유틸리티 (`getErrorMessage`)
    - 검색 결과 없음 및 게시글 없음 빈 상태(Empty State) 처리

- 예정:
  - 이미지 업로드 및 Storage 연동 (Ch13 예상)
  - 마이페이지 및 프로필 관리

## 기술 결정 사항
- 프레임워크: Next.js 16 (App Router)
- 스타일: Tailwind CSS 4
- 데이터베이스: PostgreSQL (Supabase)
- 인증: Supabase Auth

## 가이드 및 보안 규정
- **보안**: RLS를 통한 DB 보안 강제, `service_role` 키 노출 금지
- **UX**: 스켈레톤 로딩, 명확한 에러 안내, 폼 제출 전 검증 생활화

_마지막 업데이트: 2026-05-27 (Chapter 12 완료)_

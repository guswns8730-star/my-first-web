# Context — my-first-web 프로젝트 상태

## 현재 상태

- 마지막 작업일: 2026-02-26
- 완료된 작업: 홈 페이지, 헤더/푸터 레이아웃, 포스트 목록
- 진행 중: 포스트 상세 페이지 (UI 완료, 데이터 연결 미완)
- 미착수: 마이페이지

## 기술 결정 사항

- 인증: Supabase Auth (Email)
- 상태관리: React Context (AuthProvider)
- 이미지: Supabase Storage 사용 예정

## 해결된 이슈

- shadcn/ui Button variant가 디자인 토큰과 불일치 → globals.css의 --primary 수정으로 해결
- 모바일 헤더 메뉴가 겹침 → Sheet 컴포넌트로 교체

## 알게 된 점

- Tailwind CSS 4 기준에서는 `@import "tailwindcss"` + `@theme` 블록으로 설정 (`tailwind.config.js` 불필요)
- Server Component에서 useRouter 사용 불가 → redirect() 사용

## 최근 업데이트



_Last updated: 2026-04-29_

## 실습 목표 (교수님 과제)

- 목표: 블로그의 페이지 구조 보강 및 데이터베이스 모델 설계
- 요구사항 요약:
	1) 페이지 맵 검토 및 보강 (App Router URL 구조)
	2) 데이터 모델 설계 (`profiles`, `posts` 최소 포함, 1:N 관계)
	3) Copilot에게 데이터 모델 요청 및 결과 검토
	4) 와이어프레임 생성 요청 (Copilot Vision 또는 v0)
	5) shadcn/ui 초기화 및 핵심 컴포넌트 추가
	6) CSS 변수로 디자인 토큰 커스터마이즈
	7) 설계 문서(ARCHITECTURE.md, copilot-instructions.md, context.md, todo.md) 완성 후 GitHub에 push

현재 상태:
- 페이지맵 보강 완료
- 기본 데이터 모델(간단 버전) 및 SQL DDL 초안 생성 (`db/schema.sql`)
- shadcn/ui 초기화 안내 문서 추가 (`SHADCN_UI_INIT.md`)

다음 권장 단계: 데이터 모델 검토 → 와이어프레임 요청 → shadcn 초기화(로컬) → 전역 CSS 변수 적용

_Last updated: 2026-04-29_

_Last updated: 2026-04-29_
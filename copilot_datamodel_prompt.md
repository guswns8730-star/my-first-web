# Copilot 데이터 모델 요청 프롬프트 (한국어)

아래 프롬프트를 Copilot(또는 유사한 AI)에게 전달하여 정규화된 PostgreSQL 스키마와 추가 권장 사항(SQL DDL 포함)을 생성하도록 요청하세요.

프롬프트 예시:

"간단한 블로그 애플리케이션을 위한 정규화된 PostgreSQL 스키마를 제안해줘. 요구사항:
- 사용자(저자)와 포스트의 1:N 관계를 반드시 포함할 것.
- 댓글(comments)과 태그(tags)를 옵션으로 포함할 것(태그는 many-to-many).
- 각 테이블의 컬럼, 자료형, 제약조건(PK, FK, UNIQUE), 인덱스, 그리고 필요한 경우 트리거(예: tsvector 생성)를 포함할 것.
- `content` 필드는 리치 텍스트 또는 마크다운을 안전하게 저장할 수 있게 JSONB로 제안해보고, 그 이유를 간단히 설명할 것.
- draft/published 상태를 지원할 것(상태 컬럼 및 published_at 처리).
- 성능을 고려한 인덱스 제안(예: slug, published_at, full-text GIN 인덱스).
- 샘플 `CREATE TABLE` DDL, 트리거, 인덱스, 그리고 예시 쿼리 3개를 포함할 것.

출력은 SQL DDL 블록과 간단한 설계 노트(200~400자)를 포함해줘."

---

# Copilot prompt (English, optional)

"Suggest a normalized PostgreSQL schema for a simple blog application including users (authors) and posts with a 1:N relationship. Optionally include comments and tags (many-to-many). Provide column types, constraints (PK/FK/UNIQUE), useful indexes, and triggers (e.g., tsvector population). Recommend storing `content` as JSONB and explain briefly. Support draft/published states (status + published_at). Include SQL CREATE TABLE statements, triggers, indexes, and 3 example queries. Also include a short design note (200-400 words)."

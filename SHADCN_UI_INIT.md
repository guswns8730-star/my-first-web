# shadcn/ui 초기화 안내 (my-first-web)

이 문서는 `shadcn/ui`를 프로젝트에 초기화하고 기본 스타일 토큰을 커스터마이즈하는 방법을 안내합니다.

1) 설치
```bash
# 프로젝트 루트에서
npm install @shadcn/ui
# 또는 프로젝트가 사용하는 shadcn 설치 스크립트를 따르세요
```

2) 구성 위치
- 본 레포는 `components/ui/` 아래에 shadcn 스타일 컴포넌트가 이미 위치합니다. 필요한 컴포넌트는 여기서 가져다 쓰면 됩니다.

3) 전역 CSS 변수 설정
- 파일: `app/globals.css`
- 예시 변수 추가:

```css
:root {
  --primary:  #0ea5a4; /* 프로젝트 주 색상 */
  --background: #0f172a;
  --card: #111827;
}
```

이 값을 직접 변경하면 `shadcn/ui` 컴포넌트의 기본 색상 토큰을 덮어쓸 수 있습니다.

4) Tailwind / shadcn 스타일 통합
- 프로젝트는 Tailwind CSS 4를 사용합니다. `globals.css`에서 디자인 토큰을 정의한 뒤, 컴포넌트에서 Tailwind 유틸 클래스와 조합하여 사용하세요.

5) 사용 예시 (컴포넌트에서 가져오기)
```tsx
import { Button } from '../components/ui/button'

export default function Example() {
  return <Button className="bg-[var(--primary)]">Primary</Button>
}
```

6) 추천 초기 컴포넌트
- Button, Card, Input, Dialog: 기본적으로 `components/ui/`에서 사용
- 레이아웃 컴포넌트: `components/PostList.tsx`, `components/PostCard.tsx`, `components/PostDetail.tsx`

7) 체크리스트
- [ ] `@shadcn/ui` 설치 완료
- [ ] `app/globals.css`에 색상 변수 추가
- [ ] 필요한 shadcn 컴포넌트 `components/ui/`에 존재하는지 확인
- [ ] 버튼/카드 등 핵심 컴포넌트를 테마에 맞게 테스트

_Last updated: 2026-04-29_

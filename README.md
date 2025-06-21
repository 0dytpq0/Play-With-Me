# Play-With-Me

## 📝 프로젝트 개요

**Play-With-Me**는 실시간 채팅, 게임 듀오 예약, 사용자 프로필 관리 등 다양한 소셜 기능을 제공하는 웹 서비스입니다. Next.js App Router 기반의 최신 프론트엔드 아키텍처와 Supabase를 활용한 백엔드 연동으로, 모던한 UI/UX와 실시간 데이터 처리를 모두 경험할 수 있습니다.

---

## 🚩 핵심 기능

- **회원가입/로그인/로그아웃**
  - 이메일 기반 인증 및 세션 관리
- **프로필 관리**
  - 닉네임, 한줄소개, 프로필 이미지, 티어 등 수정
- **채팅**
  - 실시간 채팅방 목록/미리보기
  - 채팅방 진입 및 메시지 송수신
- **게임 듀오 예약 시스템**
  - 게임 듀오 예약 리스트 확인 및 신청

---

## 🛠️ 사용 기술 스택

- **Frontend**
  - Next.js (App Router, Parallel Routing)
  - React 18+
  - TypeScript (Airbnb 스타일 가이드, 타입 선언 엄격)
  - Tailwind CSS
  - Shadcn UI (Dialog, Sheet, Button 등)
  - TanStack Query (react-query)
  - React Hook Form, Zod (폼/유효성 검사)
- **Backend & Infra**
  - Supabase (DB, Auth, Storage)
- **기타**
  - FSD(Feature Sliced Design) 구조
  - ESLint, Prettier

---

## ⚡ 프로젝트 구조

```
src/
  app/                # Next.js App Router 구조
  features/           # 도메인별 기능 (chat, reservate, auth 등)
  entities/           # 핵심 엔티티(유저 등)
  shared/             # 공용 컴포넌트, 유틸, 스타일
  widgets/            # 복합 UI 섹션
```

- **Parallel Routing**: `/@modal`, `/@chatModal` 등 슬롯 기반 라우팅으로 모달·시트 분리
- **FSD**: 도메인-엔티티-공용 레이어 분리로 유지보수성 강화

---

## 🐞 주요 이슈 & 디버깅 경험

### 1. **Next.js 15버전 async Dynamic APIs**

- Dynamic routing에서 params를 사용할 때 Promise 타입으로 감싸서 사용하도록 변경된 부분 참고 후 수정

### 2. **Next.js Parallel Route 모달 닫힘 문제**

- 실제 URL에 슬롯 경로가 포함되지 않아 Parallel 모달이 닫히지 않는 현상 발생
- 컴포넌트로 모달을 구현 후 setTimeout을 활용해 모달이 닫힌 후 URL을 이동하도록 해결

### 3. **관심사 분리**

- 리팩토링을 할 때 UI, 비즈니스 로직에 대한 관심사 분리에 고민하며 리팩토링 진행

### 4. **타입 선언/코드 스타일**

- 꾸준히 신경쓰면서 하려 노력했으나 지켜지지 않는 부분을 위해 windsurf 파일을 통하여 보완

### 5. **Supabase Trigger 구현**

- Route handler에서 많은 분기를 처리하려다 보니 성능저하가 우려됨
- Supabase의 Trigger를 통해 부하를 줄여줄 수 있을거라 판단하여 AI의 도움을 받아 구현하여 성능 개선

---

## 💡 회고 및 느낀점

이번 프로젝트를 진행하면서 비록 버전 1에선 많은 기능을 구현하지 못했고, 부족함이 많지만 완주한 경험, 고민했던 흔적들이 쌓여 뿌듯함과 자신감이 생기게 되는 프로젝트가 되었다.

특히, 이번에 학습 해보고자 했던 React Hook Form, zod, 최신 Next.js App Router의 Parallel Routing, FSD 구조 등을 실제로 적용해보며 아는 것만이 아닌 익숙해지는 계기가 되어 성장할 수 있었다.

---

## 향후 개선점

- 반응형 디자인
- 최근 함께 플레이한 유저, 최근 대화 목록 등 추가 기능 구현
- 실시간 채팅 Optimistic update 적용
- 친구 창 구현
  ...


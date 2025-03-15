# YSOArcadeRecords
- 본인 YSO(kuman514)가 기록한 각종 고전 아케이드 게임 관련 기록을 열람할 수 있는 앱.
- [YSOShmupRecords](https://github.com/kuman514/YSOShmupRecords)가 이 프로젝트의 전신입니다.
- [앱 방문하기](https://yso-arcade-records.vercel.app/)

## 프로젝트를 만든 목적
- YSOShmupRecords에서 계승됨
  - 슈팅게임 동호인들과 더욱 원활하게 교류하기 위해 제작되었습니다.
  - 기존에는 SNS나 디스코드 등의 메신저로 교류하였으나, 이는 다른 종류의 글과 메시지까지 난잡하게 섞여 있어 슈팅게임 기록을 제대로 찾아보기 어려운 문제를 안고 있습니다.
  - 이러한 문제를 해결하고자 제가 달성한 각종 기록을 더욱 쉽게 열람하고 공유할 수 있는 사이트를 직접 개발하였습니다.
- 기존 YSOShmupRecords의 단점 개선
  - (작성 중)

## 개발 환경
- Windows 11 또는 MacOS 15에서 개발
- Visual Studio Code 사용
- yarn berry 대신 npm 사용
  - 사유: Next.js 15의 Turbopack에서 yarn berry의 Plug'n Play를 사용하지 못함.
    - 근거: [Turbopack Unsupported Features](https://nextjs.org/docs/app/api-reference/turbopack#unsupported-features)의 Yarn PnP 항목에, `We are currently not planning to support Yarn PnP in Next.js with Turbopack. (저희는 현재 Next.js Turbopack에 대한 Yarn PnP를 지원할 계획이 없습니다.)`라고 적혀 있다.

## 태스크 브레이크다운
- ~~YSOArcadeRecords MVP 완성하기~~ (완료)
  - ~~YSOShmupRecords로부터 승계되는 페이지~~ (완료)
    - ~~대문 페이지~~ (완료)
      - ~~대문용 로고~~ (완료)
      - ~~대문용 링크~~ (완료)
      - ~~이 곳은 뭐하는 곳인가~~ (완료)
      - ~~YSO(kuman514)는 누구인가~~ (완료)
      - ~~통산 최고 성과는 무엇인가~~ (완료)
    - ~~기록 목록 페이지~~ (완료)
    - ~~기록 상세 페이지~~ (완료)
  - ~~신규 추가 페이지~~ (완료)
    - ~~기록 쓰기 페이지~~ (완료)
  - ~~YSOShmupRecords로부터 승계되는 컴포넌트~~ (완료)
    - ~~페이지 헤더~~ (완료)
      - ~~메인 헤더~~ (완료)
      - ~~스크롤 시 보일 대체 헤더~~ (완료)
      - ~~사이드바~~ (완료)
    - ~~게시물 목록 아이템~~ (완료)
    - ~~비순서형 리스트~~ (완료)
    - ~~모달~~ (완료)
      - ~~모달 콘텐츠 오버레이~~ (완료)
      - ~~클릭 에리어~~ (완료)
    - ~~이미지 컨트롤러~~ (완료)
      - ~~이미지 줌 컨트롤러~~ (완료)
      - ~~이전/다음 이미지 컨트롤러~~ (완료)
    - ~~스켈레톤 컴포넌트~~ (완료)
    - ~~포스트 목록 아이템~~ (완료)
    - ~~기록 상세 포스트~~ (완료)
  - ~~신규 추가 컴포넌트~~ (완료)
    - ~~포스트 폼~~ (완료)
      - ~~아케이드 기록 포스트 폼~~ (완료)
  - ~~그 외~~ (완료)
    - ~~아케이드 기록 구성 요소 타입 정의~~ (완료)
    - ~~데이터베이스 및 파일 스토리지 정하기~~ (완료) -> Supabase를 사용하기로 결정
      - ~~조건~~
        - ~~되도록 상시 무료로 이용할 수 있어야 한다.~~
          - ~~자금의 상황에 따라 이 조건을 다소 어길 수 있다.~~
        - ~~SQL을 사용한 데이터베이스 열람 및 조작이 가능해야 한다.~~
          - ~~SQL Injection을 방지하기 위해, Object Related Mapping을 사용할 수도 있다.~~
        - ~~로그인 세션의 경우, Lucia와 연동이 가능해야 한다.~~
          - ~~Lucia는 올해 초에 퇴역하였으며, 세션 구현 학습용으로만 운영된다고 한다. (근거: https://github.com/lucia-auth/lucia/discussions/1707)~~
          - ~~로그인 세션을 구현할 다른 방법을 찾아보는 중.~~
      - ~~임시 조치~~
        - ~~확실히 정해질 때까지 임시 로컬 DB로 `better-sqlite3` 사용.~~
        - ~~확실히 정해질 경우, `better-sqlite3`와 `lucia-auth`를 버린다.~~
    - ~~포스트 구성 요소 타입 정의~~ (완료)
    - ~~아케이드 정보 타입 정의~~ (완료)
    - ~~플레이 수단 타입 정의~~ (완료)
    - ~~Supabase 기능 구축~~ (완료)
      - ~~이 링크에 있는 절차를 따름: https://supabase.com/docs/guides/auth/server-side/nextjs~~ (완료)
      - ~~데이터베이스 구축~~ (완료)
        - ~~아케이드 기록 데이터베이스 구축~~ (완료)
        - ~~아케이드 정보 데이터베이스 구축~~ (완료)
        - ~~플레이 수단 데이터베이스 구축~~ (완료)
      - ~~관리자 로그인 기능 구축~~ (완료)
      - ~~아케이드 기록 테스트~~ (완료)
        - ~~기록 생성 및 테스트~~ (완료)
        - ~~기록 수정 및 삭제 테스트~~ (완료)
  - ~~Vercel을 통해 배포하기~~ (완료)
- YSOArcadeRecords MVP 이후 추가 기능 완성하기
  - 통산 최고 성과에 기록 링크 걸기
  - 신규 추가 페이지
    - 리뷰 목록 페이지
    - 리뷰 아티클 페이지
    - 리뷰 쓰기 페이지
    - 갤러리 목록 페이지
    - 갤러리 페이지
    - 갤러리 쓰기 페이지
  - 신규 추가 컴포넌트
    - 포스트
      - 리뷰 포스트
      - 갤러리 포스트
    - 포스트 폼
      - 리뷰 포스트 폼
      - 갤러리 포스트 폼
  - 리뷰 구성 요소 타입 정의
  - 갤러리 구성 요소 타입 정의
  - Supabase 기능 연계계
    - 데이터베이스 구축
      - 리뷰 데이터베이스 구축 및 테스트
      - 갤러리 데이터베이스 구축 및 테스트

## 트러블슈팅 목록
- Next Image에 fill 속성을 부여했는데 이미지가 페이지를 전부 다 덮는 문제.
  - Next Image 컴포넌트에 fill 속성을 부여할 때, style에 `position:absolute; height:100%; width:100%; left:0; top:0; right:0; bottom:0; color:transparent;` 값이 적용되기 때문이다.
  - 이를 해결하려면, 부모 컴포넌트의 style에 `position: relative`를 부여하자.
- Dynamic path를 위해 페이지 컴포넌트에 Path Parameters를 Props(`params`)로 추가했을 때 await하라는 문제.
  - `params should be awaited before using its properties.` 같은 에러가 발생한다.
  - `params`와 `searchParams`는 Dynamic API 중 일부로, 페이지나 레이아웃, 메타데이터 API, 라우트 핸들러에 제공되는데, Next.js 15에서 Dynamic API를 비동기적으로 만들었기 때문이라고 한다.
    - `params`와 `searchParams` 외에도, `next/headers` 패키지에 있는 `cookies()`, `draftMode()`, `headers()` 또한 Dynamic API라고 한다.
  - 이를 해결하려면, 페이지 컴포넌트의 Props 중 `params`와 `searchParams`를 `Promise<{ 기존 파라미터 타입 }>` 타입으로 바꿔준 뒤, 각 `params`와 `searchParams`를 await하여 받아오는 로직을 함수 내용에 추가한다.
    - 물론, Promise 객체를 await하는 내용을 추가하려면, 해당 페이지 컴포넌트를 async function으로 선언해야 한다.
  - 근거
    - https://nextjs.org/docs/messages/sync-dynamic-apis
    - https://nextjs.org/docs/messages/sync-dynamic-apis#possible-ways-to-fix-it
- 계속된 렌더 트리 불일치 에러
  - `npm run build`에서 자꾸 `Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object.` 같은게 뜨거나, `npm run build`가 성공하더라도 `npm run start`로 실행된 환경에서 [Minified React Error #130](https://react.dev/errors/130?args%5B%5D=object&args%5B%5D=)이 나오는 현상이 발생.
    - 어떤 곳이든 전부 클라이언트 컴포넌트로 만들거나, 앱이 전역 상태를 사용하도록 구조를 변경해도, 동일한 현상이 발생한다.
  - SVG가 사용된 부분을 모두 제거했더니 `npm run build`는 물론 `npm run start` 환경에서까지 잘 작동한다.
  - 그래서 원인이 무엇이었나?
    - 당시 SVG를 컴포넌트로 변경하기 위해 사용한 패키지가 `svgr-webpack`이었다.
      - `next/image`에 SVG를 넣는 것보단 `svgr-webpack`을 사용하여 컴포넌트화 시키는 것이 `fill`이나 `stroke`같은 더욱 유연한 스타일링을 적용할 수 있었기에 설치 후 설정했었다.
      - 확인해보니, `svgr-webpack`으로 전환된 SVG 컴포넌트들은 클라이언트 컴포넌트.
      - `svgr-webpack`으로 전환된 SVG 컴포넌트를 제거하고 그 자리에 임시 텍스트를 넣으니, 빌드 환경에서의 동작까지 전부 에러 없이 진행되었다.
    - 프로젝트 내에서의 SVG 또한, `fill`이나 `stroke`같은 스타일링을 각각 한 가지만 사용한지라, 유연한 스타일링이 필요하지 않을 것이라 판단, `svgr-webpack`을 제거하고 `next/image`에 SVG를 넣는 방법으로 회귀하였다.
- 이미지를 여러 개 첨부한 기록을 등록할 때 client side exception이 발생하는 현상
  - 현재 프로젝트는 Vercel에 배포한 상태이며, 여기서 에러 코드 413이 발생한다.
  - Vercel에 배포된 함수가 받아들이는 payload의 사이즈는 4.5mb를 넘지 않는다고 한다.
    - 근거: https://vercel.com/docs/errors/FUNCTION_PAYLOAD_TOO_LARGE#troubleshoot
  - 이에 따라, 이미지와 데이터를 하나의 pyaload에 함께 올리는 것이 아닌, 이미지를 개별로 따로 올리고 그 다음에 본 데이터를 제출하는 전략을 취하는 것이 좋겠다.

## 버그 목록
- ~~기록에 태그가 없을 때 태그 영역에 검은 사각형 모양 점이 나타나는 현상~~ `v1.0.1에 배포 예정`
- 이미지를 여러 개 첨부한 기록을 등록할 때 client side exception이 발생하는 현상 (응답 코드 `413`)

## 버전
- `v1.0.0` (2025년 3월 14일)
  - 최초 릴리즈

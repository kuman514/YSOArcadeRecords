# YSOArcadeRecords
- 본인 YSO(kuman514)가 기록한 각종 고전 아케이드 게임 관련 기록을 열람할 수 있는 앱.
- [YSOShmupRecords](https://github.com/kuman514/YSOShmupRecords)가 이 프로젝트의 전신입니다.

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
- YSOArcadeRecords 완성하기
  - YSOShmupRecords로부터 승계되는 페이지
    - 대문 페이지
      - 대문용 로고
      - 대문용 캐치프레이즈
      - 대문용 링크
    - 소개 페이지
      - 이 곳은 뭐하는 곳인가
      - YSO(kuman514)는 누구인가
      - 통산 최고 성과는 무엇인가 (링크와 함께 제공)
    - 기록 목록 페이지
    - 기록 상세 페이지
  - 신규 추가 페이지
    - 리뷰 목록 페이지
    - 리뷰 상세 페이지
    - 갤러리 목록 페이지
    - 갤러리 페이지
    - 포스트 쓰기 페이지
  - YSOShmupRecords로부터 승계되는 컴포넌트
    - 페이지 헤더
      - ~~메인 헤더~~ (완료)
      - ~~스크롤 시 보일 대체 헤더~~ (완료)
      - 사이드바
    - ~~게시물 목록 아이템~~ (완료)
    - ~~비순서형 리스트~~ (완료)
    - ~~모달~~ (완료)
      - ~~모달 콘텐츠 오버레이~~ (완료)
      - ~~클릭 에리어~~ (완료)
    - 이미지 컨트롤러
      - ~~이미지 줌 컨트롤러~~ (완료)
      - 이전/다음 이미지 컨트롤러
    - 스켈레톤 컴포넌트
  - 신규 추가 컴포넌트
    - 포스트 폼
      - 아케이드 기록 포스트 폼
      - 리뷰 포스트 폼
      - 갤러리 포스트 폼
  - 그 외
    - 아케이드 기록 구성 요소 타입 정의
    - 리뷰 구성 요소 타입 정의
    - 갤러리 구성 요소 타입 정의
    - 포스트 구성 요소 타입 정의
    - 데이터베이스 및 파일 스토리지 정하기
    - 아케이드 기록 데이터베이스 구축
    - 리뷰 데이터베이스 구축
    - 갤러리 데이터베이스 구축
    - 관리자 로그인 기능 구축

## 트러블슈팅 목록
- Next Image에 fill 속성을 부여했는데 이미지가 페이지를 전부 다 덮는 문제.
  - Next Image 컴포넌트에 fill 속성을 부여할 때, style에 `position:absolute; height:100%; width:100%; left:0; top:0; right:0; bottom:0; color:transparent;` 값이 적용되기 때문이다.
  - 이를 해결하려면, 부모 컴포넌트의 style에 `position: relative`를 부여하자.

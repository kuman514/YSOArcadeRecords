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

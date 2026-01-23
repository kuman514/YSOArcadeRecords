# 메모

## 아케이드 기록 라우팅 개선 관련, Cursor Agent에게 요청할 내용
- Next.js 16 App router를 사용 중이야.
- `/records/{arcadeId}/{arcadeRecordId}`를 `/records/{arcadeRecordId}`로 옮겨줘.
- 기존 `/records/{arcadeId}`의 `{arcadeId}`는 queryString으로 대체하고 싶어. 즉, `/records/{arcadeId}`를 `/records?arcadeId={arcadeId}`로 만들어달라는 이야기야.
  - `/records?arcadeId={arcadeId}`에서, `arcadeId` queryString이 있다면, `{arcadeInfo.label} 기록 목록`을 표시해주고, 없다면 `모든 아케이드 기록 목록`으로 표시해줘.
- 기존의 `/records/{arcadeId}/{arcadeRecordId}`는 `/records/{arcadeRecordId}`로 리다이렉트 시켜줘.
- 혹시 모듈 내에 `/records/{arcadeId}/{arcadeRecordId}`로 가는 링크가 있다면 `/records/{arcadeRecordId}`로 가게끔 코드를 변경해줘.
- 혹시 모듈 내에 `/records/{arcadeId}`로 가는 링크가 있다면 `/records?arcadeId={arcadeId}`로 가게끔 코드를 변경해줘.

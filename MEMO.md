# 메모

## 이 문서의 목적
- 현재 겪고 있는 문제를 정리하여 요구사항을 정의하고 AI 에이전트에게 요청사항으로 전달하기 위함.
- 사용량 제한 등등으로 인해 AI 에이전트 사용이 불가능한 경우에도, 정의한 문제를 본인의 태스크로 처리할 목적도 있음.

## 아케이드 기록 라우팅 개선 관련, Cursor Agent에게 요청할 내용
- Next.js 16 App router를 사용 중이야.
- `/records/{arcadeId}/{arcadeRecordId}`를 `/records/{arcadeRecordId}`로 옮겨줘.
- 기존 `/records/{arcadeId}`의 `{arcadeId}`는 queryString으로 대체하고 싶어. 즉, `/records/{arcadeId}`를 `/records?arcadeId={arcadeId}`로 만들어달라는 이야기야.
  - `/records?arcadeId={arcadeId}`에서, `arcadeId` queryString이 있다면, `{arcadeInfo.label} 기록 목록`을 표시해주고, 없다면 `모든 아케이드 기록 목록`으로 표시해줘.
- 기존의 `/records/{arcadeId}/{arcadeRecordId}`는 `/records/{arcadeRecordId}`로 리다이렉트 시켜줘.
- 혹시 모듈 내에 `/records/{arcadeId}/{arcadeRecordId}`로 가는 링크가 있다면 `/records/{arcadeRecordId}`로 가게끔 코드를 변경해줘.
- 혹시 모듈 내에 `/records/{arcadeId}`로 가는 링크가 있다면 `/records?arcadeId={arcadeId}`로 가게끔 코드를 변경해줘.

## 아케이드 기록, 리뷰, 갤러리 목록의 무한 스크롤 관련, Cursor Agent(또는 Claude Code)에게 요청할 내용
- Next.js 16 App router를 사용 중이야.
- `/records`, `/reviews`, `/gallery`에 쓰인 목록의 무한 스크롤에 TanStack Query를 사용 중이야.
- 세가지 페이지 모두, 현재는 일단 초기에 서버 컴포넌트로 첫 페이지를 불러오고 클라이언트 컴포넌트로 두번째 페이지를 불러온 다음, 페이지 더보기 버튼을 누르면 계속 페이지가 로딩되는 구조를 가지고 있어.
- 그렇지만, 지금 나는 이걸 `queryClient.prefetchQuery`로 첫번째 페이지만 로딩한 다음, 나머지는 사용자가 브라우저에서 더 불러올지 말지를 선택하게 만들고 싶어.
- 참고로 0페이지가 첫번째 페이지야. 즉, 두번째와 세번째는 각각 1페이지, 2페이지이고.

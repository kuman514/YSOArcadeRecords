# 앞으로 YSOArcadeRecords에 필요할 스펙을 담은 문서

## Route Handler
- UUID
  - UUID 발급: `GET /api/v2/issue-uuid`
    - 성공 시 응답 (응답코드 201)
      ```json
      {
        "result": "success",
        "uuid": "새로운 UUID string"
      }
      ```
    - 실패 시 응답 (응답코드 502)
      ```json
      {
        "result": "failed",
        "error": "에러의 원인 string"
      }
      ```
- 이미지
  - 이미지 업로드: `POST /api/v2/upload-image`
    - 요청 본문 FormData
      - `image`: `File`
        - 제한사항: 파일은 4MB를 넘어가면 안 된다.
      - `size`: `number`
      - `path`: `string`
      - `fileName`: `string`
    - 성공 시 응답 (응답코드 201)
      ```json
      {
        "result": "success",
        "imageUrl": "새로운 이미지 경로 string"
      }
      ```
    - 실패 시 응답 (응답코드 502)
      ```json
      {
        "result": "failed",
        "error": "에러의 원인 string"
      }
      ```
- 아케이드 기록
  - 아케이드 기록 목록 열람: `GET /api/v2/arcade-records`
  - 아케이드 기록 상세 열람: `GET /api/v2/arcade-records/{arcadeRecordId}`
  - 신규 아케이드 기록 작성: `POST /api/v2/arcade-records`
  - 기존 아케이드 기록 수정: `PUT /api/v2/arcade-records/{arcadeRecordId}`
  - 아케이드 기록 삭제: `DELETE /api/v2/arcade-records/{arcadeRecordId}`
  - 아케이드별 통계: `GET /api/v2/arcade-records/statistics`
- 리뷰
  - 리뷰 목록 열람: `GET /api/v2/reviews`
  - 리뷰 상세 열람: `GET /api/v2/reviews/{reviewId}`
  - 신규 리뷰 작성: `POST /api/v2/reviews`
  - 기존 리뷰 수정: `PUT /api/v2/reviews/{reviewId}`
  - 리뷰 삭제: `DELETE /api/v2/reviews/{reviewId}`
- 갤러리 포스트
  - 갤러리 포스트 목록 열람: `GET /api/v2/gallery-posts`
  - 갤러리 포스트 상세 열람: `GET /api/v2/gallery-posts/{galleryPostId}`
  - 신규 갤러리 포스트 작성: `POST /api/v2/gallery-posts`
  - 기존 갤러리 포스트 수정: `PUT /api/v2/gallery-posts/{galleryPostId}`
  - 갤러리 포스트 삭제: `DELETE /api/v2/gallery-posts/{galleryPostId}`
- 아케이드 정보
  - 아케이드 정보 목록 열람: `GET /api/v2/arcade-infos`
  - 아케이드 정보 상세 열람: `GET /api/v2/arcade-infos/{arcadeInfoId}`
  - 신규 아케이드 정보 등록: `POST /api/v2/arcade-infos`
  - 기존 아케이드 정보 수정: `PUT /api/v2/arcade-infos/{arcadeInfoId}`
  - 아케이드 정보 삭제: `DELETE /api/v2/arcade-infos/{arcadeInfoId}`
- 플레이 수단
  - 플레이 수단 목록 열람: `GET /api/v2/play-methods`
  - 플레이 수단 상세 열람: `GET /api/v2/play-methods/{playMethodId}`
  - 신규 플레이 수단 등록: `POST /api/v2/play-methods`
  - 기존 플레이 수단 수정: `PUT /api/v2/play-methods/{playMethodId}`
  - 플레이 수단 삭제: `DELETE /api/v2/play-methods/{playMethodId}`
- 갤러리 주제
  - 갤러리 주제 목록 열람: `GET /api/v2/gallery-themes`
  - 갤러리 주제 상세 열람: `GET /api/v2/gallery-themes/{galleryThemeId}`
  - 신규 갤러리 주제 등록: `POST /api/v2/gallery-themes`
  - 기존 갤러리 주제 수정: `PUT /api/v2/gallery-themes/{galleryThemeId}`
  - 갤러리 주제 삭제: `DELETE /api/v2/gallery-themes/{galleryThemeId}`

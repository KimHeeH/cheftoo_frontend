🍽️ CHEF,TOO - 나만의 레시피를 공유하는 플랫폼

카카오 로그인 기반으로 개인 레시피를 등록/공유/스크랩할 수 있는 웹 애플리케이션입니다.
React(CRA) + Tailwind + Spring Boot + MySQL + Redis + Docker 로 프론트/백엔드를 구성하였으며,
누구나 쉽게 나만의 레시피를 기록하고 공유할 수 있습니다.

🧾 프로젝트 소개

CHEF,TOO는 "나도 요리사"라는 뜻을 담아, 누구나 손쉽게 자신의 레시피를 공유하고 즐길 수 있는 플랫폼입니다.


🔧 사용 기술
| 구분           | 기술                                                 |
| ------------ | -------------------------------------------------- |
| **Frontend** | React (CRA), React Router, Tailwind CSS, Bootstrap |
| **Backend**  | Spring Boot, MySQL                                 |
| **인증**       | Kakao OAuth2, JWT, HttpOnly Cookie                 |
| **Infra**    | Docker, Docker Compose                             |
| **Cache**    | Redis (세션 관리, 캐싱, 인기 레시피 정렬 최적화)                   |



📷 주요 기능

✅ 카카오 로그인 및 닉네임 설정

📝 나만의 레시피 작성 및 저장

📚 스크랩 기능 (마음에 드는 레시피 저장)

🔍 키워드 검색 및 인기 레시피 정렬

👤 마이페이지 (내 레시피 / 스크랩한 레시피 관리)

⚡ Redis 캐시를 활용한 인기 레시피 조회 성능 향상과 인기 레시피 관련 YouTube 영상을 효율적으로 제공

🐳 Docker Compose 기반으로 백엔드, DB, 캐시 서버 컨테이너 실행

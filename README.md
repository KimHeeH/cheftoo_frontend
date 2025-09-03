🍽️ CHEF,TOO - 나만의 레시피를 공유하는 플랫폼

카카오 로그인 기반으로 개인 레시피를 등록/공유/스크랩할 수 있는 웹 애플리케이션입니다.
React(CRA) + Tailwind + Spring Boot + MySQL + Redis + Docker 로 프론트/백엔드를 구성하였으며,
누구나 쉽게 나만의 레시피를 기록하고 공유할 수 있습니다.

🧾 프로젝트 소개

CHEF,TOO는 “나만의 레시피, 함께 나누면 더 맛있어요!” 라는 슬로건으로 시작한 레시피 공유 플랫폼입니다.

간편한 카카오 로그인으로 가입

나만의 레시피 작성 및 공개

마음에 드는 레시피는 스크랩

인기 검색 키워드 및 추천 레시피 확인

마이페이지에서 내가 작성하거나 스크랩한 레시피 관리

🔧 사용 기술
| 구분           | 기술                                                 |
| ------------ | -------------------------------------------------- |
| **Frontend** | React (CRA), React Router, Tailwind CSS, Bootstrap |
| **Backend**  | Spring Boot, MySQL                                 |
| **인증**       | Kakao OAuth2, JWT, HttpOnly Cookie                 |
| **Infra**    | Docker, Docker Compose                             |
| **Cache**    | Redis (세션 관리, 캐싱, 인기 레시피 정렬 최적화)                   |


📦 아키텍처
React (Frontend)  →  Spring Boot (Backend API)  →  MySQL (DB)
                                │
                                └─ Redis (세션/캐시)
모든 서비스는 Docker Compose로 컨테이너화하여 실행/배포

📷 주요 기능

✅ 카카오 로그인 및 닉네임 설정

📝 나만의 레시피 작성 및 저장

📚 스크랩 기능 (마음에 드는 레시피 저장)

🔍 키워드 검색 및 인기 레시피 정렬

👤 마이페이지 (내 레시피 / 스크랩한 레시피 관리)

⚡ Redis 캐시를 활용한 인기 레시피 조회 성능 향상

🐳 Docker Compose 기반으로 백엔드, DB, 캐시 서버 컨테이너 실행

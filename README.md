워크 플랫폼 (Work Platform)






팀과 개인이 업무(Tasks)·프로젝트(Projects)·문서(Docs)·이슈(Issues)·알림(Notification) 을 한곳에서 관리하는 풀스택 워크 플랫폼입니다.
관리자(React Admin Web), 사용자/사업자(Flutter App), 서버(Spring Boot), DB(MySQL) + 캐시/세션(Redis), 인증(JWT)로 구성됩니다.

✨ 핵심 기능

인증/권한: 이메일 로그인, JWT, 역할 기반 권한 (Admin / Business / User)

업무관리: 태스크 생성/배정/라벨/마감/우선순위/코멘트/첨부

프로젝트: 프로젝트 대시보드, 상태/멤버/활동 로그

문서/파일: 문서 등록, 버전 이력, 미리보기(추가 가능)

알림: 상태 변경/멘션/마감 임박 푸시(서버-이벤트 확장 여지)

대시보드: 최근 활동·월간 추이·담당 현황 차트(웹)

관리자 콘솔: 사용자/사업자 승인, 통계, 시스템 설정

🏗 아키텍처
[Flutter App] ─┐
               ├──> [Spring Boot API] ──> [MySQL]
[React Admin] ─┘             │
                              └──> [Redis] (세션/캐시/레이트리밋/큐)
            ▲
            │JWT
            ▼
     [Auth / RBAC]

🧰 기술 스택

Backend: Java 17+, Spring Boot 3.4.x (Web, Data JPA), Lombok, JWT, Validation

DB/Cache: MySQL 8.0, Redis 7.x

Frontend(Web): React 18 (Vite), MUI/Joy UI, Recharts, Axios

Mobile(App): Flutter 3.x, Dio, SharedPreferences, Firebase(optional)

Infra/DevOps: Docker, GitHub Actions, (옵션: Nginx, Render/EC2 등)

테스트/품질: JUnit5, ESLint + Prettier, Dart analyze/format

📂 모노레포 구조(예시)
work-platform/
├─ backend/                      # Spring Boot
│  ├─ build.gradle
│  └─ src/main/java/com/workplatform/...
├─ web-admin/                    # React(Admin)
│  ├─ package.json
│  └─ src/...
├─ app-flutter/                  # Flutter(App)
│  ├─ pubspec.yaml
│  └─ lib/...
├─ infra/
│  ├─ docker-compose.yml
│  └─ nginx.conf (optional)
├─ docs/
│  ├─ api-spec.md
│  └─ erd.md
└─ README.md

🚀 빠른 시작 (Getting Started)
0) 선행 설치

Java 17+, Node 20+, Flutter 3.x, MySQL 8, Redis 7, Docker(선택)

1) 저장소 클론
git clone https://github.com/<YOUR_ORG>/work-platform.git
cd work-platform

2) 환경변수 설정

backend/.env (또는 application.yml로 매핑):

SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/workdb?useSSL=false&serverTimezone=Asia/Seoul
SPRING_DATASOURCE_USERNAME=workuser
SPRING_DATASOURCE_PASSWORD=workpass
JWT_SECRET=change-me-to-long-random-secret
REDIS_HOST=localhost
REDIS_PORT=6379


web-admin/.env

VITE_API_BASE_URL=http://localhost:8080/api
VITE_JWT_STORAGE_KEY=WORK_JWT


app-flutter/lib/env.dart (예시)

class Env {
  static const apiBaseUrl = "http://10.0.2.2:8080/api"; // Android emulator
  static const jwtStorageKey = "WORK_JWT";
}

3) 로컬 실행

(1) DB/Redis 실행 (Docker 예시)

cd infra
docker compose up -d   # mysql:8, redis:7 컨테이너 기동


(2) 백엔드 실행

cd backend
./gradlew bootRun
# 서버: http://localhost:8080


(3) 어드민 웹 실행

cd web-admin
npm i
npm run dev
# 웹: http://localhost:5173


(4) 플러터 앱 실행

cd app-flutter
flutter pub get
flutter run

🔐 인증 & 권한 (JWT + RBAC)

로그인 성공 시 서버가 JWT를 발급 → Web은 LocalStorage, App은 SharedPreferences에 저장

모든 보호 API는 Authorization: Bearer <token> 필요

Role: ADMIN, BUSINESS, USER (엔드포인트별 접근 제한)

🗂 주요 엔드포인트(예시)

실제 구현에 맞게 수정하세요.

Auth

POST /api/auth/login        {email, password} -> {token, user}
POST /api/auth/signup       {name, email, password, role}
GET  /api/auth/me           Authorization: Bearer


Tasks

GET    /api/tasks           ?status=&assignee=&page=&size=
POST   /api/tasks           {title, desc, dueDate, priority, assigneeId}
GET    /api/tasks/{id}
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}
POST   /api/tasks/{id}/comments   {content}


Projects

GET  /api/projects
POST /api/projects          {name, desc, members[]}
GET  /api/projects/{id}/activity


Admin

GET  /api/admin/users       (role별 필터)
PUT  /api/admin/users/{id}/state   {state: ACTIVE|SUSPENDED}
GET  /api/admin/stats       (대시보드 통계)

🗃 DB 개요(예시)
users(id PK, email UNIQUE, password, name, role, state, created_at)
projects(id PK, name, desc, owner_id FK users, created_at)
project_members(project_id FK, user_id FK, role)
tasks(id PK, project_id FK, title, desc, status, priority, assignee_id FK users, due_date, created_at)
task_comments(id PK, task_id FK, author_id FK users, content, created_at)
files(id PK, owner_id FK users, path, mime, size, created_at)


인덱스: users(email), tasks(project_id, status, due_date), task_comments(task_id, created_at)

🧪 테스트 & 스크립트

Backend

cd backend
./gradlew test          # JUnit
./gradlew bootJar       # 빌드


Web Admin

cd web-admin
npm run lint            # ESLint
npm run build


Flutter

cd app-flutter
flutter analyze
flutter test

🛡 품질/보안 가이드

비밀키는 .env / GitHub Secrets로 관리, 저장소 커밋 금지

패스워드 해시(BCrypt) + 입력 Validation

CORS 엄격 설정(필요한 origin만 허용)

레이트 리밋(옵션: Redis 기반 토큰 버킷)

파일 업로드 시 MIME 검증 & 바이러스 스캔(옵션)

📦 배포(예시)

Backend: Docker 이미지 → Render/EC2/K8s

Web: 정적 빌드 → S3+CloudFront / Vercel

App: Play Store / App Store (CI에서 서명 관리)

CI/CD: GitHub Actions

main 푸시 → 백엔드 이미지 빌드&푸시 → 배포 훅 호출

web-admin 빌드 → 정적 호스팅에 업로드

🧭 트러블슈팅 FAQ

로그인 401: JWT 만료/저장키 불일치 확인, 서버 JWT_SECRET 재확인

CORS 에러: 서버 CORS 설정에 프론트 주소 추가

MySQL 연결 실패: 포트/계정/권한/방화벽, serverTimezone 파라미터 확인

Redis 연결 실패: 호스트/포트, 비번 사용 시 REDIS_PASSWORD 설정

🗺 로드맵(예시)

 알림센터(웹/앱 in-app + 푸시)

 문서 공동 편집(코멘트/버전)

 외부 캘린더 연동(Google/MS)

 SSO(OAuth2, PASS 실명 인증)

 실시간 협업(WebSocket)

🤝 기여 규칙

브랜치 전략:
main(배포) / develop(통합) / feature/*(기능) / hotfix/*

커밋 컨벤션(Conventional Commits):

feat:, fix:, docs:, refactor:, test:, chore:, perf:, build:, ci:

PR 규칙:

제목: [feat] 태스크 생성 API

본문: 변경 요약, 스크린샷/로그, 테스트 방법, 관련 이슈 링크

이슈 템플릿(요약):

배경/목표, 완료 조건(체크리스트), 참고자료

📜 라이선스

MIT License — 자유로운 사용/수정/배포 가능.
상세 내용은 LICENSE
 참고.

👤 Maintainer

김리원 — 풀스택 개발자 · QA/QC 엔지니어

Contact: riwon7317@... (원하는 채널 기입), Issues/Discussions 환영

부록 A. 백엔드 Gradle 의존성(예시)
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.4.4'
    id 'io.spring.dependency-management' version '1.1.7'
}

java { toolchain { languageVersion = JavaLanguageVersion.of(17) } }

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'io.jsonwebtoken:jjwt-api:0.12.6'
    runtimeOnly  'io.jsonwebtoken:jjwt-impl:0.12.6'
    runtimeOnly  'io.jsonwebtoken:jjwt-jackson:0.12.6'
    runtimeOnly  'com.mysql:mysql-connector-j'
    implementation 'org.springframework.security:spring-security-crypto:6.4.4'
    compileOnly  'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}

부록 B. React Admin 기본 설정 스니펫(axios 인스턴스)
// web-admin/src/api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(import.meta.env.VITE_JWT_STORAGE_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;

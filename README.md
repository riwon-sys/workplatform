# WorkPlatform

**Spring Boot · React 기반 JWT 인증/인가 사원 관리 시스템**  
JWT 기반 인증·인가와 RBAC(Role-Based Access Control) 권한 제어,  
Redux Persist를 통한 로그인 상태 유지를 적용하여 **안정적인 인증 서비스**를 구현했습니다.  
또한 Postman·Talend를 활용해 API 명세 → 테스트 → 예외 처리까지 전 과정을 경험했습니다.  

---

## 📌 프로젝트 개요
- **제작기간**: 2025-03-04 ~ 2025-03-31  
- **핵심 목표**: JWT 인증·인가, RBAC 권한 제어, Redux Persist 로그인 유지  
- **역할**:  
  - JWT 인증 로직 및 권한 제어 구현  
  - Redux Persist 상태 관리  
  - 백엔드/프론트 API 연동 및 테스트  
- **협업 방식**: API 표준 정의, 테스트 케이스 공유, 코드 리뷰 참여  

---

## 🔑 기술 스택
- **Backend**: Spring Boot, Spring Security, JWT  
- **Frontend**: React, Redux Toolkit, Redux Persist  
- **Tools**: Postman, Talend API Tester  
- **Etc.**: RBAC(Role-Based Access Control), REST API 설계  

---

## ⚙️ 주요 기능
- **JWT 인증/인가**  
  - 로그인 시 JWT 발급/검증, 만료 처리  
- **RBAC(Role-Based Access Control)**  
  - 권한별 메뉴 및 라우팅 제어  
- **상태 관리**  
  - Redux Toolkit + Persist 적용으로 로그인 정보 유지  
- **API 명세 및 테스트**  
  - Postman·Talend 기반 예외 처리 및 시나리오 검증  

---

## 🛠️ 트러블슈팅 사례
- **JWT 만료 처리 누락**  
  - 원인: 만료 시 화면/상태 불일치  
  - 해결: `ExpiredJwtException` 분기 + 표준 오류 JSON 정의  
  - 결과: 재인증 플로우 일원화 → UX·보안 개선  

- **로그인 유지 불안정**  
  - 원인: 새로고침 시 Redux 상태 초기화  
  - 해결: Redux Persist 적용 → 토큰·유저 정보 복원  
  - 결과: 로그인 유지 안정화, 재로그인 빈도 감소  

- **권한 제어 미흡**  
  - 원인: 메뉴 접근 혼선  
  - 해결: RBAC(Role 체크) 기반 사이드바/라우팅 가드 일치화  
  - 결과: 권한 외 메뉴 비노출·차단 → 정책 일관성 확보  

---

## 📝 KPT 회고
- ✅ **Keep**: 명세 선행 → 테스트 시나리오 기반 개발(Postman·Talend), Redux Persist 적용 성공  
- ⚠️ **Problem**: 협업 규칙·브랜치 전략 미흡, Redux 디버깅 난이도 높음  
- 💡 **Try**: 브랜치 전략·컨벤션 강화, 공통 에러 포맷 및 예외 핸들러 템플릿화  

---

✨ **WorkPlatform은 인증·인가·상태관리 전 과정을 실제 팀 협업 속에서 구현하며, 안정적인 서비스 제공의 중요성을 체득한 경험입니다.**

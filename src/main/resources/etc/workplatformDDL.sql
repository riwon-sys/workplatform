drop database if exists workplatform;
create database workplatform;
use workplatform;

-- 직원 테이블 생성 | rw 25-03-26 생성(수정)
CREATE TABLE member (
                        mno INT UNSIGNED,                            -- unsigned : 부서 기반 사번 (1: 인사팀 ~ 7: 재무팀)
                        mpwd VARCHAR(255) DEFAULT '1234',            -- 기본 비밀번호 설정
                        mname VARCHAR(255) NOT NULL,                 -- 사원 이름 (필수)
                        mphone VARCHAR(13) NOT NULL UNIQUE,          -- 사원 전화번호 (필수, 유일값)
                        memail VARCHAR(100) NOT NULL,                -- 사내 이메일 (필수)
                        mtype INT DEFAULT 0,                         -- 활동 상태 (0: 활동, 1: 부재, 2: 외부업무, 3: 퇴사)
                        mrank VARCHAR(10) NOT NULL,                  -- 직급 (필수): 사원, 대리, 과장, 차장, 부장
                        mprofile VARCHAR(255) DEFAULT 'default.jpg', -- 프로필 사진 기본값
                        PRIMARY KEY (mno)                            -- 사번 기본키
);

-- 부서별 직원 데이터 삽입
INSERT INTO member (mno, mname, mphone, memail, mtype, mrank , mpwd, mprofile) VALUES
-- 재직자
-- 인사팀 (이메일 규칙 수정: 부서명_직급.사번@workplatform.com) | rw 25-03-29 수정
(100001, '최민경', '010-1234-5678', 'hr_chief.100001@workplatform.com', 0, '부장', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '남자1.jpg'),
(100002, '조윤서', '010-2345-6789', 'hr_director.100002@workplatform.com', 0, '차장', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '남자2.jpg'),
(100003, '박예진', '010-3456-7890', 'hr_manager100003@workplatform.com', 0, '과장', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '여자1.jpg'),
(100004, '이민호', '010-4567-8901', 'hr_stafff.100004@workplatform.com', 0, '대리', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '남자3.jpg'),
(100006, '이시훈', '010-6789-0123', 'hr_staff.100006@workplatform.com', 0, '대리', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '남자4.jpg'),
(100007, '김은경', '010-7890-1234', 'hr_associate.100007@workplatform.com', 0, '사원', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '여자2.jpg'),
(100008, '최진우', '010-8901-2345', 'hr_associate@workplatform.com', 0, '사원', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '남자5.jpg'),
-- 마케팅팀 (이메일 규칙 수정: marketing_직급.사번@workplatform.com)
(200009, '윤지호', '010-1122-3344', 'marketing_chief.200009@workplatform.com', 0, '부장', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '남자6.jpg'),
(200010, '정지환', '010-2233-4455', 'marketing_director.200010@workplatform.com', 0, '차장', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '남자7.jpg'),
(200011, '이진아', '010-3344-5566', 'marketing_manager.200011@workplatform.com', 0, '과장', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '여자3.jpg'),
(200012, '박시연', '010-4455-6677', 'marketing_staff.200012@workplatform.com', 0, '대리', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '여자4.jpg'),
(200013, '김도현', '010-5566-7788', 'marketing_staff.200013@workplatform.com', 0, '대리', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '남자8.jpg'),
(200014, '전윤아', '010-6677-8899', 'marketing_associate.200014@workplatform.com', 0, '사원', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '여자5.jpg'),
(200015, '송지훈', '010-7788-9900', 'marketing_associate.200015@workplatform.com', 0, '사원', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '남자2.jpg'),
(200016, '김도하', '010-8899-0011', 'marketing_associate.200016@workplatform.com', 0, '사원', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '여자6.jpg'),
-- 영업팀 (sales)
(300017, '김재영', '010-1001-1001', 'sales_chief.300017@workplatform.com', 0, '부장', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '남자3.jpg'),
(300018, '이서진', '010-2111-2111', 'sales_director.300018@workplatform.com', 0, '차장', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '남자7.jpg'),
(300021, '박희만', '010-5444-5444', 'sales_manager.300021@workplatform.com', 0, '과장', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '남자2.jpg'),
(300024, '박현수', '010-8777-8777', 'sales_staff.300024@workplatform.com', 0, '대리', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b', '남자5.jpg');

INSERT INTO member (mno, mname, mphone, memail, mtype, mrank , mpwd) VALUES
-- 운영팀 (operation)
(400025, '차현수', '010-9888-9888', 'operation_chief.400025@workplatform.com', 0, '부장', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b'),
(400026, '모현수', '010-9999-0001', 'operation_director.400026@workplatform.com', 0, '차장', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b'),
(400027, '도현수', '010-0000-1111', 'operation_manager.400027@workplatform.com', 0, '과장', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b'),
(400028, '고현수', '010-1111-2232', 'operation_manager.400028@workplatform.com', 0, '과장', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b'),
(400029, '김민준', '010-2222-7333', 'operation_staff.400029@workplatform.com', 0, '대리', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b'),
(400030, '이서현', '010-3333-4744', 'operation_staff.400030@workplatform.com', 0, '대리', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b'),
(400031, '차현우', '010-4444-5545', 'operation_associate.400031@workplatform.com', 0, '사원', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b'),
(400032, '장우진', '010-5555-6636', 'operation_associate.400032@workplatform.com', 0, '사원', 'd8bb6a281d1c9864ec2c09f4844a2c2434d0d6825da4041e18079342adc1e8758b'),

-- 기술팀 (technology)
(500033, '박시원', '010-6666-7771', 'technology_chief.500033@workplatform.com', 0, '부장', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(500034, '이건우', '010-7777-8882', 'technology_director.500034@workplatform.com', 0, '차장', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(500035, '나건주', '010-8888-9993', 'technology_manager.500035@workplatform.com', 0, '과장', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(500036, '김동백', '010-9999-4534', 'technology_staff.500036@workplatform.com', 0, '대리', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(500037, '신동일', '010-1001-2222', 'technology_staff.500037@workplatform.com', 0, '대리', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(500038, '김보민', '010-2111-3333', 'technology_associate.500038@workplatform.com', 0, '사원', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(500039, '이수빈', '010-3222-4444', 'technology_associate.500039@workplatform.com', 0, '사원', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(500040, '손석희', '010-4333-5555', 'technology_associate.500040@workplatform.com', 0, '사원', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),

-- 디자인팀 (design)
(600041, '윤수한', '010-5444-6666', 'design_chief.600041@workplatform.com', 0, '부장', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(600042, '최소연', '010-6555-7777', 'design_director.600042@workplatform.com', 0, '차장', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(600043, '박성운', '010-7666-8888', 'design_manager.600043@workplatform.com', 0, '과장', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(600045, '차원희', '010-9888-0000', 'design_staff.600045@workplatform.com', 0, '대리', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(600047, '박윤주', '010-1111-2222', 'design_staff.600047@workplatform.com', 0, '대리', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(600048, '김유진', '010-2222-3333', 'design_associate.600048@workplatform.com', 0, '사원', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),

-- 재무팀 (finance)
(700049, '김자현', '010-3333-4444', 'finance_chief.700049@workplatform.com', 0, '부장', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(700050, '김주영', '010-4444-5555', 'finance_director.700050@workplatform.com', 0, '차장', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(700051, '김지민', '010-5555-6666', 'finance_manager.700051@workplatform.com', 0, '과장', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(700052, '차종현', '010-6666-7777', 'finance_staff.700052@workplatform.com', 0, '대리', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(700053, '도지원', '010-7777-8888', 'finance_staff.700053@workplatform.com', 0, '대리', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(700054, '김태호', '010-8888-9999', 'finance_associate.700054@workplatform.com', 0, '사원', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(700055, '한웅재', '010-9999-0000', 'finance_associate.700055@workplatform.com', 0, '사원', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),

-- 외부출장자 (mtype = 2)
(300020, '김리원', '010-4444-5678', 'sales_manager.300020@workplatform.com', 2, '과장', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(300022, '서진석', '010-6555-6555', 'sales_staff.300022@workplatform.com', 2, '대리', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(600044, '이산', '010-8777-9999', 'design_manager.600044@workplatform.com', 2, '과장', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),

-- 퇴사자 (mtype = 3)
(100005, '유나영', '010-5678-9012', 'hr_manager.100005@workplatform.com', 3, '과장', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(300019, '차정원', '010-3222-3222', 'sales_director.300019@workplatform.com', 3, '차장', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(300023, '김현수', '010-7666-7666', 'sales_associate.300023@workplatform.com', 3, '사원', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(600046, '이민진', '010-0999-1111', 'design_associate.600046@workplatform.com', 3, '사원', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(700056, '현정우', '010-1001-1111', 'finance_associate.700056@workplatform.com', 3, '사원', '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG');

-- 채팅방 테이블
CREATE TABLE room (
	  rno INT UNSIGNED AUTO_INCREMENT,
	  rname VARCHAR(50) NOT NULL,
	  rtype VARCHAR(30) NOT NULL,
	  rdate DATETIME DEFAULT NOW(),
	  rlastdate DATETIME,
	  rstate BOOLEAN DEFAULT TRUE,
	  mno INT UNSIGNED,
	  PRIMARY KEY (rno),
	  FOREIGN KEY (mno) REFERENCES member (mno) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 채팅방 샘플 데이터 삽입
INSERT INTO room (rname, rtype, mno, rlastdate) VALUES
	('인사팀-윤서와 민경', '0', 100001, NOW()), -- 최민경과 윤서 (일대일)
	('인사팀-민호와 예진', '0', 100004, NOW()), -- 박예진과 민호 (일대일)
	('마케팅팀-지호와 도하', '0', 200009, NOW()), -- 윤지호와 도하 (일대일)
	('마케팅팀-정환과 시연', '0', 200010, NOW()), -- 정지환과 시연 (일대일)
	('기술팀-은서와 시훈', '0', 100006, NOW()), -- 은서와 시훈 (일대일)
	('인사팀 전체', '1', 100001, NOW()), -- 인사팀 전체
	('마케팅팀 전체', '1', 200009, NOW()), -- 마케팅팀 전체
	('기술팀 전체', '1', 100006, NOW()), -- 기술팀 전체
	('운영팀 전체', '1', 100004, NOW()), -- 운영팀 전체
	('인사팀-사원 회의', '1', 100001, NOW()), -- 인사팀 사원 회의
	('마케팅팀-대리 회의', '1', 200012, NOW()), -- 마케팅팀 대리 회의
	('영업팀-팀장 회의', '1', 200010, NOW()), -- 영업팀 팀장 회의
	('기술팀-개발자 회의', '1', 100007, NOW()), -- 기술팀 개발자 회의
	('운영팀-운영 회의', '1', 100003, NOW()); -- 운영팀 운영 회의

-- 참여자 테이블 (오타 수정)
CREATE TABLE paritcipant (
	 pno INT UNSIGNED AUTO_INCREMENT,
	 pdate DATETIME DEFAULT NOW(),
	 mno INT UNSIGNED,
	 rno INT UNSIGNED,
	 PRIMARY KEY (pno),
	 FOREIGN KEY (mno) REFERENCES member (mno) ON UPDATE CASCADE ON DELETE CASCADE,
	 FOREIGN KEY (rno) REFERENCES room (rno) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 참여현황 샘플 데이터 삽입 (오타 수정)
INSERT INTO paritcipant (mno, rno) VALUES
(100001, 1), -- 최민경, 인사팀-윤서와 민경 (일대일)
(100002, 1), -- 조윤서, 인사팀-윤서와 민경 (일대일)
(100001, 2), -- 박예진, 인사팀-민호와 예진 (일대일)
(100002, 2), -- 이민호, 인사팀-민호와 예진 (일대일)
(100003, 3), -- 윤지호, 마케팅팀-지호와 도하 (일대일)
(200010, 3), -- 정지환, 마케팅팀-정환과 시연 (일대일)
(200011, 4), -- 이진아, 마케팅팀-정환과 시연 (일대일)
(200012, 5), -- 박시연, 마케팅팀-대리 회의
(200013, 6), -- 김도현, 마케팅팀-대리 회의
(100001, 6), -- 최민경, 인사팀 전체
(100002, 6), -- 조윤서, 인사팀 전체
(200009, 7), -- 윤지호, 마케팅팀 전체
(100004, 8), -- 이민호, 운영팀 전체
(100005, 9), -- 김은서, 디자인팀 전체
(100006, 10), -- 이시훈, 기술팀 전체
(200012, 11); -- 박시연, 마케팅팀 대리 회의

-- 메시지 테이블
CREATE TABLE message (
	 msno INT UNSIGNED AUTO_INCREMENT,
	 msg TEXT,
	 msdate DATETIME DEFAULT NOW(),
	 msstate INT DEFAULT 0,
	 pno INT UNSIGNED,
	 PRIMARY KEY (msno),
	 FOREIGN KEY (pno) REFERENCES paritcipant (pno) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 메시지 샘플 데이터 삽입
INSERT INTO message (msg, msdate, pno) VALUES
('안녕하세요!', NOW(), 1), -- 최민경 (인사팀-윤서와 민경)
('반갑습니다.', NOW(), 2), -- 윤서 (인사팀-윤서와 민경)
('회의 시작합니다.', NOW(), 3), -- 박예진 (인사팀-민호와 예진)
('네, 알겠습니다.', NOW(), 1), -- 이민호 (인사팀-민호와 예진)
('도하님, 자료 준비 되셨나요?', NOW(), 5), -- 윤지호 (마케팅팀-지호와 도하)
('네, 준비되었습니다.', NOW(), 6), -- 도하 (마케팅팀-지호와 도하)
('팀원들, 오늘 회의에서 논의할 사항들 확인해주세요.', NOW(), 7), -- 정지환 (마케팅팀-정환과 시연)
('확인했습니다.', NOW(), 8), -- 이진아 (마케팅팀-정환과 시연)
('오늘 회의는 다들 잘 준비해 주세요.', NOW(), 9), -- 박시연 (마케팅팀-대리 회의)
('알겠습니다.', NOW(), 10), -- 김도현 (마케팅팀-대리 회의)
('디자인 회의 진행 예정입니다.', NOW(), 1), -- 김은서 (디자인팀 전체)
('기술팀은 오늘 무엇을 다루나요?', NOW(), 1), -- 이시훈 (기술팀 전체)
('운영 회의 일정 변경되었습니다.', NOW(), 1), -- 김도현 (운영팀 전체)
('오늘 회의 준비 잘 하겠습니다.', NOW(), 14), -- 박시연 (마케팅팀 대리 회의)
('모두 회의 참석 부탁드립니다.', NOW(), 15); -- 윤지호 (마케팅팀 전체)

-- 파일 공유 테이블
CREATE TABLE fileshare (
   fno INT UNSIGNED AUTO_INCREMENT,
   fname VARCHAR(30),
   flocation VARCHAR(255),
   fdate DATETIME DEFAULT NOW(),
   pno INT UNSIGNED,
   PRIMARY KEY (fno),
   FOREIGN KEY (pno) REFERENCES paritcipant (pno) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 파일 샘플 데이터 삽입
INSERT INTO fileshare (fname, flocation, pno) VALUES
('회의자료1.pdf', '/uploads/회의자료1.pdf', 1), -- 최민경 (인사팀-윤서와 민경)
('보고서_주간.xlsx', '/uploads/보고서_주간.xlsx', 2), -- 윤서 (인사팀-윤서와 민경)
('프로젝트 계획서.docx', '/uploads/프로젝트_계획서.docx', 3), -- 박예진 (인사팀-민호와 예진)
('마케팅 전략.pptx', '/uploads/마케팅_전략.pptx', 4), -- 이민호 (인사팀-민호와 예진)
('디자인 시안.jpg', '/uploads/디자인_시안.jpg', 5), -- 윤지호 (마케팅팀-지호와 도하)
('브랜딩 자료.pdf', '/uploads/브랜딩_자료.pdf', 6), -- 도하 (마케팅팀-지호와 도하)
('팀 회의록.txt', '/uploads/팀_회의록.txt', 7), -- 정지환 (마케팅팀-정환과 시연)
('경영 보고서.xlsx', '/uploads/경영_보고서.xlsx', 8), -- 이진아 (마케팅팀-정환과 시연)
('프로젝트 피드백.docx', '/uploads/프로젝트_피드백.docx', 9), -- 박시연 (마케팅팀 대리 회의)
('디자인 파일.zip', '/uploads/디자인_파일.zip', 10), -- 김도현 (마케팅팀 대리 회의)
('기술 개발 문서.pdf', '/uploads/기술_개발_문서.pdf', 11), -- 김은서 (디자인팀 전체)
('운영 계획서.xlsx', '/uploads/운영_계획서.xlsx', 12), -- 이시훈 (기술팀 전체)
('팀 회의 스케줄.xlsx', '/uploads/팀_회의_스케줄.xlsx', 13), -- 김도현 (운영팀 전체)
('회의 일지.txt', '/uploads/회의_일지.txt', 14), -- 박시연 (마케팅팀 대리 회의)
('분석 자료.xlsx', '/uploads/분석_자료.xlsx', 15); -- 윤지호 (마케팅팀 전체)

-- 카테고리 테이블
CREATE TABLE category (
	category_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	category_name VARCHAR(20) NOT NULL,
	category_desc VARCHAR(100)
);

-- 카테고리 데이터 추가
insert into category(category_name, category_desc) values
('자유게시판', '자유롭게 글을 작성할 수 있는 게시판'),
('스포츠', '스포츠 관련 토론 게시판'),
('마음의소리', '고민이나 상담을 나눌 수 있는 게시판'),
('중고거래', '물품 거래를 위한 게시판');



-- 게시판 테이블
CREATE TABLE board (
	pid INT UNSIGNED AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
	category_id INT UNSIGNED,
	content VARCHAR(1000) NOT NULL,
	views INT UNSIGNED DEFAULT 0,
	mno INT UNSIGNED,
	PRIMARY KEY (pid),
	FOREIGN KEY (mno) REFERENCES member (mno) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES category (category_id)
);

# 게시판 샘플데이터 삽입
insert into board (pid,title,content,views,mno,category_id) values
(1, '주변에 맛집있나요?', '매콤한게땡김', 11, 100001,1),
(2, '칼퇴해도됩니까?', '칼퇴각', 32, 100002,1),
(3, '집에가고싶은데', '집가도됨?', 10, 100003,2),
(4, '팀장님들 요즘 왜이럼?', '떡볶이 vs 곱창 추천좀', 30, 100004,3),
(5, '식당 추천해주세요', '회사 근처에 점심 먹을 곳 추천 부탁드려요', 45, 100002, 1),
(6, '퇴근 후 운동 같이하실 분?', '헬스장 다니시는 분 계신가요? 같이 운동해요', 28, 100003, 2),
(7, '주말에 볼만한 영화 추천', '액션이나 스릴러 위주로 추천해주세요', 67, 100001, 3),
(8, '개발자 커리어 고민', '경력 3년차인데 다음 단계는 어떻게 준비해야 할까요?', 120, 100004, 2),
(9, '점심시간에 뭐 먹을까요?', '오늘 메뉴 고민이에요. 추천해주세요', 36, 100002, 1),
(10, '회사 근처 카페 추천', '조용히 일할 수 있는 카페 있을까요?', 49, 100003, 1),
(11, '재택근무 팁 공유', '효율적인 재택근무 방법 알려주세요', 88, 100001, 2),
(12, '이직 준비 중입니다', '포트폴리오 준비 어떻게 하시나요?', 105, 100004, 2),
(13, '연차 사용 팁', '연차 효율적으로 쓰는 방법 공유해요', 72, 100002, 3),
(14, '회식 장소 추천', '20명 정도 단체 회식 가능한 곳 추천해주세요', 66, 100003, 1),
(15, '자격증 취득 방법', 'SQL 자격증 취득하신 분 공부 방법 알려주세요', 94, 100001, 2),
(16, '야근 수당 계산', '야근 수당 어떻게 계산되나요?', 112, 100004, 3),
(17, '회사 인근 병원 추천', '점심시간에 갈 수 있는 병원 있을까요?', 51, 100002, 1),
(18, '업무용 노트북 추천', '개발에 적합한 노트북 추천해주세요', 83, 100003, 2),
(19, '팀 회의 진행 방법', '효율적인 회의 진행 방법 공유해요', 77, 100001, 3),
(20, '자기계발 서적 추천', '업무 역량 강화를 위한 책 추천 부탁드려요', 98, 100004, 2),
(21, '사내 동호회 정보', '현재 운영 중인 동호회 알려주세요', 63, 100002, 3),
(22, '출퇴근 교통편 공유', '효율적인 출퇴근 방법 있을까요?', 79, 100003, 1),
(23, '회사 근처 헬스장 추천', '저렴하고 괜찮은 헬스장 알려주세요', 55, 100001, 2),
(24, '업무 스트레스 해소법', '여러분은 어떻게 스트레스 푸시나요?', 129, 100004, 3);

-- 댓글 테이블
CREATE TABLE comment (
cid INT UNSIGNED AUTO_INCREMENT,
content VARCHAR(500) NOT NULL,
reg_date DATETIME DEFAULT CURRENT_TIMESTAMP,
pid INT UNSIGNED,
mno INT UNSIGNED,
PRIMARY KEY (cid),
FOREIGN KEY (pid) REFERENCES board(pid) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (mno) REFERENCES member(mno) ON UPDATE CASCADE ON DELETE CASCADE
);

insert into comment(cid,content,reg_date,pid,mno)values
 (1, '저는 한식당 추천합니다! 2번 출구 나가셔서 왼쪽에 있는 고깃집이 진짜 맛있어요.', '2025-03-15 10:23:45', 1, 100001),
 (2, '매콤한거 좋아하시면 3번 출구 옆 중국집 마라탕이 좋을 것 같아요!', '2025-03-15 11:30:22', 2, 100002),
 (3, '오늘은 야근각이네요ㅠㅠ', '2025-03-16 14:15:33', 3, 100003),
 (4, '저도 집에 가고 싶어요... 퇴근시간 언제 오나요', '2025-03-17 16:45:12', 4, 100004);

-- 좋아요 테이블 삭제(board_like 테이블은 board를 참조하므로 , board_like 테이블을 먼저 삭제)
drop table if exists board_like;


-- 좋아요 테이블 삭제(board_like 테이블은 board를 참조하므로 , board_like 테이블을 먼저 삭제)
DROP TABLE IF EXISTS board_like;

CREATE TABLE board_like (
like_id INT UNSIGNED AUTO_INCREMENT,
pid INT UNSIGNED NOT NULL,
mno INT UNSIGNED NOT NULL,
PRIMARY KEY (like_id),
UNIQUE KEY unique_like (pid, mno),
FOREIGN KEY (pid) REFERENCES board(pid) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (mno) REFERENCES member(mno) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 좋아요 샘플 데이터 추가
insert into board_like (pid,mno)values
(1, 100001),  -- 회원 100001이 게시물 1에 좋아요
(2, 100001),  -- 회원 100001이 게시물 2에 좋아요
(1, 100002),  -- 회원 100002가 게시물 1에 좋아요
(3, 100003);  -- 회원 100003이 게시물 3에 좋아요

-- 보고서 테이블
CREATE TABLE report (
	rpno INT UNSIGNED AUTO_INCREMENT,
	rpname VARCHAR(50) NOT NULL,
	rpam VARCHAR(300) NOT NULL,
	rppm VARCHAR(300) NOT NULL,
	rpamnote VARCHAR(300) NOT NULL,
	rppmnote VARCHAR(300) NOT NULL,
	rpunprocessed VARCHAR(300),
	rpsignificant VARCHAR(300),
	rpexpected VARCHAR(300),
	rpdate DATETIME DEFAULT NOW(),
	rpstate BOOL DEFAULT TRUE,
	mno INT UNSIGNED,
	PRIMARY KEY (rpno),
	FOREIGN KEY (mno) REFERENCES member (mno) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 보고서 샘플 추가
INSERT INTO report( rpname, rpam, rppm, rpamnote, rppmnote, rpunprocessed, rpsignificant, rpexpected, rpdate, mno ) VALUES
( '일일 업무 보고서', '오전 업무1', '오후 업무1', '오전 비고1', '오후 비고 1', '미처리 내역1', '특이사항1', '예정사항1', '2025-02-01 12:30:11', 100006 ),
( '일일 업무 보고서', '오전 업무2', '오후 업무2', '오전 비고2', '오후 비고 2', '미처리 내역2', '특이사항2', '예정사항2', '2025-02-02 12:30:11', 200015 ),
( '일일 업무 보고서', '오전 업무3', '오후 업무3', '오전 비고3', '오후 비고 3', '미처리 내역3', '특이사항3', '예정사항3', '2025-02-03 12:30:11', 300024 ),
( '일일 업무 보고서', '오전 업무4', '오후 업무4', '오전 비고4', '오후 비고 4', '미처리 내역4', '특이사항4', '예정사항4', '2025-02-04 12:30:11', 400030 ),
( '일일 업무 보고서', '오전 업무5', '오후 업무5', '오전 비고5', '오후 비고 5', '미처리 내역5', '특이사항5', '예정사항5', '2025-02-05 12:30:11', 500039 ),
('20250201 일일 업무 보고서',
 '클라이언트 미팅 진행 (A사 프로젝트)\n요구사항 분석 및 회의록 작성',
 '프로젝트 기획서 초안 작성\n팀 내 검토 회의 진행',
 '회의 내용 정리 및 공유 완료\n추가 요구사항 정리 필요',
 '초안 작성 중 피드백 반영 예정\n일부 데이터 분석 필요',
 '미팅 후 보완 요청된 자료 정리 중\n기한 내 제출 필요',
 'A사 추가 요청 사항 발생\n데이터 보완 필요',
 '클라이언트 피드백 반영 후 최종 기획서 작성\n내일 오전 검토 예정',
 '2025-02-01 12:30:11', 100006),
('20250202 일일 업무 보고서',
 '신규 서비스 기능 정의 및 문서화\nUI/UX 시안 작업 진행',
 '개발팀과 협업하여 기능 구현 가능성 검토\n비즈니스 요구사항 반영 확인',
 'UI 디자인 수정 요청 반영 중\n고객 피드백 반영 필요',
 '기능 구현을 위한 기술 검토 진행\n추가 API 연동 필요',
 '기술 검토 중 발견된 문제 해결 필요\n서버 부하 테스트 미진행',
 '일부 기능 기획 보완 필요\n경쟁사 분석 자료 추가 검토',
 '개발팀과 추가 미팅 예정\nUI 최종 확정 후 작업 진행',
 '2025-02-02 12:30:11', 100006),
('02050203 일일 업무 보고서',
 '마케팅 캠페인 성과 분석\n광고 지표 정리 및 보고서 작성',
 'SNS 채널별 성과 비교 분석\n추가 마케팅 전략 논의',
 '데이터 기반으로 개선 방향 논의\n효율 낮은 광고 소재 수정 필요',
 '성과 분석 지표 일부 누락됨\n추가 데이터 요청 중',
 '광고비 대비 효과 분석 필요\n리타겟팅 전략 수정 필요',
 '마케팅팀과 전략 미팅 예정\n새로운 광고 소재 제작 논의',
 '추가 광고 성과 분석 후 리타겟팅 진행 예정\n다음주 캠페인 최적화 논의',
 '2025-02-03 12:30:11', 100006),
('20250204 일일 업무 보고서',
 '고객 지원 시스템 업데이트\n신규 문의 대응 프로세스 개선',
 '고객 불만 분석 및 개선안 도출\nFAQ 콘텐츠 업데이트',
 '고객 피드백 반영 중\n추가 개선 요청 사항 수집',
 '일부 시스템 오류 발견됨\n기술팀과 협의 필요',
 '긴급 문의 대응 지연 이슈 발생\n대응 속도 개선 필요',
 '기술팀과 협업하여 시스템 오류 해결 예정\n고객 응대 프로세스 개선 진행',
 '추가 CS 교육 진행 후 대응 매뉴얼 개정 예정\n고객만족도 조사 시행',
 '2025-02-04 12:30:11', 100006),
('202050205 일일 업무 보고서',
 '사내 교육 프로그램 기획\n교육 자료 초안 작성',
 '사내 직원 대상 워크숍 진행\n설문 조사 및 피드백 수집',
 '교육 자료 내용 검토 중\n추가 자료 보완 필요',
 '참석자 피드백 정리 중\n일부 강의 내용 수정 예정',
 '참석률 저조 문제 발생\n홍보 방안 개선 필요',
 '워크숍 후속 강의 기획 예정\n추가 강사진 섭외 진행',
 '교육 효과 분석 후 정기 교육 프로그램 도입 검토',
 '2025-02-05 12:30:11', 100006),
('20250206 일일 업무 보고서',
 '클라이언트 미팅 진행 (A사 프로젝트)\n요구사항 분석 및 회의록 작성',
 '프로젝트 기획서 초안 작성\n팀 내 검토 회의 진행',
 '회의 내용 정리 및 공유 완료\n추가 요구사항 정리 필요',
 '초안 작성 중 피드백 반영 예정\n일부 데이터 분석 필요',
 '미팅 후 보완 요청된 자료 정리 중\n기한 내 제출 필요',
 'A사 추가 요청 사항 발생\n데이터 보완 필요',
 '클라이언트 피드백 반영 후 최종 기획서 작성\n내일 오전 검토 예정',
 '2025-02-06 12:30:11', 100006),
('20250207 일일 업무 보고서',
 '신규 서비스 기능 정의 및 문서화\nUI/UX 시안 작업 진행',
 '개발팀과 협업하여 기능 구현 가능성 검토\n비즈니스 요구사항 반영 확인',
 'UI 디자인 수정 요청 반영 중\n고객 피드백 반영 필요',
 '기능 구현을 위한 기술 검토 진행\n추가 API 연동 필요',
 '기술 검토 중 발견된 문제 해결 필요\n서버 부하 테스트 미진행',
 '일부 기능 기획 보완 필요\n경쟁사 분석 자료 추가 검토',
 '개발팀과 추가 미팅 예정\nUI 최종 확정 후 작업 진행',
 '2025-02-07 12:30:11', 100004),
('20250208 일일 업무 보고서',
 '마케팅 캠페인 성과 분석\n광고 지표 정리 및 보고서 작성',
 'SNS 채널별 성과 비교 분석\n추가 마케팅 전략 논의',
 '데이터 기반으로 개선 방향 논의\n효율 낮은 광고 소재 수정 필요',
 '',
 '성과 분석 지표 일부 누락됨\n추가 데이터 요청 중',
 '광고비 대비 효과 분석 필요\n리타겟팅 전략 수정 필요',
 '마케팅팀과 전략 미팅 예정\n새로운 광고 소재 제작 논의',
 '2025-02-08 16:24:11', 100004),
('20250209 일일 업무 보고서',
 '고객 지원 시스템 업데이트\n신규 문의 대응 프로세스 개선',
 '고객 불만 분석 및 개선안 도출\nFAQ 콘텐츠 업데이트',
 '고객 피드백 반영 중\n추가 개선 요청 사항 수집',
 '일부 시스템 오류 발견됨\n기술팀과 협의 필요',
 '',
 '긴급 문의 대응 지연 이슈 발생\n대응 속도 개선 필요',
 '기술팀과 협업하여 시스템 오류 해결 예정\n고객 응대 프로세스 개선 진행',
 '2025-02-09 16:48:15', 100004),
('20250210 일일 업무 보고서',
 '사내 교육 프로그램 기획\n교육 자료 초안 작성',
 '사내 직원 대상 워크숍 진행\n설문 조사 및 피드백 수집',
 '',
 '교육 자료 내용 검토 중\n추가 자료 보완 필요',
 '참석자 피드백 정리 중\n일부 강의 내용 수정 예정',
 '참석률 저조 문제 발생\n홍보 방안 개선 필요',
 '워크숍 후속 강의 기획 예정\n추가 강사진 섭외 진행',
 '2025-02-10 16:27:45', 100006),
('20250211 일일 업무 보고서',
 '고객사 월간 보고서 작성\n매출 및 트래픽 분석 진행',
 '경쟁사 동향 조사 및 비교 분석\n시장 변화 예측 데이터 정리',
 '일부 데이터 수집 지연\n추가 자료 요청 필요',
 '경쟁사 자료 업데이트 필요\n리포트 내 그래프 시각화 검토 중',
 '고객사 요청 자료 일부 누락\n정확한 데이터 확보 필요',
 '트래픽 분석 과정에서 오류 발생\n수정 후 재분석 예정',
 '최종 보고서 제출 일정 조정\n내일 오전 최종 검토 후 발송',
 '2025-02-11 14:12:43', 100006),
('20250212 일일 업무 보고서',
 '사내 프로젝트 일정 조정\n업무 우선순위 재조정',
 '부서 간 협업 회의 진행\n업무 진행 상황 공유 및 조율',
 '일정 조정 후 팀원들에게 공지 완료\n변경된 일정 반영 필요',
 '회의 중 추가 요청 사항 발생\n리소스 배분 검토 중',
 '일부 업무 일정 조정 실패\n리소스 부족 문제 해결 필요',
 '부서 간 조율 과정에서 의견 차이 발생\n추가 회의 필요',
 '내일 추가 논의 후 최종 일정 확정\n리소스 재분배 계획 수립',
 '2025-02-12 15:30:11', 100006),
('20250213 일일 업무 보고서',
 '신규 웹사이트 기능 테스트 진행\n버그 리포트 작성 및 공유',
 '프론트엔드 디자인 개선 요청 정리\nUI 테스트 진행',
 '테스트 중 발견된 주요 이슈 정리 완료\n개발팀 공유 필요',
 'UI 개선 사항 일부 반영 완료\n추가 수정 사항 검토 중',
 '일부 기능 동작 오류 발견\n긴급 수정 필요',
 '디자인 팀과 개발팀 간 조율 필요\n우선순위 설정 필요',
 '내일 오전 수정 버전 배포 예정\n최종 테스트 후 반영 결정',
 '2025-02-13 17:00:37', 100006),
('20250214 일일 업무 보고서',
 '신입사원 OJT 진행\n업무 프로세스 및 툴 교육',
 '팀 내 멘토링 프로그램 진행\n신입사원 피드백 수집',
 '교육 내용 일부 보완 필요\n추가 자료 준비 예정',
 '멘토링 중 신입사원 질문 수집\nQ&A 정리 후 공유',
 '일부 신입사원 적응 문제 발생\n추가 지원 필요',
 'OJT 효과 분석 후 피드백 반영 예정\n교육 자료 개선 필요',
 '내일 보충 교육 진행\n적응도 조사 후 추가 지원 계획',
 '2025-02-14 15:09:51', 100006),
('20250215 일일 업무 보고서',
 '사내 보안 점검 진행\n서버 및 네트워크 취약점 분석',
 '보안 취약점 패치 및 조치 사항 정리\n관리 시스템 업데이트',
 '일부 시스템 점검 지연\n긴급 보안 패치 필요',
 '취약점 분석 리포트 작성 중\n기술팀과 공유 예정',
 '백업 서버 상태 점검 미진행\n데이터 안정성 확인 필요',
 '내부 시스템 보안 강화 필요\n추가 점검 계획 수립 중',
 '내일 보안팀과 추가 미팅 진행\n서버 점검 최종 완료 예정',
 '2025-02-15 17:30:40', 100006),
('20250216 일일 업무 보고서',
 '이커머스 플랫폼 상품 페이지 개편\nSEO 최적화 작업 진행',
 '상품 리뷰 시스템 개선 기획\n개발팀과 구현 방안 논의',
 '페이지 개편 시안 확정\n디자인 팀 협업 진행 중',
 'SEO 분석 결과 반영 중\n키워드 전략 조정 필요',
 '리뷰 시스템 오류 발견\n사용자 피드백 반영 필요',
 '일부 페이지 UX 문제 확인\n디자인 수정 요청 필요',
 '내일 개발팀과 추가 논의 후 적용\nA/B 테스트 계획 수립',
 '2025-02-16 16:39:51', 100006);

-- 결재 테이블
CREATE TABLE approval (
	  apno INT UNSIGNED AUTO_INCREMENT,
	  apdate DATETIME DEFAULT NULL,
	  apstate BOOL DEFAULT FALSE,
	  apsignature VARCHAR(255) DEFAULT NULL,
	  mno INT UNSIGNED,                      # 승인 할 회원번호(mno)
	  rpno INT UNSIGNED,
	  PRIMARY KEY (apno),
	  FOREIGN KEY (mno) REFERENCES member (mno) ON UPDATE CASCADE ON DELETE CASCADE,
	  FOREIGN KEY (rpno) REFERENCES report (rpno) ON UPDATE CASCADE ON DELETE CASCADE
);

-- 결재 샘플 추가
INSERT INTO approval( apdate, apstate, apsignature, mno, rpno ) VALUES
( '2025-02-01 23:30:11', 1, '서명1.jpg', 100006, 6 ),
( '2025-02-02 11:15:11', 1, '서명2.jpg', 100004, 6 ),
( '2025-02-02 11:15:11', 0, null, 100002, 6 ),
( null, 0, null, 100001, 6 ),
( '2025-02-01 23:30:11', 1, '서명1.jpg', 100006, 19 ),
( '2025-02-02 11:15:11', 0, null, 100003, 19 ),
( null, 0, null, 100002, 19 ),
( null, 0, null, 100001, 19 ),
( '2025-02-05 23:30:11', 1, '서명5.jpg', 200012, 2 ),
( null , 0, '서명6', 200010, 2 ),
( '2025-02-01 23:30:11', 1, '서명1.jpg', 100006, 20 ),
( '2025-02-02 11:15:11', 1, '서명2.jpg', 100004, 20 ),
( '2025-02-02 11:15:11', 0, null, 100002, 20 ),
( null, 0, null, 100001, 20 ),
( '2025-02-01 23:30:11', 1, '서명1.jpg', 100006, 21 ),
( '2025-02-02 11:15:11', 1, '서명2.jpg', 100003, 21 ),
( '2025-02-02 11:15:11', 0, null, 100002, 21 ),
( null, 0, null, 100001, 21 );

-- 그룹 채팅방 생성 (부서별)
INSERT INTO room (rname, rtype, mno) VALUES
('인사팀 채팅방', '1', 100001),  -- 부장
('마케팅팀 채팅방', '1', 200009),
('영업팀 채팅방', '1', 300017),
('운영팀 채팅방', '1', 400025),
('기술팀 채팅방', '1', 500033),
('디자인팀 채팅방', '1', 600041),
('재무팀 채팅방', '1', 700049);

-- 1:1 채팅방 샘플
INSERT INTO room (rname, rtype, mno) VALUES
('최민경-조윤서', '0', 100001),  -- 인사팀 부장과 차장
('윤지호-정지환', '0', 200009),  -- 마케팅팀 부장과 차장
('김재영-이서진', '0', 300017),  -- 영업팀 부장과 차장
('차현수-모현수', '0', 400025),  -- 운영팀 부장과 차장
('박시원-이건우', '0', 500033),  -- 기술팀 부장과 차장
('윤수한-최소연', '0', 600041),  -- 디자인팀 부장과 차장
('김자현-김주영', '0', 700049);  -- 재무팀 부장과 차장
-- 인사팀 직급별 채팅방
INSERT INTO room (rname, rtype, mno) VALUES
('인사팀 부장 채팅방', '1', 100001),
('인사팀 차장 채팅방', '1', 100002),
('인사팀 과장 채팅방', '1', 100004),
('인사팀 대리 채팅방', '1', 100007);

-- 마케팅팀 직급별 채팅방
INSERT INTO room (rname, rtype, mno) VALUES
('마케팅팀 부장 채팅방', '1', 200009),
('마케팅팀 차장 채팅방', '1', 200010),
('마케팅팀 과장 채팅방', '1', 200012),
('마케팅팀 대리 채팅방', '1', 200014);

-- 영업팀 직급별 채팅방
INSERT INTO room (rname, rtype, mno) VALUES
('영업팀 부장 채팅방', '1', 300017),
('영업팀 차장 채팅방', '1', 300018),
('영업팀 과장 채팅방', '1', 300021),
('영업팀 대리 채팅방', '1', 300024);

-- 운영팀 직급별 채팅방
INSERT INTO room (rname, rtype, mno) VALUES
('운영팀 부장 채팅방', '1', 400025),
('운영팀 차장 채팅방', '1', 400026),
('운영팀 과장 채팅방', '1', 400028),
('운영팀 대리 채팅방', '1', 400030);

-- 기술팀 직급별 채팅방
INSERT INTO room (rname, rtype, mno) VALUES
('기술팀 부장 채팅방', '1', 500033),
('기술팀 차장 채팅방', '1', 500034),
('기술팀 과장 채팅방', '1', 500036),
('기술팀 대리 채팅방', '1', 500038);

-- 디자인팀 직급별 채팅방
INSERT INTO room (rname, rtype, mno) VALUES
('디자인팀 부장 채팅방', '1', 600041),
('디자인팀 차장 채팅방', '1', 600042),
('디자인팀 과장 채팅방', '1', 600045),
('디자인팀 대리 채팅방', '1', 600047);

-- 재무팀 직급별 채팅방
INSERT INTO room (rname, rtype, mno) VALUES
('재무팀 부장 채팅방', '1', 700049),
('재무팀 차장 채팅방', '1', 700050),
('재무팀 과장 채팅방', '1', 700052),
('재무팀 대리 채팅방', '1', 700054);



INSERT INTO paritcipant (mno, rno) VALUES
(100001, 1), (100002, 1),  -- 인사팀-윤서와 민경
(100004, 2), (100003, 2),  -- 인사팀-민호와 예진
(200009, 3), (200016, 3),  -- 마케팅팀-지호와 도하
(200010, 4), (200012, 4),  -- 마케팅팀-정환과 시연
(100006, 5), (100007, 5),  -- 기술팀-은서와 시훈
(100001, 6), (100002, 6), (100003, 6), (100004, 6), (100006, 6), (100007, 6), (100008, 6),  -- 인사팀 전체
(200009, 7), (200010, 7), (200011, 7), (200012, 7), (200013, 7), (200014, 7), (200015, 7), (200016, 7),  -- 마케팅팀 전체
(500033, 8), (500034, 8), (500035, 8), (500036, 8), (500037, 8), (500038, 8), (500039, 8), (500040, 8),  -- 기술팀 전체
(400025, 9), (400026, 9), (400027, 9), (400028, 9), (400029, 9), (400030, 9), (400031, 9), (400032, 9),  -- 운영팀 전체
(100007, 10), (100008, 10),  -- 인사팀-사원 회의
(200014, 11), (200015, 11), (200016, 11),  -- 마케팅팀-대리 회의
(300017, 12), (300018, 12),  -- 영업팀-팀장 회의
(500036, 13), (500037, 13), (500038, 13), (500039, 13), (500040, 13),  -- 기술팀-개발자 회의
(400025, 14), (400026, 14), (400027, 14), (400028, 14), (400029, 14), (400030, 14), (400031, 14), (400032, 14),  -- 운영팀-운영 회의
(100001, 15), (100002, 15), (100003, 15), (100004, 15), (100006, 15), (100007, 15), (100008, 15);  -- 인사팀 채팅방

select * from paritcipant;

INSERT INTO message (msg, pno) VALUES
('안녕하세요!', 1),
('회의는 언제 진행하나요?', 2),
('자료 공유 부탁드립니다.', 3),
('점심 식사 후 회의합시다.', 4),
('네, 확인했습니다.', 5),
('좋은 아이디어네요!', 6),
('문서 업데이트했습니다.', 7),
('다들 확인 부탁드립니다.', 8),
('일정 조정이 필요합니다.', 9),
('회의록 정리해서 공유할게요.', 10),
('새로운 프로젝트 관련 논의가 필요합니다.', 11),
('예산 관련해서 검토가 필요합니다.', 12),
('다음 주 일정은 어떻게 되나요?', 13),
('테스트 진행 상황 공유드립니다.', 14),
('이번 주 목표는 무엇인가요?', 15),
('메일 확인 부탁드립니다.', 16),
('회의 시간 조율이 필요할 것 같아요.', 17),
('업무 분담을 다시 조정해야 할까요?', 18),
('문제 발생 시 빠르게 공유 부탁드립니다.', 19),
('슬랙에서 추가 논의합시다.', 20),
('새로운 기능 구현이 필요합니다.', 21),
('기획안 검토 부탁드립니다.', 22),
('UI 디자인 수정이 필요합니다.', 23),
('기술적인 문제 해결이 필요합니다.', 24),
('고객 요청 사항 정리 완료했습니다.', 25),
('회의록 검토 후 피드백 주세요.', 26),
('업무 진행 상황 공유 부탁드립니다.', 27),
('다음 회의 안건 정리했습니다.', 28),
('추가 자료 준비 중입니다.', 29),
('출퇴근 시간 변경이 가능한가요?', 30),
('이번 주 마감일을 확인해주세요.', 31),
('긴급 이슈 발생했습니다.', 32),
('테스트 결과 공유드립니다.', 33),
('다음 단계 계획이 필요합니다.', 34),
('배포 일정이 조정되었습니다.', 35),
('이메일로 추가 자료 보내드렸습니다.', 36),
('기술 스택 관련 논의가 필요합니다.', 37),
('사용자 피드백 반영이 필요합니다.', 38),
('고객 문의사항 정리해서 공유해주세요.', 39),
('새로운 정책 관련 논의가 필요합니다.', 40);


select * from report;
select rp.*, m.mname, m.mrank from report rp inner join member m on rp.mno = m.mno where rp.mno = 100004 && rpstate = true;
select * from approval;

select * from member;
select * from room ;
select * from paritcipant;
select * from message where pno = 1 ;
select * from fileshare;
select * from approval;
select * from member;
select * from room where rstate = true;
select * from message ;
select * from fileshare;
select * from approval;
select * from board;
select * from Comment;
select * from member;

select rpno from report order by rpno desc limit 1;
SELECT AUTO_INCREMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'workplatform' AND TABLE_NAME = 'report';

SELECT m.mno, m.mname, m.mrank, ap.apno, rp.*
FROM approval ap
         INNER JOIN member m ON ap.mno = m.mno
         INNER JOIN report rp ON ap.rpno = rp.rpno
WHERE m.mno = 100007 and
    apstate = true and apdate is not null
ORDER BY rp.rpno DESC;

SELECT DISTINCT rpno FROM approval WHERE apstate = false;

-- 그룹 채팅방 생성 (부서별)
INSERT INTO room (rname, rtype, mno) VALUES
('인사팀 채팅방', '1', 100001),  -- 부장
('마케팅팀 채팅방', '1', 200009),
('영업팀 채팅방', '1', 300017),
('운영팀 채팅방', '1', 400025),
('기술팀 채팅방', '1', 500033),
('디자인팀 채팅방', '1', 600041),
('재무팀 채팅방', '1', 700049);

-- 1:1 채팅방 샘플
INSERT INTO room (rname, rtype, mno) VALUES
('최민경-조윤서', '0', 100001),  -- 인사팀 부장과 차장
('윤지호-정지환', '0', 200009),  -- 마케팅팀 부장과 차장
('김재영-이서진', '0', 300017),  -- 영업팀 부장과 차장
('차현수-모현수', '0', 400025),  -- 운영팀 부장과 차장
('박시원-이건우', '0', 500033),  -- 기술팀 부장과 차장
('윤수한-최소연', '0', 600041),  -- 디자인팀 부장과 차장
('김자현-김주영', '0', 700049);  -- 재무팀 부장과 차장
-- 인사팀 직급별 채팅방
INSERT INTO room (rname, rtype, mno) VALUES
('인사팀 부장 채팅방', '1', 100001),
('인사팀 차장 채팅방', '1', 100002),
('인사팀 과장 채팅방', '1', 100004),
('인사팀 대리 채팅방', '1', 100007);

-- 마케팅팀 직급별 채팅방
INSERT INTO room (rname, rtype, mno) VALUES
('마케팅팀 부장 채팅방', '1', 200009),
('마케팅팀 차장 채팅방', '1', 200010),
('마케팅팀 과장 채팅방', '1', 200012),
('마케팅팀 대리 채팅방', '1', 200014);

-- 영업팀 직급별 채팅방
INSERT INTO room (rname, rtype, mno) VALUES
('영업팀 부장 채팅방', '1', 300017),
('영업팀 차장 채팅방', '1', 300018),
('영업팀 과장 채팅방', '1', 300021),
('영업팀 대리 채팅방', '1', 300024);

-- 운영팀 직급별 채팅방
INSERT INTO room (rname, rtype, mno) VALUES
('운영팀 부장 채팅방', '1', 400025),
('운영팀 차장 채팅방', '1', 400026),
('운영팀 과장 채팅방', '1', 400028),
('운영팀 대리 채팅방', '1', 400030);

-- 기술팀 직급별 채팅방
INSERT INTO room (rname, rtype, mno) VALUES
('기술팀 부장 채팅방', '1', 500033),
('기술팀 차장 채팅방', '1', 500034),
('기술팀 과장 채팅방', '1', 500036),
('기술팀 대리 채팅방', '1', 500038);

-- 디자인팀 직급별 채팅방
INSERT INTO room (rname, rtype, mno) VALUES
('디자인팀 부장 채팅방', '1', 600041),
('디자인팀 차장 채팅방', '1', 600042),
('디자인팀 과장 채팅방', '1', 600045),
('디자인팀 대리 채팅방', '1', 600047);

-- 재무팀 직급별 채팅방
INSERT INTO room (rname, rtype, mno) VALUES
('재무팀 부장 채팅방', '1', 700049),
('재무팀 차장 채팅방', '1', 700050),
('재무팀 과장 채팅방', '1', 700052),
('재무팀 대리 채팅방', '1', 700054);



INSERT INTO paritcipant (mno, rno) VALUES
(100001, 1), (100002, 1),  -- 인사팀-윤서와 민경
(100004, 2), (100003, 2),  -- 인사팀-민호와 예진
(200009, 3), (200016, 3),  -- 마케팅팀-지호와 도하
(200010, 4), (200012, 4),  -- 마케팅팀-정환과 시연
(100006, 5), (100007, 5),  -- 기술팀-은서와 시훈
(100001, 6), (100002, 6), (100003, 6), (100004, 6), (100006, 6), (100007, 6), (100008, 6),  -- 인사팀 전체
(200009, 7), (200010, 7), (200011, 7), (200012, 7), (200013, 7), (200014, 7), (200015, 7), (200016, 7),  -- 마케팅팀 전체
(500033, 8), (500034, 8), (500035, 8), (500036, 8), (500037, 8), (500038, 8), (500039, 8), (500040, 8),  -- 기술팀 전체
(400025, 9), (400026, 9), (400027, 9), (400028, 9), (400029, 9), (400030, 9), (400031, 9), (400032, 9),  -- 운영팀 전체
(100007, 10), (100008, 10),  -- 인사팀-사원 회의
(200014, 11), (200015, 11), (200016, 11),  -- 마케팅팀-대리 회의
(300017, 12), (300018, 12),  -- 영업팀-팀장 회의
(500036, 13), (500037, 13), (500038, 13), (500039, 13), (500040, 13),  -- 기술팀-개발자 회의
(400025, 14), (400026, 14), (400027, 14), (400028, 14), (400029, 14), (400030, 14), (400031, 14), (400032, 14),  -- 운영팀-운영 회의
(100001, 15), (100002, 15), (100003, 15), (100004, 15), (100006, 15), (100007, 15), (100008, 15);  -- 인사팀 채팅방

select * from paritcipant;

INSERT INTO message (msg, pno) VALUES
('안녕하세요!', 1),
('회의는 언제 진행하나요?', 2),
('자료 공유 부탁드립니다.', 3),
('점심 식사 후 회의합시다.', 4),
('네, 확인했습니다.', 5),
('좋은 아이디어네요!', 6),
('문서 업데이트했습니다.', 7),
('다들 확인 부탁드립니다.', 8),
('일정 조정이 필요합니다.', 9),
('회의록 정리해서 공유할게요.', 10),
('새로운 프로젝트 관련 논의가 필요합니다.', 11),
('예산 관련해서 검토가 필요합니다.', 12),
('다음 주 일정은 어떻게 되나요?', 13),
('테스트 진행 상황 공유드립니다.', 14),
('이번 주 목표는 무엇인가요?', 15),
('메일 확인 부탁드립니다.', 16),
('회의 시간 조율이 필요할 것 같아요.', 17),
('업무 분담을 다시 조정해야 할까요?', 18),
('문제 발생 시 빠르게 공유 부탁드립니다.', 19),
('슬랙에서 추가 논의합시다.', 20),
('새로운 기능 구현이 필요합니다.', 21),
('기획안 검토 부탁드립니다.', 22),
('UI 디자인 수정이 필요합니다.', 23),
('기술적인 문제 해결이 필요합니다.', 24),
('고객 요청 사항 정리 완료했습니다.', 25),
('회의록 검토 후 피드백 주세요.', 26),
('업무 진행 상황 공유 부탁드립니다.', 27),
('다음 회의 안건 정리했습니다.', 28),
('추가 자료 준비 중입니다.', 29),
('출퇴근 시간 변경이 가능한가요?', 30),
('이번 주 마감일을 확인해주세요.', 31),
('긴급 이슈 발생했습니다.', 32),
('테스트 결과 공유드립니다.', 33),
('다음 단계 계획이 필요합니다.', 34),
('배포 일정이 조정되었습니다.', 35),
('이메일로 추가 자료 보내드렸습니다.', 36),
('기술 스택 관련 논의가 필요합니다.', 37),
('사용자 피드백 반영이 필요합니다.', 38),
('고객 문의사항 정리해서 공유해주세요.', 39),
('새로운 정책 관련 논의가 필요합니다.', 40);

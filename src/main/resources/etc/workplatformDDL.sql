drop database if exists workplatform;
create database workplatform;
use workplatform;

-- 직원 테이블 생성
CREATE TABLE member (
    mno INT UNSIGNED,                            # unsigned : 직별부여 및 사번부여( 1: 인사팀 2: 마케팅팀 3: 영업팀 4: 운영팀 5:기술팀 6:디자인팀 7:재무팀) (맨 앞자리 부서/ 자바에서부여)
    mpwd VARCHAR(60) DEFAULT '1234',             # default '1234' :  비밀번호 기본값 설정
    mname VARCHAR(30),                           # not null : 사원 이름
    mphone VARCHAR(13) NOT NULL UNIQUE,          # not null unique : 사원 전화번호, 고유값 설정
    memail VARCHAR(100),                         # not null : 사원 사내 이메일
    mtype INT DEFAULT 0,                         # default 0 : 사원 현재 상태 (0: 활동, 1: 부재, 2: 외부업무, 3: 퇴사)
    mrank VARCHAR(10) NOT NULL,                  # not null 사원 직급 : 대리 - 과장 - 차장 - 부장
    mprofile VARCHAR(255) DEFAULT 'default.jpg', # default 'default.jpg' : 프로필 사진 기본값 설정
    PRIMARY KEY (mno)
);

-- 부서별 직원 데이터 삽입
INSERT INTO member (mno, mname, mphone, memail, mtype, mrank , mpwd ) VALUES
-- 재직자
-- 인사팀
(100001, '최민경', '010-1234-5678', 'insateam@example.com', 0, '부장' , '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(100002, '조윤서', '010-2345-6789', 'insateam_team@example.com', 0, '차장' , '$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(100003, '박예진', '010-3456-7890', 'insateam_team@example.com', 0, '차장' ,'$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(100004, '이민호', '010-4567-8901', 'insateam_dari@example.com', 0, '과장' ,'$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(100006, '이시훈', '010-6789-0123', 'insateam_sawon@example.com', 0, '과장' ,'$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(100007, '김은서', '010-7890-1234', 'insateam_sawon@example.com', 0, '대리' ,'$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(100008, '최진우', '010-8901-2345', 'insateam_sawon@example.com', 0, '대리' ,'$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
-- 마케팅팀
(200009, '윤지호', '010-1122-3344', 'marketingteam@example.com', 0, '부장' ,'$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(200010, '정지환', '010-2233-4455', 'marketingteam_team@example.com', 0, '차장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(200011, '이진아', '010-3344-5566', 'marketingteam_team@example.com', 0, '차장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(200012, '박시연', '010-4455-6677', 'marketingteam_dari@example.com', 0, '과장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(200013, '김도현', '010-5566-7788', 'marketingteam_dari@example.com', 0, '과장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(200014, '전윤아', '010-6677-8899', 'marketingteam_sawon@example.com', 0, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(200015, '송지훈', '010-7788-9900', 'marketingteam_sawon@example.com', 0, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(200016, '김도하', '010-8899-0011', 'marketingteam_sawon@example.com', 0, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
-- 영업팀
(300017,  '김재영', '010-1001-1001', 'salesteam@example.com', 0, '부장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(300018,  '이서진', '010-2111-2111', 'salesteam_team@example.com', 0, '차장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(300021,  '박희만', '010-5444-5444', 'salesteam_dari@example.com', 0, '과장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(300024,  '박현수', '010-8777-8777', 'salesteam_sawon@example.com', 0, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
-- 운영팀
(400025,  '차현수', '010-9888-9888', 'operationteam@example.com', 0, '부장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(400026,  '모현수', '010-9999-0001', 'operationteam_team@example.com', 0, '차장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(400027,  '도현수', '010-0000-1111', 'operationteam_team@example.com', 0, '차장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(400028,  '고현수', '010-1111-2232', 'operationteam_dari@example.com', 0, '과장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(400029,  '김민준', '010-2222-7333', 'operationteam_dari@example.com', 0, '과장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(400030,  '이서현', '010-3333-4744', 'operationteam_sawon@example.com', 0, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(400031,  '차현우', '010-4444-5545', 'operationteam_sawon@example.com', 0, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(400032,  '장우진', '010-5555-6636', 'operationteam_sawon@example.com', 0, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
-- 기술팀
(500033,  '박시원', '010-6666-7771', 'technologyteam@example.com', 0, '부장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(500034,  '이건우', '010-7777-8882', 'technologyteam_team@example.com', 0, '차장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(500035,  '나건주', '010-8888-9993', 'technologyteam_team@example.com', 0, '차장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(500036,  '김동백', '010-9999-4534', 'technologyteam_dari@example.com', 0, '과장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(500037,  '신동일', '010-1001-2222', 'technologyteam_dari@example.com', 0, '과장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(500038,  '김보민', '010-2111-3333', 'technologyteam_sawon@example.com', 0, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(500039,  '이수빈', '010-3222-4444', 'technologyteam_sawon@example.com', 0, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(500040,  '손석희', '010-4333-5555', 'technologyteam_sawon@example.com', 0, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
-- 디자인팀
(600041,  '윤수한', '010-5444-6666', 'designteam@example.com', 0, '부장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(600042,  '최소연', '010-6555-7777', 'designteam_team@example.com', 0, '차장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(600043,  '박성운', '010-7666-8888', 'designteam_team@example.com', 0, '차장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(600045,  '차원희', '010-9888-0000', 'designteam_dari@example.com', 0, '과장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(600047,  '박윤주', '010-1111-2222', 'designteam_sawon@example.com', 0, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(600048,  '김유진', '010-2222-3333', 'designteam_sawon@example.com', 0, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
-- 재무팀
(700049,  '김자현', '010-3333-4444', 'financeteam@example.com', 0, '부장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(700050,  '김주영', '010-4444-5555', 'financeteam_team@example.com', 0, '차장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(700051,  '김지민', '010-5555-6666', 'financeteam_team@example.com', 0, '차장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(700052,  '차종현', '010-6666-7777', 'financeteam_dari@example.com', 0, '과장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(700053,  '도지원', '010-7777-8888', 'financeteam_dari@example.com', 0, '과장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(700054,  '김태호', '010-8888-9999', 'financeteam_sawon@example.com', 0, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(700055,  '한웅재', '010-9999-0000', 'financeteam_sawon@example.com', 0, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG');
-- 외부출장자
INSERT INTO member (mno, mname, mphone, memail, mtype, mrank , mpwd) VALUES
(300020,  '김리원', '010-4444-5678', 'salesteam_dari@example.com', 2, '과장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(300022,  '서진석', '010-6555-6555', 'salesteam_sawon@example.com', 2, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(600044,  '이산', '010-8777-9999', 'designteam_dari@example.com', 2, '과장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG');
-- 퇴사자
INSERT INTO member (mno, mname, mphone, memail, mtype, mrank , mpwd) VALUES
(100005,  '유나영', '010-5678-9012', 'insateam_dari@example.com', 3, '과장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(300019,  '차정원', '010-3222-3222', 'salesteam_team@example.com', 3, '차장','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(300023,  '김현수', '010-7666-7666', 'salesteam_sawon@example.com', 3, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(600046,  '이민진', '010-0999-1111', 'designteam_sawon@example.com', 3, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG'),
(700056,  '현정우', '010-1001-1111', 'financeteam_sawon@example.com', 3, '대리','$2a$10$rqTp0i3K2XkFCHyB0aZc6uk1vVvYmNd3uaEwTZHTCAJWg8wf0NveG');

# 채팅방 테이블
create table room (
   rno int unsigned auto_increment,
    rname varchar(50) not null,
    rtype varchar(30) not null,
    rdate datetime default now(),
    rlastdate datetime,
    rstate boolean default true,
    mno int unsigned,
    constraint primary key (rno),
    constraint foreign key (mno) references member (mno) on update cascade on delete cascade
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

create table paritcipant(
	pno int unsigned auto_increment,
    pdate datetime default now(),
    mno int unsigned,
    rno int unsigned,
    constraint primary key (pno),
    constraint foreign key (mno) references member (mno) on update cascade on delete cascade,
    constraint foreign key (rno) references room (rno) on update cascade on delete cascade
);

-- 참여현황 샘플 데이터 삽입
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

# 메세지 테이블
create table message(
	msno int unsigned auto_increment,
    msg text ,
    msdate datetime default now(),
    msstate int default 0,
    pno int unsigned,
    constraint primary key (msno),
    constraint foreign key (pno) references paritcipant (pno) on update cascade on delete cascade
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

# 파일 테이블
create table fileshare(
	fno int unsigned auto_increment,
    fname varchar(30),
    flocation varchar(255),
    fdate datetime default now(),
    pno int unsigned,
    constraint primary key (fno),
    constraint foreign key (pno) references paritcipant (pno) on update cascade on delete cascade
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
create table category(
    category_id int unsigned auto_increment primary key,
    category_name varchar(20) not null,
    category_desc varchar(100)
);

-- 카테고리 데이터 추가
insert into category(category_name, category_desc) values
('자유게시판', '자유롭게 글을 작성할 수 있는 게시판'),
('스포츠', '스포츠 관련 토론 게시판'),
('마음의소리', '고민이나 상담을 나눌 수 있는 게시판'),
('중고거래', '물품 거래를 위한 게시판');

# 게시판 테이블
create table board(
	pid int unsigned auto_increment,
    title varchar(50) not null,
    content varchar(1000) not null,
    views int unsigned default 0,
    mno int unsigned,
    constraint primary key( pid ),
    foreign key(mno)references member(mno)
    on update cascade
    on delete cascade,
    constraint foreign key(category_id) references category(category_id)
);

# 게시판 샘플데이터 삽입
insert into board (pid,title,content,views,mno,category_id) values
(1, '주변에 맛집있나요?', '매콤한게땡김', 11, 100001,1),
(2, '칼퇴해도됩니까?', '칼퇴각', 32, 100002,1),
(3, '집에가고싶은데', '집가도됨?', 10, 100003,2),
(4, '팀장님들 요즘 왜이럼?', '떡볶이 vs 곱창 추천좀', 30, 100004,3);



# 보고서 테이블
create table report(
	rpno int unsigned auto_increment,
    rpname varchar(50) not null,
	rpam varchar(300) not null,
    rppm varchar(300) not null,
    rpamnote varchar(300) not null,
    rppmnote varchar(300) not null,
    rpunprocessed varchar(300),
    rpsignificant varchar(300),
    rpexpected varchar(300),
    rpdate datetime default now(),
    rpstate bool default true,
    mno int unsigned,
    constraint primary key( rpno ),
    constraint foreign key( mno ) references member ( mno ) on update cascade on delete cascade
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
 '2025-02-01 12:30:11', 100007),
('20250202 일일 업무 보고서',
 '신규 서비스 기능 정의 및 문서화\nUI/UX 시안 작업 진행',
 '개발팀과 협업하여 기능 구현 가능성 검토\n비즈니스 요구사항 반영 확인',
 'UI 디자인 수정 요청 반영 중\n고객 피드백 반영 필요',
 '기능 구현을 위한 기술 검토 진행\n추가 API 연동 필요',
 '기술 검토 중 발견된 문제 해결 필요\n서버 부하 테스트 미진행',
 '일부 기능 기획 보완 필요\n경쟁사 분석 자료 추가 검토',
 '개발팀과 추가 미팅 예정\nUI 최종 확정 후 작업 진행',
 '2025-02-02 12:30:11', 100007),
('02050203 일일 업무 보고서',
 '마케팅 캠페인 성과 분석\n광고 지표 정리 및 보고서 작성',
 'SNS 채널별 성과 비교 분석\n추가 마케팅 전략 논의',
 '데이터 기반으로 개선 방향 논의\n효율 낮은 광고 소재 수정 필요',
 '성과 분석 지표 일부 누락됨\n추가 데이터 요청 중',
 '광고비 대비 효과 분석 필요\n리타겟팅 전략 수정 필요',
 '마케팅팀과 전략 미팅 예정\n새로운 광고 소재 제작 논의',
 '추가 광고 성과 분석 후 리타겟팅 진행 예정\n다음주 캠페인 최적화 논의',
 '2025-02-03 12:30:11', 100007),
('20250204 일일 업무 보고서',
 '고객 지원 시스템 업데이트\n신규 문의 대응 프로세스 개선',
 '고객 불만 분석 및 개선안 도출\nFAQ 콘텐츠 업데이트',
 '고객 피드백 반영 중\n추가 개선 요청 사항 수집',
 '일부 시스템 오류 발견됨\n기술팀과 협의 필요',
 '긴급 문의 대응 지연 이슈 발생\n대응 속도 개선 필요',
 '기술팀과 협업하여 시스템 오류 해결 예정\n고객 응대 프로세스 개선 진행',
 '추가 CS 교육 진행 후 대응 매뉴얼 개정 예정\n고객만족도 조사 시행',
 '2025-02-04 12:30:11', 100007),
('202050205 일일 업무 보고서',
 '사내 교육 프로그램 기획\n교육 자료 초안 작성',
 '사내 직원 대상 워크숍 진행\n설문 조사 및 피드백 수집',
 '교육 자료 내용 검토 중\n추가 자료 보완 필요',
 '참석자 피드백 정리 중\n일부 강의 내용 수정 예정',
 '참석률 저조 문제 발생\n홍보 방안 개선 필요',
 '워크숍 후속 강의 기획 예정\n추가 강사진 섭외 진행',
 '교육 효과 분석 후 정기 교육 프로그램 도입 검토',
 '2025-02-05 12:30:11', 100007),
('20250206 일일 업무 보고서',
 '클라이언트 미팅 진행 (A사 프로젝트)\n요구사항 분석 및 회의록 작성',
 '프로젝트 기획서 초안 작성\n팀 내 검토 회의 진행',
 '회의 내용 정리 및 공유 완료\n추가 요구사항 정리 필요',
 '초안 작성 중 피드백 반영 예정\n일부 데이터 분석 필요',
 '미팅 후 보완 요청된 자료 정리 중\n기한 내 제출 필요',
 'A사 추가 요청 사항 발생\n데이터 보완 필요',
 '클라이언트 피드백 반영 후 최종 기획서 작성\n내일 오전 검토 예정',
 '2025-02-06 12:30:11', 100007),
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
 '2025-02-10 16:27:45', 100007),
 ('20250211 일일 업무 보고서',
 '고객사 월간 보고서 작성\n매출 및 트래픽 분석 진행',
 '경쟁사 동향 조사 및 비교 분석\n시장 변화 예측 데이터 정리',
 '일부 데이터 수집 지연\n추가 자료 요청 필요',
 '경쟁사 자료 업데이트 필요\n리포트 내 그래프 시각화 검토 중',
 '고객사 요청 자료 일부 누락\n정확한 데이터 확보 필요',
 '트래픽 분석 과정에서 오류 발생\n수정 후 재분석 예정',
 '최종 보고서 제출 일정 조정\n내일 오전 최종 검토 후 발송',
 '2025-02-11 14:12:43', 100007),
 ('20250212 일일 업무 보고서',
  '사내 프로젝트 일정 조정\n업무 우선순위 재조정',
  '부서 간 협업 회의 진행\n업무 진행 상황 공유 및 조율',
  '일정 조정 후 팀원들에게 공지 완료\n변경된 일정 반영 필요',
  '회의 중 추가 요청 사항 발생\n리소스 배분 검토 중',
  '일부 업무 일정 조정 실패\n리소스 부족 문제 해결 필요',
  '부서 간 조율 과정에서 의견 차이 발생\n추가 회의 필요',
  '내일 추가 논의 후 최종 일정 확정\n리소스 재분배 계획 수립',
  '2025-02-12 15:30:11', 100007),
 ('20250213 일일 업무 보고서',
  '신규 웹사이트 기능 테스트 진행\n버그 리포트 작성 및 공유',
  '프론트엔드 디자인 개선 요청 정리\nUI 테스트 진행',
  '테스트 중 발견된 주요 이슈 정리 완료\n개발팀 공유 필요',
  'UI 개선 사항 일부 반영 완료\n추가 수정 사항 검토 중',
  '일부 기능 동작 오류 발견\n긴급 수정 필요',
  '디자인 팀과 개발팀 간 조율 필요\n우선순위 설정 필요',
  '내일 오전 수정 버전 배포 예정\n최종 테스트 후 반영 결정',
  '2025-02-13 17:00:37', 100007),
 ('20250214 일일 업무 보고서',
  '신입사원 OJT 진행\n업무 프로세스 및 툴 교육',
  '팀 내 멘토링 프로그램 진행\n신입사원 피드백 수집',
  '교육 내용 일부 보완 필요\n추가 자료 준비 예정',
  '멘토링 중 신입사원 질문 수집\nQ&A 정리 후 공유',
  '일부 신입사원 적응 문제 발생\n추가 지원 필요',
  'OJT 효과 분석 후 피드백 반영 예정\n교육 자료 개선 필요',
  '내일 보충 교육 진행\n적응도 조사 후 추가 지원 계획',
  '2025-02-14 15:09:51', 100007),
 ('20250215 일일 업무 보고서',
  '사내 보안 점검 진행\n서버 및 네트워크 취약점 분석',
  '보안 취약점 패치 및 조치 사항 정리\n관리 시스템 업데이트',
  '일부 시스템 점검 지연\n긴급 보안 패치 필요',
  '취약점 분석 리포트 작성 중\n기술팀과 공유 예정',
  '백업 서버 상태 점검 미진행\n데이터 안정성 확인 필요',
  '내부 시스템 보안 강화 필요\n추가 점검 계획 수립 중',
  '내일 보안팀과 추가 미팅 진행\n서버 점검 최종 완료 예정',
  '2025-02-15 17:30:40', 100007),
 ('20250216 일일 업무 보고서',
  '이커머스 플랫폼 상품 페이지 개편\nSEO 최적화 작업 진행',
  '상품 리뷰 시스템 개선 기획\n개발팀과 구현 방안 논의',
  '페이지 개편 시안 확정\n디자인 팀 협업 진행 중',
  'SEO 분석 결과 반영 중\n키워드 전략 조정 필요',
  '리뷰 시스템 오류 발견\n사용자 피드백 반영 필요',
  '일부 페이지 UX 문제 확인\n디자인 수정 요청 필요',
  '내일 개발팀과 추가 논의 후 적용\nA/B 테스트 계획 수립',
  '2025-02-16 16:39:51', 100007);
  
# 결재 테이블
create table approval(
	apno int unsigned auto_increment,
    apdate datetime default null,
    apstate bool default false,
    apsignature varchar(255) default null,
    mno int unsigned,			-- 승인할 회원번호
    rpno int unsigned,
    constraint primary key( apno ),
    constraint foreign key( mno ) references member ( mno ) on update cascade on delete cascade,
    constraint foreign key( rpno ) references report ( rpno ) on update cascade on delete cascade
);

-- 결재 샘플 추가
INSERT INTO approval( apdate, apstate, apsignature, mno, rpno ) VALUES
( '2025-02-01 23:30:11', 1, '서명1.jpg', 100007, 6 ),
( '2025-02-02 11:15:11', 1, '서명2.jpg', 100004, 6 ),
( '2025-02-02 11:15:11', 0, null, 100002, 6 ),
( null, 0, null, 100001, 6 ),
( '2025-02-05 23:30:11', 1, '서명5.jpg', 200012, 2 ),
( null , 0, '서명6', 200010, 2 ),
( '2025-02-01 23:30:11', 1, '서명1.jpg', 100007, 20 ),
( '2025-02-02 11:15:11', 1, '서명2.jpg', 100004, 20 ),
( '2025-02-02 11:15:11', 0, null, 100002, 20 ),
( null, 0, null, 100001, 20 ),
( '2025-02-01 23:30:11', 1, '서명1.jpg', 100007, 21 ),
( '2025-02-02 11:15:11', 1, '서명2.jpg', 100004, 21 ),
( '2025-02-02 11:15:11', 0, null, 100003, 21 ),
( null, 0, null, 100001, 21 );

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
select * from paritcipant;
select * from message ;
select * from fileshare;
select * from approval;
select * from board;
select * from boardwrite;
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
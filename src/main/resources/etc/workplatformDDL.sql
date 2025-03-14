drop database if exists workplatform;
create database workplatform;
use workplatform;

# 직원 테이블 생성
CREATE TABLE member (
    mno INT UNSIGNED,                            # unsigned : 직별부여 및 사번부여( 1: 인사팀 2: 마케팅팀 3: 영업팀 4: 운영팀 5:기술팀 6:디자인팀 7:재무팀) (맨 앞자리 부서/ 자바에서부여)
    mpwd VARCHAR(30) DEFAULT '1234',             # default '1234' :  비밀번호 기본값 설정
    mname VARCHAR(30),                           # not null : 사원 이름
    mphone VARCHAR(13) NOT NULL UNIQUE,          # not null unique : 사원 전화번호, 고유값 설정
    memail VARCHAR(100),                         # not null : 사원 사내 이메일
    mtype INT DEFAULT 0,                         # default 0 : 사원 현재 상태 (0: 활동, 1: 부재, 2: 외부업무, 3: 퇴사)
    mrank VARCHAR(10) NOT NULL,                  # not null 사원 직급 : 대리 - 과장 - 차장 - 부장
    mprofile VARCHAR(255) DEFAULT 'default.jpg', # default 'default.jpg' : 프로필 사진 기본값 설정
    PRIMARY KEY (mno)
);

-- 부서별 직원 데이터 삽입
INSERT INTO member (mno, mname, mphone, memail, mtype, mrank) VALUES
-- 재직자
-- 인사팀
(100001, '최민경', '010-1234-5678', 'insateam@example.com', 0, '부장'),
(100002, '조윤서', '010-2345-6789', 'insateam_team@example.com', 0, '차장'),
(100003, '박예진', '010-3456-7890', 'insateam_team@example.com', 0, '차장'),
(100004, '이민호', '010-4567-8901', 'insateam_dari@example.com', 0, '과장'),
(100006, '이시훈', '010-6789-0123', 'insateam_sawon@example.com', 0, '과장'),
(100007, '김은서', '010-7890-1234', 'insateam_sawon@example.com', 0, '대리'),
(100008, '최진우', '010-8901-2345', 'insateam_sawon@example.com', 0, '대리'),
-- 마케팅팀
(200009, '윤지호', '010-1122-3344', 'marketingteam@example.com', 0, '부장'),
(200010, '정지환', '010-2233-4455', 'marketingteam_team@example.com', 0, '차장'),
(200011, '이진아', '010-3344-5566', 'marketingteam_team@example.com', 0, '차장'),
(200012, '박시연', '010-4455-6677', 'marketingteam_dari@example.com', 0, '과장'),
(200013, '김도현', '010-5566-7788', 'marketingteam_dari@example.com', 0, '과장'),
(200014, '전윤아', '010-6677-8899', 'marketingteam_sawon@example.com', 0, '대리'),
(200015, '송지훈', '010-7788-9900', 'marketingteam_sawon@example.com', 0, '대리'),
(200016, '김도하', '010-8899-0011', 'marketingteam_sawon@example.com', 0, '대리'),
-- 영업팀
(300017,  '김재영', '010-1001-1001', 'salesteam@example.com', 0, '부장'),
(300018,  '이서진', '010-2111-2111', 'salesteam_team@example.com', 0, '차장'),
(300021,  '박희만', '010-5444-5444', 'salesteam_dari@example.com', 0, '과장'),
(300024,  '박현수', '010-8777-8777', 'salesteam_sawon@example.com', 0, '대리'),
-- 운영팀
(400025,  '차현수', '010-9888-9888', 'operationteam@example.com', 0, '부장'),
(400026,  '모현수', '010-9999-0001', 'operationteam_team@example.com', 0, '차장'),
(400027,  '도현수', '010-0000-1111', 'operationteam_team@example.com', 0, '차장'),
(400028,  '고현수', '010-1111-2232', 'operationteam_dari@example.com', 0, '과장'),
(400029,  '김민준', '010-2222-7333', 'operationteam_dari@example.com', 0, '과장'),
(400030,  '이서현', '010-3333-4744', 'operationteam_sawon@example.com', 0, '대리'),
(400031,  '차현우', '010-4444-5545', 'operationteam_sawon@example.com', 0, '대리'),
(400032,  '장우진', '010-5555-6636', 'operationteam_sawon@example.com', 0, '대리'),
-- 기술팀
(500033,  '박시원', '010-6666-7771', 'technologyteam@example.com', 0, '부장'),
(500034,  '이건우', '010-7777-8882', 'technologyteam_team@example.com', 0, '차장'),
(500035,  '나건주', '010-8888-9993', 'technologyteam_team@example.com', 0, '차장'),
(500036,  '김동백', '010-9999-4534', 'technologyteam_dari@example.com', 0, '과장'),
(500037,  '신동일', '010-1001-2222', 'technologyteam_dari@example.com', 0, '과장'),
(500038,  '김보민', '010-2111-3333', 'technologyteam_sawon@example.com', 0, '대리'),
(500039,  '이수빈', '010-3222-4444', 'technologyteam_sawon@example.com', 0, '대리'),
(500040,  '손석희', '010-4333-5555', 'technologyteam_sawon@example.com', 0, '대리'),
-- 디자인팀
(600041,  '윤수한', '010-5444-6666', 'designteam@example.com', 0, '부장'),
(600042,  '최소연', '010-6555-7777', 'designteam_team@example.com', 0, '차장'),
(600043,  '박성운', '010-7666-8888', 'designteam_team@example.com', 0, '차장'),
(600045,  '차원희', '010-9888-0000', 'designteam_dari@example.com', 0, '과장'),
(600047,  '박윤주', '010-1111-2222', 'designteam_sawon@example.com', 0, '대리'),
(600048,  '김유진', '010-2222-3333', 'designteam_sawon@example.com', 0, '대리'),
-- 재무팀
(700049,  '김자현', '010-3333-4444', 'financeteam@example.com', 0, '부장'),
(700050,  '김주영', '010-4444-5555', 'financeteam_team@example.com', 0, '차장'),
(700051,  '김지민', '010-5555-6666', 'financeteam_team@example.com', 0, '차장'),
(700052,  '차종현', '010-6666-7777', 'financeteam_dari@example.com', 0, '과장'),
(700053,  '도지원', '010-7777-8888', 'financeteam_dari@example.com', 0, '과장'),
(700054,  '김태호', '010-8888-9999', 'financeteam_sawon@example.com', 0, '대리'),
(700055,  '한웅재', '010-9999-0000', 'financeteam_sawon@example.com', 0, '대리');
-- 외부출장자
INSERT INTO member (mno, mname, mphone, memail, mtype, mrank) VALUES
(300020,  '김리원', '010-4333-4333', 'salesteam_dari@example.com', 2, '과장'),
(300022,  '서진석', '010-6555-6555', 'salesteam_sawon@example.com', 2, '대리'),
(600044,  '이산', '010-8777-9999', 'designteam_dari@example.com', 2, '과장');
-- 퇴사자
INSERT INTO member (mno, mname, mphone, memail, mtype, mrank) VALUES
(100005,  '유나영', '010-5678-9012', 'insateam_dari@example.com', 3, '과장'),
(300019,  '차정원', '010-3222-3222', 'salesteam_team@example.com', 3, '차장'),
(300023,  '김현수', '010-7666-7666', 'salesteam_sawon@example.com', 3, '대리'),
(600046,  '이민진', '010-0999-1111', 'designteam_sawon@example.com', 3, '대리'),
(700056,  '현정우', '010-1001-1111', 'financeteam_sawon@example.com', 3, '대리');

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
    on delete cascade
);

# 게시판 샘플데이터 삽입
insert into board (pid,title,content,views,mno)values
(1, '주변에 맛집있나요?', '매콤한게땡김', 11, 100001),
(2, '칼퇴해도됩니까?', '칼퇴각', 32, 100002),
(3, '집에가고싶은데', '집가도됨?', 10, 100003),
(4, '팀장님들 요즘 왜이럼?', '떡볶이 vs 곱창 추천좀', 30, 100004);

# 보고서 테이블
create table report(
	rpno int unsigned auto_increment,
    rpname varchar(50) not null,
	rpam varchar(300) not null,
    rppm varchar(300) not null,
    rpunprocessed varchar(300),
    rpsignificant varchar(300),
    rpexpected varchar(300),
    rpdate varchar(300),
    mno int unsigned,
    constraint primary key( rpno ),
    constraint foreign key( mno ) references member ( mno ) on update cascade on delete cascade
);

-- 보고서 샘플 추가
INSERT INTO report( rpname, rpam, rppm, rpunprocessed, rpsignificant, rpexpected, rpdate, mno ) VALUES
( 'uuid1-보고서', '오전 업무1', '오후 업무1', '미처리 내역1', '특이사항1', '예정사항1', '2025-02-01 12:30:11', 100006 ),
( 'uuid2-보고서', '오전 업무2', '오후 업무2', '미처리 내역2', '특이사항2', '예정사항2', '2025-02-02 12:30:11', 200015 ),
( 'uuid3-보고서', '오전 업무3', '오후 업무3', '미처리 내역3', '특이사항3', '예정사항3', '2025-02-03 12:30:11', 300024 ),
( 'uuid4-보고서', '오전 업무4', '오후 업무4', '미처리 내역4', '특이사항4', '예정사항4', '2025-02-04 12:30:11', 400030 ),
( 'uuid5-보고서', '오전 업무5', '오후 업무5', '미처리 내역5', '특이사항5', '예정사항5', '2025-02-05 12:30:11', 500039 );

# 결재 테이블
create table approval(
	apno int unsigned auto_increment,
    apdate datetime default null,
    apstate int default 0,
    apsignature varchar(50) not null,
    mno int unsigned,			-- 승인할 회원번호
    rpno int unsigned,
    constraint primary key( apno ),
    constraint foreign key( mno ) references member ( mno ) on update cascade on delete cascade,
    constraint foreign key( rpno ) references report ( rpno ) on update cascade on delete cascade
);

-- 결재 샘플 추가
INSERT INTO approval( apdate, apstate, apsignature, mno, rpno ) VALUES
( '2025-02-02 23:30:11', 1, '서명1', 100004, 1 ),
( '2025-02-03 23:30:11', 1, '서명2', 100002, 1 ),
( '2025-02-04 23:30:11', 1, '서명3', 100001, 1 ),
( '2025-02-05 23:30:11', 1, '서명4', 200012, 2 ),
( null , 0, '서명5', 200010, 2 );

select * from report;
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
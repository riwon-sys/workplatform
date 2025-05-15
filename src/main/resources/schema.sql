

-- 결재 테이블 삭제 (approval 테이블은 fileshare를 참조하므로, 먼저 삭제)
DROP TABLE IF EXISTS approval;

-- 파일 공유 테이블 삭제 (fileshare 테이블은 paritcipant를 참조하므로, fileshare 테이블을 먼저 삭제)
DROP TABLE IF EXISTS fileshare;

-- 메시지 테이블 삭제 (message 테이블은 paritcipant를 참조하므로, message 테이블을 먼저 삭제)
DROP TABLE IF EXISTS message;
-- 참여자 테이블 삭제 (paritcipant 테이블은 room과 member를 참조하므로, paritcipant 테이블을 삭제)
DROP TABLE IF EXISTS paritcipant;

-- 보고서 테이블 삭제 (report 테이블은 approval을 참조하므로, 먼저 삭제)
DROP TABLE IF EXISTS report;

-- 채팅방 테이블 삭제 (room 테이블은 member를 참조하므로, room 테이블을 마지막에 삭제)
DROP TABLE IF EXISTS room;
-- 좋아요 테이블 삭제(board_like 테이블은 board를 참조하므로 , board_like 테이블을 먼저 삭제)
drop table if exists board_like;
-- 댓글 테이블 삭제 (comment 테이블은 board를 참조하므로, comment 테이블을 먼저 삭제)
drop table if exists comment;
-- 게시판 테이블 삭제
drop table if exists board;
-- 카테고리 테이블 삭제  ( 카테고리 테이블은 board 를 참조하므로 , 카테고리 테이블 먼저 삭제)
drop table if exists category;

-- 이제 'member' 테이블 삭제
DROP TABLE IF EXISTS member;




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

-- 참여자 테이블
CREATE TABLE paritcipant (
	 pno INT UNSIGNED AUTO_INCREMENT,
	 pdate DATETIME DEFAULT NOW(),
	 mno INT UNSIGNED,
	 rno INT UNSIGNED,
	 PRIMARY KEY (pno),
	 FOREIGN KEY (mno) REFERENCES member (mno) ON UPDATE CASCADE ON DELETE CASCADE,
	 FOREIGN KEY (rno) REFERENCES room (rno) ON UPDATE CASCADE ON DELETE CASCADE
);

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

-- 카테고리 테이블
CREATE TABLE category (
	category_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	category_name VARCHAR(20) NOT NULL,
	category_desc VARCHAR(100)
);

-- 게시판 테이블
CREATE TABLE board (
	pid INT UNSIGNED AUTO_INCREMENT,
	title VARCHAR(50) NOT NULL,
	category_id INT UNSIGNED,
	content VARCHAR(1000) NOT NULL,
	views INT UNSIGNED DEFAULT 0,
	like_count INT UNSIGNED DEFAULT 0,
	mno INT UNSIGNED,
	PRIMARY KEY (pid),
	FOREIGN KEY (mno) REFERENCES member (mno) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES category (category_id)
);

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

---좋아요 테이블 추가 됨
CREATE TABLE board_like (
like_id INT UNSIGNED AUTO_INCREMENT,
pid INT UNSIGNED NOT NULL,
mno INT UNSIGNED NOT NULL,
PRIMARY KEY (like_id),
UNIQUE KEY unique_like (pid, mno),
FOREIGN KEY (pid) REFERENCES board(pid) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (mno) REFERENCES member(mno) ON UPDATE CASCADE ON DELETE CASCADE
);


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

-- 결재 테이블
CREATE TABLE approval (
	  apno INT UNSIGNED AUTO_INCREMENT,
	  apdate DATETIME DEFAULT NULL,
	  apstate BOOL DEFAULT FALSE,
	  apsignature VARCHAR(255) DEFAULT NULL,
	  mno INT UNSIGNED,                      -- 승인 할 회원번호(mno)
	  rpno INT UNSIGNED,
	  PRIMARY KEY (apno),
	  FOREIGN KEY (mno) REFERENCES member (mno) ON UPDATE CASCADE ON DELETE CASCADE,
	  FOREIGN KEY (rpno) REFERENCES report (rpno) ON UPDATE CASCADE ON DELETE CASCADE
);



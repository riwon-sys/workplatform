

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
-- 카테고리 테이블 삭제  ( 카테고리 테이블은 board 를 참조하므로 , 카테고리 테이블 먼저 삭제)
drop table if exists category;
-- 게시판 테이블 삭제
drop table if exists board;

-- 이제 'member' 테이블 삭제
DROP TABLE IF EXISTS member;




-- 직원 테이블 생성 | rw 25-03-26 생성
CREATE TABLE member (
                        mno INT UNSIGNED,                            -- unsigned : 부서 기반 사번 (1: 인사팀 ~ 7: 재무팀)
                        mpwd VARCHAR(255) DEFAULT '1234',            -- 기본 비밀번호 설정
                        moldPwd VARCHAR(100),                        -- 이전 비밀번호 저장용
                        mname VARCHAR(255) NOT NULL,                 -- 사원 이름 (필수)
                        mphone VARCHAR(13) NOT NULL UNIQUE,          -- 사원 전화번호 (필수, 유일값)
                        memail VARCHAR(100) NOT NULL,                -- 사내 이메일 (필수)
                        mtype INT DEFAULT 0,                         -- 활동 상태 (0: 활동, 1: 부재, 2: 외부업무, 3: 퇴사)
                        mrank VARCHAR(10) NOT NULL,                  -- 직급 (필수): 대리, 과장, 차장, 부장
                        mprofile VARCHAR(255) DEFAULT 'default.jpg', -- 프로필 사진 기본값
                        PRIMARY KEY (mno)                            -- 사번 기본키
);

-- 채팅방 테이블
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

-- 참여현황 테이블
create table paritcipant(
                            pno int unsigned auto_increment,
                            pdate datetime default now(),
                            mno int unsigned,
                            rno int unsigned,
                            constraint primary key (pno),
                            constraint foreign key (mno) references member (mno) on update cascade on delete cascade,
                            constraint foreign key (rno) references room (rno) on update cascade on delete cascade
);

-- 메세지 테이블
create table message(
                        msno int unsigned auto_increment,
                        msg text ,
                        msdate datetime default now(),
                        msstate int default 0,
                        pno int unsigned,
                        constraint primary key (msno),
                        constraint foreign key (pno) references paritcipant (pno) on update cascade on delete cascade
);

-- 파일 테이블
create table fileshare(
                          fno int unsigned auto_increment,
                          fname varchar(30),
                          flocation varchar(255),
                          fdate datetime default now(),
                          pno int unsigned,
                          constraint primary key (fno),
                          constraint foreign key (pno) references paritcipant (pno) on update cascade on delete cascade
);
-- 카테고리 테이블
create table category(
                         category_id int unsigned auto_increment primary key,
                         category_name varchar(20) not null,
                         category_desc varchar(100)
);


-- 게시판 테이블
create table board(
                      pid int unsigned auto_increment,
                      title varchar(50) not null,
                      content varchar(1000) not null,
                      views int unsigned default 0,
                      mno int unsigned,
                      constraint primary key (pid),
                      constraint foreign key(mno)references member(mno)
                          on update cascade
                          on delete cascade
);

-- 댓글 테이블
create table comment(
                        cid int unsigned auto_increment,
                        content varchar(200) not null,
                        reg_date datetime default current_timestamp,
                        pid int unsigned,
                        mno int unsigned,
                        primary key (cid),
                        foreign key(pid) references board(pid)
                            on update cascade
                            on delete cascade,
                        foreign key(mno) references Member(mno)
                            on update cascade
                            on delete cascade
);


CREATE TABLE Board_Like (
    like_id INT UNSIGNED AUTO_INCREMENT,
    pid INT UNSIGNED NOT NULL,      -- 게시물 번호 (외래키)
    mno INT UNSIGNED NOT NULL,      -- 회원 번호 (외래키)
    PRIMARY KEY (like_id),
    UNIQUE KEY unique_like (pid, mno),  -- 한 사용자가 한 게시물에 좋아요는 한 번만 가능
    FOREIGN KEY (pid) REFERENCES board(pid)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (mno) REFERENCES Member(mno)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- 보고서 테이블
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

-- 결재 테이블
create table approval(
                         apno int unsigned auto_increment,
                         apdate datetime default null,
                         apstate bool default false,
                         apsignature varchar(255) default null,
                         mno int unsigned,         -- 승인할 회원번호
                         rpno int unsigned,
                         constraint primary key( apno ),
                         constraint foreign key( mno ) references member ( mno ) on update cascade on delete cascade,
                         constraint foreign key( rpno ) references report ( rpno ) on update cascade on delete cascade
);
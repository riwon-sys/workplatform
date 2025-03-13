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

-- 게시팜 테이블 삭제
DROP TABLE if exists board;

-- 이제 'member' 테이블 삭제
DROP TABLE IF EXISTS member;


-- 직원 테이블 생성
CREATE TABLE member (
    mno INT UNSIGNED,
    mpwd VARCHAR(30) DEFAULT '1234',
    mname VARCHAR(30),
    mphone VARCHAR(13) NOT NULL UNIQUE,
    memail VARCHAR(100),
    mtype INT DEFAULT 0,
    mrank VARCHAR(10) NOT NULL,
    mprofile VARCHAR(255) DEFAULT 'default.jpg',
    constraint PRIMARY KEY (mno)
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

-- 게시판 테이블
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

-- 보고서 테이블
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

-- 결재 테이블
create table approval(
   apno int unsigned auto_increment,
    apdate datetime default null,
    apstate int default 0,
    apsignature varchar(50) not null,
    mno int unsigned,         -- 승인할 회원번호
    rpno int unsigned,
    constraint primary key( apno ),
    constraint foreign key( mno ) references member ( mno ) on update cascade on delete cascade,
    constraint foreign key( rpno ) references report ( rpno ) on update cascade on delete cascade
);

DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS approval;
DROP TABLE IF EXISTS report;

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
    mno int unsigned,			-- 승인할 회원번호
    rpno int unsigned,
    constraint primary key( apno ),
    constraint foreign key( mno ) references member ( mno ) on update cascade on delete cascade,
    constraint foreign key( rpno ) references report ( rpno ) on update cascade on delete cascade
);

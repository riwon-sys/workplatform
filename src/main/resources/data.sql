
-- 부서별 직원 데이터 삽입
INSERT INTO member (mno, mname, mphone, memail, mtype, mrank) VALUES
-- 재직자
-- 인사팀
(100001, '최민경', '010-1234-5678', 'insateam@example.com', 0, '부서장'),
(100002, '조윤서', '010-2345-6789', 'insateam_team@example.com', 0, '팀장'),
(100003, '박예진', '010-3456-7890', 'insateam_team@example.com', 0, '팀장'),
(100004, '이민호', '010-4567-8901', 'insateam_dari@example.com', 0, '대리'),
(100006, '이시훈', '010-6789-0123', 'insateam_sawon@example.com', 0, '사원'),
(100007, '김은서', '010-7890-1234', 'insateam_sawon@example.com', 0, '사원'),
(100008, '최진우', '010-8901-2345', 'insateam_sawon@example.com', 0, '사원'),
-- 마케팅팀
(200009, '윤지호', '010-1122-3344', 'marketingteam@example.com', 0, '부서장'),
(200010, '정지환', '010-2233-4455', 'marketingteam_team@example.com', 0, '팀장'),
(200011, '이진아', '010-3344-5566', 'marketingteam_team@example.com', 0, '팀장'),
(200012, '박시연', '010-4455-6677', 'marketingteam_dari@example.com', 0, '대리'),
(200013, '김도현', '010-5566-7788', 'marketingteam_dari@example.com', 0, '대리'),
(200014, '전윤아', '010-6677-8899', 'marketingteam_sawon@example.com', 0, '사원'),
(200015, '송지훈', '010-7788-9900', 'marketingteam_sawon@example.com', 0, '사원'),
(200016, '김도하', '010-8899-0011', 'marketingteam_sawon@example.com', 0, '사원'),
-- 영업팀
(300017,  '김재영', '010-1001-1001', 'salesteam@example.com', 0, '부서장'),
(300018,  '이서진', '010-2111-2111', 'salesteam_team@example.com', 0, '팀장'),
(300021,  '박희만', '010-5444-5444', 'salesteam_dari@example.com', 0, '대리'),
(300024,  '박현수', '010-8777-8777', 'salesteam_sawon@example.com', 0, '사원'),
-- 운영팀
(400025,  '차현수', '010-9888-9888', 'operationteam@example.com', 0, '부서장'),
(400026,  '모현수', '010-9999-0001', 'operationteam_team@example.com', 0, '팀장'),
(400027,  '도현수', '010-0000-1111', 'operationteam_team@example.com', 0, '팀장'),
(400028,  '고현수', '010-1111-2232', 'operationteam_dari@example.com', 0, '대리'),
(400029,  '김민준', '010-2222-7333', 'operationteam_dari@example.com', 0, '대리'),
(400030,  '이서현', '010-3333-4744', 'operationteam_sawon@example.com', 0, '사원'),
(400031,  '차현우', '010-4444-5545', 'operationteam_sawon@example.com', 0, '사원'),
(400032,  '장우진', '010-5555-6636', 'operationteam_sawon@example.com', 0, '사원'),
-- 기술팀
(500033,  '박시원', '010-6666-7771', 'technologyteam@example.com', 0, '부서장'),
(500034,  '이건우', '010-7777-8882', 'technologyteam_team@example.com', 0, '팀장'),
(500035,  '나건주', '010-8888-9993', 'technologyteam_team@example.com', 0, '팀장'),
(500036,  '김동백', '010-9999-4534', 'technologyteam_dari@example.com', 0, '대리'),
(500037,  '신동일', '010-1001-2222', 'technologyteam_dari@example.com', 0, '대리'),
(500038,  '김보민', '010-2111-3333', 'technologyteam_sawon@example.com', 0, '사원'),
(500039,  '이수빈', '010-3222-4444', 'technologyteam_sawon@example.com', 0, '사원'),
(500040,  '손석희', '010-4333-5555', 'technologyteam_sawon@example.com', 0, '사원'),
-- 디자인팀
(600041,  '윤수한', '010-5444-6666', 'designteam@example.com', 0, '부서장'),
(600042,  '최소연', '010-6555-7777', 'designteam_team@example.com', 0, '팀장'),
(600043,  '박성운', '010-7666-8888', 'designteam_team@example.com', 0, '팀장'),
(600045,  '차원희', '010-9888-0000', 'designteam_dari@example.com', 0, '대리'),
(600047,  '박윤주', '010-1111-2222', 'designteam_sawon@example.com', 0, '사원'),
(600048,  '김유진', '010-2222-3333', 'designteam_sawon@example.com', 0, '사원'),
-- 재무팀
(700049,  '김자현', '010-3333-4444', 'financeteam@example.com', 0, '부서장'),
(700050,  '김주영', '010-4444-5555', 'financeteam_team@example.com', 0, '팀장'),
(700051,  '김지민', '010-5555-6666', 'financeteam_team@example.com', 0, '팀장'),
(700052,  '차종현', '010-6666-7777', 'financeteam_dari@example.com', 0, '대리'),
(700053,  '도지원', '010-7777-8888', 'financeteam_dari@example.com', 0, '대리'),
(700054,  '김태호', '010-8888-9999', 'financeteam_sawon@example.com', 0, '사원'),
(700055,  '한웅재', '010-9999-0000', 'financeteam_sawon@example.com', 0, '사원');
-- 외부출장자
INSERT INTO member (mno, mname, mphone, memail, mtype, mrank) VALUES
(300020,  '김리원', '010-4333-4333', 'salesteam_dari@example.com', 2, '대리'),
(300022,  '서진석', '010-6555-6555', 'salesteam_sawon@example.com', 2, '사원'),
(600044,  '이산', '010-8777-9999', 'designteam_dari@example.com', 2, '대리');
-- 퇴사자
INSERT INTO member (mno, mname, mphone, memail, mtype, mrank) VALUES
(100005,  '유나영', '010-5678-9012', 'insateam_dari@example.com', 3, '대리'),
(300019,  '차정원', '010-3222-3222', 'salesteam_team@example.com', 3, '팀장'),
(300023,  '김현수', '010-7666-7666', 'salesteam_sawon@example.com', 3, '사원'),
(600046,  '이민진', '010-0999-1111', 'designteam_sawon@example.com', 3, '사원'),
(700056,  '현정우', '010-1001-1111', 'financeteam_sawon@example.com', 3, '사원');

-- 보고서 샘플 추가
INSERT INTO report( rpname, rpam, rppm, rpunprocessed, rpsignificant, rpexpected, rpdate, mno ) VALUES
( 'uuid1-보고서', '오전 업무1', '오후 업무1', '미처리 내역1', '특이사항1', '예정사항1', '2025-02-01 12:30:11', 100006 ),
( 'uuid2-보고서', '오전 업무2', '오후 업무2', '미처리 내역2', '특이사항2', '예정사항2', '2025-02-02 12:30:11', 200015 ),
( 'uuid3-보고서', '오전 업무3', '오후 업무3', '미처리 내역3', '특이사항3', '예정사항3', '2025-02-03 12:30:11', 300024 ),
( 'uuid4-보고서', '오전 업무4', '오후 업무4', '미처리 내역4', '특이사항4', '예정사항4', '2025-02-04 12:30:11', 400030 ),
( 'uuid5-보고서', '오전 업무5', '오후 업무5', '미처리 내역5', '특이사항5', '예정사항5', '2025-02-05 12:30:11', 500039 );

-- 결재 샘플 추가
INSERT INTO approval( apdate, apstate, apsignature, mno, rpno ) VALUES
( '2025-02-02 23:30:11', 1, '서명1', 100004, 1 ),
( '2025-02-03 23:30:11', 1, '서명2', 100002, 1 ),
( '2025-02-04 23:30:11', 1, '서명3', 100001, 1 ),
( '2025-02-05 23:30:11', 1, '서명4', 200012, 2 ),
( null , 0, '서명5', 200010, 2 );
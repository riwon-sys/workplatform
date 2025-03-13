package work.model.dto.member;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class MemberDto {
    private int mno; // unsigned : 직별부여 및 사번부여( 1: 인사팀 2: 마케팅팀 3: 영업팀 4: 운영팀 5:기술팀 6:디자인팀 7:재무팀) (맨 앞자리 부서/ 자바에서부여)
    private  String mpwd; // default '1234' :  비밀번호 기본값 설정
    private  String mname; // not null : 사원 이름
    private  String mphone; // not null unique : 사원 전화번호, 고유값 설정
    private  String memail; // not null : 사원 사내 이메일
    private  int mtype; // default 0 : 사원 현재 상태 (0: 활동, 1: 부재, 2: 외부업무, 3: 퇴사)
    private  String mrank; // not null 사원 직급 : 사원 - 대리 - 팀장 - 부서장
    private  String mprofile; // default 'default.jpg' : 프로필 사진 기본값 설정
}

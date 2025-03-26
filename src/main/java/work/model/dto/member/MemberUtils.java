package work.model.dto.member;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;

@Component
public class MemberUtils {

    // 1. 부서 조회
    private static final String[] PARTS = { "인사", "마케팅", "영업", "운영", "기술", "디자인", "재무" };

    public static String getDepartmentFromMno(int mno) {
        int mnoPart = mno / 100000; // 첫 번째 자리 숫자 추출
        if (mnoPart < 1 || mnoPart > PARTS.length) {
            throw new IllegalArgumentException("잘못된 회원 번호: " + mno);
        }
        System.out.println( PARTS[mnoPart - 1]);

        return PARTS[mnoPart - 1]; // 배열은 0부터 시작하므로 -1 처리
    } // f end

    // 2. 세션 로그인 정보 MemberDto 가져오기
    public static MemberDto getLoginInfo( HttpServletRequest req ){
        System.out.println("MemberUtils.getLoginInfo");
        HttpSession session = req.getSession();
        System.out.println("session = " + session);
        if( session == null ){ return null; }
        Object object = session.getAttribute("memberDto");
        System.out.println("object = " + object);
        MemberDto result = (MemberDto) object;
        System.out.println("result = " + result);
        return result;
    } // f end

}

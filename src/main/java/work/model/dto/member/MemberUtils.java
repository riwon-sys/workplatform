package work.model.dto.member;

import org.springframework.stereotype.Component;

@Component
public class MemberUtils {

    private static final String[] PARTS = { "인사", "마케팅", "영업", "운영", "기술", "디자인", "채무" };

    public static String getDepartmentFromMno(int mno) {
        int mnoPart = mno / 100000; // 첫 번째 자리 숫자 추출
        if (mnoPart < 1 || mnoPart > PARTS.length) {
            throw new IllegalArgumentException("잘못된 회원 번호: " + mno);
        }
        System.out.println( PARTS[mnoPart - 1]);

        return PARTS[mnoPart - 1]; // 배열은 0부터 시작하므로 -1 처리
    }

}

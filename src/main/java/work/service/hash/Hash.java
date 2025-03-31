package work.service.hash;

import java.nio.charset.StandardCharsets;
import java.util.Random;
import java.util.Scanner;

public class Hash {
    private static final int SALT_SIZE = 8; // 솔트 크기 (8바이트)
    private static final int HASH_LENGTH = 50; // 해시 값 길이 (출력될 해시의 길이)

    /**
     * 랜덤한 솔트를 생성하는 함수
     * @return 8바이트 크기의 랜덤 솔트를 16진수 문자열로 변환하여 반환
     */
    public static String createSalt() {
        Random random = new Random( System.nanoTime() ); // 시스템 시간을 기반으로 랜덤 객체 생성
        byte[] saltBytes = new byte[ SALT_SIZE ]; // 8바이트 크기의 배열 생성
        for ( int i = 0 ; i < SALT_SIZE ; i++ ) {
            saltBytes[i] = ( byte ) ( random.nextInt( 256 ) - 128 ); // -128 ~ 127 범위의 랜덤 값 생성
        }

        StringBuilder st = new StringBuilder(); // 문자열을 조합하기 위한 StringBuilder 객체 생성
        for (byte b : saltBytes) { // 배열의 각 바이트를 16진수 문자열로 변환
            st.append(String.format("%02x", b)); // 각 바이트를 2자리 16진수로 변환하여 추가
        }
        return st.toString(); // 생성된 솔트를 문자열로 반환
    }

    /**
     * 사용자 입력 문자열과 솔트를 포함하여 50자리 고정 길이의 해시 값을 생성하는 함수
     * @param input 해싱할 문자열 (예: 비밀번호)
     * @param salt 해싱에 사용할 솔트 값
     * @return 50자리 길이의 해시 문자열
     */
    public static String customHash(String input, String salt) {
        byte[] bytes = (input + salt).getBytes(StandardCharsets.UTF_8); // 입력값과 솔트를 합쳐 바이트 배열로 변환
        int hashVal = 7919; // 초기값 (낮은 소수)
        int prime = 257; // 해싱에 사용할 작은 소수

        StringBuilder st = new StringBuilder(); // 해시 값을 저장할 StringBuilder 객체 생성
        for (byte b : bytes) { // 입력값의 각 바이트를 반복하여 해싱
            int intVal = b & 0xFF; // 바이트 값을 정수로 변환
            hashVal ^= intVal; // XOR 연산 수행
            hashVal *= prime; // 소수 곱셈 연산 적용
            hashVal = ( hashVal << 5 ) + intVal; // 비트 연산을 통한 변형
            hashVal = Integer.rotateLeft( hashVal, 3 ); // 왼쪽으로 3비트 회전
            hashVal = Integer.rotateRight (hashVal, 2 ); // 오른쪽으로 2비트 회전
            hashVal ^= ( hashVal >>> 3 ); // 비트 이동 후 XOR 연산 적용

            st.append( String.format( "%02x", hashVal )); // 결과값을 16진수 문자열로 변환하여 추가
            if ( st.length() >= HASH_LENGTH ) { break; } // 해시 길이가 50자리를 초과하면 중단
        }

        return st.substring( 0, HASH_LENGTH ); // 50자리 길이의 해시 값을 반환
    }

    /**
     * 입력된 비밀번호가 저장된 해시 값과 일치하는지 검증하는 함수
     * @param inputPwd 사용자가 입력한 비밀번호
     * @param DBPwd 저장된 솔트 + 해시 값 (솔트는 앞부분, 해시는 뒷부분)
     * @return 입력된 비밀번호가 올바른지 여부 (true: 일치, false: 불일치)
     */
    public static boolean MatchPwd( String inputPwd, String DBPwd ) {
        String storedSalt = DBPwd.substring( 0, SALT_SIZE * 2 ); // 솔트 길이는 8바이트(16진수 변환 시 16자리)이며 이를 분리
        String storedHash = DBPwd.substring(SALT_SIZE * 2) ; // 해시 값 부분을 분리
        String newHash = customHash( inputPwd, storedSalt ); // 입력된 비밀번호와 저장된 솔트를 이용하여 새로운 해시 생성
        return newHash.equals( storedHash ); // 새로 생성한 해시와 저장된 해시 값 비교하여 일치 여부 반환
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in); // 사용자 입력을 받기 위한 Scanner 객체 생성
        while (true) { // 무한 루프 실행
            System.out.print("해쉬함수 적용할 암호 입력 : "); // 사용자에게 비밀번호 입력 요청
            String input = scanner.nextLine(); // 입력값 읽기

            String salt = createSalt(); // 랜덤 솔트 생성
            String hashedValue = customHash(input, salt); // 입력된 비밀번호 + 솔트를 해싱

            System.out.println("SALT 생성 : " + salt); // 생성된 솔트 출력
            System.out.println("HASH 생성 : " + hashedValue); // 생성된 해시 출력

            String hashedPassword = salt + hashedValue; // 저장할 솔트 + 해시 값 조합
            System.out.println("hashedPassword = " + hashedPassword);
            
            System.out.print("비밀번호 입력 : "); // 비밀번호 검증을 위해 사용자 입력 요청
            String verifyInput = scanner.nextLine(); // 입력값 읽기
            boolean isMatch = MatchPwd( verifyInput, hashedPassword ); // 입력된 비밀번호 검증
            System.out.println("로그인 여부 : " + isMatch); // 검증 결과 출력
        }
    }
}

package work.service.hash;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Scanner;

public class hash {

    private static final int SALT_SIZE = 8; // 솔트 크기 (8바이트)
    private static final int HASH_LENGTH = 50; // 해시 값 길이

    /**
     * 랜덤한 솔트를 생성하는 함수
     * @return 8바이트 크기의 랜덤 솔트를 16진수 문자열로 변환하여 반환
     */
    public static String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] saltBytes = new byte[SALT_SIZE];
        random.nextBytes(saltBytes);

        StringBuilder hexString = new StringBuilder();
        for (byte b : saltBytes) {
            hexString.append(String.format("%02x", b));
        }
        return hexString.toString();
    }

    /**
     * 사용자 입력 문자열을 받아 50자리 고정 길이의 해시 값을 생성하는 함수
     * @param input 해싱할 문자열 (예: 비밀번호 + 솔트)
     * @return 50자리 길이의 해시 문자열
     */
    public static String customHash(String input) {
        byte[] bytes = input.getBytes(StandardCharsets.UTF_8);
        int hashVal = 7919; // 초기값 (낮은 소수)
        int prime = 257; // 작은 소수

        StringBuilder hashBuilder = new StringBuilder();
        for (byte b : bytes) {
            int intVal = b & 0xFF;
            hashVal ^= intVal;
            hashVal *= prime;
            hashVal = (hashVal << 5) + intVal;
            hashVal = Integer.rotateLeft(hashVal, 3);
            hashVal = Integer.rotateRight(hashVal, 2);
            hashVal ^= (hashVal >>> 3);

            hashBuilder.append(String.format("%02x", hashVal));
            if (hashBuilder.length() >= HASH_LENGTH) break;
        }

        return hashBuilder.substring(0, HASH_LENGTH);
    }

    /**
     * 입력된 비밀번호가 저장된 해시 값과 일치하는지 검증하는 함수
     * @param input 사용자가 입력한 비밀번호
     * @param storedHashWithSalt 저장된 솔트 + 해시 값 (솔트는 앞부분, 해시는 뒷부분)
     * @return 입력된 비밀번호가 올바른지 여부 (true: 일치, false: 불일치)
     */
    public static boolean verifyPassword(String input, String storedHashWithSalt) {
        String storedSalt = storedHashWithSalt.substring(0, SALT_SIZE * 2); // 솔트 길이는 8바이트(16진수 변환 시 16자리)
        String storedHash = storedHashWithSalt.substring(SALT_SIZE * 2);
        String newHash = customHash(input + storedSalt);
        return newHash.equals(storedHash);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.print("해쉬함수 적용할 암호 입력 : ");
            String input = scanner.nextLine();

            String salt = generateSalt();
            String hashedValue = customHash(input + salt);

            System.out.println("SALT 생성 : " + salt);
            System.out.println("HASH 생성 : " + hashedValue);

            String hasedPassword = salt + hashedValue;

            System.out.print("비밀번호 입력 : ");
            String verifyInput = scanner.nextLine();
            boolean isMatch = verifyPassword(verifyInput, hasedPassword);
            System.out.println("로그인 여부 : " + isMatch);
        }
    }
}

package work.service.hash;

import java.util.Scanner;

public class ex {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        String str1 = scan.next();
        String str2 = scan.next();

//        str1 = hash.hashStr(str1);
//
//        str2 = hash.hashStr(str2);

        System.out.println(str1);
        System.out.println(str2);
        System.out.println(str1.equals(str2));
    }

}

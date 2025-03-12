package work.service.hash;

public class hash {

    private static String ordStr( String input ){
        String[] strArr = input.split("");
        int[] resultArr = new int[strArr.length];
        StringBuilder sb = new StringBuilder();

        for( int i = 0; i < strArr.length; i++ ){
            if( i > 0 ){
                resultArr[i] = strArr[i].charAt(0) * strArr[i-1].charAt(0);
            }else{ resultArr[i] = strArr[i].charAt(0) * strArr[i+1].charAt(0); }
            sb.append(resultArr[i]);
        }

        String result = sb.toString();
        System.out.println(result);
        return result;
    } // f end

    public static String hashStr( String input ){
        String o = ordStr(input);
        byte[] buffers = o.getBytes();
        StringBuilder result = new StringBuilder();
        for (byte b : buffers) {
            result.append(String.format("%08x", b));
        }
        return result.toString();
    } // f end


}

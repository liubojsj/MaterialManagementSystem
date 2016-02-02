package lb.mms.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class RandomUtil {
    public static String getRandomFileName(String fileName) {
	
	String lastName = fileName.substring(fileName.lastIndexOf(".")) ;

	SimpleDateFormat simpleDateFormat;

	simpleDateFormat = new SimpleDateFormat("yyyyMMdd");

	Date date = new Date();

	String str = simpleDateFormat.format(date);

	Random random = new Random();

	int rannum = (int) (random.nextDouble() * (99999 - 10000 + 1)) + 10000;// 获取5位随机数

	return str+rannum+lastName;// 当前时间
    }

}

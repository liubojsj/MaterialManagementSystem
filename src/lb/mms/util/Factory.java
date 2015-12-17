package lb.mms.util;

public class Factory {
	@SuppressWarnings("unchecked")
	public static Object getInstance(String type) {
		Object obj = null;
		String className = DBConfig.getObject(type);
		
		try {
			Class c = Class.forName(className);
			obj = c.newInstance();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return obj;
	}
}

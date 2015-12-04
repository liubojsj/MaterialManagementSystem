package lb.mms.util;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

public class DBConfig {
	private static String url;
	private static String user;
	private static String password;
	private static Properties props = new Properties();

	static {
		ClassLoader classLoader = DBConfig.class.getClassLoader();
		InputStream in = classLoader.getResourceAsStream("dao.properties");
		try {
			props.load(in);
			user = props.getProperty("user");
			url =  props.getProperty("url");
			password = props.getProperty("password");
			Class.forName(props.getProperty("driver"));
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static Connection getConnection() throws Exception {
		return DriverManager.getConnection(url, user, password);
	}
	
	public static String getObject(String key) {
		return props.getProperty(key);
	}
	
	public static void close(ResultSet rs, PreparedStatement ps, Connection conn) {
			try {
				if(rs != null)
					rs.close();
				if(ps != null)
					ps.close();
				if(conn != null)
					conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}
	
	public static void close(PreparedStatement ps, Connection conn) {
			try {
				if(ps != null)
					ps.close();
				if(conn != null)
					conn.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}
}

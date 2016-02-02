package lb.mms.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import lb.mms.dao.UserDAO;
import lb.mms.entity.User;
import lb.mms.util.DBConfig;

public class UserDAOImpl implements UserDAO {

	public void addUser(User user) {
		Connection conn = null;
		PreparedStatement ps = null;
		
		try {
			conn = DBConfig.getConnection();
			ps = conn.prepareStatement("insert into user_tb(username,name,password,sex) values(?,?,?,?)");
			ps.setString(1, user.getUsername());
			ps.setString(2, user.getName());
			ps.setString(3, user.getPassword());
			ps.setString(4, user.getSex());
			ps.executeUpdate();
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			DBConfig.close(ps, conn);
		}
	}

	public void deleteUserByID(int ID) {
		Connection conn = null;
		PreparedStatement ps = null;
		try {
			conn = DBConfig.getConnection();
			ps = conn.prepareStatement("delete from user_tb where id=?");
			ps.setInt(1, ID);
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBConfig.close(ps, conn);
		}
	}

	public void updateUser(User user) {
		Connection conn = null;
		PreparedStatement ps = null;
		try {
			conn = DBConfig.getConnection();
			ps = conn.prepareStatement("update user_tb set username=?,name=?,password=?,sex=? where id=?");
			ps.setString(1, user.getUsername());
			ps.setString(2, user.getName());
			ps.setString(3, user.getPassword());
			ps.setString(4, user.getSex());
			ps.setInt(5, user.getId());
			ps.executeUpdate();
			
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			DBConfig.close(ps, conn);
		}
	}
	
//	public User findUserByID(int ID) {
//		Connection conn = null;
//		PreparedStatement ps = null;
//		ResultSet rs = null;
//		User user = null;
//		try {
//			conn = DBConfig.getConnection();
//			ps = conn.prepareStatement("select * from user_tb where id=?");
//			ps.setInt(1, ID);
//			rs = ps.executeQuery();
//			user = new User();
//			user.setId(rs.getInt("id"));
//			user.setUsername(rs.getString("username"));
//			user.setName(rs.getString("name"));
//			user.setPassword(rs.getString("password"));
//			user.setSex(rs.getString("sex"));
//			
//		} catch(Exception e) {
//			e.printStackTrace();
//		} finally {
//			try {
//				rs.close();
//				ps.close();
//				conn.close();
//			} catch (Exception e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
//		return user;
//	}

	
	public ArrayList<User> findAllUsers() {
		ArrayList<User> userlist = new ArrayList<User>();
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		try {
			conn = DBConfig.getConnection();
			ps = conn.prepareStatement("select * from user_tb");
			rs = ps.executeQuery();
			while(rs.next()) {
				User user = new User(); //一定要加,否则会发生空指针异常
				user.setId(rs.getInt("id"));
				user.setUsername(rs.getString("username"));
				user.setName(rs.getString("name"));
				user.setPassword(rs.getString("password"));
				user.setSex(rs.getString("sex"));
				userlist.add(user);
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			DBConfig.close(rs, ps, conn);
		}
		return userlist;
	}

	public User findUserByUsername(String username) {
		User user = null;
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		try {
			conn = DBConfig.getConnection();
			ps = conn.prepareStatement("select * from user_tb where username=?");
			ps.setString(1, username);
			//此时的rs处于第一行记录的上面,指向null
			rs = ps.executeQuery();
			//rs.next()后,rs指向第一行记录
			while(rs.next()) {
				//此处必须new一个user,否则报null异常
				user = new User();
				user.setId(rs.getInt("id"));
				user.setUsername(rs.getString("username"));
				user.setName(rs.getString("name"));
				user.setSex(rs.getString("sex"));
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			DBConfig.close(rs, ps, conn);
		}
		return user;
	}

	public boolean login(String username, String password) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			conn = DBConfig.getConnection();
			String sql = "select count(*) countUser from user_tb where username=? and password=?";
			//PreparedStatement编译并发送SQL语句,如用Statement会被SQL注入式攻击
			ps = conn.prepareStatement(sql);
			//?赋值
			ps.setString(1, username);
			ps.setString(2, password);
			rs = ps.executeQuery();
			
			while(rs.next()) {
				int result = rs.getInt("countUser");
				if(result == 1) {
					System.out.println("登录成功");
					return true;
				}else {
					System.out.println("登录失败");
					return false;
				}
			}
		} catch(Exception e) {
			e.printStackTrace();
		}finally {
			DBConfig.close(rs, ps, conn);
		}
		
		return false;
	}
}

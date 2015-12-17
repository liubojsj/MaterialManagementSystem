package lb.mms.dao;

import java.util.ArrayList;

import lb.mms.entity.User;


public interface UserDAO {
	public void addUser(User user);
	public void deleteUserByID(int ID);
	public void updateUser(User user);
//	public User findUserByID(int ID);
	public User findUserByUsername(String username);
	public ArrayList<User> findAllUsers();
	public boolean login(String username, String password);
	
}

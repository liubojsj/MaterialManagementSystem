package lb.mms.dao.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import lb.mms.dao.EmployeeDAO;
import lb.mms.entity.Employee;
import lb.mms.util.DBConnection;

public class EmployeeDAOJdbcImpl implements EmployeeDAO {

	public List<Employee> findALL() throws Exception {
		ArrayList<Employee> list = new ArrayList<Employee>();
		Connection conn = DBConnection.getConnection();
		PreparedStatement ps = conn.prepareStatement("select * from t_emp");
		ResultSet rs = ps.executeQuery();
		
		while(rs.next()) {
			Employee e = new Employee();
			e.setId(rs.getInt("id"));
			e.setName(rs.getString("name"));
			e.setAge(rs.getInt("age"));
			e.setSalary(rs.getDouble("salary"));
			list.add(e);
		}
		DBConnection.close(rs, ps, conn);
		return list;
	}
	
	public void insertEmp(Employee e) throws Exception {
		Connection conn = DBConnection.getConnection();
		PreparedStatement ps = conn.prepareStatement("insert into t_emp(name,age,salary) values(?,?,?)");
		ps.setString(1, e.getName());
		ps.setInt(2,e.getAge());
		ps.setDouble(3, e.getSalary());
		ps.executeUpdate();
		System.out.println("插入成功");
		DBConnection.close(ps, conn);
		
	}
	
	public void deleteEmpById(int id) throws Exception {
		Connection conn = DBConnection.getConnection();
		PreparedStatement ps = conn.prepareStatement("delete from t_emp where id=?");
		ps.setInt(1,id);
		ps.executeUpdate();
		System.out.println("删除成功");
		DBConnection.close(ps, conn);
	}
	
	public void updateEmp(Employee e) throws Exception {
		Connection conn = DBConnection.getConnection();
		PreparedStatement ps = conn.prepareStatement("update t_emp set name=?,age=?,salary=? where id=?");
		ps.setString(1, e.getName());
		ps.setInt(2,e.getAge());
		ps.setDouble(3, e.getSalary());
		ps.setInt(4, e.getId());
		ps.executeUpdate();
		System.out.println("修改成功");
		DBConnection.close(ps, conn);
	}
	
	public Employee findEmpById(int id) throws Exception {
		Employee e = null;
		Connection conn = DBConnection.getConnection();
		PreparedStatement ps = conn.prepareStatement("select * from t_emp where id=?");
		ps.setInt(1, id);
		ResultSet rs = ps.executeQuery();
		
		while(rs.next()) {
			e = new Employee();
			e.setId(rs.getInt("id"));
			e.setName(rs.getString("name"));
			e.setAge(rs.getInt("age"));
			e.setSalary(rs.getDouble("salary"));
		}
		DBConnection.close(rs, ps, conn);
		return e;
		
	}


	
}

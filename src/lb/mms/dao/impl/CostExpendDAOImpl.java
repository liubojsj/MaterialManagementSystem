package lb.mms.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import lb.mms.dao.CostExpendDAO;
import lb.mms.entity.CostExpend;
import lb.mms.util.DBConfig;
import lb.mms.util.DBConnection;

public class CostExpendDAOImpl implements CostExpendDAO {

    public List<CostExpend> findAllByID(int department_id, int start, int limit)
	    throws Exception {
	ArrayList<CostExpend> costlist = new ArrayList<CostExpend>();
	Connection conn = null;
	PreparedStatement ps = null;
	ResultSet rs = null;
	// System.out.println(department_id);
	try {
	    conn = DBConfig.getConnection();

	    ps = conn
		    .prepareStatement("select * from cost_expend_tb where department_id = ? limit ?,?");
	    ps.setInt(1, department_id);
	    ps.setInt(2, start);
	    ps.setInt(3, limit);
	    rs = ps.executeQuery();

	    while (rs.next()) {
		CostExpend costExpend = new CostExpend(); // 一定要加,否则会发生空指针异常
		costExpend.setCost_expend_id(rs.getInt("cost_expend_id"));
		costExpend
			.setCost_expend_name(rs.getString("cost_expend_name"));
		costExpend.setDepartment_id(rs.getInt("department_id"));
		costExpend.setDepartment_name(rs.getString("department_name"));
		costExpend.setSpecification(rs.getString("specification"));
		costExpend.setPrice(rs.getInt("Price"));
		costExpend.setCount(rs.getInt("count"));
		costExpend.setSum(rs.getInt("sum"));
		costExpend.setProviderd(rs.getString("providerd"));
		costExpend
			.setProviderd_choose(rs.getString("providerd_choose"));
		costExpend.setCheck_date(rs.getString("check_date"));
		costExpend.setDetails(rs.getString("details") + ","
			+ rs.getInt("cost_expend_id"));
		costExpend.setEvaluation_message(rs
			.getString("evaluation_message")
			+ "," + rs.getInt("cost_expend_id"));
		costlist.add(costExpend);

	    }
	} catch (Exception e) {
	    e.printStackTrace();
	} finally {
	    DBConfig.close(rs, ps, conn);
	}
	return costlist;
    }

    public int getCount() throws Exception {
	// TODO Auto-generated method stub
	return 0;
    }

    public int getCountByDepartmentID(int department_id) throws Exception {
	int count = 0;
	Connection conn = null;
	PreparedStatement ps = null;
	ResultSet rs = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("select  * from cost_expend_tb where department_id = ? ");
	    ps.setInt(1, department_id);
	    rs = ps.executeQuery();
	    while (rs.next()) {
		count = rs.getRow();
	    }
	} catch (Exception e) {
	    // TODO: handle exception
	}

	return count;
    }

    public boolean insertCostExpend(CostExpend ce) throws Exception {
	Connection conn = null;
	PreparedStatement ps = null;
	 
	conn = DBConfig.getConnection();
	ps = conn
		.prepareStatement("insert into cost_expend_tb " +
				"(cost_expend_name,specification,price,count," +
				"sum,providerd,providerd_choose,check_date,department_id," +
				"department_name,details,evaluation_message) values(?,?,?,?,?,?,?,?,?,?,?,?)");
	ps.setString(1, ce.getCost_expend_name());
	ps.setString(2, ce.getSpecification());
	ps.setInt(3, ce.getPrice());
	ps.setInt(4, ce.getCount());
	ps.setInt(5, ce.getSum());
	ps.setString(6, ce.getProviderd());
	ps.setString(7, ce.getProviderd_choose());
	ps.setString(8, ce.getCheck_date());
	ps.setInt(9, ce.getDepartment_id());
	ps.setString(10, ce.getDepartment_name());
	ps.setString(11, ce.getDetails());
	ps.setString(12, ce.getEvaluation_message());
	ps.executeUpdate();
	DBConfig.close( ps, conn);
	return true;
    }

    public boolean updateCostExpend(CostExpend ce) throws Exception {
	Connection conn = null;
	PreparedStatement ps = null;
	 
	conn = DBConfig.getConnection();
	ps = conn
		.prepareStatement("update cost_expend_tb " +
				"set cost_expend_name = ?,specification = ?,price = ?,count = ?," +
				"sum = ?,providerd = ?,providerd_choose = ?,check_date = ?,department_id = ?," +
				"department_name = ?,details = ?,evaluation_message = ? where cost_expend_id = ?");
	ps.setString(1, ce.getCost_expend_name());
	ps.setString(2, ce.getSpecification());
	ps.setInt(3, ce.getPrice());
	ps.setInt(4, ce.getCount());
	ps.setInt(5, ce.getSum());
	ps.setString(6, ce.getProviderd());
	ps.setString(7, ce.getProviderd_choose());
	ps.setString(8, ce.getCheck_date());
	ps.setInt(9, ce.getDepartment_id());
	ps.setString(10, ce.getDepartment_name());
	ps.setString(11, ce.getDetails());
	ps.setString(12, ce.getEvaluation_message());
	ps.setInt(13, ce.getCost_expend_id());
	ps.executeUpdate();
	System.out.println("修改成功");
	DBConfig.close( ps, conn);
	return true;
    }
    public boolean deleteCostExpend(int cost_expend_id) throws Exception {
	    Connection conn = DBConnection.getConnection();
		PreparedStatement ps = conn.prepareStatement("delete from cost_expend_tb where cost_expend_id=?");
		ps.setInt(1,cost_expend_id);
		ps.executeUpdate();
		DBConnection.close(ps, conn);
	    return true;
	}
}

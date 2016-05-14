package lb.mms.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lb.mms.dao.ControlItemDAO;
import lb.mms.entity.ControlItem;
import lb.mms.util.DBConfig;
import lb.mms.util.DBConnection;

public class ControlItemDAOImpl implements ControlItemDAO {

    public ArrayList<ControlItem> findAll() throws Exception {

	ArrayList<ControlItem> controllist = new ArrayList<ControlItem>();
	Connection conn = null;
	PreparedStatement ps = null;
	ResultSet rs = null;
	try {
	    conn = DBConfig.getConnection();

	    ps = conn.prepareStatement("select * from control_item_tb");

	    rs = ps.executeQuery();

	    while (rs.next()) {
		ControlItem control = new ControlItem(); // 一定要加,否则会发生空指针异常

		control.setControl_item_id(rs.getInt("control_item_id"));
		control.setControl_item_name(rs.getString("control_item_name"));
		control.setDepartment_id(rs.getInt("department_id"));
		control.setDepartment_name(rs.getString("department_name"));
		control.setCont_feature(rs.getString("cont_feature"));
		control.setPlan_cost(rs.getInt("plan_cost"));
		control.setDynamic_expend(rs.getInt("dynamic_expend"));
		control.setCutting_down_expenditures_sum(rs
			.getInt("cutting_down_expenditures_sum"));
		controllist.add(control);

	    }
	} catch (Exception e) {
	    e.printStackTrace();
	} finally {
	    DBConfig.close(rs, ps, conn);
	}
	return controllist;
    }

    public int getCount() throws Exception {
	
	int count = 0;
	Connection conn = null;
	PreparedStatement ps = null;
	ResultSet rs = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn.prepareStatement("select  * from control_item_tb");
	    rs = ps.executeQuery();
	    while (rs.next()) {
	    count = rs.getRow();
	    }
	} catch (Exception e) {
	    // TODO: handle exception
	}

	return count;
    }

    public List<ControlItem> findAllByID(int department_id,int start,int limit ) throws Exception {
	ArrayList<ControlItem> controllist = new ArrayList<ControlItem>();
	Connection conn = null;
	PreparedStatement ps = null;
	ResultSet rs = null;
	//System.out.println(department_id);
	try {
	    conn = DBConfig.getConnection();

	    ps = conn.prepareStatement("select * from control_item_tb where department_id = ? limit ?,?");
	    ps.setInt(1, department_id);
	    ps.setInt(2, start);
	    ps.setInt(3, limit);
	    rs = ps.executeQuery();

	    while (rs.next()) {
		ControlItem control = new ControlItem(); // 一定要加,否则会发生空指针异常

		control.setControl_item_id(rs.getInt("control_item_id"));
		control.setControl_item_name(rs.getString("control_item_name"));
		control.setDepartment_id(rs.getInt("department_id"));
		control.setDepartment_name(rs.getString("department_name"));
		control.setCont_feature(rs.getString("cont_feature"));
		control.setPlan_cost(rs.getInt("plan_cost"));
		control.setDynamic_expend(rs.getInt("dynamic_expend"));
		control.setCutting_down_expenditures_sum(rs
			.getInt("cutting_down_expenditures_sum"));
		controllist.add(control);

	    }
	} catch (Exception e) {
	    e.printStackTrace();
	} finally {
	    DBConfig.close(rs, ps, conn);
	}
	return controllist;
    }
public int getCountByDepartmentID(int department_id) throws Exception {
	
	int count = 0;
	Connection conn = null;
	PreparedStatement ps = null;
	ResultSet rs = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn.prepareStatement("select  * from control_item_tb where department_id = ? ");
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

public boolean insertControlItem(ControlItem ci) throws Exception {
    // TODO Auto-generated method stub
    
	Connection conn = DBConfig.getConnection();;
	PreparedStatement ps = null;
	
	ps = conn.prepareStatement("insert into control_item_tb(control_item_name,department_id,department_name,cont_feature,plan_cost,dynamic_expend,cutting_down_expenditures_sum) values(?,?,?,?,?,?,?)");
	ps.setString(1, ci.getControl_item_name());
	ps.setInt(2,ci.getDepartment_id());
	ps.setString(3, ci.getDepartment_name());
	ps.setString(4, ci.getCont_feature());
	ps.setInt(5, ci.getPlan_cost());
	ps.setInt(6, ci.getDynamic_expend());
	ps.setInt(7, ci.getCutting_down_expenditures_sum());
	ps.executeUpdate();


	DBConnection.close(ps, conn);
	return true ;
}

public boolean deleteControlItem(int control_item_id) throws Exception {
    Connection conn = DBConnection.getConnection();
	PreparedStatement ps = conn.prepareStatement("delete from control_item_tb where control_item_id=?");
	ps.setInt(1,control_item_id);
	ps.executeUpdate();
	DBConnection.close(ps, conn);
    return true;
}

public boolean updateControlItem(ControlItem ci) throws Exception {
	Connection conn = DBConnection.getConnection();
	PreparedStatement ps = conn.prepareStatement("update control_item_tb set control_item_name = ?,department_id= ?,department_name=?,cont_feature= ?,plan_cost= ?,dynamic_expend= ?,cutting_down_expenditures_sum= ? where control_item_id =? ");
	ps.setString(1, ci.getControl_item_name());
	ps.setInt(2,ci.getDepartment_id());
	ps.setString(3, ci.getDepartment_name());
	ps.setString(4, ci.getCont_feature());
	ps.setInt(5, ci.getPlan_cost());
	ps.setInt(6, ci.getDynamic_expend());
	ps.setInt(7, ci.getCutting_down_expenditures_sum());
	ps.setInt(8, ci.getControl_item_id());
	ps.executeUpdate();
	DBConnection.close(ps, conn);
	return true ;
}

public boolean updateControlItemSum(int control_item_id ,int dynamic_expend) throws Exception {
	// TODO Auto-generated method stub
	Connection conn = DBConnection.getConnection();
	PreparedStatement ps = conn.prepareStatement("UPDATE control_item_tb SET dynamic_expend= ? WHERE control_item_id =? ");
	ps.setInt(1, dynamic_expend);
	ps.setInt(2, control_item_id);
	ps.executeUpdate();
	DBConnection.close(ps, conn);
	return true ;
}



}

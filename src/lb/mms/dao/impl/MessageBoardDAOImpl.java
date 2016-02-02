package lb.mms.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import lb.mms.dao.MessageBoardDAO;
import lb.mms.entity.MessageBoard;
import lb.mms.util.DBConfig;
import lb.mms.util.DBConnection;

public class MessageBoardDAOImpl implements MessageBoardDAO {
    /**
     * 
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-12 : 上午09:41:35</li>
     * <li>3、参数含义：flag 指定查询id.1为cost id,2为construction id</li>
     * <li>4、方法说明：</li>
     * </ul>
     * @see lb.mms.dao.MessageBoardDAO#findAllByID(int, int, int, int)
     */
    public List<MessageBoard> findAllByID(int flag ,int id, int start,
	    int limit) throws Exception {
	ArrayList<MessageBoard> mglist = new ArrayList<MessageBoard>();
	Connection conn = null;
	PreparedStatement ps = null;
	ResultSet rs = null;
	String query = null  ;
	// System.out.println(department_id);
	if (flag == 1) {
	    query =  "cost_expend_id" ;
	}else if (flag == 2) {
	    query = "construction_repair_id" ;
	}else {
	    System.out.println("参数未在正确范围内!!\n请检查参数!") ;
	    return mglist;
	}
	try {
	    conn = DBConfig.getConnection();

	    ps = conn
		    .prepareStatement("select * from message_board_tb where "+query+" = ? order by message_board_id DESC limit ?,? ");
	    ps.setInt(1, id);
	    ps.setInt(2, start);
	    ps.setInt(3, limit);
	    rs = ps.executeQuery();

	    while (rs.next()) {
		MessageBoard mg = new MessageBoard();
		mg.setMessage_board_id(rs.getInt("message_board_id"));
		mg.setCost_expend_id(rs.getInt("cost_expend_id"));
		mg.setConstruction_repair_id(rs.getInt("construction_repair_id")) ;
		mg.setUser_connect(rs.getString("user_connect"));
		mg.setProvider_connect(rs.getString("provider_connect"));
		mg.setIncorrupt_connect(rs.getString("incorrupt_connect"));
		mg.setDepartment_connect(rs.getString("department_connect"));
		mg.setUser_ip(rs.getString("user_ip"));
		mg.setUser_date(rs.getString("user_date"));
		mglist.add(mg);
	    }
	} catch (Exception e) {
	    e.printStackTrace();
	} finally {
	    DBConfig.close(rs, ps, conn);
	}
	return mglist;
    }

    public int getCostExpendID(int cost_expend_id) throws Exception {
	int count = 0;
	Connection conn = null;
	PreparedStatement ps = null;
	ResultSet rs = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("select  * from message_board_tb where cost_expend_id = ? ");
	    ps.setInt(1, cost_expend_id);
	    rs = ps.executeQuery();
	    while (rs.next()) {
		count = rs.getRow();
	    }
	} catch (Exception e) {
	    // TODO: handle exception
	}

	return count;
    }

    public Boolean insertMssageBroad(MessageBoard msgbrd) throws Exception {
	Connection conn = null;
	PreparedStatement ps = null;
	conn = DBConfig.getConnection();
	ps = conn
		.prepareStatement("insert into message_board_tb(cost_expend_id,user_connect,provider_connect,incorrupt_connect,department_connect,user_ip,user_date) values(?,?,?,?,?,?,?)");
	ps.setInt(1, msgbrd.getCost_expend_id());
	ps.setString(2, msgbrd.getUser_connect());
	ps.setString(3, msgbrd.getProvider_connect());
	ps.setString(4, msgbrd.getIncorrupt_connect());
	ps.setString(5, msgbrd.getDepartment_connect());
	ps.setString(6, msgbrd.getUser_ip());
	ps.setString(7, msgbrd.getUser_date());
	ps.execute();
	DBConnection.close(ps, conn);
	return true;
    }

    public Boolean updateAdminMssageBroad(MessageBoard msgbrd) throws Exception {
	Connection conn = null;
	PreparedStatement ps = null;
	conn = DBConfig.getConnection();
	ps = conn
		.prepareStatement("update message_board_tb set incorrupt_connect = ?,department_connect= ? where message_board_id =? and cost_expend_id= ?");
	
	ps.setString(1, msgbrd.getIncorrupt_connect());
	ps.setString(2, msgbrd.getDepartment_connect());
	ps.setInt(3, msgbrd.getMessage_board_id());
	ps.setInt(4, msgbrd.getCost_expend_id());
	ps.execute();
	DBConnection.close(ps, conn);
	return true;
    }

}

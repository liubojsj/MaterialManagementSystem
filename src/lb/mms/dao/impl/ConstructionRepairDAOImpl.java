package lb.mms.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import lb.mms.dao.ConstructionRepairDAO;
import lb.mms.entity.ConstructionRepair;
import lb.mms.util.DBConfig;

public class ConstructionRepairDAOImpl implements ConstructionRepairDAO {

    public ArrayList<ConstructionRepair> getConstructionRepairList(int start,
	    int limit, String keyWord) throws Exception {
	// 输出查询参数
	// System.out.println("起始页是:"+start);
	// System.out.println("本页查询数量是:"+limit);
	// System.out.println("查询关键字是:"+keyWord);
	// 定义查询对象
	Connection conn = null;
	ArrayList<ConstructionRepair> conrpelist = new ArrayList<ConstructionRepair>();
	PreparedStatement ps = null;
	ResultSet rs = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("select * from construction_repair_tb where construction_repair_name like '%"
			    + keyWord + "%' limit ?,?");
	    ps.setInt(1, start);
	    ps.setInt(2, limit);
	    // System.out.println("执行的SQL:"+ps);
	    rs = ps.executeQuery();
	    while (rs.next()) {
		ConstructionRepair conrep = new ConstructionRepair();
		conrep.setConstruction_repair_id(rs
			.getInt("Construction_repair_id"));
		conrep.setConstruction_repair_name(rs
			.getString("construction_repair_name"));
		conrep.setMoney_source(rs.getString("money_source"));
		conrep.setRepair_cause(rs.getString("repair_cause"));
		conrep.setRepair_model(rs.getString("repair_model"));
		conrep.setRepair_price(rs.getInt("repair_price"));
		conrep.setBuild_company(rs.getString("build_company"));
		conrep.setBuild_company_choose(rs
			.getString("build_company_choose"));
		conrep.setRepair_permit(rs.getString("repair_permit"));
		conrep.setComplete_date(rs.getString("complete_date"));
		conrep.setCheck_price(rs.getInt("check_price"));
		conrep
			.setEvaluation_message(rs
				.getString("evaluation_message"));
		conrep.setCooperation_partner(rs
			.getString("cooperation_partner"));
		conrpelist.add(conrep);
	    }
	} catch (Exception e) {
	    e.printStackTrace();
	} finally {
	    DBConfig.close(rs, ps, conn);
	}
	return conrpelist;
    }

    public int getRowCount(String keyWord) throws Exception {
	int count = 0;
	Connection conn = null;
	PreparedStatement ps = null;
	ResultSet rs = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("select count(*) AS RowsCount from construction_repair_tb where construction_repair_name like '%"
			    + keyWord + "%' ");
	    rs = ps.executeQuery();
	    while (rs.next()) {
		count = rs.getInt("RowsCount");
	    }
	} catch (Exception e) {
	    e.printStackTrace();
	}finally {
	    DBConfig.close(rs, ps, conn);
	}
	return count;
    }

    public Boolean insertConstructionRepair(ConstructionRepair cr)
	    throws Exception {
	Connection conn = null;
	PreparedStatement ps = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("INSERT INTO `construction_repair_tb` " +
		    		"(construction_repair_name,money_source,repair_cause," +
		    		"repair_model,repair_price,build_company,repair_permit," +
		    		"build_company_choose,complete_date,check_price,evaluation_message," +
		    		"cooperation_partner) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)");
	    ps.setString(1, cr.getConstruction_repair_name());
	    ps.setString(2, cr.getMoney_source()) ;
	    ps.setString(3, cr.getRepair_cause()) ;
	    ps.setString(4, cr.getRepair_model()) ;
	    ps.setInt(5, cr.getRepair_price()) ;
	    ps.setString(6,cr.getBuild_company()) ;
	    ps.setString(7, cr.getRepair_permit()) ;
	    ps.setString(8, cr.getBuild_company_choose()) ;
	    ps.setString(9, cr.getComplete_date()) ;
	    ps.setInt(10, cr.getCheck_price()) ;
	    ps.setString(11, cr.getEvaluation_message()) ;
	    ps.setString(12, cr.getCooperation_partner()) ;
	    ps.executeUpdate() ;
	} catch (Exception e) {
	    e.printStackTrace();
	    return false;
	}finally {
	    DBConfig.close(ps, conn);
	}
	return true;
    }

    public Boolean updateConstructionRepair(ConstructionRepair cr)
	    throws Exception {
	Connection conn = null;
	PreparedStatement ps = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("UPDATE `construction_repair_tb` SET  " +
		    		"construction_repair_name = ?,money_source = ?,repair_cause = ?," +
		    		"repair_model = ?,repair_price = ?,build_company = ?,repair_permit = ?," +
		    		"build_company_choose = ?,complete_date = ?,check_price = ?,evaluation_message = ?," +
		    		"cooperation_partner = ? WHERE construction_repair_id = ?");
	    ps.setString(1, cr.getConstruction_repair_name());
	    ps.setString(2, cr.getMoney_source()) ;
	    ps.setString(3, cr.getRepair_cause()) ;
	    ps.setString(4, cr.getRepair_model()) ;
	    ps.setInt(5, cr.getRepair_price()) ;
	    ps.setString(6,cr.getBuild_company()) ;
	    ps.setString(7, cr.getRepair_permit()) ;
	    ps.setString(8, cr.getBuild_company_choose()) ;
	    ps.setString(9, cr.getComplete_date()) ;
	    ps.setInt(10, cr.getCheck_price()) ;
	    ps.setString(11, cr.getEvaluation_message()) ;
	    ps.setString(12, cr.getCooperation_partner()) ;
	    ps.setInt(13, cr.getConstruction_repair_id()) ;
	    ps.executeUpdate() ;
	} catch (Exception e) {
	    e.printStackTrace() ;
	    return false;
	}finally {
	    DBConfig.close(ps, conn);
	}
	return true ;
    }

    public Boolean deleteConstructionRepairByID(int constructionRepairId)
	    throws Exception {
	Connection conn = null;
	PreparedStatement ps = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("DELETE FROM `construction_repair_tb` WHERE construction_repair_id = ?") ;
	    ps.setInt(1, constructionRepairId) ;
	    ps.executeUpdate() ;
	} catch (Exception e) {
	    e.printStackTrace() ;
	    return false ;
	}finally {
	    DBConfig.close(ps, conn);
	}
	return true ;
    }

}

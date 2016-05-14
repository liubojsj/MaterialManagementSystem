package lb.mms.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import lb.mms.dao.ProductDAO;
import lb.mms.entity.Product;
import lb.mms.util.DBConfig;

public class ProductDAOImpl implements ProductDAO {
    boolean flag = false;
    int rsCount = 0;

    public ArrayList<Product> getProductList(int start, int limit,
	    String keyWord,int departmentId) throws Exception {
	// 输出查询参数
	// System.out.println("起始页是:"+start);
	// System.out.println("本页查询数量是:"+limit);
	// System.out.println("查询关键字是:"+keyWord);
	// 定义查询对象
	Connection conn = null;
	ArrayList<Product> plist = new ArrayList<Product>();
	PreparedStatement ps = null;
	ResultSet rs = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("SELECT * FROM product_tb WHERE department_id = ? AND product_name LIKE '%"
			    + keyWord + "%' limit ?,?");
	    ps.setInt(1, departmentId);
	    ps.setInt(2, start);
	    ps.setInt(3, limit);
//	    System.out.println("执行的SQL:"+ps);
	    rs = ps.executeQuery();
	    while (rs.next()) {
		Product p = new Product();
		p.setProduct_id(rs.getInt("product_id"));
		p.setProduct_name(rs.getString("product_name"));
		p.setDepartment_id(rs.getInt("department_id"));
		p.setDepartment_name(rs.getString("department_name"));
		p.setControl_item_name(rs.getString("control_Item_name"));
		p.setControl_item_id(rs.getInt("control_item_id"));
		p.setSpecification(rs.getString("specification"));
		p.setManufacturer(rs.getString("manufacturer"));
		p.setUnit(rs.getString("unit"));
		p.setUse_restriction(rs.getString("use_restriction"));
		p.setProduct_img(rs.getString("product_img"));
		plist.add(p);
	    }
	} catch (Exception e) {
	    e.printStackTrace();
	} finally {
	    DBConfig.close(rs, ps, conn);
	}
	return plist;
    }

    public int getRowCount(String keyWord ,int departmentId) throws Exception {
	int count = 0;
	Connection conn = null;
	PreparedStatement ps = null;
	ResultSet rs = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("select count(*) AS RowsCount from product_tb WHERE department_id = ? AND product_name like '%"
			    + keyWord + "%' ");
	    ps.setInt(1, departmentId);
	    rs = ps.executeQuery();
	    while (rs.next()) {
		count = rs.getInt("RowsCount");
	    }
	} catch (Exception e) {
	    e.printStackTrace();
	} finally {
	    DBConfig.close(rs, ps, conn);
	}
	return count;
    }

    public Boolean insertProduct(Product p) throws Exception {
	Connection conn = null;
	PreparedStatement ps = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("INSERT INTO `product_tb` "
			    + "(control_item_id,control_item_name,department_id,department_name,product_name,specification,"
			    + "unit,use_restriction,manufacturer,product_img) VALUES (?,?,?,?,?,?,?,?,?,?)");
	    ps.setInt(1, p.getControl_item_id());
	    ps.setString(2, p.getControl_item_name());
	    ps.setInt(3, p.getDepartment_id());
	    ps.setString(4, p.getDepartment_name());
	    ps.setString(5, p.getProduct_name());
	    ps.setString(6, p.getSpecification());
	    ps.setString(7, p.getUnit());
	    ps.setString(8, p.getUse_restriction());
	    ps.setString(9, p.getManufacturer());
	    ps.setString(10, p.getProduct_img());
	    ps.executeUpdate();
	} catch (Exception e) {
	    e.printStackTrace();
	    return false;
	} finally {
	    DBConfig.close(ps, conn);
	}
	return true;
    }

    public Boolean updateProduct(Product p) throws Exception {
	Connection conn = null;
	PreparedStatement ps = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("UPDATE `product_tb` SET  control_item_id = ?,control_Item_name=?,department_id=?,department_name=?"
			    + ",product_name = ?,specification = ? ,unit = ?"
			    + ",use_restriction = ?,manufacturer = ?,product_img = ? WHERE product_id = ?");
	    ps.setInt(1, p.getControl_item_id());
	    ps.setString(2, p.getControl_item_name());
	    ps.setInt(3, p.getDepartment_id());
	    ps.setString(4, p.getDepartment_name());
	    ps.setString(5, p.getProduct_name());
	    ps.setString(6, p.getSpecification());
	    ps.setString(7, p.getUnit());
	    ps.setString(8, p.getUse_restriction());
	    ps.setString(9, p.getManufacturer());
	    ps.setString(10, p.getProduct_img());
	    ps.setInt(11, p.getProduct_id());
	    ps.executeUpdate();
	} catch (Exception e) {
	    e.printStackTrace();
	    return false;
	} finally {
	    DBConfig.close(ps, conn);
	}
	return true;
    }

    public Boolean deleteProductByID(int productID) throws Exception {
	Connection conn = null;
	PreparedStatement ps = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("DELETE FROM `product_tb` WHERE product_id = ?");
	    ps.setInt(1, productID);
	    ps.executeUpdate();
	} catch (Exception e) {
	    e.printStackTrace();
	    return false;
	} finally {
	    DBConfig.close(ps, conn);
	}
	return true;
    }

    public boolean insertImgByProductID(int productID, String imgName)
	    throws Exception {
	Connection conn = null;
	PreparedStatement ps = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("UPDATE `product_tb` SET  product_img = ? WHERE product_id = ?");
	    ps.setString(1, imgName);
	    ps.setInt(2, productID);
	    rsCount = ps.executeUpdate();
	} catch (Exception e) {
	    e.printStackTrace();
	    flag = false;
	} finally {
	    DBConfig.close(ps, conn);
	}
	if (rsCount > 0) {
	    flag = true;
	}
	return flag;
    }

    public List<Product> getProductListByDepartmentID(int start, int limit,
	    int departmentId) throws Exception {
	Connection conn = null;
	ArrayList<Product> plist = new ArrayList<Product>();
	PreparedStatement ps = null;
	ResultSet rs = null;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("SELECT * FROM product_tb WHERE department_id = ? limit ?,?");
	    ps.setInt(1, departmentId);
	    ps.setInt(2, start);
	    ps.setInt(3, limit);
	    // System.out.println("执行的SQL:"+ps);
	    rs = ps.executeQuery();
	    while (rs.next()) {
		Product p = new Product();
		p.setProduct_id(rs.getInt("product_id"));
		p.setProduct_name(rs.getString("product_name"));
		p.setDepartment_id(rs.getInt("department_id"));
		p.setDepartment_name(rs.getString("department_name"));
		p.setControl_item_name(rs.getString("control_Item_name"));
		p.setControl_item_id(rs.getInt("control_item_id"));
		p.setSpecification(rs.getString("specification"));
		p.setManufacturer(rs.getString("manufacturer"));
		p.setUnit(rs.getString("unit"));
		p.setUse_restriction(rs.getString("use_restriction"));
		p.setProduct_img(rs.getString("product_img"));
		plist.add(p);
	    }
	} catch (Exception e) {
	    e.printStackTrace();
	} finally {
	    DBConfig.close(rs, ps, conn);
	}
	return plist;
    }

    public Product getProductById(int productId) throws Exception {
	// 输出查询参数
	// System.out.println("起始页是:"+start);
	// System.out.println("本页查询数量是:"+limit);
	// System.out.println("查询关键字是:"+keyWord);
	// 定义查询对象
	Connection conn = null;
	PreparedStatement ps = null;
	ResultSet rs = null;
	Product p = null ;
	try {
	    conn = DBConfig.getConnection();
	    ps = conn
		    .prepareStatement("SELECT * FROM product_tb WHERE product_id = ?");
	    ps.setInt(1, productId);
	    // System.out.println("执行的SQL:"+ps);
	    rs = ps.executeQuery();
	    while (rs.next()) {
		p = new Product();
		p.setProduct_id(rs.getInt("product_id"));
		p.setProduct_name(rs.getString("product_name"));
		p.setDepartment_id(rs.getInt("department_id"));
		p.setDepartment_name(rs.getString("department_name"));
		p.setControl_item_name(rs.getString("control_Item_name"));
		p.setControl_item_id(rs.getInt("control_item_id"));
		p.setSpecification(rs.getString("specification"));
		p.setManufacturer(rs.getString("manufacturer"));
		p.setUnit(rs.getString("unit"));
		p.setUse_restriction(rs.getString("use_restriction"));
		p.setProduct_img(rs.getString("product_img"));
		
	    }
	} catch (Exception e) {
	    e.printStackTrace();
	} finally {
	    DBConfig.close(rs, ps, conn);
	}
	return p;
    }

}

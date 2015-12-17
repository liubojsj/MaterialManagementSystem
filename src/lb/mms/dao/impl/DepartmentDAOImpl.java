package lb.mms.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import lb.mms.dao.DepartmentDAO;
import lb.mms.entity.Department;
import lb.mms.util.DBConfig;

public class DepartmentDAOImpl implements DepartmentDAO
{

    public ArrayList<Department> findAll() throws Exception
    {
        ArrayList<Department> deptlist = new ArrayList<Department>();
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try
        {
            conn = DBConfig.getConnection();

            ps = conn.prepareStatement("select * from department_tb");

            rs = ps.executeQuery();

            while (rs.next())
            {
                Department dept = new Department(); // 一定要加,否则会发生空指针异常

                dept.setDepartment_id(rs.getInt("department_id"));
                dept.setDepartment_name(rs.getString("department_name"));
                dept.setRoot_department(rs.getBoolean("root_department"));
                dept.setLeaf_department(rs.getBoolean("root_department"));
                dept.setSuperior_department_id(rs
                        .getInt("superior_department_id"));
                dept.setDepartment_name_abbreviation(rs
                        .getString("department_name_abbreviation"));
                deptlist.add(dept);

            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            DBConfig.close(rs, ps, conn);
        }
        return deptlist;
    }


    public Department findDepartmentById(int departmentId) throws Exception
    {
        Department dept = null;
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        return null;
    }

}

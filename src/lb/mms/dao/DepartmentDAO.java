package lb.mms.dao ;

import java.util.List;

import lb.mms.entity.Department;

public interface DepartmentDAO
{
	public List < Department > findAll ( )throws Exception ;
	public Department findDepartmentById (int department_id )throws Exception ;
}

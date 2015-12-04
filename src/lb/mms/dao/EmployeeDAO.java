package lb.mms.dao ;

import java.util.List ;

import lb.mms.entity.Employee ;

/**
 * <ul>
 * <li>1、开发日期：2015-11-25 : 上午11:30:55</li>
 * <li>2、类型名称：EmployeeDAO</li>
 * <li>3、类型意图：工厂模式接口</li>
 * </ul>
 * 
 * @author 刘博
 */
public interface EmployeeDAO
{
	public List < Employee > findALL ( )
	                                    throws Exception ;

	public void insertEmp (
	                        Employee e )
	                                    throws Exception ;

	public void deleteEmpById (
	                            int id )
	                                    throws Exception ;

	public void updateEmp (
	                        Employee e )
	                                    throws Exception ;

	public Employee findEmpById (
	                              int id )
	                                      throws Exception ;
}

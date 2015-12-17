package lb.mms.entity;

public class Department {
    private int department_id;
    private String department_name;
    private Boolean root_department;
    private Boolean leaf_department;
    private int superior_department_id;
    private String department_name_abbreviation;

    public void setDepartment_id(int department_id) {
	this.department_id = department_id;
    }

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-8 : 下午02:49:18</li>
     * <li>3、方法含义：返回字段“department_id”的值</li>
     * </ul>
     * 
     * @return 返回字段“department_id”的值
     */
    public int getDepartment_id() {
	return department_id;
    }

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-8 : 下午02:48:43</li>
     * <li>3、方法含义：为字段“department_name”设置值</li>
     * </ul>
     * 
     * @param 参数
     *            “department_name”的值将赋给字段“department_name”
     */
    public void setDepartment_name(String department_name) {
	this.department_name = department_name;
    }

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-8 : 下午02:48:43</li>
     * <li>3、方法含义：返回字段“department_name”的值</li>
     * </ul>
     * 
     * @return 返回字段“department_name”的值
     */
    public String getDepartment_name() {
	return department_name;
    }

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-8 : 下午02:49:18</li>
     * <li>3、方法含义：为字段“department_id”设置值</li>
     * </ul>
     * 
     * @param 参数
     *            “department_id”的值将赋给字段“department_id”
     */

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-8 : 下午02:49:49</li>
     * <li>3、方法含义：为字段“root_department”设置值</li>
     * </ul>
     * 
     * @param 参数
     *            “root_department”的值将赋给字段“root_department”
     */
    public void setRoot_department(Boolean root_department) {
	this.root_department = root_department;
    }

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-8 : 下午02:49:49</li>
     * <li>3、方法含义：返回字段“root_department”的值</li>
     * </ul>
     * 
     * @return 返回字段“root_department”的值
     */
    public Boolean getRoot_department() {
	return root_department;
    }

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-8 : 下午02:51:01</li>
     * <li>3、方法含义：为字段“leaf_department”设置值</li>
     * </ul>
     * 
     * @param 参数
     *            “leaf_department”的值将赋给字段“leaf_department”
     */
    public void setLeaf_department(Boolean leaf_department) {
	this.leaf_department = leaf_department;
    }

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-8 : 下午02:51:01</li>
     * <li>3、方法含义：返回字段“leaf_department”的值</li>
     * </ul>
     * 
     * @return 返回字段“leaf_department”的值
     */
    public Boolean getLeaf_department() {
	return leaf_department;
    }

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-8 : 下午02:51:08</li>
     * <li>3、方法含义：为字段“superior_department_id”设置值</li>
     * </ul>
     * 
     * @param 参数
     *            “superior_department_id”的值将赋给字段“superior_department_id”
     */
    public void setSuperior_department_id(int superior_department_id) {
	this.superior_department_id = superior_department_id;
    }

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-8 : 下午02:51:08</li>
     * <li>3、方法含义：返回字段“superior_department_id”的值</li>
     * </ul>
     * 
     * @return 返回字段“superior_department_id”的值
     */
    public int getSuperior_department_id() {
	return superior_department_id;
    }

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-8 : 下午04:45:18</li>
     * <li>3、方法含义：为字段“department_name_abbreviation”设置值</li>
     * </ul>
     * 
     * @param 参数
     *            “department_name_abbreviation”的值将赋给字段“department_name_abbreviation
     *            ”
     */
    public void setDepartment_name_abbreviation(
	    String department_name_abbreviation) {
	this.department_name_abbreviation = department_name_abbreviation;
    }

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-8 : 下午04:45:18</li>
     * <li>3、方法含义：返回字段“department_name_abbreviation”的值</li>
     * </ul>
     * 
     * @return 返回字段“department_name_abbreviation”的值
     */
    public String getDepartment_name_abbreviation() {
	return department_name_abbreviation;
    }

}

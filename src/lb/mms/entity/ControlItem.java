package lb.mms.entity;

public class ControlItem {
    private int control_item_id;
    private String control_item_name;
    private int department_id;
    private String cont_feature;
    private int plan_cost ; 
    private int dynamic_expend;
    private int cutting_down_expenditures_sum ;
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-10 : 上午10:41:43</li>
     * <li>3、方法含义：为字段“control_item_id”设置值</li>
     * </ul>
     * @param 参数“control_item_id”的值将赋给字段“control_item_id”
     */
    public void setControl_item_id(int control_item_id) {
	this.control_item_id = control_item_id;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-10 : 上午10:41:43</li>
     * <li>3、方法含义：返回字段“control_item_id”的值</li>
     * </ul>
     * @return 返回字段“control_item_id”的值
     */
    public int getControl_item_id() {
	return control_item_id;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-10 : 上午10:41:47</li>
     * <li>3、方法含义：为字段“control_item_name”设置值</li>
     * </ul>
     * @param 参数“control_item_name”的值将赋给字段“control_item_name”
     */
    public void setControl_item_name(String control_item_name) {
	this.control_item_name = control_item_name;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-10 : 上午10:41:47</li>
     * <li>3、方法含义：返回字段“control_item_name”的值</li>
     * </ul>
     * @return 返回字段“control_item_name”的值
     */
    public String getControl_item_name() {
	return control_item_name;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-10 : 上午10:41:51</li>
     * <li>3、方法含义：为字段“department_id”设置值</li>
     * </ul>
     * @param 参数“department_id”的值将赋给字段“department_id”
     */
    public void setDepartment_id(int department_id) {
	this.department_id = department_id;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-10 : 上午10:41:51</li>
     * <li>3、方法含义：返回字段“department_id”的值</li>
     * </ul>
     * @return 返回字段“department_id”的值
     */
    public int getDepartment_id() {
	return department_id;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-10 : 上午10:41:56</li>
     * <li>3、方法含义：为字段“cont_feature”设置值</li>
     * </ul>
     * @param 参数“cont_feature”的值将赋给字段“cont_feature”
     */
    public void setCont_feature(String cont_feature) {
	this.cont_feature = cont_feature;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-10 : 上午10:41:56</li>
     * <li>3、方法含义：返回字段“cont_feature”的值</li>
     * </ul>
     * @return 返回字段“cont_feature”的值
     */
    public String getCont_feature() {
	return cont_feature;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-10 : 上午10:50:11</li>
     * <li>3、方法含义：为字段“plan_cost”设置值</li>
     * </ul>
     * @param 参数“plan_cost”的值将赋给字段“plan_cost”
     */
    public void setPlan_cost(int plan_cost) {
	this.plan_cost = plan_cost;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-10 : 上午10:50:11</li>
     * <li>3、方法含义：返回字段“plan_cost”的值</li>
     * </ul>
     * @return 返回字段“plan_cost”的值
     */
    public int getPlan_cost() {
	return plan_cost;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-10 : 上午10:42:00</li>
     * <li>3、方法含义：为字段“dynamic_expend”设置值</li>
     * </ul>
     * @param 参数“dynamic_expend”的值将赋给字段“dynamic_expend”
     */
    public void setDynamic_expend(int dynamic_expend) {
	this.dynamic_expend = dynamic_expend;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-10 : 上午10:42:00</li>
     * <li>3、方法含义：返回字段“dynamic_expend”的值</li>
     * </ul>
     * @return 返回字段“dynamic_expend”的值
     */
    public int getDynamic_expend() {
	return dynamic_expend;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-10 : 上午10:50:24</li>
     * <li>3、方法含义：为字段“cutting_down_expenditures_sum”设置值</li>
     * </ul>
     * @param 参数“cutting_down_expenditures_sum”的值将赋给字段“cutting_down_expenditures_sum”
     */
    public void setCutting_down_expenditures_sum(
	    int cutting_down_expenditures_sum) {
	this.cutting_down_expenditures_sum = cutting_down_expenditures_sum;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-10 : 上午10:50:24</li>
     * <li>3、方法含义：返回字段“cutting_down_expenditures_sum”的值</li>
     * </ul>
     * @return 返回字段“cutting_down_expenditures_sum”的值
     */
    public int getCutting_down_expenditures_sum() {
	return cutting_down_expenditures_sum;
    }

}

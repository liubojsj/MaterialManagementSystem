package lb.mms.entity;


public class CostExpend {
    private int cost_expend_id ;
    private String cost_expend_name;
    private int department_id;
    private String department_name ;
    private String specification ;
    private int price ;
    private int count ;
    private int sum ;
    private String providerd ;
    private String providerd_choose ;
    private String check_date ;
    private String details ;
    private String  evaluation_message ;
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:08:47</li>
     * <li>3、方法含义：为字段“cost_expend_id”设置值</li>
     * </ul>
     * @param 参数“cost_expend_id”的值将赋给字段“cost_expend_id”
     */
    public void setCost_expend_id(int cost_expend_id) {
	this.cost_expend_id = cost_expend_id;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:08:47</li>
     * <li>3、方法含义：返回字段“cost_expend_id”的值</li>
     * </ul>
     * @return 返回字段“cost_expend_id”的值
     */
    public int getCost_expend_id() {
	return cost_expend_id;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:08:51</li>
     * <li>3、方法含义：为字段“cost_expend_name”设置值</li>
     * </ul>
     * @param 参数“cost_expend_name”的值将赋给字段“cost_expend_name”
     */
    public void setCost_expend_name(String cost_expend_name) {
	this.cost_expend_name = cost_expend_name;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:08:51</li>
     * <li>3、方法含义：返回字段“cost_expend_name”的值</li>
     * </ul>
     * @return 返回字段“cost_expend_name”的值
     */
    public String getCost_expend_name() {
	return cost_expend_name;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 下午03:05:49</li>
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
     * <li>2、编写日期：2015-12-22 : 下午03:05:49</li>
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
     * <li>2、编写日期：2015-12-22 : 下午03:05:59</li>
     * <li>3、方法含义：为字段“department_name”设置值</li>
     * </ul>
     * @param 参数“department_name”的值将赋给字段“department_name”
     */
    public void setDepartment_name(String department_name) {
	this.department_name = department_name;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 下午03:05:59</li>
     * <li>3、方法含义：返回字段“department_name”的值</li>
     * </ul>
     * @return 返回字段“department_name”的值
     */
    public String getDepartment_name() {
	return department_name;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:08:55</li>
     * <li>3、方法含义：为字段“specification”设置值</li>
     * </ul>
     * @param 参数“specification”的值将赋给字段“specification”
     */
    public void setSpecification(String specification) {
	this.specification = specification;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:08:55</li>
     * <li>3、方法含义：返回字段“specification”的值</li>
     * </ul>
     * @return 返回字段“specification”的值
     */
    public String getSpecification() {
	return specification;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:08:58</li>
     * <li>3、方法含义：为字段“price”设置值</li>
     * </ul>
     * @param 参数“price”的值将赋给字段“price”
     */
    public void setPrice(int price) {
	this.price = price;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:08:58</li>
     * <li>3、方法含义：返回字段“price”的值</li>
     * </ul>
     * @return 返回字段“price”的值
     */
    public int getPrice() {
	return price;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:09:02</li>
     * <li>3、方法含义：为字段“count”设置值</li>
     * </ul>
     * @param 参数“count”的值将赋给字段“count”
     */
    public void setCount(int count) {
	this.count = count;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:09:02</li>
     * <li>3、方法含义：返回字段“count”的值</li>
     * </ul>
     * @return 返回字段“count”的值
     */
    public int getCount() {
	return count;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:09:12</li>
     * <li>3、方法含义：为字段“sum”设置值</li>
     * </ul>
     * @param 参数“sum”的值将赋给字段“sum”
     */
    public void setSum(int sum) {
	this.sum = sum;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:09:12</li>
     * <li>3、方法含义：返回字段“sum”的值</li>
     * </ul>
     * @return 返回字段“sum”的值
     */
    public int getSum() {
	return sum;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:09:22</li>
     * <li>3、方法含义：为字段“providerd”设置值</li>
     * </ul>
     * @param 参数“providerd”的值将赋给字段“providerd”
     */
    public void setProviderd(String providerd) {
	this.providerd = providerd;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:09:22</li>
     * <li>3、方法含义：返回字段“providerd”的值</li>
     * </ul>
     * @return 返回字段“providerd”的值
     */
    public String getProviderd() {
	return providerd;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:09:33</li>
     * <li>3、方法含义：为字段“providerd_choose”设置值</li>
     * </ul>
     * @param 参数“providerd_choose”的值将赋给字段“providerd_choose”
     */
    public void setProviderd_choose(String providerd_choose) {
	this.providerd_choose = providerd_choose;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:09:33</li>
     * <li>3、方法含义：返回字段“providerd_choose”的值</li>
     * </ul>
     * @return 返回字段“providerd_choose”的值
     */
    public String getProviderd_choose() {
	return providerd_choose;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:09:37</li>
     * <li>3、方法含义：为字段“check_date”设置值</li>
     * </ul>
     * @param 参数“check_date”的值将赋给字段“check_date”
     */
    public void setCheck_date(String check_date) {
	this.check_date = check_date;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 上午11:09:37</li>
     * <li>3、方法含义：返回字段“check_date”的值</li>
     * </ul>
     * @return 返回字段“check_date”的值
     */
    public String getCheck_date() {
	return check_date;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 下午04:12:19</li>
     * <li>3、方法含义：为字段“details”设置值</li>
     * </ul>
     * @param 参数“details”的值将赋给字段“details”
     */
    public void setDetails(String details) {
	this.details = details;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-22 : 下午04:12:19</li>
     * <li>3、方法含义：返回字段“details”的值</li>
     * </ul>
     * @return 返回字段“details”的值
     */
    public String getDetails() {
	return details;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 上午10:22:29</li>
     * <li>3、方法含义：为字段“evaluation_message”设置值</li>
     * </ul>
     * @param 参数“evaluation_message”的值将赋给字段“evaluation_message”
     */
    public void setEvaluation_message(String evaluation_message) {
	this.evaluation_message = evaluation_message;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 上午10:22:29</li>
     * <li>3、方法含义：返回字段“evaluation_message”的值</li>
     * </ul>
     * @return 返回字段“evaluation_message”的值
     */
    public String getEvaluation_message() {
	return evaluation_message;
    }


}

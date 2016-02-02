package lb.mms.entity;


public class MessageBoard {
    
    private int message_board_id ;
    private int cost_expend_id ;
    private int construction_repair_id ;
    private String user_connect ;
    private String provider_connect ;
    private String incorrupt_connect ;
    private String department_connect ;
    private String user_ip ;
    private String user_date ;
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:03:24</li>
     * <li>3、方法含义：为字段“message_board_id”设置值</li>
     * </ul>
     * @param 参数“message_board_id”的值将赋给字段“message_board_id”
     */
    public void setMessage_board_id(int message_board_id) {
	this.message_board_id = message_board_id;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:03:24</li>
     * <li>3、方法含义：返回字段“message_board_id”的值</li>
     * </ul>
     * @return 返回字段“message_board_id”的值
     */
    public int getMessage_board_id() {
	return message_board_id;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:03:28</li>
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
     * <li>2、编写日期：2015-12-23 : 下午05:03:28</li>
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
     * <li>2、编写日期：2016-1-10 : 下午11:16:09</li>
     * <li>3、方法含义：为字段“construction_repair_id”设置值</li>
     * </ul>
     * @param 参数“construction_repair_id”的值将赋给字段“construction_repair_id”
     */
    public void setConstruction_repair_id(int construction_repair_id) {
	this.construction_repair_id = construction_repair_id;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-10 : 下午11:16:09</li>
     * <li>3、方法含义：返回字段“construction_repair_id”的值</li>
     * </ul>
     * @return 返回字段“construction_repair_id”的值
     */
    public int getConstruction_repair_id() {
	return construction_repair_id;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:03:31</li>
     * <li>3、方法含义：为字段“user_connect”设置值</li>
     * </ul>
     * @param 参数“user_connect”的值将赋给字段“user_connect”
     */
    public void setUser_connect(String user_connect) {
	this.user_connect = user_connect;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:03:31</li>
     * <li>3、方法含义：返回字段“user_connect”的值</li>
     * </ul>
     * @return 返回字段“user_connect”的值
     */
    public String getUser_connect() {
	return user_connect;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:03:35</li>
     * <li>3、方法含义：为字段“provider_connect”设置值</li>
     * </ul>
     * @param 参数“provider_connect”的值将赋给字段“provider_connect”
     */
    public void setProvider_connect(String provider_connect) {
	this.provider_connect = provider_connect;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:03:35</li>
     * <li>3、方法含义：返回字段“provider_connect”的值</li>
     * </ul>
     * @return 返回字段“provider_connect”的值
     */
    public String getProvider_connect() {
	return provider_connect;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:03:39</li>
     * <li>3、方法含义：为字段“incorrupt_connect”设置值</li>
     * </ul>
     * @param 参数“incorrupt_connect”的值将赋给字段“incorrupt_connect”
     */
    public void setIncorrupt_connect(String incorrupt_connect) {
	this.incorrupt_connect = incorrupt_connect;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:03:39</li>
     * <li>3、方法含义：返回字段“incorrupt_connect”的值</li>
     * </ul>
     * @return 返回字段“incorrupt_connect”的值
     */
    public String getIncorrupt_connect() {
	return incorrupt_connect;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:03:42</li>
     * <li>3、方法含义：为字段“department_connect”设置值</li>
     * </ul>
     * @param 参数“department_connect”的值将赋给字段“department_connect”
     */
    public void setDepartment_connect(String department_connect) {
	this.department_connect = department_connect;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:03:42</li>
     * <li>3、方法含义：返回字段“department_connect”的值</li>
     * </ul>
     * @return 返回字段“department_connect”的值
     */
    public String getDepartment_connect() {
	return department_connect;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:03:46</li>
     * <li>3、方法含义：为字段“user_ip”设置值</li>
     * </ul>
     * @param 参数“user_ip”的值将赋给字段“user_ip”
     */
    public void setUser_ip(String user_ip) {
	this.user_ip = user_ip;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:03:46</li>
     * <li>3、方法含义：返回字段“user_ip”的值</li>
     * </ul>
     * @return 返回字段“user_ip”的值
     */
    public String getUser_ip() {
	return user_ip;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:15:31</li>
     * <li>3、方法含义：为字段“user_date”设置值</li>
     * </ul>
     * @param 参数“user_date”的值将赋给字段“user_date”
     */
    public void setUser_date(String user_date) {
	this.user_date = user_date;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-12-23 : 下午05:15:31</li>
     * <li>3、方法含义：返回字段“user_date”的值</li>
     * </ul>
     * @return 返回字段“user_date”的值
     */
    public String getUser_date() {
	return user_date;
    }


}

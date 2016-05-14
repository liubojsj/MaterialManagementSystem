package lb.mms.entity;


public class MessageBoard {
    
    private int message_board_id ;
    private int cost_expend_id ;
    private int construction_repair_id ;
    private String user_leave_message ;
    private String user_message_content ;
    private String company_name ;
    private String company_connect ;
    private String investigate_reply ;
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
     * <li>2、编写日期：2016-2-24 : 下午06:25:01</li>
     * <li>3、方法含义：为字段“user_leave_message”设置值</li>
     * </ul>
     * @param 参数“user_leave_message”的值将赋给字段“user_leave_message”
     */
    public void setUser_leave_message(String user_leave_message) {
	this.user_leave_message = user_leave_message;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-2-24 : 下午06:25:01</li>
     * <li>3、方法含义：返回字段“user_leave_message”的值</li>
     * </ul>
     * @return 返回字段“user_leave_message”的值
     */
    public String getUser_leave_message() {
	return user_leave_message;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-2-24 : 下午06:25:21</li>
     * <li>3、方法含义：为字段“user_message_content”设置值</li>
     * </ul>
     * @param 参数“user_message_content”的值将赋给字段“user_message_content”
     */
    public void setUser_message_content(String user_message_content) {
	this.user_message_content = user_message_content;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-2-24 : 下午06:25:21</li>
     * <li>3、方法含义：返回字段“user_message_content”的值</li>
     * </ul>
     * @return 返回字段“user_message_content”的值
     */
    public String getUser_message_content() {
	return user_message_content;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-2-24 : 下午06:25:11</li>
     * <li>3、方法含义：为字段“company_name”设置值</li>
     * </ul>
     * @param 参数“company_name”的值将赋给字段“company_name”
     */
    public void setCompany_name(String company_name) {
	this.company_name = company_name;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-2-24 : 下午06:25:11</li>
     * <li>3、方法含义：返回字段“company_name”的值</li>
     * </ul>
     * @return 返回字段“company_name”的值
     */
    public String getCompany_name() {
	return company_name;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-2-24 : 下午06:25:28</li>
     * <li>3、方法含义：为字段“company_connect”设置值</li>
     * </ul>
     * @param 参数“company_connect”的值将赋给字段“company_connect”
     */
    public void setCompany_connect(String company_connect) {
	this.company_connect = company_connect;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-2-24 : 下午06:25:28</li>
     * <li>3、方法含义：返回字段“company_connect”的值</li>
     * </ul>
     * @return 返回字段“company_connect”的值
     */
    public String getCompany_connect() {
	return company_connect;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-2-24 : 下午07:51:18</li>
     * <li>3、方法含义：为字段“investigate_reply”设置值</li>
     * </ul>
     * @param 参数“investigate_reply”的值将赋给字段“investigate_reply”
     */
    public void setInvestigate_reply(String investigate_reply) {
	this.investigate_reply = investigate_reply;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-2-24 : 下午07:51:18</li>
     * <li>3、方法含义：返回字段“investigate_reply”的值</li>
     * </ul>
     * @return 返回字段“investigate_reply”的值
     */
    public String getInvestigate_reply() {
	return investigate_reply;
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

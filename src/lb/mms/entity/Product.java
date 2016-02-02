package lb.mms.entity;

public class Product {
    private int product_id ;
    private int control_item_id ;
    private String product_name ;
    private String unit ;
    private String specification ;
    private String manufacturer ;
    private String use_restriction ;
    private String product_img ;
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-18 : 下午04:03:24</li>
     * <li>3、方法含义：为字段“product_id”设置值</li>
     * </ul>
     * @param 参数“product_id”的值将赋给字段“product_id”
     */
    public void setProduct_id(int product_id) {
	this.product_id = product_id;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-18 : 下午04:03:24</li>
     * <li>3、方法含义：返回字段“product_id”的值</li>
     * </ul>
     * @return 返回字段“product_id”的值
     */
    public int getProduct_id() {
	return product_id;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-18 : 下午04:03:28</li>
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
     * <li>2、编写日期：2016-1-18 : 下午04:03:28</li>
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
     * <li>2、编写日期：2016-1-18 : 下午04:03:31</li>
     * <li>3、方法含义：为字段“product_name”设置值</li>
     * </ul>
     * @param 参数“product_name”的值将赋给字段“product_name”
     */
    public void setProduct_name(String product_name) {
	this.product_name = product_name;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-18 : 下午04:03:31</li>
     * <li>3、方法含义：返回字段“product_name”的值</li>
     * </ul>
     * @return 返回字段“product_name”的值
     */
    public String getProduct_name() {
	return product_name;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-18 : 下午04:05:21</li>
     * <li>3、方法含义：为字段“unit”设置值</li>
     * </ul>
     * @param 参数“unit”的值将赋给字段“unit”
     */
    public void setUnit(String unit) {
	this.unit = unit;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-18 : 下午04:05:21</li>
     * <li>3、方法含义：返回字段“unit”的值</li>
     * </ul>
     * @return 返回字段“unit”的值
     */
    public String getUnit() {
	return unit;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-18 : 下午04:03:35</li>
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
     * <li>2、编写日期：2016-1-18 : 下午04:03:35</li>
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
     * <li>2、编写日期：2016-1-18 : 下午04:03:40</li>
     * <li>3、方法含义：为字段“manufacturer”设置值</li>
     * </ul>
     * @param 参数“manufacturer”的值将赋给字段“manufacturer”
     */
    public void setManufacturer(String manufacturer) {
	this.manufacturer = manufacturer;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-18 : 下午04:03:40</li>
     * <li>3、方法含义：返回字段“manufacturer”的值</li>
     * </ul>
     * @return 返回字段“manufacturer”的值
     */
    public String getManufacturer() {
	return manufacturer;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-18 : 下午04:03:43</li>
     * <li>3、方法含义：为字段“use_restriction”设置值</li>
     * </ul>
     * @param 参数“use_restriction”的值将赋给字段“use_restriction”
     */
    public void setUse_restriction(String use_restriction) {
	this.use_restriction = use_restriction;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-18 : 下午04:03:43</li>
     * <li>3、方法含义：返回字段“use_restriction”的值</li>
     * </ul>
     * @return 返回字段“use_restriction”的值
     */
    public String getUse_restriction() {
	return use_restriction;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-18 : 下午04:03:47</li>
     * <li>3、方法含义：为字段“product_img”设置值</li>
     * </ul>
     * @param 参数“product_img”的值将赋给字段“product_img”
     */
    public void setProduct_img(String product_img) {
	this.product_img = product_img;
    }
    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-18 : 下午04:03:47</li>
     * <li>3、方法含义：返回字段“product_img”的值</li>
     * </ul>
     * @return 返回字段“product_img”的值
     */
    public String getProduct_img() {
	return product_img;
    }

}

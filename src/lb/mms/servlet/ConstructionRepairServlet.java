package lb.mms.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lb.mms.dao.ConstructionRepairDAO;
import lb.mms.entity.ConstructionRepair;
import lb.mms.util.Factory;
import net.sf.json.JSONObject;

public class ConstructionRepairServlet extends HttpServlet {

    /**
     * 
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-8 : 上午10:35:03</li>
     * <li>3、方法含义：以GET方式处理construction_repair.js脚本传入参数</li>
     * <li>4、方法说明：调用doPost方法处理相关业务</li>
     * </ul>
     * @see javax.servlet.http.HttpServlet#doGet(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {

	this.doPost(request, response);
    }
    /**
     * 
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-1-8 : 上午10:31:44</li>
     * <li>3、方法含义：以POST方式处理construction_repair.js脚本传入参数</li>
     * <li>4、方法说明：包含数据列表,数据CRUD操作</li>
     * </ul>
     * @see javax.servlet.http.HttpServlet#doPost(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
	throws ServletException, IOException {
	// 设置响应字符集,以输出中文到浏览器正常显示
	response.setContentType("text/html;charset=utf-8");
	// 设置响应内容编码
	response.setCharacterEncoding("UTF-8");
	// 获取response对象
	PrintWriter out = response.getWriter();
	// 设置请求字符集,以便从请求读取中文
	request.setCharacterEncoding("utf-8");
	// 获取请求路径
	// String uri = request.getRequestURI();
	// 获取请求行为
	String action = request.getParameter("action");
	// 获取模糊查询关键字
	String searchText = request.getParameter("searchText");
	// 设置标志位
	Boolean flag = false;
	// 获取分页起始页与每页条目数
	int start = new Integer(request.getParameter("start") != null ? request
		.getParameter("start") : "0");
	int limit = new Integer(request.getParameter("limit") != null ? request
		.getParameter("limit") : "0");
	// 获取记录的ID值
	int constructionRepairId = new Integer(
		request.getParameter("construction_repair_id") != null
			&& !request.getParameter("construction_repair_id")
				.equals("") ? request
			.getParameter("construction_repair_id") : "0");
	// 获取总记录数
	int count = 0;
	// 准备页面JSON
	Map<String, Object> map = new HashMap<String, Object>();
	List<ConstructionRepair> conlist = null;
	JSONObject jsonObject = null;
	String formJson = request.getParameter("formJson");
	ConstructionRepair conrep = null;
	// 页面操作逻辑判断
	if ("list".equals(action)) {
	    ConstructionRepairDAO dao = (ConstructionRepairDAO) Factory
		    .getInstance("ConstructionRepairDAO");
	    try {
		// 获取查询数据列表
		conlist = dao.getConstructionRepairList(start, limit,
			searchText);
		count = dao.getRowCount(searchText);
		// 获取总记录条目数
		// System.out.println("######################"+"\n"+"获得查询结果数据条数为:"+conlist.size()+"\n"+"######################")
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	    map.put("count", count);
	    map.put("list", conlist);
	    jsonObject = JSONObject.fromObject(map);
	    out.print(jsonObject);
	    out.flush();
	    out.close();

	} else if ("add".equals(action)) {
	    jsonObject = JSONObject.fromObject(formJson);
	    conrep = (ConstructionRepair) JSONObject.toBean(jsonObject,
		    ConstructionRepair.class);
	    // System.out.println("获得的JSON字符串为:\n"+jsonObject) ;
	    try {
		ConstructionRepairDAO dao = (ConstructionRepairDAO) Factory
			.getInstance("ConstructionRepairDAO");
		flag = dao.insertConstructionRepair(conrep);
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	    if (flag) {
		out.print("{success:true,msg:'提交成功'}");
	    } else {
		out.print("{success:false,msg:'提交失败'}");
	    }
	    out.flush();
	    out.close();
	} else if ("update".equals(action)) {
	    jsonObject = JSONObject.fromObject(formJson);
	    conrep = (ConstructionRepair) JSONObject.toBean(jsonObject,
		    ConstructionRepair.class);
	    // System.out.println("获得的JSON字符串为:\n"+jsonObject) ;
	    try {
		ConstructionRepairDAO dao = (ConstructionRepairDAO) Factory
			.getInstance("ConstructionRepairDAO");
		flag = dao.updateConstructionRepair(conrep);
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	    if (flag) {
		out.print("{success:true,msg:'提交成功'}");
	    } else {
		out.print("{success:false,msg:'提交失败'}");
	    }
	    out.flush();
	    out.close();
	} else if ("delete".equals(action)) {

	    try {
		ConstructionRepairDAO dao = (ConstructionRepairDAO) Factory
			.getInstance("ConstructionRepairDAO");
		flag = dao.deleteConstructionRepairByID(constructionRepairId);
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	    if (flag) {
		out.print("{success:true,msg:'提交成功'}");
	    } else {
		out.print("{success:false,msg:'提交失败'}");
	    }
	    out.flush();
	    out.close();
	}
	
    }
    
}

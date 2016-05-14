package lb.mms.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lb.mms.dao.ControlItemDAO;
import lb.mms.dao.CostExpendDAO;
import lb.mms.entity.CostExpend;
import lb.mms.util.Factory;
import net.sf.json.JSONObject;

public class CostExpendServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {
	this.doPost(request, response);
    }

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
	// 获取请求行为
	String action = request.getParameter("action");
	// 获取模糊查询关键字
	String searchText = request.getParameter("searchText");
	// 设置标志位
	Boolean flag = false;
	// 获取分页起始页与每页条目数
	int start = new Integer(request.getParameter("start") != null ? request
		.getParameter("start") : "-1");
	int limit = new Integer(request.getParameter("limit") != null ? request
		.getParameter("limit") : "-1");
	int department_id = new Integer(
		request.getParameter("department_id") != null ? request
			.getParameter("department_id") : "-1");
	int cost_expend_id = new Integer(
		request.getParameter("cost_expend_id") != null
			&& !request.getParameter("cost_expend_id").equals("") ? request
			.getParameter("cost_expend_id")
			: "-1");
	// 获取总记录数
	int count = 0;
	// 准备页面JSON
	Map<String, Object> map = new HashMap<String, Object>();
	List<CostExpend> celist = null;
	JSONObject jsonObject = null;
	CostExpend ce = null;
	String formJson = request.getParameter("formJson");
	// 页面操作逻辑判断
	if ("list".equals(action)) {
	    CostExpendDAO dao = (CostExpendDAO) Factory
		    .getInstance("CostExpendDAO");
	    try {
		celist = dao.findAllByID(department_id, start, limit);
		count = dao.getCountByDepartmentID(department_id);
	    } catch (Exception e) {
		flag = false;
		e.printStackTrace();
	    }
	    map.put("accountCount", count);
	    map.put("accountList", celist);
	    jsonObject = JSONObject.fromObject(map);
	    out.print(jsonObject);
	    out.flush();
	    out.close();
	} else if ("add".equals(action)) {
	    jsonObject = JSONObject.fromObject(formJson);
	    ce = (CostExpend) JSONObject.toBean(jsonObject, CostExpend.class);
	    CostExpendDAO dao = (CostExpendDAO) Factory
		    .getInstance("CostExpendDAO");
	    ControlItemDAO conDao = (ControlItemDAO)Factory.getInstance("ControlItemDAO") ;
	    
	    try {
		flag = dao.insertCostExpend(ce);
		
		Map<Integer, Integer> m = dao.getGroundByControlItemID() ;
		for (Map.Entry<Integer, Integer> entry : m.entrySet()) {  
			  
		    //System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());  
			conDao.updateControlItemSum(entry.getKey(),entry.getValue());
		  
		} 
	    } catch (Exception e) {
		flag = false;
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
	    CostExpendDAO dao = (CostExpendDAO) Factory
		    .getInstance("CostExpendDAO");
	    try {
		flag = dao.deleteCostExpend(cost_expend_id);
	    } catch (Exception e) {
		flag = false;
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
	    ce = (CostExpend) JSONObject.toBean(jsonObject, CostExpend.class);
	    CostExpendDAO dao = (CostExpendDAO) Factory
		    .getInstance("CostExpendDAO");

	    try {
		flag = dao.updateCostExpend(ce);
	    } catch (Exception e) {
		flag = false;
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

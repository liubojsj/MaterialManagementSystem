package lb.mms.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lb.mms.dao.ControlItemDAO;
import lb.mms.dao.impl.ControlItemDAOImpl;
import lb.mms.entity.ControlItem;
import lb.mms.util.Factory;
import net.sf.json.JSONObject;

public class ControlItemServlet extends HttpServlet {

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
	String count_quantity = request.getParameter("count_quantity") != null ? request
		.getParameter("count_quantity")+"," : "";
	String amount_fixation = request.getParameter("amount_fixation") != null ? request
		.getParameter("amount_fixation")+",": "";
	String expend_law = request.getParameter("expend_law") != null ? request
		.getParameter("expend_law"): "";
	// 获取总记录数
	int count = 0;
	// 准备页面JSON
	Map<String, Object> map = new HashMap<String, Object>();
	List<ControlItem> cilist = null;
	JSONObject jsonObject = null;
	ControlItem ci = null;
	String formJson = request.getParameter("formJson");
	// 页面操作逻辑判断
	if ("list".equals(action)) {
	    ControlItemDAO dao = (ControlItemDAO) Factory
		    .getInstance("ControlItemDAO");
	    try {
		count = dao.getCountByDepartmentID(department_id);
		cilist = (ArrayList<ControlItem>) dao.findAllByID(
			department_id, start, limit);
	    } catch (Exception e) {
		flag = false;
		e.printStackTrace();
	    }
	    map.put("accountCount", count);
	    map.put("accountList", cilist);
	    jsonObject = JSONObject.fromObject(map);
	    out.print(jsonObject);
	    out.flush();
	    out.close();
	} else if ("add".equals(action)) {
	    jsonObject = JSONObject.fromObject(formJson);
	    ci = (ControlItem) JSONObject.toBean(jsonObject, ControlItem.class);

	    ControlItemDAO dao = (ControlItemDAO) Factory
		    .getInstance("ControlItemDAO");
	    ci.setCont_feature(count_quantity+amount_fixation+expend_law);
	    try {
		flag = dao.insertControlItem(ci);
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
	    ControlItemDAOImpl conlIte = new ControlItemDAOImpl();
	    int control_item_id = new Integer(request.getParameter(
		    "control_item_id").toString());
	    System.out.println(control_item_id);
	    try {
		flag = conlIte.deleteControlItem(control_item_id);
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
	    ci = (ControlItem) JSONObject.toBean(jsonObject, ControlItem.class);
	    ControlItemDAO dao = (ControlItemDAO) Factory
		    .getInstance("ControlItemDAO");
	    ci.setCont_feature(count_quantity+amount_fixation+expend_law);
	    try {
		flag = dao.updateControlItem(ci);
	    } catch (Exception e) {
		flag = false;
		e.printStackTrace();
	    }
	    if (flag) {
		out.print("{success:true,msg:'提交成功'}");
	    } else {
		out.print("{success:false,msg:'提交失败'}");
	    }

	}
    }

}

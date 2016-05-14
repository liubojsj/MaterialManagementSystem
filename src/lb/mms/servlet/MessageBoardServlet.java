package lb.mms.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lb.mms.dao.MessageBoardDAO;
import lb.mms.entity.MessageBoard;
import lb.mms.util.Factory;
import net.sf.json.JSONObject;

public class MessageBoardServlet extends HttpServlet {


    public void doGet(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {
	this.doPost(request, response) ;
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
	boolean flag = false;
	int start = new Integer(request.getParameter("start") != null ? request
		.getParameter("start") : "-1");
	int limit = new Integer(request.getParameter("limit") != null ? request
		.getParameter("limit") : "-1");
	int cost_expen_id = new Integer(request.getParameter("cost_expen_id") != null ? request
		.getParameter("cost_expen_id") : "-1");
	int construction_repair_id = new Integer(request.getParameter("construction_repair_id") != null ? request
		.getParameter("construction_repair_id") : "-1");
	// 获取总记录数
	int count = 0;
	// 准备页面JSON
	Map<String, Object> map = new HashMap<String, Object>();
	List<MessageBoard> msglist = null;
	JSONObject jsonObject = null;
	MessageBoard msg = null ;
	String formJson = request.getParameter("formJson");
	// 页面操作逻辑判断
	if ("list".equals(action)) {
	    System.out.println(cost_expen_id) ;
	    MessageBoardDAO dao = (MessageBoardDAO)Factory.getInstance("MessageBoardDAO") ;
	    try {
		// 获取查询数据列表
		if (cost_expen_id==-1) {
		    msglist = dao.findAllByID(2, construction_repair_id, start, limit) ;
		}else {
		    msglist = dao.findAllByID(1, cost_expen_id, start, limit) ;
		}
		
		
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	    map.put("count", count);
	    map.put("list", msglist);
	    jsonObject = JSONObject.fromObject(map);
	    out.print(jsonObject);
	    out.flush();
	    out.close();
	} else if ("add".equals(action)) {
	    jsonObject = JSONObject.fromObject(formJson);
	    msg = (MessageBoard) JSONObject.toBean(jsonObject,
		    MessageBoard.class);
	    MessageBoardDAO dao = (MessageBoardDAO)Factory.getInstance("MessageBoardDAO") ;
	    SimpleDateFormat dateformat = new SimpleDateFormat(
		    "yyyy年MM月dd日 HH时mm分ss秒  ");
//	   System.out.println(msg.getCost_expend_id()) ;
//	    String user_connect = request.getParameter("price_hight") + "\n"
//		    + request.getParameter("specification_no_application")
//		    + "\n" + request.getParameter("quality_bad") + "\n"
//		    + request.getParameter("supplier_doubt");
//	    String provider_connect = request
//		    .getParameter("choose_supplier");
//	    String incorrupt_connect = "";
//	    String department_connect = "";
	    String user_ip = request.getRemoteAddr();
	    String user_date = dateformat.format(new Date());
	    msg.setUser_ip(user_ip) ;
	    msg.setUser_date(user_date) ;
	    try {
		flag = dao.insertMssageBroad(msg);
	    } catch (Exception e) {
		e.printStackTrace() ;
	    }
	    if (flag) {
		out.print("{success:true,msg:'提交成功'}");
	    } else {
		out.print("{success:false,msg:'提交失败'}");
	    }
	    out.flush();
	    out.close();
	} else if ("del".equals(action)) {
	    
	    
	} else if (action.equals("updateDepartmentMessage")) {
	    jsonObject = JSONObject.fromObject(formJson);
	    msg = (MessageBoard) JSONObject.toBean(jsonObject,
		    MessageBoard.class);
	    MessageBoardDAO dao = (MessageBoardDAO)Factory.getInstance("MessageBoardDAO") ;
	    System.out.println(msg.getInvestigate_reply()) ;
	    try {
		flag = dao.updateAdminMssageBroad(msg);
	    } catch (Exception e) {
		e.printStackTrace() ;
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

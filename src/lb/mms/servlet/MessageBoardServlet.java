package lb.mms.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lb.mms.dao.impl.ControlItemImpl;
import lb.mms.dao.impl.MessageBoardDAOImpl;
import lb.mms.entity.MessageBoard;
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
	// 获取请求路径
	// String uri = request.getRequestURI();
	// 获取请求行为
	String action = request.getParameter("action");
	// 获取模糊查询关键字
	String searchText = request.getParameter("searchText");
	// 获取查询ID
	String costExpenID = request.getParameter("costExpenID");
	// 设置标志位
	boolean flag = false;
	Map<String, Object> map = new HashMap<String, Object>();
	if (action.equals("list")) {
	    int start = Integer.parseInt(request.getParameter("start"));
	    int limit = Integer.parseInt(request.getParameter("limit"));
	    MessageBoardDAOImpl msgImpl = new MessageBoardDAOImpl();
	    ArrayList<MessageBoard> msgList = null;
	    int recordCount = 0;
	    try {
		recordCount = msgImpl.getCostExpendID(new Integer(costExpenID));
		msgList = (ArrayList<MessageBoard>) msgImpl.findAllByID(1,
			new Integer(costExpenID), start, limit);
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	    map.put("accountCount", recordCount);
	    map.put("accountList", msgList);
	    JSONObject jsonObject = JSONObject.fromObject(map);
	    // System.out.print(jsonObject);
	    out.print(jsonObject);
	} else if (action.equals("add")) {
	    MessageBoardDAOImpl msgbrodimpl = new MessageBoardDAOImpl();
	    SimpleDateFormat dateformat = new SimpleDateFormat(
		    "yyyy年MM月dd日 HH时mm分ss秒 E ");
	    int cost_expend_id = new Integer(request
		    .getParameter("costExpenID").toString());
	    String user_connect = request.getParameter("price_hight") + "\n"
		    + request.getParameter("specification_no_application")
		    + "\n" + request.getParameter("quality_bad") + "\n"
		    + request.getParameter("supplier_doubt");
	    String provider_connect = request
		    .getParameter("choose_my_supplier");
	    String incorrupt_connect = "";
	    String department_connect = "";
	    String user_ip = request.getLocalName();
	    String user_date = dateformat.format(new Date());
	    System.out.print(user_connect + "\n" + user_ip + "\n" + user_date
		    + "\n");
	    MessageBoard msgbrd = new MessageBoard();
	    msgbrd.setCost_expend_id(cost_expend_id);
	    msgbrd.setUser_connect(user_connect);
	    msgbrd.setProvider_connect(provider_connect);
	    msgbrd.setIncorrupt_connect(incorrupt_connect);
	    msgbrd.setDepartment_connect(department_connect);
	    msgbrd.setUser_ip(user_ip);
	    msgbrd.setUser_date(user_date);
	    try {
		flag = msgbrodimpl.insertMssageBroad(msgbrd);
	    } catch (Exception e) {
		out.print("{success:false,msg:'提交失败'}");
		e.printStackTrace();
	    }
	    if (flag) {
		out.print("{success:true,msg:'提交成功'}");
	    } else {
		out.print("{success:false,msg:'提交失败'}");
	    }
	} else if (action.equals("del")) {
	    ControlItemImpl conlIte = new ControlItemImpl();
	    int control_item_id = new Integer(request.getParameter(
		    "control_item_id").toString());
	    System.out.println(control_item_id);
	    try {
		flag = conlIte.deleteControlItem(control_item_id);
	    } catch (Exception e) {
		out.print("{success:false,msg:'提交失败'}");
		e.printStackTrace();
	    }
	    if (flag) {
		out.print("{success:true,msg:'提交成功'}");
	    } else {
		out.print("{success:false,msg:'提交失败'}");
	    }
	} else if (action.equals("updateDepartmentMessage")) {
	    MessageBoardDAOImpl msgImpl = new MessageBoardDAOImpl();
	    int cost_expend_id = new Integer(request
		    .getParameter("costExpenID"));
	    int message_board_id = new Integer(request
		    .getParameter("message_board_id"));
	    String incorrupt_connect = request
		    .getParameter("incorrupt_connect");
	    String department_connect = request
		    .getParameter("department_connect");
	    MessageBoard msgbrd = new MessageBoard();
	    msgbrd.setMessage_board_id(message_board_id) ;
	    msgbrd.setCost_expend_id(cost_expend_id);
	    msgbrd.setIncorrupt_connect(incorrupt_connect);
	    msgbrd.setDepartment_connect(department_connect);
	    try {
		flag = msgImpl.updateAdminMssageBroad(msgbrd);
	    } catch (Exception e) {
		out.print("{success:false,msg:'提交失败'}");
		e.printStackTrace();
	    }
	    if (flag) {
		out.print("{success:true,msg:'提交成功'}");
	    } else {
		out.print("{success:false,msg:'提交失败'}");
	    }
	}
    }

    /**
     * Initialization of the servlet. <br>
     * 
     * @throws ServletException
     *             if an error occurs
     */
    public void init() throws ServletException {
	// Put your code here
    }

}

package lb.mms.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lb.mms.dao.impl.ControlItemImpl;
import lb.mms.entity.ControlItem;
import net.sf.json.JSONObject;

public class ControlItemServlet extends HttpServlet {

    /**
     * <ul>
     * <li>1、字段类型：long</li>
     * <li>2、字段名称：ControlItemServlet.java</li>
     * </ul>
     */
    private static final long serialVersionUID = 1L;

    /**
     * Constructor of the object.
     */
    public ControlItemServlet() {
	super();
    }

    /**
     * Destruction of the servlet. <br>
     */
    public void destroy() {
	super.destroy(); // Just puts "destroy" string in log
	// Put your code here
    }

    /**
     * The doGet method of the servlet. <br>
     * 
     * This method is called when a form has its tag value method equals to get.
     * 
     * @param request
     *            the request send by the client to the server
     * @param response
     *            the response send by the server to the client
     * @throws ServletException
     *             if an error occurred
     * @throws IOException
     *             if an error occurred
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=utf-8");
	response.setCharacterEncoding("UTF-8");
	PrintWriter out = response.getWriter();
	String conItValue = new String(request.getParameter("conItValue")
		.getBytes("ISO8859_1"), "UTF-8");
	int start = Integer.parseInt(request.getParameter("start").toString());
	int limit = Integer.parseInt(request.getParameter("limit").toString());
	String searchText = request.getParameter("limit").toString();
	Map<String, Object> map = new HashMap<String, Object>();
	if (conItValue.equals("getAll")) {
	    ControlItemImpl conlIte = new ControlItemImpl();
	    ArrayList<ControlItem> recordList = null;
	    int recordCount = 0;
	    try {
		recordCount = conlIte.getCount();
		recordList = conlIte.findAll();
	    } catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	    }
	    map.put("accountCount", recordCount);
	    map.put("accountList", recordList);

	} else if (conItValue.indexOf(",") != -1) {
	    ControlItemImpl conlIte = new ControlItemImpl();
	    ArrayList<ControlItem> recordList = null;
	    int recordCount = 0;
	    try {
		recordCount = conlIte.getCountByDepartmentID(new Integer(
			conItValue.split(",")[1]));
		recordList = (ArrayList<ControlItem>) conlIte.findAllByID(
			new Integer(conItValue.split(",")[1]), start, limit);
	    } catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	    }
	    map.put("accountCount", recordCount);
	    map.put("accountList", recordList);

	}
	JSONObject jsonObject = JSONObject.fromObject(map);
	System.out.print(searchText);
	out.print(jsonObject);
	out.flush();
	out.close();
    }

    /**
     * The doPost method of the servlet. <br>
     * 
     * This method is called when a form has its tag value method equals to
     * post.
     * 
     * @param request
     *            the request send by the client to the server
     * @param response
     *            the response send by the server to the client
     * @throws ServletException
     *             if an error occurred
     * @throws IOException
     *             if an error occurred
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {
	// this.doGet(request, response);
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=utf-8");
	response.setCharacterEncoding("UTF-8");
	PrintWriter out = response.getWriter();
	String conItValue = request.getParameter("conItValue");
	String formJson = request.getParameter("formJson");
	
	
	String count_quantity = request.getParameter("count_quantity");
	String amount_fixation = request.getParameter("amount_fixation");
	String expend_law = request.getParameter("expend_law");
	
	
	if(count_quantity == null){
	    count_quantity= "" ;
	}else {
	    count_quantity= count_quantity+"," ;
	};
	if(amount_fixation == null){
	    amount_fixation= "" ;
	}else {
	    amount_fixation= amount_fixation+"," ;
	};
	if(expend_law == null){
	    expend_law= "" ;
	}
	boolean flag = false;
	Map<String, Object> map = new HashMap<String, Object>();
	if (conItValue.indexOf(",") != -1) {
	    int start = Integer.parseInt(request.getParameter("start")
		    .toString());
	    int limit = Integer.parseInt(request.getParameter("limit")
		    .toString());
	    ControlItemImpl conlIte = new ControlItemImpl();
	    ArrayList<ControlItem> recordList = null;
	    int recordCount = 0;
	    try {
		recordCount = conlIte.getCountByDepartmentID(new Integer(
			conItValue.split(",")[1]));
		recordList = (ArrayList<ControlItem>) conlIte.findAllByID(
			new Integer(conItValue.split(",")[1]), start, limit);
	    } catch (Exception e){
		// TODO Auto-generated catch block
		e.printStackTrace();
	    }
	    map.put("accountCount", recordCount);
	    map.put("accountList", recordList);
	    JSONObject jsonObject = JSONObject.fromObject(map);
	    out.print(jsonObject);
	} else if (conItValue.equals("add")) {
	    // System.out.println(formJson) ;
	    ControlItemImpl conlIte = new ControlItemImpl();
	    JSONObject jsonObject = JSONObject.fromObject(formJson);
	    ControlItem ci = (ControlItem) JSONObject.toBean(jsonObject,
		    ControlItem.class);
	    ci.setCont_feature(count_quantity+amount_fixation+expend_law);

	    try {
		flag = conlIte.insertControlItem(ci);
	    } catch (Exception e) {
		// TODO Auto-generated catch block
		out.print("{success:false,msg:'提交失败'}");
		e.printStackTrace();
	    }
	    if (flag) {
		out.print("{success:true,msg:'提交成功'}");
	    } else {
		out.print("{success:false,msg:'提交失败'}");
	    }

	} else if (conItValue.equals("del")) {
	    ControlItemImpl conlIte = new ControlItemImpl();
	    int control_item_id = new Integer(request.getParameter(
		    "control_item_id").toString());
	    System.out.println(control_item_id);
	    try {
		flag = conlIte.deleteControlItem(control_item_id);
	    } catch (Exception e) {
		// TODO Auto-generated catch block
		out.print("{success:false,msg:'提交失败'}");
		e.printStackTrace();
	    }
	    if (flag) {
		out.print("{success:true,msg:'提交成功'}");
	    } else {
		out.print("{success:false,msg:'提交失败'}");
	    }
	    out.flush();
	    out.close();
	} else if (conItValue.equals("update")) {
	    ControlItemImpl conlIte = new ControlItemImpl();
	    JSONObject jsonObject = JSONObject.fromObject(formJson);
	    ControlItem ci = (ControlItem) JSONObject.toBean(jsonObject,
		    ControlItem.class);
	    ci.setCont_feature(count_quantity+amount_fixation+expend_law);
	    try {
		flag = conlIte.updateControlItem(ci);
	    } catch (Exception e) {
		// TODO Auto-generated catch block
		out.print("{success:false,msg:'提交失败'}");
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

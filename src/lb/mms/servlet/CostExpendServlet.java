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

import lb.mms.dao.impl.CostExpendDAOImpl;
import lb.mms.entity.CostExpend;
import net.sf.json.JSONObject;

public class CostExpendServlet extends HttpServlet {
    public void service(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=utf-8");
	response.setCharacterEncoding("UTF-8");
	PrintWriter out = response.getWriter();
	String conItValue = request.getParameter("conItValue");
	String formJson = request.getParameter("formJson") ;

	boolean flag = false;
	Map<String, Object> map = new HashMap<String, Object>();
	if (conItValue.indexOf(",") != -1) {
	    int start = Integer.parseInt(request.getParameter("start")
		    .toString());
	    int limit = Integer.parseInt(request.getParameter("limit")
		    .toString());
	    CostExpendDAOImpl conlIte = new CostExpendDAOImpl();
	    ArrayList<CostExpend> recordList = null;
	    int recordCount = 0;
	    try {
		recordCount = conlIte.getCountByDepartmentID(new Integer(
			conItValue.split(",")[1]));
		recordList = (ArrayList<CostExpend>) conlIte.findAllByID(
			new Integer(conItValue.split(",")[1]), start, limit);
	    } catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	    }
	    map.put("accountCount", recordCount);
	    map.put("accountList", recordList);
	    JSONObject jsonObject = JSONObject.fromObject(map);
	    out.print(jsonObject);
	    out.flush();
	    out.close();
	} else if (conItValue.equals("add")) {
	    JSONObject jsonObject = JSONObject.fromObject(formJson);
	    CostExpendDAOImpl csimpl = new CostExpendDAOImpl() ;
	    CostExpend ce = (CostExpend) JSONObject.toBean(jsonObject,CostExpend.class); 
	    
	    try {
		flag = csimpl.insertCostExpend(ce);
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
	    CostExpendDAOImpl csimpl = new CostExpendDAOImpl() ;
	    int cost_expend_id = new Integer(request.getParameter("cost_expend_id")!=
		    null&&!request.getParameter("cost_expend_id").equals("")?request.getParameter("cost_expend_id"):"0") ;
	    //csimpl.deleteCostExpend(cost_expend_id);
	    try {
		flag = csimpl.deleteCostExpend(cost_expend_id);
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
	    JSONObject jsonObject = JSONObject.fromObject(formJson);
	    //将json对象转换为实例
	    CostExpend ce = (CostExpend) JSONObject.toBean(jsonObject,CostExpend.class); 
	    CostExpendDAOImpl csimpl = new CostExpendDAOImpl() ;
	    //System.out.println(ce.getDepartment_id());
	    try {
		flag = csimpl.updateCostExpend(ce);
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

}

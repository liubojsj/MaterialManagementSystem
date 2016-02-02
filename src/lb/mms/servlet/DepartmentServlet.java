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

import lb.mms.dao.DepartmentDAO;
import lb.mms.entity.Department;
import lb.mms.util.Factory;
import net.sf.json.JSONObject;

public class DepartmentServlet extends HttpServlet {

   
    public void doGet(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {
	this.doPost(request, response) ;
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {

	// 设置响应字符集,以输出中文到浏览器正常显示
	response.setContentType("json/html;charset=utf-8");
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
	int Id = new Integer(
		request.getParameter("construction_repair_id") != null
			&& !request.getParameter("construction_repair_id")
				.equals("") ? request
			.getParameter("construction_repair_id") : "0");
	// 获取总记录数
	int count = 0;
	// 准备页面JSON
	Map<String, Object> map = new HashMap<String, Object>();
	JSONObject json = null;
	String formJson = request.getParameter("formJson");
	if ("getAll".equals(action)) {
	    List<Department> dpList = null ;
	    DepartmentDAO dao = (DepartmentDAO)Factory.getInstance("DepartmentDAO");
	    try {
		dpList = dao.findAll() ;
	    } catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	    }
	    map.put("date", dpList) ;
	    json = JSONObject.fromObject(map);
	    out.print(json);
	    out.flush();
	    out.close();
	    
	}
    }

}

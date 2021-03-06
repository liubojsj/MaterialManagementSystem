package lb.mms.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lb.mms.dao.impl.DepartmentDAOImpl;
import lb.mms.entity.Department;
import net.sf.json.JSONArray;

public class ConfigServlet extends HttpServlet {

    /**
     * Constructor of the object.
     */
    public ConfigServlet() {
	super();
    }

    public void destroy() {
	super.destroy(); // Just puts "destroy" string in log
	// Put your code here
    }

    /**
     * The doGet method of the servlet. <br>
     *
     * This method is called when a form has its tag value method equals to get.
     * 
     * @param request the request send by the client to the server
     * @param response the response send by the server to the client
     * @throws ServletException if an error occurred
     * @throws IOException if an error occurred
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {
//	request.setCharacterEncoding("UTF-8");
//	response.setContentType("text/html;charset=utf-8");
//	response.setCharacterEncoding("UTF-8");
//	PrintWriter out = response.getWriter();
//	//Object tab = new String(request.getParameter("tab").getBytes("ISO8859_1"), "UTF-8");
//	ServletContext context = this.getServletConfig().getServletContext();
//	String departmentJson =(String) context.getAttribute("departmentJson");
//
//	out.print(departmentJson);
//
//	out.flush();
//	out.close();
    }

    /**
     * The doPost method of the servlet. <br>
     *
     * This method is called when a form has its tag value method equals to post.
     * 
     * @param request the request send by the client to the server
     * @param response the response send by the server to the client
     * @throws ServletException if an error occurred
     * @throws IOException if an error occurred
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {

	response.setContentType("text/html");
	PrintWriter out = response.getWriter();
	out
		.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
	out.println("<HTML>");
	out.println("  <HEAD><TITLE>A Servlet</TITLE></HEAD>");
	out.println("  <BODY>");
	out.print("    This is ");
	out.print(this.getClass());
	out.println(", using the POST method");
	out.println("  </BODY>");
	out.println("</HTML>");
	out.flush();
	out.close();
    }

    /**
     * Initialization of the servlet. <br>
     *
     * @throws ServletException if an error occurs
     */
    public void init() throws ServletException {
	// Put your code here
	DepartmentDAOImpl depimpl = new DepartmentDAOImpl();
        ArrayList<Department> deplist = null;
        String departmentJson = null;
        try
        {
            deplist = depimpl.findAll();
        }
        catch (Exception e)
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        //将Department类取出转换为JSON字符串
        departmentJson = JSONArray.fromObject(deplist).toString();
	ServletContext context = this.getServletConfig().getServletContext();
	context.setAttribute("departmentJson", departmentJson) ;
    }

}

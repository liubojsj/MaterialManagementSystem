package lb.mms.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lb.mms.dao.impl.DepartmentDAOImpl;
import lb.mms.entity.Department;
import net.sf.json.JSONArray;
public class TestServlet extends HttpServlet
{

    /**
     * Constructor of the object.
     */
    public TestServlet()
    {
        super();
    }

    /**
     * Destruction of the servlet. <br>
     */
    public void destroy()
    {
        super.destroy(); // Just puts "destroy" string in log
        // Put your code here
    }

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-11-25 : 上午11:28:35</li>
     * <li>3、方法含义测试Servlet,输出类信息到网页上.：</li>
     * <li>4、方法说明：</li>
     * </ul>
     * 
     * @see javax.servlet.http.HttpServlet#doGet(javax.servlet.http.HttpServletRequest,
     *      javax.servlet.http.HttpServletResponse)
     */

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException{

        
        DepartmentDAOImpl depimpl = new DepartmentDAOImpl();
        ArrayList<Department> deplist = null;
        try
        {
            deplist = depimpl.findAll();
        }
        catch (Exception e)
        {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        String str = JSONArray.fromObject(deplist).toString();
       
        
        /*
         * 在servlet中输出中文，如果采用PrintWriter方式，
         * 需要在调用getPrintWriter()之前调用setContentType 
         * 或者 setCharacterEncoding；
         */
        response.setContentType("text/html;charset=utf-8");
        response.setCharacterEncoding("UTF-8" ); 
        PrintWriter out = response.getWriter();
//        out.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
//        out.println("<HTML>");
//        out.println("  <HEAD>" +
//        		"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />" +
//        		"<TITLE>A Servlet</TITLE></HEAD>");
//        out.println("<BODY>");
//        out.print("    <h1>这是一个JSON字符串</h1><br>");
        
    
        out.print(str);
        
        System.out.print(str.replaceAll("\"", "\'"));
//        out.println("  </BODY>");
//        out.println("</HTML>");
//        out.flush();
//        out.close();
    }

    /**
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2015-11-25 : 上午11:17:54</li>
     * <li>3、方法含义：测试Servlet,输出类信息到网页上.</li>
     * <li>4、方法说明：</li>
     * </ul>
     * 
     * @see javax.servlet.http.HttpServlet#doPost(javax.servlet.http.HttpServletRequest,
     *      javax.servlet.http.HttpServletResponse)
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
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
     * @throws ServletException
     *             if an error occurs
     */
    public void init() throws ServletException
    {
        // Put your code here
    }

}

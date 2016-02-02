package lb.mms.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import lb.mms.dao.EmployeeDAO;
import lb.mms.dao.UserDAO;
import lb.mms.entity.Employee;
import lb.mms.entity.User;
import lb.mms.util.Factory;

public class ActionServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    public void service(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {
	response.setContentType("text/html;charset=utf-8");
	response.setCharacterEncoding("UTF-8");
	PrintWriter out = response.getWriter();
	// 设置请求字符集,以便从请求读取中文
	request.setCharacterEncoding("utf-8");
	// 设置响应字符集,以输出中文到浏览器正常显示
	response.setContentType("text/html;charset=utf-8");
	// 获取请求路径
	String uri = request.getRequestURI();
	// 获取请求行为
	// String action =
	// uri.substring(uri.lastIndexOf("/"),uri.lastIndexOf("."));
	String action = request.getParameter("action");
	// 请求行为为login时
	if ("login".equals(action)) {
	    // 读取验证码
	    /*
	     * String number1 = request.getParameter("number");
	     * System.out.println(number1+"............"); HttpSession session =
	     * request.getSession(); String number2 =
	     * (String)session.getAttribute("number");
	     * System.out.println(number2+"............");
	     * //if(!number1.equalsIgnoreCase(number2))
	     * if(!number1.equalsIgnoreCase(number2)) {
	     * request.setAttribute("checkcode_msg", "验证码错误");
	     * request.getRequestDispatcher("login.jsp").forward(request,
	     * response); return; }
	     * 
	     * String username = request.getParameter("username"); String
	     * password = request.getParameter("pwd"); UserDAO dao =
	     * (UserDAO)Factory.getInstance("UserDAO"); try { User user =
	     * dao.findUserByUsername(username); if("".equals(username.trim()))
	     * { request.setAttribute("username", "用户名不能为空");
	     * //此处必须用转发,如果用重定向,则上面request会被销毁,然后重新生成request对象
	     * request.getRequestDispatcher("login.jsp").forward(request,
	     * response); } else if("".equals(password.trim())) {
	     * request.setAttribute("password", "密码不能为空");
	     * request.getRequestDispatcher("/login.jsp").forward(request,
	     * response); } else if(user != null) { //判断用户名密码是否正确
	     * if(dao.login(username, password)) { //绑定相关数据到session对象
	     * session.setAttribute("user", user);
	     * response.sendRedirect("list.do"); } else { //错误就转发给login.jsp
	     * request.setAttribute("result", "用户名或密码错误");
	     * request.getRequestDispatcher("/login.jsp").forward(request,
	     * response); } } } catch (Exception e) { e.printStackTrace(); throw
	     * new ServletException(e); }
	     */
	    HttpSession session = request.getSession();
	    String username = request.getParameter("UserName");
	    String password = request.getParameter("Password");
	    UserDAO dao = (UserDAO) Factory.getInstance("UserDAO");
	    User user = dao.findUserByUsername(username);

	    boolean flag = dao.login(username, password);
	    session.setAttribute("user", user);
	    if (flag) {
		out.print("{success:true,msg:'登录成功'}");
	    } else {
		out.print("{success:false,msg:'登录失败'}");
	    }
	    // response.sendRedirect("list.do");
	} else if ("/regist".equals(action)) {
	    String username = request.getParameter("username");
	    String name = request.getParameter("name");
	    String password = request.getParameter("pwd");
	    String sex = request.getParameter("sex");

	    if ("".equals(username.trim())) {
		request.setAttribute("username", "用户名不能为空");
		// 此处必须用转发,如果用重定向,则上面request会被销毁,然后重新生成request对象
		request.getRequestDispatcher("/regist.jsp").forward(request,
			response);
	    } else if ("".equals(name.trim())) {
		request.setAttribute("name", "姓名不能为空");
		request.getRequestDispatcher("/regist.jsp").forward(request,
			response);
	    } else if ("".equals(password.trim())) {
		request.setAttribute("password", "密码不能为空");
		request.getRequestDispatcher("/regist.jsp").forward(request,
			response);
	    } else {
		UserDAO dao = (UserDAO) Factory.getInstance("UserDAO");
		User user = dao.findUserByUsername(username);
		if (user != null) {
		    // 转发
		    request.setAttribute("result", "用户已存在");
		    request.getRequestDispatcher("regist.jsp").forward(request,
			    response);
		} else {
		    // 此处要新new出一个user,否则会提示空指针异常
		    user = new User();
		    user.setUsername(username);
		    user.setName(name);
		    user.setPassword(password);
		    user.setSex(sex);
		    dao.addUser(user);
		    // 重定向
		    response.sendRedirect(request.getContextPath()
			    + "/login.jsp");

		}
	    }
	} else if (action.equals("/list")) {

	    HttpSession session = request.getSession();
	    Object obj = session.getAttribute("user");
	    if (obj == null) {
		response.sendRedirect("/login.jsp");
		return;
	    }
	    EmployeeDAO dao = (EmployeeDAO) Factory.getInstance("EmployeeDAO");

	    try {
		List<Employee> employees = dao.findALL();
		// step1 绑定数据到request对象上
		request.setAttribute("employees", employees);
		// step2 获得转发器
		RequestDispatcher rd = request
			.getRequestDispatcher("emplist2.jsp");
		// step3 转发
		rd.forward(request, response);
	    } catch (Exception e) {
		e.printStackTrace();
		throw new ServletException(e);
	    }
	} else if (action.equals("/delete")) {
	    int id = Integer.parseInt(request.getParameter("id"));
	    try {
		// 工厂模式
		EmployeeDAO dao = (EmployeeDAO) Factory
			.getInstance("EmployeeDAO");
		dao.deleteEmpById(id);
		response.sendRedirect("list.do");
	    } catch (ClassNotFoundException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	    } catch (Exception e) {
		e.printStackTrace();
		throw new ServletException(e);
	    }
	} else if ("/add".equals(action)) {
	    String name = request.getParameter("name");
	    int age = Integer.parseInt(request.getParameter("age"));
	    double salary = Double.parseDouble(request.getParameter("salary"));
	    try {

		// 工厂模式
		EmployeeDAO dao = (EmployeeDAO) Factory
			.getInstance("EmployeeDAO");
		Employee e = new Employee();
		e.setName(name);
		e.setAge(age);
		e.setSalary(salary);
		dao.insertEmp(e);
		response.sendRedirect("list.do");
	    } catch (Exception e) {
		e.printStackTrace();
		throw new ServletException(e);
	    }
	} else if ("/load".equals(action)) {
	    int id = Integer.parseInt(request.getParameter("id"));
	    try {
		// 工厂模式
		EmployeeDAO dao = (EmployeeDAO) Factory
			.getInstance("EmployeeDAO");
		Employee e = dao.findEmpById(id);

		request.setAttribute("e", e);
		request.getRequestDispatcher("updateEmp.jsp").forward(request,
			response);

	    } catch (Exception e) {
		e.printStackTrace();
		throw new ServletException(e);
	    }
	} else if ("/modify".equals(action)) {
	    int id = Integer.parseInt(request.getParameter("id"));
	    String name = request.getParameter("name");
	    int age = Integer.parseInt(request.getParameter("age"));
	    double salary = Double.parseDouble(request.getParameter("salary"));
	    try {
		EmployeeDAO dao = (EmployeeDAO) Factory
			.getInstance("EmployeeDAO");
		Employee e = new Employee();
		e.setId(id);
		e.setName(name);
		e.setAge(age);
		e.setSalary(salary);
		dao.updateEmp(e);
		response.sendRedirect("list.do");
	    } catch (Exception e) {
		e.printStackTrace();
		throw new ServletException(e);
	    }
	}
    }
}

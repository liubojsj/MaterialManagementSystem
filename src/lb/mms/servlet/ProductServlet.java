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

import lb.mms.dao.ProductDAO;
import lb.mms.entity.Product;
import lb.mms.util.Factory;
import net.sf.json.JSONObject;

public class ProductServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {

	this.doPost(request, response) ;
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
	int product_id = new Integer(request.getParameter("product_id") != null ? request
		.getParameter("product_id") : "-1");
	// 获取总记录数
	int count = 0;
	// 准备页面JSON
	Map<String, Object> map = new HashMap<String, Object>();
	List<Product> plist = null;
	JSONObject jsonObject = null;
	Product p = null ;
	String formJson = request.getParameter("formJson");
	// 页面操作逻辑判断
	if ("list".equals(action)) {
	    
	    ProductDAO dao = (ProductDAO)Factory.getInstance("ProductDAO") ;
	    try {
		// 获取查询数据列表
		plist = dao.getProductList(start, limit,
			searchText);
		count = dao.getRowCount(searchText);
		// 获取总记录条目数
		// System.out.println("######################"+"\n"+"获得查询结果数据条数为:"+plist.size()+"\n"+"######################") ;
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	    map.put("count", count);
	    map.put("list", plist);
	    jsonObject = JSONObject.fromObject(map);
	    out.print(jsonObject);
	    out.flush();
	    out.close();
	}else if ("add".equals(action)) {
	    jsonObject = JSONObject.fromObject(formJson);
	    p = (Product) JSONObject.toBean(jsonObject,
		    Product.class);
	    ProductDAO dao = (ProductDAO)Factory.getInstance("ProductDAO") ;
	    try {
		flag = dao.insertProduct(p) ;
	    } catch (Exception e) {
		e.printStackTrace() ;
	    }
	    if (flag) {
		out.print("提交成功");
	    } else {
		out.print("提交失败");
	    }
	    out.flush();
	    out.close();
	}else if("delete".equals(action)){
	    ProductDAO dao = (ProductDAO)Factory.getInstance("ProductDAO") ;
	    try {
		flag = dao.deleteProductByID(product_id) ;
	    } catch (Exception e) {
		out.print("{success:true,msg:'提交失败'}");
		e.printStackTrace() ;
	    }
	    if (flag) {
		out.print("{success:true,msg:'提交成功'}");
	    } else {
		out.print("{success:true,msg:'提交失败'}");
	    }
	    out.flush();
	    out.close();
	}else if("update".equals(action)){
	    jsonObject = JSONObject.fromObject(formJson);
	    p = (Product) JSONObject.toBean(jsonObject,
		    Product.class);
	    ProductDAO dao = (ProductDAO)Factory.getInstance("ProductDAO") ;
	    try {
		flag = dao.updateProduct(p) ;
	    } catch (Exception e) {
		out.print("{success:true,msg:'提交失败'}");
		e.printStackTrace() ;
	    }
	    if (flag) {
		out.print("提交成功");
	    } else {
		out.print("提交失败");
	    }
	    out.flush();
	    out.close();
	}
    }



}

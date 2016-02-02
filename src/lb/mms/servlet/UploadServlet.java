package lb.mms.servlet;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lb.mms.util.RandomUtil;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.FileUploadBase.FileSizeLimitExceededException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;

public class UploadServlet extends HttpServlet {
    
    
    private static final long serialVersionUID = 1L;
    /**
     * <ul>
     * <li>1、字段类型：long</li>
     * <li>2、字段名称：separator</li>
     * <li>2、字段说明：定义系统目录分隔符</li>
     * </ul>
     */
    private String separator;

    public void doGet(HttpServletRequest request, HttpServletResponse response)
	    throws ServletException, IOException {

	this.doPost(request, response);
    }

    /**
     * 
     * <ul>
     * <li>1、开发作者：刘博</li>
     * <li>2、编写日期：2016-2-2 : 上午10:39:35</li>
     * <li>3、方法含义：文件上传servlet</li>
     * <li>4、方法说明：</li>
     * </ul>
     * @see javax.servlet.http.HttpServlet#doPost(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse)
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
	// 当前项目的真实路径
	String realPath = request.getSession().getServletContext().getRealPath("/");
	// 系统默认文件分隔符
	separator = File.separator;
	// 允许上传文件的大小
	final long MAX_SIZE = 4 * 1024 * 1024;// 设置上传文件最大为 4M  
	// 允许上传的文件格式
	final String[] allowedExt = new String[] { "jpg", "jpeg", "gif", "bmp","png"}; 
	/**
	 * 首先判断form的enctype是不是multipart/form-data 同时也判断了form的提交方式是不是post
	 * 方法：isMultipartContent(request)
	 */

	if (ServletFileUpload.isMultipartContent(request)) {
	    request.setCharacterEncoding("utf-8");

	    // 实例化一个硬盘文件工厂,用来配置上传组件ServletFileUpload
	    DiskFileItemFactory factory = new DiskFileItemFactory();

	    // 设置文件存放的临时文件夹，这个文件夹要真实存在
	    File fileDir = new File(realPath + "fileupload"+separator+"tmp");
//	    System.out.println(fileDir);
//	    System.out.println(!fileDir.exists());
//	    System.out.println(!fileDir.isDirectory());
//	    System.out.println(!fileDir.exists() || !fileDir.isDirectory());

	    if (!fileDir.exists() || !fileDir.isDirectory()) {
		fileDir.delete();
		fileDir.mkdirs();
	    }
	    factory.setRepository(fileDir);

	    // 设置最大占用的内存
	    factory.setSizeThreshold(1024000);

	    // 创建ServletFileUpload对象
	    ServletFileUpload sfu = new ServletFileUpload(factory);
	    sfu.setHeaderEncoding("utf-8");

	    // 设置单个文件最大值byte
	    sfu.setFileSizeMax(MAX_SIZE);

	    // 所有上传文件的总和最大值byte
	    sfu.setSizeMax(204800000);

	    List<FileItem> items = null;

	    try {
		items = sfu.parseRequest(request);
	    } catch (FileUploadException e) {
		if (e instanceof FileSizeLimitExceededException) {  
		     out.println("{success:false,msg:'文件尺寸超过规定大小,最大上传文件为:" + MAX_SIZE/1024/1024 + "M'}"); 
		     return;  
		    } 
		e.printStackTrace();
	    }

	    // 取得items的迭代器
	    Iterator<FileItem> iter = items == null ? null : items.iterator();

	    // 图片上传后存放的路径目录
	    File images = new File(realPath + "upload"+separator +"images");
	    if (images.exists() == false) {
		images.mkdirs();
	    }
	    // 迭代items
	    while (iter != null && iter.hasNext()) {
		FileItem item = (FileItem) iter.next();

		// 如果传过来的是普通的表单域
		if (item.isFormField()) {
		    System.out.print("普通的表单域:");
		    System.out.print(new String(item.getFieldName()) + "  ");
		    System.out.println(new String(item.getString("UTF-8")));
		}
		// 文件域
		else if (!item.isFormField()) {
		    System.out.println("源图片:" + item.getName());
		    String fileName = item.getName();
		    
		    BufferedInputStream in = new BufferedInputStream(item
			    .getInputStream());
		    // 文件存储在D:/upload/images目录下,这个目录也得存在
		    String newName = RandomUtil.getRandomFileName(fileName) ;
		    BufferedOutputStream fileout = new BufferedOutputStream(
			    new FileOutputStream(new File(images
				    .getAbsolutePath()+separator 
				    + newName)));
		    Streams.copy(in, fileout, true);
//		    ProductDAO dao = (ProductDAO)Factory.getInstance("ProductDAO") ;
//		    try {
//			flag = dao.insertImgByProductID(productID, imgName) ;
//		    } catch (Exception e) {
//			flag = false ;
//			e.printStackTrace() ;
//		    }
//		    if (flag) {
//			out.print("{success:true,msg:'提交成功'}");
//		    } else {
//			out.print("{success:true,msg:'提交失败'}");
//		    }
		    
		    out.print("{success:true,msg:'提交成功',data:'"+newName+"'}");
		}
	    }
	} else {
	    System.out.println("表单的enctype 类型错误");
	}
	out.flush();
	out.close();
    }

}

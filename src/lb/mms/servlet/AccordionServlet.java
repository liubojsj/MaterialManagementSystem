package lb.mms.servlet ;

import java.io.IOException ;
import java.io.PrintWriter ;

import javax.servlet.ServletException ;
import javax.servlet.http.HttpServlet ;
import javax.servlet.http.HttpServletRequest ;
import javax.servlet.http.HttpServletResponse ;

public class AccordionServlet
                             extends HttpServlet
{

	/**
	 * Constructor of the object.
	 */
	public AccordionServlet ( )
	{
		super ( ) ;
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy ( )
	{
		super
		     .destroy ( ) ; // Just puts "destroy" string in log
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

	public void doGet (
	                    HttpServletRequest request ,
	                    HttpServletResponse response )
	                                                  throws ServletException ,
	                                                  IOException
	{

		response
		        .setContentType ( "text/html" ) ;
		PrintWriter out =
		                  response
		                          .getWriter ( ) ;
		out
		   .println ( "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">" ) ;
		out
		   .println ( "<HTML>" ) ;
		out
		   .println ( "  <HEAD><TITLE>A Servlet</TITLE></HEAD>" ) ;
		out
		   .println ( "  <BODY>" ) ;
		out
		   .print ( "    This is " ) ;
		out
		   .print ( this
		                .getClass ( ) ) ;
		out
		   .println ( ", using the GET method" ) ;
		out
		   .println ( "  </BODY>" ) ;
		out
		   .println ( "</HTML>" ) ;
		out
		   .flush ( ) ;
		out
		   .close ( ) ;
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
	public void doPost (
	                     HttpServletRequest request ,
	                     HttpServletResponse response )
	                                                   throws ServletException ,
	                                                   IOException
	{

		response
		        .setContentType ( "text/html" ) ;
		PrintWriter out =
		                  response
		                          .getWriter ( ) ;
		out
		   .println ( "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">" ) ;
		out
		   .println ( "<HTML>" ) ;
		out
		   .println ( "  <HEAD><TITLE>A Servlet</TITLE></HEAD>" ) ;
		out
		   .println ( "  <BODY>" ) ;
		out
		   .print ( "    This is " ) ;
		out
		   .print ( this
		                .getClass ( ) ) ;
		out
		   .println ( ", using the POST method" ) ;
		out
		   .println ( "  </BODY>" ) ;
		out
		   .println ( "</HTML>" ) ;
		out
		   .flush ( ) ;
		out
		   .close ( ) ;
	}

	/**
	 * Initialization of the servlet. <br>
	 * 
	 * @throws ServletException
	 *             if an error occurs
	 */
	public void init ( )
	                    throws ServletException
	{
		// Put your code here
	}

}

<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="lb.mms.entity.User"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	User user = (User)request.getSession().getAttribute("user") ;
	boolean userRole = false ;
	if(user!=null){
	    userRole = true ;
	}
	//System.out.println(departmentJson);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>唐山站"成本大项"监管运用平台</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<script type="text/javascript">
			var login_username = '当前登录:<%= user!=null?user.getName():"普通用户"%>';
		</script>

		<!-- 引入ExtJS框架样式 -->
		<link rel="stylesheet" type="text/css" href="ExtJS4.2.1/resources/css/ext-all.css">
		<link rel="stylesheet" type="text/css" href="css/index.css">
		<!-- 引用extjs 引导文件 -->
		<!-- 此文件要放到资源国际化文件之前，否则国际化并不会成功！ -->
		<script type="text/javascript" src="ExtJS4.2.1/bootstrap.js"></script>
		<!-- 引用中文环境文件 -->
		<script type="text/javascript" src="ExtJS4.2.1/locale/ext-lang-zh_CN.js"></script>
		<script type="text/javascript">
			var webPath = '<%=path%>';
			var userRole = <%=userRole%> ;
		</script>
		<!-- 引用index.jsp 对应的index.js -->
		<script type="text/javascript" src="./js/index.js"></script>
	</head>
	<body>

		<div id="pageWidth"></div>
	</body>
</html>
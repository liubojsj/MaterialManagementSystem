<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String adminPath = path +"/admin";
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>大额采购系统</title>
		<!-- 引入ExtJS框架样式 -->
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>ExtJS4.2.1/resources/css/ext-all.css">
		<!-- 引用extjs 引导文件 -->
		<!-- 此文件要放到资源国际化文件之前，否则国际化并不会成功！ -->
		<script type="text/javascript" src="<%=basePath%>ExtJS4.2.1/bootstrap.js"></script>
		<!-- 引用中文环境文件 -->
		<script type="text/javascript"
			src="<%=basePath%>ExtJS4.2.1/locale/ext-lang-zh_CN.js"></script>
		<script type="text/javascript" src="<%=basePath%>js/wee_maintain_list.js"></script>
		<script type="text/javascript">
			var basePath = '<%=basePath%>';
			var adminPath ='<%= adminPath%>'
		</script>
	</head>
	<body>
	</body>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@page import="lb.mms.entity.User"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String path = request.getContextPath();
	String basePath = request.getServerName() + ":" + request.getServerPort()
	+ path + "/";
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>大额采购系统</title>
		<!-- 引入ExtJS框架样式 -->
		<link rel="stylesheet" type="text/css"
			href="ExtJS4.2.1/resources/css/ext-all.css">
		<script type="text/javascript">
		var webPath = '<%=basePath%>';
		var department_id = '<%=request.getParameter("department_id")%>';
		</script>
		<!-- 引用extjs 引导文件 -->
		<!-- 此文件要放到资源国际化文件之前，否则国际化并不会成功！ -->
		<script type="text/javascript" src="ExtJS4.2.1/bootstrap.js"></script>
		<!-- 引用中文环境文件 -->
		<script type="text/javascript"
			src="ExtJS4.2.1/locale/ext-lang-zh_CN.js"></script>

		<script type="text/javascript" src="./js/cost_expend.js"></script>
	</head>
	<body>

		<div id="pageWidth" style="width: 100%; height: 100%"></div>
	</body>
</html>

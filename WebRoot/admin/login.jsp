<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>My JSP 'index.jsp' starting page</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<!-- 引入ExtJS框架样式 -->
		<link rel="stylesheet" type="text/css"
			href="ExtJS4.2.1/resources/css/ext-all.css">
		<style>
				.main {
					width: 100%;
					text-align: center;
					vertical-align: center;
				}
				
				.login {
					border: 1px solid #000099;
					position:relative; 
					margin-left: auto;
					margin-right: auto;
					text-align: center;
					width: 500px;
					height: 300px;
					top: 100px;
				}
</style>

		<!-- 引用extjs 引导文件 -->
		<!-- 此文件要放到资源国际化文件之前，否则国际化并不会成功！ -->
		<script type="text/javascript" src="ExtJS4.2.1/bootstrap.js"></script>

		<!-- 引用中文环境文件 -->
		<script type="text/javascript"
			src="ExtJS4.2.1/locale/ext-lang-zh_CN.js"></script>

		<!-- 引用index.jsp 对应的index.js -->
		<script type="text/javascript" src="./js/login.js"></script>
		<script type="text/javascript">
			var webPath = '<%=path%>';
	//var iWidth = Ext.get("pageWidth").getWidth()
</script>
	</head>
	<body>
		<div class="login"  id="login_form_location"></div>
	</body>
</html>

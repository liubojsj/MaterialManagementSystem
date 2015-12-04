<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String webPath = basePath + "web/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>首页</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">    
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="首页">
<link href="css/index.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="../ExtJS4.2.1/resources/css/ext-all.css">
<script type="text/javascript" src="../ExtJS4.2.1/bootstrap.js"></script>
<script type="text/javascript" src="../ExtJS4.2.1/locale/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/web_index.js"></script>
</head>

<body>
<div id="container">
<div id="header"><center><h1>唐山站"成本大项"监管运用平台</h1></center></div>
<div id="menu"></div>
<div id="login_form"></div>
<div id="accordion_view"></div>
<div id="bottom_view">此处显示  id "bottom_view" 的内容</div>
</div>
</body>
</html>

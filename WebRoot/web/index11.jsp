<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String webPath = basePath + "web/";
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
	
	<link rel="stylesheet" type="text/css" href="<%=webPath %>css/web_index.css">
	<link rel="stylesheet" type="text/css" href="<%=basePath %>ExtJS4.2.1/resources/css/ext-all.css">
	<script type="text/javascript" src="<%=basePath %>ExtJS4.2.1/bootstrap.js"></script>
	<script type="text/javascript" src="<%=basePath %>ExtJS4.2.1/locale/ext-lang-zh_CN.js"></script>
	<script type="text/javascript" src="<%=webPath %>js/web_index.js"></script>
	

  </head>
 
  <body class = "center">
	  <div class ="center" id ="header">
	    <div id ="logo">显示Logo或图片id:logo</div>
	  	<div id ="appendix">显示题目或者标题id:appendix</div>
	  	<div id ="advertisment">显示广告id:advertisment</div>
	  </div>
	  <table>
	  	<tbody>
	  		<tr>
	  			<td>
	  				<ul id ="menu">
					  	<li><a href = "<%=webPath %>">菜单一</a></li>
					  	<li><a href = "<%=webPath %>">菜单二</a></li>
					  	<li><a href = "<%=webPath %>">菜单三</a></li>
					  	<li class="lastMenuItem"><a href = "<%=webPath %>">最后一个菜单</a></li>
	  				</ul>
	  			</td>
	  		</tr>
	  	</tbody>
	  </table>
	 <div id = "location">
	 	<div id="loginView"></div>
		<div id="catalog">此处显示 id "catalog" 的内容</div>
		<div id="search">此处显示 id "search" 的内容</div>
		<div id="newTopics">此处显示 id "newTopics" 的内容</div>
		<div id="newReply">此处显示 id "newReply" 的内容</div>
		<div id="hotTopics">此处显示 id "hotTopics" 的内容</div>
		<div id="statistics">此处显示 id "statistics" 的内容</div>
		<div id="hotGroups">此处显示 id "hotGroups" 的内容</div>
		<div id="hotUsers">此处显示 id "hotUsers" 的内容</div>
		<div id="footer">此处显示 id "footer" 的内容</div>
	 
	 </div>
	 <div id = "bottom_location">
	 
	 </div>
	  				
	  
  </body>
</html>

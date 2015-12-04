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


		<title>My JSP 'fangjianke_list.jsp' starting page</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
		<link href="css/base.css" rel="stylesheet" type="text/css">
		<link href="css/page.css" rel="stylesheet" type="text/css">
		<link href="css/font.css" rel="stylesheet" type="text/css">
		<link href="css/style.css" rel="stylesheet" type="text/css">
		<link href="css/department_list.css" rel="stylesheet" type="text/css">
	</head>

	<body>
		<div id="container1">
			<table class="centertable">
				<tr>
					<td>
						<table width=100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td height="42" background="images/centertitle.png" valign="top">
									<table width="100%" border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td style="padding-top: 5px; padding-left: 5px;">
												<span class="f04">消防年检 </span>
											</td>
											<td align="right" style="padding-right: 10px;">
												<a id="morebidNotice0001" href="#"><span>更多信息......</span>
												</a>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td style="padding-bottom: 2px; padding-top: 2px;">
									<table width="100%" border="0" cellspacing="0" cellpadding="0">
										<div class="c1-body">
											<div class="c0-bline" style="padding: 3px 0px;">
												<div class="f-left">
													&nbsp;&nbsp;
													<img src="images/head-mark3.gif"
														align="middle" class="img-vm" border="0">
													&nbsp;&nbsp;&#160;
													<a
														href="javascript:doCMSSViewNew(1884792,document.bidNoticeDetailForm0001,0001);"
														title="消防年检关于更换安全阀门的公示"><span>房建车间灭火器安全阀门更换…</span>
													</a>
												</div>
												<div title="唐山站房建车间" class="f-right">
													安徽消防器材集团股份有限…&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2015-12-03
												</div>
												<div class="clear"></div>
											</div>
											<div class="c0-bline" style="padding: 3px 0px;">
												<div class="f-left">
													&nbsp;&nbsp;
													<img src="images/head-mark3.gif"
														align="middle" class="img-vm" border="0">
													&nbsp;&nbsp;&#160;
													<a
														href="javascript:doCMSSViewNew(1884791,document.bidNoticeDetailForm0001,0001);"
														title="2016年唐山站候车室消防栓标志牌采购更换"><span>唐山站候车室消防栓标志牌采购更换…</span>
													</a>
												</div>
												<div title="唐山站房建车间" class="f-right">
													 福建灭火器材厂…&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2015-12-03
												</div>
												<div class="clear"></div>
											</div>
											<div class="c0-bline" style="padding: 3px 0px;">
												<div class="f-left">
													&nbsp;&nbsp;
													<img src="images/head-mark3.gif"
														align="middle" class="img-vm" border="0">
													&nbsp;&nbsp;&#160;
													<a
														href="javascript:doCMSSViewNew(1883329,document.bidNoticeDetailForm0001,0001);"
														title="减阻剂采购（第二次招标）"><span>阻燃剂采购（第二次招标）</span>
													</a>
												</div>
												<div title="   川庆消防工程公司" class="f-right">
													川庆消防器材工程公…&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2015-12-03
												</div>
												<div class="clear"></div>
											</div>
											<div class="c0-bline" style="padding: 3px 0px;">
												<div class="f-left">
													&nbsp;&nbsp;
													<img src="images/head-mark3.gif"
														align="middle" class="img-vm" border="0">
													&nbsp;&nbsp;&#160;
													<a
														href="javascript:doCMSSViewNew(1883328,document.bidNoticeDetailForm0001,0001);"
														title="唐山站行李房灭火器材采购"><span>行包车间灭火器材更换…</span>
													</a>
												</div>
												<div title="   北京铁路局-->物资供应段" class="f-right">
													物资供应段…&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2015-12-03
												</div>
												<div class="clear"></div>
											</div>
										</div>
									</table>
								</td>
							</tr>

							<script>
	function setMoreUrl(id, relativeUrl) {
		var locationUrl = location.href;
		var arr = locationUrl.split("!");
		if (arr.length > 1) {
			retUrl = arr[0] + relativeUrl;
		} else {
			retUrl = arr[0] + '/' + relativeUrl
		}
		;

		var moreEle = document.getElementById(id);
		moreEle.href = retUrl;
	}

	// 通过URL映射实现
	setMoreUrl('morebidNotice0001', 'wcm_search/bidnotice_publish'

	);
</script>
						</table>
					</td>
				</tr>
			</table>



		</div>

	</body>
</html>

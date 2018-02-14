<?php if(empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == "off"){
    $redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $redirect);
    exit();
}
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>IPCNA</title>
</head>

<body style="text-align:center;">
	<h1>Sitio en desarrollo</h1>
    
</body>
</html>

<?php
header('Content-type: application/json');

require_once("library/Json.php");
$json = new Json();
$data = $json->encode($_REQUEST);
$data = json_decode(file_get_contents('php://input'),true);

echo '{
	"success":false
	,"data":'.$data.'
}';
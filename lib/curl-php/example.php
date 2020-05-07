<?php
require('Curl.php');

$curl = new Curl;

$headers = array(
	'Content-Type: application/json',
	'Accept-Version: 1.0.0'
);

$json_data = json_encode(array('name' => 'Test2'));

$curl->httpPost('http://requestb.in/18qmr7b1', $json_data, $headers);

echo "<pre>";
print_r($post);
echo "</pre>";
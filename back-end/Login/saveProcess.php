<?php
    $data = file_get_contents("php://input");
    $parsedArray = json_decode($data, true);

    $response = array();
    $response_json = json_encode($response);

    echo $response_json;
?>
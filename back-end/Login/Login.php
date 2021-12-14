<?php
    // $data = @file_get_contents('php://input');
    // $data = json_decode($data, true);

    if (isset($_POST['data'])) {
        // 获取data值
        $data  =  $_POST['data'];
    }
    else {
        $data = "No POST data";
    }

    

    //打印data
    echo $data;
?>
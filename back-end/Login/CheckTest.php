<?php
    header('Content-Type:application/json;charset=utf-8');

    /*
        接受Login.js发来的body
    */
    // 定义用户输入的json数据(需校验，暂缺)
    $InputJsonString = file_get_contents("php://input");
    // 定义用户输入的json数据转换php数组
    $InputData = (array) json_decode($InputJsonString, true);
    // // 数据测试
    // $TestData = $InputData['username'];
    // // 仅开发使用，测试数据准确性
    // file_put_contents('../../back-end/JSON/Test.json', $TestData);

    // 连接数据库
    $db = mysqli_connect("localhost", "root", "gvhdv456", "userinfo")
    or die("Disconnect!");

    if (empty($InputData)) {

    }
    else {
        // 定义用户名
        $InputUsername = $InputData['username'];
        // 定义用户密码
        $InputUserpwd = $InputData['password'];
    }
    
    if (!isset($InputUsername)) {
        $InputUsername = " ";
    }
    if (!isset($InputUserpwd)) {
        $InputUserpwd = " ";
    }
    // 数据库查找语句
    $Select = "SELECT * FROM user WHERE username = '$InputUsername'";
    // 防止warning
    if (empty($InputData)) {

    }
    else {
        // 定义查询结果的行数
        $InputUsenameSelect = count(mysqli_fetch_array(mysqli_query($db, $Select)));
    }
    // 防止warning
    if (!isset($InputUsenameSelect)) {
        $InputUsenameSelect = 0;
    }
    // 判断用户名是否存在,$InputUsenameSelect<1?不存在，注册新用户，录入信息；存在，读取用户信息
    if ($InputUsenameSelect < 1) {
        // 获取数据库用户总人数
        $SelectDBRow = "SELECT username FROM user";
        // 定义新用户id
        $InputUserID = mysqli_num_rows(mysqli_query($db, $SelectDBRow));

        // Insert要写全属性!!!
        $Insert = "INSERT INTO user (uid, username, password, score, level, target) 
        VALUES ('$InputUserID', '$InputUsername', '$InputUserpwd', '0', '1', '50')";
        mysqli_query($db, $Insert);

        // 读取注册用户数据
        $SelectRegisterUserInfo = "SELECT * FROM user WHERE username = '$InputUsername'";
        // 定义存储读取注册的用户数据
        $SaveSelectRigisterUserInfo = mysqli_fetch_array(mysqli_query($db, $SelectRegisterUserInfo));

        // 定义返回php数组
        if (!isset($OutputRigsterUserInfo)) {
            $OutputRigsterUserInfo = new stdClass();
        }
        $OutputRigsterUserInfo->status = 'success';
        $OutputRigsterUserID = $SaveSelectRigisterUserInfo['uid'];
        if (!isset($OutputRigsterUserInfo->data)) {
            $OutputRigsterUserInfo->data = new stdClass();
        }
        $OutputRigsterUserInfo->data->uid = $OutputRigsterUserID;
        $OutputRigsterUserInfo->data->avatar = " ";
        $OutputRigsterUsername = $SaveSelectRigisterUserInfo['username'];
        $OutputRigsterUserInfo->data->username = $OutputRigsterUsername;
        $OutputRigsterUserInfo->data->isNew = "YES";
        if (!isset($OutputRigsterUserInfo->data->process)) {
            $OutputRigsterUserInfo->data->process = new stdClass();
        }
        $OutputRigsterUserInfo->data->process->score = "0";
        $OutputRigsterUserInfo->data->process->level = "1";
        $OutputRigsterUserInfo->data->process->target = "50";
        $OutputRigsterUserInfo->data->achievement = array("aid"=>"", "title"=>"", "detail"=>"", "icon"=>"");
        $OutputRigsterUserInfo->info = "Login success!";
        // 定义返回php数组转换为json数据
        $OutputRigsterJson = json_encode($OutputRigsterUserInfo);
        // 返回json数据
        echo $OutputRigsterJson;
    }   
    else {
        // 读取用户数据
        $SelectInputUserInfo = "SELECT * FROM user WHERE username = '$InputUsername'";
        // 定义存储读取的用户数据
        $SaveSelectUserInfo = mysqli_fetch_array(mysqli_query($db, $SelectInputUserInfo));
        //print_r($SaveSelectUserInfo);

        // 定义返回php数组
        if (!isset($OutputUserInfo)) {
            $OutputUserInfo = new stdClass();
        }
        $OutputUserInfo->status = 'success';
        $OutputUserID = $SaveSelectUserInfo['uid'];
        if (!isset($OutputUserInfo->data)) {
            $OutputUserInfo->data = new stdClass();
        }
        $OutputUserInfo->data->uid = $OutputUserID;
        $OutputUserInfo->data->avatar = " ";
        $OutputUsername = $SaveSelectUserInfo['username'];
        $OutputUserInfo->data->username = $OutputUsername;
        $OutputUserInfo->data->isNew = "NO";
        $OutputUserScore = $SaveSelectUserInfo['score'];
        if (!isset($OutputUserInfo->data->process)) {
            $OutputUserInfo->data->process = new stdClass();
        }
        $OutputUserInfo->data->process->score = $OutputUserScore;
        $OutputUserLevel = $SaveSelectUserInfo['level'];
        $OutputUserInfo->data->process->level = $OutputUserLevel;
        $OutputUserTarget = $SaveSelectUserInfo['target'];
        $OutputUserInfo->data->process->target = $OutputUserTarget;
        $OutputUserInfo->data->achievement = array("aid"=>"", "title"=>"", "detail"=>"", "icon"=>"");
        $OutputUserInfo->info = "Login success!";
        // 定义返回php数组转换为json数据
        $OutputJson = json_encode($OutputUserInfo);
        // 返回json数据
        echo $OutputJson;
    }

    mysqli_close($db);
?>
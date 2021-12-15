<?php
    // 定义json转换成PHP数组
    $UserInputData = array();
    // 定义用户输入的数据
    $JsonString = "";
    // 定义登录用户信息PHP数组
    $UserInfo = array();
    $UserInfo['uid'] = '';
    $UserInfo['username'] = '';
    $UserInfo['password'] = '';
    $UserInfo['isNew'] = '';
    $UserInfo['exp'] = '';
    $UserInfo['score'] = '';
    $UserInfo['level'] = '';
    $UserInfo['target'] = '';
    // 定义登陆用户信息json
    $UserJsonString = '';
    // 定义注册用户id
    $UserRegisterID = '';
    // 定义注册用户信息PHP数组
    $UserRegisterInfo = Array();
    // 定义注册用户信息json
    $UserRegisterJsonString = '';

    echo "进入php";
    $JsonString = json_decode(file_get_contents('php://input'), true);
    $UserInputData['username'] = $JsonString['username'];
    echo $JsonString;

    /*
    检查数据库中用户是否已存在
    */
    // function CheckData() {
        // echo "进入判断";
        // 连接数据库
        // require_once("../DB/DB_Connect.php");
         $db = mysqli_connect("localhost", "root", "gvhdv456") or die("Disconnect!");
         // 更改连接数据库对象
         mysqli_select_db($db, "userinfo") or die("No connect to table".mysqli_error($db));

        // 获取前端login.json文件的body部分
        //$JsonString  =  $_POST['data'];
        
        // json转换成PHP数组
        //$UserInputData  = json_decode($JsonString , true);
        
        // 用户输入信息是否接收成功？判断登录/注册；返回报错。
        if (isset($JsonString)) {
            echo "成功";

            // $JsonString  =  $_POST['data'];
            // $UserInputData  = json_decode($JsonString , true);

            // 数据库查找username？直接登录，返回数据；注册信息，返回数据。
            if (mysqli_query($db, 'SELECT * from user where username = "$UserInputData.username"')) {
                echo "登录";
                // 读取用户数据库，存入PHP数组
                $UserInfo['uid'] = mysqli_query($db, 'SELECT uid from user where username = "$UserInputData.username"');
                $UserInfo['username'] = mysqli_query($db, 'SELECT username from user where username = "$UserInputData.username"');
                $UserInfo['password'] = mysqli_query($db, 'SELECT username from user where username = "$UserInputData.username"');
                $UserInfo['isNew'] = mysqli_query($db, 'SELECT isNew from user where username = "$UserInputData.username"');
                $UserInfo['exp'] = mysqli_query($db, 'SELECT exp from user where username = "$UserInputData.username"');
                $UserInfo['score'] = mysqli_query($db, 'SELECT score from user where username = "$UserInputData.username"');
                $UserInfo['level'] = mysqli_query($db, 'SELECT level from user where username =="$UserInputData.username"');
                $UserInfo['target'] = mysqli_query($db, 'SELECT target from user where username = "$UserInputData.username"');

                // 用户信息Php数组转换json文件
                $UserJsonString = json_encode($UserInfo);
                //写入文件
                file_put_contents('UserLogin.json', $UserJsonString);
            }
            else {
                echo "注册";
                // 插入用户信息
                mysqli_query($db, 'INSERT INTO user (username, password, isNew, exp, score, level, target) VALUES ("UserInputData.username", "UserInputData.password", "No", "0", "0", "0", "0")');
                // 获取注册用户ID
                $UserRegisterID = mysqli_num_rows(mysqli_query($db, 'SELECT uid from user where username = "$UserInputData.username"'));
                // 更新注册用户ID
                mysqli_query($db, 'INSERT INTO user (uid) VALUES ("$UserRegisterID")');

                // 注册用户信息读取，存入PHP数组
                $UserRegisterInfo = mysqli_query($db, 'SELECT * from user where username = "$UserInputData.username"');
                // 用户信息Php数组转换json文件
                $UserJsonString = json_encode($UserRegisterInfo);
                //写入文件
                file_put_contents('UserRegister.json', $UserJsonString);
            }
        }
        else {
            echo "失败";
            $UserInputData = "No POST data";
        }

        mysqli_close($db);
    // }
?>
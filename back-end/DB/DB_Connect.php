<?php
    /*
    连接数据库 不用关闭
    */
    function() {
        // 数据库连接
        $db = mysqli_connect("localhost", "root", "gvhdv456") or die("Disconnect!");
        // 更改连接数据库对象
        mysqli_select_db($db, "personinfo") or die("No connect to table".mysqli_error($db));


    }
?>
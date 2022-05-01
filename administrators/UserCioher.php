<?php
    header('content-type:text/html;charset=utf-8');  // 获取数据文件
        $DQ = file_get_contents('UserCioher.json');
        $data = json_decode($DQ,true);
    
    if($data['errorNum'] < "5"){
        if($_POST['user'] === $data['user'] && $_POST['cipher'] === $data['cipher']){
            echo "./administrators/manipulate.html";

        }else{
            $data['errorNum'] ++;
            echo "你已经错误".$data['errorNum']."次";   
            //修改文件数据
            $data = json_encode($data);
            file_put_contents("UserCioher.json",$data);
        }
    }else{
        echo "账号冻结错误次数过多";
    }
    
        


?>
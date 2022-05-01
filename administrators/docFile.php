<?php
    header('content-type:text/html;charset=utf-8');
    if(isset($_FILES['file'])){
        $file = $_FILES['file'];
        move_uploaded_file($file['tmp_name'],'./data/'.$_POST['lisName']);
    }else{
        //获取后台数据
        $dF = file_get_contents('docFile.json');
        $dataArr = json_decode($dF,true);


        $numIf = 0;
        $reName = null;
        for($i = 0;$i < count($dataArr);$i ++){
            if($dataArr[$i]['Order'] === $_POST['Order']){
                $reName = $dataArr[$i]['FileName'];
                $dataArr[$i] = $_POST;
                $numIf++;
               
            }
        }
        if($numIf === 0){
            array_push($dataArr,$_POST);
        }
        //修改文件数据
        $data = json_encode($dataArr);
        file_put_contents("docFile.json",$data);

        //删除文件
        rename('./data/'.$reName,'../temporary_storage/delet/'.$reName);
    }
?>
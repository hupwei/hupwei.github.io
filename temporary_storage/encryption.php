<?php
    header('content-type:text/html;charset=utf-8');
    // 获取数据文件
    $GL = file_get_contents('Global_Library.json');
    $Data = json_decode($GL,true);
    if($_POST['iniGet'] === 'encryption'){
        $data = json_decode($_POST['data'],true);
        for($i = 0;$i < count($data);$i++){
            for($j = 0;$j < count($Data);$j++){
                if($data[$i]['_id'] == $Data[$j]['_id']){
                    $Data[$j]['ViewVolume'] = $Data[$j]['ViewVolume']+$data[$i]['contNum'];
                }
            }
        }
        //修改文件数据
        $Data = json_encode($Data);
        file_put_contents("Global_Library.json",$Data);
    }
    
?>
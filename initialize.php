<?php
    header('content-type:text/html;charset=utf-8');
    //获取后台数据
        $dF = file_get_contents('./administrators/docFile.json');
        $Nt = file_get_contents('./administrators/notice.json');
        $QI = file_get_contents('./administrators/quickInfo.json');
        $GL = file_get_contents('./temporary_storage/Global_Library.json');
    if($_POST['iniGet'] === 'index'){
        echo '[';
        echo $dF.',';
        echo $Nt.',';
        echo $QI.',';
        echo $GL;
        echo ']';
    }
        
?>
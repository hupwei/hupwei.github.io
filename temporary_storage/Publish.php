<?php
    header('content-type:text/html;charset=utf-8');
    // 获取数据文件
    $DQ = file_get_contents('Draft.json');
    $data = json_decode($DQ,true);
    $id = $_POST["id"];
    $PL = file_get_contents('Publish.json');
    $Data = json_decode($PL,true);
    function video(){
            global $i;
            global $arr;
            $ifVIDEO = isset($arr[$i]['video']);
            if($ifVIDEO){
                return '视频';
            }else{
                return '';
            }
        }
    $name = $_POST['name'];
    $arr = $data[$id];
    $PubObj = null;
    for($i = 0;$i < count($arr);$i ++){
        global $name;
        if($arr[$i]['name'] === $name ){
            global $PubObj;
            $arr[$i]['key'] = 'true';
            $arr[$i]['delete'] = 'false';
            $PubObj = $arr[$i];
        }
    }
    $PUB = $_POST['PUB'];

    if($PUB == 'true'){
        global $arr;
        for($i = 0;$i < count($arr);$i ++){
            if($arr[$i]['key'] === 'false'){
                echo ' <li class="str-li">
                            <span class="iemp">'.video().'</span>
                            <span class="itm na-ap">'.$arr[$i]['name'].'</span>
                            <span class="itm myTime">'.$arr[$i]['setTime'].'</span>
                            <span class="itm Myname">'.$arr[$i]['myName'].'</span>
                            <div class="itm li-box">
                                <span class="itm-k" onclick="on.ajax_Rq(this)">编辑</span>
                                <span class="itm-k" onclick="on.foEnt(this)">删除</span>
                                <span class="itm-k" onclick="on.preview(this)">预览</span>
                                <span class="itm-k" onclick="on.pubLish(this)">发布</span>
                            </div>
                        </li>';
            }
        }
    }
    //修改文件数据
    $data[$id] = $arr;
    $data = json_encode($data);
    file_put_contents("Draft.json",$data);
    //将匹配的数据复制到目标文件
    array_push($Data,$PubObj);
    $PubData = json_encode($Data);
    file_put_contents("Publish.json",$PubData);
    
?>
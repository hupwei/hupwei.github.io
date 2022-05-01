<?php 
    header('content-type:text/html;charset=utf-8');
    // $Draft = array(
    //     '56587sd124ds6656s896d5' => 
    //     array(
    //         "哒学长题目" => 
    //             array(
    //                 'id' => '56587sd124ds6656s896d5',
    //                 'setTime' => '2022/02/08', 
    //                 'name' => '哒文章题目',
    //                 'myName' => '哒学长',
    //                 'data_num' => 0,
    //                 'text_num' => 0,
    //                 'key' => false,
    //                 'data' => ''
    //             )
    //         )
    // );
    /***
     * 
     * Array
            (
                [file-video] => Array
                    (
                        [name] => 384452.mp4
                        [type] => 
                        [tmp_name] => 
                        [error] => 1
                        [size] => 0
                    )

            )
     */
    function getNonce(){ //生成随机16位数
        $str = 'abcdefghijklmnopqrstuvwsyz0123456789';
        $nonstr = '';
        for($i=0;$i<16;$i++){
            $nonstr .= substr($str,mt_rand(0,(strlen($str)-1)),1);
        }
        return $nonstr;
    }
    // 获取数据文件
    $DQ = file_get_contents('Draft.json');
    $data = json_decode($DQ,true);
    $id = $_POST["id"];
    // 判断前端是否有id存在
    if($id === ''){
        global $id;
        $id = getNonce();
        echo $id;
    }
            
    // }
    // 获取前台数据
        if(isset($data[$id])){
            global $arr;
            $arr = $data[$id];
            //判断数据中是否存在
            for($i = 0;$i < count($arr);$i++){
                if($arr[$i]['name'] == $_POST['name']){
                global $arr;
                    $arr[$i] = $_POST;
                global $data;
                global $id;
                    $data[$id] = $arr;
                    $data = json_encode($data);
                    file_put_contents("Draft.json",$data);
                    return;
                }
            }
        }else{
            global $arr;
            $arr = array();
        }
        
        array_push($arr,$_POST);
        $data[$id] = $arr;
    // 修改数据
        $data = json_encode($data);
        file_put_contents("Draft.json",$data);
        

?>
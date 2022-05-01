<?php 
    header('content-type:text/html;charset=utf-8');
    // 获取数据文件
    $DQ = file_get_contents('Draft.json');
    $data = json_decode($DQ,true);
    //提取数组
    $id = $_POST['id'];
    $arr = $data[$id];

    $file = $_FILES['file0'];
    print_r($_FILES);
    $video = preg_match('/^video/i',$file['type']);
    $name = substr($file['type'],6);
   

    

    
    if($video){//视频
        $lisName = $_POST['video'];
        move_uploaded_file($file['tmp_name'],'./video/'.$lisName);
        global $arr;
        for($i = 0;$i < count($arr);$i++){
            if(isset($arr[$i]['video'])){
                if($arr[$i]['video'] == $lisName){
                global $lisName;
                global $data;
                global $id;
                $arr[$i]['videoData'] = './video/'.$lisName;
                //修改文件数据
                $data[$id] = $arr;
                $data = json_encode($data);
                file_put_contents("Draft.json",$data);
                }
            }
            
        }

    }else{
        $fileArr = $_FILES;
        $lisName = $_POST['image'];
        $nameArr= explode(',',$lisName);
        for($i = 0;$i < count($fileArr);$i++){
            move_uploaded_file($fileArr['file'.$i]['tmp_name'],'./image/'.$_POST['name'.$i]);
        }

        global $arr;
        for($i = 0;$i < count($arr);$i++){
            if(isset($arr[$i]['image'])){
                if($arr[$i]['image'] == $lisName){
                    global $arr;
                    global $data;
                    global $id;
                    $arr[$i]['imageData'] = $nameArr;
                    //修改文件数据
                    $data[$id] = $arr;
                    $data = json_encode($data);
                    file_put_contents("Draft.json",$data);
                }
            }
        }
    }

?>
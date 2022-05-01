<?php
    header('content-type:text/html;charset=utf-8');
    // 获取数据文件
        $DQ = file_get_contents('Draft.json');
        $data = json_decode($DQ,true);
        $id = $_GET['id'];//保存id
        $arr = array();
        function video(){
            global $i;
            global $arr;
            $ifVIDEO = isset($arr[$i]['video']);
            if($ifVIDEO){
                return '▶';
            }else{
                return '';
            }
        }
    // 网页HTML
    if($_GET['nameType'] == 'article'){
        echo '<div class="control">
                <textarea class="title-h" cols="15" onkeyup="on.prochange(this)" placeholder="请输入标题（30字内）"></textarea>
                <span class="alter none">超出字符字数！</span>
                <span class="widget" onclick="on.click_p()">段落</span>
                <span class="widget" onclick="on.click_img()">图片</span> 
            </div>
            <div class="cont-text">
                <span class="num">0</span>
                <ul class="text">
                    <li class="text-p">
                        <textarea class="inpt" onkeyup="on.change(this)" placeholder="请输入段落">
                        </textarea>
                        <div class="div-text"></div>
                        <span class="close" onclick="on.click(this)">×</span>
                    </li>
                </ul>
            </div>';
    }else if($_GET['nameType'] == 'movies'){
        echo '<div class="control">
                <textarea class="title-h" cols="15" onkeyup="on.prochange(this)" placeholder="请输入标题（30字内）"></textarea>
                <span class="alter none">超出字符字数！</span>
            </div>
            <div class="cont-text">
                <div class="div-video"></div>
                <input class="video-L" onchange="on.seletVd(this)" type="file" name="file-video" enctype="multipart/form-data" />
                <video class="video-N none" controls="true" src=""></video>
                <span class="close" onclick="on.click(this)">×</span>
                <span class="proposal">建议尺寸 1280*720</span>
            </div>';
    }else if($_GET['nameType'] == 'create'){
        echo '<div class="selet-z">
                <div class="work-but">
                    <span class="work-tle">发布文章</span>
                    <span class="work-ico" onclick="on.ajax_Rq('."'".'article'."'".')"></span>
                </div>
                <div class="work-but">
                    <span class="work-tle">发布视频</span>
                    <span class="work-ico" onclick="on.ajax_Rq('."'".'movies'."'".')"></span>
                </div>
            </div>';
    }else if($_GET['nameType'] == 'works'){
        global $data;
        global $id;
        
        if(isset($data[$id])){
            global $arr;
            $arr = $data[$id];//获取唯一id数据
            echo '<div class="short-storage">
                    <span class="ip-name">草稿箱</span>
                    <div class="herder">
                        <span class="itm">标题</span>
                        <span class="itm">时间</span>
                        <span class="itm">作者</span>
                        <span class="itm">执行操作</span>
                    </div>
                    <ul class="storage">';
            
            for($i = 0;$i < count($arr);$i++){
                global $arr;
                if($arr[$i]['key'] === 'false' && $arr[$i]['delete'] === 'false'){
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

            
            echo    '</ul>
                <div class="MMfo none">
                    <div class="foEnt">
                        <h3 class="foEnt-tile">正在执行删除</h3>
                        <span class="foEnt-name"></span>
                        <div class="dtive">
                            <span onclick="on.foEnt(this)">取消</span>
                            <span onclick="on.foEnt(this)">确认</span>
                        </div>
                    </div>
                <div>
                </div>';
        }else{
            echo '<div class="short-storage">
                    <span class="ip-name">草稿箱</span>
                    <div class="herder">
                        <span class="itm">标题</span>
                        <span class="itm">时间</span>
                        <span class="itm">作者</span>
                        <span class="itm">执行操作</span>
                    </div>
                    <ul class="storage">
                        <li class="str-li">
                            <span class="itm na-ap">怎样养成三个好习惯...</span>
                            <span class="itm myTime">2022/02/07</span>
                            <span class="itm Myname">哒学长</span>
                            <div class="itm li-box">
                                <span class="itm-k">编辑</span>
                                <span class="itm-k">删除</span>
                                <span class="itm-k">预览</span>
                                <span class="itm-k">发布</span>
                            </div>
                        </li>
                    </ul>
                </div>';
        }
    }else if($_GET['nameType'] == 'edit'){
        global $arr;
        $arr = $data[$id];
        for($i = 0;$i < count($arr);$i++){
            global $arr;
            global $id;
            if($arr[$i]['name'] == $_GET['nameTitle']){
                global $arr;
                echo json_encode($arr[$i]);
            }
        }
    }else if($_GET['nameType'] == 'delet'){
        global $arr;
        $arr = $data[$id];
        for($i = 0;$i < count($arr);$i++){
            global $arr;
            global $id;
            if($arr[$i]['name'] == $_GET['nameTitle']){
                //移动文件
                if(isset($arr[$i]['video'])){
                    rename('./video/'.$arr[$i]['video'],'./delet/'.$arr[$i]['video']);
                }else{
                    
                    global $arr;
                    if(isset($arr[$i]['imageData'])){
                        $arrImg = $arr[$i]['imageData'];
                        for($j = 0;$j < count($arrImg);$j++){
                            rename('./image/'.$arrImg[$j],'./delet/'.$arrImg[$j]);
                        }
                    }
                }
                global $arr;
                array_splice($arr,$i,1);
                //修改文件数据
                $data[$id] = $arr;
                $data = json_encode($data);
                file_put_contents("Draft.json",$data);
                
                echo '<div class="short-storage">
                    <span class="ip-name">草稿箱</span>
                    <div class="herder">
                        <span class="itm">标题</span>
                        <span class="itm">时间</span>
                        <span class="itm">作者</span>
                        <span class="itm">执行操作</span>
                    </div>
                    <ul class="storage">';
                for($i = 0;$i < count($arr);$i++){
                    global $arr;
                    if($arr[$i]['key'] == 'false'){
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
                echo    '</ul>
                <div class="MMfo none">
                    <div class="foEnt">
                        <h3 class="foEnt-tile">正在执行删除</h3>
                        <span class="foEnt-name"></span>
                        <div class="dtive">
                            <span onclick="on.foEnt(this)">取消</span>
                            <span onclick="on.foEnt(this)">确认</span>
                        </div>
                    </div>
                <div>
                </div>';
            }
        }
        //获取数据文件
        $PL = file_get_contents('Publish.json');
        $Data = json_decode($PL,true);
        global $id;
        for($j = 0;$j < count($Data);$j ++){
            if($Data[$j]['id'] === $id && $Data[$j]['name'] === $_GET['nameTitle']){
                $Data[$j]['delete'] = 'true';
            }
        }
        $PubData = json_encode($Data);
        file_put_contents("Publish.json",$PubData);
    }else if($_GET['nameType'] == 'preview'){
        global $id;
        global $arr;
        global $data;
        $key_TF = false;
        $num;
        $preData;
        $arr = $data[$id];
        for($i = 0;$i < count($arr);$i++){
            global $arr;
            if($arr[$i]['name'] == $_GET['Name']){
               if(isset($arr[$i]['video'])){
                   global $key_TF;
                   $key_TF = true;
                   global $arr;
                   global $preData;
                   $preData = $arr[$i]['preData'];
               }else{
                   global $key_TF;
                   $key_TF = false;
                   global $num;
                   global $arr;
                   global $preData;
                   $num = $arr[$i]['num'];
                   $preData = $arr[$i]['preData'];
               } 
            }
        }
        if($key_TF){      //视频
            global $preData;
            echo $preData;
        }else{            //文档
                global $num;
                global $preData;
                echo '<div class="detail">
                <div class="title">
                    <span class="author">作者:</span>
                    <span class="Name">'.$_GET['myName'].'</span>
                    <span class="lisTime">'.$_GET['Time'].'</span>
                </div>
                <div class="num">
                    <div class="numWords">
                        <span>字数:</span>
                        <span>'.$num.'</span>
                    </div>
                    <div class="read">
                        <span>阅读量/</span>
                        <span class="readNum">0</span>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title-t">'.$_GET['Name'].'</h1>
                    <ul class="text">'
                        .$preData.
                    '</ul>
                </div>
                <div class="tag">
                    <span>哒学长</span>
                </div>
                </div>';
        }
        
    }else if($_GET['nameType'] == 'Pub'){
        function videoPro(){
            global $i;
            global $arrPro;
            $ifVIDEO = isset($arrPro[$i]['video']);
            if($ifVIDEO){
                return '▶';
            }else{
                return '';
            }
        }
        //获取数据文件
        $PL = file_get_contents('Publish.json');
        $Data = json_decode($PL,true);
        for($i = 0;$i < count($Data);$i++){
            global $id;
            global $arr;
            if($Data[$i]['id'] === $id && $Data[$i]['delete'] === 'false' && $Data[$i]['key'] === 'true'){
                array_push($arr,$Data[$i]);
            }
        }
        //获取已发布文件
        $GL = file_get_contents('Global_Library.json');
        $GData = json_decode($GL,true);
        $arrPro = array();
        for($i = 0;$i < count($GData);$i ++){
            global $id;
            if($GData[$i]['id'] === $id && $GData[$i]['delete'] === 'false' && $GData[$i]['key'] === 'true'){
                array_push($arrPro,$GData[$i]);
            }
        }
        //$arr数组装满了用户数据
        for($i = 0;$i < count($arr);$i++){
            echo '<li class="wo-li" onclick="on.query(this)">
                        <span class="imp-i">'.video().'</span>
                        <span class="pub-name">'.$arr[$i]['name'].'</span>
                        <span class="pub-type">待审</span>
                    </li>';
        }
        for($i = 0;$i < count($arrPro);$i++){
            echo '<li class="wo-li" onclick="on.query(this)">
                        <span class="imp-i">'.videoPro().'</span>
                        <span class="pub-name">'.$arrPro[$i]['name'].'</span>
                        <span class="pub-type"></span>
                    </li>';
        }
    }else if($_GET['nameType'] == 'getName'){
        $disabledOff = 'disabled';
        //获取数据文件
        $PL = file_get_contents('Publish.json');
        $Data = json_decode($PL,true);
        
        for($i = 0;$i < count($Data);$i++){
            global $id;
            global $arr;
            if($Data[$i]['id'] === $id 
            && $Data[$i]['delete'] === 'false' 
            && $Data[$i]['key'] === 'true'
            && $Data[$i]['name'] === $_GET['Name']){
                $arr = $Data[$i];
            }
        }
        global $arr;
        if(count($arr) === 0){
            $disabledOff = '';
            // 获取数据文件
            $GL = file_get_contents('Global_Library.json');
            $GData = json_decode($GL,true);
            for($i = 0;$i < count($GData);$i++){
                global $id;
                global $arr;
                if($GData[$i]['id'] === $id 
                && $GData[$i]['delete'] === 'false' 
                && $GData[$i]['key'] === 'true'
                && $GData[$i]['name'] === $_GET['Name']){
                    $arr = $GData[$i];
                }
            
        }
        }
        global $arr;
        if(isset($arr['video'])){
            echo '<div class="formText">
                <div class="fText-h">
                    <ul class="fText-ul">
                        <li class="fText-li">
                            <span class="fText-time">创立时间：</span>
                            <span class="time-value">'.$arr['setTime'].'</span>
                        </li>
                        <li class="fText-li">
                            <span class="fText-name">作者：</span>
                            <span class="name-value">'.$arr['myName'].'</span>
                        </li>
                        <li class="fText-li">
                            <span class="fText-num">字数：</span>
                            <span class="num-value">'.$arr['num'].'</span>
                        </li>
                        <li class="fText-li">
                            <span class="fText-umber">个人版本号：</span>
                            <span class="number-value">'.$arr['id'].'</span>
                        </li>
                    </ul>
                    <div class="formNum">
                        <span class="fNum">'.$arr['ViewVolume'].'</span>
                        <span class="fbrowse">浏览</span>
                    </div>
                </div>
                <div class="fr-preview">
                '.$arr['preData'].'
                </div>
                <div class="fr-but">
                    <span class="shelf '.$disabledOff.'" onclick="on.shelf('."'".$arr['name']."'".')">下架</span>
                    <span class="pre">预览</span>
                </div>
            </div>';
        }else{
        echo '<div class="formText">
                <div class="fText-h">
                    <ul class="fText-ul">
                        <li class="fText-li">
                            <span class="fText-time">创立时间：</span>
                            <span class="time-value">'.$arr['setTime'].'</span>
                        </li>
                        <li class="fText-li">
                            <span class="fText-name">作者：</span>
                            <span class="name-value">'.$arr['myName'].'</span>
                        </li>
                        <li class="fText-li">
                            <span class="fText-num">字数：</span>
                            <span class="num-value">'.$arr['num'].'</span>
                        </li>
                        <li class="fText-li">
                            <span class="fText-umber">个人版本号：</span>
                            <span class="number-value">'.$arr['id'].'</span>
                        </li>
                    </ul>
                    <div class="formNum">
                        <span class="fNum">'.$arr['ViewVolume'].'</span>
                        <span class="fbrowse">浏览</span>
                    </div>
                </div>
                <div class="fr-preview">
                    <div class="detail">
                        <div class="title">
                            <span class="author">作者:</span>
                            <span class="Name">'.$arr['myName'].'</span>
                            <span class="lisTime">'.$arr['setTime'].'</span>
                        </div>
                        <div class="num">
                            <div class="numWords">
                                <span>字数:</span>
                                <span>'.$arr['num'].'</span>
                            </div>
                            <div class="read">
                                <span>阅读量/</span>
                                <span class="readNum">0</span>
                            </div>
                        </div>
                        <div class="content">
                            <h1 class="title-t">'.$arr['name'].'</h1>
                            <ul class="text">'
                                .$arr['preData'].
                            '</ul>
                        </div>
                        <div class="tag">
                            <span>哒学长</span>
                        </div>
                        </div>
                </div>
                <div class="fr-but">
                    <span class="shelf '.$disabledOff.'" onclick="on.shelf('."'".$arr['name']."'".')">下架</span>
                    <span class="pre">预览</span>
                </div>
            </div>';
    
        }
    }else if($_GET['nameType'] == 'shelf'){
        // 获取数据文件
        $GL = file_get_contents('Global_Library.json');
        $GData = json_decode($GL,true);
        for($i = 0;$i < count($GData);$i++){
            global $id;
            if($GData[$i]['id'] === $id
            && $GData[$i]['delete'] === 'false' 
            && $GData[$i]['key'] === 'true'
            && $GData[$i]['name'] === $_GET['Name']){
                $GData[$i]['key'] = 'false';
                $GData[$i]['delete'] = 'true';
            }
        }
        // 修改数据文件
        $GData = json_encode($GData);
        file_put_contents("Global_Library.json",$GData);
        //修改草稿文件
        global $id;
        global $arr;
        $arr = $data[$id];
        for($i = 0;$i < count($arr);$i++){
            global $id;
            global $arr;
            if($arr[$i]['id'] === $id
            && $arr[$i]['delete'] === 'false' 
            && $arr[$i]['key'] === 'true'
            && $arr[$i]['name'] === $_GET['Name']){
                $arr[$i]['key'] = 'false';
            }
        }
        $data[$id] = $arr;
        $data = json_encode($data);
        file_put_contents("Draft.json",$data);
    }
?>
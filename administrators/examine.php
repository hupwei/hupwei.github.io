<?php
    header('content-type:text/html;charset=utf-8');
    // 获取数据文件
        $Pb = file_get_contents('../temporary_storage/Publish.json');
        $arr = json_decode($Pb,true);
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
    if($_POST['getType'] === 'getPublish'){
        global $arr;
        echo '<span class="view-name">文章信息管理</span>
                <div class="view-tle">
                    <span class="na-item">标题</span>
                    <span class="na-item">时间</span>
                    <span class="na-item">作者</span>
                    <span class="na-item">状态</span>
                    <span class="na-item">执行操作</span>
                </div>
                <ul class="news">';
        for($i = 0;$i < count($arr); $i++){
            if($arr[$i]['key'] === 'true' && $arr[$i]['delete'] === 'false'){
                global $arr;
                echo '<li class="news-li">
                                <span class="iemp">'.video().'</span>
                                <span class="itm na-ap">'.$arr[$i]['name'].'</span>
                                <span class="itm myTime">'.$arr[$i]['setTime'].'</span>
                                <span class="itm Myname">'.$arr[$i]['myName'].'</span>
                                <div class="itm li-box">
                                    <span class="itm-k">待审</span>
                                    <span class="itm-k" onclick="fn.preview(this)">预览</span>
                                </div>
                                <div class="itm li-box">
                                    <span class="itm-k" onclick="fn.repulse(this)">作品打回</span>
                                    <span class="itm-k" onclick="fn.adopt(this)">审核通过</span>
                                </div>
                                <div class="itemID">'.$arr[$i]['id'].'</div>
                        </li>';
            }
        }
        echo '</ul>';
    }else if($_POST['getType'] === 'getPreview'){
        global $arr;
        for($i = 0;$i < count($arr); $i++){
            if($arr[$i]['id'] === $_POST['id'] 
            && $arr[$i]['name'] === $_POST['Name'] 
            && $arr[$i]['key'] === 'true'
            && $arr[$i]['delete'] === 'false'){
                if(isset($arr[$i]['video'])){
                    global $arr;
                    global $i;
                    echo $arr[$i]['preData'];
                }else{
                    global $arr;
                    global $i;
                    echo '<div class="detail">
                        <div class="title">
                            <span class="author">作者:</span>
                            <span class="Name">'.$arr[$i]['myName'].'</span>
                            <span class="lisTime">'.$arr[$i]['setTime'].'</span>
                        </div>
                        <div class="num">
                            <div class="numWords">
                                <span>字数:</span>
                                <span>'.$arr[$i]['num'].'</span>
                            </div>
                            <div class="read">
                                <span>阅读量/</span>
                                <span class="readNum">'.$arr[$i]['ViewVolume'].'</span>
                            </div>
                        </div>
                        <div class="content">
                            <h1 class="title-t">'.$arr[$i]['name'].'</h1>
                            <ul class="text">'
                                .$arr[$i]['preData'].
                            '</ul>
                        </div>
                        <div class="tag">
                            <span>哒学长</span>
                        </div>
                        </div>';
                }
            }
        }
    }else if($_POST['getType'] === 'getPreve'){
        // 获取数据文件
        $GL = file_get_contents('../temporary_storage/Global_Library.json');
        $arrGl = json_decode($GL,true);
        for($i = 0;$i < count($arrGl); $i++){
            if($arrGl[$i]['id'] === $_POST['id'] 
            && $arrGl[$i]['name'] === $_POST['Name'] 
            && $arrGl[$i]['key'] === 'true'
            && $arrGl[$i]['delete'] === 'false'){
                if(isset($arrGl[$i]['video'])){
                    global $arrGl;
                    global $i;
                    echo $arrGl[$i]['preData'];
                }else{
                    global $arrGl;
                    global $i;
                    echo '<div class="detail">
                        <div class="title">
                            <span class="author">作者:</span>
                            <span class="Name">'.$arrGl[$i]['myName'].'</span>
                            <span class="lisTime">'.$arrGl[$i]['setTime'].'</span>
                        </div>
                        <div class="num">
                            <div class="numWords">
                                <span>字数:</span>
                                <span>'.$arrGl[$i]['num'].'</span>
                            </div>
                            <div class="read">
                                <span>阅读量/</span>
                                <span class="readNum">'.$arrGl[$i]['ViewVolume'].'</span>
                            </div>
                        </div>
                        <div class="content">
                            <h1 class="title-t">'.$arrGl[$i]['name'].'</h1>
                            <ul class="text">'
                                .$arrGl[$i]['preData'].
                            '</ul>
                        </div>
                        <div class="tag">
                            <span>哒学长</span>
                        </div>
                        </div>';
                }
            }
        }
    }else if($_POST['getType'] === 'repulse'){
        //获取数据
        $DQ = file_get_contents('../temporary_storage/Draft.json');
        $data = json_decode($DQ,true);
        $arr_Dr = $data[$_POST['id']];
        global $arr;
        for($i = 0;$i < count($arr); $i++){
            if($arr[$i]['id'] === $_POST['id'] 
            && $arr[$i]['name'] === $_POST['Name'] 
            && $arr[$i]['key'] === 'true'
            && $arr[$i]['delete'] === 'false'){
                $arr[$i]['key'] = 'false';
                $arr[$i]['delete'] = 'true';
            } 
        }
        for($i = 0;$i < count($arr_Dr); $i++){
            if($arr_Dr[$i]['name'] === $_POST['Name']){
                $arr_Dr[$i]['key'] = 'false';
            }
        }
        //修改文件数据
        $data[$_POST['id']] = $arr_Dr;
        $data = json_encode($data);
        file_put_contents("../temporary_storage/Draft.json",$data);

        $arr = json_encode($arr);
        file_put_contents("../temporary_storage/Publish.json",$arr);

    }else if($_POST['getType'] === 'adopt'){
        // 获取数据文件
        $GL = file_get_contents('../temporary_storage/Global_Library.json');
        $Arr = json_decode($GL,true);
        global $arr;
        $obj = null;
        for($i = 0;$i < count($arr); $i++){
            if($arr[$i]['id'] === $_POST['id'] 
            && $arr[$i]['name'] === $_POST['Name'] 
            && $arr[$i]['key'] === 'true'
            && $arr[$i]['delete'] === 'false'){
                $obj = $arr[$i];
                $arr[$i]['key'] = 'false';
                $arr[$i]['delete'] = 'true';
            }
        }
        array_push($Arr,$obj);
        //修改文件
        $arr = json_encode($arr);
        file_put_contents("../temporary_storage/Publish.json",$arr);

        $Arr = json_encode($Arr);
        file_put_contents("../temporary_storage/Global_Library.json",$Arr);
    }else if($_POST['getType'] === 'notice'){
        // 获取数据文件
        $NO = file_get_contents('./notice.json');
        $arrNo = json_decode($NO,true);
        
        $obj = array();
        $obj['time'] = $_POST['time'];
        $obj['content'] = $_POST['valueSrc'];
        array_unshift($arrNo,$obj);
        //修改文件
        $arrNo = json_encode($arrNo);
        file_put_contents("./notice.json",$arrNo);
    }else if($_POST['getType'] === 'history'){
        echo '<div class="history">
                <ul class="history-ul">';
                    // 获取数据文件
                    $NO = file_get_contents('./notice.json');
                    $arrNo = json_decode($NO,true);
                    for($i = 0;$i < count($arrNo);$i++){
                        echo '
                        <li class="history-li">
                            <span class="hsry-span">'.$arrNo[$i]['time'].'</span>
                            <span class="hsry-span">'.$arrNo[$i]['content'].'</span>
                        </li>';
                        
                    }
                
                    

        echo'   </ul>
            </div>';
    }else if($_POST['getType'] === 'content'){
        // 获取数据文件
        $GL = file_get_contents('../temporary_storage/Global_Library.json');
        $arrGl = json_decode($GL,true);
        echo '<div class="Notice">
        <div class="Subtitle">
            <span class="Notice-title aColr" onclick="fn.check(this)">文章管理</span>
            <span class="Notice-title" onclick="fn.check(this)">视频管理</span>
            <span class="Notice-title" onclick="fn.check(this)">数据清理</span>
        </div>
        <div class="lookup">
            <span class="up-name">搜索：</span>
            <select class="up-select">
                <option value="all">全部</option>
                <option value="image">文章</option>
                <option value="video">视频</option>
            </select>
            <span class="up-name">作品名称：</span>
            <input class="up-inpt" placeholder="请输入名称"/>
            <span class="up-implement" onclick="fn.seek(this)">查找</span>
            <span class="up-article" onclick="fn.whole()">所有文章</span>
        </div>
        <div class="delet none">
            <span class="del del-dra" onclick="fn.delet(this)">草稿清理</span>
            <span class="del del-pub" onclick="fn.delet(this)">审核清理</span>
            <span class="del del-GL" onclick="fn.delet(this)">发布清理</span>
        </div>
        <div class="Not-conter">
            <div class="Header">
                <span class="dar-title">标题</span>
                <span class="dar-title">作者</span>
                <span class="dar-title">时间</span>
                <span class="dar-title">浏览量</span>
                <span class="dar-title">单操作执行</span>
            </div>
            <ul class="surface">';
        for($i = 0;$i < count($arrGl); $i ++){
            if(!isset($arrGl[$i]['video'])){
                if($arrGl[$i]['key'] === 'true' && $arrGl[$i]['delete'] === 'false'){
                    echo '<li class="sur-li">
                        <span class="sur-item na-ap">'.$arrGl[$i]['name'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['myName'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['setTime'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['ViewVolume'].'</span>
                        <div class="sur-item">
                            <span class="item-Pro See" onclick="fn.preve(this)">预览</span>
                            <span class="item-Pro" onclick="fn.offShelf(this)">下架</span>
                        </div>
                        <div class="itemID">'.$arrGl[$i]['id'].'</div>
                    </li>';
                }
            }
        }
            
        echo '</ul>
        </div>
        </div>';
    }else if($_POST['getType'] === 'article'){
        // 获取数据文件
        $GL = file_get_contents('../temporary_storage/Global_Library.json');
        $arrGl = json_decode($GL,true);
        echo '<div class="Header">
                <span class="dar-title">标题</span>
                <span class="dar-title">作者</span>
                <span class="dar-title">时间</span>
                <span class="dar-title">浏览量</span>
                <span class="dar-title">单操作执行</span>
            </div>
            <ul class="surface">';
        for($i = 0;$i < count($arrGl); $i ++){
            if(!isset($arrGl[$i]['video'])){
                if($arrGl[$i]['key'] === 'true' && $arrGl[$i]['delete'] === 'false'){
                    echo '<li class="sur-li">
                        <span class="sur-item na-ap">'.$arrGl[$i]['name'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['myName'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['setTime'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['ViewVolume'].'</span>
                        <div class="sur-item">
                            <span class="item-Pro See" onclick="fn.preve(this)">预览</span>
                            <span class="item-Pro" onclick="fn.offShelf(this)">下架</span>
                        </div>
                        <div class="itemID">'.$arrGl[$i]['id'].'</div>
                    </li>';
                }
            }
        }
         echo '</ul>
        </div>';
    }else if($_POST['getType'] === 'video'){
        // 获取数据文件
        $GL = file_get_contents('../temporary_storage/Global_Library.json');
        $arrGl = json_decode($GL,true);
        echo '<div class="Header">
                <span class="dar-title">标题</span>
                <span class="dar-title">作者</span>
                <span class="dar-title">时间</span>
                <span class="dar-title">浏览量</span>
                <span class="dar-title">单操作执行</span>
            </div>
            <ul class="surface">';
        for($i = 0;$i < count($arrGl); $i ++){
            if(isset($arrGl[$i]['video'])){
                if($arrGl[$i]['key'] === 'true' && $arrGl[$i]['delete'] === 'false'){
                    echo '<li class="sur-li">
                        <span class="sur-item na-ap">'.$arrGl[$i]['name'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['myName'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['setTime'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['ViewVolume'].'</span>
                        <div class="sur-item">
                            <span class="item-Pro See" onclick="fn.preve(this)">预览</span>
                            <span class="item-Pro" onclick="fn.offShelf(this)">下架</span>
                        </div>
                        <div class="itemID">'.$arrGl[$i]['id'].'</div>
                    </li>';
                }
            }
        }
         echo '</ul>
        </div>';
    }else if($_POST['getType'] === 'alldata'){
        // 获取数据文件
        $GL = file_get_contents('../temporary_storage/Global_Library.json');
        $arrGl = json_decode($GL,true);
        echo '<div class="Header">
                <span class="dar-title">标题</span>
                <span class="dar-title">作者</span>
                <span class="dar-title">时间</span>
                <span class="dar-title">浏览量</span>
                <span class="dar-title">单操作执行</span>
            </div>
            <ul class="surface">';
        for($i = 0;$i < count($arrGl); $i++){
            if($arrGl[$i]['key'] === 'true' && $arrGl[$i]['delete'] === 'false'){
                    echo '<li class="sur-li">
                        <span class="sur-item na-ap">'.$arrGl[$i]['name'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['myName'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['setTime'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['ViewVolume'].'</span>
                        <div class="sur-item">
                            <span class="item-Pro See" onclick="fn.preve(this)">预览</span>
                            <span class="item-Pro" onclick="fn.offShelf(this)">下架</span>
                        </div>
                        <div class="itemID">'.$arrGl[$i]['id'].'</div>
                    </li>';
                }
        }
    }else if($_POST['getType'] === 'seek'){
        // 获取数据文件
        $GL = file_get_contents('../temporary_storage/Global_Library.json');
        $arrGl = json_decode($GL,true);
        echo '<div class="Header">
                <span class="dar-title">标题</span>
                <span class="dar-title">作者</span>
                <span class="dar-title">时间</span>
                <span class="dar-title">浏览量</span>
                <span class="dar-title">单操作执行</span>
            </div>
            <ul class="surface">';
        if($_POST['type'] === 'all'){
            for($i = 0;$i < count($arrGl); $i ++){
                $ifeve = is_numeric(stripos($arrGl[$i]['name'],$_POST['name']));
                if($arrGl[$i]['key'] === 'true' && $arrGl[$i]['delete'] === 'false' && $ifeve){
                        echo '<li class="sur-li">
                        <span class="sur-item na-ap">'.$arrGl[$i]['name'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['myName'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['setTime'].'</span>
                        <span class="sur-item">'.$arrGl[$i]['ViewVolume'].'</span>
                        <div class="sur-item">
                            <span class="item-Pro See" onclick="fn.preve(this)">预览</span>
                            <span class="item-Pro" onclick="fn.offShelf(this)">下架</span>
                        </div>
                        <div class="itemID">'.$arrGl[$i]['id'].'</div>
                        </li>';
                }
            }
        }else if($_POST['type'] === 'image'){
            for($i = 0;$i < count($arrGl); $i ++){
                if(!isset($arrGl[$i]['video'])){
                    $ifeve = is_numeric(stripos($arrGl[$i]['name'],$_POST['name']));
                    if($arrGl[$i]['key'] === 'true' && $arrGl[$i]['delete'] === 'false' && $ifeve){
                        echo '<li class="sur-li">
                            <span class="sur-item na-ap">'.$arrGl[$i]['name'].'</span>
                            <span class="sur-item">'.$arrGl[$i]['myName'].'</span>
                            <span class="sur-item">'.$arrGl[$i]['setTime'].'</span>
                            <span class="sur-item">'.$arrGl[$i]['ViewVolume'].'</span>
                            <div class="sur-item">
                            <span class="item-Pro See" onclick="fn.preve(this)">预览</span>
                            <span class="item-Pro" onclick="fn.offShelf(this)">下架</span>
                            </div>
                            <div class="itemID">'.$arrGl[$i]['id'].'</div>
                        </li>';
                    }
                }
            }
        }else if($_POST['type'] === 'video'){
            for($i = 0;$i < count($arrGl); $i ++){
                if(isset($arrGl[$i]['video'])){
                    $ifeve = is_numeric(stripos($arrGl[$i]['name'],$_POST['name']));
                    if($arrGl[$i]['key'] === 'true' && $arrGl[$i]['delete'] === 'false' && $ifeve){
                        echo '<li class="sur-li">
                            <span class="sur-item na-ap">'.$arrGl[$i]['name'].'</span>
                            <span class="sur-item">'.$arrGl[$i]['myName'].'</span>
                            <span class="sur-item">'.$arrGl[$i]['setTime'].'</span>
                            <span class="sur-item">'.$arrGl[$i]['ViewVolume'].'</span>
                            <div class="sur-item">
                            <span class="item-Pro See" onclick="fn.preve(this)">预览</span>
                            <span class="item-Pro" onclick="fn.offShelf(this)">下架</span>
                            </div>
                            <div class="itemID">'.$arrGl[$i]['id'].'</div>
                        </li>';
                    }
                }
            }
        }
        echo '</ul>';
    }else if($_POST['getType'] === 'offShelf'){
        // 获取数据文件
        $GL = file_get_contents('../temporary_storage/Global_Library.json');
        $arrGl = json_decode($GL,true);
        for($i = 0;$i < count($arrGl); $i++){
            if($arrGl[$i]['id'] === $_POST['id'] 
            && $arrGl[$i]['name'] === $_POST['Name'] 
            && $arrGl[$i]['key'] === 'true'
            && $arrGl[$i]['delete'] === 'false'){
                $arrGl[$i]['delete'] = 'true';
                $arrGl[$i]['key'] = 'false';
            }
        }
        echo '<div class="Header">
                <span class="dar-title">标题</span>
                <span class="dar-title">作者</span>
                <span class="dar-title">时间</span>
                <span class="dar-title">浏览量</span>
                <span class="dar-title">单操作执行</span>
            </div>
            <ul class="surface">';
            echo '';
        for($i = 0;$i < count($arrGl); $i ++){
            if($arrGl[$i]['key'] === 'true' && $arrGl[$i]['delete'] === 'false'){
                    echo '<li class="sur-li">
                    <span class="sur-item na-ap">'.$arrGl[$i]['name'].'</span>
                    <span class="sur-item">'.$arrGl[$i]['myName'].'</span>
                    <span class="sur-item">'.$arrGl[$i]['setTime'].'</span>
                    <span class="sur-item">'.$arrGl[$i]['ViewVolume'].'</span>
                    <div class="sur-item">
                        <span class="item-Pro See" onclick="fn.preve(this)">预览</span>
                        <span class="item-Pro" onclick="fn.offShelf(this)">下架</span>
                    </div>
                    <div class="itemID">'.$arrGl[$i]['id'].'</div>
                    </li>';
            }
        }
        echo '</ul>';
        // 获取数据文件
        $DR = file_get_contents('../temporary_storage/Draft.json');
        $data = json_decode($DR,true);
        
        $arrDr = $data[$_POST['id']];
        for($i = 0;$i < count($arrDr); $i++){
            if($arrDr[$i]['id'] === $_POST['id'] 
            && $arrDr[$i]['name'] === $_POST['Name'] 
            && $arrDr[$i]['key'] === 'true'
            && $arrDr[$i]['delete'] === 'false'){
                $arrDr[$i]['key'] = 'false';
            }
        }


        //修改文件
        $arrGl = json_encode($arrGl);
        file_put_contents("../temporary_storage/Global_Library.json",$arrGl);

        //修改文件数据
        $data[$_POST['id']] = $arrDr;
        $data = json_encode($data);
        file_put_contents("../temporary_storage/Draft.json",$data);
    }else if($_POST['getType'] === 'delet'){
        if($_POST['category'] === 'Draft'){
            // 获取数据文件
            $DR = file_get_contents('../temporary_storage/Draft.json'); 
            $obj_DR = json_decode($DR,true);
            foreach($obj_DR as $key=>$arr_DR){
                for($i = 0;$i < count($arr_DR);$i++){
                    if($arr_DR[$i]['delete'] === 'true'){
                        global $obj_DR;
                        unset($obj_DR[$key][$i]);
                        
                    }
                }
            }
             //修改文件数据
            $data = json_encode($obj_DR);
            file_put_contents("../temporary_storage/Draft.json",$data);

        }else if($_POST['category'] === 'Publish'){
            $arr_copy = array();
            // 获取数据文件
            $Pb = file_get_contents('../temporary_storage/Publish.json');
            $arr_Pb = json_decode($Pb,true);
            for($i = 0;$i < count($arr_Pb);$i++){
                if($arr_Pb[$i]['delete'] === 'false'){
                    array_push($arr_copy,$arr_Pb[$i]);
                }
            }
            //修改文件
            $arr_copy = json_encode($arr_copy);
            file_put_contents("../temporary_storage/Publish.json",$arr_copy);
        }else if($_POST['category'] === 'global'){
            // 获取数据文件
            $arr_copy = array();
            $GL = file_get_contents('../temporary_storage/Global_Library.json');
            $arr_GL = json_decode($GL,true);
            for($i = 0;$i < count($arr_GL);$i++){
                if($arr_GL[$i]['delete'] === 'false'){
                    array_push($arr_copy,$arr_GL[$i]);
                }
            }
            //修改文件
            $arr_copy = json_encode($arr_copy);
            file_put_contents("../temporary_storage/Global_Library.json",$arr_copy);
        }
    }else if($_POST['getType'] === 'quick'){
        // 获取数据文件
        $QI = file_get_contents('./quickInfo.json');
        $arr_QI = json_decode($QI,true);

        $obj = array();
        $obj['eName'] = $_POST['eName'];
        $obj['eText'] = $_POST['eText'];
        array_unshift($arr_QI,$obj);
        //修改文件
        $arr_QI = json_encode($arr_QI);
        file_put_contents("./quickInfo.json",$arr_QI);
    }else if($_POST['getType'] === 'getSrcUrl'){
        //获取数据文件
        $dF = file_get_contents('./docFile.json');
        echo $dF;
    }
?>
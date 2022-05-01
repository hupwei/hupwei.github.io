var fn = (function(){
    // 自动加载高度
    let height = window.innerHeight;
    let supDc = document.getElementsByClassName('superDoc')[0];
    supDc.style.height = height+'px';
    //获取浏览器缓存id
    let Checksum = localStorage.getItem('Checksum');
    if(!Checksum){
        alert('非法进入');
        document.body.innerHTML = '';
        return;
    }
    //字符处理
    let toUnicode = function(data){
        if(!data){
            alert('执行错误');
            return;
        }
        let str = '';
        for(let i = 0; i < data.length;i ++){
            str += 'u'+parseInt(data[i].charCodeAt()).toString(16); 
        }
        return str;
    }
    let select = function(){ //绑定事件
        let nav_ul = document.getElementsByClassName('nav-ul')[0];
        nav_ul.onclick = function(event){
            var event = event || window.event;
            let tar = event.target;
            let nav_li = document.getElementsByClassName('nav-li');
            for(let i = 0;i < nav_li.length; i++){
                nav_li[i].className = 'nav-li';
            }
            tar.className = 'nav-li bgcolor';
        }
       
    }
    select();
    let examine = function(){   //预加载文件
        ajax_Request({
            type:'post',
            url:'./examine.php',
            data:'getType=getPublish',
            success:function(eventStr){
                let cont_view = document.getElementsByClassName('cont-view')[0];
                cont_view.innerHTML = eventStr;
            }
        })
    }
    examine();//加载审核数据
    let switchElent = function(event){  //分类切换
        let text = event.innerHTML,
        getType = null;
        if(text === '审核文章'){
            getType ='getPublish';
        }else if(text === '公告管理'){
            let cont_view = document.getElementsByClassName('cont-view')[0];
                cont_view.innerHTML = '<div class="Notice">'
                +'<div class="Subtitle">'
                +'<span class="Notice-title" onclick="fn.check(this)">公告发布管理</span>'
                +'<span class="Notice-title" onclick="fn.check(this)">历史公告管理</span>'
                +'</div><div class="Not-conter">'
                +'<span class="tips">在这里可以通知一些关于网站的建议与安全</span>'
                +'<span class="inform">公告：</span>'
                +'<div class="Not-book">'
                +'<textarea class="inpt" onkeyup="fn.textChage(this)" placeholder="请输入内容"></textarea>'
                +'<div class="div-text"></div></div>'
                +'<span class="No-but" onclick="fn.notice()">发布公告</span>'
                +'</div></div>';
            let Notice_title = document.getElementsByClassName('Notice-title');
            Notice_title[0].className = 'Notice-title aColr';
            return;
        }else if(text === '内容管理'){
            getType = 'content';
        }else if(text === '小黑板'){
            let cont_view = document.getElementsByClassName('cont-view')[0];
            ajax_Request({
                type:'post',
                url:'./examine.php',
                data:'getType=getSrcUrl',
                success:function(eventStr){
                    let arrStr = JSON.parse(eventStr);
                    cont_view.innerHTML = '<div class="blackboard">'
                    +'<div class="board-tle">信息介绍</div>'
                    +'<div class="board-content">'
                    +'<div class="boa-le">在这里宣布一些有吸引力的东西吧</div>'
                    +'<div class="boa-name">标题：</div>'
                    +'<input class="inp-name" type="text" placeholder="请输入标题（10字以内）"/>'
                    +'<div class="boa-text">内容：</div>'
                    +'<textarea class="inp-text" placeholder="请输入内容"></textarea>'
                    +'<div class="int-div"></div>'
                    +'<span class="boa-but" onclick="fn.quick(this)">更新信息</span></div>'
                    +'<div class="Rotation"><div class="Rot-le">轮播图文件上传</div>'
                    +'<div class="Rot-box"><div class="rot-item"><span class="item-tle">①</span>'
                    +'<img class="item-view" src="'+arrStr[0].FileId+'" /><div class="replace-box"><span class="item-but">更换</span>'
                    +'<input class="file-but" onChange="fn.handleFileChange(this)" type="file" data-value="1"/></div></div><div class="rot-item">'
                    +'<span class="item-tle">②</span><video class="item-view" src="'+arrStr[1].FileId+'" ></video>'
                    +'<div class="replace-box"><span class="item-but">更换</span><input class="file-but" onChange="fn.handleFileChange(this)" type="file" data-value="2" /></div>'
                    +'</div><div class="rot-item"><span class="item-tle">③</span><img class="item-view" src="'+arrStr[2].FileId+'" />'
                    +'<div class="replace-box"><span class="item-but">更换</span>'
                    +'<input class="file-but" onChange="fn.handleFileChange(this)" type="file" data-value="3" /></div></div></div></div></div>';
                    }
            })
            
                return;
        }
        ajax_Request({
            type:'post',
            url:'./examine.php',
            data:'getType='+getType,
            success:function(eventStr){
                let cont_view = document.getElementsByClassName('cont-view')[0];
                cont_view.innerHTML = eventStr;
            }
        })
    }
    let handleFileChange = function(event){
        let imgElent = document.getElementsByClassName('item-view');
        let File = event.files[0];
        let num = event.dataset.value;
        let FileName = File.name;
        let imageIng = File.type.split('/')[1];
        FileName = toUnicode(FileName)+'.'+imageIng;
        if(num === '1'){
            num = 'one';
        }else if(num === '2'){
            num = 'two';
        }else if(num === '3'){
            num = 'three';
        }
        ajax_Request({
            type:'post',
            url:'./docFile.php',
            data:'Order='+num+'&type='+File.type+'&size='+File.size+'&FileName='+FileName+'&FileId='+'./data/'+FileName,
            success:function(eventStr){
            let numif = num;
            let srcUrl = FileName;
            let fd = new FormData();
                fd.append('file',File);
                fd.append('lisName',FileName);
                var xhr = window.XMLHttpRequest ?
                    new window.XMLHttpRequest() :
                    new ActiveXObject('Microsoft.XMLHTTP');
                xhr.open('post','./docFile.php');
                xhr.upload.onprogress = function(e){   //上传进度
                    var e = e || window.event;
                }
                xhr.onreadystatechange = function(){   //上传回调
                    if(xhr.status == 200 && xhr.readyState == 4){
                        let er = xhr.responseText;
                        if(er.length == 0){
                                if(numif == "one"){
                                    imgElent[0].src = './data/'+srcUrl;
                                }else if(numif == "two"){
                                    imgElent[1].src = './data/'+srcUrl;
                                }else if(numif == "three"){
                                    imgElent[2].src = './data/'+srcUrl;
                                }
                                alert('上传成功！');
                        }
                        
                    }
                }
                xhr.send(fd);
            }
        })
    }
    let quick = function(event){
        let fater = event.parentNode,
        eleName = fater.getElementsByClassName('inp-name')[0],
        eleText = fater.getElementsByClassName('inp-text')[0],
        eName = eleName.value,
        eText = eleText.value;
        if(eName.length == 0 || eText.length == 0){
            return;
        }
        ajax_Request({
            type:'post',
            url:'./examine.php',
            data:'getType='+'quick'+'&eName='+eName+'&eText='+eText,
            success:function(eventStr){
                if(eventStr.length == 0){
                    alert('操作成功！')
                }else{
                    alert('操作失败！')
                }
            }
        })
    }
    let notice = function(){   //公告发布
        let div_text = document.getElementsByClassName('div-text')[0],
            value = div_text.innerHTML;
            //创建日期
            let time = new Date();
            let nian = time.getFullYear();
            let y = time.getMonth()+1;
            let r = time.getDate();
            y = y<10 ? '0'+y : y;
            r = r<10 ? '0'+r : r;
            let setTime = nian+'/'+y+'/'+r;
        ajax_Request({
            type:'post',
            url:'./examine.php',
            data:'getType=notice'+'&valueSrc='+value+'&time='+setTime,
            success:function(event){
                if(event == ''){
                    alert('发布成功！');
                }else{
                    alert('未知错误请稍后再试');
                }
            }
        })

    }
    let textChage = function(event){ //自动变化高度
        let fater = event.parentNode,
            value = event.value,
            div_text = fater.getElementsByClassName('div-text')[0];
        div_text.innerHTML = value;

    }
    let whole = function(){ //获取全部数据
        ajax_Request({
            type:'post',
            url:'./examine.php',
            data:'getType=alldata',
            success:function(eventStr){
                let Not_conter = document.getElementsByClassName('Not-conter')[0];
                    Not_conter.innerHTML = eventStr;
            }
        })
    }
    let seek = function(event){
        let fater = event.parentNode,
        type = fater.getElementsByClassName('up-select')[0].value,
        upName = fater.getElementsByClassName('up-inpt')[0].value;
         ajax_Request({
            type:'post',
            url:'./examine.php',
            data:'getType=seek'+'&type='+type+'&name='+upName,
            success:function(eventStr){
                let Not_conter = document.getElementsByClassName('Not-conter')[0];
                    Not_conter.innerHTML = eventStr;
            }
        })


    }
    let check = function(event){
        let Notice_title = document.getElementsByClassName('Notice-title');
        let keyName,artC;
        for(let i = 0; i< Notice_title.length;i++){
            (function(i){
                Notice_title[i].className = 'Notice-title';
            })(i);
        }
        event.className = 'Notice-title aColr';
        if(event.innerHTML === '公告发布管理'){
            let Not_conter = document.getElementsByClassName('Not-conter')[0];
            Not_conter.innerHTML = 
                    '<span class="tips">在这里可以通知一些关于网站的建议与安全</span>'
                    +'<span class="inform">公告：</span>'
                    +'<div class="Not-book">'
                    +'<textarea class="inpt" onkeyup="fn.textChage(this)" placeholder="请输入内容"></textarea>'
                    +'<div class="div-text"></div>'
                    +'</div>'
                    +'<span class="No-but" onclick="fn.notice()">发布公告</span>';
            return;
        }else if(event.innerHTML === '历史公告管理'){
            keyName = 'history';
        }else if(event.innerHTML === '文章管理'){
            keyName = 'article';
            artC = true;
        }else if(event.innerHTML === '视频管理'){
            keyName = 'video';
            artC = true;
        }else if(event.innerHTML === '数据清理'){
            let Not_conter = document.getElementsByClassName('Not-conter')[0];
            let del = document.getElementsByClassName('delet')[0];
            del.className = 'delet';
            Not_conter.innerHTML = '';
            return;
        }
        ajax_Request({
            type:'post',
            url:'./examine.php',
            data:'getType='+keyName,
            success:function(eventStr){
                let Not_conter = document.getElementsByClassName('Not-conter')[0];
                    Not_conter.innerHTML = eventStr;
                let del = document.getElementsByClassName('delet')[0];
                    del.className = 'delet none';
            }
        })
    }
    let preview = function(event){   //预览
        let fater = event.parentNode.parentNode,
        Name_h = fater.getElementsByClassName('na-ap')[0].innerHTML,
        this_id = fater.getElementsByClassName('itemID')[0].innerHTML;
        ajax_Request({
            type:'post',
            url:'./examine.php',
            data:'getType=getPreview'+'&id='+this_id+'&Name='+Name_h,
            success:function(eventStr){
                let preview = document.getElementsByClassName('preview')[0];
                preview.onclick = function(){
                    preview.className = 'preview none';
                }
                preview.innerHTML = eventStr;
                preview.className = 'preview';
            }
        })
    }
    let preve = function(event){    //预览
        let fater = event.parentNode.parentNode,
        Name_h = fater.getElementsByClassName('na-ap')[0].innerHTML,
        this_id = fater.getElementsByClassName('itemID')[0].innerHTML;
        ajax_Request({
            type:'post',
            url:'./examine.php',
            data:'getType=getPreve'+'&id='+this_id+'&Name='+Name_h,
            success:function(eventStr){
                let preview = document.getElementsByClassName('preview')[0];
                preview.onclick = function(){
                    preview.className = 'preview none';
                }
                preview.innerHTML = eventStr;
                preview.className = 'preview';
            }
        })
    }
    let delet = function(event){   // 无用数据清除
        let ctg;
        if(event.innerHTML == '草稿清理'){
            ctg = 'Draft';
        }else if(event.innerHTML == '审核清理'){
            ctg = 'Publish';
        }else if(event.innerHTML == '发布清理'){
            ctg = 'global';
        }
        ajax_Request({
            type:'post',
            url:'./examine.php',
            data:'getType=delet'+'&category='+ctg,
            success:function(eventStr){
                console.log(eventStr);
                if(eventStr == ''){
                    alert('清除成功');
                }
            }
        })
    }
    let offShelf = function(event){   //下架
        let fater = event.parentNode.parentNode,
        Name_h = fater.getElementsByClassName('na-ap')[0].innerHTML,
        this_id = fater.getElementsByClassName('itemID')[0].innerHTML;
        ajax_Request({
            type:'post',
            url:'./examine.php',
            data:'getType=offShelf'+'&id='+this_id+'&Name='+Name_h,
            success:function(eventStr){
                let Not_conter = document.getElementsByClassName('Not-conter')[0];
                    Not_conter.innerHTML = eventStr;
            }
        })
    }
    let repulse = function(event){  //作品打回
        let fater = event.parentNode.parentNode,
        Name_h = fater.getElementsByClassName('na-ap')[0].innerHTML,
        this_id = fater.getElementsByClassName('itemID')[0].innerHTML;
        let this_evt = this;
        ajax_Request({
            type:'post',
            url:'./examine.php',
            data:'getType=repulse'+'&id='+this_id+'&Name='+Name_h,
            success:function(eventStr){
                this_evt.examine();
            }
        })
    }
    let adopt = function(event){  //作品通过
        let fater = event.parentNode.parentNode,
        Name_h = fater.getElementsByClassName('na-ap')[0].innerHTML,
        this_id = fater.getElementsByClassName('itemID')[0].innerHTML;
        let this_evt = this;
        ajax_Request({
            type:'post',
            url:'./examine.php',
            data:'getType=adopt'+'&id='+this_id+'&Name='+Name_h,
            success:function(eventStr){
                this_evt.examine();
            }
        })
    }
    return{
        preview:preview,
        repulse:repulse,
        preve:preve,
        switchElent:switchElent,
        handleFileChange:handleFileChange,
        adopt:adopt,
        whole:whole,
        seek:seek,
        delet:delet,
        offShelf:offShelf,
        notice:notice,
        check:check,
        textChage:textChage,
        examine:examine,
        quick:quick
    }
})();

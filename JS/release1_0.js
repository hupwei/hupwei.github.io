var on = (function(){
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
    //获取浏览器缓存id
    let id_H = localStorage.getItem('id');
    if(id_H){
        let id_ht = document.getElementById('id-itme');
        id_ht.innerHTML = id_H;
    }
    let alter,ul_div,num,myFilelist,IFUE;
    let works = document.getElementsByClassName('works')[0];
    let command = document.getElementsByClassName('command')[0];
    let tle_type = document.getElementsByClassName('tle-type')[0];
    let maske = document.getElementsByClassName('mask')[0];
    let tle_spa = tle_type.getElementsByClassName('tle-spa');
    tle_spa[0].className = 'tle-spa bgcolor';
    let change = function(event){
        // 文章自动变化高度
        let fater_li = event.parentNode;
        let text_div = fater_li.getElementsByClassName('div-text')[0];
        num = document.getElementsByClassName('num')[0];
        let str = (event.value).replace(/\s*/g,"");
        text_div.innerHTML = str; 
        event.value = str;  

        // 获取文章的字数
        let inpt_arr = document.getElementsByClassName('inpt');
        let len = inpt_arr.length,string='',Str='';
        for(let i = 0; i < len;i ++){
            string = inpt_arr[i].value;
            Str += string;
        }
        num.innerHTML = Str.length;
    }
    let prochange = function(event){    //标题字数限制
        let str = event.value;
        if(str.length > 30){
            event.value = str.substr(0,30);
           alter.className = 'alter';
           let ter = setTimeout(function(){
               alter.className = 'alter none';
               clearTimeout(ter);
           },2000)
        }
    }
    let selet = function(event){       //文件选择img
        let fater_li = event.parentNode;
        let file_img = fater_li.getElementsByClassName('file-img')[0];
        let borjia = fater_li.getElementsByClassName('bor')[0];
        let file = event.files[0];
        let fileReader = new FileReader();
        let regexImageFile=/^(?:image\/webp|image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
        if(regexImageFile.test(file.type)){
            fileReader.readAsDataURL(file);
            fileReader.onload = function(e){
                file_img.src = e.target.result;
                event.className += ' none';
                borjia.className += ' none';
                file_img.className = 'file-img';
            }
        }else{
            window.alert('请上传图片文件');
        }
    }
    let seletVd = function(event){     //文件选择video
        let fater_v = event.parentNode,
            file_video = fater_v.getElementsByClassName('video-N')[0],
            div_video = fater_v.getElementsByClassName('div-video')[0],
            file = event.files[0],
            filesize = file.size,
            fileReader = new FileReader(),
            regexImageFile=/^(?:video\/mp4|video\/avi|video\/wmv|video\/mpg|video\/mpeg|video\/mov|video\/rm|video\/ram|video\/swf|video\/flv)$/i;
        
        if(filesize >= 1024*1024*5000){
            window.alert('视频超过可上传大小');
            return;
        }


        if(regexImageFile.test(file.type)){
            fileReader.readAsDataURL(file);
            fileReader.onload = function(e){
                file_video.src = e.target.result;
                event.className += ' none';
                div_video.className += ' none';
                file_video.className = 'video-N';
            }
        }else{
            window.alert('请上传视频文件');
        }
    }
    let draft = function(){ //存草稿
        myFilelist = myFilelist ? myFilelist : [];
        let key_off = false, 
            Type = 'video',
            num = null,
            data = null,
            pest,
            preData,
            idHtml = document.getElementById('id-itme'),
            work_area = document.getElementsByClassName('work-area')[0],
            title_h = document.getElementsByClassName('title-h')[0],
            name_M = document.getElementsByClassName('name-M')[0],
            nuber = document.getElementsByClassName("num")[0],//*
            
            myName = name_M.value,
            name = title_h.value,
            nameUnC = toUnicode(name),
            id = idHtml.innerHTML;
            
            if(name == ''){
                alert('请输入文章标题');
                return;
            }else if(myName == ''){
                alert('请输入作者');
                return;
            }
            let time = new Date();
            let nian = time.getFullYear();
            let y = time.getMonth()+1;
            let r = time.getDate();
            y = y<10 ? '0'+y : y;
            r = r<10 ? '0'+r : r;
            let setTime = nian+'/'+y+'/'+r;
 
        if(nuber){          //做出判断为文章编辑界面
            file_image = document.getElementsByClassName('file-image');           //图片
            files = [];                                                            //图片
            pest = [];                                                              //图片数组名
            let imgFile = document.getElementsByClassName('file-img');
            
                //要求有文件进入
            if(imgFile.length>0){  
                let i;
                for(i = 0;i< file_image.length;i++){
                    if(file_image[i].files[0]){
                        let dex = file_image[i].files[0];
                            files.push(dex);
                        let charSrc = dex.name,
                            charIng = charSrc.split('.')[1],
                            charname = charSrc.split('.')[0],
                            charName = toUnicode(charname);
                        pest.push(nameUnC+"_"+charName+'.'+charIng);
                    }else{
                        let srcEl = imgFile[i].src,
                            charsrc = srcEl.split('image/')[1],
                            charName = charsrc.split('_')[1];
                        pest.push(nameUnC+"_"+charName);
                    }
                }                  
                for(let i = 0;i<imgFile.length;i++){
                        imgFile[i].src = '../temporary_storage/image/'+pest[i];
                    }   
                } 
                //处理掉多余的标签
                let textLI_Elent = work_area.querySelectorAll('li'),
                    ulElent = document.createElement('ul');         //创建副本ul
                    ulElent.className = 'text';
                    
                for(let i = 0;i < textLI_Elent.length;i++){
                    let liElent = document.createElement('li');     //创建副本li
                    if(textLI_Elent[i].className == 'text-p'){
                        liElent.className = 'text-p';
                        let charEl = textLI_Elent[i].querySelector('.div-text').innerHTML;
                        //将真实元素内容放入副本
                        liElent.innerHTML = '<div class="div-text">'+charEl+'</div>';
                        
                    }else{
                        liElent.className = 'img-p';
                        let charEl = textLI_Elent[i].querySelector('.file-img').src;
                        //将真实元素内容放入副本
                        liElent.innerHTML = '<img class="file-img" src='+charEl+'>';
                    }
                    ulElent.appendChild(liElent);
                }
                preData = ulElent.innerHTML;
            if(pest.length>0){   //判断是否存在图片文件
                key_off = true;
            }
            let iputElent = document.getElementsByClassName('inpt');
                for(let i = 0;i<iputElent.length;i++){
                    iputElent[i].innerHTML = iputElent[i].value;
                }
                
            Type = 'image';
            num = nuber.innerHTML;//*
                if(num == 0 && pest.length == 0){
                alert('请输入内容');
                return;
            }
        }else{

        let video_L = document.getElementsByClassName('video-L')[0],    //视频
            video_N = document.getElementsByClassName('video-N')[0];
        var files = video_L.files;                                      //视频
        if(files.length >0){
            key_off = true;
            let vidName = files[0]['name'].split('.'),
            Namevideo = toUnicode(vidName[0]);
            pest = nameUnC+"_"+Namevideo+'.'+vidName[1]; //标题+视频原名
        }else{
            key_off = false;
            let srcEl = video_N.src,
                charsrc = srcEl.split('video/')[1],
                charName = charsrc.split('_')[1];
            pest = nameUnC+"_"+charName;    //标题+视频原名
        }
        video_N.src = '../temporary_storage/video/'+pest;
        preData = '<video class="preview-video" controls="true" src="'+'../temporary_storage/video/'+pest+'"></video>';
        }
        title_h.innerHTML = title_h.value;
        data = work_area.innerHTML;//*

        let getNonce = function(){ //生成随机16位数
        let str = 'abcdefghijklmnopqrstuvwsyz0123456789';
        let nonstr = '';
        for(let i=0; i<16;i++){
            nonstr += str[Math.floor(Math.random()*(str.length))];
        }
        return nonstr;
        }
        ajax_Request({
            type: 'post',
            url: '../temporary_storage/Draft.php',
            data: '&id='+id
                +'&_id='+getNonce()
                +'&num='+num
                +'&'+Type+'='+pest
                +'&name='+name
                +'&myName='+myName
                +'&setTime='+setTime
                +'&key='+false
                +'&delete='+false
                +'&data='+data
                +'&preData='+preData
                +'&ViewVolume=0',
            success: function(event){
                //回调得到id
                if(event || id_H){
                    idHtml.innerHTML = event || id_H;
                    // 将id缓存于浏览器
                    localStorage.setItem('id',event || id_H);
                    if(key_off){ //提交文件
                        let fd = new FormData();
                            for(let i=0,j=0;i<files.length;i++){
                                fd.append('file'+j,files[i]);
                                let charSrc = files[i].name,
                                charIng = charSrc.split('.')[1],
                                charname = charSrc.split('.')[0],
                                charName = toUnicode(charname);
                                fd.append('name'+j,nameUnC+'_'+charName+'.'+charIng);
                                j++;
                            }
                            fd.append(Type,pest);
                            fd.append('id',event = event || id_H);
                        var xhr = window.XMLHttpRequest ?
                                new window.XMLHttpRequest() :
                                new ActiveXObject('Microsoft.XMLHTTP');
                        xhr.open('post','../temporary_storage/setvideo.php');
                        let spTime = document.getElementsByClassName("spTime")[0];
                        spTime.className = 'spTime';
                        xhr.upload.onprogress = function(e){   //上传进度
                            var e = e || window.e;
                            let time = (e.loaded/e.total)*100;
                            time = time.toFixed(2);
                            spTime.innerHTML = time+"%";

                        }
                        xhr.onreadystatechange = function(){   //上传回调
                            if(xhr.status == 200 && xhr.readyState == 4){
                                let er = xhr.responseText;
                                if(er,length == 0){
                                     alert('上传成功！');
                                     spTime.className = "spTime none";
                                }
                               
                            }
                        }
                        xhr.send(fd);
                    }else{
                        alert('上传成功！');
                    }
                }else{
                    alert('上传失败！');
                }
                maske.className += ' none';
            }
        })
        
    }
    let preview = function(event){  //预览
        let fatre_Name = event.parentNode.parentNode,
        work_area = document.getElementsByClassName('work-area')[0],
        item_Name,myName,ulElentSrc,Time,num;
        //创建日期
        let time = new Date();
        let nian = time.getFullYear();
        let y = time.getMonth()+1;
        let r = time.getDate();
        y = y<10 ? '0'+y : y;
        r = r<10 ? '0'+r : r;
        Time = nian+'/'+y+'/'+r;
        
        if(fatre_Name.className == 'str-li'){
            item_Name = fatre_Name.getElementsByClassName('na-ap')[0].innerHTML;
            Time = fatre_Name.getElementsByClassName('myTime')[0].innerHTML;
            myName = fatre_Name.getElementsByClassName('Myname')[0].innerHTML;
        }else{
            //获取文章字数
            num = work_area.getElementsByClassName('num')[0].innerHTML;
            item_Name = work_area.getElementsByClassName('title-h')[0].value;
            let videoEl = work_area.getElementsByClassName('video-N')[0];
            let preview = document.getElementsByClassName('preview')[0];
            if(videoEl){
                preview.innerHTML = '<video class="preview-video" controls="true" src="'+videoEl.src+'"></video>';
                preview.className = 'preview';
                return;
            }else{
                //处理掉多余的标签
                let textLI_Elent = work_area.querySelectorAll('li'),
                    ulElent = document.createElement('ul');         //创建副本ul
                    ulElent.className = 'text';
                for(let i = 0;i < textLI_Elent.length;i++){
                    let liElent = document.createElement('li');     //创建副本li
                    if(textLI_Elent[i].className == 'text-p'){
                        liElent.className = 'text-p';
                        let charEl = textLI_Elent[i].querySelector('.div-text').innerHTML;
                        //将真实元素内容放入副本
                        liElent.innerHTML = '<div class="div-text">'+charEl+'</div>';
                        
                    }else{
                        liElent.className = 'img-p';
                        let charEl = textLI_Elent[i].querySelector('.file-img').src;
                        //将真实元素内容放入副本
                        liElent.innerHTML = '<img class="file-img" src='+charEl+'>';
                    }
                    ulElent.appendChild(liElent);
                }
                ulElentSrc = ulElent.innerHTML;
                preview.innerHTML = '<div class="detail">'
                                    +'<div class="title">'
                                    +'<span class="author">作者:</span>'
                                    +'<span class="Name">哒学长</span>'
                                    +'<span class="lisTime">'+Time+'</span></div>'
                                    +'<div class="num">'
                                    +'<div class="numWords">'
                                    +'<span>字数:</span>'
                                    +'<span>'+num+'</span></div>'
                                    +'<div class="read">'
                                    +'<span>阅读量/</span>'
                                    +'<span class="readNum">17</span></div></div>'
                                    +'<div class="content">'
                                    +'<h1 class="title-t">'+item_Name+'</h1>'
                                    +'<ul class="text">'+ulElentSrc+'</ul>'
                                    +'</div>'
                                    +'<div class="tag">'
                                    +'<span>哒学长</span>'
                                    +'</div></div>';
                preview.className = 'preview';
                work_area.className += ' none';
                return;
            }
        }
        ajax_Request({
            type: 'get',
            url: '../temporary_storage/Html.php',
            data: 'nameType=preview'
                +'&Name='+item_Name
                +'&myName='+(myName||'哒学长')
                +'&id='+id_H
                +'&Time='+Time
                +'&num='+num
                +'&data='+ulElentSrc,
            success: function(eventStr){
                let preview = document.getElementsByClassName('preview')[0];
                preview.innerHTML = eventStr;
                preview.className = 'preview';
            }
        })
    }
    let shut = function(event){   //关闭预览
        let work_area = document.getElementsByClassName('work-area')[0];
        event.className = 'preview none';
        event.innerHTML = '';
        work_area.className = 'work-area';
    }
    let foEnt = function(event){   //删除前确认
        let work_area = document.getElementsByClassName('work-area')[0],
            MMfo = work_area.getElementsByClassName('MMfo')[0],
            foEnt_name = MMfo.getElementsByClassName('foEnt-name')[0];
        if(event.innerHTML == '删除'){
            let liElent = event.parentNode.parentNode,
                liName = liElent.getElementsByClassName('na-ap')[0],
                nameTitle = liName.innerHTML;
            foEnt_name.innerHTML = nameTitle;
            MMfo.className = 'MMfo';
            IFUE = event;
        }else if(event.innerHTML == '取消'){
            MMfo.className = 'MMfo none';
        }else if(event.innerHTML == '确认' && IFUE){
            this.ajax_Rq(IFUE);
            MMfo.className = 'MMfo none';
        }
        
    }
    let mask = function(event){
        if(event.innerHTML == '存草稿' || event.innerHTML == '发布'){
            let value = event.innerHTML;
            let tli_t = document.getElementsByClassName('tli-t')[0];
            tli_t.innerHTML = value;
            maske.className = 'mask';
            IFUE = event;
        }
        if(event.innerHTML == '取消'){
            maske.className += ' none';
        }else if(event.innerHTML == '确认' && IFUE.innerHTML == '存草稿'){
            this.draft(IFUE);
            maske.className += ' none';
        }else if(event.innerHTML == '确认' && IFUE.innerHTML == '发布'){
            this.pubLish(IFUE);
            maske.className += ' none';
        }
        
        
    }
    let click = function(event){    //删除节点
        ul_div = document.getElementsByClassName('text')[0];
        let fater = event.parentNode;
        ul_div.removeChild(fater);
    }
    let click_p = function(){      //添加段落
        ul_div = document.getElementsByClassName('text')[0];
        let li = document.createElement('li');
        li.className = 'text-p';
        li.innerHTML = '<textarea class="inpt" onkeyup="on.change(this)" placeholder="请输入段落"></textarea>'
                     + '<div class="div-text"></div>'
                     + '<span class="close" onclick="on.click(this)">×</span>';
        ul_div.appendChild(li);
    }
    let click_img = function(){    //添加图片
        ul_div = document.getElementsByClassName('text')[0];
        let li = document.createElement('li');
        li.className = 'img-p';
        li.innerHTML = '<div class="bor"></div>'
                     + '<input class="file-image" type="file" onchange="on.selet(this)" />'
                     + '<img class="file-img none" src=""/>'
                     + '<span class="close" onclick="on.click(this)">×</span>'
                     + '<span class="proposal">建议尺寸 1920*1080</span>';
        ul_div.appendChild(li);
    }
    let ajax_Rq = function(event){   //ajax请求后台HTNL
        let ulEnt = document.getElementsByClassName('wo-ul')[0];
        let liArr = ulEnt.getElementsByClassName('wo-li');
        let work_area = document.getElementsByClassName('work-area')[0],
            evt = event.length ? event : null;
            if(!evt){
                var liElent = event.parentNode.parentNode,
                    liName = liElent.getElementsByClassName('na-ap')[0],
                    nameTitle = liName.innerHTML;
                    if(event.innerHTML == '编辑'){
                        evt = 'edit';
                    }else if(event.innerHTML == '删除'){
                        evt = 'delet';
                    }     
            }
            
        ajax_Request({
            type: 'get',
            url: '../temporary_storage/Html.php',
            data: 'nameType='+evt+'&nameTitle='+nameTitle+'&id='+id_H,
            success: function(eventStr){
                if(evt == 'create'){
                    work_area.innerHTML = eventStr;
                    command.className = "command none";
                    tle_spa[0].className = 'tle-spa bgcolor';
                    tle_spa[1].className = 'tle-spa';
                    for(let i = 0; i < liArr.length; i++){
                        liArr[i].className = 'wo-li';
                    }
                }else if(evt == 'works'){
                    work_area.innerHTML = eventStr;
                    command.className = "command none";
                    tle_spa[1].className = 'tle-spa bgcolor';
                    tle_spa[0].className = 'tle-spa';
                    for(let i = 0; i < liArr.length; i++){
                        liArr[i].className = 'wo-li';
                    }
                }else if(evt == 'edit'){
                    eventStr = JSON.parse(eventStr);
                    command.className = "command";
                    let work_area = document.getElementsByClassName('work-area')[0],
                        title_h = work_area.getElementsByClassName('title-h')[0];
                    work_area.innerHTML = eventStr.data;
                }else if(evt == 'delet'){
                    work_area.innerHTML = eventStr;
                }else{
                    work_area.innerHTML = eventStr;
                    command.className = 'command';
                    alter = document.getElementsByClassName('alter')[0];
                    ul_div = document.getElementsByClassName('text')[0];   
                    if(evt == 'article'){
                    num = document.getElementsByClassName("num")[0];
                    let erea = document.getElementsByClassName('inpt')[0];
                    erea.innerHTML = '';
                    }
                }
                
                
            }
        });
        
    }
    let pubLish = function(event){   //发布文章
        let evethis = this;
        let work_area = document.getElementsByClassName('work-area')[0],
            idHtml = document.getElementById('id-itme'),
            title_h = work_area.getElementsByClassName('title-h')[0],
            name_M = document.getElementsByClassName('name-M')[0],
            nuber = work_area.getElementsByClassName("num")[0],
            faterEnt = event.parentNode.parentNode,
            video_L,id,nameTitle,PUB;
        if(faterEnt.className === 'str-li'){
            nameTitle = faterEnt.getElementsByClassName('na-ap')[0].innerHTML;
            id = id_H;
            PUB = true;
        }else{
            if(!nuber){
                video_L = work_area.getElementsByClassName('video-L')[0];
            }
            if(idHtml.innerHTML == ''){
                alert('请先储存为草稿在执行发布');
                return;
            }else if(title_h.value.length < 2){
                alert('标题的字数未达标！');
                return;
            }else if(nuber && nuber.innerHTML < 100 ){
                alert('文章的字数未达到入库要求');
                return;
            }else if(!nuber && video_L.files.length == 0){
                alert('你忘记上传视频啦！');
                return;
            }else if(name_M.value == ''){
                alert('文章作者忘记填写了');
                return;
            }
            //判断结束后将文章储存为草稿文件
            evethis.draft();
            id = id_H;
            nameTitle = title_h.value;
            PUB = false;

        }
        let tiOut = setTimeout(function(){
            ajax_Request({
                type: 'post',
                url:'../temporary_storage/Publish.php',
                data:'id='+id+'&name='+nameTitle+'&PUB='+PUB,
                success:function(eventStr){
                    if(PUB){
                        let storage = work_area.getElementsByClassName('storage')[0];
                        storage.innerHTML = eventStr;
                        alert('上传成功！');
                    }
                    evethis.loade();
                }
            })
            clearTimeout(tiOut);
        },1000)
        
        
    }
    let query = function(event){
        let ulEnt = document.getElementsByClassName('wo-ul')[0];
        let liArr = ulEnt.getElementsByClassName('wo-li');
        for(let i = 0; i < liArr.length; i++){
            liArr[i].className = 'wo-li';
        }
        tle_spa[0].className = 'tle-spa';
        tle_spa[1].className = 'tle-spa';
        event.className = 'wo-li bgcolor';
        let pub_name = event.getElementsByClassName('pub-name')[0],
        work_area = document.getElementsByClassName('work-area')[0],
            Name = pub_name.innerHTML;
        ajax_Request({
            type: 'get',
            url:'../temporary_storage/Html.php',
            data:'id='+id_H+'&nameType=getName'+'&Name='+Name,
            success:function(eventStr){
                work_area.innerHTML = eventStr;
            }
        })
        
    }
    let shelf = function(event){     //下架
        if(id_H == ''){
            return;
        }
        if(window.confirm('确定要下架吗？') == false){
            return;
        }
        let evethis = this;
        ajax_Request({
                    type: 'get',
                    url:'../temporary_storage/Html.php',
                    data:'id='+id_H+'&nameType=shelf'+'&Name='+event,
                    success:function(eventStr){
                        evethis.loade();
                    }
                })
    }
    /**
     * 页面加载自动请求
     * 获取用户已发布的文章
     */
    let loade = function(){
        if(!id_H){
            let wo_ul = works.getElementsByClassName('wo-ul')[0];
            wo_ul.innerHTML = '<li class="wo-li">暂无作品</li>';
        }else{
            let wo_ul = works.getElementsByClassName('wo-ul')[0];
            ajax_Request({
                    type: 'get',
                    url:'../temporary_storage/Html.php',
                    data:'id='+id_H+'&nameType=Pub',
                    success:function(eventStr){
                        wo_ul.innerHTML = eventStr;
                    }
                })
        }
    }
    loade();
    return{
        change : change,
        prochange: prochange,
        selet: selet,
        seletVd: seletVd,
        click: click,
        foEnt:foEnt,
        shut:shut,
        draft:draft,
        click_p: click_p,
        click_img: click_img,
        ajax_Rq: ajax_Rq,
        mask:mask,
        query:query,
        shelf:shelf,
        preview:preview,
        pubLish:pubLish,
        loade:loade
    }
})();
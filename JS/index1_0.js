var strArr;//后台数据
// 最多显示两行
var slc = function(str,num){
    let jsc = str.slice(0,num);
    if(str.length <= num ){
        return str;
    }else{
        return jsc+'...';
    }  
}
var on = (function(){
    //数据排序方法
    let compare = function(cagValue,cagValue1){
                    let index0 = cagValue.ViewVolume;
                    let index1 = cagValue1.ViewVolume;
                    return index1 - index0;
                }
    let mouer = function(event){
        event.play();
    }
    let souS = function(){
        window.open("./HTML/sousuo.html","_blank");
    }
    let close = function(event){
        let search_box = document.getElementsByClassName('search-box')[0];
        search_box.className = 'search-box none';
        event.className = 'mask-box none';
    }
    let mout = function(event){
        event.currentTime = 0;
        event.pause();
    }
    let Href = function(){
        window.open('./HTML/release1_0.html','_blank');
    }
    let WH_fu = function(){
        height = window.innerHeight;//offsetHeight
        width = window.innerWidth;
        let ico = document.getElementsByClassName('ico');
        if(width<height){
            for(let n = 0; n < ico.length; n++){
                ico[n].style.width = '';
                ico[n].style.height = height + 'px'; 
                }
            video.style.height = height + 'px';
        }else{
            for(let n = 0; n < ico.length; n++){
                ico[n].style.height = '';
                ico[n].style.width = width + 'px'; 
                }
            video.style.width = width + 'px';
        }
        
        // let H = video.offsetHeight;
        video_H.style.height = height +'px';
        video_H.style.width = width + 'px';
        
        
        switch(num){
            case 0 :
                vd_mw.style.left = '0px';
                break;
            case 1 :
                vd_mw.style.left = -width + 'px';
                break;
            case 2 :
                vd_mw.style.left = -2*width + 'px';
                break;
        }
    }
    let video_H = document.getElementsByClassName('item-video')[0];
    let bgC = document.getElementsByClassName('bgcolor')[0];
    let video = document.getElementsByClassName('video-center')[0];
    // 获取随机宽高
    let height = window.innerHeight;
    let width = window.innerWidth;
    // 可视窗口
    window.onresize = function(){
        WH_fu();
        
    }
    /**
     * 轮播图
     */
    let buoo = document.getElementsByClassName('buoo')[0];
    let vd_mw = document.getElementsByClassName('itm-vd')[0];
    let left,num,tia;
    let arrEle = [];
    let Els = buoo.childNodes;
    for(let i = 0; i < Els.length; i++){
        if(Els[i].nodeType == 1){
            arrEle.push(Els[i]);
        }
    }
    let terva = function(){
        clearTimeout(tia);
        if(left != 0){
           left = parseInt(vd_mw.style.left);
        }
        left += -width;
        num = -left/width;
        if(left == -3*width){
           left = 0;
           num = 0;
        }
        bgC.className = 'bgcolor';
        if(num == 1){
            bgC.className = '';
            video.play();
            video.onended = function(){
                tia = setTimeout(terva,500);
            }
        }else{
            tia = setTimeout(terva,5000);
        }
        vd_mw.style.left = left + 'px';
        for(let i = 0; i < arrEle.length; i++){
                arrEle[i].className = 'bo';
            }
        arrEle[num].className += ' color';
    }
                        
        //轮播图开关
        WH_fu();
        tia = setTimeout(terva,5000);
        
    buoo.onclick = function(event){
        let tar = event.target || event.srcElement;
        if(tar.tagName == 'LI'){
            for(let i = 0; i < arrEle.length; i++){
                arrEle[i].className = 'bo';
                if(arrEle[i]==tar){
                    video.pause();
                    num = i;
                    vd_mw.style.left = (-i*width)+'px';
                    bgC.className = 'bgcolor';
                    if(i == 1){
                        clearTimeout(tia);
                        video.currentTime = 0;
                        video.play();
                        bgC.className = '';
                    }else{
                        tia = setTimeout(terva,4000);
                    }
                }
            }
            tar.className += ' color';
        }
    }
    let search = function(event){  //主页搜索
        let fater = event.parentNode,strHTMLt='',strHTMLO='',
            key_text = fater.getElementsByClassName('ico-text')[0].value,
            search_box = fater.getElementsByClassName('search-box')[0],
            mask_box = document.getElementsByClassName('mask-box')[0];
        let accurate_text = fater.getElementsByClassName('accurate-text')[0],
            accurate_video = fater.getElementsByClassName('accurate-video')[0]; 
        if(!strArr){
            alert('操作过于频繁');
            return;
        }
        let array_arr = strArr[3],reg;
        //排序
        array_arr =  array_arr.sort(compare);
        if(key_text == ''){
            return;
        }else{
            let key_item = '';
            for(let n = 0;n < key_text.length;n++){
                key_item += '('+key_text[n]+')([\\s\\S]*)';
            }
            reg = new RegExp(key_item);
        }
        
        let i = 0,lenI = array_arr.length,arrT=[],arrO=[];
        //将文章与视频分别筛选出来
        for(;i<lenI;i++){
            console.log()
            if('image' in array_arr[i] && array_arr[i]['delete'] === 'false' 
            && reg.test(array_arr[i]['name'])){
                arrT.push(array_arr[i]);
            }else if('video' in array_arr[i] && array_arr[i]['delete'] === 'false'
            && reg.test(array_arr[i]['name'])){
                arrO.push(array_arr[i]);
            }
        }
        let arrAll = [];
        arrAll.push(arrT);
        arrAll.push(arrO);
        // 将排序好的数据存入浏览器缓存
        let Arr = window.localStorage.getItem('arrAll');
        arrAll = JSON.stringify(arrAll);
        window.localStorage.setItem('arrAll',arrAll);
        //分别生成字符串
        let t = 0, lenT = arrT.length<=12?arrT.length:12;
        for(;t< lenT;t++){
            let ElHTML ='<li class="ac-item" onclick="on.toLaod(this)"><a class="title_a">'
                    +slc(arrT[t]['name'],24)+'<span class="title_id none">'
                    +arrT[t]['_id']+
                        '</span></a></li>';
            strHTMLt += ElHTML;
        }
        let O = 0, lenO = arrO.length<=8?arrO.length:8;
        for(;O< lenO;O++){
            let ElHTML ='<li class="ac-item" onclick="on.toLaod(this)"><a class="title_a">'
                    +slc(arrO[O]['name'],24)+'<span class="title_id none">'
                    +arrO[O]['_id']+
                        '</span></a></li>';
            strHTMLO += ElHTML;
        }
        strHTMLt = strHTMLt == '' ? '未查询到数据':strHTMLt;
        strHTMLO = strHTMLO == '' ? '未查询到数据':strHTMLO;
        accurate_text.innerHTML = strHTMLt;
        accurate_video.innerHTML = strHTMLO;
        search_box.className = 'search-box';
        mask_box.className = 'mask-box';
        
    }
    /**
     * 后台数据加载模板
     * 方法执行
     * */ 
    let onloading = function(event){
        let imgElent = document.getElementsByClassName('imgElsrc');//背景
        let notice = document.getElementsByClassName('notice-content')[0];//公告
        let qui_name = document.getElementsByClassName('qui-title')[0];//小黑板
        let qui_text = document.getElementsByClassName('qui-text')[0];
        strArr = JSON.parse(event);
                //背景
                imgElent[0].src = './administrators/data/'+ strArr[0][0]['FileName'];
                imgElent[1].src = './administrators/data/'+ strArr[0][1]['FileName'];
                imgElent[2].src = './administrators/data/'+ strArr[0][2]['FileName'];
                imgElent[3].src = './administrators/data/'+ strArr[0][0]['FileName'];

                //公告
                let str = slc(strArr[1][0]['content'],85);
                notice.innerHTML = str;

                //小黑板
                let doc = slc(strArr[2][0]['eText'],170);
                qui_name.innerHTML = strArr[2][0]['eName'];
                qui_text.innerHTML = doc;

                //文章与视频
                let ArrGl = strArr[3];
                let sorArr =  ArrGl.sort(compare);
                //取出数组前5个文章与前2个视频
                let ImgArr = [], VideoArr = [];
                let i = 0,contImg = 0,contVio = 0, len = sorArr.length;
                for(;i < len;i++){
                    if('image' in sorArr[i] && contImg < 5 && sorArr[i]['delete'] === 'false'){
                        ImgArr.push(sorArr[i]);
                        contImg ++;
                    }else if('video' in sorArr[i] && contVio < 2 && sorArr[i]['delete'] === 'false'){
                        VideoArr.push(sorArr[i]);
                        contVio ++;
                    }else if(contImg == 5 && contVio == 2){
                        break;
                    }
                }
                //将提出来的数据渲染到页面
                let text_content = document.getElementsByClassName('text-content')[0],strHTML='';
                let top_video = document.getElementsByClassName('top-video')[0],srcHTML='';
                let j = 0,k = 0, lenJ = ImgArr.length,lenK = VideoArr.length;
                for(;j < lenJ;j++){
                    let tiemArr = ImgArr[j]['setTime'].split('/');
                    let ElentHTML = 
                    '<a class="news-center" onclick="on.toDetailse(this)">'
                    +'<span class="itemId">'+ImgArr[j]['_id']+'</span>'
                    +'<div class="calendar">'
                    +'<span>'+tiemArr[2]+'</span>'
                    +'<span>'+tiemArr[0]+'</span>'
                    +'<span>−</span>'
                    +'<span>'+tiemArr[1]+'</span></div>'
                    +'<p class="centle">'+slc(ImgArr[j]['name'],24)+'</p>'
                    +'<p class="cenName">'+ImgArr[j]['myName']+'</p></a>'
                    ;
                    strHTML += ElentHTML;
                }
                
                for(;k < lenK;k++){
                    let ElentHTML = 
                    '<li class="im-de" onclick="on.toDetailse(this)">'
                    +'<span class="itemId">'+VideoArr[k]['_id']+'</span>'
                    +'<video class="video-p" onmouseover="on.mouer(this)" onmouseout="on.mout(this)" muted="" src="./temporary_storage/video/'+VideoArr[k]['video']+'"></video>'
                    +'<span class="vid-pl">'+VideoArr[k]['ViewVolume']+'</span>'
                    +'<span class="time">'+NaN+'</span>'
                    +'<p class="tl-vid">'+slc(VideoArr[k]['name'],18)+'</p>'
                    +'<p class="tl-name">'+VideoArr[k]['myName']+'</p></li>';
                    srcHTML += ElentHTML;
                }
                text_content.innerHTML = 
                    '<div class="news-title">'
                    +'<h3>NEWS</h3>'
                    +'<span>MORE </span>'
                    +'</div>'+strHTML;
                top_video.innerHTML = srcHTML;
    }
    /**加载后台数据
     * */
    let imgSrc = function(){
        ajax_Request({
            type:'post',
            url:'../initialize.php',
            data:'iniGet=index',
            success:function(event){
            // 加载数据
                onloading(event);
            //将数据缓存在浏览器
                window.localStorage.setItem('dataJSON',event);
                window.localStorage.setItem('time',new Date().getTime());
            }
        })
    }
     /**
     * 判断浏览器是否存在后台数据
     * */ 
    let Arr =  window.localStorage.getItem('dataJSON');
    let time = window.localStorage.getItem('time');
    let that_time = 1000*60*5;
    if(Arr && (new Date().getTime() - time) < that_time){
        onloading(Arr); 
    }else{
        imgSrc();
    }
    let toDetailse = function(event){
        let id = event.getElementsByClassName('itemId')[0];
        window.open('./HTML/laod.html?id='+id.innerHTML,"_blank");
    }
    let toLaod = function(event){
        let id = event.getElementsByClassName('title_id')[0];
        window.open('./HTML/laod.html?id='+id.innerHTML,"_blank");
    }
    /**
         * 页面被关闭
         * */ 
    window.onunload = function() {
        let Char = window.localStorage.getItem('CharCont');
        if(Char){
            ajax_Request({
                type:'post',
                url:'./temporary_storage/encryption.php',
                data:'iniGet=encryption'+'&data='+Char,
                success:function(event){
                    window.localStorage.setItem('CharCont',null)
                }
            })
        }
        //chrome opera调试都执行该行，但“Blocked alert() during beforeunload.”
        //firefox 刷新执行该行，弹出“NS_ERROR_NOT_AVAILABLE: Component returned failure code: 0x80040111 (NS_ERROR_NOT_AVAILABLE) 　　　　[nsIDOMWindow.alert]”
        }
        return{
            toDetailse:toDetailse,
            toLaod:toLaod,
            search:search,
            mouer:mouer,
            souS:souS,
            close:close,
            mout:mout,
            Href:Href
        }
})();
window.onload = function(){
    //单独处理视频时长
        let vidTime = document.getElementsByClassName('time');
        let vid = document.getElementsByClassName('video-p');
        let vide0,vide1;
        vid[0].onloadedmetadata = function() {
            vide0 = parseInt(vid[0].duration); //打印时长
            vide0 = parseInt(vide0/60)+':'+(vide0-60*(parseInt(vide0/60)));
            vidTime[0].innerHTML = vide0;
        };
        vid[1].onloadedmetadata = function() {
            vide1 = parseInt(vid[1].duration); //打印时长
            vide1 = parseInt(vide1/60)+':'+(vide1-60*(parseInt(vide1/60)));
            vidTime[1].innerHTML = vide1;
        };     
}





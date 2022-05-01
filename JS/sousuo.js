var than = (function(){
    //数据排序方法
    let compare = function(cagValue,cagValue1){
        let index0 = cagValue.ViewVolume;
        let index1 = cagValue1.ViewVolume;
        return index1 - index0;
    }
    // 最多显示两行
    let slc = function(str,num){
        let jsc = str.slice(0,num);
        if(str.length <= num ){
            return str;
        }else{
            return jsc+'...';
        }  
    }
    let toDetailse = function(event){ //单个文章跳转
        let id = event.getElementsByClassName('title_id')[0];
        window.location.href = 'laod.html?id='+id.innerHTML;
    }
    let search = function(event){   //搜索功能
        let fater = event.parentNode,strHTMLt='',strHTMLO='',
        key_text = fater.getElementsByClassName('ico-text')[0].value,//输入的文字
        accurate_text = document.getElementById('ul_item_text'),
        accurate_video = document.getElementById('ul_item_video');
        //拿后台数据
        let strArr = window.localStorage.getItem('dataJSON');
        strArr = JSON.parse(strArr);
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
            let ElHTML ='<li class="ac-item" onclick="than.toDetailse(this)"><a class="title_a">'
                        +slc(arrT[t]['name'],24)+
                        '<span class="title_id none">'
                        +arrT[t]['_id']+
                        '</span></a></li>';
            strHTMLt += ElHTML;
        }
        let O = 0, lenO = arrO.length<=8?arrO.length:8;
        for(;O< lenO;O++){
            let ElHTML ='<li class="ac-item" onclick="than.toDetailse(this)"><a class="title_a">'
                        +slc(arrO[O]['name'],24)+
                        '<span class="title_id none">'
                        +arrO[O]['_id']+
                        '</span></a></li>';
            strHTMLO += ElHTML;
        }
        strHTMLt = strHTMLt == '' ? '未查询到数据':strHTMLt;
        strHTMLO = strHTMLO == '' ? '未查询到数据':strHTMLO;
        accurate_text.innerHTML = strHTMLt;
        accurate_video.innerHTML = strHTMLO;
    
    }
    let laoding = function(){ //加载数据
        let arrSrc = window.localStorage.getItem('arrAll');
        let ArrSrc = window.localStorage.getItem('dataJSON');
        arrSrc = JSON.parse(arrSrc);
        ArrSrc = JSON.parse(ArrSrc)[3];
        // 数组排序
        ArrSrc = ArrSrc.sort(compare);//降序

        let ul_item_text = document.getElementById('ul_item_text');    //文章
        let ul_item_video = document.getElementById('ul_item_video');  //视频
        let ul_item = document.getElementById('ul_item');

        //渲染到界面
        /**
         * 热搜区域
         * */ 
        let ElentHTML = '';
        for(let i = 0;i < (ArrSrc.length <= 15? ArrSrc.length : 15);i++){
            if(ArrSrc[i]['delete'] === 'false'){
                let cherHTML = '<li class="acfiex-item" onclick="than.toDetailse(this)"><a class="title_a">'
                            +slc(ArrSrc[i]['name'],12)+
                            '<span class="title_id none">'
                            +ArrSrc[i]['_id']+
                            '</span></a></li>';
                ElentHTML += cherHTML;
            }   
        }
        ul_item.innerHTML = ElentHTML;
        ElentHTML = '';
        /**
         * 内容区
         * */ 
        for(let i = 0;i < arrSrc[0].length;i++){
            let cherHTML = '<li class="ac-item" onclick="than.toDetailse(this)"><a class="title_a">'
                            +slc(arrSrc[0][i]['name'],24)+
                            '<span class="title_id none">'
                            +arrSrc[0][i]['_id']+
                            '</span></a></li>';
            ElentHTML += cherHTML;
        }
        ul_item_text.innerHTML = ElentHTML;
        ElentHTML = '';
        for(let i = 0;i < arrSrc[1].length;i++){
            let cherHTML = '<li class="ac-item" onclick="than.toDetailse(this)"><a class="title_a">'
                            +slc(arrSrc[1][i]['name'],24)+
                            '<span class="title_id none">'
                            +arrSrc[1][i]['_id']+
                            '</span></a></li>';
            ElentHTML += cherHTML;
        }
        ul_item_video.innerHTML = ElentHTML;
    }
    laoding();
    return{
        toDetailse:toDetailse,
        search:search
    }
})();
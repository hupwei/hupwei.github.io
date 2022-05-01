var charFu = (function(){
    let evekey = location.search;
    let eveId = evekey.split('?id=')[1];
    let data = window.localStorage.getItem('dataJSON');
    let arrElent = document.getElementsByClassName('detail')[0];
    data = JSON.parse(data)[3];
    let i = 0, len = data.length;
    for(;i < len;i++){
        if(data[i]['_id'] === eveId){
            arrElent.innerHTML = 
            '<div class="title">'
            +'<span class="author">作者:</span>'
            +'<span class="Name">'+data[i]['myName']+'</span>'
            +'<span class="lisTime">'+data[i]['setTime']+'</span>'
            +'</div>'
            +'<div class="num">'
            +'<div class="numWords">'
            +'<span>字数:</span>'
            +'<span>'+data[i]['num']+'</span>'
            +'</div>'
            +'<div class="read">'
            +'<span>阅读量/</span>'
            +'<span class="readNum">'+data[i]['ViewVolume']+'</span>'
            +'</div></div>'
            +'<div class="content">'
            +'<h1 class="title-t">'+data[i]['name']+'</h1>'
            +'<ul class="text">'
            +data[i]['preData']
            +'</ul></div>'
            +'<div class="tag">'
            +'<span>哒学长</span></div>';
        }
    }
    /**
         * 页面被打开8秒后
         * 记录加一
         * */
    let clickCont = setTimeout(function(){
        let Obj = {
            "_id":eveId,
            "contNum":1
        }
        let Char = window.localStorage.getItem('CharCont');
        Char = JSON.parse(Char);
        if(Char){
            let i = 0,len = Char.length;
            for(;i< len;i++){
                if(Char[i]['_id'] === eveId){
                    Char[i]['contNum']++;
                    break;
                }else if(i === len-1){
                    Char.push(Obj);
                }
            }
        }else{
            Char = [];
            Char.push(Obj);
        }
        Char = JSON.stringify(Char);
        window.localStorage.setItem('CharCont',Char);
        clearTimeout(clickCont);
    },8000)
    /**
     * 页面被关闭
     * */ 
    window.onunload = function() {
        clearTimeout(clickCont);//IE
        //chrome opera调试都执行该行，但“Blocked alert() during beforeunload.”
        //firefox 刷新执行该行，弹出“NS_ERROR_NOT_AVAILABLE: Component returned failure code: 0x80040111 (NS_ERROR_NOT_AVAILABLE) 　　　　[nsIDOMWindow.alert]”
        }
})();
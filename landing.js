let on = (function(){

    let langDing = function(){
        let frame = document.getElementsByClassName('frame')[0],
        user = frame.getElementsByClassName('textName')[0].value,
        cipher = frame.getElementsByClassName('passWord')[0].value;
        if(user.length<2 || cipher.length<2){
            alert('请输入有效账号和密码');
            return;
        }
        ajax_Request({
            type:"post",
            url:'./administrators/UserCioher.php',
            data:'user='+user+'&cipher='+cipher,
            success:function(eventStr){
                if(eventStr.length<11){
                    alert(eventStr);
                    return;
                }
                window.open(eventStr,'_blank');
                // 将id缓存于浏览器
                localStorage.setItem('Checksum',cipher);
            }
        })
    }
    
    return{
        langDing:langDing
    }
})();
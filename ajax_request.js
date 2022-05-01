/**
 * ajax工具函数   2022年/1月
 * 
 * @Param {*} type     请求类型
 * @Param {*} url      请求地址
 * @Param {*} data     传输数据
 * @Param {*} success  回调函数
 * */ 

/**
 * 传入方法 {}
 *   {
 *   type：type,
 *   url：url,
 *   data：data,
 *   success：function(){}
 *   }
 * */ 

function ajax_Request(option){
  // 如果是get 并且有数据
  if(option.type == 'get' && option.data){
    option.url += '?';
    option.url += option.data;
    option.data = null;
  }
  // 创建异步对象
  var xhr = window.XMLHttpRequest ?
            new window.XMLHttpRequest() :
            new ActiveXObject('Microsoft.XMLHTTP');
  //请求行
  xhr.open(option.type,option.url);
  //请求头
  if(option.type == 'post' && option.data){
      xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  }
  //回调函数
  xhr.onreadystatechange = function(){
      if(xhr.status == 200 && xhr.readyState == 4){
          var str = xhr.getResponseHeader('Content-Type');
          
          if(str.indexOf('json') != -1){
              option.success(JSON.parse(xhr.responseText));
          }else if(str.indexOf('xml') != -1){
              option.success(xhr.responseXML);
          }else{
              option.success(xhr.responseText);
          }
        
      } 
  }
  //请求主体
  xhr.send(option.data);
}
/*
感谢小良脚本


py andy




*/



$cache.set("id2","http://www.okzy.co/index.php?m=vod-search")
$cache.set("page",0)
$cache.set("id", "http://zuidazy.net/index.php?m=vod-search")
$cache.set("pg", 1)

$cache.set("name", " ")
go()

function go(){

 
$ui.render({
  props: {
    title: "查找视频"
  },
  views: [
    {
          type: "button",
          props: {
            title: "搜索"
          },
          layout: function(make) {
            make.right.top.inset(10)
            make.size.equalTo($size(64, 32))//按钮宽度
          },
          events: {
            tapped: function(sender) {
              $cache.set("pg",1)
              //点击页数返回开始
              search()
              //console.log(a)
            }
          }
        },
        
        
        {
          type: "input",
          props: {
            placeholder: "输入关键字空输入将随机"
          },
          layout: function(make) {
            make.top.left.inset(10)
            make.right.equalTo($("button").left).offset(-10)
            make.height.equalTo($("button"))
          },
          events: {
            returned: function(sender) {
            
             search()
              
            }
          }
        },
        
    
    
    {
      
      type: "list",
    
      layout: function(make) {
        make.top.equalTo(68)
        make.right.left.bottom.inset(0)
        //make.top.equalTo((50).bottom)

      },
      events: {
        didSelect:function(sender,indexPath,data){
          var id = data.split("\n")
          
         
          if (id[1].indexOf("http")!=-1)
          {
         
           
            gettwo(id[0],id[1])
          }else{
            
            $cache.set("page",1)
          getid(id[0],id[1])}
          
          
          
          
        },
        
        
        
        
        didReachBottom: function(sender){
                  var number = $cache.get("page")
                  
                  
                  sender.endFetchingMore()
                  
             var page =$cache.get("pg")
             if (page<number){
                  page+=1
                  $cache.set("pg",page)
                  
                  $ui.toast("第"+page+"页")
                  
                  
                  
                  getdatatwo($("list").data)
                  
                  }else{
                 $ui.toast("刷新完")
                  }
                  
                },
        
        
        
        
      }
    }
  ]
});



}



/*function gotwo(name,id){
$ui.push({
views: [
  
    {
      
      type: "list",
      props: {
        data:getid(name,id)
      },
      
              //列表类型
       layout: function (make) {
                 make.right.left.bottom.inset(0)
                 //左右间隔0
                  make.top.equalTo((0).bottom)
              },
              events: {
                //didSelect 实现列表点击事件时
                  didSelect: function (sender, indexPath, data) {
                    var id = data.split("\n")
                    
             console.log(data)
                              
                      gettwo(id[0],id[1])
                      
                  },
      
     
    }
  }]
  })




}
*/


function getdata(name){
 var url= $cache.get("id") 
$ui.loading(true)
$http.request({
 
  method:"POST",
  url: url,
  header:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'},
  form:{
    'submit':'search',
     'wd':name,
  },
  handler: function(resp) {
    var da = resp.data;
    //console.log(name)
    var number = da.match(/共([0-9]{1,})条数据/g)
    
    var next = da.match(/当前:(.*?)页/g)[0].split(":")[1].split("页")[0].split("/")
  
    console.log("共"+next[1]+"页")
      var txt = da.split(number)[0]
      txt = txt.match(/class="xing_vb4"><a(.*?)<\/span><\/li>/g)
      
      if (next[0]=="1"){
        
        
      var data =[]
      }
      if(next[1]!="1"){
        
        $cache.set("page",Number(next[1]))
        
        name=encodeURI(name)
        $cache.set("name",name)
        
  
        
      }
    
    for (var i in txt){
      var id = txt[i].match(/href="(.*?)"/)[1]
      var mc = txt[i].match(/target="_blank">(.*?)<span>/)[1]
      
      data.push(mc+"\n"+id)
    }
    
     $("list").data = data
     
     $("list").endFetchingMore()
                 
  },
 
}) 
}

function getdatatwo(list){
  
  var page =$cache.get("pg")
  var name = $cache.get("name")
  var url = $cache.get("id2")+page +"-wd-"+name+".html" 
  
  $http.get({
   
    
    url: url ,
    header:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'},
    handler: function(resp) {
      var da = resp.data
    
            var txt = da.split("当前位置")[1]
             
             txt = txt.match(/class="xing_vb4"><a(.*)<\/span><\/li>/g)
           
            
           
            
            
          
          for (var i in txt){
            var id = txt[i].match(/href="(.*?)"/)[1]
            
            var mc = txt[i].match(/target="_blank">(.*)<\/a>/)[1]
            
           
            list.push(mc + "\n" +id)
            
          }
          
      
      
      
      
      
       $("list").data = list
           
       $("list").endFetchingMore()
                       
    }
  });
  
  
}

function getid(mc,id){
  $ui.loading(true)
  $http.request({
  url:  "http://zuidazy.net/"+id,
  header:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'},
  handler: function(resp) {
    
    var da= resp.data
    
    
    if (da.indexOf("zuidam3u8")>=0){
    
    var txt = da.split("zuidam3u8")[1]
    $ui.loading(false)
    var id_1= [txt.split("复制链接")[0]]
    
    id_1 = id_1[0].match(/checked="" \/>(.*?)<\/li>/g)
    }else{
      $ui.toast(mc+"\n获取数据失败")
    }
    var id1=[]
    for (var i in id_1){
      
    
    var text = (id_1[i].split(">")[1].split("<")[0])
    var name = text.split("$")
    id1.push(name[0]+"\n"+name[1])
    
    
    
   }
   
   id1 = id1.reverse()
   return $("list").data = id1
   
    
  }
});
  
}




function search(){
 
  var keyword = $("input").text
  
     getdata(keyword)
}


function gettwo(name,url){

  $ui.push({
    props: {
      title:name
    },
    views: [
      {
        type: "web",
        props: {
          url:url
        },
        layout: $layout.fill
      }
    ]
  });
}




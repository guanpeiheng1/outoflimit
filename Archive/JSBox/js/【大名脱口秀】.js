/*pyい執筆丿灬寫年

感谢小良

*/
var urlt="https://i.qingting.fm/capi/channel/63048/programs/ebc54845d49201e019d84f3436dfeffc?curpage="
$cache.set("pg",1)

$ui.render({
  views: [
    {
      type: "list",
      
      layout: function(make) {
        make.right.left.bottom.inset(0)
        make.top.equalTo(1).bottom

      },
      events: {
        didSelect : function(sender ,indexPath,list_all){
          var id = list_all.split("\n")
          add(id[0],id[1])
        },
        didReachBottom: function(sender){
          sender.endFetchingMore()
          var page = $cache.get("pg")+1
          $cache.set("pg",page)
          getdata()
        }
        
        
        
      }
    }
  ]
});

getdata()
function getdata(){
  var pg = $cache.get("pg")
  $http.get({
  url:  urlt+pg,
  handler: function(resp) {
    var data= resp
    data=data["data"]["data"]["programs"]
    if (pg==1){
      var list_all= []
      
    }else{
      
      list_all=$("list").data
    }
    for (var i in data){
    //var id = data[i]["id"]
    //var nane = data[i]["title"]
    list_all.push(data[i]["title"]+ "\n" + data[i]["id"])
    
    }
    $("list").data=list_all
    $("list").endFetchingMore()
            
    
    
  }
});
  
}


function add(name , id){
  $http.get({
    url: "http://i.qingting.fm/wapi/channels/63048/programs/"+ id,
    handler: function(resp) {
      var data = resp.data;
      var url = data["data"][ "file_path"]
      
      getplay(name , url)
    }
  });
}


function getplay(name , id){

  name = name.split("：")[1]
  $ui.push({
    props: {
      title:name
    },
    views: [
      {
        type: "web",
        props: {
          url:"http://od.qingting.fm/" +id
        },
        layout: $layout.fill
      }
    ]
  });
}

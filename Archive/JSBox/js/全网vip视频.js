var warn = 0 //(0 or 1)

$app.strings = {
  "en": {
    "jk1": "Port0",
    "jk2": " Add port",
  },
    "zh-Hant": {
    "解析口1": "默认接口❈",
    "xzjk": "新增接口⊕",
//......
  },
}

var ports = [
  { name: $l10n("解析一"), url:"http://www.mvcat.com/player/?url="},
  { name: "解析二", url: "http://y.mt2t.com/lines?url=" },
  { name: "解析三", url: "https://api.azzc.cn/jx/?url="},
  { name: $l10n("思古解析"), url: "http://api.bbbbbb.me/jx/?url=" },
]

var NET = [
  { name: "爱奇艺", url: "http://m.iqiyi.com" },
  { name: "优酷", url: "http://m.vip.youku.com" },
  { name: "腾讯", url: "http://m.v.qq.com" },
  { name: "乐视", url: "http://m.le.com/vip/" },
  { name: "芒果", url: "http://m.mgtv.com/#/channel/home" },
  { name: "搜狐", url: "http://m.tv.sohu.com/film" },
  { name: "PPTV", url: "http://m.pptv.com/?location=m_channel_vip" },
    { name: "🔍", url: "http://m.v.sogou.com/vw/search.jsp" },
]
var Port = ports[0].url //(0~4)
var PoetN = ports[0].name //(0~4)
var Site = NET[0].url //(0~8)
var r = /\w{2,10}\.com/
var i = 0
var reg = ""
while (NET[i]) {
  if (reg.length !== 0) {
    var reg = r.exec(NET[i].url) + ".*html|" + reg
  } else {
    var reg = r.exec(NET[i].url) + ".*html" + reg
  }
  i++
}
var reg = reg + "|mgtv.com/#/"

if (warn == 1) {
  $ui.toast("anton.j的提醒:运行此脚本建议关闭SSR及相关")
} else {}

if (typeof($context.safari) == "undefined") {
  var link = $context.link || $clipboard.link ? $context.link || $clipboard.link : ""
} else {
  var link = $context.safari.items.location.href
}
if (link.search(reg) == -1) {} else {
  $ui.alert({
    title: "直接解析播放如下链接:\n\n" + link,
    actions: [{
        title: "OK",
        handler: function() {
          parse_play(link)
        }
      },
      {
        title: "Cancel",
        style: "Cancel",
      },
    ]
  })
}
main(Site)

//all function
function main(url) {
  $ui.render({
    props: {
      title: "VIP视频"
    },
    views: [{
        type: "web",
        props: {
          id: "videoweb",
          url: Site,
          toolbar: true,

          script: function() {
            var Html = window.parent.location.href
            $notify("customEvent", Html)
          }

        },
        layout: function(make, view) {
          make.top.inset(28)
          make.bottom.right.left.inset(0)
        },

        events: {
          customEvent: function(object) {
            $("videoweb").title = object
          }
        }

      },

      {
        type: "tab",
        props: {
          id: "headmenu",
          items: NET.map(function(item) {
            return item.name
          }),
          bgcolor: $rgb(84,84,84),
          radius: 8,
          tintColor: $color("#ffffff")
        },
        layout: function(make, view) {
          make.top.left.right.inset(2)
          make.height.equalTo(25)
        },
        events: {
          changed: function(sender) {
            var Site = NET[sender.index].url
            var Title = NET[sender.index].name
            $("videoweb").url = Site
          }
        }
      },
      {
        type: "button",
        props: {
          id: "play",
          title: "解析 ᐅ",
          bgcolor: $rgb(84,84,84),
          titleColor: $color("white "),
          font: $font(20)
        },
        layout: function(make, view) {
          make.right.inset(1)
          make.bottom.inset(45)
          make.width.equalTo(70)
          make.height.equalTo(32)
        },
        events: {
          tapped: function(sender) {
            var link = $("videoweb").title
            //var link = $clipboard.link
            if (link.search(reg) == -1) {
              $ui.alert("【当前视频地址不正确】\n\n请至视频最终页面再点[解析]键\n")
            } else {
              $ui.toast(link)
              parse_play(link)
            }
          }
        }
      },

      {
        layout: function(make, view) {
          make.left.inset(1)
          make.bottom.inset(45)
          make.width.equalTo(55)
          make.height.equalTo(32)
        },
      }
    ]
  })
}

function parse_play(url) {
  $ui.push({
    views: [{
        type: "web",
        props: {
          id: "playweb",
          title: "看视频",
          url: Port + url,
          //toolbar: true
        },
        layout: $layout.fill
      },
      {
        type: "tab",
        props: {
          id: "bottommenu",
          items: ports.map(function(item) {
            return item.name
          }),
          bgcolor: $rgb(66, 66, 66),
          radius: 6,
          tintColor: $color("#696969")
        },
        layout: function(make, view) {
          make.left.right.inset(2)
          make.bottom.inset(2)
          make.height.equalTo(15)
        },
        events: {
          changed: function(sender) {
            var Port = ports[sender.index].url
            var PortN = ports[sender.index].name

            if (PortN.search("新增") == -1) {
              $("playweb").url = Port + url
            } else {
              addport(Port, PortN)
            }

          }
        }
      },
    ]
  })
}


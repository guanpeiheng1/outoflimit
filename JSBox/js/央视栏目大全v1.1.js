// 作者：Final Fantasy
// 更新日期：2019-07-04
// v1.1更新内容:
//   修复大部分失效栏目,部分栏目暂不支持
//   增加检测、解析剪贴板中的央视视频链接,如:http://tv.cctv.com/2018/06/16/VIDEjxPlWJL10pNgwYSjZtHW180616.shtml
var menus = ["全部", "一线", "今日说法", "天网"]
var id_to_topicid = {
  "EPGM1387526868062535": "TOPC1451542861682530",
  "EPGM1387361853720340": "TOPC1451543382680164",
  "EPGM1513732379241201": "TOPC1513676755770201",
  "EPGM1387361853673106": "TOPC1451525396109388",
  "EPGM1387361853720343": "TOPC1451542672944335",
  "EPGM1487120547219814": "TOPC1487120479377477",
  "EPGM1387361853673125": "TOPC1451464884159276",
  "EPGM1396427506050159": "TOPC1451378757637200",
  "EPGM1453360069895346": "TOPC1451526037568184",
  "EPGM1387361853720338": "TOPC1451543228296920",
  "EPGM1508206668865608": "TOPC1485052424945417",
  "EPGM1387361853673136": "TOPC1451543074960748",
  "EPGM1387532679297430": "TOPC1451543312252987",
  "EPGM1387361853720349": "TOPC1451543462858283",
  "EPGM1504325084473710": "TOPC1502421901609291",
  "EPGM1498699732653943": "TOPC1496896250071637",
  "EPGM1500019185131400": "TOPC1499840226761151",
  "EPGM1510881730892545": "TOPC1509500865106312",
  "EPGM1387361853673102": "TOPC1451528971114112",
  "EPGM1524712188374675": "TOPC1524537559591830",
  "EPGM1387361853673110": "TOPC1451466072378425",
  "EPGM1525427523857541": "TOPC1525335417343777",
  "EPGM1387361853673113": "TOPC1451378857272262",
  "EPGM1387361853673105": "TOPC1451464665008914",
  "EPGM1387361853720342": "TOPC1451543263837956",
  "EPGM1387361853720350": "TOPC1451542933238628",
  "EPGM1516843728011489": "TOPC1516784350726581",
  "EPGM1387361853720345": "TOPC1451543346581129",
  "EPGM1461836084024791": "TOPC1461740566533993",
  "EPGM1387361853720348": "TOPC1451543426689237",
  "EPGM1387361853673138": "TOPC1451378967257534",
  "EPGM1387361853673120": "TOPC1451525239722138",
  "EPGM1387361853673112": "TOPC1451525103989666",
  "EPGM1387361853673104": "TOPC1451528792881669",
  "EPGM1387361853720341": "TOPC1451542784285432",
  "EPGM1511418950407339": "TOPC1511322878867827",
  "EPGM1387361853673115": "TOPC1452063879122866",
  "EPGM1387361853720344": "TOPC1451542968215667",
  "EPGM1387361853673118": "TOPC1451558976694518",
  "EPGM1387361853720347": "TOPC1451543168050863",
  "EPGM1387361853720339": "TOPC1451542824484472"
}
var topicDict = {
  "一线": { "topicid": "TOPC1451543462858283" },
  "今日说法": { "topicid": "TOPC1451464665008914" },
  "天网": { "topicid": "TOPC1451543228296920" },
}
var screenWidth = $device.info.screen.width
// $console.warn($device.info)
var column = parseInt(screenWidth / (370 / 2))
//var column = 2
var spacing = 2
var imgRatio = 120 / 160
var itemHeight = (screenWidth - column * spacing * 2) / column * imgRatio + 15
var height = $device.info.screen.height - 180
var videoSet = []
var page = 1
channelList = ["全部", "CCTV-1 综合", "CCTV-2 财经", "CCTV-3 综艺", "CCTV-4 中文国际", "CCTV-5 体育", "CCTV-6 电影", "CCTV-7 军事农业", "CCTV-8 电视剧", "CCTV-9 纪录", "CCTV-10 科教", "CCTV-11 戏曲", "CCTV-12 社会与法", "CCTV-13 新闻", "CCTV-14 少儿", "CCTV-15 音乐"]
cidList = ["", "EPGC1386744804340101", "EPGC1386744804340102", "EPGC1386744804340103", "EPGC1386744804340104", "EPGC1386744804340107", "EPGC1386744804340108", "EPGC1386744804340109", "EPGC1386744804340110", "EPGC1386744804340112", "EPGC1386744804340113", "EPGC1386744804340114", "EPGC1386744804340115", "EPGC1386744804340116", "EPGC1386744804340117", "EPGC1386744804340118"]
typeList = ["全部", "新闻", "体育", "综艺", "健康", "生活", "科教", "经济", "农业", "法治", "军事", "少儿", "动画", "纪实", "戏曲", "音乐", "电影电视剧"]
letterList = ["全部", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "page", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

function searchChannel(channel, type, letter) {
  var n = 20
  var fl = letter != "全部" ? "&fl=" + letter : ""
  var fc = type != "全部" ? "&fc=" + encodeURIComponent(type) : ""
  var cid = channel != "全部" ? "&cid=" + cidList[channelList.indexOf(channel)] : ""
  var url = `http://api.cntv.cn/lanmu/columnSearch?${fl}${fc}${cid}&p=${page}&n=${n}&serviceId=tvcctv&t=jsonp&cb=Callback`
  //  var url=`http://api.cntv.cn/lanmu/columnSearch?&fl=B&fc=%E7%A7%91%E6%95%99&cid=EPGC1386744804340103&p=1&n=10&serviceId=tvcctv&t=jsonp&cb=Callback`
  $http.get({
    url: url,
    handler: function (resp) {
      // $console.warn(resp.data)
      var dict = eval(resp.data.slice(8, -1))
      var data = []
      // $console.warn(dict.response.docs)
      for (var item of dict.response.docs) {
        var name = item.column_name
        var topicid = item.topicid
        var cid = item.column_id
        var logo = item.column_logo
        var index_url = item.column_backvideoaddress
        var date = item.column_playdate
        data.push({
          topicid: topicid,
          cid: cid,
          index_url: index_url,
          title: { text: name },
          date: { text: date },
          guest: { text: item.column_guest },
          img: { src: logo },
        })
      }
      // $console.warn(data)
      if (data.length == 0) {
        if (page == 1) {
          $ui.toast("筛选结果为空")
        } else {
          page--
          $ui.toast("已是最后一页")
        }
      } else {
        $("lm").data = data
        $("pageNum").text = page.toString()
      }
      // $console.warn(dict)
    }
  })
}

function start() {
  $ui.render({
    props: {
      title: "栏目大全",
      id: "lmdq",
    },
    views: [{
      type: "menu",
      props: {
        id: "menu",
        items: menus,
      },
      layout: function (make, view) {
        make.top.left.right.inset(0)
        make.height.equalTo(35)
      },
      events: {
        changed(sender) {
          var idx = sender.index
          switch (idx) {
            case 0:
            // $("lmdq").add(filterView())
            //              searchChannel()
            default:
              page = 1
              getVideos_topicid(menus[idx], topicDict[menus[idx]].topicid, true)
          }
        }
      }
    },
    ]
  })
  $("lmdq").add(filterView())
  page=1
  searchChannel("全部", "全部", "全部")
}

function filterView() {
  return {
    type: "view",
    props: {
      title: "筛选器",
      id: "filterView",
    },
    views: [{
      type: "label",
      props: {
        text: "频道:",
        id: "channel",
        font: $font(24),
      },
      layout: function (make) {
        make.top.inset(0)
        make.left.inset(10)
        make.height.equalTo(50)
        make.width.equalTo(80)
      }
    },
    {
      type: "picker",
      props: {
        id: "filter_channel",
        items: [channelList],
        font: $font(10),
      },
      layout: function (make) {
        make.right.top.inset(0)
        make.left.equalTo($("channel").right).offset(2)
        make.height.equalTo(50)
      }
    },
    {
      type: "label",
      props: {
        text: "分类:",
        id: "type",
        font: $font(24),
      },
      layout: function (make) {
        make.top.equalTo($("filter_channel").bottom).inset(-15)
        make.left.inset(10)
        make.height.equalTo(50)
        make.width.equalTo(80)
      }
    },
    {
      type: "picker",
      props: {
        id: "filter_type",
        items: [typeList],
        font: $font(10),
      },
      layout: function (make) {
        make.top.equalTo($("type").top).offset(0)
        make.right.inset(0)
        make.left.equalTo($("type").right).offset(2)
        make.height.equalTo(50)
      }
    },
    {
      type: "label",
      props: {
        text: "首字母:",
        id: "firstletter",
        font: $font(24),
      },
      layout: function (make) {
        make.top.equalTo($("filter_type").bottom).inset(-15)
        make.left.inset(10)
        make.height.equalTo(50)
        make.width.equalTo(80)
      }
    },
    {
      type: "picker",
      props: {
        id: "filter_letter",
        items: [letterList],
        font: $font(10),
      },
      layout: function (make) {
        make.top.equalTo($("firstletter").top).offset(0)
        make.right.inset(0)
        make.left.equalTo($("firstletter").right).offset(2)
        make.height.equalTo(50)
      }
    },
    {
      type: "button",
      props: {
        id: "btn_search",
        title: "筛选",
        font: $font(24),
      },
      layout: function (make) {
        make.top.equalTo($("filter_letter").bottom)
        make.left.right.inset(10)
        make.height.equalTo(35)
      },
      events: {
        tapped: function (sender) {
          var channel = $("filter_channel").data[0]
          var type = $("filter_type").data[0]
          var letter = $("filter_letter").data[0]
          page = 1
          searchChannel(channel, type, letter)
        }
      }
    },
    {
      type: "list",
      props: {
        id: "lm",
        rowHeight: 204,
        template: [{
          type: "image",
          props: {
            id: "img",
            radius: 3,
          },
          layout: function (make, view) {
            make.left.inset(5)
            make.top.inset(5)
            make.height.equalTo(150)
          }
        },
        {
          type: "label",
          props: {
            id: "title",
            font: $font(18),
            textColor: $color("#C70708"),
          },
          layout: function (make, view) {
            make.left.inset(5)
            make.width.equalTo(160)
            make.top.equalTo($("img").bottom)
            make.height.equalTo(22)
          }
        },
        {
          type: "label",
          props: {
            id: "guest",
            font: $font(16),
            bgcolor: $color("#F5F5F5"),
          },
          layout: function (make, view) {
            make.right.inset(5)
            make.left.equalTo($("title").right).offset(5)
            make.top.equalTo($("title").top)
            make.height.equalTo(22)
          }
        },
        {
          type: "label",
          props: {
            id: "date",
            font: $font(14),
          },
          layout: function (make, view) {
            make.left.inset(5)
            make.top.equalTo($("guest").bottom).offset(5)
            make.right.inset(5)
            make.bottom.inset(5)
          }
        },
        ]
      },
      layout: function (make) {
        make.left.right.inset(0)
        make.top.equalTo($("btn_search").bottom)
        make.height.equalTo(420)
      },
      events: {
        didSelect: function (tableView, indexPath) {
          var item = tableView.object(indexPath)
          page = 1
          // $console.warn(item)
          if (id_to_topicid[item.cid]) {
            getVideos_topicid(item.title.text, id_to_topicid[item.cid], true)
          } else {
            get_topicid(item.title.text, item.index_url, true)
          }

          // getVideos_topicid(item.title.text, item.topicid,true)
        }
      }
    },
    {
      type: "label",
      props: {
        id: "pageNum",
        align: $align.center,
        text: page.toString(),
        bgcolor: $color("white"),
        font: $font(16),
        radius: 5,
        alpha: 0.8,
      },
      layout: function (make) {
        make.bottom.inset(10)
        make.left.equalTo(screenWidth / 2 - 20)
        make.width.equalTo(20 * 2)
        make.height.equalTo(40)
      }
    }, {
      //   type:"view",
      //   props:{
      //     id:"pageView",
      //     frame:$rect(x, y, width, height),
      //   }
      // },{
      type: "button",
      props: {
        title: "上一页",
        id: "lastPage",
        font: $font(16),
        alpha: 0.8,
      },
      layout: function (make) {
        make.bottom.inset(10)
        make.right.equalTo($("pageNum").left)
        make.width.equalTo(60)
        make.height.equalTo(40)
      },
      events: {
        tapped: function (sender) {
          if (page == 1) {
            $ui.toast("当前已是第一页")
          } else {
            var channel = $("filter_channel").data[0]
            var type = $("filter_type").data[0]
            var letter = $("filter_letter").data[0]
            page--
            searchChannel(channel, type, letter)
          }
        }
      }
    }, {
      type: "button",
      props: {
        title: "下一页",
        id: "nextPage",
        font: $font(16),
        alpha: 0.8,
      },
      layout: function (make) {
        make.bottom.inset(10)
        make.left.equalTo($("pageNum").right)
        make.width.equalTo(60)
        make.height.equalTo(40)
      },
      events: {
        tapped: function (sender) {
          var channel = $("filter_channel").data[0]
          var type = $("filter_type").data[0]
          var letter = $("filter_letter").data[0]
          // $console.warn(page)
          page++
          searchChannel(channel, type, letter)
        }
      }
    }
    ],
    layout: function (make, view) {
      make.left.right.bottom.inset(0)
      make.top.equalTo($("menu").bottom).inset(-5)
    }
  }
}

function itemList(name, topicid) {
  $ui.push({
    props: {
      title: name,
      id: "Matrix",
    },
    views: [{
      type: "matrix",
      props: {
        columns: column,
        id: "item_list",
        spacing: spacing,
        square: false,
        itemHeight: itemHeight,
        template: mainTemplate,
      },
      layout: $layout.fill,
      /*layout: function(make, view) {
        make.top.bottom.left.inset(5)
        make.width.equalTo(270/450*180)
     },*/
      events: {
        didSelect: function (tableView, indexPath) {
          var item = tableView.object(indexPath)
          getPid(item.url)
        }
      }
    }, {
      type: "label",
      props: {
        id: "pageNum",
        align: $align.center,
        text: page.toString(),
        bgcolor: $color("white"),
        font: $font(16),
        radius: 5,
        alpha: 0.8,
      },
      layout: function (make) {
        make.bottom.inset(10)
        make.left.equalTo(screenWidth / 2 - 20)
        make.width.equalTo(20 * 2)
        make.height.equalTo(40)
      }
    }, {
      //   type:"view",
      //   props:{
      //     id:"pageView",
      //     frame:$rect(x, y, width, height),
      //   }
      // },{
      type: "button",
      props: {
        title: "上一页",
        id: "lastPage",
        font: $font(16),
        alpha: 0.8,
      },
      layout: function (make) {
        make.bottom.inset(10)
        make.right.equalTo($("pageNum").left)
        make.width.equalTo(60)
        make.height.equalTo(40)
      },
      events: {
        tapped: function (sender) {
          if (page == 1) {
            $ui.toast("当前已是第一页")
          } else {
            page--
            if (videoSet.length == 0) {
              getVideos_topicid(name, topicid, false)
            } else {

              var videos = videoSet.slice((page - 1) * 20, page * 20)
              $("pageNum").text = page.toString()
              $("item_list").data = videos

            }
          }
        }
      }
    }, {
      type: "button",
      props: {
        title: "下一页",
        id: "nextPage",
        font: $font(16),
        alpha: 0.8,
      },
      layout: function (make) {
        make.bottom.inset(10)
        make.left.equalTo($("pageNum").right)
        make.width.equalTo(60)
        make.height.equalTo(40)
      },
      events: {
        tapped: function (sender) {
          page++
          if (videoSet.length == 0) {
            getVideos_topicid(name, topicid, false)
          } else {
            if ((page - 1) * 20 < videoSet.length) {
              var videos = videoSet.slice((page - 1) * 20, page * 20)
              $console.warn(videoSet.length);
              $console.warn(videos);
              $("pageNum").text = page.toString()
              $("item_list").data = videos
            } else {
              page--
              $ui.toast("当前已是最后一页")
            }
          }

        }
      }
    }],
    layout: $layout.fill
  })
}

mainTemplate = [{
  type: "image",
  props: {
    id: "initialCover",
  },
  layout: function (make, view) {
    make.right.left.top.inset(0)
    make.height.equalTo((screenWidth - column * spacing * 2) / column * imgRatio)
  }
}, {
  type: "label",
  props: {
    id: "title",
    bgcolor: $rgb(242, 184, 103),
    textColor: $color("white"),
    align: $align.center,
    font: $font(16),
    autoFontSize: true,
    alpha: 0.9,
  },
  layout: function (make) {
    make.left.right.inset(0)
    make.bottom.inset(0)
    make.height.equalTo(15)
  },
}, {
  type: "label",
  props: {
    id: "status",
    bgcolor: $rgb(114, 148, 177),
    textColor: $color("white"),
    align: $align.center,
    font: $font("bold", 12),
    radius: 4,
    alpha: 0.8
  },
  layout: function (make, view) {
    make.top.left.inset(0)
    make.height.equalTo(18)
    make.width.equalTo(60)
  }
},]

function getVideos_topicid(name, topicid, needUIpush) {
  var n = 10
  var url = `http://api.cntv.cn/lanmu/videolistByColumnId?id=${topicid}&n=${n}&of=fdate&p=${page}&type=0&serviceId=tvcctv&cb=Callback`
//  $console.warn(url)
  $http.get({
    url: url,
    handler: function (resp) {
      //      $console.warn(resp.data)
      var dict = eval(resp.data.slice(8, -1))
      var videos = []
      for (var video of dict.response.docs) {
        var url = video.videoUrl
        var title = video.videoTitle.split(" ")[2]
        if (title == undefined) {
          var title = video.videoTitle
        } else {
          var title = video.videoTitle.slice(video.videoTitle.indexOf(title))
        }
        var date = video.videoTitle.split(" ")[1]
        var img = video.videoKeyFrameUrl
        videos.push({
          url: url,
          title: {
            text: title
          },
          status: {
            text: date
          },
          initialCover: {
            src: img
          }
        })
      }
      if (videos.length == 0) {
        $ui.toast("已是最后一页")
      } else {
        videoSet = []
        if (needUIpush) {
          itemList(name, topicid)
        } else {
          $("pageNum").text = page.toString()
        }
        $("item_list").data = videos
      }
    }
  })
}

function getVideos_url(name, index_url) {
  var url_videoset = index_url
  // $console.warn(url_videoset)
  $http.get({
    url: url_videoset,
    handler: function (resp) {
      var html = resp.data
      var m = html.match(/<div class="image" style="[\s\S]+?<img src="[^"]+"[\s\S]+?<a href="[^"]+" target="_blank">([^<]+)/g)
      var videos = []
      for (var v of m) {
        var m_video = v.match(/<img src="([^"]+)"[\s\S]+?<a href="([^"]+)" target="_blank">([^<]+)/)
        var img = m_video[1]
        var url = m_video[2]
        var title = m_video[3].split(" ")[2]
        var date = m_video[3].split(" ")[1]
        videos.push({
          url: url,
          title: {
            text: title
          },
          status: {
            text: date
          },
          initialCover: {
            src: img
          }
        })
      }
      itemList(name)
      $("item_list").data = videos //.slice(0,25)
    }
  })
}

function getPid(url) {
  // var url = "http://tv.cctv.com/2018/06/16/VIDEjxPlWJL10pNgwYSjZtHW180616.shtml"
  //  http://tv.cctv.com/v/v1/VIDEd0Y9iIjwPDfICQTQR9Z6190702.html?spm=C28340.PAx0UfRDwU7s.E2U4yXoaVNjH.2 
  //  $console.warn(url)
  var headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-cn",
    "Referer": "http://tv.cctv.com/",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_1 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Version/11.0 Mobile/15B150 Safari/604.1",
  }
  $http.get({
    url: url,
    header: headers,
    handler: function (resp) {
      var html = resp.data
//      $console.warn(html)
//      var regx = /fo\.addVariable\("(videoCenterId)"\s*,\s*"([^"]+)"\);/
      var regx=/guid\s*=\s*['"]([0-9a-f]{32})['"]/
      //fo.addVariable("videoId", "3tCXGNk0knHrzA5qQJH190703");//视频id
      var m_pid = html.match(regx)
//      $console.warn(m_pid)
      if (m_pid != null) {
        var pid = m_pid[1]
        // $console.warn(pid);
//         pid='b4ec01fc3e8f43f1a11bf4f5c5a9ee63'
        getDlink(pid)
      } else {
        $ui.toast("找不到视频id")
      }
    }
  })
}

function getList(topicid, vid) {
  var url = `http://api.cntv.cn/video/getVideoListByTopicIdInfo?videoid=${vid}&topicid=${topicid}&serviceId=tvcctv&type=0&cb=jsonp2`
  $http.get({
    url: url,
    handler: function (resp) {
      var dict = resp.data
    }
  })
}

function getDlink(pid) {
  var vdn_tsp = new Date().getTime().toString().slice(0, 10);
  var vdn_vn = "2049";
  var vdn_vc = "";
  var staticCheck = "47899B86370B879139C08EA3B5E88267";
  var vdn_uid = "";
  var vdn_wlan = "";
  var dataUrl = "http://vdn.apps.cntv.cn/api/getIpadVideoInfo.do?pid=" + pid + "&tai=ipad&from=html5";
  var vdn_vc = $text.MD5((vdn_tsp + vdn_vn + staticCheck + vdn_uid)).toUpperCase();
  dataUrl += "&tsp=" + vdn_tsp + "&vn=" + vdn_vn + "&vc=" + vdn_vc + "&uid=" + vdn_uid + "&wlan=" + vdn_wlan;
  $http.get({
    url: dataUrl,
    handler: function (resp) {
      var js = resp.data
      var m = js.match(/'([^']+)'/)
      if (m != null) {
        var dict = eval("(" + m[1] + ")")
        var hls_url = dict.hls_url
        var prefix = hls_url.split("/").slice(0, 3).join("/")
        // $console.warn(prefix)
        $http.get({
          url: hls_url,
          handler: function (resp) {
            var m_quality = resp.data.match(/BANDWIDTH=[^/]+([\S]+)/g)
            var menuItems = { menus: [], urls: [] }
            for (var quality of m_quality) {
              var m = quality.match(/BANDWIDTH=([\d]+).+RESOLUTION=([\S]+)[^/]+?([\S]+)/)
              var resolution = m[2] + "-" + (Number(m[1]) / 1024).toString() + " kbps"
              var dlink = prefix + m[3]
              menuItems.menus.push(resolution)
              menuItems.urls.push(dlink)
            }
            selectQuality(menuItems)
            // $console.warn(m_quality)
          }
        })
        // $console.warn(dict)
      }
    }
  })
}

function selectQuality(menuItems) {
  $ui.menu({
    items: menuItems.menus,
    handler: function (title, idx) {
      // var common = require("common")
      // common.displayMenu(menuItems.urls[idx])
      displayMenu(menuItems.urls[idx])
    }
  })
}

function displayMenu(url, name) {
//  $console.warn(url);

  var titles = [
    "在nplayer中播放",
    "在MKplayer中播放",
    "立即播放",
    "在Alook中播放",
    "仅复制地址",
  ];

  $ui.menu({
    items: titles,
    handler: function (title, idx) {
      if (idx == 0) {
        $clipboard.text = url;
        //        if (url.indexOf(".m3u8") > -1 && url.indexOf("iqiyi.com") > -1) {
        //          saveToM3u8(url, name);
        //        } else {
        $app.openURL("nplayer-" + url);
        //        }
      } else if (idx == 1) {
        $clipboard.text = url;
        $app.openURL("mkplayer://m3u8.play?url=" + encodeURI(url));
      } else if (idx == 2) {
        webPlayer(url, name);
        //        $app.openURL(url)
      } else if (idx == 3) {
        $clipboard.text = url;
        $app.openURL("alook://" + url);
      } else if (idx == 4) {
        $clipboard.text = url;
        $ui.toast("地址已成功复制到剪贴板")
        //        $ui.alert({
        //          title: "复制成功！",
        //          message: url
        //        });
      } else if (idx == 5) {
        writeToTxt(url);
      } else {
        saveToM3u8(url, name);
      }
    }
  });
}
function webPlayer(url, name) {
  $ui.push({
    props: {
      title: name
    },
    views: [
      {
        type: "web",
        props: {
          toolbar: true,
          url: url
        }
      }
    ]
  });
}
function choiceMenu(dlink) {
  $ui.menu({
    items: ["直接播放", "在nplayer中播放", "仅复制地址"],
    handler: function (title, idx) {
      if (idx == 0) {
        playVideo(dlink)
      } else if (idx == 1) {
        $clipboard.text = dlink
        $app.openURL("nplayer-" + dlink)
      } else if (idx == 2) {
        $clipboard.text = dlink
        $ui.toast("地址已复制😈")
      }
    }
  })
}

function playVideo(dlink) {
  $ui.push({
    views: [{
      type: "web",
      props: {
        url: dlink,
      },
      layout: $layout.fill
    }]
  })

}
//$ui.render({
//  type:"list",
//  layout:$layout.fill
//})
// getPid()
function get_topicid(name, url, needUIpush) {
  $http.get({
    url: url,
    handler: function (resp) {
      var html = resp.data;
      // $console.warn(html);
      var regx = /TOPC(\d+)/
      var e = regx.exec(html)
      // $console.warn(e);
      if (e != null) {
        var topicid = 'TOPC' + e[1]
        getVideos_topicid(name, topicid, needUIpush)
      } else {
        regx = /<img src="([^"]+)".+?<\/a><\/div>[\r\n]*.+?href="([^"]+)".+>(.+?)<\/a><\/div>/g
        videoSet = []
        while ((e = regx.exec(html)) != null) {
          // var img=e[1]
          // var title = e[3]
          var title = e[3].split(" ")[2]
          // $console.warn(title);
          if (title == undefined) {
            title = e[3]
          } else {
            title = e[3].slice(e[3].indexOf(title))
          }
          var date = e[3].split(" ")[1]
          videoSet.push({
            url: e[2],
            title: {
              text: title
            },
            status: {
              text: date
            },
            initialCover: {
              src: e[1]
            }
          })

        }
        //        $console.warn(videoSet.length);

        if (videoSet.length > 0) {
          page = 1
          if (needUIpush) {
            itemList(name, topicid)
          } else {
            $("pageNum").text = page.toString()
          }
          var videos = videoSet.slice(0, 20)
          $("item_list").data = videos
        } else {
          $ui.toast("暂无法获取该栏目！");
        }
      }
    }
  });
}

//start()
var text_clip = $clipboard.text
var e = /https?:\/\/tv.cctv.com.+?\/VIDE[^.]+.s?html/.exec(text_clip)
if (e != null) {
  $console.warn(e);
  $ui.alert({
    title: "检测到央视网视频链接",
    message: e[0],
    actions: [{

      title: "解析",
      disabled: false, // Optional
      handler: function () {
        getPid(e[0])
      }
    }, {

      title: "不解析",
      disabled: false, // Optional
      handler: function () {
        start()
      }
    }]
  });
}else{
  start()
}


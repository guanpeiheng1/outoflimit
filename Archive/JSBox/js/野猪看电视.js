/*
moonzju@twitter
野猪看电视
观看电视直播源的节目，外国电视为主，绝大部分是720P画质，某些频道可能需要翻墙才能观看
感谢LCO LOK网友提供的直接点击播放的方法
version：1.0.6
*/ 

var channelName=["FOX2", "FOX3","湖南卫视高清","TVB财经台","TVBS HD","NHK", "CNN", "ABC News", "Weather" ,"MSNBC","中国气象频道","凤凰卫视中文台","凤凰卫视资讯台","凤凰卫视香港台","高清时装台","TVB娱乐新闻台","奇妙电视","金鹰纪实高清","USA DW","DTV HD","BTV HD","MTV HD"]
var channelAddr=[
    "http://cdn2.bear-tv.com/freetv/TOT_foxsport2/chunks.m3u8?",
    "http://cdn2.bear-tv.com/freetv/TOT_foxsport3/chunks.m3u8?",
    "http://223.110.243.148/PLTV/4/224/3221227525/index.m3u8",
    "http://e1.vdowowza.vip.hk1.tvb.com/tvblive/smil:mobilehd_financeintl.smil/chunklist.m3u8",
    "http://210.201.54.102/gtlive2/tc-tvbs/chunklist_w1101125571.m3u8",
    "https://nhkworld.webcdn.stream.ne.jp/www11/nhkworld-tv/global/263941/live_wa_s.m3u8",
    "https://5b8ec3e62bc9e.streamlock.net:4044/cnewz/myStream//playlist.m3u8?",
    "https://abclive2-lh.akamaihd.net/i/abc_live11@423404/master.m3u8",
    "https://weather-lh.akamaihd.net/i/twc_1@92006/master.m3u8",
    "http://tvemsnbc-lh.akamaihd.net/i/nbcmsnbc_1@122532/master.m3u8",
    "http://hls.weathertv.cn/tslslive/qCFIfHB/hls/live_sd.m3u8",
    "http://223.110.245.167/ott.js.chinamobile.com/PLTV/3/224/3221226922/index.m3u8",
    "http://223.110.245.167/ott.js.chinamobile.com/PLTV/3/224/3221226923/index.m3u8",
    "http://183.207.249.35/PLTV/3/224/3221226975/index.m3u8",
    "http://wfc.bonus-tv.ru:80/cdn/wfcint/tracks-v2a1/index.m3u8",
    "http://token.tvb.com/stream/live/enews/hls/mobilehd_enews.smil",
    "http://media.fantv.hk/m3u8/archive/channel2_stream1.m3u8",
    "http://223.110.243.148/PLTV/4/224/3221227490/index.m3u8",
    "http://dwstream4-lh.akamaihd.net/i/dwstream4_live@131329/master.m3u8#EXTINF:-1,USA",
    "http://media4.tripsmarter.com:1935/LiveTV/DTVHD/playlist.m3u8",
    "http://media4.tripsmarter.com:1935/LiveTV/BTVHD/chucklist.m3u8",
    "http://media4.tripsmarter.com:1935/LiveTV/MTVHD/playlist.m3u8"
]

const video = {
    type: "video",
    props: {
        id:'video',
      src: "",
      
    },
    layout: function(make, view) {
      make.left.right.equalTo(0)
      make.top.equalTo(0)
      make.height.equalTo(256)
    }
  };


  const menu={
    type: "matrix",
    props: {
      
      columns: 2,
      itemHeight: 88,
      spacing: 10,
      template: [{
        type: "label",
        props: {
          id: "tile",
          radius:8,
          bgcolor: $color("#474b51"),
          textColor: $color("#abb2bf"),
          align: $align.center,
          font: $font(20)
        },
        layout: $layout.fill
      }],
      data: channelName.map(function(item) {
        return {
          tile: {
            text: "" + item
          }
        }
      })
    },
    layout: function(make) {
      make.left.bottom.right.equalTo(0)
      make.top.equalTo(280)
      make.height.equalTo(446)
    },
    events: {
      didSelect: function(sender, indexPath, data) {
        var token = data.tile.text
        var index = indexPath.item
        var url=channelAddr[index]
        
        
          $("video").src=url
  
          $delay(0.1, function() {
            $("video").play()
        });
                    
        
      }
    }
  }

$ui.render({
    props: {
        title: "野猪看电视"
    },
    views: [video,menu]
});



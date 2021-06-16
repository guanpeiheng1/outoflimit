var engines = [{
    name: "58网盘",
    pattern: "http://m.58wangpan.com/so?keyword="
  },
  {
    name: "小可搜搜",
    pattern: "https://www.xiaokesoso.com/s/search?q="
  },
  {
    name: "清风高速影视",
    pattern: "https://tv.3ewl.cc/search/xxx.shtml"
  },
  {
    name: "搜狗",
    pattern: "https://www.sogou.com/web?query="
  },
  {
    name: "avmo",
    pattern: "https://avmo.club/cn/search/"
  }
]

if (!$clipboard.text) {
  $input.text({
    handler: function(text) {
      showEngines(text)
    }

  })
} else {
  $thread.main({
    delay: 0.3,
    handler: function() {
      showEngines($clipboard.text)
    }
  })
}

function showEngines(text) {
  $ui.menu({
    items: engines.map(function(item) { return item.name }),
    handler: function(title, idx) {
      $thread.main({
        delay: 0.4,
        handler: function() {
          search(engines[idx].pattern, text)
        }
      })
    }
  })
}

function search(pattern, text) {
  //var url = pattern + encodeURIComponent(text)
  $safari.open({ url: pattern + encodeURIComponent(text) })
  //$app.openURL(url)
}

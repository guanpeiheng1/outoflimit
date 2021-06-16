var data = {
  titles: [
    "开始抓包",
    "结束抓包",
    "打开抓包列表",
  ],
  urls: [
    "thor://sniffer.gui/launch",
    "thor://sniffer.gui/shutdown",
    "thor://session.gui/all",
  ]
}

$ui.menu({
  items: data.titles,
  handler: function(title, idx) {
    $app.openURL(data.urls[idx])
  }
})
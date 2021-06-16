var username = ""
var password = ""
var serviceId = 0

$http.get({
  url: `https://api.rixcloud.io/v2/profile/service/${serviceId}/traffic`,
  header: {
    Authorization: `Basic ${$text.base64Encode(`${username}:${password}`)}`
  },
  handler: function(resp) {
    var data = resp.data
    if (data.status == true) {
      var upTraffic = parseInt(data.data.upload, 10)
      var downTraffic = parseInt(data.data.download, 10)
      var totalTraffic = parseInt(data.data.total, 10)
      var lastLogin = parseInt(data.data.last_login, 10)
      renderUI(upTraffic, downTraffic, totalTraffic, lastLogin)
    }
  }
})

let MATRIX_TEMPLATE = [{
    type: "label",
    props: {
      id: "titleLabel",
      font: $font(16)
    },
    layout: function(make, view) {
      make.top.equalTo(0)
      make.height.equalTo(30)
      make.centerX.equalTo(0)
    }
  },
  {
    type: "label",
    props: {
      id: "valueLabel",
      textColor: $color("black"),
      font: $font(24)
    },
    layout: function(make, view) {
      make.top.equalTo($("titleLabel").bottom)
      make.centerX.equalTo(0)
    }
  }
]

function formatBytes(b) {
  b = Math.abs(b)
  if (b < 1024) { return `${b} B` }
  b = b / 1024
  if (b < 1024) { return `${b.toFixed(1)} KB` }
  b = b / 1024
  if (b < 1024) { return `${b.toFixed(1)} MB` }
  b = b / 1024
  if (b < 1024) { return `${b.toFixed(1)} GB` }
  b = b / 1024
  return `${b.toFixed(1)} TB`
}

function formatMatrixData(u, d, r) {
  var remainTitle = r > 0 ? "剩余" : "超出"
  var data = [
    ["上传", formatBytes(u)],
    ["下载", formatBytes(d)],
    [remainTitle, formatBytes(r)]
  ]
  return data.map(function(item) {
    return {
      titleLabel: {
        text: item[0]
      },
      valueLabel: {
        text: item[1]
      }
    }
  })
}

function renderUI(u, d, t, ts) {
  var r = t - (d + u)
  var views = [{
      type: "label",
      props: {
        id: "queryTime",
        bgcolor: $color("white"),
        textColor: $color("black"),
        align: $align.center,
        font: $font(14),
        text: "截至 " + new Date(ts * 1000).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
      },
      layout: function(make) {
        make.top.equalTo(0)
        make.height.equalTo(30)
        make.centerX.equalTo()
      }
    },
    {
      type: "matrix",
      props: {
        columns: 3,
        itemHeight: 80,
        spacing: 0,
        template: MATRIX_TEMPLATE,
        data: formatMatrixData(u, d, r)
      },
      layout: function(make) {
        make.left.right.equalTo(0)
        make.top.equalTo($("queryTime").bottom)
        make.height.equalTo(80)
      }
    }
  ]
  if ($app.env == $env.app) {
    views.push({
      type: "canvas",
      layout: $layout.fill,
      events: {
        draw: function(view, ctx) {
          ctx.strokeColor = $color("lightGray")
          ctx.setLineWidth(0.5)
          ctx.moveToPoint(view.frame.width / 3, 40)
          ctx.addLineToPoint(view.frame.width / 3, 90)
          ctx.moveToPoint(view.frame.width * 2 / 3, 40)
          ctx.addLineToPoint(view.frame.width * 2 / 3, 90)
          ctx.strokePath()
        }
      }
    })
  }
  $ui.render({
    props: {
      title: "rixCloud 用量"
    },
    views: views
  })
}

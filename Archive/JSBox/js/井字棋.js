/**************************
 * by: Hhdº
 * 转载请注明原作者
 * 请勿删除本注释
 * 电脑版有双人对站功能
 *************************/

function MainView() {
  $ui.render({
    props: {
      title: "井字棋",
      bgcolor: $color("black")
    },
    views: [{
        type: "image",
        props: {
          id: "ico",
          src: Image
        },
        layout: function(make, view) {
          make.centerY.equalTo(view.super).offset(-200)
          make.size.equalTo($size(200, 150))
          make.centerX.equalTo(view.super)
        }
      },
      {
        type: "button",
        props: {
          id: "Diff",
          title: "困      难",
          font: $font(40)
        },
        layout: function(make) {
          make.top.equalTo($("ico").bottom).offset(10)
          make.height.equalTo(80)
          make.right.left.inset(20)
        },
        events: {
          tapped(sender) {
            $cache.set("difficulty", 3)
            PVErefetch()
          }
        }
      },
      {
        type: "button",
        props: {
          id: "Comm",
          title: "普      通",
          bgcolor: $color("#009ACD"),
          font: $font(40)
        },
        layout: function(make) {
          make.top.equalTo($("Diff").bottom).offset(10)
          make.height.equalTo(80)
          make.right.left.inset(20)
        },
        events: {
          tapped(sender) {
            $cache.set("difficulty", 2)
            PVErefetch()
          }
        }
      },
      {
        type: "button",
        props: {
          id: "Easy",
          title: "简      单",
          bgcolor: $color("gray"),
          font: $font(40)
        },
        layout: function(make) {
          make.top.equalTo($("Comm").bottom).offset(10)
          make.height.equalTo(80)
          make.right.left.inset(20)
        },
        events: {
          tapped(sender) {
            $cache.set("difficulty", 1)
            PVErefetch()
          }
        }
      },
      {
        type: "button",
        props: {
          title: "电脑版",
          font: $font(15),
          type: 1,
          titleColor: $color("white")
        },
        layout: function(make, view) {
          make.top.equalTo($("Easy").bottom).offset(20)
          make.centerX.equalTo(view.super)
        },
        events: {
          tapped(sender) {
            $app.openBrowser({ url: "https://pan.baidu.com/s/1nv9TXvb" })
          }
        }
      }
    ]
  })
}

function pve() {
  $ui.render({
    props: {
      title: "井字棋"
    },
    views: [{
      type: "matrix",
      props: {
        columns: 3,
        square: true,
        spacing: 20,
        bgcolor: $color("black"),
        template: [{
          type: "label",
          props: {
            id: "label",
            textColor: $color("black"),
            align: $align.center,
            bgcolor: $color("white"),
            font: $font(100)
          },
          layout: $layout.fill,
        }]
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath, data) {
          if (data.label.text == "") {
            var Data = sender.data
            Data.splice(data.label.info - 1, 1, { label: { info: data.label.info, text: "O" } })
            sender.data = Data
            $cache.set("Otime", $cache.get("Otime") + 1)
            var judgeResult = judge()
            if (judgeResult[0] == true) {
              End(judgeResult)
            } else {
              switch ($cache.get("difficulty")) {
                case 3:
                  DiffAdd()
                  break
                case 2:
                  CommAdd()
                  break
                case 1:
                  EasyAdd()
                  break
              }
            }
          }
        }
      }
    }]
  })
}

function End(judgeResult) {
  $ui.alert({
    title: "游戏结束",
    message: judgeResult[1],
    actions: [{
        title: "重新开始",
        handler: function() {
          MainView()
        }
      },
      {
        title: "退出游戏",
        handler: function() {
          $app.close()
        }
      },
      {
        title: "取消"
      }
    ]
  })
}

function judge() {
  var Data = $("matrix").data
  for (i in Results) {
    var story = Results[i].split("")
    if (Data[story[0] - 1].label.text == "×") {
      if (Data[story[1] - 1].label.text == "×") {
        if (Data[story[2] - 1].label.text == "×") var Result = [true, "电脑胜利"]
      }
    }
  }
  for (i in Results) {
    var story = Results[i].split("")
    if (Data[story[0] - 1].label.text == "O") {
      if (Data[story[1] - 1].label.text == "O") {
        if (Data[story[2] - 1].label.text == "O") var Result = [true, "玩家胜利"]
      }
    }
  }
  if (typeof Result == "undefined") {
    var num = ""
    for (var i = 1; i < 10; i++) {
      if (Data[i - 1].label.text !== "") num += i
    }
    if (num == "123456789") {
      return [true, "平局"]
    } else {
      return [false, ""]
    }
  } else {
    return Result
  }
}

function DiffAdd() {
  var Data = $("matrix").data
  if ($cache.get("Otime") == 1) {
    if (Data[4].label.text == "") {
      var Idx = 5
    } else {
      if (Data[0].label.text == "") {
        var Idx = 1
      } else if (Data[2].label.text == "") {
        var Idx = 3
      } else if (Data[6].label.text == "") {
        var Idx = 7
      } else if (Data[8].label.text == "") {
        var Idx = 9
      }
    }
  } else {
    for (i in Results) {
      var story = Results[i].split("")
      if (Data[story[0] - 1].label.text == "×") {
        if (Data[story[1] - 1].label.text == "×") {
          if (Data[story[2] - 1].label.text == "") var Idx = story[2]
        }
      }
    }
    if (typeof Idx == "undefined") {
      for (i in Results) {
        var story = Results[i].split("")
        if (Data[story[0] - 1].label.text == "O") {
          if (Data[story[1] - 1].label.text == "O") {
            if (Data[story[2] - 1].label.text == "") var Idx = story[2]
          }
        }
      }
      if (typeof Idx == "undefined") {
        if (Data[0].label.text == "") {
          var Idx = 1
        } else if (Data[2].label.text == "") {
          var Idx = 3
        } else if (Data[6].label.text == "") {
          var Idx = 7
        } else if (Data[8].label.text == "") {
          var Idx = 9
        } else {
          var Idx = getRandomNum(9)
        }
      }
    }
  }
  if ($("matrix").data[Idx - 1].label.text == "") {
    Data.splice(Idx - 1, 1, { label: { info: Idx, text: "×" } })
    $("matrix").data = Data
    $cache.set("Xtime", $cache.get("Xtime") + 1)
    var judgeResult = judge()
    if (judgeResult[0] == true) {
      End(judgeResult)
    }
  } else {
    DiffAdd()
  }
}

function CommAdd() {
  var Data = $("matrix").data
  if ($cache.get("Otime") == 1) {
    var Idx = (Data[4].label.text == "") ? 5 : getRandomNum(9)
  } else {
    for (i in Results) {
      var story = Results[i].split("")
      if (Data[story[0] - 1].label.text == "O") {
        if (Data[story[1] - 1].label.text == "O") {
          if (Data[story[2] - 1].label.text == "") var Idx = story[2]
        }
      }
    }
    if (typeof Idx == "undefined") {
      for (i in Results) {
        var story = Results[i].split("")
        if (Data[story[0] - 1].label.text == "×") {
          if (Data[story[1] - 1].label.text == "×") {
            if (Data[story[2] - 1].label.text == "") var Idx = story[2]
          }
        }
      }
      if (typeof Idx == "undefined") var Idx = getRandomNum(9)
    }
  }
  if ($("matrix").data[Idx - 1].label.text == "") {
    Data.splice(Idx - 1, 1, { label: { info: Idx, text: "×" } })
    $("matrix").data = Data
    $cache.set("Xtime", $cache.get("Xtime") + 1)
    var judgeResult = judge()
    if (judgeResult[0] == true) {
      End(judgeResult)
    }
  } else {
    CommAdd()
  }
}

function EasyAdd() {
  var Data = $("matrix").data
  var Idx = getRandomNum(9)
  if ($("matrix").data[Idx - 1].label.text == "") {
    Data.splice(Idx - 1, 1, { label: { info: Idx, text: "×" } })
    $("matrix").data = Data
    $cache.set("Xtime", $cache.get("Xtime") + 1)
    var judgeResult = judge()
    if (judgeResult[0] == true) {
      End(judgeResult)
    }
  } else {
    EasyAdd()
  }
}

function getRandomNum(max) {
  return parseInt(Math.random() * max, 10) + 1
}

function PVErefetch() {
  pve()

  $cache.set("Otime", 0)

  $cache.set("Xtime", 0)

  var arr = new Array()

  for (var i = 1; i < 10; i++) {
    arr.push({ label: { info: i, text: "" } })
  }

  $("matrix").data = arr

  var randomNumber = getRandomNum(2)

  if (randomNumber == 1) {
    var Data = $("matrix").data
    Data.splice(4, 1, { label: { info: 5, text: "×" } })
    $("matrix").data = Data
    $cache.set("Xtime", $cache.get("Xtime") + 1)
  }
}

const Results = ["123", "132", "231", "159", "195", "591", "147", "174", "471", "258", "285", "582", "369", "396", "693", "357", "375", "573", "456", "465", "564", "789", "798", "897"]

const Image = "data:image/png;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QMqRXhpZgAATU0AKgAAAAgAAgExAAIAAAAIAAAAJodpAAQAAAABAAAALgAAAABQaWNzQXJ0AAAEkoYABwAAAr0AAABkoAEAAwAAAAEAAQAAoAIABAAAAAEAAABcoAMABAAAAAEAAABAAAAAAEFTQ0lJAAAAeyJ0b3RhbF9lZmZlY3RzX2FjdGlvbnMiOjAsInRvdGFsX2RyYXdfdGltZSI6NzE1NjAsImxheWVyc191c2VkIjoyLCJlZmZlY3RzX3RyaWVkIjowLCJ0b3RhbF9kcmF3X2FjdGlvbnMiOjUsInRvdGFsX2VkaXRvcl9hY3Rpb25zIjp7ImJvcmRlciI6MCwiZnJhbWUiOjAsIm1hc2siOjAsImxlbnNmbGFyZSI6MCwiY2xpcGFydCI6MCwidGV4dCI6MCwic3F1YXJlX2ZpdCI6MCwic2hhcGVfbWFzayI6MCwiY2FsbG91dCI6MH0sImVmZmVjdHNfYXBwbGllZCI6MCwidWlkIjoiOTFGNEI4QzEtQUVCOS00REM2LTgwNTAtMzI2MzRCRjZBMjJEXzE1MTIyOTgzNTE3NTUiLCJzb3VyY2VzIjpbXSwicGhvdG9zX2FkZGVkIjowLCJ0b3RhbF9lZmZlY3RzX3RpbWUiOjAsInRvb2xzX3VzZWQiOnsidGlsdF9zaGlmdCI6MCwicmVzaXplIjoyLCJhZGp1c3QiOjAsImN1cnZlcyI6MCwibW90aW9uIjowLCJwZXJzcGVjdGl2ZSI6MCwiY2xvbmUiOjAsImNyb3AiOjAsImVuaGFuY2UiOjAsInNlbGVjdGlvbiI6MCwiZnJlZV9jcm9wIjowLCJmbGlwX3JvdGF0ZSI6MCwic2hhcGVfY3JvcCI6MCwic3RyZXRjaCI6MH0sInNvdXJjZSI6ImVkaXRvciIsIndpZHRoIjoxMDAsIm9yaWdpbiI6InVua25vd24iLCJzdWJzb3VyY2UiOiJkb25lX2J1dHRvbiIsImhlaWdodCI6MTAwLCJ0b3RhbF9lZGl0b3JfdGltZSI6MTg4LCJicnVzaGVzX3VzZWQiOjF9AP/tADhQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAADhCSU0EJQAAAAAAENQdjNmPALIE6YAJmOz4Qn7/wAARCABAAFwD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"

MainView()
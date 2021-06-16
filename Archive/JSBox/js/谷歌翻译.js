var language = ["ar-SA", "cs-CZ", "da-DK", "de-DE", "el-GR", "en-AU", "en-GB", "en-IE", "en-US", "en-ZA", "es-ES", "es-MX", "fi-FI", "fr-CA", "fr-FR", "he-IL", "hi-IN", "hu-HU", "id-ID", "it-IT", "ja-JP", "ko-KR", "nl-BE", "nl-NL", "no-NO", "pl-PL", "pt-BR", "pt-PT", "ro-RO", "ru-RU", "sk-SK", "sv-SE", "th-TH", "tr-TR", "zh-CN", "zh-HK", "zh-TW"]
var la = ["ar", "cs", "da", "de", "el", "en", "en", "en", "en", "en", "es", "es", "fi", "fr", "fr", "he", "hi", "hu", "id", "it", "ja", "ko", "nl", "nl", "no", "pl", "pt", "pt", "ro", "ru", "sk", "sv", "th", "tr", "zh", "zh", "zh"]
var langs = {
  "英文": "en",
  "中文": "zh-CN",
  "日文": "ja",
  "韩文": "ko",
  "意大利文": "it",
  "法语": "fr",
  "俄语": "ru",
  "西班牙语": "es",
  "葡萄牙语": "pt",
  "泰语": "th",
  "德语": "de",
  "芬兰语": "fi",
  "荷兰语": "nl",
  "挪威语": "no",
  "波兰语": "pl",
  "瑞典文": "sv",
  "自动": "auto"
}

var enPronunce = {
  type: "view",
  props: {
    id: "fayin",
    debugging: true
  },
  layout: $layout.fill,
  views: [{
    type: "button",
    props: {
      id: "us",
      title: "US",
      font: $font(15),
      bgcolor: $color("clear")
    },
    layout: function(make, view) {
      make.bottom.inset(5)
      make.left.inset(30)
    },
    events: {
      tapped: function(sender) {
        $text.speech({
          text: content,
          rate: 0.5,
          language: "en-US"
        })
        $("fayin").remove()
      }
    }

  }, {
    type: "button",
    props: {
      id: "gb",
      title: "GB",
      font: $font(15),
      bgcolor: $color("clear")
    },
    layout: function(make, view) {
      make.bottom.inset(30)
      make.left.inset(5)
    },
    events: {
      tapped: function(sender) {
        $text.speech({
          text: content,
          rate: 0.5,
          language: "en-GB"
        })
        $("fayin").remove()

      }
    }

  }]
}
$ui.render({
  props: {
    id: "mainView",
    title: "Google Translate"
  },
  views: [{
    type: "view",
    props: {
      id: "origBg",
      bgcolor: $color("white"),
      font: $font(15)
    },
    layout: function(make, view) {
      make.height.equalTo(view.super.height).dividedBy(2)
      make.top.left.right.inset(0)
    },
    views: [{
      type: "text",
      props: {
        id: "origTextbg",
        bgcolor: $color("white"),
        font: $font(15)
      },
      layout: function(make, view) {
        make.edges.insets($insets(5, 0, 30, 15))
      },
      events: {
        didBeginEditing: function(sender) {
          $input.text({
            type: $kbType.text,
            placeholder: "输入内容",
            handler: function(text) {
              $clipboard.text = text
              $("origTextbg").text = text
              $("transLgbt").title = getKeyByValue(langs, cnTest())
              $("origLgbt").title = "自动"
              translate()
            }
          })
        }
      }
    }, {
      type: "button",
      props: {
        id: "textClearbt",
        icon: $icon("161", $color("gray"), $size(15, 15)),
        bgcolor: $color("clear")
      },
      layout: function(make, view) {
        make.top.inset(10)
        make.right.inset(10)
      },
      events: {
        tapped: function(sender) {
          closeKybd()
          $("origTextbg").text = ""
          $("transTextbg").text = ""
        }
      }
    }, {
      type: "button",
      props: {
        id: "origSpeechbt",
        icon: $icon("012", $color("gray"), $size(15, 15)),
        bgcolor: $color("clear")
      },
      layout: function(make, view) {
        make.bottom.inset(5)
        make.left.inset(10)
      },
      events: {
        tapped: function(sender) {
          speechText($("origTextbg").text, $("origLgbt").title)
        }
      }
    }],
    events: {
      tapped: function(sender) {
        closeKybd()
      }
    }
  }, {
    type: "view",
    props: {
      id: "transBg",
      bgcolor: $color("#4484f4"),
      font: $font(15)
    },
    layout: function(make, view) {
      make.height.equalTo(view.super.height).dividedBy(2)
      make.top.equalTo($("origBg").bottom).offset(0)
      make.left.right.inset(0)
    },
    views: [{
      type: "text",
      props: {
        id: "transTextbg",
        bgcolor: $color("#4484f4"),
        textColor: $color("white"),
        font: $font(15)
      },
      layout: function(make, view) {
        make.edges.insets($insets(5, 0, 30, 15))
      },
      events: {
        didBeginEditing: function(sender) {

        }
      }
    }, {
      type: "button",
      props: {
        id: "transSpeechbt",
        icon: $icon("012", $color("white"), $size(15, 15)),
        bgcolor: $color("clear")
      },
      layout: function(make, view) {
        make.bottom.inset(5)
        make.left.inset(10)
      },
      events: {
        tapped: function(sender) {
          speechText($("transTextbg").text, $("transLgbt").title)
        }
      }
    }, {
      type: "button",
      props: {
        id: "transCopybt",
        icon: $icon("019", $color("white"), $size(15, 15)),
        bgcolor: $color("clear")
      },
      layout: function(make, view) {
        make.bottom.inset(10)
        make.right.inset(10)
      },
      events: {
        tapped: function(sender) {
          closeKybd()
          $clipboard.text = $("transTextbg").text
          $ui.toast("Translation Copied", 1)
        }
      }
    }, {
      type: "button",
      props: {
        id: "switchLgbt",
        icon: $icon("162", $color("white"), $size(15, 15)),
        bgcolor: $color("clear")
      },
      layout: function(make, view) {
        make.bottom.inset(10)
        make.centerX.equalTo(view.super.centerX)
      },
      events: {
        tapped: function(sender) {
          closeKybd()
          var switchLg = $("origLgbt").title
          $("origLgbt").title = $("transLgbt").title
          $("transLgbt").title = switchLg
          var switchText = $("origTextbg").text
          $("origTextbg").text = $("transTextbg").text
          $("transTextbg").text = switchText
        }
      }
    }, {
      type: "button",
      props: {
        id: "origLgbt",
        bgcolor: $color("clear"),
        font: $font(15)
      },
      layout: function(make, view) {
        make.bottom.inset(5)
        make.right.equalTo($("switchLgbt").left).inset(10)
      },
      events: {
        tapped: function(sender) {
          langpick("origswitch")
        }
      }
    }, {
      type: "button",
      props: {
        id: "transLgbt",
        bgcolor: $color("clear"),
        font: $font(15)
      },
      layout: function(make, view) {
        make.bottom.inset(5)
        make.left.equalTo($("switchLgbt").right).inset(10)
      },
      events: {
        tapped: function(sender) {
          langpick("transwitch")
        }
      }
    }],
    events: {
      tapped: function(sender) {
        closeKybd()
      }
    }
  }]
})

function cnTest() {
  var cn = new RegExp("[\u4e00-\u9fa5]+")
  var slang = cn.test($("origTextbg").text)
  if (slang == 0) {
    translang = "zh-CN"
  } else {
    translang = "en"
  }
  return translang
}

if ($clipboard.text) {
  $("origTextbg").text = $clipboard.text
  $("transLgbt").title = getKeyByValue(langs, cnTest())
  $("origLgbt").title = "自动"
  translate()
} else {
  $("origLgbt").title = "英文"
  $("transLgbt").title = "中文"
}

function closeKybd() {
  $("origTextbg").blur()
  $("transTextbg").blur()
}

function speechText(txt, lang) {
  closeKybd()
  if (lang == "中文") {
    lang = "zh-CN"
  } else if(lang == "英文"){
//      lang = "en-US"
      content = txt
      $("mainView").add(enPronunce)
      return
  }else{
    lang = language[la.indexOf(langs[lang])]
  }
  $text.speech({
    text: txt,
    rate: 0.5,
    language: lang
  })
}

function translate() {
  $ui.loading("Translating...")
  $http.post({
    //    method: "POST",
    url: "http://translate.google.cn/translate_a/single",
    header: {
      "User-Agent": "iOSTranslate",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: {
      "dt": "t",
      "q": $("origTextbg").text,
      "tl": langs[$("transLgbt").title],
      "ie": "UTF-8",
      "sl": langs[$("origLgbt").title],
      "client": "ia",
      "dj": "1"
    }, //
    handler: function(resp) {
      $ui.loading(false)
      var data = resp.data.sentences
      var orig = ""
      var trans = ""
      for (var i in data) {
        var orig = orig + data[i].orig + "\n"
        var trans = trans + data[i].trans + "\n"
      }
      $("origLgbt").title = getKeyByValue(langs, resp.data.src || data.src)
      //      $ui.action(resp.data.src||data.src)
      $("origTextbg").text = orig
      $("transTextbg").text = trans
    }
  })

}

function getKeyByValue(object, value) {
  for (var prop in object) {
    if (object[prop] === value) {
      return prop;
    }
  }
}

function langpick(bt) {
  if ($app.env == $env.today) {
    $cache.set("bt", bt)
    $cache.set("today", true)
    var name = $addin.current.name
    $app.openURL("jsbox://run?name=" + encodeURI(name))
    return
  }
  closeKybd()
  $picker.data({
    props: {
      items: [Object.keys(langs)]
    },
    handler: function(data) {
      if (bt == "origswitch") {
        $("origLgbt").title = data[0]
      } else {
        $("transLgbt").title = data[0]
      }
      closeKybd()
      translate()
    }
  })
}

var today = $cache.get("today")
if (today) {
  $cache.set("today", false)
  $delay(0.5, function() {
    langpick($cache.get("bt"))
  })
  return
}
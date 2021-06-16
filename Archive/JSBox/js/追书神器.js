$http.get({
  url: "https://api.zhuishushenqi.com/v3/ranking/gender",
  handler: function(resp) {
    repeat(resp.data.male)
  }
})

$ui.render({
  props: {
    title: "追书神器"
  },
  views: [{
    type: "list",
    props: {
      data: ["[搜索书籍]"]
    },
    layout: $layout.fill,
    events: {
      didSelect: function(sender, indexPath, data) {
        if (data === "[搜索书籍]") {
          $input.text({
            placeholder: "输入书名(支持模糊搜索)",
            handler: function(text) {
              $ui.loading(true)
              $http.get({
                url: encodeURI("http://api.zhuishushenqi.com/book/fuzzy-search?query=" + text + "&start=0&limit=100"),
                handler: function(resp) {
                  $ui.loading(false)
                  booklist(resp.data.books, text + " 的搜索结果")
                }
              })
            }
          })
        } else {
          var id = $cache.get(data)
          $ui.loading(true)
          $http.get({
            url: "https://api.zhuishushenqi.com/ranking/" + id,
            handler: function(resp) {
              $ui.loading(false)
              booklist(resp.data.ranking.books, data)
            }
          })
        }
      }
    }
  }]
})

$cache.clear()

//By:Hhdº

function repeat(ifm) {
  for (var i = 0; i < ifm.length; i++) {
    $("list").insert({
      indexPath: $indexPath(0, 0),
      value: ifm[i].title
    })
    $cache.set(ifm[i].title, ifm[i]._id)
  }
  $("list").data = $("list").data.reverse()
}

function booklist(ifm, title) {
  $ui.push({
    props: {
      title: title
    },
    views: [{
      type: "list",
      props: {
        id: "List",
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath, data) {
          var json = $cache.get(data)
          $ui.alert({
            title: "《" + json[1] + "》",
            message: "作者:" + json[2] + "\n类型:" + json[3] + "\n最后章节:" + json[5] + "\n介绍:" + json[4],
            actions: [{
                title: "下一步",
                handler: function() {
                  $ui.loading(true)
                  $http.get({
                    url: "https://api.zhuishushenqi.com/atoc?view=summary&book=" + json[0],
                    handler: function(resp) {
                      $ui.loading(false)
                      choosesource(resp.data, json[1], json[0])
                    }
                  })
                }
              },
              {
                title: "取消"
              }
            ]
          })
        }
      }
    }]
  })

  var data = []
  for (var i = 0; i < ifm.length; i++) {
    var json = ifm[i]
    var value = "《" + json.title + "》 作者:" + json.author
    $("List").insert({
      indexPath: $indexPath(0, 0),
      value: value
    })
    $cache.set(value, [json._id, json.title, json.author, json.cat, json.shortIntro, json.lastChapter])
  }
  $("List").data = $("List").data.reverse()
}

function choosesource(ifm, title, id) {
  $cache.set("混合源", id)
  $ui.push({
    props: {
      title: "请选择书源"
    },
    views: [{
      type: "list",
      props: {
        id: "Choose",
        data: ["混合源"]
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath, data) {
          $ui.loading(true)
          if (data === "混合源") {
            var url = "http://api.zhuishushenqi.com/mix-ctoc/" + id
            var pd = 1
          } else {
            var url = "https://api.zhuishushenqi.com/atoc/" + $cache.get(data) + "?view=chapters"
          }
          $http.get({
            url: url,
            handler: function(resp) {
              if (pd == 1) {
                prg(resp.data.mixToc.chapters, "《" + title + "》")
              } else {
                prg(resp.data.chapters, "《" + title + "》")
              }
            }
          })
        }
      }
    }]
  })

  for (var i = 0; i < ifm.length; i++) {
    $("Choose").insert({
      indexPath: $indexPath(0, 0),
      value: ifm[i].name
    })
    $cache.set(ifm[i].name, ifm[i]._id)
  }
  $("Choose").data = $("Choose").data.reverse()
}

function prg(ifm, title) {
  $ui.push({
    props: {
      title: title + "- 请选择章节阅读"
    },
    views: [{
      type: "list",
      props: {
        id: "Prg",
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath, data) {
          var firsturl = "http://chapterup04.zhuishushenqi.com/chapter/"
          var lasturl = $text.URLEncode($cache.get(data))
          var url = firsturl + lasturl
          $ui.loading(true)
          $http.get({
            url: url,
            handler: function(resp) {
              $ui.loading(false)
              var chapter = resp.data.chapter
              var match = /cpContent/
              var result = match.test(chapter)
              if (result == true) {
                reader(chapter.cpContent)
              } else {
                reader(chapter.body)
              }
            }
          })
        }
      }
    }]
  })

  for (var i = 0; i < ifm.length; i++) {
    $("Prg").insert({
      indexPath: $indexPath(0, 0),
      value: ifm[i].title
    })
    $cache.set(ifm[i].title, ifm[i].link)
  }
  $("Prg").data = $("Prg").data.reverse()
  $ui.loading(false)
}

function reader(text) {
  $quicklook.open({
    text: text
  })
}
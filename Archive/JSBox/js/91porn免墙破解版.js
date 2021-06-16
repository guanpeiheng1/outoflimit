/*
脚本仅供代码学习，请勿分享。非法传播照成法律问题与作者无关。

by：iPhone 8、小良
http://ae85.cn/
*/

$ui.loading(true);
$http.get({
    url: $text.base64Decode("aHR0cHM6Ly9naXRlZS5jb20veWFvMDcvdXBkYXRlX2RldmljZS9yYXcvbWFzdGVyLw==") + "91porn.json",
    handler: function (resp) {
        $ui.loading(false);
        if (resp.data.bb != "1.0") {
            $ui.alert({
                title: "温馨提示：",
                message: resp.data.gxsm,
                actions: [
                    {
                        title: "访问官网",
                        handler: function () {
                            $app.openURL(resp.data.gw);
                        }
                    },
                    {
                        title: "关注公众号",
                        handler: function () {
                            $ui.alert({
                                title: "温馨提示",
                                message: "跳转微信会自动复制公众号ID\n请跳转到微信-搜索-公用号-粘贴-关注",
                                actions: [{
                                    title: "跳转微信",
                                    handler: function () {
                                        $clipboard.text = "ae85-cn"
                                        $app.openURL("weixin://")
                                    }
                                }, {
                                    title: "取消"
                                }]
                            })
                        }
                    }
                ]
            });
        } else {
            $cache.set("info", resp.data);
            csh();
            tcgg(resp.data.gg);
        }
    }
});


function tcgg(gg) {
    if ($file.exists("gg.txt")) {
        var file = $file.read("gg.txt").string;
        if (file != gg) {
            xrwj(gg);
        }
    } else {
        xrwj(gg);
    }
}

function xrwj(nr) {
    $ui.alert(nr);
    $file.write({
        data: $data({ string: nr }),
        path: "gg.txt"
    });
}

function csh() {
    $cache.set("pg", 1)
    $ui.render({
        props: {
            title: "91porn免墙破解版"
        },
        views: [
            {
                type: "list",
                props: {
                    rowHeight: 100,
                    bgcolor: $color("#161616"),
                    template: {
                        props: {
                            bgcolor: $color("#111"),
                        },
                        views: [
                            {
                                type: "image",
                                props: {
                                    id: "img",
                                    radius: 3,
                                    bgcolor: $color("#111")
                                },
                                layout: function (make, view) {
                                    make.left.top.bottom.inset(8);
                                    make.width.equalTo(120);
                                }
                            },
                            {
                                type: "label",
                                props: {
                                    id: "mc",
                                    font: $font("bold", 17),
                                    textColor: $color("#FFBA00"),
                                    lines: 0
                                },
                                layout: function (make, view) {
                                    make.left.equalTo($("img").right).offset(10);
                                    make.top.inset(10);
                                }
                            },
                            {
                                type: "label",
                                props: {
                                    id: "sc",
                                    font: $font(15),
                                    textColor: $color("#fff")
                                },
                                layout: function (make) {
                                    make.left.equalTo($("mc"));
                                    make.top.equalTo($("mc").bottom).inset(8);
                                }
                            },
                            {
                                type: "label",
                                props: {
                                    id: "sm",
                                    font: $font(15),
                                    textColor: $color("gray")
                                },
                                layout: function (make) {
                                    make.left.equalTo($("sc"));
                                    make.top.equalTo($("sc").bottom).inset(12);
                                }
                            },

                        ]
                    }
                },
                layout: function (make) {
                    make.right.left.top.bottom.inset(0);
                },
                events: {
                    didSelect: function (sender, indexPath, data) {
                        bof(data.id, data.mc.text)

                    },
                    didReachBottom: function (sender) {
                        $ui.toast("加载下一页···")
                        sender.endFetchingMore()
                        var page = $cache.get("pg") + 1
                        $cache.set("pg", page)
                        getlist()
                    }
                }
            }, {
                type: "label",
                props: {
                    id: "jzz",
                    align: 1,
                    font: $font(38),
                    text: "加载中···",
                    textColor: $color("#E42A00")
                },
                layout: $layout.fill
            }

        ]
    });
     getlist()
}


function getlist() {
    var info = $cache.get("info")
    var urlt = $text.base64Decode(info.turl)
    var pg = $cache.get("pg")
    $ui.loading(true)
    $http.get({
        url: urlt + "http://91porn.com/video.php?category=rf&page=" + pg,
        handler: function (resp) {
            $ui.loading(false)
            var html = resp.data.replace(/\n|\s|\r/g, "")
            var list = html.match(/<divclass=\"listchannel\">(\S*?)<\/div><\/div>/g)
            if (pg == 1) {
                var data = []
            } else {
                var data = $("list").data
            }
            for (i in list) {
                var a = list[i]
                data.push({
                    img: { src: a.match(/<imgsrc=\"\/proxy\/(\S*?)\"/)[1] },
                    mc: { text: a.match(/title=\"(\S*?)\"/)[1] },
                    sc: { text: a.match(/时长:<\/span>(\S*?)<br\/>/)[1] },
                    sm: { text: a.match(/添加时间:<\/span>(\S*?)<br\/>/)[1] },
                    id: a.match(/blankhref=\"\/proxy\/(\S*?)&/)[1]
                })

            }
            $("list").data = data
            $("list").endFetchingMore()
            $("jzz").alpha = 0

        }
    })
}

function bof(url, mc) {
    $ui.push({
        props: {
            title: mc
        },
        views: [{
            type: "web",
            props: {
                url: $text.base64Decode($cache.get("info").jxurl) + url,
            },
            layout: $layout.fill
        },
        ]
    })
}

# Outoflimit

## 配置文件

使用前注意备份配置文件原有的MITM模块，本项目的所有文件都不带MITM证书。下载完成后将MITM模块用自己的替换，即可避免重新安装与信任证书。

```
# QuantumultX
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/QuantumultX.conf

# Shadowrocket
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/Shadowrocket.conf

# ClashX
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/ClashX.yaml

# Loon
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/Loon.conf
```

开启后可将以下网站添加到主屏幕。

```
# BoxJs，任务脚本配置
http://boxjs.com
https://dompling.github.io/boxjs.react

# Sub-Store，订阅转换
https://sub-store.vercel.app

# Loon插件仓库
https://🎈.com
https://loon-gallery.vercel.app
```

## 图标组

```
# 通用
https://github.com/Orz-3/mini
https://github.com/Orz-3/task
https://github.com/Orz-3/face
https://github.com/58xinian/icon

# Quantumult X
https://github.com/elecV2/QuantumultX-ICON
https://github.com/Koolson/Qure
```

## BoxJS

BoxJS可帮助网络调试工具运行脚本时配置相关参数。官网如下。

```
https://chavyleung.gitbook.io/boxjs/
```

### 安装

对于Surge，可添加模块，地址如下。

```
// 稳定版
https://gitee.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.surge.sgmodule

// 测试版
https://gitee.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.surge.tf.sgmodule
```

对于Quantumult X，可添加重写，地址如下。

```
// 稳定版
https://gitee.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.quanx.conf

// 测试版
https://gitee.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.quanx.tf.conf
```

对于Loon，可添加插件，地址如下。

```
// 稳定版
https://gitee.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.loon.plugin

// 测试版
https://gitee.com/chavyleung/scripts/raw/master/box/rewrite/boxjs.rewrite.loon.tf.plugin
```

若需要更新BoxJS，更新调试工具的配置即可。

### 使用

用手机打开以下链接，即可进入BoxJS页面。打开后点击分享-添加到主屏幕，可供以后快速访问。

```
http://boxjs.com/
```

#### 添加订阅

点击`订阅`，添加以下订阅。

```
# blackmatrix7
https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/boxjs.json 

# FoKit
https://raw.githubusercontent.com/FoKit/Scripts/main/boxjs/fokit.boxjs.json

# dompling
https://raw.githubusercontent.com/dompling/Script/master/dompling.boxjs.json

# lowking
https://raw.githubusercontent.com/lowking/Scripts/master/boxjs.sysapps.json
https://raw.githubusercontent.com/lowking/Scripts/master/empty.app.boxjs.json
https://raw.githubusercontent.com/lowking/Scripts/master/lowking.boxjs.json
https://raw.githubusercontent.com/lowking/Scripts/master/lowking.boxjs.removed.json
https://raw.githubusercontent.com/lowking/Scripts/master/others.boxjs.json

# chouchoui
https://raw.githubusercontent.com/chouchoui/QuanX/master/vei.boxjs.json

# zZPiglet
https://raw.githubusercontent.com/zZPiglet/Task/master/zZPiglet.boxjs.json

# ZCY01
https://raw.githubusercontent.com/ZCY01/daily_scripts/main/zcy01.boxjs.json

# DualSubs
https://raw.githubusercontent.com/DualSubs/BoxJs/main/DualSubs.BoxJs.json

# GetSomeFries
https://raw.githubusercontent.com/VirgilClyne/GetSomeFries/main/BoxJs/Fries.boxjs.beta.json

# iRingo
https://raw.githubusercontent.com/VirgilClyne/iRingo/main/BoxJs/iRingo.BoxJs.json

# Sliverkiss
https://raw.githubusercontent.com/Sliverkiss/GoodNight/master/sliverkiss.boxjs.json

# photonmang
https://raw.githubusercontent.com/photonmang/quantumultX/master/photonmang.boxjs.json

# toulanboy
https://raw.githubusercontent.com/toulanboy/scripts/master/toulanboy.boxjs.json

# songyangzz
https://raw.githubusercontent.com/songyangzz/QuantumultX/master/syzzzf.box.json

# id77
https://raw.githubusercontent.com/id77/QuantumultX/master/box.json

# 其它
https://raw.githubusercontent.com/toulanboy/scripts/master/toulanboy.boxjs.json
https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tasks/box.js.json
https://raw.githubusercontent.com/evilbutcher/Quantumult_X/master/evilbutcher.boxjs.json
https://jdsharedresourcescdn.azureedge.net/jdresource/lxk0301.boxjs.json
https://ooxx.be/js/box.json
https://raw.githubusercontent.com/NobyDa/Script/master/NobyDa_BoxJs.json
https://raw.githubusercontent.com/Sunert/Scripts/master/Task/sunert.boxjs.json
https://raw.githubusercontent.com/chavyleung/scripts/master/box/chavy.boxjs.json
https://raw.githubusercontent.com/CenBoMin/GithubSync/main/cenbomin.box.json
```

#### 脚本配置

当网络调试工具中运行的脚本要求配置BoxJs时，在BoxJs的搜索框输入脚本名称，并进行相关配置即可。

#### 会话管理

BoxJS可保存多个会话，每个会话可存储相应的Cookie信息。通过切换会话，可使同一脚本使用不同配置，从而实现多账号签到等功能。

以京东多合一签到脚本为例，在BoxJS中打开该脚本配置，点击保存会话后即可保存当前的Cookie。删除当前Cookie并重新获取，完成后再次点击保存会话。通过应用不同的会话，即可对不同的账号进行签到。

#### 配置备份

可通过备份配置，完成配置在网络调试工具之间的迁移，如从Loon迁移到Quantumult X。

点击我的-备份，生成全局变量，复制该值。需要导入配置时，点击我的-导入，复制刚才的值，点击还原即可。

#### 壁纸

点击应用-内置应用-偏好设置，在 `背景图片清单` 中复制以下内容即可。图片可根据需求替换。

```
无背景,
跟随系统,跟随系统
明亮,https://64.media.tumblr.com/451bca19ad0b695c08b54b4287e4f935/tumblr_nb70h5f6XN1rnbw6mo2_r1_1280.gifv
暗黑,https://i.pinimg.com/originals/94/4a/85/944a85804c97622973fbae194ddc27ac.gif
随机,https://uploadbeta.com/api/pictures/random
推女郎,https://uploadbeta.com/api/pictures/random/?key=推女郎
性感,https://uploadbeta.com/api/pictures/random/?key=性感
车模,https://uploadbeta.com/api/pictures/random/?key=车模
美腿,https://uploadbeta.com/api/pictures/random/?key=美腿
美女,https://uploadbeta.com/api/pictures/random/?key=美女
手机妹子,http://api.btstu.cn/sjbz/zsy.php
手机美女,http://api.btstu.cn/sjbz/?m_lx=suiji
```

## Sub-Store

Sub-store可用于订阅转换。仓库如下。

```
https://github.com/Peng-YM/Sub-Store
```

教程如下。

```
https://www.notion.so/Sub-Store-6259586994d34c11a4ced5c406264b46
```

### 安装

对于Loon，可点击配置-插件-`+`，添加以下插件。确保PROXY栏右侧区域不出现任何文字，点击保存即可。

```
https://raw.githubusercontent.com/Peng-YM/Sub-Store/master/config/Loon.plugin
```

也可在配置文件添加以下内容。

```
[MITM]
hostname=sub.store

[Script]
http-request https?:\/\/sub\.store script-path=https://raw.githubusercontent.com/Peng-YM/Sub-Store/master/backend/sub-store.js, requires-body=true, timeout=120, tag=Sub-Store
```

对于Surge，可添加以下模块订阅。

```
https://raw.githubusercontent.com/Peng-YM/Sub-Store/master/config/Surge.sgmodule
```

对于Quantumult X，可在配置文件添加以下内容。

```
[http_backend]
https://raw.githubusercontent.com/Peng-YM/Sub-Store/master/backend/sub-store.js, tag=Sub-Store, path=/, enabled=true
```

### 使用

对于Loon和Surge，打开以下网页即可。

```
https://sub-store.vercel.app
```

对于Quantumult X，需要从JSBox的Erots商店获取Sub-store脚本，然后运行JSBox版本。点击设置，查看环境是否为Quantumult X，若不是则需要切换为Quantumult X。

#### 添加订阅

点击订阅-`+`，填写订阅名称和地址，设置好后点击该条目可以看到订阅中包含的节点。

#### 复制订阅

可将Sub-store中配置好的的订阅同步到网络调试工具。以Loon为例，点击订阅，选择需要使用的订阅，并点击复制，回到Loon并添加该订阅即可。

#### 组合订阅

可以通过点击订阅-组合订阅-`+`，将多个订阅合并成一个订阅。

#### 本地解析

选择需要修改的订阅，点击编辑，即可对节点进行筛选。除常用选项外，还可以添加节点操作，可以添加多个同一类型的过滤模式，将会按照顺序执行。

##### 正则过滤器

对于正则过滤器，在保留模式下，关键词过滤只能单个匹配，多关键词则需要添加多个过滤器，而过滤模式则可匹配多个关键词。

##### 正则重命名

可以一次操作多个关键词。

##### 脚本操作

脚本操作可以为远程脚本或者本地脚本，脚本库如下。

```
https://github.com/Peng-YM/Sub-Store/tree/master/scripts
```

#### 云备份

需要获取Github Token，其中Token的权限为repo和gist。

#### 同步配置

点击同步-`+`以添加配置。配置后点击复制，即可在对应的网络调试工具中使用该链接导入配置文件。

## Apple集成服务解锁

### 定位服务

```
# 参考
https://blog.royli.dev/2019/using-apple-news-in-china-mainland
```

在QuantumultX对应的策略组名称为Apple Location。

Apple Location策略组设置为代理可以欺骗系统位置服务。使用代理后，需要开启飞行模式，然后保持WiFi连接。打开地图应用，看到内容切换到了没有高德地图的版本即为成功。

### Apple News

在QuantumultX对应的策略组名称为Apple News。

在Apple Location策略组和Apple News策略组均设置为美国代理后，Apple News即可正常使用。正常打开后可以关闭飞行模式，并将Apple Location策略组设置为DIRECT。

### Siri Suggestions

开启QuantumultX重写中的SiriSuggestions解锁即可。

如启用后未立刻生效，可将`设置-Siri与搜索-来自APPLE的内容和来自APPLE的建议`关闭再开启，然后更改`设置-通用-语言与地区-地区`。启用定位服务修改模块并打开地图，刷新地图关闭定位服务修改模块，等待约半小时后`Siri建议`就会向服务器`*.smoot.apple.com/bag`请求刷新区域设置与功能可用状态。

### App Store

在Loon/QuanX对应的策略组名称为Apple API和Apple CDN。

```
# 参考
https://blog.royli.dev/2019/better-proxy-rules-for-apple-services
```

|    类别   |                       用途                       |
|-----------|--------------------------------------------------|
| API服务类 | 购买、发起下载、iCloud同步（含上传和下载）、Siri |
| CDN资源类 | App实体文件、Apple Music音乐文件                 |

对于API服务类的地址，不论使用什么区域的账号，它们连接到的服务器依然位于美国。我们需要伪装成从账号所在区域来发起连接。

CDN资源类的地址往往为了让用户快速下载到，会使用各式各样的缓存和内容分发服务。这些服务通常都不由苹果直接提供，而是交给给当地的云服务完成。这类地址不需要使用代理访问。

云上贵州运营的iCloud非常特殊。使用时设备仍然会连接位于美国的服务器，但是实际上传下载操作是通过连接国内服务器完成的。为了避免麻烦，建议使用云上贵州运营的iCloud也就是中国区账号的用户都采取API直连。

使用搭配如下。

| 账号所属区 | 苹果API  |    苹果CDN    |
|------------|----------|---------------|
| 国区       | 直连     | 直连          |
| 美区       | 美国代理 | 直连/美国代理 |

## 延迟测试

Surge、Shadowrocket、Quantumult的测试方式不同，因此结果差距较大。

Surge测试的是从目标policy返回http response header数据包的时间。Shadowrocket支持ICMP/TCP两种测速方式，默认为ICMP模式，即Ping。Quantumult采用SSH测速模式（22端口）。

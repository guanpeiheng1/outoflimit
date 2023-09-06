# Outoflimit

```
直播源
https://github.com/ddgksf2013/M3U8LIST
https://github.com/YueChan/Live

部分可添加但未添加的库：
# 京东
https://github.com/shufflewzc/faker2
https://github.com/shufflewzc/faker3
https://github.com/Gnuyoah/Thread
https://github.com/KingRan/KR
https://github.com/smiek2121/scripts
https://github.com/zero205/JD_tencent_scf
https://github.com/cdle/carry
https://github.com/curtinlv/JD-Script
https://github.com/DovFork/jiulan
https://github.com/6dylan6/jdpro
https://github.com/Tsukasa007/my_script

# 其它
https://github.com/Ariszy/Private-Script
https://github.com/I-am-R-E/Functional-Store-Hub
https://github.com/nameking77/Qx
https://github.com/yichahucha/surge/tree/master
https://github.com/mieqq/mieqq/
https://github.com/ikanam/Surge-Scripts
https://github.com/toulanboy/scripts
https://github.com/I-am-R-E/Functional-Store-Hub/
https://github.com/I-am-R-E/QuantumultX/
https://github.com/chouchoui/QuanX/
https://github.com/DecoAri/JavaScript
https://github.com/JoJoJotarou/myScript
https://gitlab.com/lodepuly/vpn_tool/
https://github.com/Maasea/sgmodule
https://github.com/evilbutcher/QuantumultX
https://github.com/Marcio2536/MySurge/
https://github.com/xream/scripts/
https://github.com/fishingworld/something
https://github.com/GideonSenku/figma-image-upload/
https://github.com/telegram-sms/telegram-sms
https://github.com/NavePnow/next-tasks
https://github.com/0KABE/BeQX/tree/dev
https://github.com/ClydeTime/Quantumult
https://github.com/qulingyuan/robVeg
https://github.com/app2smile/rules
https://github.com/VirgilClyne/Cloudflare
https://github.com/FoKit/Scripts
https://github.com/githubdulong/Script
https://github.com/ddgksf2013/ddgksf2013
https://github.com/ddgksf2013/Profile
https://github.com/ddgksf2013/Rewrite
https://github.com/ddgksf2013/Scripts
https://github.com/zmqcherish/proxy-script
https://github.com/BiliUniverse/Universe
https://github.com/Semporia/TikTok-Unlock

# Http Catcher
https://github.com/pm936/httpcatcher
```

文件链接如下。

```
# QuantumultX
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/QuantumultX.conf

# Shadowrocket
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/Shadowrocket.conf

# ClashX
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/ClashX.yaml
```

开启后可将以下网站添加到主屏幕。

```
# BoxJs，任务脚本配置
http://boxjs.com

# Sub-Store，订阅转换
https://sub-store.vercel.app

# Loon插件仓库
https://🎈.com
https://loon-gallery.vercel.app
```

## QuantumultX

分流、重写、任务脚本完全定制。

```
# 配置文件
https://github.com/nzw9314/QuantumultX/tree/master

# 分流&重写
https://github.com/DivineEngine/Profiles/tree/master
https://github.com/geekdada/surge-list/blob/master/surgio-snippet/apple.tpl

# 任务
https://github.com/app2smile/rules
https://github.com/Semporia/TikTok-Unlock
https://github.com/nzw9314/QuantumultX/tree/master/onewayticket255
https://github.com/VirgilClyne/iRingo
https://github.com/NobyDa/Script/tree/master
https://github.com/chavyleung/scripts
https://github.com/zZPiglet/Task/tree/master
https://github.com/songyangzz/QuantumultX
https://github.com/toulanboy/scripts
https://github.com/Sunert/Script
https://github.com/Peng-YM/QuanX
https://github.com/iepngs/Script
https://github.com/chouchoui/QuanX
https://github.com/id77/QuantumultX/tree/master/task
https://github.com/lowking/Scripts
https://github.com/dompling/Script
https://github.com/barrym-chen/Script
https://github.com/wangdelu2020/hongliyu
https://github.com/congcong0806/surge-list/tree/master/Script
https://gitee.com/passerby-b/javascript
https://github.com/photonmang/quantumultX/
https://github.com/iisams/Scripts
https://github.com/DD-D1/2020scripts
https://github.com/blackmatrix7/ios_rule_script/tree/master/script
https://github.com/yichahucha/surge/tree/master
https://github.com/NavePnow/Profiles
https://github.com/elecV2/QuantumultX-Tools
https://github.com/CenBoMin/GithubSync
https://github.com/banditlives/Scripting/tree/master
https://ooxx.be/js/
https://github.com/VirgilClyne/GetSomeFries
https://github.com/dualsubs/dualsubs
https://github.com/ZCY01/daily_scripts
https://github.com/zmqcherish/proxy-script
https://github.com/sve1r/Rules-For-Quantumult-X
```

## Clash

实现服务器信息改为订阅格式，而非写在配置文件中。

Clash的策略组暂时无法使用正则表达式，因此无法实现节点筛选。

现有问题：无法使用Shadowsocks的websocket混淆。

```
# 分流
https://github.com/DivineEngine/Profiles/tree/master
```

## Shadowrocket

实现完整的配置文件。

```
# 分流
https://github.com/h2y/Shadowrocket-ADBlock-Rules
https://github.com/ACL4SSR/ACL4SSR/tree/master
https://github.com/DivineEngine/Profiles/tree/master

# 脚本
https://github.com/Tartarus2014/Shadowrocket-Script
https://github.com/w37fhy/QuantumultX
```

## 注意事项

### MITM

使用前注意备份配置文件原有的MITM模块，本项目的所有文件都不带MITM证书。

下载完成后将MITM模块用自己的替换，即可避免重新安装与信任证书。

### Task模块

带有With_Task字样的文件中包含收集到的所有任务脚本，并根据个人需求进行了开关。

不带有With_Task字样的配置文件，使用时需要手动导入任务脚本。

### Apple集成服务解锁

#### 定位服务

```
# 参考
https://blog.royli.dev/2019/using-apple-news-in-china-mainland
```

在QuantumultX对应的策略组名称为Apple Location。

Apple Location策略组设置为代理可以欺骗系统位置服务。使用代理后，需要开启飞行模式，然后保持WiFi连接。打开地图应用，看到内容切换到了没有高德地图的版本即为成功。

#### Apple News

在QuantumultX对应的策略组名称为Apple News。

在Apple Location策略组和Apple News策略组均设置为美国代理后，Apple News即可正常使用。正常打开后可以关闭飞行模式，并将Apple Location策略组设置为DIRECT。

#### Siri Suggestions

开启QuantumultX重写中的SiriSuggestions解锁即可。

如启用后未立刻生效，可将`设置-Siri与搜索-来自APPLE的内容和来自APPLE的建议`关闭再开启，然后更改`设置-通用-语言与地区-地区`。启用定位服务修改模块并打开地图，刷新地图关闭定位服务修改模块，等待约半小时后`Siri建议`就会向服务器`*.smoot.apple.com/bag`请求刷新区域设置与功能可用状态。

#### App Store

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

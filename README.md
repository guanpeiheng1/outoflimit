# Outoflimit

## 文件获取

```
# QuanX
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/QuantumultX_With_Task.conf
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/QuantumultX.conf

# Quan
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/Quantumult.conf

# Loon
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/Loon.conf

# Shadowrocket
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/Shadowrocket.conf
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/Shadowrocket.json

# ClashX
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/ClashX.yaml
```

格式如下。

```
# 文件路径为根目录时省略
https://cdn.jsdelivr.net/gh/guanpeiheng1/outoflimit@master/[文件路径]/[文件名]
```

## 更新说明

```
# 2021-06-16
更改langkhach270389脚本库。
更新zZPiglet、toulanboy库的脚本。
新建Invaild目录，存放暂时失效的内容。

# 2021-06-15
删除失效脚本。
lxk0301库已被删除，更换为自行托管的仓库。

# 2021-05-19
更新lxk0301任务脚本。
QuanX任务仓库集合删除lxk0301部分，lxk0301任务仓库：
https://jdsharedresourcescdn.azureedge.net/jdresource/lxk0301_gallery.json

# 2021-05-17
QX与Loon的TestFlight区域限制解除。
https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/TestFlightDownload.conf
https://raw.githubusercontent.com/NobyDa/Script/master/Loon/Loon_TF_Download.conf

# 2021-05-01
zZPiglet的滴滴出行Cookie订阅地址发生变动。

# 2021-04-29
Sunert脚本库由Sunert/Scripts改为Sunert/Script。

# 2021-04-05
QuanX和Loon添加Apple相关策略组与规则（Clash不添加，无需求）。

# 2021-04-04
订阅链接改为国内CDN，不翻墙也能访问；其它链接不变，保证能正常获取节点即可。
清除失效脚本。
添加文件获取链接。

# 2021-02
创建仓库，完成各配置文件。
```

## 目录层级

根目录下的文件为各工具的配置文件，文件夹下为各工具所需的订阅内容。

点击各文件夹可查看详情。

## 维护说明

Surge暂停维护，仅保留配置示例（没钱买）。

Kitsunebi暂停维护（功能简单，已完成配置）。

Alook、Flex、HTTP Catcher、iHTTP Tracker、Pythonista 3、Thor、ShortCut/WorkFlow、Tweaks仅用于存档（需求较小）。

Invalid文件夹存放暂时失效的内容。

## 维护进度

以下未列出的项目无维护计划。

### 任务脚本

适用于Loon和QuanX。

```
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

# 以下标注的仓库已失效
https://gitee.com/lxk0301/jd_scripts/tree/master/
```

### QuanX

分流、重写、任务脚本完全定制。

```
# 配置文件
https://github.com/nzw9314/QuantumultX/tree/master

# 分流&重写
https://github.com/DivineEngine/Profiles/tree/master
https://github.com/geekdada/surge-list/blob/master/surgio-snippet/apple.tpl
```

### Quan

补全所有分流及重写。

Quan的策略无法使用正则表达式，只能手动选择节点以创建延迟测试策略，故避免使用策略。

```
# 配置文件
https://github.com/lhie1/Rules/tree/master

# 分流&重写
https://github.com/DivineEngine/Profiles/tree/master
```

### Clash

实现服务器信息改为订阅格式，而非写在配置文件中。

Clash的策略组暂时无法使用正则表达式，因此无法实现节点筛选。

现有问题：无法使用Shadowsocks的websocket混淆。

```
# 分流
https://github.com/DivineEngine/Profiles/tree/master
```

### Loon

分流、重写、任务脚本完全定制。

```
# 配置文件
https://github.com/nzw9314/Loon

# 分流
https://github.com/DivineEngine/Profiles/tree/master
https://github.com/geekdada/surge-list/blob/master/surgio-snippet/apple.tpl

# 重写
https://github.com/eHpo1/Rules

# 脚本&插件
https://github.com/Tartarus2014/Loon-Script
```

### Shadowrocket

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

### 苹果API与苹果CDN

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

### 苹果地区限制与苹果News

```
# 参考
https://blog.royli.dev/2019/using-apple-news-in-china-mainland
```

在Loon/QuanX对应的策略组名称为Apple Location和Apple News。

Apple Location策略组设置为代理可以欺骗系统位置服务。使用代理后，需要开启飞行模式，然后保持WiFi连接。打开地图应用，看到内容切换到了没有高德地图的版本即为成功。

在Apple Location策略组和Apple News策略组均设置为美国代理后，Apple News即可正常使用。正常打开后可以关闭飞行模式，并将Apple Location策略组设置为DIRECT。

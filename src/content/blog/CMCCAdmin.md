---
title: "移动宽带光猫—获取超级管理员密码教程"
description: "这篇教程详细说明了如何获取并修改中国移动光猫的超级管理员密码。"
pubDate: "Aug 7 2026"
heroImage: "https://t.alcy.cc/pc"
---

## 前言

> 很早之前就通过一篇文章[^1]知道了如何修改移动光猫的超级管理员密码，很简洁实用。 我的设备有所不同，操作更简单，于是水一篇文章。  
> 如果没有解决你的问题可以看看大佬的新文章[^2]。  
> 感谢大佬分享！！！  
> 如有侵权请联系删除。

## 我的设备

- **设备名称**: 10Gbit/s无源光网络用户端设备(X-GPON ONU)
- **设备类型**: 中国移动智能家庭网关 类型十四
- **设备型号**: HX5-4sLite
- **默认终端配置地址**: 192.168.1.1

## 第一步：开启Telnet

直接在连接了网络的设备上访问:

   ```
http://192.168.1.1/usr=CMCCAdmin&psw=aDm8H%25MdA&cmd=1&telnet.gch
   ```

   > 会显示：`TelnetSet Success!` 或者 `TelnetSet 开启`

![image](assets/CMCCAdmin-246aada8.png)

## 第二步：进入 Telnet

在 Windows 电脑上使用 cmd 输入：

```bash
telnet 192.168.1.1
```

> 提示没有Telnet的，在控制面板 > 程序 > 启用或关闭 Windows 功能 > 启用“Telnet Client”

按照提示输入用户名：`CMCCAdmin`  密码：`aDm8H%MdA`

![image](assets/CMCCAdmin-3069e7f1.png)

> 输入密码不会显示出来，这里可以通过直接右键CMD进行粘贴。

然后输入：

```bash
sidbg 1 DB p DevAuthInfo
```

![image](assets/CMCCAdmin-268fa8ea.png)

这时会有信息显示出来，这其中有2段：

```xml
<DM name="User" val="******"/>
<DM name="Pass" val="******"/>
```

这个就是需要更改的，只要显示出来这些信息了就行，其他不用管，接着操作就好。

继续输入命令：

```bash
sidbg 1 DB set DevAuthInfo 0 Pass admin
```

这个表示把密码改成：`admin`

然后再输入命令：

```bash
sidbg 1 DB save
```

![image](assets/CMCCAdmin-32aebd9c.png)

**现在光猫的超级管理员信息**：
- 用户名：`CMCCAdmin`
- 密码：`admin`

## 第三步：超级管理员登录

1. 访问: http://192.168.1.1
2. 输入账号: `CMCCAdmin`
3. 输入密码: `admin`

登录进去后就能进行修改了，不过我的设备隔一段时间就会自己重置密码，需要重新修改。

[^1]: [移动宽带光猫—获取超级管理员密码教程](https://www.cnblogs.com/fengdongd/p/18094765) - 作者：[fengdong](https://www.cnblogs.com/fengdongd)，日期：2024-03-25 16:45  
[^2]: [移动宽带光猫—获取超级管理员密码教程](https://www.cnblogs.com/fengdongd/p/19659513) - 作者：[fengdong](https://www.cnblogs.com/fengdongd)，日期：2026-03-02 15:39
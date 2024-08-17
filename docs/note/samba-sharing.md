# 主网络访问二级路由挂载的移动硬盘

【接前篇】

家里主网络是几台华为 `Mesh` 组网，3 楼单独放了一个 `OpenWrt` 路由器作为二级路由器，负责访问外网。这个路由器还有一个 `USB3.0` 的接口，刚好把家里的闲置的移动硬盘挂上去，做一个轻 `NAS` 使用。

硬盘昨天已经格式化安装上去了，配置很简单。按照简单的默认配置即可。已经达到的需求是已经可以通过 3 楼二级路由器都网络内，通过手机，MacBook，Windows 11 可以直接访问共享。

但是这个时候出现了一个新问题，必须要连接 `OpenWrt` 的路由器才能访问该硬盘，如果我在 1 楼就无法连接这个路由器。家人也没办法随时连接家里的网络对数据实现备份。

现在需要配置一下，让连接主网的设备也能够通过 `SAMBA` 客户端直接访问硬盘。其实还有后续需求，如何在家之外能够访问轻 `NAS` 里面的数据。这个是后话。目前用易有云能够实现，担心以后要收费问题。这个观察一段时间。

今天研究了半天，发现可以在二级路由器配置一下，可以直接在主网访问到二级路由器的硬盘。

主要核心注意如下：

- 网络共享里面，默认 `SAMBA` 的接口是 `LAN`，需要把 `WAN` 打开
- 防火墙也需要打开对应的接口，在文件`/etc/config/firewall`最后添加，配置可以参考如下：

```sh
config rule
	option name 'Open Samba on WAN'
	option src 'wan'
	option proto 'tcp udp'
	option dest_port '137 138 139 445'
	option target 'ACCEPT'
```

另外在同样配置下增加一下内容，可以在主网络访问二级路由的后台配置页面。

```sh
config rule
	option name 'Manage From Main'
	option src 'wan'
	option proto 'tcp'
	option dest_port '80'
	option target 'ACCEPT'
```

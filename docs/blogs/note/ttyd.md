# OpenWrt 中 TTYD 相关

在路由器浏览器后台页面里面，可以内嵌一个终端，这样可以直接在浏览器里面进行使用 `SSH` 进入路由器后台。

## 安装

在软件包里搜 `ttyd`，相关的以下 3 个都安装上。
`ttyd`, `luci-app-ttyd`, `luci-i18n-ttyd-zh-cn`

## 修改 LAN 口后无法访问的问题

```sh
# 修改文件
vim /etc/init.d/ttyd

# 输入 / 然后输入 interface，再按n可以找下一个

# 找到如下代码并注释
${interface:+-i $interface}

# 重启 ttyd
service ttyd restart
```

## 配置免用户名密码登录 root

在 `/etc/config/yytd` 文件中，找到`/bin/login`，在后面添加 `-f root`, 变成 `/bin/login -f root`

- 重启 `ttyd`

```sh
service ttyd restart
```

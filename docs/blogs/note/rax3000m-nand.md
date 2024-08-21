# CMCC RAX3000M NAND 刷机

::: danger 警告
这个试用于 NAND 版本，EMMC 版本大同小异，不可直接套用
:::

## 开启 ssh

### 下载配置文件

通电并连接路由器，不需要联网，防止锁机

登录后台 `192.168.10.1`，使用路由器背面账号密码登录

主页 -> 更多 -> 管理 -> 配置管理 -> 导出文件

下载文件名为 `cfg_export_config_file.conf`

### 解压并修改配置文件

将文件传入任意 linux 环境中（wsl）

输入命令解压配置文件：

```sh
openssl aes-256-cbc -d -pbkdf2 -k $CmDc#RaX30O0M@\!$ -in cfg_export_config_file.conf -out - | tar -zxvf -
```

- 用编辑器修改 `etc/config/dropbear` 文件，把`option enable '0'`改为`option enable '1'`开启 ssh 服务
- `/etc/shadow`，清楚 root 用户密码，将 root 两个冒号间的密码删除，然后保存。

### 再次打包

```sh
tar -zcvf - etc | openssl aes-256-cbc -pbkdf2 -k $CmDc#RaX30O0M@\!$ -out cfg_export_config_file_new.conf
```

### 登录路由器后台导入配置

主页 -> 更多 -> 管理 -> 配置管理 -> 选择文件

选择上一步打包好的 `cfg_export_config_file_new.conf`​ 导入

### 测试 ssh

应该不需要密码即可登录

```sh
ssh root@192.168.10.1
```

## 刷如 uboot

### 下载 uboot

<https://drive.wrt.moe/uboot/mediatek>

### 上传 uboot

```sh
scp -O "/Users/hqa/Downloads/rax3000m/mt7981-cmcc_rax3000m-nand-fip-expand.bin" root@192.168.10.1:/tmp/
```

ssh 登录路由器执行

```sh
root@RAX3000M:/# mtd write /tmp/mt7981-cmcc_rax3000m-nand-fip-expand.bin FIP
Unlocking FIP ...

Writing from /tmp/mt7981-cmcc_rax3000m-nand-fip-expand.bin to FIP ...
```

### 进入 uboot 刷机页面

先断电，按住 rest 按键，插上电源后大约 5-10 秒，指示灯变绿色后松开

## 刷入固件

### 选择固件

这里选用的是 immortalwrt 固件

登录网站 <https://firmware-selector.immortalwrt.org/>

搜索 rax3000m nand 找到对应的版本。

这里选择的是 `SYSUPGRADE` 版本。

访问 `192.168.1.1`​ 即可进入 uboot 刷入第三方固件

## 参考

- <https://blog.codee.top/rax3000m%E6%90%9E%E6%9C%BA%E7%9B%AE%E5%BD%95/>
- <https://blog.paxton-cloud.top/post/cmcc-rax3000m-nand-flashing-record-zsnjap.html>
- <https://zhuanlan.zhihu.com/p/696434968>

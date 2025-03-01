# Git 故障排除

这篇文章主要罗列一下使用 git 以及 GitHub 过程中碰到的问题，解决办法等。

1. Connection closed by `xxx.xxx.xxx.xxx` port 22

![Connection Close](/note/ssh-close.png)

这个问题出现的情况有多种。今天碰到的这个问题，是通过尝试切换网络解决的。

我有两个热点，一个是外网直连的，一个不是。今天诡异的是，连接外网直连这个热点，不能连接 `git`。切换到内网这个，反而可以连接 `git`。

问题还没有彻底搞明白。下次碰到类似的问题，如果在确认 `ssh key` 的配置没有问题的情况下，尝试切换网络，刷新 ssh 之类的。看问题是否解决。

如果以上方法还是不行，尝试一下：

`git config --global "url.ssh://git@ssh.github.com:443/.insteadOf" git@github.com:`

---
layout: post
title: "安装和配置 MPD"
description: "使用 i3 窗口管理器，感觉很舒服，更有帅帅的 i3status 点缀之，在 GitHub 搜了下，发现有个 i3status 修改版，可以显示 MPD 的播放状态，于是又用起 MPD。"
category: tech
tags: [MPD, MPC, 播放器]
---

使用 i3 窗口管理器，感觉很舒服，更有帅帅的 i3status 点缀之，在 GitHub 搜了下，发现有个 [i3status 修改版](https://github.com/Gravemind/i3status)，可以显示 MPD 的播放状态，于是又用起 MPD。

MPD ([Music Player Daemon](https://wiki.archlinux.org/index.php/Music_Player_Daemon)) 是一个实用的音乐播放器，以其独特的 C/S 结构获得人们的喜爱。充其量 MPD 只是作为一个守护进程（或者可以说服务）运行于后台，想要控制它的播放，还需要一个客户端，一般只选用 MPC (Music Player Command)， MPC 虽为命令行客户端，但已够用。

下面一起来安装配置 MPD，获得恰到好处的使用体验

**MPD**

安装 MPD, MPC

    # pacman -S mpd mpc

创建 MPD 的配置文件

<pre style="margin-bottom: 0; border-bottom:none; padding-bottom:8px;"><code>~/.mpdconf</code></pre>
<pre style="margin-top: 0; border-top-style:dashed; padding-top:8px;"><code>music_directory         "~/Music/"
playlist_directory      "~/.mpd/playlists"
db_file                 "~/.mpd/database"
log_file                "~/.mpd/log"
pid_file                "~/.mpd/pid"
state_file              "~/.mpd/state"
user                    "fooleap"
group                   "users"
bind_to_address         "localhost"
port                    "6600"
audio_output {
	type            "alsa"
	name            "My ALSA Device"
	mixer_control   "Master"
}</code></pre>

更多配置可参考 /usr/share/mpd/mpd.conf.example

    $ mkdir -p ~/.mpd/playlists
    $ touch ~/.mpd/{database,log,pid,state}

至此，可直接运行 mpd 命令以启动

通过 systemd 设置自启，默认配置不是普通用户的，遂先修改 mpd.service 文件，指定配置

<pre style="margin-bottom: 0; border-bottom:none; padding-bottom:8px;"><code>/usr/lib/systemd/system/mpd.service</code></pre>
<pre style="margin-top: 0; border-top-style:dashed; padding-top:8px;"><code>...
[Service]
ExecStart=/usr/bin/mpd /home/fooleap/.mpdconf --no-daemon
...</code></pre>

    # systemctl enable mpd

**均衡器**

播放器是有了，但 MPD 不带均衡器，在此使用 [Alsaequal](http://www.thedigitalmachine.net/alsaequal.html) 充当均衡器

安装

    $ yaourt -S alsaequal caps

配置

<pre style="margin-bottom: 0; border-bottom:none; padding-bottom:8px;"><code>~/.asoundrc</code></pre>
<pre style="margin-top: 0; border-top-style:dashed; padding-top:8px;"><code>ctl.equal {
 type equal;
}

pcm.plugequal {
  type equal;
  # Modify the line below if you do not
  # want to use sound card 0.
  #slave.pcm "plughw:0,0";
  #by default we want to play from more sources at time:
  slave.pcm "plug:dmix";
}
#pcm.equal {
  # If you don't want the equalizer to be your
  # default soundcard comment the following
  # line and uncomment the above line. (You can
  # choose it as the output device by addressing
  # it with specific apps,eg mpg123 -a equal 06.Back_In_Black.mp3)
pcm.!default {
  type plug;
  slave.pcm plugequal;
}</code></pre>

重启 Alsa 后，可调整增益值

    $ alsamixer -D equal

![Alsaequal]({{site.IMG_PATH}}/installation-and-configuration-mpd-01.png)
配置 MPD

<pre style="margin-bottom: 0; border-bottom:none; padding-bottom:8px;"><code>~/.mpdconf</code></pre>
<pre style="margin-top: 0; border-top-style:dashed; padding-top:8px;"><code>...
audio_output {
  type    "alsa"
  name    "My ALSA Device"
  device  "plug:plugequal"
  mixer_control	"Master"		# optional
}
...</code></pre>

**MPC**

尝试播放

    $ mpc listall | mpc add
    $ mpc play

<ul>
<li>添加所有音乐到当前播放列表</li>
<li>播放</li>
</ul>

播放列表

通过 MPC 创建的是 \*.m3u 格式的 Playlist

假设 ~/Music 文件夹里有多个文件夹，创建播放列表，包含某目录（或多目录）下所有音乐

    $ mpc clear
    $ mpc ls
    $ mpc listall FolderName1 FolderName2 .. | mpc add
    $ mpc save playlist
    $ mpc load playlist

<ul>
<li>清空当前播放列表</li>
<li>列出文件夹</li>
<li>显示名字为 FolderName1 FolderName2 文件夹下的所有音乐并添加到当前播放列表</li>
<li>保存当前播放列表为 playlist</li>
<li>读取播放列表 playlist</li>
</ul>

也可以通过类似下面的命令来创建播放列表，萝卜青菜

    $ cd ~/Music
    $ find * -iname "*.mp3" | sort | grep Keyword > ~/.mpd/playlist/playlist.m3u

更多使用可以参考 man mpc

**多媒体键**

使用 Thinkpad 多媒体键来代替常用的 mpc 命令再合适不过，这里通过 [Xbindkeys](https://wiki.archlinux.org/index.php/Xbindkeys) 来绑定

安装 Xbindkeys

    # pacman -S xbindkeys

配置 Xbindkeys

<pre style="margin-bottom: 0; border-bottom:none; padding-bottom:8px;"><code>~/.xbindkeysrc</code></pre>
<pre style="margin-top: 0; border-top-style:dashed; padding-top:8px;"><code>"mpc toggle"
XF86AudioPlay

"mpc stop"
XF86AudioStop

"mpc prev"
XF86AudioPrev

"mpc next"
XF86AudioNext

"amixer sset Master 2-"
XF86AudioLowerVolume

"amixer sset Master 2+"
XF86AudioRaiseVolume

"amixer sset Master toggle"
XF86AudioMute</code></pre>

将 xbindkeys & 添加到 ~/.xinitrc 使其随 X 启动

**键映射**

在此之前，可能需要通过 [Xmodmap](https://wiki.archlinux.org/index.php/Xmodmap) 修改键映射

<pre style="margin-bottom: 0; border-bottom:none; padding-bottom:8px;"><code>~/.Xmodmap</code></pre>
<pre style="margin-top: 0; border-top-style:dashed; padding-top:8px;"><code>!Media
keycode 173 = XF86AudioPrev
keycode 172 = XF86AudioPlay
keycode 171 = XF86AudioNext
keycode 174 = XF86AudioStop

!Volume
keycode 121 = XF86AudioMute
keycode 122 = XF86AudioLowerVolume
keycode 123 = XF86AudioRaiseVolume</code></pre>

将 xmodmap ~/.Xmodmap & 添加到 ~/.xinitrc 使其随 X 启动

![i3status with mpd]({{site.IMG_PATH}}/installation-and-configuration-mpd-02.png)

**本文历史**

* 2012年12月01日 创建文章
* 2012年12月02日 修正 mpc 歌曲列表部分的错误
* 2012年12月15日 添加配置均衡器
* 2015年05月24日 换图床

## 环境依赖

#### mac 系统

1. 最新版本的 Xcode
2. nodejs v18.19.0
3. npm v10.2.3
4. python 2.7.X
5. git
6. npm install -g node-gyp@8.3.0

#### windows 系统

1. nodejs v18.19.0
2. python 2.7.X
3. git
4. npm 6.14.15
5. npm install --global --vs2019 --production windows-build-tools
   > 本步安装 windows 开发环境的安装内容较多，如果网络情况不好可能需要等较长时间，选择早上网络较好时安装是个好的选择
   >
   > 或参考[手动安装 windows-build-tools](./tools/readme.md)进行安装
6. npm install -g node-gyp@8.3.0

#### linux 系统

1. nodejs v18.19.0
2. python2.7X
3. git
4. binutils
   > 未安装 binutils，会导致打包失败，提示：need executable ar to convert dir to deb

## 开发

> 项目请勿放到中文路径下，放到中文路径下时，依赖可能安装失败。

1. `npm config ls` 查看`.npmrc`配置文件的路径
2. 在`.npmrc`文件中，添加如下 Electron 和 node 镜像配置：
   ```
   ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
   ELECTRON_BUILDER_BINARIES_MIRROR=https://npmmirror.com/mirrors/electron-builder-binaries/
   registry=https://registry.npmmirror.com/
   ```
3. `npm install`或`npm ci`
4. `npm run dev`

注意避免使用`cnpm`，我们使用`cnpm`出现过一些奇怪问题的情况。如果您使用`cnpm`当遇到问题时请切换到`npm`试一下。另外代码路径中，不能有中文或者有空格，否则可能开发和打包过程中可能有问题。

## vue-devtool 调试

1. `npm install -g vue-devtools`
2. 启动`vue-devtools`
3. 根据第 2 步的提示，将`script`注入到`public/index.html`的`head`里面
4. 项目目录下执行`npm run dev`

## 打包

打包为当前平台架构软件

```
npm run package
```

## yarn

1. `yarn install --ignore-engines`
2. `yarn run package`

## 交叉打包

打包为其它平台架构软件

```
#打包windows系统amd64架构
npm run cross-package-win

#打包windows系统x86架构
npm run cross-package-win32

#打包linux系统amd64架构
npm run cross-package-linux

#打包linux系统arm64架构
npm run cross-package-linux-arm64

#打包mac系统
npm run cross-package-mac
```

## Electron 版本

目前 master 的使用的 Electron 版本是 13.6.9。如果您使用的 SDK 是 8 的，请切换到分支[electron_8](https://github.com/wildfirechat/vue-pc-chat/tree/electron_8) 。旧版本将进入维护阶段不再添加新的功能，正在开发中的朋友们可以联系我们更新到最新 SDK。SDK 是跟版本无关的，如果您的应用是其他版本的 Electron，也可以使用我们提供的 SDK。

## 音视频

默认附带免费版本音视频，关于野火音视频可以参考[野火音视频使用说明](https://docs.wildfirechat.cn/webrtc/)和[野火音视频简介](https://docs.wildfirechat.cn/blogs/野火音视频简介.html)。如果使用音视频高级版，请参考[音视频高级版切换方法](./src/wfc/av/internal/README.MD)。

## 常见开发问题

1. 如何调试？PC 使用了 Electron，内嵌 Chrome 浏览器，跟在浏览器上开发调试是一样的。快捷键 Ctrl
   +g(MAC 下是 CMD+g)打开开发者模式。

2. 打包时，如果一直显示`installing production dependencies  platform=win32 arch=ia32 appDir=C:\<your path>\pc-chat\dist`，
   或者提示下载什么之类的，可将`dep`目录下对应平台的 electron 依赖，解压到对应的目录。
   ```
   // windows
   C:\Users\<你的用户名>\.electron-gyp
   // mac/linux
   ~/.electron-gyp
   ```
3. 打包时，如果下载 electron 版本超时，可以国内的 electron 镜像。比如使用华为的 electron 镜像的命令是：`npm config set electron_mirror https://mirrors.huaweicloud.com/electron/`。

4. windows 上需要严格按照环境进行安装，mac 上环境比较简单一些，安装 node 和 node-gyp 就可以了
   另外如果还有问题，请试试命令`npm cache clean --force `，然后删掉 node_modules，再重新在非管理员权限下`npm ci --registry=https://mirrors.huaweicloud.com/repository/npm/`

5.

有些杀毒软件会对 electron 打包的软件报病毒，详情请参考[electron 报病毒](https://www.baidu.com/s?wd=electron%20360%E6%8A%A5%E7%97%85%E6%AF%92&pn=0&oq=electron%20360%E6%8A%A5%E7%97%85%E6%AF%92&tn=84053098_3_dg&ie=utf-8&rsv_pq=ec2a876200198701&rsv_t=e981739vB2ZMksgGv8ZOV%2Fb4WIhJDXXzLTfMv24NmIN0itMzRiGjMNnh1qARt19Uzf1s%2FA)
。安装时可能被杀毒软件限制安装，这时候可以让用户使用绿色免安装版（打包后 release 目录下的 unpacked 目录）。如果运行时报错，请在杀毒软件里加上例外。另外有条件的公司可以考虑去[360 官方](https://open.soft.360.cn)或其他杀软的官方提交检测。

6. ubuntu 下，启动时，若提示，`A JavaScript error occurred in the main process Uncaught Exception:Error: Cannot open /opt/wildfirechat/resources/app.asar/marswrapper.node: Error: libdouble-conversion.so.1: cannot open shared object file: No such file or directory`
   ，可安装[libdouble-conversion1](https://packages.debian.org/buster/libdouble-conversion1) 解决

7. win 平台野火客户端依赖 Visual C++ Redistributable Package runtime。如果用户 PC 上没有安装就需要安装之后才能运行，请从微软官方下载安装
   https://www.microsoft.com/zh-CN/download/details.aspx?id=48145 。注意这个安装包是有 32 位/64 位区分的，需要安装对应架构的版本。

8. MAC 应用截屏时只能截屏空白桌面，无法截图窗口内容。这是因为没有通过 mac 系统的安全许可，在设置-》安全与隐私-》切换到隐私那个标签-》屏幕录制-》在圈子 PC 应用前打勾，并重启应用。

9. `npm install` 报`Unexpected end of JSON input while parsing near...`错误

   如果常见问题 4 解决不了，可以尝试`　 npm config set registry https://mirrors.huaweicloud.com/repository/npm/ `，然后在按常见问题 4 的步骤进行

10. 音视频相关问题，请参考以下文档

    1. [av readme](src/wfc/av/internal/README.MD)
    2. [音视频常见问题](https://docs.wildfirechat.cn/faq/webrtc.html?h=webrtc)

11. 纯内网环境，不能显示表情

    1. 将`src/assets/twemoji`目录上传到一个内网能访问的服务器，比如部署`app server`的服务器
    2. 确保通过`http(s)://base_twemoji_url/72x72/1f1e6.png`能访问到对应表情，此处`1f1e6.png`蓝底白字大写字母 A
    3. 修改`config.js`，将`https://static.wildfirechat.net/twemoji/assets/` 替换成新部署的`http(s)://base_twemoji_url/`，需要注意，最后一个`/`不能省略
    4. 动态表情类似处理

12. 想自己部署表情图片

    请常见问题 11

13. 一直提示：`Electron failed to install correctly, please delete node_modules/electron and try installing again`。见上面 使用国内 Electron 镜像 问题。

14. windows 7 无法正常启动，显示黑屏或白屏
    1. `background.js` 里面找到下面代码，并取消`//app.disableHardwareAcceleration();`前面的注释
    ```
       // pls refer to: https://blog.csdn.net/youyudexiaowangzi/article/details/118676790
       // windows 7 下面，如果启动黑屏，请将下面注释打开
       //app.disableHardwareAcceleration();
    ```
15. MAC 打包的版本是 Universal 版本，可以同时支持 x64 架构和 arm64 架构。Universal 版本比单架构版本要大一下，如果想要打包单架构的版本，可以把野火 SDK 瘦身到对应单一架构，然后打包对应平台。具体实现方法请自行查找。

16. MAC 系统要求签名才可以运行，有可能需要对野火的 SDK 重新签名才可以，签名的方法请网络搜索。

17. Linux Arm64 版本打包时，在 linux+arm64 的环境下打包 deb 格式的版本时会出问题，因为有个依赖软件 fpm 是 x64 架构的，必须在 x64 架构的机器下交叉打包，系统可以是 windows/mac/linux 都行（mac 的 arm64 机器也可以，因为 mac 系统有 rosetta 可以运行 x64 软件）。

18. 压力测试发现，Vue 内置的`keep-alive`组件，可能有缓慢的内存泄漏问题，可将`HomePage.vue`里面的`keep-alive`移除，由于`activated`和`deactivated`回调，要使用`keep-alive`组件才生效，需要妥善处理这两个回调里面的逻辑。

19. 如果使用专业版 IM 服务且使用野火对象存储服务，需要使野火对象存储服务支持 https，PC 客户端和 Web 客户端需要使用 HTTPS 上传。

20. 打包失败，提示`Error in script "<stdin>" on line 75 -- aborting creation process`

    系统的用户名是中文，或者项目放在中文路径下，会导致打包失败，请避免使用中文用户名或中文路径进行打包，可参考[这儿](cnblogs.com/NUNA/p/17434401.html)

21. Windows 打包失败，提示`ERR_ELECTRON_BUILDER_CANNOT_EXECUTE`

    每次打包之前，打开任务管理器，查看是否有`electron`进程运行，必须全部杀掉才能正常打包。可参考[github issue](https://github.com/electron-userland/electron-builder/issues/5134)

22. ubuntu 24 上`npm run dev`时，提示`The SUID sandbox helper binary was found...`，无法正常启动

    可以在`package.json`文件里面 `--disable-background-timer-throttling` 后面添加 `--no-sandbox`临时解决，具体原因分析请参考[这个链接](https://github.com/electron/electron/issues/42510)

23. ubuntu 24 上启动时，提示`he SUID sandbox helper binary was found...`，无法正常启动`

    可以在启动命令后添加`--no-sandbox`

# chat
本项目准备做一个前后端结合的网页端的在线聊天<br>
后端使用node.js+Mogoose+express+JWT验证<br>
前端使用Vue+element-ui+Vuex+echarts<br>
后续准备继续学习websocket协议进行前后端结合<br>

## 参考项目
前端项目原版：https://github.com/Coffcer/vue-chat <br>
前端项目重构版：https://github.com/Coffcer/vue-chat <br>
基本上是以重构版改动，主要使用了vue-cli3脚手架进行搭建 <br>
<br>
后端项目学习：https://www.bilibili.com/video/BV1uz4y1D75z?share_source=copy_web <br>
up主：yike陈 <br>
<br>
感谢这些项目的作者给我了一个学习的机会，项目后面还会慢慢学习完成，中间自己也瞎捣鼓了点东西，学的也不是很扎实，有问题也感谢各位大佬指正。
## 截图
![image](https://user-images.githubusercontent.com/93251384/147757434-70233bae-a14b-4dd8-abc1-2a38efa4d07c.png)
![image](https://user-images.githubusercontent.com/93251384/147757503-9b2cb689-d090-40b7-8079-e4b3f8427a60.png)

## 文件结构
```
chat
├── public
│   ├── favicon.ico
│   └── index.html
├── server                      //后端
│   ├── config                  
│   │   └── db.js               //MogoDB数据库连接
│   ├── dao
│   │   ├── bcrypt.js           //bcrypt密码加密设置
│   │   ├── dbserver.js         //处理主要业务逻辑，登录，注册，密码验证
│   │   └── jwt.js              //token验证模块
│   ├── model
│   │   └── dbmodel.js          //预置的数据库结构
│   ├── router
│   │   └── index.js            //路由跳转
│   ├── app.js                  //项目入口 cd server 进入后端文件夹 node app.js开启后端服务器
│   ├── package-lock.json
│   └── package.json
├── src                         //前端文件储存
│   ├── assets                  //图片文件夹
│   │   ├── 1.jpg
│   │   ├── 2.png
│   │   ├── 3.jpg
│   │   ├── bg.jpg
│   │   └── logo.png
│   ├── components              //组件
│   │   ├── chatSpace.vue       //聊天页面组件
│   │   ├── echar.vue           //词云组件
│   │   ├── list.vue            //侧边好友栏
│   │   └── user.vue            //用户组件
│   ├── pages                   //路由组件
│   │   ├── chatarea.vue        //聊天信息显示区
│   │   ├── entertextarea.vue   //消息输入区
│   │   └── home.vue            //用户主页面
│   ├── router                  
│   │   └── index.js            //路由
│   ├── store
│   │   └── index.js            //Vuex
│   ├── App.vue
│   └── main.js
├── babel.config.js
├── package-lock.json
├── package.json
├── README.md
└── vue.config.js
```

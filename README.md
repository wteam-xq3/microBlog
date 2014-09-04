注：《nodejs 开发指南》pdf 下载地址： http://download.csdn.net/download/therbetter/5126235

原教程将 db.js post.js  user.js settings.js放 node_modules， 对于上传至github不妥， 已将其路径改为：“public/js/dao”，
而 node_modules 内容， 下载该代码后， 请自行 npm install 之。


PS:
1.安装 Mongodb后，运行代码前 需要cmd 启动数据库服务。

2.可视化操作Mongodb， 建议使用 “MongoVUe”。

#### 本地部署（win8 64bit为例）：

* 确保本地已安装 git 以及 node 环境，在某文件夹 运行`git clone https://github.com/wteam-xq/microBlog.git` 下载该项目
* 运行cmd 进入“microBlog”文件夹， 运行 `npm install`安装依赖模块
* 安装 MongoDB 数据库
启动数据库服务:  双击 "启动mongoDb.bat"， 该bat文件具体代码如下：
```
if exist "D:\MongoDB 2.6 Standard\data"  (
  path = "D:\MongoDB 2.6 Standard\bin"
  mongod.exe -dbpath "D:\MongoDB 2.6 Standard\data\db"
) else (
  path = "D:\MongoDB 2.6 Standard\bin"
  md "D:\MongoDB 2.6 Standard\data\db"
  mongod.exe -dbpath "D:\MongoDB 2.6 Standard\data\db"
)
``` 
ps: "D:\MongoDB 2.6 Standard\bin" 为MongoDB安装目录
* 全局安装 “express”模块：`npm install -g express`
* 进入 “microBlog”文件夹启动项目: cmd运行 `npm start` (或 进入bin `node www`)
* 打开浏览器（建议 chrome）输入： `localhost:300`(端口号在 bin/www 文件中设置)

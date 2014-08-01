注上：《nodejs 开发指南》pdf 下载地址： http://download.csdn.net/download/therbetter/5126235



PS:
1.安装了 Mongodb后需要需要cmd 启动数据库服务（具体参考“Mongodb在Windows下安装及配置”）。
2.可视化操作Mongodb， 建议使用 “MongoVUe”。



Mongodb在Windows下安装及配置:
1.下载mongodb的windows版本，有32位和64位版本，根据系统情况下载,下载地址：http://www.mongodb.org/downloads

2.解压缩至D:/mongodb即可

3.创建数据库文件的存放位置，比如D:/mongodb/data/db。启动mongodb服务之前需要必须创建数据库文件的存放文件夹，否则命令不会自动创建，而且不能启动成功。默认文件夹路径为c:/data/db.使用系统默认文件夹路径时，启动服务无需加--dbpath 参数说明，但文件夹还要手工创建

4.打开cmd命令行，进入D:/mongodb/bin目录，输入如下的命令启动mongodb服务：

D:/mongodb/bin>mongod.exe --dbpath D:/mongodb/data/db

 显示：

Sat Jan 08 18:49:34 MongoDB starting : pid=232 port=27017 dbpath=E:/mongodb/data
 32-bit

** NOTE: when using MongoDB 32 bit, you are limited to about 2 gigabytes of data

**       see http://blog.mongodb.org/post/137788967/32-bit-limitations

Sat Jan 08 18:49:34 db version v1.6.5, pdfile version 4.5
Sat Jan 08 18:49:34 git version: 0eb017e9b2828155a67c5612183337b89e12e291
Sat Jan 08 18:49:34 sys info: windows (5, 1, 2600, 2, 'Service Pack 3') BOOST_LI
B_VERSION=1_35
Sat Jan 08 18:49:34 [initandlisten] waiting for connections on port 27017
Sat Jan 08 18:49:34 [websvr] web admin interface listening on port 28017

 

  表示启动成功，最后两行说明的数据库端口和Web端口，默认分别是27017和28017，在浏览器中打开http://localhost:28017，可以看到其相关的一些信息。

      可以通过添加参数--port的方式，来修改数据库端口：D:/mongodb/bin>mongod.exe  --port 10001 --dbpath D:/mongodb/data/db

5.再打开一个cmd输入：D:/mongodb/bin>mongo，或者双击mongo.exe，即可进行mongodb的客户端命令操作了,测试下

 

>// the mongo shell is a javascript shell connected to the db
> 3+3
6
> db
test
> // the first write will create the db:
> db.foo.insert( { a : 1 } )
> db.foo.find()
{ _id : ..., a : 1 }



6.这样每次启动MongoDB很不方便，我们可以像安装的MySQL一样，把它作为Windows服务，这样就方便多了。
安装MongoDB的windows服务的方法为是在MongoDB安装目录下创建logs目录，然后在CMD命令行输入
F:/mongodb/bin>mongod --logpath F:/mongodb/data/log/mongodb.log --logappend  --dbpath F:/mongodb/data/db --directoryperdb --serviceName MongoDB --install

（对应本地命令行：
C:/program files/MongoDB 2.6 Standard/bin>mongod --logpath C:/program files/MongoDB 2.6 Standard/data/log/mongodb.log --logappend --dbpath C:/program files/MongoDB 2.6 Standard/data/db --directoryperdb --serviceName MongoDB --install
）
C:\Program Files\MongoDB 2.6 Standard\bin
显示：

all output going to: D:/mongodb/logs/mongodb.log
Creating service MongoDB.
Service creation successful.
Service can be started from the command line via 'net start "MongoDB"'.

表示服务创建成功。

该命令行指定了日志文件：/logs/MongoDB.log，日志是以追加的方式输出的；

数据文件目录：/data/db，并且参数--directoryperdb说明每个DB都会新建一个目录；

Windows服务的名称：MongoDB；

以上的三个参数都是可以根据自己的情况而定的。

最后是安装参数：--install，与之相对的是--remove

7，以后就可以在cmd下用命令net start MongoDB和net stop MongoDB来启动和停止MongoDB了，也可以在本地服务中看到

通过界面来管理该服务。

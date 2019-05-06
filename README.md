# 基于k8s部署的jira 8.1.0



## Installation 

1.首先有装好mysql环境，并初始化jira建库脚本，并添加用户、修改事务级别如下，因为后面jira启动的初始化环境会要求配置连接数据源

```mysql
create database jira default character set utf8 collate utf8_bin;
CREATE USER `jira`@`%` IDENTIFIED BY 'jira';GRANT ALL ON *.* TO `jira`@`%` WITH GRANT OPTION;
alter user 'jira'@'%' identified with mysql_native_password by 'jira';

set global transaction isolation level read committed;
set session transaction isolation level read committed;
```

2.进入目录jira/docker，生成下镜像文件，这里docker镜像创建过程中所需的文件，我都放在lib目录里面了，无需改动，里面包含mysql驱动jar等。如果还未搭建docker环境，可以参考这个帖子 https://blog.csdn.net/diligent_lee/article/details/79098302

```
docker build -t caicai/jira:1.0 .
```

3.在k8s的dashboard主页执行jira.yaml部署文件。如果还没部署k8s，可以参考这个开源 https://github.com/gjmzj/kubeasz

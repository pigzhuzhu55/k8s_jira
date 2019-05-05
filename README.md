# 基于k8s部署的jira



## Installation 

1.首先装好mysql环境，并初始化jira建库脚本，并添加用户、修改事务级别如下

```mysql
create database jira default character set utf8 collate utf8_bin;
CREATE USER `jira`@`%` IDENTIFIED BY 'jira';GRANT ALL ON *.* TO `jira`@`%` WITH GRANT OPTION;
alter user 'jira'@'%' identified with mysql_native_password by 'jira';

set global transaction isolation level read committed;
set session transaction isolation level read committed;
```

2.目录jira/docker，生成下镜像文件，注意docker需要的文件，我都放在lib目录里面了，无需改动。

```

```

3.在k8s控制台执行jira.yaml部署文件
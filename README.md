# csdn_data

最近因为公司运营人员需要，做一个工具来供其使用，主要功能包括：
1. 获取csdn 主要对应各个栏目的博客数据
2. 可搜索csdn对应的博客数据
3. 可批量单个的操作 关注/取消关注
4. 查看自己的粉丝/已关注的人

----

> 工具的登录并未自身实现，是通过使用chrome 扩展监听的方式获取session
> 扩展会监听.csdn.net域对应cookie信息的变化从而拿到session【cookie】，之后就方便了

### 后端 
后端使用node + express + superagent 实现

### 前端
vue + element + vue-cli


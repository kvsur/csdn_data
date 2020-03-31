const cookie = `uuid_tt_dd=10_16991625950-1585016864434-275682; dc_session_id=10_1585016864434.289625; UN=licheng11403080324; firstDie=1; Hm_lvt_6bcd52f51e9b3dce32bec4a3997715ac=1583734398,1583848209,1583850370,1585033176; c_ref=https%3A//blog.csdn.net/u013613428/article/details/93192961; SESSION=3d4469a1-a8f8-455b-b368-2aa91fbf1353; UserName=licheng11403080324; UserInfo=d0377c1c656941bb8e9f76fed5854508; UserToken=d0377c1c656941bb8e9f76fed5854508; UserNick=deemb; AU=6CE; BT=1585033521015; p_uid=U000000; Hm_ct_6bcd52f51e9b3dce32bec4a3997715ac=6525*1*10_16991625950-1585016864434-275682!1788*1*PC_VC!5744*1*licheng11403080324; announcement=%257B%2522isLogin%2522%253Atrue%252C%2522announcementUrl%2522%253A%2522https%253A%252F%252Fblog.csdn.net%252Fblogdevteam%252Farticle%252Fdetails%252F103603408%2522%252C%2522announcementCount%2522%253A0%252C%2522announcementExpire%2522%253A3600000%257D; Hm_lpvt_6bcd52f51e9b3dce32bec4a3997715ac=1585033700; dc_tos=q7ortw`;
const superagent = require('superagent');

const header = {
    "accept": "application/json, text/plain, */*",
    "accept-eaccept-encoding": "gzip, deflate, br",
    "accept-language": "zh,zh-CN;q=0.9,en;q=0.8",
    "cache-control": "no-cache",
    "origin": "https://i.csdn.net",
    "pragma": "no-cache",
    "referer": "https://i.csdn.net/",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"

}

superagent.get("https://me.csdn.net/api/relation/index?pageno=1&pagesize=20&relation_type=follow")
    .set("Cookie", cookie)
    .set(header)
    .end((err, res) => {
        debugger;
    })
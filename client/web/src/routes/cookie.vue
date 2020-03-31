<template>
  <section class="app-container">
    <h4 class="info-title">个人资料💾</h4>
    <div class="avatar">
      <img src="static/avatar.gif" alt="个人头像" class="user-avatar">
      <p class="info-ID">
        <span>{{userinfo.username}}</span>
      </p>
    </div>
    <div class="user-info" v-if="userinfo.username">
      <p class="info-item">
        <span>真实姓名</span><span>{{userinfo.realname}}</span>
      </p>
      <p class="info-item">
        <span>签名</span><span>{{userinfo.selfdesc}}</span>
      </p>
      <p class="info-item">
        <span>昵称</span><span>{{userinfo.nickname}}</span>
      </p>
      <p class="info-item">
        <span>邮箱</span><span>{{userinfo.loginemail}}</span>
      </p>
      <p class="info-item">
        <span>上次更新</span><span>{{userinfo.lastupdatedate}}</span>
      </p>
      <p class="info-item">
        <span>所属行业</span><span>{{userinfo.industry_name}}</span>
      </p>
      <p class="info-item">
        <span>地址</span><span>{{userinfo.address}}</span>
      </p>
      <p class="info-item">
        <span>生日</span><span>{{userinfo.birthday}}</span>
      </p>
      <p class="info-item">
        <span>性别</span><span>{{userinfo.genderStr}}</span>
      </p>
    </div>
    <el-button v-else type="danger" size="mini" plain>
      <a class="login-action" href="https://passport.csdn.net" target="_blank">点击跳转登录</a>
    </el-button>
  </section>
</template>
<script>
import { fetchUserInfo } from '@/services/user';
export default {
  name: 'Cookie',
  created() {
    this.getInfo()
  },
  data() {
    return {
      userinfo: {

      }
    }
  },
  methods: {
    async getInfo() {
      try {
        const { code, data } = await fetchUserInfo();
        if (code === 200) this.userinfo = data;
        else throw new Error('');
      } catch (e) {
        this.$message({
          type: 'error',
          message: '获取当前用户信息失败，请求点击登录以获取信息'
        })
      }
    }
  }
}
</script>
<style scoped>
.app-container {
  width: 600px;
  margin: 0 auto;
}
div.avatar {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebebeb;
}
.info-title {
  border-bottom: 1px solid #ebebeb;
}
img.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 15px;
}
.user-info {
  width: 400px;
  margin: 0 auto;
}
.info-item > span:first-child {
  font-weight: bold;
  padding-right: 10px;
}
.info-item > span:first-child::after {
  content: ':';
}
.login-action {
  color: rgb(119, 119, 119);
  text-decoration: none;
}
.login-action:hover {
  color: #fff;
}
</style>

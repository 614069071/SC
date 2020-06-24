<template>
  <div class='login-page'>
    <div class="login-form-wrap">
      <div class="login-logo"></div>
      <h2>七分钱后台管理系统</h2>
      <el-form ref="loginForm" :model="user" label-width="0" :rules="rules">
        <el-form-item prop="account">
          <el-input size="samll" v-model.trim="user.account" autocomplete="on" placeholder="请输入账户"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="samll" v-model.trim="user.password" autocomplete="on" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <button class="submit" @click="goToSubmit">登录</button>
      <div class="copyright">版权所有 © 2016 深圳市国银证保信息技术有限公司</div>
    </div>
  </div>
</template>

<script>
import { checkNull } from '@/tools/validate';
import { mapMutations } from 'vuex';
import fetch from '@/fetch';

function dynamicRouterHandel(arr) {
  return arr.map(
    ({
      functionName = '',
      routePage = '',
      functionUrl = '',
      functionTreeVOS = []
    }) => {
      if (functionTreeVOS.length) {
        return {
          name: functionName,
          path: routePage || '',
          meta: { functionUrl },
          children: dynamicRouterHandel(functionTreeVOS)
        };
      }

      return {
        name: functionName,
        path: routePage || '',
        meta: { functionUrl }
      };
    }
  );
}

export default {
  name: 'Login',
  data() {
    return {
      user: {
        account: '', //GYZB-0323
        password: '' //123456
      },
      preRouter: '/welcome',
      rules: {
        account: [{ validator: checkNull.bind(this, '账户') }],
        password: [{ validator: checkNull.bind(this, '密码') }]
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    const preRouter = from.path;
    next(vnode => {
      if (preRouter && preRouter !== '/') {
        vnode.preRouter = preRouter;
      }
    });
    next();
  },
  created() {
    //清除token
    this.setToken('');
    this.setStorage('userinfo', '{}');
  },
  methods: {
    ...mapMutations(['setToken', 'setUserInfo']),
    goToSubmit() {
      const form = this.$refs['loginForm'];

      form.validate(valid => {
        if (valid) {
          this.login(form.model);
        } else {
          this.$message('请输入账号密码');
        }
      });
    },
    login(data) {
      const preRouter = this.preRouter;

      fetch
        .login(data)
        .then(({ data }) => {
          if (!data) return;

          const {
            id = '',
            token = '',
            functionTreeVOS = [],
            userName = '',
            deptName = ''
          } = data;

          const userinfo = {
            token,
            userinfo: { loginId: id, userName, deptName }
          };

          const dynamicRouter = dynamicRouterHandel(functionTreeVOS);

          this.setStorage('menuTree', dynamicRouter);
          this.setStorage('userinfo', userinfo);
          this.setToken(token);
          this.setUserInfo({ loginId: id, userName, deptName });
          this.$router.push(preRouter);
        })
        .catch(err => {
          this.$message('登录失败');
          console.log(err);
        });
    }
  }
};
</script>

<style lang='scss'>
.login-page {
  width: 100%;
  min-height: 100vh;
  background-image: url(../../assets/images/login/bg.jpg);
}

.login-form-wrap {
  width: 370px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;

  .login-logo {
    width: 82px;
    height: 82px;
    background-image: url(../../assets/images/login/logo_bg.png);
    background-size: 270px 114px;
    background-position: 214px 0px;
    display: inline-block;
  }

  h2 {
    height: 36px;
    line-height: 36px;
    font-size: 24px;
    color: #af2f23;
    font-weight: 700;
    margin: 17px 0 70px 0;
  }

  .el-input {
    width: 100%;
  }

  .submit {
    width: 100%;
    height: 44px;
    line-height: 44px;
    border-radius: 5px;
    background-color: #8f005c;
    color: #fff;
    font-size: 20px;
    border: 0;
    cursor: pointer;
  }

  .copyright {
    margin-top: 100px;
    color: #fff;
  }
}
</style>
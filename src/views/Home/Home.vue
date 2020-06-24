<template>
  <div class="home-page">
    <div class="site-header">
      <h1>
        <site-icon iconClass="leaf" size="16" />&nbsp;七分钱后台管理系统
      </h1>

      <div class="header-info">
        {{userinfo.userName}}&nbsp;|&nbsp;员工编号：{{userinfo.loginId}}&nbsp;| {{userinfo.deptName}}
        <!-- | <router-link to="/welcome">
          <site-icon iconClass="xiugai" size="12" /> 修改密码
        </router-link> -->
        <router-link to="/login">| <i class="el-icon-switch-button" /> 退出</router-link>
      </div>
    </div>
    <!-- 中间主体 -->
    <div class="site-container">
      <!-- 侧边菜单栏 -->
      <div class="site-aside clear-scroll-bar">

        <!-- <el-button class="menu-btn" @click="goToToggleMenu">
          <site-icon :iconClass="toggleMenu ?'right': 'left'" size="12" />
        </el-button> -->

        <MenuTree :toggle="toggleMenu" v-model="path" />
      </div>
      <!-- 右边内容 -->
      <div class="site-main">
        <!-- 面包屑导航 -->
        <div class="breadcrumb-main">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>
              <site-icon iconClass="shouye" color="#000" size="16" />
            </el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in path" :key="index">{{item}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="otherBreadcrumbItem">{{otherBreadcrumbItem}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="home-search">
            <el-input prefix-icon="el-icon-search" @keyup.enter.native="goToSearch" placeholder="Search..." v-model="searchText"></el-input>
          </div>
        </div>
        <!-- 主体内容 -->
        <router-view class="el-main-view" :changeOtherBreadcrumbItem.sync="otherBreadcrumbItem" :searchText="sendToSearchText"></router-view>
      </div>
    </div>
  </div>

</template>

<script>
import { sstorage } from '@/tools/utils';
import MenuTree from '@/views/MenuTree/Menu';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: { MenuTree },
  data() {
    return {
      toggleMenu: false,
      path: [],
      searchText: '',
      sendToSearchText: '',
      otherBreadcrumbItem: ''
    };
  },
  watch: {},
  created() {
    const currentRouterArr = sstorage.get('currentRouterArr') || [];

    if (currentRouterArr.length) {
      this.path = currentRouterArr;
    }
  },
  beforeDistroyed() {
    sstorage.set('currentRouterArr', []);
  },
  methods: {
    exit() {
      this.$router.push('/login');
    },
    goToToggleMenu() {
      this.toggleMenu = !this.toggleMenu;
    },
    goToSearch() {
      if (!this.searchText) return;
      this.sendToSearchText = this.searchText;
      this.searchText = '';
    }
  },
  computed: {
    ...mapState(['token', 'userinfo'])
  },
  updated() {}
};
</script>

<style lang="scss">
body,
html {
  height: 100%;
  background-color: #efefef;
  padding: 0;
  margin: 0;
}

.home-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  .site-header {
    height: 60px;
    background-color: #fff;
    border-bottom: 10px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    h1 {
      font-size: 22px;
    }
  }
  .site-container {
    flex: 1;
    overflow: hidden;
    border-bottom: 10px solid #eee;
    display: flex;
    .site-aside {
      min-width: 200px;
      background-color: #fff;
    }
    .site-main {
      flex: 1;
      overflow: hidden;
      border-left: 10px solid #eee;
      background-color: #fff;
      position: relative;
      padding-top: 40px;
      .breadcrumb-main {
        width: 100%;
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
        padding: 0 10px;
        position: absolute;
        top: 0;
        left: 0;
        border-bottom: 1px solid #eee;
      }
    }
  }
}

th,
td {
  text-align: center;
}

.el-menu-toggle:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.menu-btn {
  width: 100%;
}
.el-main-view {
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>

<template>
  <div class="menu-page">
    <el-menu @select="selectHandle" :unique-opened="true" :collapse="toggle" :default-active="defaultActive">
      <MenuItem v-for="(item,index) in dynamicRouter" :key="index" :itemIndex="index" :data="item" icon="el-icon-menu" />
    </el-menu>
  </div>
</template>

<script>
import MenuItem from './MenuItem';
import { sstorage } from '@/tools/utils';

export default {
  props: ['toggle'],
  components: { MenuItem },
  data() {
    return {
      defaultActive: '',
      dynamicRouter: []
    };
  },
  created() {
    const menuTree = this.getStorage('menuTree') || [];
    const defaultActive = sessionStorage.getItem('defaultActive') || '';
    this.dynamicRouter = menuTree;
    this.defaultActive = defaultActive;
  },
  methods: {
    selectHandle(index) {
      const arr = index.split('-');
      let route = [];
      arr.reduce((pre, cur) => {
        route.push(pre[cur].name);
        return pre[cur].children;
      }, this.dynamicRouter);
      this.$emit('input', route);
      sstorage.set('currentRouterArr', route);
      sstorage.set('defaultActive', index);
    }
  }
};
</script>

<style>
</style>
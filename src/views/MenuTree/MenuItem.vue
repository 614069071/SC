<template>
  <el-submenu v-if="data.children && data.children.length" :index="`${itemIndex}`">
    <template slot="title"><i v-if="icon" :class="icon"></i>{{data.name}}</template>
    <menu-item v-for="(item,index) in data.children" :key="index" :itemIndex="`${itemIndex}-${index}`" :index="`${itemIndex}-${index}`" :data="item">
      <template v-if="item.path">
        <router-link :to="item.path">{{item.name}}</router-link>
      </template>
      <a v-else :href="`${item.meta.functionUrl}?loginId=${$store.state.userinfo.loginId}`" target="_blank">{{item.name}}</a>
    </menu-item>
  </el-submenu>
  <el-menu-item :index="`${itemIndex}`" v-else>
    <template v-if="data.path">
      <router-link :to="data.path"><i v-if="icon && itemIndex.toString().split('-').length === 1" :class="icon" />{{data.name}}</router-link>
    </template>
    <a v-else :href="`${data.meta.functionUrl}?loginId=${$store.state.userinfo.loginId}`" target="_blank">{{data.name}}</a>
  </el-menu-item>
</template>

<script>
export default {
  name: 'menu-item',
  props: ['data', 'itemIndex', 'icon']
};
</script>

<style scoped>
.el-menu-item a {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div class="financial-query-page">
    <el-tabs v-model="tabsIndex" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in tabs" :key="index" :label="item.label" :name="item.cpt"></el-tab-pane>
    </el-tabs>
    <components :is="tabsIndex" />
  </div>
</template>

<script>
import { sstorage } from '@/tools/utils';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
export default {
  components: { Tab1, Tab2 },
  data() {
    return {
      tabs: [
        { label: '金蝶待付数据信息', cpt: 'Tab1' },
        { label: '我方账户信息', cpt: 'Tab2' }
      ],
      tabsIndex: 'Tab1'
    };
  },
  created() {
    this.initTabIndex();
  },
  beforeDestroy() {
    sstorage.set('queryCurrentIndex', '');
  },
  methods: {
    handleClick() {
      sstorage.set('queryCurrentIndex', this.tabsIndex);
    }
  }
};
</script>

<style lang="scss">
.financial-query-page {
  overflow: auto;
}
</style>
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
import Tab3 from './Tab3';
import Tab4 from './Tab4';
import Tab5 from './Tab5';
import Tab6 from './Tab6';
import Tab7 from './Tab7';

export default {
  components: {
    Tab1,
    Tab2,
    Tab3,
    Tab4,
    Tab5,
    Tab6,
    Tab7
  },
  data() {
    return {
      tabs: [
        { label: '汇总余额', cpt: 'Tab1' },
        { label: '余额变动', cpt: 'Tab2' },
        { label: '商户余额', cpt: 'Tab3' },
        { label: '用户余额', cpt: 'Tab4' },
        { label: '客戶提现结算', cpt: 'Tab5' },
        { label: '商户提现结算', cpt: 'Tab6' },
        { label: '客户提现撤销列表', cpt: 'Tab7' }
      ],
      tabsIndex: 'Total'
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
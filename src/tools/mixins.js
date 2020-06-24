import { MessageBox } from 'element-ui';

const mixins = {
  methods: {
    // 清空表单
    resetFormFields(ele) {
      this.$refs[ele].resetFields();
    },
    // 针对页面有tab选项卡的页面，初始化tanIndex
    initTabIndex() {
      let index = '';
      const queryCurrentIndex = sessionStorage.getItem('queryCurrentIndex');
      const flag = this.tabs.some(ele => ele.cpt === queryCurrentIndex);
      if (flag) {
        index = queryCurrentIndex;
      } else {
        index = 'Tab1';
      }
      this.tabsIndex = index;
    },
    // 用于提交时，验证表单是否通过
    checkFormSubmit(ele, callback) {
      ele.validate((files, errV) => {
        if (files) {
          callback && callback();
        } else {
          const key = Object.keys(errV)[0];
          const item = ele.fields.find(e => e.prop === key) || {};
          this.$message.error(`${item.label || ''}不可为空`);
        }
      });
    },
    $confirm(message, title, options) {
      return MessageBox.confirm(message, title, options);
    }
  }
};

export default mixins;
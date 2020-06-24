<template>
  <i v-if="type === 'take'" class="el-icon-thumb take-btn" :style="{fontSize:size}" :title="title ? title:'执行'"></i>
  <i v-else-if="type === 'delete'" class="el-icon-delete delete-btn" :style="{fontSize:size}" :title="title ? title:'删除'"></i>
  <i v-else-if="type === 'editor'" class="el-icon-edit editor-btn" :style="{fontSize:size}" :title="title ? title:'修改'"></i>
  <i v-else-if="type === 'look'" class="el-icon-view look-btn" :style="{fontSize:size}" :title="title ? title:'查看'"></i>
  <i v-else-if="type === 'add'" class="el-icon-circle-plus add-btn" :style="{fontSize:size}" :title="title ? title:'新增'"></i>
  <i v-else-if="type === 'report'" class="el-icon-s-order report-btn" :style="{fontSize:size}" :title="title ? title:'报备'"></i>

</template>

<script>
export default {
  name: 'cs-btn',
  props: {
    type: {
      type: String,
      default: 'editor'
    },
    size: {
      type: String,
      default: '16px'
    },
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
i {
  font-size: 16px;
}

.take-btn {
  color: #e6a23c;
}

.delete-btn {
  color: #f56c6c;
}

.editor-btn {
  color: #e6a23c;
}

.look-btn {
  color: #67c23a;
}

.add-btn {
  color: #aaa;
}

.report-btn {
  color: #9585bf;
}
</style>
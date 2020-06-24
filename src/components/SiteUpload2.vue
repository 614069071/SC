<template>
  <!-- 上传预览组件(单文件图片上传)，待优化 -->
  <div class="site-upload-wrap2">
    <el-upload class="material-upload" accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png" :on-change="uploadChange" :show-file-list="false" action="" :auto-upload="false">
      <el-button slot="trigger" size="mini" type="primary" @click="chooseFile">选取文件</el-button>
      <span class="upload-file-name">{{uploadFileName}}</span>
      <div slot="tip" class="el-upload__tip">{{tips}}</div>
    </el-upload>
    <div class="preview-img" :style="{backgroundImage:`url(${uploadImageSrc})`}" @click="previewImages"></div>

    <el-dialog :visible.sync="hide" width="600px" :show-close="false" :append-to-body="true" class="preview-dialog-wrap">
      <img :src="uploadImageSrc" class="preview-images" />
    </el-dialog>
  </div>
</template>

<script>
const preview = function(file) {
  const fileReader = new FileReader();
  let src = '';
  if (window.URL.createObjectURL) {
    src = window.URL.createObjectURL(file);
  } else {
    src = fileReader.readAsDataURL(file);
  }
  return src;
};
// import { preview } from '@/tools/utils';
export default {
  props: {
    tips: {
      type: String,
      default: '支持*jpg、*jpeg、*gif、*bmp、*png图片格式'
    },
    src: {
      type: null
    }
  },
  data() {
    return {
      hide: false,
      uploadFileName: '未选择任何文件',
      mapSrc: null
    };
  },
  created() {
    this.mapSrc = this.src;
  },
  computed: {
    uploadImageSrc() {
      if (!this.mapSrc) {
        return '';
      }
      if (typeof this.mapSrc === 'string') {
        return this.mapSrc;
      }
      return preview(this.mapSrc);
    }
  },
  methods: {
    uploadChange(res) {
      const { name, raw } = res;
      this.mapSrc = raw;
      this.uploadFileName = name;
      this.$emit('update:src', raw);
    },
    chooseFile() {},
    previewImages() {
      if (!this.uploadImageSrc) return;
      this.hide = true;
    }
  }
};
</script>

<style lang='scss'>
.site-upload-wrap2 {
  display: flex;

  .el-upload {
    width: 90px;
  }

  .material-upload {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .el-upload {
      text-align: left;
    }
  }
  .upload-file-name {
    display: inline-block;
    min-width: 100px;
    color: #bababa;
  }

  .preview-dialog-wrap {
    text-align: center;
  }

  .preview-img {
    width: 120px;
    height: 120px;
    margin-left: 10px;
    background-color: #efefef;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .el-dialog__header {
    display: none;
  }
}
</style>
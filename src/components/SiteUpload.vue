<template>
  <!-- 上传预览组件(单文件图片上传)，待优化 -->
  <div class="site-upload-wrap">
    <el-upload name="file" class="material-upload" accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png" action="" :show-file-list="false" :auto-upload="false" :on-change="uploadChange">
      <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
      <span class="upload-file-name">{{uploadFileName}}</span>
      <div slot="tip" class="el-upload__tip">支持*jpg、*jpeg、*gif、*bmp、*png图片格式</div>
    </el-upload>

    <el-image class="preview-img" :src="href + '/pic/' + src" @click="previewImages">
      <i slot="error" class="image-slot el-icon-picture-outline"></i>
    </el-image>

    <el-dialog :visible.sync="hide" width="600px" :show-close="false" :append-to-body="true" class="preview-dialog-wrap">
      <img :src="href + '/pic/' + src" class="preview-images" />
    </el-dialog>
  </div>
</template>

<script>
import fetch from '@/fetch';

export default {
  props: ['src'],
  data() {
    return {
      hide: false,
      uploadFileName: '未选择任何文件',
      uploadImageSrc: '',
      href: '',
      previewSrc: ''
    };
  },
  created() {
    this.href = location.host;
  },
  methods: {
    // on-change 文件改变时 触发
    uploadChange(res) {
      const { name, raw } = res;
      this.uploadFileName = name;
      const fd = new FormData();
      fd.append('file', raw);
      fetch.comUploadPic(fd).then(res => {
        const { imagePath = '' } = res.data;
        if (imagePath) {
          this.$emit('update:src', imagePath);
        }
      });
    },
    previewImages() {
      if (!this.src) return;
      this.hide = true;
    }
  }
};
</script>

<style lang='scss'>
.site-upload-wrap {
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
    display: flex;
    align-items: center;
    justify-content: center;

    .image-slot {
      font-size: 30px;
      color: #909399;
    }
  }

  .el-dialog__header {
    display: none;
  }
}
</style>
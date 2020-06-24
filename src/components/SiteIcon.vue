<template>
  <div :class="'site-icon iconfont ' + `icon-${iconClass}`" :style="{color:color,fontSize:size+'px'}"></div>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: ''
    },
    size: {
      type: String,
      value: '12'
    }
  }
};
</script>

<style>
@font-face {
  font-family: 'iconfont'; /* project id 1536645 */
  src: url('//at.alicdn.com/t/font_1536645_eavdijokou6.eot');
  src: url('//at.alicdn.com/t/font_1536645_eavdijokou6.eot?#iefix')
      format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1536645_eavdijokou6.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1536645_eavdijokou6.woff') format('woff'),
    url('//at.alicdn.com/t/font_1536645_eavdijokou6.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1536645_eavdijokou6.svg#iconfont') format('svg');
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 14px;
  display: inline-block;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-jiahao:before {
  content: '\e61f';
}

.icon-sousuo:before {
  content: '\e819';
}

.icon-yidong:before {
  content: '\e62d';
}

.icon-leaf:before {
  content: '\f035';
}

.icon-tuichu:before {
  content: '\e61d';
}

.icon-xiugai:before {
  content: '\e61e';
}

.icon-right:before {
  content: '\e62b';
}

.icon-left:before {
  content: '\e62c';
}

.icon-yonghu:before {
  content: '\e665';
}

.icon-mima:before {
  content: '\e61b';
}
.icon-shouye:before {
  content: '\e620';
}
</style>
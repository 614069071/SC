import 'element-ui/lib/theme-chalk/index.css';

import {
  Button, Option, Select, Form, FormItem, Menu, MenuItem, Submenu, Pagination, Table, DatePicker, TableColumn,
  Input, Checkbox, CheckboxGroup, Header, Main, Aside, Container, Breadcrumb, BreadcrumbItem, Message, Radio,
  RadioGroup, Dialog, Upload, Tabs, TabPane, Col, Autocomplete, Loading, CascaderPanel, Image
} from 'element-ui';

/* eslint-disable */
Message.install = function (Vue, options) {
  Vue.prototype.$message = Message;
  Vue.prototype.$ELEMENT = { size: 'mini' };
};

const element = {
  install(Vue, options) {
    Vue
      .use(Button).use(Option).use(Select).use(Form).use(FormItem).use(Menu).use(MenuItem).use(Submenu).use(Pagination).use(Table).use(TableColumn)
      .use(Input).use(Checkbox).use(CheckboxGroup).use(Header).use(Main).use(Aside).use(Container).use(BreadcrumbItem).use(Breadcrumb).use(DatePicker).use(Image)
      .use(Message).use(Radio).use(RadioGroup).use(Dialog).use(Upload).use(Tabs).use(TabPane).use(Col).use(Autocomplete).use(Loading).use(CascaderPanel)
  }
};

/* eslint-enable*/


export default element;
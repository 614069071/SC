<template>
  <!-- 码表维护 > 城市信息管理 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="100px" :inline="true" ref="controlQueryForm">
          <el-form-item label="省市名称" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="城市名称" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="区域代码" prop="name3">
            <el-input v-model="examine.name3"></el-input>
          </el-form-item>
          <el-form-item label="区域名称" prop="name4">
            <el-input v-model="examine.name4"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="insertItem">新增<i class="el-icon-circle-plus-outline"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          省市编号 省市名称 城市编号 城市名称 区域编号 区域代码 区域名称
          <el-table-column prop='name1' label='省市编号' min-width="100"></el-table-column>
          <el-table-column prop='name2' label='省市名称' min-width="100"></el-table-column>
          <el-table-column prop='name3' label='城市编号' min-width="100"></el-table-column>
          <el-table-column prop='name4' label='城市名称' min-width="100"></el-table-column>
          <el-table-column prop='name5' label='区域编号' min-width="100"></el-table-column>
          <el-table-column prop='name6' label='区域代码' min-width="100"></el-table-column>
          <el-table-column prop='name7' label='区域名称' min-width="100"></el-table-column>

          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteClick(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 添加省份/城市/区域 -->
    <el-dialog title="添加省份/城市/区域" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="添加类型" required>
          <el-select v-model="addModelData.name1" placeholder="请选择">
            <el-option label="省份" value="1"></el-option>
            <el-option label="城市" value="2"></el-option>
            <el-option label="区域" value="3"></el-option>
          </el-select>
        </el-form-item>

        <template v-if="addModelData.name1 == '1'">
          <el-form-item prop="name2" label="省份名称" required>
            <el-input v-model="addModelData.name2"></el-input>
          </el-form-item>
        </template>

        <template v-else-if="addModelData.name1 == '2'">
          <el-form-item prop="name3" label="请选择" required>
            <el-select v-model="addModelData.name3" placeholder="选择省份">
              <el-option label="天津" value="1"></el-option>
              <el-option label="辽宁" value="2"></el-option>
              <el-option label="上海" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="name4" label="城市名称" required>
            <el-input v-model="addModelData.name4"></el-input>
          </el-form-item>
        </template>

        <template v-else>
          <el-form-item prop="name5" label="请选择" required class="area-selection">
            <el-select v-model="addModelData.name5" placeholder="选择省份">
              <el-option label="天津" value="1"></el-option>
              <el-option label="辽宁" value="2"></el-option>
              <el-option label="上海" value="3"></el-option>
            </el-select>
            <el-select v-model="addModelData.name6" placeholder="选择城市">
              <el-option label="天津" value="1"></el-option>
              <el-option label="辽宁" value="2"></el-option>
              <el-option label="上海" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="name7" label="区域名称" required>
            <el-input v-model="addModelData.name7"></el-input>
          </el-form-item>
          <el-form-item prop="name8" label="区域代码" required>
            <el-input v-model="addModelData.name8"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改model -->
    <el-dialog title="添加省份/城市/区域" :visible.sync="editorDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="editorModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="添加类型" required>
          <el-select v-model="editorModelData.name1" placeholder="请选择">
            <el-option label="省份" value="1"></el-option>
            <el-option label="城市" value="2"></el-option>
            <el-option label="区域" value="3"></el-option>
          </el-select>
        </el-form-item>

        <template v-if="editorModelData.name1 == '1'">
          <el-form-item prop="name2" label="省份名称" required>
            <el-input v-model="editorModelData.name2"></el-input>
          </el-form-item>
        </template>

        <template v-else-if="editorModelData.name1 == '2'">
          <el-form-item prop="name3" label="请选择" required>
            <el-select v-model="editorModelData.name3" placeholder="选择省份">
              <el-option label="天津" value="1"></el-option>
              <el-option label="辽宁" value="2"></el-option>
              <el-option label="上海" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="name4" label="城市名称" required>
            <el-input v-model="editorModelData.name4"></el-input>
          </el-form-item>
        </template>

        <template v-else>
          <el-form-item prop="name5" label="请选择" required class="area-selection">
            <el-select v-model="editorModelData.name5" placeholder="选择省份">
              <el-option label="天津" value="1"></el-option>
              <el-option label="辽宁" value="2"></el-option>
              <el-option label="上海" value="3"></el-option>
            </el-select>
            <el-select v-model="editorModelData.name6" placeholder="选择城市">
              <el-option label="天津" value="1"></el-option>
              <el-option label="辽宁" value="2"></el-option>
              <el-option label="上海" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="name7" label="区域名称" required>
            <el-input v-model="editorModelData.name7"></el-input>
          </el-form-item>
          <el-form-item prop="name8" label="区域代码" required>
            <el-input v-model="editorModelData.name8"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 任务删除 -->
    <el-dialog title="删除任务" :visible.sync="deleteDisplay" width="600px">
      <el-form ref="alertAddModelForm" disabled :model="deleteModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="添加类型">
          <el-select v-model="deleteModelData.name1" placeholder="请选择">
            <el-option label="省份" value="1"></el-option>
            <el-option label="城市" value="2"></el-option>
            <el-option label="区域" value="3"></el-option>
          </el-select>
        </el-form-item>

        <template v-if="deleteModelData.name1 == '1'">
          <el-form-item prop="name2" label="省份名称">
            <el-input v-model="deleteModelData.name2"></el-input>
          </el-form-item>
        </template>

        <template v-else-if="deleteModelData.name1 == '2'">
          <el-form-item prop="name3" label="请选择">
            <el-select v-model="deleteModelData.name3" placeholder="选择省份">
              <el-option label="天津" value="1"></el-option>
              <el-option label="辽宁" value="2"></el-option>
              <el-option label="上海" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="name4" label="城市名称">
            <el-input v-model="deleteModelData.name4"></el-input>
          </el-form-item>
        </template>

        <template v-else>
          <el-form-item prop="name5" label="请选择" class="area-selection">
            <el-select v-model="deleteModelData.name5" placeholder="选择省份">
              <el-option label="天津" value="1"></el-option>
              <el-option label="辽宁" value="2"></el-option>
              <el-option label="上海" value="3"></el-option>
            </el-select>
            <el-select v-model="deleteModelData.name6" placeholder="选择城市">
              <el-option label="天津" value="1"></el-option>
              <el-option label="辽宁" value="2"></el-option>
              <el-option label="上海" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="name7" label="区域名称">
            <el-input v-model="deleteModelData.name7"></el-input>
          </el-form-item>
          <el-form-item prop="name8" label="区域代码">
            <el-input v-model="deleteModelData.name8"></el-input>
          </el-form-item>
        </template>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteModelCancel">取 消</el-button>
        <el-button type="primary" @click="deleteModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: '000',
  name2: '湖北省',
  name3: '251',
  name4: '武汉市',
  name5: '0',
  name6: '1100',
  name7: '天津市'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      addDisplay: false,
      addModelData: {
        name1: '1'
      },
      editorDisplay: false,
      editorModelData: {},
      deleteDisplay: false, //任务删除
      deleteModelData: {},
      tableData: new Array(5).fill(testData),
      paginationOps: {
        pageSizes: [5, 10, 15, 20],
        total: 100
      }
    };
  },
  watch: {
    // 监听search传来的数据
    searchText(v) {
      window.console.log(v);
    }
  },
  created() {},
  methods: {
    addModelSubmit() {
      this.$refs['alertAddModelForm'].validate((files, object) => {
        if (files) {
          // 验证通过 发送请求添加数据到数据库
          this.addDisplay = false;
        } else {
          const keys = Object.keys(object);
          this.$message.error(`${keys[0]}不可为空`);
        }
      });
      window.console.log(this.addModelData);
    },
    addModelCancel() {
      this.addDisplay = false;
      // this.resetFormFields('alertAddModelForm');
    },
    editorModelCancel() {
      this.editorDisplay = false;
    },
    editorModelSubmit() {
      window.console.log(this.editorModelData);
      this.editorDisplay = false;
    },
    editorClick(row) {
      this.editorDisplay = true;
      this.editorModelData = row;
      window.console.log(row);
    },
    deleteClick(row) {
      this.deleteDisplay = true;
      this.deleteModelData = row;
      window.console.log(row);
    },
    deleteModelSubmit() {
      this.deleteDisplay = false;
    },
    deleteModelCancel(row) {
      this.deleteDisplay = false;
      window.console.log(row);
    },
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    },
    lookClick(row) {
      this.lookDisplay = true;
      window.console.log(row);
    },
    insertItem() {
      // 新增
      this.addDisplay = true;
    }
  }
};
</script>

<style lang='scss'>
.area-selection {
  .el-form-item__content {
    display: flex;
    .el-select:first-child {
      margin-right: 20px;
    }
  }
}
</style>
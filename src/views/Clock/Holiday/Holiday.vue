<template>
  <!-- 码表维护 > 节假日管理 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="日期" prop="name1">
            <el-date-picker v-model="examine.name1" type="date" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="是否工作日" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='name1' label='编号' width="60"></el-table-column>
          <el-table-column prop='name2' label='日期' width="100"></el-table-column>
          <el-table-column prop='name3' label='星期' width="90"></el-table-column>
          <el-table-column prop='name4' label='日期详情' width="80"></el-table-column>
          <el-table-column prop='name5' label='工作日' width="60"></el-table-column>
          <el-table-column prop='name6' label='备注' min-width="100"></el-table-column>
          <el-table-column prop='name7' label='创建人' width="80"></el-table-column>
          <el-table-column prop='name8' label='创建时间' width="160"></el-table-column>
          <el-table-column prop='name9' label='更新人' width="100"></el-table-column>
          <el-table-column prop='name10' label='更新时间' width="160"></el-table-column>

          <el-table-column fixed="right" label="操作" width="60">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 节假日修改 -->
    <el-dialog title="节假日修改" :visible.sync="editorDisplay" width="600px">
      <el-form :model="editorModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="编号" required>
          <el-input disabled v-model="editorModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name2" label="日期" required>
          <el-input disabled v-model="editorModelData.name2"></el-input>
        </el-form-item>
        <el-form-item prop="name3" label="星期" required>
          <el-input disabled v-model="editorModelData.name3"></el-input>
        </el-form-item>
        <el-form-item prop="name4" label="星期详情" required>
          <el-input v-model="editorModelData.name4"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="是否工作日" required>
          <el-select v-model="editorModelData.name5" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name6" label="修改备注" required>
          <el-input type="textarea" v-model="editorModelData.name6"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editorModelCancel">取 消</el-button>
        <el-button type="primary" @click="editorModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: '4382',
  name2: '2015-01-01',
  name3: 'Thursday',
  name4: '元旦',
  name5: '否',
  name6: '',
  name7: '',
  name8: '2015-10-24 00:13:57	',
  name9: 'U000039',
  name10: '2015-10-24 00:13:57'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      editorDisplay: false,
      editorModelData: {},
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
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    }
  }
};
</script>

<style lang='scss' scoped></style>
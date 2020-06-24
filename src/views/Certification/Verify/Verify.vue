<template>
  <!-- 实名认证 > 实名认证验证明细 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="86px" :inline="true" ref="controlQueryForm">
          <el-form-item label="文件编号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>

          <el-form-item label="验证状态" prop="name2">
            <el-select v-model="examine.name2" placeholder="请选择">
              <el-option label="待验证" value="0"></el-option>
              <el-option label="验证不通过" value="1"></el-option>
              <el-option label="验证通过" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="手机号码" prop="name3">
            <el-input v-model="examine.name3"></el-input>
          </el-form-item>

          <el-form-item label="处理状态" prop="name4">
            <el-select v-model="examine.name4" placeholder="请选择">
              <el-option label="验通过证" value="0"></el-option>
              <el-option label="待处理" value="1"></el-option>
              <el-option label="处理完成" value="2"></el-option>
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
          <el-table-column prop='name1' label='文件编号' min-width="140"></el-table-column>
          <el-table-column prop='name2' label='客户编号' min-width="140"></el-table-column>
          <el-table-column prop='name3' label='手机号码' width="110"></el-table-column>
          <el-table-column prop='name4' label='客户名称' width="80"></el-table-column>
          <el-table-column prop='name5' label='证件号码' min-width="100"></el-table-column>
          <el-table-column prop='name6' label='数据日期' width="90"></el-table-column>
          <el-table-column prop='name7' label='验证状态' width="80"></el-table-column>
          <el-table-column prop='name8' label='写入日期' width="100"></el-table-column>
          <el-table-column prop='name9' label='返回信息' width="80"></el-table-column>
          <el-table-column prop='name10' label='处理状态' width="80"></el-table-column>
          <el-table-column prop='name11' label='处理人' width="80"></el-table-column>
          <el-table-column prop='name12' label='处理备注' min-width="80"></el-table-column>

          <el-table-column fixed="right" label="操作" width="60">
            <template slot-scope="scope">
              <!-- scope.flag 该认证是否已经处理过，处理过，则无需再显示处理按钮 -->
              <el-button v-if="!scope.flag" type="text" size="small" @click="performClick(scope.row)">处理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 处理 -->
    <el-dialog title="审核不通过" :visible.sync="performDisplay" width="600px">
      <el-form :model="performModelData" class="alert-model-form" label-width="100px">
        <el-form-item prop="name1" label="处理备注">
          <el-input type="textarea" v-model="performModelData.name1" placeholder="请输入处理备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="performModelCancel">取 消</el-button>
        <el-button type="primary" @click="performModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: '2016122619570215300100000001',
  name2: 'b7b1610ef5934861b1e7f92c63295d50',
  name3: '18779206746',
  name4: '张蕾',
  name5: '360481199405151222',
  name6: '20161224',
  name7: '验证通过',
  name8: '2016-12-26	',
  name9: '',
  name10: '验证通过'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      performDisplay: false, //执行
      performModelData: {},
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
    performModelCancel() {
      this.performDisplay = false;
    },
    performModelSubmit() {
      window.console.log(this.performModelData);
      this.performDisplay = false;
    },
    performClick(row) {
      this.performDisplay = true;
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
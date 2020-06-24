<template>
  <!-- 交易管理 => 充值撤销管理 -->
  <div>
    <page-model>
      <template slot="controlQueryOps">
        <el-form :model="examine" label-width="100px" :inline="true" ref="controlQueryForm">
          <el-form-item label="撤销流水号" prop="name1">
            <el-input v-model="examine.name1"></el-input>
          </el-form-item>
          <el-form-item label="原交易订单号" prop="name2">
            <el-input v-model="examine.name2"></el-input>
          </el-form-item>
          <el-form-item label="撤销申请时间" prop="name3">
            <el-date-picker v-model="examine.name3" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="客户账号" prop="name4">
            <el-input v-model="examine.name4"></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template slot="controlQueryBtns">
        <el-button type="primary" @click="goToSearch">查询<i class="el-icon-search"></i> </el-button>
        <el-button type="warning" @click="$refs['controlQueryForm'].resetFields()">清空<i class="el-icon-rank"></i></el-button>
        <el-button type="info" @click="insertItem">新增申请<i class="el-icon-circle-plus-outline"></i></el-button>
      </template>

      <template slot="tableInner">
        <el-table :data="tableData" border>
          <el-table-column prop='name1' label='订单号' min-width="140"></el-table-column>
          <el-table-column prop='name2' label='原交易订单号' min-width="130"></el-table-column>
          <el-table-column prop='name3' label='原交易时间' min-width="100"></el-table-column>
          <el-table-column prop='name4' label='充值金额' min-width="80"></el-table-column>
          <el-table-column prop='name5' label='客户账号' min-width="110"></el-table-column>
          <el-table-column prop='name6' label='申请人' min-width="85"></el-table-column>
          <el-table-column prop='name7' label='申请时间' min-width="100"></el-table-column>
          <el-table-column prop='name8' label='状态' min-width="110"></el-table-column>
          <el-table-column prop='name9' label='撤销描述信息' min-width="140"></el-table-column>
          <el-table-column prop='name10' label='审核人' min-width="90"></el-table-column>
          <el-table-column prop='name11' label='审核状态' min-width="100"></el-table-column>
          <el-table-column prop='name12' label='审核时间' min-width="100"></el-table-column>
          <el-table-column prop='name13' label='备注' min-width="120"></el-table-column>

          <el-table-column fixed="right" label="操作" width="60">
            <!-- <template slot-scope="scope">
              <el-button type="text" size="small" @click="editorClick(scope.row)">编辑</el-button>
            </template> -->
          </el-table-column>
        </el-table>
      </template>

      <template slot="pageModelPagination">
        <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="paginationOps.pageSizes" :total="paginationOps.total">
        </el-pagination>
      </template>
    </page-model>

    <!-- 新增申请 -->
    <el-dialog title="交易撤销新增申请" :visible.sync="addDisplay" width="600px">
      <el-form ref="alertAddModelForm" :model="addModelData" class="alert-model-form" label-width="120px" :show-message="false">
        <el-form-item prop="name1" label="原交易订单号">
          <el-input v-model="addModelData.name1"></el-input>
        </el-form-item>
        <el-form-item prop="name5" label="撤销原因">
          <el-input type="textarea" v-model="addModelData.name8"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModelCancel">取 消</el-button>
        <el-button type="primary" @click="addModelSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const testData = {
  name1: '2016082311214426300700000006',
  name2: '2016082310341700100000002',
  name3: '2016-08-23 23:34:38',
  name4: '550.00',
  name5: '18826582622',
  name6: '谢小良',
  name7: '2016-08-23 11:21:44',
  name8: '核心处理失败',
  name9: '清算测试充值撤销',
  name10: '谢小良',
  name11: '审核通过',
  name12: '2016-08-23 11:37:05',
  name13: '请求报文流水号重复'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      addDisplay: false,
      addModelData: {},
      display: false,
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

    editorModelSubmit(c) {
      window.console.log(this.editorModelData);
      c();
    },
    editorClick(row) {
      this.display = true;
      window.console.log(row);
    },
    goToSearch() {
      //查询
      window.console.log(this.examine, '查询');
    },
    insertItem() {
      // 新增
      this.addDisplay = true;
    }
  }
};
</script>

<style lang='scss' scoped></style>
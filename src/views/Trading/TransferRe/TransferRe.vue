<template>
  <!-- 交易管理 => 转账撤销管理 -->
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
          <el-form-item label="原付方账号" prop="name4">
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
          <el-table-column prop='name1' label='订单号' min-width="100"></el-table-column>
          <el-table-column prop='name2' label='原交易订单号' min-width="100"></el-table-column>
          <el-table-column prop='name3' label='交易金额' min-width="100"></el-table-column>
          <el-table-column prop='name4' label='原交易时间' min-width="100"></el-table-column>
          <el-table-column prop='name5' label='原付方账号' min-width="120"></el-table-column>
          <el-table-column prop='name6' label='原付方姓名' min-width="90"></el-table-column>
          <el-table-column prop='name7' label='原收方账号' min-width="120"></el-table-column>
          <el-table-column prop='name8' label='原收方姓名' min-width="100"></el-table-column>
          <el-table-column prop='name9' label='申请人' min-width="80"></el-table-column>
          <el-table-column prop='name10' label='申请时间' min-width="90"></el-table-column>
          <el-table-column prop='name11' label='状态' min-width="70"></el-table-column>
          <el-table-column prop='name12' label='撤销描述信息' min-width="100"></el-table-column>
          <el-table-column prop='name14' label='审核人' min-width="80"></el-table-column>
          <el-table-column prop='name15' label='审核状态' min-width="80"></el-table-column>
          <el-table-column prop='name16' label='审核时间' min-width="100"></el-table-column>
          <el-table-column prop='name17' label='备注' min-width="100"></el-table-column>

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
    <el-dialog title="转账撤销新增申请" :visible.sync="addDisplay" width="600px">
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
  name1: '2016082311291813400700000010',
  name2: '2016082311022500300000018',
  name3: '100.00	',
  name4: '2016-08-24 00:02:26	',
  name5: '15989791023	',
  name6: '邱测试510	',
  name7: '18823177001	',
  name8: '田康	',
  name9: '谢小良	',
  name10: '2016-08-23 11:29:18',
  name11: '取消',
  name12: '核心处理失败	',
  name13: '清算测试	',
  name14: '谢小良	',
  name15: '审核通过	',
  name16: '2016-08-23 11:33:15	',
  name17: '已有成功或正在处理中的对应交易'
};

export default {
  props: ['searchText'],
  data() {
    return {
      examine: {},
      addDisplay: false,
      addModelData: {},
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
    },
    editorClick(row) {
      this.editorDisplay = true;
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
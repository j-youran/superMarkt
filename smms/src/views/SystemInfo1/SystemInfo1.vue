<template>
  <div class="system-info1">
    <!-- 卡片-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>系统信息管理</h3>
      </div>
      <div class="text item">
        <!-- 提醒信息 -->
        <el-alert title="成功提示的文案" type="success"  show-icon></el-alert>
        <el-alert title="导入数据" type="info"  show-icon></el-alert>
      </div>
      <el-row :gutter="20">
        <!-- 销售排行榜 ,右边面版 -->
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <h3>销售排行榜</h3>
            </div>
            <div class="text item">
              <el-table :data="saleRank" style="width:100%" :row-class-name="tableRowClassName">
                <el-table-column prop="goods" label="商品名称" ></el-table-column>
                <el-table-column prop="sales" label="销量"></el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <!--缺货商品 ,左边面版 -->
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <h3>缺货商品</h3>
            </div>
            <div class="text item">
              <el-table :data="stockoutTable" style="width:100%">
                <el-table-column prop="goods" label="商品名称"></el-table-column>
                <el-table-column prop="repertory" label="库存"></el-table-column>
                <el-table-column prop="operation" label="操作"></el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  methods: {
tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
  },
  data() {
    return {
      //销售排行榜
      saleRank: [
        {
          goods: "可口可乐",//商品名
          sales: 1001//销量
        },
        {
          goods: "香飘飘",//商品名
          sales: 100//销量
        }
      ],
      //缺货商品
      stockoutTable: [
        {
          goods: "趣悠悠接吻糖",//商品名
          repertory: 0,//库存
          operation: "入库"//操作
        }
      ]
    };
  }
};
</script>
<style lang='less'>
// 引入样式
@import "./SystemInfo.less";
</style>

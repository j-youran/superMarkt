<template>
  <div class="sell-total1">
    <!-- 卡片，商品管理 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>销售统计</h3>
      </div>
      <div id="sellEcharts" style="height:480px"></div>
    </el-card>
  </div>
</template>
<script>
import { getSellData } from "@/api/goods";
export default {
  data() {
    return {
      res: [820, 932, 901, 934, 1290, 1330, 1320],
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
  },
  methods: {
    //重新加载
    getData() {
      // 1. 初始化报表
      let sellChart = this.echarts.init(document.getElementById("sellEcharts"));
      //配置报表
      let option = {
        xAxis: {
          type: "category",
          data: this.data
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.res,
            type: "line"
          }
        ]
        
      };

      // 3. 使用配置生成报表
      sellChart.setOption(option);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang='less'>
.sell-total1 {
  .box-card {
    .el-card__header {
      color: #f1f1f1;
      background: #3793df;
      h3 {
        font-size: 18px;
      }
    }
  }
}
</style>

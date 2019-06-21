<template>
  <div class="stock-total">
    <!-- 卡片，商品管理 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>进货统计</h3>
      </div>
      <div id="sellEcharts" style="height:480px"></div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    //重新加载
    getData() {
      // 1. 初始化报表
      let sellChart = this.echarts.init(document.getElementById("sellEcharts"));
      //配置报表
      let option = {
        title: {
          text: "一月进价统计",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "00:00",
            "01:15",
            "02:30",
            "03:45",
            "05:00",
            "06:15",
            "07:30",
            "08:45",
            "10:00",
            "11:15",
            "12:30",
            "13:45",
            "15:00",
            "16:15",
            "17:30",
            "18:45",
            "20:00",
            "21:15",
            "22:30",
            "23:45"
          ]
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}"
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 6,
              color: "green"
            },
            {
              gt: 6,
              lte: 8,
              color: "red"
            },
            {
              gt: 8,
              lte: 14,
              color: "green"
            },
            {
              gt: 14,
              lte: 17,
              color: "red"
            },
            {
              gt: 17,
              color: "green"
            }
          ]
        },
        series: [
          {
            name: "进货数量",
            type: "line",
            smooth: true,
            data: [
              300,
              280,
              250,
              260,
              270,
              300,
              550,
              500,
              400,
              390,
              380,
              390,
              400,
              500,
              600,
              750,
              800,
              700,
              600,
              400
            ],
            markArea: {
              data: [
                [
                  {
                    name: "预计进货量",
                    xAxis: "07:30"
                  },
                  {
                    xAxis: "10:00"
                  }
                ],
                [
                  {
                    name: "实际进货量",
                    xAxis: "17:30"
                  },
                  {
                    xAxis: "21:15"
                  }
                ],
              ]
            }
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
.stock-total {
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

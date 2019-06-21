<template>
  <div class="home1">
    <!-- 布局容器 -->
    <el-container>
      <!-- 左侧栏 -->
      <el-aside width="200px">
        <!-- 引入LeftNav组件 -->
        <LeftNav1/>
      </el-aside>
      <el-container>
        <!-- 右，上 -->
        <el-header>
          <!-- 引入Header1右上组件 -->
          <RightHeader1></RightHeader1>
        </el-header>
        <!-- 右，中 -->
        <el-main>
          <!-- 路由出口 -->
          <router-view/>
        </el-main>
        <!-- 右，下 -->
        <el-footer>
          <Footer1></Footer1>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
//引入组件
import LeftNav1 from "@/components/LeftNav1/LeftNav1.vue";
import RightHeader1 from "@/components/RightHeader1/RightHeader1.vue";
import Footer1 from "@/components/Footer1/Footer1.vue";
export default {
  components: {
    LeftNav1,
    RightHeader1,
    Footer1
  },
  data() {
    return {};
  }
};
</script>
<style lang='less'>
// 引入样式
@import "./Home1.less";
</style>

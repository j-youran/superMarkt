<template>
  <div class="goods-add1">
    <!-- 卡片，添加商品 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>添加商品</h3>
      </div>
      <!-- 下面表单部分 -->
      <div class="text item">
        <el-form
          :model="goodsForm"
          :rules="rules"
          ref="goodsForm"
          label-width="100px"
          class="goodsForm"
          status-icon
        >
          <!-- 所属分类 -->
          <el-form-item label="所属分类" prop="classify">
            <el-select v-model="goodsForm.classify" placeholder="-----选择分类-----">
              <el-option label="电子类" value="电子类"></el-option>
              <el-option label="食品类" value="食品类"></el-option>
              <el-option label="烟酒类" value="烟酒类"></el-option>
              <el-option label="服装类" value="服装类"></el-option>
              <el-option label="生鲜类" value="生鲜类"></el-option>
            </el-select>
          </el-form-item>
          <!-- 商品条形码 -->
          <el-row type="flex" class="row-bg">
            <el-col :span="7">
              <div class="grid-content bg-purple">
                <el-form-item label="商品条形码" style="width:400px" prop="barCode">
                  <el-input v-model="goodsForm.barCode"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                <el-form-item>
                  <el-button type="primary" @click="onSubmit" size="mini">生成条形码</el-button>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple"></div>.
            </el-col>
          </el-row>
          <!-- 商品名称 -->
          <el-form-item label="商品名称" prop="goodsName" style="width:400px">
            <el-input v-model="goodsForm.goodsName"></el-input>
          </el-form-item>
          <!-- 商品售价 -->
          <el-form-item label="售价"  prop="price" style="width:400px">
            <el-input v-model="goodsForm.price" ></el-input>
          </el-form-item>
          <!-- 成本价 -->
          <el-form-item label="成本价"  prop="purchasingPrice" style="width:400px">
            <el-input v-model="goodsForm.purchasingPrice" @blur="autoPrice"></el-input>
          </el-form-item>
          <!-- 库存 -->
          <el-form-item label="库存" prop="repertory" style="width:400px">
            <el-input v-model="goodsForm.repertory"></el-input>
            <span>计重商品单位为千克(kg)</span>
          </el-form-item>
          <!-- 会员优惠 -->
          <el-form-item label="会员优惠" style="width:400px">
            <el-radio v-model="radio" label="1">享受</el-radio>
            <el-radio v-model="radio" label="2">不享受</el-radio>
          </el-form-item>
          <!-- 活动形式 -->
          <el-form-item label="商品简介">
            <el-input type="textarea" v-model="goodsForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">添加</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import { log } from "util";
import { setTimeout } from "timers";
import { goodsadd } from "@/api/goods";
export default {
  data() {
    return {
      // 商品列表
      goodsForm: {
        classify: "",
        barCode: "",
        goodsName: "",
        price: "",
        purchasingPrice: "",
        repertory: "",
        desc: ""
      },
      rules: {
        //商品条码
        barCode: [
          { required: true, message: "请输入商品条码", trigger: "blur" }
        ],
        // 商品名称
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        //分类
        classify: [
          { required: true, message: "请选择所属分类", trigger: "change" }
        ],
        //售价
        price: [{ required: true, message: "请输入商品售价", trigger: "blur" }],
        //成本
        purchasingPrice: [
          { required: true, message: "请输入商品成本价", trigger: "blur" }
        ],
        //库存
        repertory: [
          { required: true, message: "请输入商品库存", trigger: "blur" }
        ]
      },
      radio: 1
    };
  },
  methods: {
    //商品售价自动补全
    autoPrice() {
      this.goodsForm.price =  (parseFloat(this.goodsForm.purchasingPrice) * 1.5).toFixed(2)
  //售价为商品成品价的1.5倍 */
      //alert('1')
      
    },
    //生成验证码
    onSubmit() {
      console.log("submit!");
    },
    //添加按钮
    submitForm() {
      //获取，并调用验证方法
      this.$refs.goodsForm.validate(valid => {
        //判断
        if (valid) {
          //收集参数
          let params = {
            classify: this.goodsForm.classify, //分类
            barCode: this.goodsForm.barCode, //商品条码
            goodsName: this.goodsForm.goodsName, //商品名称
            price: this.goodsForm.price, //售价
            purchasingPrice: this.goodsForm.purchasingPrice, //成本价
            repertory: this.goodsForm.repertory //库存
          };
          //console.log(params);
          //发送请求给后端
          console.log(params);
          
          goodsadd(params)
            .then(response => {
              //接收响应数据
              let { code, reason } = response;
              //判断
              if (code === 0) {
                //成功
                this.$message({
                  //弹出成功提示
                  message: reason,
                  type: "success"
                });
                //成功
                this.$router.push("/home1/goodsmanage1");
              } else if (code === 1) {
                //失败
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("添加失败！");
          return false;
        }
      });
    },
    //重置按钮
    resetForm() {
      this.$resf.goodsForm.resetFields();
    }
  }
};
</script>
<style lang='less'>
.goods-add1 {
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

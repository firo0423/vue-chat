<template>
  <div class="home">
      <el-header height="">
          <div class="block"><el-avatar :size="100" ></el-avatar></div>
          <span>{{username}}</span>
          <div class="state"><i class="el-icon-edit"></i>学习中</div>
      </el-header>
        <el-divider></el-divider>
      <el-main height="">
          
      </el-main>
      
  </div>
</template>

<script>
export default {
    data() {
        return {
            username:'李狗蛋'
        }
    },
}
</script>

<style scoped>
.el-header {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    align-items: center;
}
.el-header>span{
    font-size: 20px;
}
.state{
    height: 25px;
    background-color: #c0c4cc;
    border-radius: 10px;
    line-height: 25px;
    font-size: 15px;
    margin-top: 10px;
    padding-right: 5px;
}
.state i{
    float: left;
    margin-top: 4px;
    margin-left: 5px;
}
.el-divider{
    height: 3px;
    width: 570px;
    margin-left: 15px;
    
}
</style>
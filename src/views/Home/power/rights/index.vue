<template>
  <div class="rights">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- 表格区域 -->
      <!-- 表格区域 -->
      <el-table :data="rights" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路经" prop="path"></el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 权限列表
      rights: []
    }
  },
  created() {
    // 获取所有的权限
    this.getRights()
  },
  methods: {
    async getRights() {
      const { data: { data, meta } } = await this.$http.get('rights/list')
      if (meta.status !== 200) return this.$message.error(meta.msg)
      console.log(data)
      this.rights = data
    }
  }
}
</script>
<style lang='less' scoped>
</style>

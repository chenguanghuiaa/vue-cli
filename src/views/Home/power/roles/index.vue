<template>
  <div class="roles">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

     <!-- 卡片视图 -->
    <el-card>
       <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="roles" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['bdbottom','vcenter',{'bdtop': i1===0}]" v-for="(item1,i1) in scope.row.children" :key="item1.id">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row, item3.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级三级权限 -->
              <el-col :span="19">
                <el-row :class="['vcenter',{bdtop: i2!=0}]" v-for="(item2,i2) in item1.children" :key="item2.id">
                  <!-- 渲染二级权限 -->
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row, item3.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                  <!-- 渲染三级权限 -->
                    <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id" closable @close="removeRightById(scope.row, item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" :disabled="scope.row.id===30">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分配权限的对话框 -->
      <el-dialog title="分配权限" :visible.sync="rightDialogVisible" width="50%" @close="setRightDialogClosed">
        <!-- 树形控件 -->
        <el-tree :data="rightslist" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="rightDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="allotRights">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加的对话框 -->
      <!-- <el-dialog title="提示" width="40%">
        <el-form label-width="70px">
          <el-form-item  label="角色名称" prop="roleName"></el-form-item>
          <el-form-item  label="角色描述" prop="roleDesc"></el-form-item>
        </el-form>
      </el-dialog> -->
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 所有角色列表区域
      roles: [],
      // 控制分配权限对话框的显示与隐藏
      rightDialogVisible: false,
      // 所有权限的数据
      rightslist: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点Id值数组
      defKeys: [],
      rolesId: ''
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    // 获取所有角色的列表
    async getRoles() {
      const { data: { data, meta } } = await this.$http.get('roles')
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.roles = data
      console.log(data)
    },
    // 点击按钮，删除用户权限
    async removeRightById(role, rightId) {
      try { // 成功
        await this.$confirm('此操作将删除该用户权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const { data: { data, meta } } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        if (meta.status !== 200) return this.$message.error('删除用户权限失败！')
        this.$message.success('删除用户权限成功')
        // 重新获取用户列表数据
        role.children = data
      } catch (err) { // 失败
        this.$message.info('已取消删除')
      }
    },
    // 展示分配权限的对话框
    async showSetRightDialog(role) {
      this.roleId = role.id
      // 获取所有权限的数据
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败！')
      }
      // 把获取到的权限数据保存到 data 中
      this.rightslist = res.data
      console.log(this.rightslist)
      // 递归获取三级节点的Id
      this.getLeafKeys(role, this.defKeys)
      this.rightDialogVisible = true
    },
    // 通过递归的形式，获取角色下所有三级权限的id，并保存到 defKeys 数组中
    getLeafKeys(node, arr) {
      // 如果当前 node 节点不包含 children 属性，则是三级节点
      if (!node.children) return arr.push(node.id)
      // 循环递归把id添加到赋值给arr 数组
      node.children.forEach(item => this.getLeafKeys(item, arr))
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogClosed() {
      this.defKeys = []
    },
    async allotRights() {
      // 获取到选中的id(api里提供的方法)
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      // 把获取到的id，转换为以 ,  分割的字符串
      const idStr = keys.join(',')
      const { data: { meta } } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      )
      if (meta.status !== 200) return this.$message.error('分配权限失败！')
      this.$message.success('分配权限成功')
      //  重新获取角色列表
      this.getRoles()
      // 隐藏分配权限对话框
      this.rightDialogVisible = false
    }
    // async addRoles() {
    //   this.
    // }
  }
}
</script>
<style lang='less' scoped>
.roles {
  .el-tag {
  margin: 7px;
  }
  .bdbottom {
  border-bottom: 1px solid #eee;
  }
  .bdtop {
  border-top: 1px solid #eee;
  }
  .vcenter {
  display: flex;
  align-items: center;
  }
}

</style>

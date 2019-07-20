<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <!-- 头部左侧 -->
      <div>
        <img src="./heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <!-- 头部右侧退出 -->
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="width">
        <!-- 侧边栏菜单区域 -->
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="iscollapse" :collapse-transition="false" router :default-active="activePath">
          <el-submenu :index="menu.id + ''" v-for="menu in menus" :key="menu.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 字体图标 -->
              <i :class="iconsObj[menu.id]"></i>
              <!-- 文本 -->
              <span>{{menu.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subMenu.path" v-for="subMenu in menu.children" :key="subMenu.id" @click="saveNavState('/'+subMenu.path)">
              <!-- 字体图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>{{subMenu.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>
<script>
export default {
  data: () => ({
    menus: [],
    iconsObj: {
      '125': 'iconfont icon-user',
      '103': 'iconfont icon-tijikongjian',
      '101': 'iconfont icon-shangpin',
      '102': 'iconfont icon-danju',
      '145': 'iconfont icon-baobiao'
    },
    iscollapse: false,
    activePath: ''
  }),
  created() {
    this.getMenus()
    this.activePath = sessionStorage.getItem('activePath')
  },
  methods: { // 方法
    logout () {
      // 清空本地存储中的数据并且跳转到login 页面
      sessionStorage.clear() // clear：清空
      this.$router.push('/login')
    },
    // 获取所有菜单
    async getMenus() {
      const { data: { data, meta } } = await this.$http.get('menus')
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.menus = data
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.iscollapse = !this.iscollapse
    },
    // 保持链接的激活状态
    saveNavState(activePath) {
      this.activePath = activePath
      sessionStorage.setItem('activePath', activePath)
    }
  },
  computed: { // 计算属性
    width() {
      return this.iscollapse ? '64px' : '200px'
    }
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items:center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none
  }
  .iconfont {
    margin-right: 10px;
  }
}

.el-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>

<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="header-img">
          <img src="../assets/cat.png" alt="" />
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409fff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            default-active="/active"
          >
            <!-- 一级菜单 -->
            <el-submenu
              :index="item.id.toString()"
              v-for="item in menulist"
              :key="item.id"
            >
              <!-- 一级菜单模板 -->
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item
                :index="subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
              >
                <template>
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.axios.get('/menus')
      if (res.meta.status != 200) {
        this.$message.error(res.meta.msg)
      } else {
        this.menulist = res.data
      }
    },
    handleOpen() {},
    handleClose() {},
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  },
  created() {
    this.getMenuList()
  }
}
</script>

<style lang="scss">
.home {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-header {
    background-color: #373d41;
    color: #fff;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-button {
      height: 40px;
    }
    .header-img {
      display: flex;
      align-items: center;
      font-size: 20px;
      img {
        width: 50px;
        height: 50px;
        margin-right: 15px;
      }
    }
  }

  .el-aside {
    width: 200px;
    background-color: #333744;
    color: #fff;
    .toggle-button {
      background-color: #4a5064;
      text-align: center;
      font-size: 10px;
      line-height: 24px;
      letter-spacing: 0.2em;
      cursor: pointer;
    }
    .el-menu {
      border-right: 0;
    }
    .iconfont {
      margin-right: 10px;
    }
  }

  .el-main {
    background-color: #eaedf1;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
}
</style>

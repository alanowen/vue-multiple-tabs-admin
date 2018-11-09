<template>
    <Layout class="layout">
        <Header>
        </Header>
        <Layout>
            <Sider class="sidebar-menu-con" collapsible :collapsed-width="65" hide-trigger>
                <Menu :active-name="currentMenu" v-for="item in sysMenuList" width="240" @on-select="selectMenu" :key="item.menuName">
                    <Submenu :name="item.menuName">
                        <template slot="title">
                          <Icon type="ios-analytics" />
                          {{ item.menuLabel }}
                        </template>
                        <MenuItem :name="child.menuName" v-for="child in item.children" :key="child.menuName">{{ child.menuLabel }}</MenuItem>
                    </Submenu>
                </Menu>
            </Sider>  
            <Layout>
                <Header class="main-header-con">
                </Header>
                <Layout class="main-content">
                    <Content class="main-content-wrapper" :style="{padding: '5px', minHeight: '280px', background: '#fff'}">
                        <!-- 在tab-panel中嵌入命名路由视图, 通过v-if来挂载/卸载 -->
                        <Tabs ref="tab" :capture-focus="false" type="card" size="small" closable @on-tab-remove="removeTab" @on-click="clickTab" :animated="false" :value="currentMenu">
                            <TabPane :label="tab.label" v-for="tab in tabs" :name="tab.name" v-if="tab.mount" :key="tab.name" :icon="tab.icon">
                              <keep-alive>
                                <router-view :name="tab.name"></router-view>
                              </keep-alive>
                            </TabPane>
                            <Button @click="removeTab" size="small" slot="extra">关闭</Button>
                        </Tabs>
                    </Content>

                </Layout>
                <Footer class="layout-footer-center"></Footer>
            </Layout>
        </Layout>
    </Layout>
</template>


<script>
import util from "../libs/util"
import common from "../libs/common"

import axios from "axios";
import { mapState, mapGetters } from "vuex"
import router from "../router"
import store from "../store"

export default {
  data() {
    return {
    }
  },

  created() {},

  mounted() {},

  watch: {

  },

  computed: {
    ...mapState({
      currentUser: state => state.auth.currentUser,
      sysMenuList: state => state.sysManage.sysMenuList,
      tabs: state => state.common.tabs,
      currentMenu: state => state.common.currentMenu
    })
  },

  methods: {
    selectMenu(name) {
      this.$store.dispatch("common/openTab", name)
    },

    clickTab(name) {
      this.$store.dispatch("common/openTab", name)
    },

    removeTab(name) {
      this.$store.dispatch("common/closeTab", name)
    }
  }
}
</script>


<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;

  .layout {
    height: 100%;
    width: 100%;
    position: absolute;

    .sidebar-menu-con {
      overflow: auto;
      position: "fixed";
      height: "100vh";
      //width: "280";
    }

    .main-header-con {
      background: #fff;
      padding: 0;
      height: 50px;
      line-height: 50px;

      .user-tool-con {
        float: right;
        margin-right: 10px;
      }
    }

    .main-content {
      padding: 10px;
      z-index: 0;
      overflow: hidden;
      height: 100%;

      .main-content-wrapper {
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        background: #fff;
        height: 800px;
        overflow: hidden;
      }
    }
  }
}
</style>
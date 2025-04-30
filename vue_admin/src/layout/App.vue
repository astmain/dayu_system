<template>
    <el-container v-if="!show_login" style="min-height: 100vh;">
        <!-- 头部 -->
        <el-header class="header"
            style="background-color: #24292E; color: #fff;  display: flex;align-items: center;justify-content: space-between;">
            <div>admin</div>
            <div @click="Logout">Logout</div>
        </el-header>
        <el-container>
            <!-- 菜单    -->
            <el-aside width="200px">
                <el-menu :default-active="$route.path" background-color="#24292E" active-text-color="#ffd04b"
                    text-color="#fff" class="menu_height" router>
                    <!-- <el-menu-item index="/home">
              <span>Home</span>
            </el-menu-item>
            <el-menu-item index="/about">
              <span>About</span>
            </el-menu-item> -->
                    <template v-for="ele in $router.options.routes.find(o => o.name === 'main').children">
                        <el-menu-item class="没有子菜单" v-if="!ele.children" :index="ele.path">
                            <span>{{ ele.name }}</span>
                        </el-menu-item>
                        <el-sub-menu class="拥有子菜单" v-else :index="ele.path">
                            <template #title>
                                <span>{{ ele.name }}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item v-for="item in ele.children" :index="item.path">
                                    <span>{{ item.name }}</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                    </template>
                </el-menu>
            </el-aside>
            <!-- 内容 -->
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>


    <!-- 2222 -->
    <el-container v-else style="min-height: 100vh;">
        <router-view />
    </el-container>

</template>

<script>


export default {
    computed: {
        show_login() {
            if (this.$route.path === '/login') return true
            if (!localStorage.getItem('token')) return true
        }

    },
    data() {
        return {
            name: "数据1",
        }


    },

    methods: {
        async Logout() {
            localStorage.removeItem('token')
            this.$router.push('/login')
        },//

    },////

    async mounted() {
        //   测试路由守卫
        //   localStorage.getItem('token')
        //   localStorage.removeItem('token')
    },////

}
</script>

<style>
.menu_height {
    height: calc(100vh - 60px);
    border-right: none;
}

.el-aside {
    /* background: #ffffff; */
    /* border-right: solid 1px #e6e6e6; */
}

.el-main {
    padding: 20px;
}

html {
    height: 100vh;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: hidden;
}

body {
    height: 100vh;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: hidden;
}


h1,
h2,
h3,
h4,
h5 {
    padding: 0;
    margin: 0;
}
</style>
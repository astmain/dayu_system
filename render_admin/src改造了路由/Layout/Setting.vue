<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <!--    <el-button @click="测试remote()">测试remote</el-button>-->
    <el-button @click="清除临时文件()">清除临时文件</el-button>
    <el-button @click="打开浏览器缓存文件夹()">打开浏览器缓存文件夹</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "数据1",
    }
  },

  methods: {
    async 测试remote() {
      const {BrowserWindow, app, ipcRenderer, ipcMain} = require('@electron/remote')
      console.log("BrowserWindow", BrowserWindow);
      console.log("app", app)
      console.log(" app.tb_account", app.tb_account)
      console.log("ipcRenderer", ipcRenderer)
      console.log("ipcMain", ipcMain)
    },//


    async 打开浏览器缓存文件夹() {
      let path_preject = electron.app.getPath("userData")
      let folderPath = electron.app.__path.join(path_preject, "Partitions")
      let command = `start "" "${folderPath}"`;
      electron.app.exec(command)
      await new Promise((resolve) => setTimeout(resolve, 3000))
    },//


    async 清除临时文件() {
      await this.打开浏览器缓存文件夹()
      // 包环境
      const path_preject = electron.app.getPath("userData")
      const fs_extra = electron.app.fs_extra
      const fs = electron.app.fs
      const __path = electron.app.__path


      let list = await tb_account.find_all()
      console.log(`查询---list:`, list)
      let file_partition_used = list.map(o => o.partition.replace("persist:", ""))
      console.log(`查询---正在使用中---file_partition_used:`, file_partition_used)

      function func_exist_used(file_partition_used, path_file) {
        for (let i = 0; i < file_partition_used.length; i++) {
          let name = file_partition_used[i]
          if (path_file.includes(name)) return true
        }
        return false
      }


      // 删除逻辑
      let path_Partitions = __path.join(path_preject, "Partitions")
      let files = fs.readdirSync(path_Partitions);
      let path_files = files.map(file => __path.join(path_Partitions, file))
      for (let i = 0; i < path_files.length; i++) {
        let path_file = path_files[i]
        let type_file = fs.statSync(path_file)
        console.log(`准备:删除---`, path_file)


        if (!func_exist_used(file_partition_used, path_file) && type_file.isDirectory()) {
          try {
            fs_extra.removeSync(path_file)
            console.log(`成功:删除---${path_file}`)
          } catch (err) {
            console.log(`失败:删除---${path_file}`)
          }
        }
      }


    },//

  },////

  async mounted() {

  },////

}
</script>

<style scoped></style>

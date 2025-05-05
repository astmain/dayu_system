<template>

  <h3 style="padding: 0; margin: 0">路由:{{ this.$route.name }}</h3>
  <el-button @click="met1()">met1</el-button>

  <el-tree :data="tree.tree_data" node-key="id" @node-contextmenu="tree_node_ritht_click"
    @node-click="tree_node_left_click" ref="tree" highlight-current default-expand-all> </el-tree>

  <el-card v-show="tree.menu_show"
    :style="{ position: 'fixed', left: tree.menu_left + 'px', top: tree.menu_top + 'px' }"
    :body-style="{ padding: '10px' }">
    <div v-for="(item, i)  in tree.menu_opt">
      <span @click="menu_opt_click(item)">{{ item.title }}</span>
    </div>
  </el-card>

</template>

<script>
export default {
  data() {
    return {
      tree: {
        menu_show: false,
        menu_left: 0,
        menu_top: 0,
        menu_opt: [
          { title: "编辑", kind: "edit" },
          { title: "新增", kind: "add" },
          { title: "删除", kind: "delete" },
        ],
        curr_data: {},
        curr_node: {},
        tree_data: [
          {
            id: 1,
            label: '一级 1',
            isEdit: false,
            type: 'catalog',
            children: [
              {
                id: 4,
                label: '二级 1-1',
                isEdit: false,
                type: 'menu',
                children: [],
              },
            ],
          },
          {
            id: 2,
            label: '一级 2',
            isEdit: false,
            type: 'catalog',
            children: [
              {
                id: 5,
                label: '二级 2-1',
                isEdit: false,
                type: 'menu',
              },
              {
                id: 6,
                label: '二级 2-2',
                isEdit: false,
                type: 'menu',
              },
            ],
          },

        ],
      }
    }
  },

  methods: {
    tree_node_ritht_click(event, data, Node, element) {
      console.log('event', event)
      console.log('data', data)
      this.tree.curr_data = data
      this.tree.menu_show = true
      this.tree.menu_left = event.x
      this.tree.menu_top = event.y
    },

    tree_node_left_click() {
      this.tree.menu_show = false
    },

    menu_opt_click(item) {
      console.log('menu_opt_click---tree.curr_data:', JSON.parse(JSON.stringify(this.tree.curr_data)))

      if (item.kind === "edit") {
        console.log('edit---:', item)
      }

      if (item.kind === "add") {
        console.log('add---:', item)
      }
      if (item.kind === "delete") {
        console.log('delete---:', item)
      }


    }

  }, ////

  async mounted() {
    document.body.addEventListener("click", () => {
      this.tree.menu_show = false
    })

  }, ////
}
</script>

<style scoped>
.contextmenu {
  position: fixed;
}
</style>

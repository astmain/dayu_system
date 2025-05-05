<template>
  <div class="tree-container">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" class="search">
      </el-input>
      <el-tree :data="treeData" node-key="id" default-expand-all @node-click="handleLeftclick"
          @node-drag-start="handleDragStart" @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver" @node-drag-end="handleDragEnd" @node-drop="handleDrop"
          @node-contextmenu="rightClick" :filter-node-method="filterNode" draggable :allow-drop="allowDrop"
          :allow-drag="allowDrag" ref="tree" class="tree-line">
          <span class="slot-t-node" :slot-scope="{ node, data }" @dblclick="editNode(data)">
              <span v-show="!data.isEdit">
                  <span :class="[data.id >= 99 ? 'slot-t-node--label' : '']">
                      <i v-if="data.type == 'catalog'" class="el-icon-folder" />
                      <i v-if="data.type == 'menu'" class="el-icon-tickets" />
                      <i v-if="data.type == 'submenu'" class="el-icon-document" />
                      <span> {{ node.label }}</span>
                  </span>
              </span>
              <span v-show="data.isEdit">
                  <el-input class="slot-t-input" size="mini" autofocus v-model="data.label" :ref="'slotTreeInput' + data.id"
                      @blur.stop="NodeBlur(node, data)" @keydown.native.enter="NodeBlur(node, data)"></el-input>
              </span>
          </span>
      </el-tree>
      <div class="box-menu" v-show="menuVisible" :style="{ left: menu_left + 'px', top: menu_top + 'px' }">
          <div @click="addSameLevelNode(0)" v-show="firstLevel">
              <i class="el-icon-circle-plus-outline"></i>&nbsp;&nbsp;同级增加
          </div>
          <div class="add" @click="addChildNode()">
              <i class="el-icon-circle-plus-outline"></i>&nbsp;&nbsp;子级增加
          </div>
          <div class="delete" @click="deleteNode()">
              <i class="el-icon-remove-outline"></i>&nbsp;&nbsp;删除节点
          </div>
          <div class="edit" @click="editNode()">
              <i class="el-icon-edit"></i>&nbsp;&nbsp;修改节点
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'tree',
  data() {
      return {
          eleId: '',
          isShow: false,
          currentData: '',
          currentNode: '',
          menuVisible: false,
          firstLevel: false,
          filterText: '',
          maxexpandId: 4,
          menu_left: 0,
          menu_top: 0,
          treeData: [{
              id: 1,
              label: '一级 1',
              isEdit: false,
              type: 'catalog',
              children: [{
                  id: 4,
                  label: '二级 1-1',
                  isEdit: false,
                  type: 'menu',
                  children: [{
                      id: 9,
                      label: '三级 1-1-1',
                      isEdit: false,
                      type: 'submenu',
                  }, {
                      id: 10,
                      label: '三级 1-1-2',
                      isEdit: false,
                      type: 'submenu',
                  }]
              }]
          }, {
              id: 2,
              label: '一级 2',
              isEdit: false,
              type: 'catalog',
              children: [{
                  id: 5,
                  label: '二级 2-1',
                  isEdit: false,
                  type: 'menu',
              }, {
                  id: 6,
                  label: '二级 2-2',
                  isEdit: false,
                  type: 'menu',
              }]
          }, {
              id: 3,
              label: '一级 3',
              isEdit: false,
              type: 'catalog',
              children: [{
                  id: 7,
                  label: '二级 3-1',
                  isEdit: false,
                  type: 'menu',
              }, {
                  id: 8,
                  label: '二级 3-2',
                  isEdit: false,
                  type: 'menu',
                  children: [{
                      id: 11,
                      label: '三级 3-2-1',
                      isEdit: false,
                      type: 'submenu',
                  }, {
                      id: 12,
                      label: '三级 3-2-2',
                      isEdit: false,
                      type: 'submenu',
                  }, {
                      id: 13,
                      label: '三级 3-2-3',
                      isEdit: false,
                      type: 'submenu',
                  }]
              }]
          }],
          defaultProps: {
              children: 'children',
              label: 'label'
          }
      }
  },
  methods: {
      NodeBlur(Node, data) {
          console.log(Node, data)
          if (data.label.length === 0) {
              this.$message.error('菜单名不可为空！')
              return false
          } else {
              if (data.isEdit) {
                  this.$set(data, 'isEdit', false)
                  console.log(data.isEdit)
              }
              this.$nextTick(() => {
                  this.$refs['slotTreeInput' + data.id].$refs.input.focus()
              })
          }
      },
      // 查询
      filterNode(value, data) {
          if (!value) return true
          return data.label.indexOf(value) !== -1
      },

      allowDrop(draggingNode, dropNode, type) {
          if (dropNode.data.label === '二级 3-1') {
              return type !== 'inner'
          } else {
              return true
          }
      },
      allowDrag(draggingNode) {
          return draggingNode.data.label.indexOf('三级 3-2-2') === -1
      },
      // 鼠标右击事件
      rightClick(event, object, Node, element) {
          console.log(event, object)
          this.currentData = object
          this.currentNode = Node
          if (Node.level === 1) {
              this.firstLevel = true
          } else {
              this.firstLevel = false
          }
          this.menuVisible = true
          document.addEventListener('click', this.foo)
         // 将菜单显示在鼠标点击旁边定位
          this.menu_left = event.clientX -140;
          this.menu_top = event.clientY - 40; 
      },
      // 鼠标左击事件
      handleLeftclick(data, node) {
          this.foo()
      },
      //  取消鼠标监听事件 菜单栏
      foo() {
          this.menuVisible = false
          //  要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
          document.removeEventListener('click', this.foo)
      },
      // 增加同级节点事件
      addSameLevelNode() {
          let id = Math.ceil(Math.random() * 100)
          var data = { id: id, label: '新增节点' }
          this.$refs.tree.append(data, this.currentNode.parent)
      },
      // 增加子级节点事件
      addChildNode() {
          console.log(this.currentData)
          console.log(this.currentNode)
          if (this.currentNode.level >= 3) {
              this.$message.error('最多只支持三级！')
              return false
          }
          let id = Math.ceil(Math.random() * 100)
          var data = { id: id, label: '新增节点' }
          this.$refs.tree.append(data, this.currentNode)
      },
      // 删除节点
      deleteNode() {
          this.$refs.tree.remove(this.currentNode)
      },
      // 编辑节点
      editNode(data) {
          console.log(data)
          this.currentData = data ? data : this.currentData
          if (!this.currentData.isEdit) {
              this.$set(this.currentData, 'isEdit', true)
          }
          // 获取焦点
          this.$nextTick(() => {
              this.$refs['slotTreeInput' + this.currentData.id].focus()
          })
      },
      handleDragStart(node, ev) {
          console.log('drag start', node)
      },
      handleDragEnter(draggingNode, dropNode, ev) {
          console.log('tree drag enter: ', dropNode.label)
      },
      handleDragLeave(draggingNode, dropNode, ev) {
          console.log('tree drag leave: ', dropNode.label)
      },
      handleDragOver(draggingNode, dropNode, ev) {
          console.log('tree drag over: ', dropNode.label)
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
          console.log('tree drag end: ', dropNode && dropNode.label, dropType)
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
          console.log('tree drop: ', dropNode.label, dropType)
      },
  },
  watch: {
      filterText(val) {
          this.$refs.tree.filter(val)
      }
  },
  mounted() {
  }
}
</script>
<style scoped>
</style>
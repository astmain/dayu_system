<template>
  <div>
    <el-cascader
      v-model="value"
      :options="options"
      :props="{ multiple: true, checkStrictly: true }"
      clearable
      collapse-tags
      @change="changeLabel"
    ></el-cascader>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      shareScopeEnd: [],
      options: [
      { value: '111', label: '111', children: [{ value: '111-1', label: '111-1', }, { value: '111-2', label: '111-2', },] },
      { value: '222', label: '222', children: [{ value: '222-1', label: '222-1', }, { value: '222-2', label: '222-2', },] }
          
    
      ]
    }
  },
  methods: {
    changeLabel(val) {
      // 是否与上次的类型相同
      let changeFlag = false
      let changeItem = null
      if (this.shareScopeEnd.length == 0) {
        this.value = val
      } else {
        // 与原数组比对
        this.value.forEach((item) => {
          if (item[0] !== this.shareScopeEnd[0][0]) { // 一级标签不同
            changeFlag = true
            changeItem = item
          } else if (item[1] != this.shareScopeEnd[0][1]) { // 一级标签相同但是二级标签不同
            changeFlag = true
            changeItem = item
          } else if ((!item[2] && this.shareScopeEnd[0][2]) || (item[2] && !this.shareScopeEnd[0][2])) {
            changeFlag = true
            changeItem = item
          }
        })
      }
      if (changeFlag) {
        this.value = []
        this.value.push(changeItem)
      }
      this.shareScopeEnd = this.value
    }
  }
}
</script>



<template>
  <div>
     <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
     <el-cascader
            v-model="selectedOptions"
            :options="options"
            @change="handleChange"
            multiple
        ></el-cascader>
        <p>当前选中项: {{ selectedOptions }}</p>
  
  </div>
  </template>
  
  <script>
  
  
  export default {
    data() {
      return {
        name: "数据1",
        selectedOptions: ['zhinan', 'shejiyuanze'],
        options: [
                        {
                            value: 'zhinan',
                            label: '指南',
                            children: [
                                {
                                    value: 'shejiyuanze',
                                    label: '设计原则',
                                    children: [
                                        {
                                            value: 'yizhi',
                                            label: '一致'
                                        },
                                        {
                                            value: 'fankui',
                                            label: '反馈'
                                        }
                                    ]
                                },
                                {
                                    value: 'daohang',
                                    label: '导航',
                                    children: [
                                        {
                                            value: 'cexiangdaohang',
                                            label: '侧向导航'
                                        },
                                        {
                                            value: 'dingbudaohang',
                                            label: '顶部导航'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                
                 
      }
  
    },
  
    methods: {
      async met1() {
        console.log('met1      :', 111)
  
  
      },//
      handleChange(value) {
                    if (value.length > 2) {
                        this.selectedOptions = value.slice(0, 2);
                    }
                }
  
    },////
  
    async mounted() {
  
    },////
  
  }
  </script>
  
  <style  scoped></style>
  
  
  
  
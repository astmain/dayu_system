<template>
  <el-tree-select v-model="selected" :data="treeData" node-key="id" show-checkbox check-strictly
    :props="{ label: 'label', children: 'children' }" 
    :render-after-expand="false"
    render-label="renderLabel"
    
    
    />

    <!-- 
     
         :render-label="renderLabel"
     -->
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref(221);
const treeData = [
  {
    id: 1,
    label: '一级',
    children: [
      { id: 2, label: '二级1' },
      { id: 3, label: '二级2' },
    ],
  },
  {
    id: 22,
    label: '2父',
    children: [
      { id: 221, label: '2级1' },
      { id: 222, label: '2级2' },
    ],
  },
];

const renderLabel = (node: any) => {
  if (node.parent) {
    return `${node.parent.label}/${node.label}`;
  }
  return node.label;
};
</script>

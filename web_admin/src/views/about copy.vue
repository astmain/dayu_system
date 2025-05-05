<template>
  <div>
    <el-tree :data="treeData" :props="defaultProps" @node-contextmenu="handleContextMenu"></el-tree>
    <el-popover v-model:visible="contextMenuVisible" placement="right" :popper-options="{
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 0],
          },
        },
      ],
    }" trigger="manual">
      <template #content>
        <el-menu>
          <el-menu-item index="1">操作 1</el-menu-item>
          <el-menu-item index="2">操作 2</el-menu-item>
        </el-menu>
      </template>
      <template #reference>
        <div ref="contextMenuRef"></div>
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const treeData = [
  { label: '一级 1', children: [{ label: '二级 1-1', children: [{ label: '三级 1-1-1', },], },], },
  { label: '一级 2', children: [{ label: '二级 2-1', }, { label: '二级 2-2', },], },
];

const defaultProps = {
  children: 'children',
  label: 'label',
};

const contextMenuVisible = ref(false);
const contextMenuRef = ref(null);

const handleContextMenu = (event, node, component) => {
  event.preventDefault();
  contextMenuVisible.value = true;


  console.log('event---:', event)
  // contextMenuRef.value.style.left = `${event.clientX}px`;
  // contextMenuRef.value.style.top = `${event.clientY}px`;


  contextMenuRef.value.style.left = `${event.x+500}px`;
  contextMenuRef.value.style.top = `${event.y}px`;
};
</script>
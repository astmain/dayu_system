<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>部门职位树形结构</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/element-ui@2.15.13/lib/index.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/element-ui@2.15.13/lib/theme-chalk/index.css" rel="stylesheet">
  
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#409EFF',
            success: '#67C23A',
            warning: '#E6A23C',
            danger: '#F56C6C',
            info: '#909399',
          },
          fontFamily: {
            inter: ['Inter', 'system-ui', 'sans-serif'],
          },
        },
      }
    }
  </script>
  
  <style type="text/tailwindcss">
    @layer utilities {
      .content-auto {
        content-visibility: auto;
      }
      .tree-container {
        @apply h-[calc(100vh-120px)] overflow-auto bg-white rounded-lg shadow-sm border border-gray-200;
      }
      .detail-container {
        @apply h-[calc(100vh-120px)] overflow-auto bg-white rounded-lg shadow-sm border border-gray-200;
      }
      .el-tree-node__content:hover {
        @apply bg-gray-100;
      }
      .el-tree-node:focus > .el-tree-node__content {
        @apply bg-primary/10;
      }
      .department-card {
        @apply mb-4 p-4 rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md;
      }
      .position-item {
        @apply flex items-center justify-between p-3 mb-2 rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md;
      }
    }
  </style>
</head>
<body class="bg-gray-50 font-inter">
  <div id="app" class="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-gray-800 flex items-center">
        <i class="fa fa-sitemap text-primary mr-3"></i>
        部门职位管理系统
        <span class="ml-3 text-sm font-normal text-gray-500">树形结构展示</span>
      </h1>
    </div>
    
    <!-- 主要内容区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 左侧树结构 -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-700 flex items-center">
              <i class="fa fa-list-ul text-primary mr-2"></i>部门结构
            </h2>
            <div class="flex space-x-2">
              <el-button size="mini" type="primary" icon="el-icon-refresh" @click="refreshTree">
                刷新
              </el-button>
              <el-button size="mini" type="success" icon="el-icon-plus" @click="addDepartment">
                添加
              </el-button>
            </div>
          </div>
          
          <div class="tree-container">
            <el-tree
              :data="treeData"
              :props="treeProps"
              node-key="id"
              ref="deptTree"
              highlight-current
              @node-click="handleNodeClick"
              @node-expand="handleNodeExpand"
              @node-collapse="handleNodeCollapse">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span :class="{'text-primary font-medium': data.isActive}">
                  <i :class="data.icon || 'fa fa-building-o text-gray-500 mr-2'"></i>
                  {{ node.label }}
                </span>
                <span class="ml-2 text-xs text-gray-500">
                  ({{ data.ref_position ? data.ref_position.length : 0 }}人)
                </span>
              </span>
            </el-tree>
          </div>
        </div>
      </div>
      
      <!-- 右侧详情区域 -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-gray-700 flex items-center">
              <i class="fa fa-info-circle text-primary mr-2"></i>部门详情
            </h2>
            <div class="flex space-x-2">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="editDepartment">
                编辑
              </el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteDepartment">
                删除
              </el-button>
            </div>
          </div>
          
          <div v-if="selectedDept" class="detail-container p-4">
            <div class="department-card">
              <div class="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 class="text-xl font-bold text-gray-800 flex items-center">
                    <i :class="selectedDept.icon || 'fa fa-building-o text-primary mr-2'"></i>
                    {{ selectedDept.depart }}
                  </h3>
                  <p class="text-gray-500 mt-1">部门ID: {{ selectedDept.id }}</p>
                </div>
                <div class="mt-3 md:mt-0 flex space-x-2">
                  <el-tag :type="selectedDept.add ? 'success' : 'info'">
                    <i class="fa fa-plus-circle mr-1"></i>添加权限
                  </el-tag>
                  <el-tag :type="selectedDept.del ? 'success' : 'info'">
                    <i class="fa fa-trash-o mr-1"></i>删除权限
                  </el-tag>
                  <el-tag :type="selectedDept.update ? 'success' : 'info'">
                    <i class="fa fa-pencil mr-1"></i>更新权限
                  </el-tag>
                  <el-tag :type="selectedDept.look ? 'success' : 'info'">
                    <i class="fa fa-eye mr-1"></i>查看权限
                  </el-tag>
                </div>
              </div>
              
              <div class="border-t border-gray-200 pt-4">
                <h4 class="font-semibold text-gray-700 mb-3 flex items-center">
                  <i class="fa fa-users text-primary mr-2"></i>部门职位
                  <span class="ml-2 text-xs font-normal text-gray-500">({{ selectedDept.ref_position.length }}个职位)</span>
                </h4>
                
                <div class="space-y-2">
                  <div class="position-item" v-for="position in selectedDept.ref_position" :key="position.id">
                    <div>
                      <p class="font-medium text-gray-800">
                        <i class="fa fa-user-o text-gray-500 mr-2"></i>
                        {{ position.position }}
                      </p>
                      <p class="text-sm text-gray-500 mt-1">职位ID: {{ position.id }}</p>
                    </div>
                    <div class="flex space-x-2">
                      <el-button size="mini" type="primary" icon="el-icon-edit" @click="editPosition(position)">
                        编辑
                      </el-button>
                      <el-button size="mini" type="danger" icon="el-icon-delete" @click="deletePosition(position)">
                        删除
                      </el-button>
                    </div>
                  </div>
                </div>
                
                <div class="mt-4">
                  <el-button type="success" size="small" icon="el-icon-plus" @click="addPosition">
                    添加职位
                  </el-button>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="h-full flex flex-col items-center justify-center text-gray-500">
            <i class="fa fa-folder-open-o text-5xl mb-4 opacity-30"></i>
            <p>请从左侧选择一个部门查看详情</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 添加/编辑部门对话框 -->
    <el-dialog :visible.sync="deptDialogVisible" title="部门管理">
      <el-form :model="currentDept" label-width="120px">
        <el-form-item label="部门名称" prop="depart">
          <el-input v-model="currentDept.depart"></el-input>
        </el-form-item>
        <el-form-item label="部门图标" prop="icon">
          <el-input v-model="currentDept.icon" placeholder="Font Awesome图标类名，如fa-building-o"></el-input>
        </el-form-item>
        <el-form-item label="添加权限" prop="add">
          <el-switch v-model="currentDept.add"></el-switch>
        </el-form-item>
        <el-form-item label="删除权限" prop="del">
          <el-switch v-model="currentDept.del"></el-switch>
        </el-form-item>
        <el-form-item label="更新权限" prop="update">
          <el-switch v-model="currentDept.update"></el-switch>
        </el-form-item>
        <el-form-item label="查看权限" prop="look">
          <el-switch v-model="currentDept.look"></el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deptDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveDepartment">确定</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 添加/编辑职位对话框 -->
    <el-dialog :visible.sync="positionDialogVisible" title="职位管理">
      <el-form :model="currentPosition" label-width="120px">
        <el-form-item label="所属部门" prop="depart_id">
          <el-input v-model="currentPosition.depart_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="职位名称" prop="position">
          <el-input v-model="currentPosition.position"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="positionDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="savePosition">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <script>
    new Vue({
      el: '#app',
      data() {
        return {
          // 原始数据
          arr: [
            {
                "id": 77778,
                "depart": "人力资源部",
                "add": true,
                "del": true,
                "update": true,
                "look": true,
                "parent_id": 0,
                "ref_position": [
                    {
                        "id": 1,
                        "position": "HR总监",
                        "depart_id": 77778
                    },
                    {
                        "id": 2,
                        "position": "招聘专员",
                        "depart_id": 77778
                    },
                    {
                        "id": 3,
                        "position": "培训专员",
                        "depart_id": 77778
                    },
                    {
                        "id": 4,
                        "position": "薪酬福利专员",
                        "depart_id": 77778
                    }
                ]
            },
            {
                "id": 77779,
                "depart": "信息技术部",
                "add": true,
                "del": true,
                "update": true,
                "look": true,
                "parent_id": 0,
                "ref_position": [
                    {
                        "id": 5,
                        "position": "CTO",
                        "depart_id": 77779
                    },
                    {
                        "id": 6,
                        "position": "前端开发工程师",
                        "depart_id": 77779
                    },
                    {
                        "id": 7,
                        "position": "后端开发工程师",
                        "depart_id": 77779
                    },
                    {
                        "id": 8,
                        "position": "测试工程师",
                        "depart_id": 77779
                    },
                    {
                        "id": 9,
                        "position": "运维工程师",
                        "depart_id": 77779
                    }
                ]
            },
            {
                "id": 77780,
                "depart": "财务部",
                "add": true,
                "del": false,
                "update": true,
                "look": true,
                "parent_id": 0,
                "ref_position": [
                    {
                        "id": 10,
                        "position": "财务总监",
                        "depart_id": 77780
                    },
                    {
                        "id": 11,
                        "position": "会计",
                        "depart_id": 77780
                    },
                    {
                        "id": 12,
                        "position": "出纳",
                        "depart_id": 77780
                    }
                ]
            }
          ],
          
          // 树形结构数据
          treeData: [],
          
          // 树配置
          treeProps: {
            label: 'depart',
            children: 'children'
          },
          
          // 当前选中的部门
          selectedDept: null,
          
          // 部门对话框相关
          deptDialogVisible: false,
          currentDept: {},
          isAddDept: false,
          
          // 职位对话框相关
          positionDialogVisible: false,
          currentPosition: {},
          isAddPosition: false
        }
      },
      created() {
        // 初始化树形数据
        this.initTreeData();
      },
      methods: {
        // 初始化树形数据
        initTreeData() {
          // 为每个部门添加图标属性（如果没有的话）
          this.arr.forEach(dept => {
            if (!dept.icon) {
              dept.icon = 'fa-building-o';
            }
            dept.isActive = false;
          });
          
          // 复制数据并设置为树形结构
          this.treeData = JSON.parse(JSON.stringify(this.arr));
          
          // 模拟有子部门的数据结构
          // 这里仅作为示例，实际应用中可能需要从后端获取完整的树形结构
          this.treeData.forEach(dept => {
            if (dept.id === 77779) { // 假设信息技术部有子部门
              dept.children = [
                {
                  id: 77781,
                  depart: '前端开发组',
                  add: true,
                  del: true,
                  update: true,
                  look: true,
                  parent_id: dept.id,
                  icon: 'fa-code',
                  ref_position: [
                    { id: 13, position: '高级前端开发工程师', depart_id: 77781 },
                    { id: 14, position: '中级前端开发工程师', depart_id: 77781 },
                    { id: 15, position: '初级前端开发工程师', depart_id: 77781 }
                  ]
                },
                {
                  id: 77782,
                  depart: '后端开发组',
                  add: true,
                  del: true,
                  update: true,
                  look: true,
                  parent_id: dept.id,
                  icon: 'fa-server',
                  ref_position: [
                    { id: 16, position: '高级后端开发工程师', depart_id: 77782 },
                    { id: 17, position: '中级后端开发工程师', depart_id: 77782 },
                    { id: 18, position: '初级后端开发工程师', depart_id: 77782 }
                  ]
                }
              ];
            }
          });
        },
        
        // 处理节点点击
        handleNodeClick(data) {
          // 重置所有节点的激活状态
          this.resetActiveStatus();
          
          // 设置当前节点为激活状态
          this.setNodeActive(data);
          
          // 复制选中的部门数据
          this.selectedDept = JSON.parse(JSON.stringify(data));
        },
        
        // 重置所有节点的激活状态
        resetActiveStatus() {
          const resetNodes = (nodes) => {
            nodes.forEach(node => {
              node.isActive = false;
              if (node.children && node.children.length > 0) {
                resetNodes(node.children);
              }
            });
          };
          
          resetNodes(this.treeData);
        },
        
        // 设置节点为激活状态（递归设置父节点）
        setNodeActive(node) {
          node.isActive = true;
          
          // 查找父节点并设置为激活状态
          const findParent = (nodes, parentId) => {
            for (let i = 0; i < nodes.length; i++) {
              if (nodes[i].id === parentId) {
                nodes[i].isActive = true;
                return true;
              }
              
              if (nodes[i].children && nodes[i].children.length > 0) {
                if (findParent(nodes[i].children, parentId)) {
                  return true;
                }
              }
            }
            return false;
          };
          
          if (node.parent_id !== 0) {
            findParent(this.treeData, node.parent_id);
          }
        },
        
        // 处理节点展开
        handleNodeExpand(node) {
          // 添加展开动画效果
          const treeNodeEl = document.querySelector(`.el-tree-node[data-node-key="${node.id}"]`);
          if (treeNodeEl) {
            treeNodeEl.classList.add('animate__animated', 'animate__fadeIn');
            setTimeout(() => {
              treeNodeEl.classList.remove('animate__animated', 'animate__fadeIn');
            }, 500);
          }
        },
        
        // 处理节点折叠
        handleNodeCollapse(node) {
          // 可以添加折叠动画效果
        },
        
        // 刷新树
        refreshTree() {
          this.initTreeData();
          
          // 添加刷新动画
          const treeContainer = document.querySelector('.tree-container');
          treeContainer.classList.add('animate__animated', 'animate__fadeOut');
          setTimeout(() => {
            treeContainer.classList.remove('animate__animated', 'animate__fadeOut');
            treeContainer.classList.add('animate__animated', 'animate__fadeIn');
            setTimeout(() => {
              treeContainer.classList.remove('animate__animated', 'animate__fadeIn');
            }, 300);
          }, 200);
          
          // 提示刷新成功
          this.$message({
            message: '树结构已刷新',
            type: 'success'
          });
        },
        
        // 添加部门
        addDepartment() {
          this.isAddDept = true;
          this.currentDept = {
            id: Date.now(), // 临时ID，实际应该由后端生成
            depart: '',
            add: true,
            del: true,
            update: true,
            look: true,
            parent_id: 0,
            icon: 'fa-building-o',
            ref_position: []
          };
          this.deptDialogVisible = true;
        },
        
        // 编辑部门
        editDepartment() {
          if (!this.selectedDept) {
            this.$message.warning('请先选择一个部门');
            return;
          }
          
          this.isAddDept = false;
          this.currentDept = JSON.parse(JSON.stringify(this.selectedDept));
          this.deptDialogVisible = true;
        },
        
        // 保存部门
        saveDepartment() {
          if (!this.currentDept.depart) {
            this.$message.warning('部门名称不能为空');
            return;
          }
          
          if (this.isAddDept) {
            // 添加新部门
            this.arr.push(this.currentDept);
            this.initTreeData();
            
            this.$message({
              message: '部门添加成功',
              type: 'success'
            });
          } else {
            // 更新现有部门
            const index = this.arr.findIndex(dept => dept.id === this.currentDept.id);
            if (index !== -1) {
              this.arr[index] = this.currentDept;
              this.initTreeData();
              
              // 如果当前选中的是正在编辑的部门，更新选中的部门
              if (this.selectedDept && this.selectedDept.id === this.currentDept.id) {
                this.selectedDept = JSON.parse(JSON.stringify(this.currentDept));
              }
              
              this.$message({
                message: '部门更新成功',
                type: 'success'
              });
            }
          }
          
          this.deptDialogVisible = false;
        },
        
        // 删除部门
        deleteDepartment() {
          if (!this.selectedDept) {
            this.$message.warning('请先选择一个部门');
            return;
          }
          
          this.$confirm('确定要删除这个部门吗？删除后将无法恢复。', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 从数组中删除部门
            const index = this.arr.findIndex(dept => dept.id === this.selectedDept.id);
            if (index !== -1) {
              this.arr.splice(index, 1);
              this.initTreeData();
              this.selectedDept = null;
              
              this.$message({
                message: '部门删除成功',
                type: 'success'
              });
            }
          }).catch(() => {
            // 用户取消操作
          });
        },
        
        // 添加职位
        addPosition() {
          if (!this.selectedDept) {
            this.$message.warning('请先选择一个部门');
            return;
          }
          
          this.isAddPosition = true;
          this.currentPosition = {
            id: Date.now(), // 临时ID，实际应该由后端生成
            position: '',
            depart_id: this.selectedDept.id
          };
          this.positionDialogVisible = true;
        },
        
        // 编辑职位
        editPosition(position) {
          this.isAddPosition = false;
          this.currentPosition = JSON.parse(JSON.stringify(position));
          this.positionDialogVisible = true;
        },
        
        // 保存职位
        savePosition() {
          if (!this.currentPosition.position) {
            this.$message.warning('职位名称不能为空');
            return;
          }
          
          if (this.isAddPosition) {
            // 添加新职位
            const deptIndex = this.arr.findIndex(dept => dept.id === this.currentPosition.depart_id);
            if (deptIndex !== -1) {
              this.arr[deptIndex].ref_position.push(this.currentPosition);
              this.initTreeData();
              
              // 更新选中的部门
              if (this.selectedDept && this.selectedDept.id === this.currentPosition.depart_id) {
                this.selectedDept.ref_position.push(this.currentPosition);
              }
              
              this.$message({
                message: '职位添加成功',
                type: 'success'
              });
            }
          } else {
            // 更新现有职位
            const deptIndex = this.arr.findIndex(dept => dept.id === this.currentPosition.depart_id);
            if (deptIndex !== -1) {
              const positionIndex = this.arr[deptIndex].ref_position.findIndex(pos => pos.id === this.currentPosition.id);
              if (positionIndex !== -1) {
                this.arr[deptIndex].ref_position[positionIndex] = this.currentPosition;
                this.initTreeData();
                
                // 更新选中的部门
                if (this.selectedDept && this.selectedDept.id === this.currentPosition.depart_id) {
                  const selectedPosIndex = this.selectedDept.ref_position.findIndex(pos => pos.id === this.currentPosition.id);
                  if (selectedPosIndex !== -1) {
                    this.selectedDept.ref_position[selectedPosIndex] = this.currentPosition;
                  }
                }
                
                this.$message({
                  message: '职位更新成功',
                  type: 'success'
                });
              }
            }
          }
          
          this.positionDialogVisible = false;
        },
        
        // 删除职位
        deletePosition(position) {
          this.$confirm('确定要删除这个职位吗？删除后将无法恢复。', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const deptIndex = this.arr.findIndex(dept => dept.id === position.depart_id);
            if (deptIndex !== -1) {
              const positionIndex = this.arr[deptIndex].ref_position.findIndex(pos => pos.id === position.id);
              if (positionIndex !== -1) {
                this.arr[deptIndex].ref_position.splice(positionIndex, 1);
                this.initTreeData();
                
                // 更新选中的部门
                if (this.selectedDept && this.selectedDept.id === position.depart_id) {
                  const selectedPosIndex = this.selectedDept.ref_position.findIndex(pos => pos.id === position.id);
                  if (selectedPosIndex !== -1) {
                    this.selectedDept.ref_position.splice(selectedPosIndex, 1);
                  }
                }
                
                this.$message({
                  message: '职位删除成功',
                  type: 'success'
                });
              }
            }
          }).catch(() => {
            // 用户取消操作
          });
        }
      }
    });
  </script>
</body>
</html>
    
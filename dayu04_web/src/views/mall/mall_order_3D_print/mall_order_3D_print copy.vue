<template>
<div>
   <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
   <div ref="container" style="width: 100%; height: 500px;"></div>
   <el-button @click="loadSTL">加载STL文件</el-button>
</div>
</template>

<script>
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  data() {
    return {
      name: "数据1",
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
    }
  },

  methods: {
    initThree() {
      // 创建场景
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xf0f0f0);

      // 创建相机
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.z = 100;

      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.$refs.container.clientWidth, this.$refs.container.clientHeight);
      this.$refs.container.appendChild(this.renderer.domElement);

      // 添加轨道控制器
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;

      // 添加光源
      const ambientLight = new THREE.AmbientLight(0x404040);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(1, 1, 1);
      this.scene.add(directionalLight);

      // 开始动画循环
      this.animate();
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },

    loadSTL() {
      const loader = new STLLoader();
      // 这里替换为你的STL文件路径
      loader.load('/path/to/your/file.stl', (geometry) => {
        const material = new THREE.MeshPhongMaterial({
          color: 0x156289,
          specular: 0x111111,
          shininess: 30
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        // 居中模型
        geometry.computeBoundingBox();
        const center = geometry.boundingBox.getCenter(new THREE.Vector3());
        mesh.position.set(-center.x, -center.y, -center.z);
        
        // 添加到场景
        this.scene.add(mesh);
        
        // 调整相机位置以适应模型大小
        const box = new THREE.Box3().setFromObject(mesh);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        this.camera.position.z = maxDim * 2;
      });
    },

    handleResize() {
      if (this.camera && this.renderer) {
        this.camera.aspect = this.$refs.container.clientWidth / this.$refs.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.$refs.container.clientWidth, this.$refs.container.clientHeight);
      }
    }
  },

  mounted() {
    this.initThree();
    window.addEventListener('resize', this.handleResize);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 500px;
  position: relative;
}
</style>




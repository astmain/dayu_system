<template>
  <div class="stl-viewer">
    <h3>STL 文件查看器</h3>
    <input type="file" @change="on_change_file" accept=".stl" />
    <p>{{ state.msg }}</p>
    <div ref="canvasContainer" class="canvasContainer" style="width: 300px;height: 200px;border: 1px solid red;"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

export default {
  name: 'StlViewer',
  data() {
    return {
      state: {
        msg: "未选中文件"
      },
      file_blob_url: "",
    };
  },
  mounted() {

  },
  methods: {
    async on_change_file(event) {
      // 获取文件blobURL
      const blobURL = URL.createObjectURL(event.target.files[0])
      console.log('blobURL', blobURL)


      // 初始化three
      let { scene, camera, renderer } = await 初始化three({ dom: this.$refs.canvasContainer })
      console.log('scene', scene)


      // 得到geometry数据
      let geometry222 = await 得到geometry数据(blobURL)
      console.log('geometry222', geometry222)

      // 得到网状数据mesh
      let res = 得到网状数据mesh({ geometry: geometry222, scene: scene })


      // 设置_相机_场景
      设置_相机_场景({ camera, scene: scene, object: res.mesh })
      this.state.msg = res.msg
      async function 初始化three({ dom }) {
        const container = dom;
        // 创建场景、相机、渲染器（不放在 data 中，避免 Vue 响应式代理）
        let scene = new THREE.Scene();
        console.log('scene', scene)
        let camera = new THREE.PerspectiveCamera(
          75,
          container.clientWidth / container.clientHeight,
          0.1,
          1000
        );
        let renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0xeeeeee);
        container.appendChild(renderer.domElement);

        // 添加光源
        const ambientLight = new THREE.AmbientLight(0x404040); // 环境光
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // 设置相机初始位置
        camera.position.set(0, 0, 5);



        return { msg: "初始化完成", scene, camera, renderer }
      }




      function 得到网状数据mesh({ geometry, scene }) {
        console.log('1111---scene', scene)
        const material = new THREE.MeshStandardMaterial({
          // color: 0x808080,
          // color: 0,
          color: 0xffffff,
          roughness: 0.7,
          roughness: 0.1,
          metalness: 0.5,
          metalness: 0.1,
          metalness: 0.5, // 0.3
          roughness: 0.3, // 0.3
          transparent: true,
        });

        const mirrorCameraRotation = new THREE.Euler()

        const mesh = new THREE.Mesh(geometry, material);
        console.log('mesh', mesh)
        mesh.rotation.x = -Math.PI / 3; // 调整模型方向
        mesh.rotation.x = -mirrorCameraRotation.x; // 调整模型方向
        mesh.rotation.y = -mirrorCameraRotation.y; // 调整模型方向
        scene.add(mesh);


        return { msg: "加载完成", mesh }
      }

      async function 得到geometry数据(blobURL) {
        return new Promise(async (resolve, reject) => {
          const loader = new STLLoader();
          loader.load(blobURL, (geometry) => {
            resolve(geometry)
          })
        })
      }


      function 设置_相机_场景({ camera, scene, object }) {
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const center = box.getCenter(new THREE.Vector3());

        const cameraDistance = maxDim / 2 / Math.tan((Math.PI * camera.fov) / 360);
        camera.position.copy(center);
        camera.position.z = center.z + cameraDistance * 1.2;
        camera.lookAt(center);

        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      }





    },















  }
};
</script>

<style scoped>
.canvasContainer {
  width: 300px;
  height: 200px;
  border: 1px solid red;
}
</style>
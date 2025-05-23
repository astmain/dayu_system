<template>
    <div>
        <input type="file" @change="on_change_file222" accept=".stl" />
        <div ref="canvasContainer" class="canvasContainer"></div>
    </div>
</template>

<script>
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 自定义
async function 得到geometry数据(blobURL) {
    return new Promise(async (resolve, reject) => {
        const loader = new STLLoader();
        loader.load(blobURL, (geometry) => {
            resolve(geometry)
        })
    })
}

export default {
    data() {
        return {

        };
    },

    methods: {
        async on_change_file222(event) {
            // 获取文件blobURL
            const blobURL = URL.createObjectURL(event.target.files[0])
            console.log('blobURL', blobURL)
            //dom
            let container = this.$refs.canvasContainer
            // 场景
            let scene = new THREE.Scene();
            // 相机
            let camera = new THREE.PerspectiveCamera(75, 800 / 800, 0.1, 1000);
            camera.position.set(0, 0, 1);                 // 设置相机初始位置
            // camera.position.set(872.8, 440.6, -60);    // 设置相机初始位置
            // 渲染器
            let renderer = new THREE.WebGLRenderer({ antialias: true })
            renderer.setSize(800, 800)
            renderer.setClearColor(0xeeeeee)
            container.appendChild(renderer.domElement)
            // 结构
            let my_geometry = await 得到geometry数据(blobURL)
            // 材质-外观
            const my_material = new THREE.MeshStandardMaterial({ color: 0xbabcbd })

            // 物件
            const mesh = new THREE.Mesh(my_geometry, my_material);
            scene.add(mesh);

            //我的这个stl文件 太大 怎么动态设置相机位置,让它居中显示

            const controls = new OrbitControls(camera, renderer.domElement)
            controls.enableDamping = true
            controls.dampingFactor = 0.2
            controls.addEventListener('change', () => {
                console.log("控制器改变时查看相机位置", camera.position)
                renderer.render(scene, camera);
            })

            renderer.render(scene, camera);
        },


    }
};
</script>

<style scoped>
.canvasContainer {
    width: 800px;
    height: 800px;
    border: 1px solid red;
}
</style>
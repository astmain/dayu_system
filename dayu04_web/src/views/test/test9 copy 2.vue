<template>
    <div class="stl-viewer">
        <h3>STL 文件查看器</h3>
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
    name: 'StlViewer',
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
            let camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            camera.position.set(0, 0, 5);    // 设置相机初始位置

            // let camera = window.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
            // camera.position.set(16, 18, 45)          //看的角度  1倾斜 2 旋转 3远近
            // camera.lookAt(0, 0, 0); //看的角度  1倾斜 2 旋转 3 移动



            // 渲染器
            let renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setClearColor(0xeeeeee);
            container.appendChild(renderer.domElement);
            // 控制器
            const controls = new OrbitControls(camera, renderer.domElement)
            controls.enableDamping = true  //enableDamping设置为true的时候，阻尼惯性有多大。 Default is 0.05.
            controls.dampingFactor = 0.2   //惯性阻尼值


            // 添加光源
            const ambientLight = new THREE.AmbientLight(0x404040); // 环境光
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1).normalize();
            scene.add(directionalLight);

            // 结构
            let geometry222 = await 得到geometry数据(blobURL)


            // 材质-外观
            const material = new THREE.MeshStandardMaterial({
                // const material = new THREE.MeshBasicMaterial({
                color: 0xbabcbd,
                // roughness: 0.7,
                // roughness: 0.1,
                // metalness: 0.5,
                // metalness: 0.1,
                // metalness: 0.5, // 0.3
                // roughness: 0.3, // 0.3
                // transparent: true,
            });



            // 物件
            const mesh = new THREE.Mesh(geometry222, material);
            scene.add(mesh);




            // 成功显示
            let box = new THREE.Box3().setFromObject(mesh);
            let size = box.getSize(new THREE.Vector3());
            let maxDim = Math.max(size.x, size.y, size.z);
            let center = box.getCenter(new THREE.Vector3());
            let cameraDistance = maxDim / 2 / Math.tan((Math.PI * camera.fov) / 360);
            let z = center.z + cameraDistance * 1.2;
            camera.position.copy(center);
            camera.position.z = center.z + cameraDistance * 1.2;
            camera.lookAt(center);
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
            console.log("box", box)
            console.log("size", size)
            console.log("maxDim", maxDim)
            console.log("center", center)
            console.log("cameraDistance", cameraDistance)
            console.log("z", z)























            // 动画
            // function animate() {
            //     requestAnimationFrame(animate)
            //     renderer.render(scene, camera)
            //     controls.update()
            // }
            // animate()




        },


    }
};
</script>

<style scoped>
.canvasContainer {
    width: 100%;
    height: 600px;
    border: 1px solid red;
}
</style>
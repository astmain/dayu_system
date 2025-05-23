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
            const blobURL = URL.createObjectURL(event.target.files[0]);
            let container = this.$refs.canvasContainer;


            container.innerHTML = '';

            // 场景
            let scene = new THREE.Scene();
            // 光照
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
            scene.add(ambientLight);
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1).normalize();
            scene.add(directionalLight);

            // 相机
            let camera = new THREE.PerspectiveCamera(75, 800 / 800, 0.1, 10000);
            camera.position.set(0, 0, 100);  // 临时初始位置

            // 渲染器
            let renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(800, 800);
            renderer.setClearColor(0xeeeeee);
            container.appendChild(renderer.domElement)
            // 控制器
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.2;
            // controls.update();
            // controls.addEventListener('change', () => console.log("控制器改变时查看相机位置", camera.position))


            // 材料外观
            const my_material = new THREE.MeshStandardMaterial({ color: 0xbabcbd });


            // 结构
            let my_geometry = await 得到geometry数据(blobURL);

            // 动态-自动居中 & 缩放场景
            my_geometry.computeBoundingBox();
            const boundingBox = my_geometry.boundingBox;
            const center = new THREE.Vector3();
            boundingBox.getCenter(center);
            const size = new THREE.Vector3();
            boundingBox.getSize(size);

            // 动态-设置结构居中
            my_geometry.translate(-center.x, -center.y, -center.z);

            // 动态-设置相机位置：距离 = 模型最大尺寸的倍数
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180); // 转为弧度
            const distance = maxDim / (2 * Math.tan(fov / 2));
            // camera.position.set(0, 0, distance * 1.5);  // 加点距离避免太近
            camera.position.set(0, 0, distance * 5);  // 加点距离避免太近
            camera.lookAt(0, 0, 0);


            // 网状物
            const mesh = new THREE.Mesh(my_geometry, my_material);
            scene.add(mesh);



            //如何设置 my_geometry 的中心点 为xyz的中心




            // ✅ 渲染循环
            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }

            animate();
        }



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
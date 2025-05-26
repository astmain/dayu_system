<template>
    <div style="display: flex; flex-direction: column;">
        <input type="file" @change="on_change_file_111" accept=".stl,.gltf,.glb,.gltf" />
        <p>加载进度：{{ my_progress }}</p>
        <canvas class="canvasContainer" style="width:600px;height:600px;border:1px solid red;" />
    </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// 自定义


export default {
    data() {
        return {
            my_progress: 0, // 加载进度
        };
    },

    methods: {
        async on_change_file_111(event) {
            let blobURL = URL.createObjectURL(event.target.files[0])//得到blobURL
            event.target.value = ''; // 清空input的值
            console.log("blobURL", blobURL)
            await this.three_parse_show({
                blobURL,
                canvas: document.querySelector('.canvasContainer'),
            })
        },


        // three解析器显示
        async three_parse_show({ canvas, blobURL }) {
            // let canvas = document.querySelector('.canvasContainer')
            console.log("canvas.clientWidth", canvas.clientWidth)
            console.log("canvas.clientHeight", canvas.clientHeight)

            // 渲染器
            let renderer = window.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, });//antialias是否执行抗锯齿。默认为false
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
            renderer.shadowMap.enabled = true;
            console.log("渲染器-renderer", renderer)

            // 场景
            let scene = new THREE.Scene();
            scene.background = new THREE.Color(0xbfd1e5);
            // 相机
            let camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 10000);
            camera.position.set(0, 5, 5);  // 临时初始位置
            camera.lookAt(0, 0, 0); //看的角度  1倾斜 2 旋转 3 移动

            // 控制器
            let controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.2;
            controls.addEventListener('change', () => console.log("控制器改变时查看相机位置", camera.position))

            // 材料-外观
            const my_material = new THREE.MeshStandardMaterial({ color: 0xbabcbd });



            let loader = new GLTFLoader()
            // loader.load(blobURL, function (gltf) {
            loader.load("/src/public/222.gltf", function (gltf) {
                scene.add(gltf.scene)
                console.log("gltf.scene", gltf.scene)
            },
                (info) => {
                    console.log("加载进度", info)
                    this.my_progress = info.loaded / info.total * 100
                    console.log("this.my_progress", this.my_progress)
                }
            
            ,(error)=>{
                console.log("error", error)
            })



            // 渲染循环
            animate()
            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            }

            // stl_解析blobURL
            async function my_STLLoader_blobURL(blobURL) {
                return new Promise(async (resolve, reject) => {
                    const loader = new STLLoader();
                    loader.load(blobURL, (geometry) => {
                        resolve(geometry)
                    })
                })
            }

            async function my_GLTFLoader_blobURL(blobURL) {
                return new Promise(async (resolve, reject) => {
                    const loader = new my_GLTFLoader_blobURL();
                    loader.load(blobURL, (geometry) => {
                        resolve(geometry)
                    })
                })
            }
        }



    }
};
</script>

<style scoped></style>
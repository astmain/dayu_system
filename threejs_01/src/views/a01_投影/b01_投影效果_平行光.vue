<template>

    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="met1()">met1</el-button>

    <div style="display: flex; flex-direction: row;gap: 10px">

        <canvas id="canvas1" style=" width: 400px; height: 400px; border: 1px solid red;"></canvas>


        <div>
            <div style="width:20px;height: 20px ;background: #404040">0x404040</div>
            <div style="width:20px;height: 20px ;background: #ff0000">0xff0000</div>
            <div style="width:20px;height: 20px ;background: #ffffff">0xffffff</div>
            <div style="width:20px;height: 20px ;background: #0000ff">0x0000ff</div>
            <div style="width:20px;height: 20px ;background: #00ff00">0x00ff00</div>
        </div>

    </div>
</template>
<script>
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//自定义
import colorHex from '@src/utils/colorHex';
export default {
    data() {
        return {
            name: "数据1",
        }
    },
    methods: {
        async met1() {
            let canvas = document.getElementById('canvas1')
            console.log("canvas.clientWidth", canvas.clientWidth)
            console.log("canvas.clientHeight", canvas.clientHeight)

            // 场景
            let scene = new THREE.Scene();
            // scene.background = new THREE.Color(colorHex.青色1)


            // 相机
            let camera = window.camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
            camera.position.set(6, 10, 30)          //看的角度  1倾斜 2 旋转 3远近
            camera.lookAt(0, 0, 0); //看的角度  1倾斜 2 旋转 3 移动

            // 渲染器
            let renderer = window.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, });//antialias是否执行抗锯齿。默认为false
            console.log("renderer", renderer)
            renderer.setPixelRatio(window.devicePixelRatio)
            renderer.setSize(canvas.clientWidth, canvas.clientHeight)
            renderer.shadowMap.enabled = true//渲染器支持投射阴影
            //todo 光源==================================================================
            //环境光
            let light_ambient = new THREE.AmbientLight(0x404040)
            scene.add(light_ambient)




            //todo 结构和材质============================================================
            let plane = new THREE.Mesh(
                new THREE.PlaneGeometry(18, 18),
                new THREE.MeshStandardMaterial({ color: 0xffffff })
            )
            plane.receiveShadow = true//地面接收阴影
            plane.rotation.x = -Math.PI / 2

            let cube = new THREE.Mesh(
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.MeshStandardMaterial({ color: 0xff0000 })
            )
            cube.position.set(0, 2, 0)
            cube.castShadow = true//物件投射阴影





            scene.add(plane, cube);

            //todo 阴影投射： 光源 物体渲染器==================================================

            // 平行光
            let light_directional = new THREE.DirectionalLight(0xffffff, 1) //颜色,强度
            light_directional.position.set(10, 6, 0)
            light_directional.castShadow = true//平行光投射阴影
            light_directional.shadow.mapSize.width = 2048
            light_directional.shadow.mapSize.height = 2048
            let light_directional_help = new THREE.DirectionalLightHelper(light_directional)
            scene.add(light_directional)
            scene.add(light_directional_help)






            // ============================================================
            //   控制器
            const controls = new OrbitControls(camera, renderer.domElement)
            controls.enableDamping = true  //enableDamping设置为true的时候，阻尼惯性有多大。 Default is 0.05.
            controls.dampingFactor = 0.2   //惯性阻尼值
            controls.addEventListener('change', () => console.log("控制器改变时查看相机位置", camera.position))

            // 动画
            function animate() {
                requestAnimationFrame(animate)
                renderer.render(scene, camera)
                controls.update()
            }
            animate()

        },//

    },////

    async mounted() {


        this.met1()
    },////

}
</script>

<style scoped>
aaa {
    color: #404040;
    color: #ff0000;
}
</style>
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
import { Raycaster } from 'three';
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


            let sphere1 = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0xffff33 })
            )
            sphere1.castShadow = true//物件投射阴影
            sphere1.position.x = -4

            let sphere2 = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0xffff33 })
            )
            sphere2.castShadow = true//物件投射阴影
            sphere2.position.x = 0
            // sphere2.position.y = 5

            let sphere3 = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0xffff33 })
            )
            sphere3.castShadow = true//物件投射阴影
            sphere3.position.x = 4
            scene.add(plane);
            scene.add(sphere1);
            scene.add(sphere2);
            scene.add(sphere3);
            let meshs = [sphere1, sphere2, sphere3]


            //todo 阴影投射： 光源 物体渲染器==================================================
            let Raycaster = new THREE.Raycaster()
            let mouse = new THREE.Vector2()
            window.addEventListener('mousedown', (event) => {
                console.log('clientX,clientY---:', event.clientX, event.clientY)
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
                Raycaster.setFromCamera(mouse, camera)
                let intersects = Raycaster.intersectObjects(meshs)
                console.log('intersects---:', intersects)
            })


            // ============================================================
            //   控制器
            const controls = new OrbitControls(camera, renderer.domElement)
            controls.enableDamping = true  //enableDamping设置为true的时候，阻尼惯性有多大。 Default is 0.05.
            controls.dampingFactor = 0.2   //惯性阻尼值
            // controls.addEventListener('change', () => console.log("控制器改变时查看相机位置", camera.position))

            // 动画
            let Clock = new THREE.Clock()
            function animate() {
                // 时间器不断改变物件位置
                let time = Clock.getElapsedTime()
                // sphere1.position.y = 2 * Math.sin(time * 1)
                // sphere2.position.y = 2 * Math.sin(time * 2)
                // sphere3.position.y = 2 * Math.sin(time * 3)

                // // 遍历物件充值颜色
                // for (let mesh of meshs) {
                //     mesh.material.color.setHex(colorHex.yellow)
                // }

                // // 判断是否相交
                // let intersects = Raycaster.intersectObjects(meshs)
                // for (let intersectObject of intersects) {
                //     let arr = intersectObject.object.material.color.setHex(colorHex.red)
                //     // console.log('判断是否相交---:', arr)
                // }


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
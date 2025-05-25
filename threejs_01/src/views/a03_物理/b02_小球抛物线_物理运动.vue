<template>

    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <pre>https://www.bilibili.com/video/BV1Zm421g7oi?p=13</pre>
    
    <el-button @click="met1()">met1</el-button>
    <div style="display: flex; flex-direction: row;gap: 10px">
        <canvas id="canvas1" style=" width: 400px; height: 400px; border: 1px solid red;"></canvas>
    </div>
</template>
<script>
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Raycaster } from 'three';
import * as CANNON from 'cannon';
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
            scene.add(plane);

            let raduio = 1//半径
            let texture = new THREE.TextureLoader().load("/src/public/风车01.png")
            let sphere1 = new THREE.Mesh(
                new THREE.SphereGeometry(raduio, 32, 32),
                // new THREE.MeshBasicMaterial(
                new THREE.MeshPhongMaterial(
                    { 
                        // color: 0xffff33 ,
                        map: texture ,
                    }
                    )
            )
            sphere1.castShadow = true//物件投射阴影
            sphere1.position.set(0, 5, 0)
            scene.add(sphere1);


            //todo 创建物理世界
            const world = new CANNON.World();
            world.gravity.set(0, -9.8, 0);
            //创建物流材料
            const groundMaterial = new CANNON.Material('groundMaterial');
            const sphereMaterial = new CANNON.Material('sphereMaterial');
            const contactMaterial = new CANNON.ContactMaterial(groundMaterial, sphereMaterial, {
                // friction: 0.3,
                // restitution: 0,
                restitution: 0.9,
                // restitution:1,
            });//friction摩擦系数 restitution反弹系数
            world.addContactMaterial(contactMaterial);


            //创建物理地面
            const groundBody = new CANNON.Body({
                mass: 0, // mass = 0 makes the body static
                shape: new CANNON.Plane(),
                // position: new CANNON.Vec3(0, 0, 0),
                // quaternion: new CANNON.Quaternion().setFromEuler(-Math.PI / 2, 0, 0),
                material: groundMaterial,
            });
            groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
            world.addBody(groundBody);

            //创建物小球
            let ShapeBody = new CANNON.Body({
                // mass: 0.1,
                mass: 0.5,
                // mass: 1,
                position: sphere1.position,      // position: new CANNON.Vec3(0, 3, 0),//sphere1.position.set(0, 3, 0)
                material: sphereMaterial,
                linearDamping:0.5,//线性阻尼,模拟空气阻力
            });
            let SphereShape = new CANNON.Sphere(raduio);
            ShapeBody.applyLocalForce(
                new CANNON.Vec3(100, 300, 0),
                new CANNON.Vec3(0, -5, 0),
            );
            ShapeBody.addShape(SphereShape);

            // 物流小球添加到物理世界
            world.addBody(ShapeBody);
            let update = () => {
                world.step(1 / 60);
                // console.log('111---:', ShapeBody.position)
                sphere1.position.copy(ShapeBody.position);
                sphere1.quaternion.copy(ShapeBody.quaternion);//四元数
            }







            // ============================================================
            //   控制器
            const controls = new OrbitControls(camera, renderer.domElement)
            controls.enableDamping = true  //enableDamping设置为true的时候，阻尼惯性有多大。 Default is 0.05.
            controls.dampingFactor = 0.2   //惯性阻尼值
            // controls.addEventListener('change', () => console.log("控制器改变时查看相机位置", camera.position))

            // 动画
            let Clock = new THREE.Clock()
            function animate() {

                update()
                controls.update()

                renderer.render(scene, camera)
                requestAnimationFrame(animate)
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
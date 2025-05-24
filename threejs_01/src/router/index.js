import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
// import LayoutView from './Layout/LayoutView.vue'
import { pinyin } from "pinyin-pro"
const routes = [//
    { path: '/', redirect: '/b01_射线' },
    { path: '/原始模版', name: '原始模版', component: () => import('@src/views/原始模版.vue') },
    {
        path: '/a01_投影', name: 'a01_投影', children: [
            { path: '/b01_投影效果_平行光', name: 'b01_投影效果_平行光', component: () => import('@src/views/a01_投影/b01_投影效果_平行光.vue') },
            { path: '/b02_投影效果_点光源', name: 'b02_投影效果_点光源', component: () => import('@src/views/a01_投影/b02_投影效果_点光源.vue') },
        ]
    },

    {
        path: '/a02_射线', name: 'a02_射线', children: [
            { path: '/b01_射线_时间器不断改变物件位置', name: 'b01_射线_时间器不断改变物件位置', component: () => import('@src/views/a02_射线/b01_射线_时间器不断改变物件位置.vue') },

        ]
    },

    {
        path: '/test', name: '测试', children: [
            { path: '/测试1_渲染器_动画', name: '测试1_渲染器_动画', component: () => import('@src/views/test/test0.vue') },
            { path: '/测试2_轨迹_鼠标旋转', name: '测试2_轨迹_鼠标旋转', component: () => import('@src/views/test/test2.vue') },
            { path: '/测试3_OrbitControls', name: '测试3_OrbitControls', component: () => import('@src/views/test/test3.vue') },
            { path: '/测试4_绘制物件', name: '测试4_绘制物件', component: () => import('@src/views/test/test4.vue') },
            { path: '/测试5_贴图自发光', name: '测试5_贴图自发光', component: () => import('@src/views/test/test5.vue') },
            { path: '/test6_高光_亚光_粗糙度_金属度', name: 'test6_高光_亚光_粗糙度_金属度', component: () => import('@src/views/test/test6.vue') },
            { path: '/test7_贴图皮肤', name: 'test7_贴图皮肤', component: () => import('@src/views/test/test7.vue') },
            { path: '/test8_贴图皮肤2', name: 'test8_贴图皮肤2', component: () => import('@src/views/test/test8.vue') },
            { path: '/test9_加载stl文件', name: 'test9_加载stl文件', component: () => import('@src/views/test/test9.vue') },
            { path: '/test10_光源_环境光_平行光_半球光_点光源', name: 'test10_光源_环境光_平行光_半球光_点光源', component: () => import('@src/views/test/test10.vue') },
            { path: '/test11_投影效果', name: 'test11_投影效果', component: () => import('@src/views/test/test11.vue') },
        ]
    },

]


let routes_new = globalThis.routes_new = appendSuffixToNames({ my_list: routes, my_key: "path", my_children: "children" })
console.log(`routes_new:`, routes_new)

const router = createRouter({
    history: createWebHashHistory(),//
    routes: routes_new,//
})

export default { router, routes }


function appendSuffixToNames({ my_list, my_key, my_children }) {
    return my_list.map(item => {
        // 创建新对象并赋值
        let newItem = { ...item };

        //重定向处理
        if (newItem.redirect) {
            newItem.redirect = pinyin(newItem.redirect, { toneType: "none", nonZh: 'consecutive', separator: '', });
        }

        // 转换 name 属性为拼音
        if (newItem[my_key]) {
            // console.log(`item---:`, item)
            newItem[my_key] = pinyin(newItem[my_key], { toneType: "none", nonZh: 'consecutive', separator: '', });
        }

        // 递归处理 children
        if (Array.isArray(newItem[my_children])) {
            newItem[my_children] = appendSuffixToNames({ my_list: newItem[my_children], my_key, my_children, });
        }

        return newItem; // 返回新对象
    });
}


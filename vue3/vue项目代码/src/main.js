import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia' //引入pinia
//引入路由
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

//路由配置
let routes = [
    { path: '/login', component: () => import('./views/Login.vue') },
    { path: '/test', component: () => import('./views/Test.vue') },
    { path: '/product_list', component: () => import('./views/ProductList.vue') },
    {
        path: '/main', component: () => import('./views/Main.vue'), children: [
            { path: '/main/page1', component: () => import('./views/Page1.vue') },
            { path: '/main/page2', component: () => import('./views/Page2.vue') },
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

let app = createApp(App)
app.use(router)
app.use(createPinia());//注册使用pinia
app.mount('#app')

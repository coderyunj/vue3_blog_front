<template>
    <div>
        <button @click="testClick">clickMe</button>
    </div>
</template>

<script setup>

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()//获取上层路由传递的参数

function testClick() {
    //路由跳转
    router.push({
        path: '/login',
        query: { //传递query参数
            name:"张三",
            id:1
        },
    })
}

</script>

<style  scoped>
</style>
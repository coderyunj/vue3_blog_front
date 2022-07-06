<template>
    <div>
        Login 
        {{info.id}} , {{info.name}}
    </div>
</template>

<script setup>
import {ref , reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()//获取上层路由传递的参数

let info = reactive({
    id:route.query.id,
    name:route.query.name,
})


</script>

<style scoped>

</style>
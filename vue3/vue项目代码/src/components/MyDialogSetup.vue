<template>

    <div class="dialog-bg">
        <div class="dialog">
            <div>
                <slot :title="title" hello="张三" name="title">{{ title }}</slot>
            </div>
            <div>
                <slot></slot>
            </div>
            <div>
                <input type="text" v-model="modelValue" @keyup.enter="submit" @keyup.esc="cancel" />
            </div>
            <div class="btn-group">
                <button @click="submit">确定</button>
                <button @click="cancel">取消</button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, reactive } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    modelValue: {
        type: String,
        default: "",
    },
})

const emit = defineEmits({})

function submit() {
    emit("update:model-value", props.modelValue);
    emit("close", { name: "翠花", id: 1 })
}
function cancel() {
    emit("close")
}


</script>

<style scoped>
.dialog-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    text-align: center;
}

.dialog {
    width: 300px;
    padding: 20px;
    margin: 0 auto;
    margin-top: 200px;
    background-color: #e4e4e4;
}

.btn-group {
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
}
</style>
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

<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        modelValue: {
            type: String,
            default: "",
        },
    },
    data() {
        return {}
    },
    beforeUnmount() {
        console.log("beforeUnmount");
    },
    unmounted() {
        console.log("unmounted");
    },
    methods: {
        submit() {
            this.$emit("update:model-value", this.modelValue);
            this.$emit("close", { name: "翠花", id: 1 })
        },
        cancel() {
            this.$emit("close")
        }
    }
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
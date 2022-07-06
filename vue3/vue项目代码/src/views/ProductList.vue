<template>
    <div>
        <div class="product" v-for="(product, index) in products">

            <div class="image">
                <img :src="server_url + product.images" alt="">
            </div>
            <div class="info">
                <div>{{ product.name }} 价格:{{product.price}}</div>
                <div class="desc">{{ product.describe }}</div>
                <div class="cart-btn" @click="addToCart(product)"><button>加入购物车</button></div>
            </div>
        </div>
    </div>
    <div style="position:fixed;top:20px;right:50px">
        <cart-view></cart-view>
    </div>

</template>

<script setup>

import { ref, reactive } from 'vue'
import { cartStore } from '../stores/CartStore'
import CartView from '../components/MyCart.vue'

let server_url = "http://apitest01.laixuexi.top:8080/"
let mycart = cartStore()

function addToCart(product) {
    mycart.addProduct(product, 1)
}

let products = reactive([
    {
        "id": 324544028930118,
        "group_id": 324544028930117,
        "name": "面包",
        "price": 13,
        "describe": "吃了一个面包，你就不会饿了",
        "tags": "[{\"type\":\"颜色\",\"value\":\"咖啡色\"}]",
        "images": "/upload/1.jpg",
        "stock": 23,
        "sell": null,
        "update_time": 1657071182063
    },
    {
        "id": 324544028930119,
        "group_id": 324544028930117,
        "name": "水果沙拉",
        "price": 15,
        "describe": "好吃是好吃，但是吃了还会饿",
        "tags": "[{\"type\":\"颜色\",\"value\":\"彩色\"}]",
        "images": "/upload/2.jpg",
        "stock": 131,
        "sell": null,
        "update_time": 1657071182063
    },
    {
        "id": 324544028930120,
        "group_id": 324544028930117,
        "name": "鸡蛋",
        "price": 23,
        "describe": "鸡蛋好吃",
        "tags": "[{\"type\":\"颜色\",\"value\":\"茶白色\"}]",
        "images": "/upload/3.jpg",
        "stock": 50,
        "sell": null,
        "update_time": 1657071182063
    },
    {
        "id": 324544028930121,
        "group_id": 324544028930117,
        "name": "水果",
        "price": 13,
        "describe": "水果果果果果果果！",
        "tags": "[{\"type\":\"颜色\",\"value\":\"橙色\"}]",
        "images": "/upload/4.jpg",
        "stock": 20,
        "sell": null,
        "update_time": 1657071182063
    },
    {
        "id": 324544028930122,
        "group_id": 324544028930117,
        "name": "咖啡",
        "price": 33,
        "describe": "特困生的救星（专治犯困）",
        "tags": "[{\"type\":\"颜色\",\"value\":\"咖啡色\"}]",
        "images": "/upload/5.jpg",
        "stock": 10,
        "sell": null,
        "update_time": 1657071182063
    }
])

</script>

<style lang="scss" scoped>
.product {
    padding: 10px;
    display: flex;

    .image {
        width: 80px;
        height: 80px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .info {
        padding: 0px 10px;

        .desc {
            color: rgb(102, 102, 102);
            font-size: 12px;
        }

        .cart-btn {
            margin-top: 10px;
        }
    }
}
</style>
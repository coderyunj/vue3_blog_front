<template>
    <div>
        <div class="product" v-for="(product, index) in mycart.products">
            <div class="image">
                <img :src="server_url + product.product.images" alt="">
            </div>
            <div class="info">
                <div>{{ product.product.name }}</div>
                <div class="desc">{{ product.product.describe }}</div>
                <div> <button @click="updateProduct(product.product, -1)">-</button>
                    {{ product.quantity }}
                    <button @click="updateProduct(product.product, 1)">+</button>
                </div>
            </div>
        </div>
        <div>总价:{{mycart.totalPrice}}</div>
    </div>
</template>

<script setup>

import { ref, reactive } from 'vue'
import { cartStore } from '../stores/CartStore'

let server_url = "http://apitest01.laixuexi.top:8080/"

let mycart = cartStore()

function updateProduct(product,quantity){
    mycart.addProduct(product,quantity)
}


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
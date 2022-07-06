<template>
    <div>
        <!-- {{counter.count}}<br/> -->
        {{counter.testCount}}<br/>
        <!-- {{message}}<br/>
        {{book}}<br/> -->
        {{testCount}}

        <button @click="testClick">clickMe</button>
    </div>
</template>

<script setup>
import { defineStore, storeToRefs } from 'pinia'
import { testStore } from '../stores/TestStore'

const counter = testStore()

let {message,book,testCount} = storeToRefs(counter);

function testClick(){
    counter.testAction();
    // message.value = "张三";
    // book.value.price = 15
    // counter.book.price = 15
    testCount.value = "翠花"
}

</script>

<style  scoped>
</style>
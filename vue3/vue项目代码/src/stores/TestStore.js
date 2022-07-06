import { defineStore, storeToRefs } from 'pinia'

export const testStore = defineStore("test", {
    state: () => {
        return {
            count:2,
            message:"hello world",
            book:{
                id:1,
                price:13,
                name:"一本书"
            }
        }
    },
    actions: {
        testAction(){
            this.count *= 2
        }
    },
    getters: {
        testCount(state){
            return state.count *2 + state.message 
        }
    }
})

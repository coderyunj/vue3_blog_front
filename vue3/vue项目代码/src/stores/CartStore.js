import { defineStore, storeToRefs } from 'pinia'

export const cartStore = defineStore("cart", {
    state: () => {
        return {
            products:[
            ]
        }
    },
    actions: {
        addProduct(product,quantity){
            let productIndex = this.products.findIndex((p) => { return p.product.id == product.id})
            if(productIndex > -1){
                //商品已经存在
                this.products[productIndex].quantity += quantity ;

                if(this.products[productIndex].quantity == 0){
                    this.products.splice(productIndex,1)
                }

            }else{
                //商品不存在购物车
                this.products.push({
                    product:product,
                    quantity:1
                })
            }
        }
    },
    getters: {
        totalPrice(state){
            let _totalPrice = 0
            for(let product of state.products){
                _totalPrice += product.quantity * product.product.price ;
            }
            return _totalPrice;
        }
    }
})
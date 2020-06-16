
const product_conditions = {
    namespaced: true,
    state:{
        product_conditions:[]
    },
    getters:{
        get_product_conditions(state) {
            return state.product_conditions;
        }
    },
    mutations:{
        set_product_conditions(state, product_conditions) {
            state.product_conditions = product_conditions;
        }
    },
    actions:{

    }
}

export default product_conditions

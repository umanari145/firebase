const loading = {
    namespaced: true,
    state:{
        is_loading:0
    },
    getters:{
        getIsLoading(state) {
            return state.is_loading
        }
    },
    mutations:{
        setIsLoading(state, is_loading) {
            state.is_loading = is_loading
        },
    },
    actions:{

    }
}

export default loading


const master_list = {
    namespaced: true,
    state:{
        master_list:[]
    },
    getters:{
        get_master_list(state) {
            return state.master_list;
        },
    },
    mutations:{
        set_master_list(state, master_list) {
            state.master_list = master_list;
        },
    },
    actions:{

    }
}

export default master_list

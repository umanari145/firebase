
const user = {
    namespaced: true,
    state:{
        user:[]
    },
    getters:{
        get_user(state) {
            return state.user;
        },
        is_login(state) {
          return (state.user.email == 'umanari145@gmail.com' );
        }
    },
    mutations:{
        set_user(state, user) {
            state.user = user;
        }
    },
    actions:{

    }
}

export default user

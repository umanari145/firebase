
const settings = {
    namespaced: true,
    state:{
        user:[],
        accounts:[]
    },
    getters:{
        get_user(state) {
            return state.user;
        },
        is_login(state) {
          return (state.user.email == 'umanari145@gmail.com' );
        },
        get_accounts(state) {
          return state.accounts;
        }
    },
    mutations:{
        set_user(state, user) {
            state.user = user;
        },
        set_accounts(state, accounts) {
          state.accounts = accounts;
        }
    },
    actions:{

    }
}

export default settings

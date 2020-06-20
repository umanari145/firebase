<template >
  <div>
    <h1 class="title" style="display:flex;justify-content:center;">
        ツールリスト
    </h1>
    <div style="display:flex;justify-content:center;">
      <div>
        <div v-if="user.uid !== undefined && user.uid !== null" >
          {{ user.displayName }}
          <button type="button" @click="doLogout">ログアウト</button>
        </div>
        <!-- 未ログイン時にはログインボタンを表示 -->
        <div v-else key="logout">
          <button type="button" @click="doLogin">ログイン</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import firebase from 'firebase';
import config from '../../../functions/config';
firebase.initializeApp(config.firebaseConfig);


export default {
  name: 'Header',
  data() {
     return {};
  },
  methods:{
    doLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
        this.user = result.user;
      }).catch(function(error) {
        var errorMessage = error.message;
        alert('loginに失敗しました。');
        console.log(errorMessage);
      });
    },
    doLogout() {
      firebase.auth().signOut()
    }
  },
  computed:{
    user: {
      get() {
          return this.$store.getters["settings/get_user"];
      },
      set(val) {
          this.$store.commit("settings/set_user",val);
      }
    }
  },
  mounted() {
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {}
      if (user) {
        console.log("user exist");
      } else {
        console.log("user donot exist");
      }
    })
  }
}
</script>

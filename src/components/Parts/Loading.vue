<template>
    <div class="loading_back">
      <div class="is-hidden">
          <vue-loading type="spin" color="#333" :size="{ width: '50px', height: '50px' }">
          </vue-loading>
      </div>
    </div>
</template>
<script>
import { VueLoading } from 'vue-loading-template'

export default {
  name: 'App',
  components:{
    VueLoading
  }
}
</script>
<style lang="scss" scoped>
.loading_back{
  position: fixed;
  z-index: 9999;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

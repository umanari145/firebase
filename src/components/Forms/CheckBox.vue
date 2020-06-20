<template>
    <div>
        <span  v-for="(label_str, value_str) in kv_list">
            <input
               type="checkbox"
               :id=" checkbox_key +'_'+ value_str "
               :value="value_str"
               v-model="selectedVal"
           >
            <label :for=" checkbox_key + '_'+ value_str">{{label_str}}</label>
         </span>
    </div>
</template>

<script>
export default {
    props:{
          checkbox_key:{
          type:String,
          required:true
        },
        value:{
            type:[String,Array,Number],
            required:false
        },
        kv_list:{
            type:Object
        }
    },
    computed:{
        selectedVal:{
            get() {
                return this.value
            },
            set(value) {
                this.$emit("update:value",value)
            }
        }
    }
}
</script>

<template>
    <div>
        <select v-model="selectedVal">
            <option v-for="(label_str, value) in kv_list"
            :value="value"
            :key="label_str"
            >
                {{label_str}}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props:{
        value:{
            type:[String,Number]
        },
        kv_list:{
            type:[Object,Array]
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

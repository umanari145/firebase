<template>
  <div class="modal_wrapper">
    <table class="table_fix" style="width:100%;">
        <thead class="table_fix_head">
            <tr style="background:#E3E3E3;">
                <th class="col_15">処理日時</th>
                <th class="col_20">問い合わせ番号</th>
                <th class="col_30">商品名</th>
                <th class="col_5">価格</th>
                <th class="col_10">状態</th>
                <th class="col_10">結果</th>
                <th class="col_10">処理時間</th>
            </tr>
        </thead>
        <tbody class="table_fix_body">
            <tr :key="index" v-for="(each_score, index) in this.$parent.score"
            >
                <td class="col_15 t_c" >
                  {{each_score.register_dt}}
                </td>
                <td class="col_20 t_c">
                  {{each_score.ac}}
                </td>
                <td class="col_30">
                    {{each_score.name}}
                </td>
                <td class="col_5 t_c">
                    {{each_score.price}}
                </td>
                <td class="col_10 t_c">
                    {{each_score.condition}}
                </td>
                <td class="col_10 t_c">
                    {{each_score.status}}
                </td>
                <td class="col_10 t_c">
                    {{each_score.time}}
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>
<script>

export default {
    methods:{},
    data(){
        return {}
    }
}
</script>
<style>

.modal_wrapper{
  position: relative;
}

.col_30{
  width: 30%;
}

.col_5{
  width: 5%;
}

.spininng_back{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.inner_wrapper{
    margin: 10px;
}

.button_wrapper{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.area_block{
    margin-left: 5px;
    overflow-y: scroll;
    height: 250px;
}
</style>

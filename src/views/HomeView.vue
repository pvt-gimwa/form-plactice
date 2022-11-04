<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <router-view v-bind:formdata.sync="formdata"></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'HomeView',
  data(){
    return{
      formdata: [
        {
          block:"ご資産状況",
          data: [
            {name: "income", label: "ご年収", value:"", type:"text" , validation: {required:"true",min:"499",max:"99999999",headZero:"/^0[0-9]+$/",matches:"/^[0-9]+$/"}},
            {name: "financialAsset", label: "現在の金融資産", value:"", type:"text" , validation: {required:"true",max:"99999999",headZero:"/^0[0-9]+$/",matches:"/^[0-9]+$/"}},
            {name: "debt", label: "現在のお借入金額", value:"", type:"text" , validation: {required:"true",max:"99999999",headZero:"/^0[0-9]+$/",matches:"/^[0-9]+$/"}},
          ]
        },
        {
          block:"ご職業",
          data: [
            {name: "categoryOfBusiness", label: "業種", value:"", type:"select" , validation: {required:"true"}},
            {name: "typeOfOccupation", label: "職種", value:"", type:"select" , validation: {required:"true"}},
            {name: "placeOfEmployment", label: "お勤め先", value:"", type:"text" , validation: {required:"true",textMax:"100"}},
            {name: "whenStartedWorking", label: "お勤め開始時期", value:"", type:"date" , validation: {required:"true"}},
          ]
        },
        {
          block:"その他",
          data: [
            {name: "birthday", label: "生年月日", value:"", type:"date" , validation: {required:"true"}},
            {name: "prefecture", label: "お住まいの都道府県", value:"", type:"select" , validation: {required:"true"}},
          ]
        },
        {
          block:"ご連絡先",
          data: [
            {name: "name", label: "お名前", value:"", type:"text" , validation: {required:"true",textMax:"100"}},
            {name: "email", label: "メールアドレス", value:"", type:"text" , validation: {required:"true",email:"true"}},
            {name: "phoneNumber", label: "電話番号", value:"", type:"text" , validation: {required:"true",textMin:"10",textMax:"11",noHyphen:"/[\-\ー]/",matches:"/^[0-9]+$/"}},
            {name: "request", label: "ご質問・ご要望", value:"", type:"textarea" , validation: {required:"false",textMax:"1000"}},
          ]
        },
      ]
    }
  },
});
</script>

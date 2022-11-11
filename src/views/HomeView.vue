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
            {name: "income", label: "ご年収", value:"", type:"text", option: {mode:"", data:[""]},validation: {required:"true",min:"499",max:"99999999",headZero:"^0[0-9]+$",matches:"^[0-9]+$"}},
            {name: "financialAsset", label: "現在の金融資産", value:"", type:"text", option: {mode:"", data:[""]},validation: {required:"true",max:"99999999",headZero:"^0[0-9]+$",matches:"^[0-9]+$"}},
            {name: "debt", label: "現在のお借入金額", value:"", type:"text", option: {mode:"", data:[""]},validation: {required:"true",max:"99999999",headZero:"^0[0-9]+$",matches:"^[0-9]+$"}},
          ]
        },
        {
          block:"ご職業",
          data: [
            {name: "categoryOfBusiness", label: "業種", value:"", type:"select", option: {mode:"", data:["業種1", "業種2", "業種3", "業種4"]},validation: {required:"true"}},
            {name: "typeOfOccupation", label: "職種", value:"", type:"select", option: {mode:"", data:["職種1", "職種2", "職種3", "職種4"]},validation: {required:"true"}},
            {name: "placeOfEmployment", label: "お勤め先", value:"", type:"text", option: {mode:"", data:[""]},validation: {required:"true",textMax:"100"}},
            {name: "whenStartedWorking", label: "お勤め開始時期", value:"", type:"date", option: {mode:"dm", data:["2000","2001"]},validation: {required:"true"}},
          ]
        },
        {
          block:"その他",
          data: [
            {name: "birthday", label: "生年月日", value:"", type:"date", option: {mode:"dmy", data:["1990","1991"]},validation: {required:"true"}},
            {name: "prefecture", label: "お住まいの都道府県", value:"", type:"select", option: {mode:"", data:["都道府県1", "都道府県2", "都道府県3", "都道府県4"]},validation: {required:"true"}},
          ]
        },
        {
          block:"ご連絡先",
          data: [
            {name: "name", label: "お名前", value:"", type:"text", option: {mode:"", data:[""]},validation: {required:"true",textMax:"100"}},
            {name: "email", label: "メールアドレス", value:"", type:"text", option: {mode:"", data:[""]},validation: {required:"true",email:"^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$"}},
            {name: "phoneNumber", label: "電話番号", value:"", type:"text", option: {mode:"", data:[""]},validation: {required:"true",textMin:"10",textMax:"11",noHyphen:"[\-\ー]",matches:"^[0-9]+$"}},
            {name: "request", label: "ご質問・ご要望", value:"", type:"textarea", option: {mode:"", data:[""]},validation: {required:"false",textMax:"1000"}},
          ]
        },
      ]
    }
  },
});
</script>

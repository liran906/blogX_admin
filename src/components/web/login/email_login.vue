<script setup lang="ts">
import {ref} from "vue";
import Send_email from "@/components/web/login/send_email.vue";
import Email_register from "@/components/web/login/email_register.vue";
import F_captcha from "@/components/web/f_captcha.vue";

const step = ref(1)
const emailID = ref("")
const emits = defineEmits(["ok"])
function sendEmailOk(data: string){
  emailID.value = data
  step.value = 2
}

function emailRegisterOk(data: string){
  emits("ok", data)
}

</script>

<template>
  <send_email v-if="step === 1" :type="1" @ok="sendEmailOk"></send_email>
  <email_register :email-id="emailID" v-if="step === 2" @ok="emailRegisterOk"></email_register>
</template>

<style lang="less">

</style>
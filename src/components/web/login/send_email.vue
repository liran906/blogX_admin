<script setup lang="ts">

import {Button, Form, FormItem, Input, Message} from "@arco-design/web-vue";
import {reactive, ref} from "vue";
import {sendEmailApi, type sendEmailType} from "@/api/user_api";
import {userStorei} from "@/stores/user_store";
import F_captcha from "@/components/web/f_captcha.vue";

const store = userStorei()
const props = defineProps<{ type: 1|2|3 }>()
const emits = defineEmits(["ok"])
const form = reactive<sendEmailType>({
  type: props.type, // todo
  email: "",
  captchaID: "",
  captchaCode: "",
})
const formRef = ref()
const captchaRef = ref()

async function handler() {
  const val = await formRef.value.validate()
  if (val) return
  console.log(form)
  const res = await sendEmailApi(form)
  if (res.code) {
    Message.error(res.msg)
    captchaRef.value?.getData()
    return
  }
  Message.success(res.msg)
  emits("ok", res.data.emailID)
}


</script>

<template>
  <Form ref="formRef" :model="form" :label-col-props="{span: 0}" :wrapper-col-props="{span: 24}">
    <FormItem field="email" :rules="[{required: true, message:'请输入邮箱'}]">
      <Input v-model="form.email" placeholder="邮箱"></Input>
    </FormItem>
    <FormItem content-class="captcha_item" v-if="store.siteInfo.login.captcha" field="captchaCode"
              :rules="[{required: true, message:'请输入图形验证码'}]">
      <Input v-model="form.captchaCode" placeholder="图形验证码"></Input>
      <f_captcha ref="captchaRef" v-model="form.captchaID"></f_captcha>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handler" long>验证邮箱</Button>
    </FormItem>
  </Form>
</template>

<style lang="less">
.captcha_item{
  img {
    width: 93px;
    height: 32px;
    border-radius: 5px;
    margin-left: 10px;
  }
}
</style>
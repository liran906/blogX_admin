<script setup lang="ts">
import F_list, {type filterGroupType} from "@/components/admin/f_list.vue";
import type {columnType} from "@/components/admin/f_list.vue";
import {type formListType} from "@/components/admin/f_modal_form.vue";
import {bannerListApi, type bannerListType, type bannerType, bannerUpdateApi} from "@/api/banner_api";
import {reactive, ref} from "vue";
import F_image_upload from "@/components/common/f_image_upload.vue";
import {Message} from "@arco-design/web-vue";
import {bannerTypeOptions} from "@/options/options";
import F_banner_upload from "@/components/admin/f_banner_upload.vue";

const columns = [
  {title: "ID", dataIndex: 'id'},
  {title: "图片", slotName: 'url'},
  {title: "跳转地址", slotName: 'href'},
  {title: "是否显示", slotName: 'activated'},
  {title: "类型", dataIndex: 'type', type: "options", options: bannerTypeOptions},
  {title: "时间", slotName: 'createdAt'},
  {title: "操作", slotName: 'action'},
]
const visible = ref(false)
const fListRef = ref()
const data = reactive<bannerType>({
  url: "",
  href: "",
  activated: true,
  type: 1,
})

function create() {
  data.id = undefined
  data.url = ""
  data.href = ""
  data.activated = true
  data.type = 1
  visible.value = true
}

function edit(record: bannerListType) {
  data.id = record.id
  data.url = record.url
  data.href = record.href
  data.type = record.type
  visible.value = true
}


async function handler() {
  const res = await bannerUpdateApi(data)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  fListRef.value.getList()
  return true
}

</script>

<template>
  <div>
    <a-modal v-model:visible="visible" :title="data.id ? '更新banner' : '创建banner'" :on-before-ok="handler">
      <a-form :model="data">
        <a-form-item label="封面">
          <f_banner_upload  v-model="data.url"  shape=""  placeholder="banner封面" :height="60"></f_banner_upload>
        </a-form-item>
        <a-form-item label="跳转地址">
          <a-input placeholder="跳转地址" v-model="data.href"></a-input>
        </a-form-item>
        <a-form-item label="是否显示">
          <a-switch v-model="data.activated"></a-switch>
        </a-form-item>
        <a-form-item label="类型">
          <a-radio-group v-model="data.type">
            <a-radio :value="1">banner</a-radio>
            <a-radio :value="2">推广</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
    <f_list
        ref="fListRef"
        @add="create"
        @edit="edit"
        :url="bannerListApi"
        :columns="columns">
      <template #url="{record}:{record: bannerListType}">
        <a-image :src="record.url" height="50px"></a-image>
      </template>
      <template #activated="{record}:{record: bannerListType}">
        <a-switch :model-value="record.activated" :disabled="true"></a-switch>
      </template>
      <template #href="{record}:{record: bannerListType}">
        <a :href="record.href" v-if="record.href" target="_blank">{{ record.href }}</a>
        <span v-else>-</span>
      </template>
    </f_list>
  </div>
</template>
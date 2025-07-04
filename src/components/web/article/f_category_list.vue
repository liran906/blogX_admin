<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import type {listResponse, baseResponse} from "@/api";
import {
  categoryCreateApi,
  type categoryCreateRequest,
  categoryListApi, type categoryListRequest,
  type categoryListType, categoryRemoveApi
} from "@/api/category_api";
import {Message} from "@arco-design/web-vue";
import {useRoute} from "vue-router";
import F_a from "@/components/common/f_a.vue";
import router from "@/router";

const route = useRoute()

interface Props {
  userId: number
  isMe: boolean
}

const props = defineProps<Props>()

const categoryData = reactive<listResponse<categoryListType>>({
  list: [],
  count: 0
})

const params = reactive<categoryListRequest>({
  userID: props.userId,
  type: 2,
})

async function getCategoryData() {
  const res = await categoryListApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  categoryData.list = res.data.list
  categoryData.count = res.data.count
}

const form = reactive<categoryCreateRequest>({
  id: 0,
  title: ""
})
const visible = ref(false)

function addCategory() {
  form.id = 0
  form.title = ""
  visible.value = true
}

function showEdit(item: categoryListType) {
  form.id = item.id
  form.title = item.name
  visible.value = true
}

async function addCategoryHandler() {
  if (form.title.trim() === "") {
    Message.warning("请输入分类名称")
    return
  }
  let res: baseResponse<string>
  res = await categoryCreateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getCategoryData()
}

async function remove(item: categoryListType) {
  const res = await categoryRemoveApi([item.id])
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getCategoryData()
}

function go(item:categoryListType) {

  // 判断现在是不是已经点了它
  const  categoryID = Number(route.query.categoryID)
  let _id : number|undefined  = item.id
  if (categoryID === item.id){
    _id = undefined
  }

  router.push({
    name: route.name as string,
    query: {
      ...route.query,
      categoryID: _id,
    },
    params: route.params
  })
}

watch(() => props.userId, () => {
  const userID = Number(props.userId)
  if (!isNaN(userID)) {
    params.userID = userID
    getCategoryData()
  }
})

getCategoryData()
</script>

<template>
  <div class="f_category_list_com">
    <div class="add" v-if="props.isMe">
      <a-button long type="outline" @click="addCategory">
        <template #icon>
          <icon-plus></icon-plus>
        </template>
        创建分类
      </a-button>
    </div>
    <a-modal v-if="props.isMe" width="30%" :title="form.id ? '编辑分类' : '创建分类'" v-model:visible="visible"
             :on-before-ok="addCategoryHandler" :body-style="{color: 'var(--color-text-1)'}">
      <a-input placeholder="分类名称" v-model="form.title"></a-input>
    </a-modal>
    <div class="list">
      <div class="item" :class="{active: item.id===Number(route.query.categoryID)}" v-for="item in categoryData.list">
        <a-trigger v-if="props.isMe" content-class="category_trigger" trigger="contextMenu" align-point>
          <f_a @click="go(item)" >
            <span>
              <a-typography-text :ellipsis="{css: true, rows: 1}">{{ item.name }}</a-typography-text>
            </span>
            <span>{{ item.articleCount }}</span>
          </f_a>
          <template #content>
            <div class="item" @click="showEdit(item)">编辑</div>
            <div class="item delete" @click="remove(item)">删除</div>
          </template>
        </a-trigger>
        <f_a v-else @click="go(item)">
            <span>
              <a-typography-text :ellipsis="{css: true, rows: 1}">{{ item.name }}</a-typography-text>
            </span>
          <span>{{ item.articleCount }}</span>
        </f_a>

      </div>
    </div>
  </div>
</template>

<style lang="less">
.f_category_list_com {
  width: 100%;
  border-right: @f_border;
  padding: 10px;

  .arco-btn {
    border-radius: 100px;
  }

  .list {
    margin-top: 10px;

    .item {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;

      &:hover {
        background: var(--color-fill-1);
      }

      a {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: var(--color-text-2);

        span:nth-child(1){
          width: 5rem;
        }
      }
    }

    .item.active {
      a {
        color: rgb(var(--arcoblue-6));
        span{
          color: rgb(var(--arcoblue-6));
        }
      }
    }
  }
}

.category_trigger {
  background: var(--color-bg-1);
  border-radius: 5px;
  border: @f_border;
  padding: 5px 0;

  .item {
    padding: 10px 20px;
    cursor: pointer;


    &:hover {
      background: var(--color-fill-1)
    }
  }

  .delete {
    color: red;
  }
}
</style>
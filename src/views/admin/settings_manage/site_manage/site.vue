<script setup lang="ts">
// M
import F_title from "@/components/common/f_title.vue";
import {reactive, ref} from "vue";
import F_image_upload from "@/components/common/f_image_upload.vue";
import {Message, type TreeNodeData} from "@arco-design/web-vue";
import F_index_right from "@/components/admin/site/f_index_right.vue";
import {siteApi, type siteResponse, siteUpdateApi} from "@/api/site_api";
import F_site from "@/components/admin/site/f_site.vue";

</script>

<template>
  <div class="site_view">
    <f_site name="site" v-slot="{form}:{form: siteResponse}">
      <a-form :model="form">
        <a-row>
          <a-col :span="8">
            <div class="form site_form">
              <f_title>网站设置</f_title>
              <div class="body">
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="网站标题">
                  <a-input placeholder="网站标题" v-model="form.siteInfo.title"></a-input>
                </a-form-item>
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="logo">
                  <f_image_upload v-model="form.siteInfo.logoURL" placeholder="logo地址"></f_image_upload>
                </a-form-item>
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="备案号">
                  <a-input placeholder="备案号" v-model="form.siteInfo.icp"></a-input>
                </a-form-item>
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="运行模式">
                  <a-radio-group v-model="form.siteInfo.mode">
                    <a-radio :value="1">社区模式</a-radio>
                    <a-radio :value="2">博客模式</a-radio>
                  </a-radio-group>
                </a-form-item>
              </div>
            </div>
            <div class="form project_form">
              <f_title>项目设置</f_title>
              <div class="body">
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="网站title">
                  <a-input placeholder="网站title" v-model="form.project.title"></a-input>
                </a-form-item>
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="网站icon">
                  <f_image_upload v-model="form.project.icon" placeholder="网站icon地址"></f_image_upload>
                </a-form-item>
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="前端地址">
                  <a-input placeholder="前端地址" v-model="form.project.webPath"></a-input>
                  <template #help>
                    前端index.html的文件路径
                  </template>
                </a-form-item>
              </div>
            </div>
            <div class="form seo_form">
              <f_title>SEO设置</f_title>
              <div class="body">
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="keywords">
                  <a-input placeholder="keywords" v-model="form.seo.keywords"></a-input>
                </a-form-item>
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="description">
                  <a-textarea placeholder="description" :auto-size="{minRows: 2, maxRows: 3}"
                              v-model="form.seo.description"></a-textarea>
                </a-form-item>
              </div>
            </div>
            <div class="site_update_btn"></div>
          </a-col>
          <a-col :span="8">
            <div class="form about_form">
              <f_title>关于</f_title>
              <div class="body">
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="建站日期">
                  <a-input placeholder="建站日期" v-model="form.about.siteDate"></a-input>
                </a-form-item>
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="网站版本">
                  <span>10.0.1</span>
                  <span>/</span>
                  <span>{{ form.about.version }}</span>
                </a-form-item>
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="qq二维码">
                  <f_image_upload :width="100" :height="100" shape="square" v-model="form.about.qqURL" placeholder="qq二维码地址"></f_image_upload>
                </a-form-item>
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="微信二维码">
                  <f_image_upload shape="square" v-model="form.about.wechatURL" :width="100" :height="100"
                                  placeholder="微信二维码地址"></f_image_upload>
                </a-form-item>
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="gitee">
                  <a-input placeholder="gitee" v-model="form.about.gitee"></a-input>
                </a-form-item>
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="bilibili">
                  <a-input placeholder="bilibili" v-model="form.about.bilibili"></a-input>
                </a-form-item>
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 18}" label="github">
                  <a-input placeholder="github" v-model="form.about.github"></a-input>
                </a-form-item>
              </div>
            </div>
            <div class="form login_form">
              <f_title>登录设置</f_title>
              <div class="body">
                <a-form-item :label-col-props="{span: 6}" :wrapper-col-props="{span: 16}" label="启用QQ登录">
                  <a-switch v-model="form.login.qqLogin"></a-switch>
                </a-form-item>
                <a-form-item :label-col-props="{span: 6}" :wrapper-col-props="{span: 16}" label="用户名密码登录">
                  <a-switch v-model="form.login.usernamePwdLogin"></a-switch>
                </a-form-item>
                <a-form-item :label-col-props="{span: 6}" :wrapper-col-props="{span: 16}" label="启用邮箱注册">
                  <a-switch v-model="form.login.emailRegister"></a-switch>
                </a-form-item>
                <a-form-item :label-col-props="{span: 6}" :wrapper-col-props="{span: 16}" label="启用图片验证码">
                  <a-switch v-model="form.login.captcha"></a-switch>
                </a-form-item>
              </div>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="form index_right_form">
              <f_title>首页右侧组件展示</f_title>
              <f_index_right class="body" v-model="form.indexRight.list"></f_index_right>
            </div>
            <div class="form article_form">
              <f_title>文章设置</f_title>
              <div class="body">
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 14}" label="文章免审核">
                  <a-switch v-model="form.article.autoApprove"></a-switch>
                  <template #help>
                    开启文章免审核之后，文章直接可以在首页中查询
                  </template>
                </a-form-item>
                <a-form-item :label-col-props="{span: 4}" :wrapper-col-props="{span: 14}" label="评论层数">
                  <a-input-number placeholder="评论层数" v-model="form.article.commentDepth"></a-input-number>
                </a-form-item>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </f_site>
  </div>
</template>

<style lang="less">
.site_view {
  .form {
    margin-bottom: 20px;
  }
}
</style>
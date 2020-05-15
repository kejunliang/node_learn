<template>
    <div>
      <a-page-header
          style="border: 1px solid rgb(235, 237, 240)"
          @back="() => goBack()"
          :title="pageTitle"
          v-show="!loading"
      >
        <template   slot="extra">
          <a-button key="1" type="primary">
            提交
          </a-button>
        </template>
        <template v-for="button in buttons"  slot="extra">
          <a-button :key="button.buttonId">{{button.buttonName}}</a-button>
        </template>
      </a-page-header>
    <a-tabs @change="tabcallback" type="card" style="margin-top:10px;">
      <a-tab-pane tab="表单" key="1">
        <!-- <table v-bind:loading = "loading">
          <template v-for = "index in Math.round(todoData.length/2)">
            <tr  :key ="index">
              <td>{{todoData[(index-1)*2].caption}}</td>
              <td>{{todoData[(index-1)*2].value}}</td>
              <td>{{todoData[(index-1)*2+1] && todoData[(index-1)*2+1].caption}}</td>
              <td>{{todoData[(index-1)*2+1] && todoData[(index-1)*2+1].value}}</td>
            </tr>
           </template>
        </table> -->
      <a-spin  tip="Loading..." style="min-height: 100vh" v-show="loading">
        <div class="spin-content">
        </div>
      </a-spin>
      <!-- :title="pageTitle"   放在a-descriptions里时表单上方会显示title-->
      <a-descriptions
      bordered :column="2"
      v-show="!loading">
        <template v-for = "todoItem in todoData">
        <a-descriptions-item :key="todoItem.id" :label="todoItem.caption">{{todoItem.value}}</a-descriptions-item>
        </template>
      </a-descriptions>

      </a-tab-pane>
      <a-tab-pane tab="附件" key="2">
        <a-spin  tip="Loading..." style="min-height: 100vh" v-show="loading">
        <div class="spin-content">
        </div>
      </a-spin>
        <div  v-show="!loading">
          Content of Tab Pane 2
          </div>
        </a-tab-pane>
      <a-tab-pane tab="流程跟踪" key="3">
        <a-spin  tip="Loading..." style="min-height: 100vh" v-show="loading">
        <div class="spin-content">
        </div>
      </a-spin>
        <a-timeline  v-show="!loading">
          <template v-for = "process in processLogInfo">
            <a-timeline-item :key="process.index" style="text-align:left;"><span class="process">{{process.finishDate | dateformat('YYYY-MM-DD HH:mm:ss')}}</span> <span class="process">{{process.operator}}</span>  <span class="process">{{process.stepName}}</span></a-timeline-item>
          </template>
        </a-timeline>
        </a-tab-pane>
    </a-tabs>
    </div>
</template>
<script>

// const todoData = []
export default {
  name: 'Todocontent',
  data () {
    return {
      todoData: [],
      processLogInfo: [],
      buttons: [],
      pageTitle: '标题',
      loading: true
    }
  },
  created () {
    const todoId = this.$route.params.todoId
    this.loading = true
    if (todoId) {
      this.getTodoContent(todoId).then(res => {
        this.loading = false
        this.todoData = res.processFormData.processFormPropertyValues
        this.pageTitle = res.pageTitle
        this.processLogInfo = res.processLogInfo
        this.buttons = res.buttons
      })
    } else {
      this.loading = false
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    // 点击tab页签时回调的方法
    tabcallback (key) {
      console.log(key)
    },
    getTodoContent (todoId) {
      return this.$axios({
        url: '/nginx/_api/http/172.20.96.38/app54/api/flow-mobile/v1/task-form-process/todo-pages/' + todoId,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log(res)
        return res.data
      })
    }
  }
}

</script>
<style>
.ant-tabs-bar{
  text-align: left !important;
}
.process{
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 3px;
  margin-left: 20px;
  margin-right: 5px;
}
</style>

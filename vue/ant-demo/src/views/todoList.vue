<template>
  <div>
    <a-spin v-show="pageLoading" tip="Loading...">
      <div class="spin-content">
        数据获取中。。。
      </div>
    </a-spin>
    <a-table v-show="!pageLoading"
      :columns="columns"
      :dataSource="todoData"
      :rowKey="record => record.id"
      :loading = "loading"
      :customRow = "customClick"
      :pagination = "pagination"
      >
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
        <span slot="tags" slot-scope="tags">
          <a-tag
            v-for="tag in tags"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            :key="tag"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
    </a-table>
  </div>
</template>
<script>
// 引入moment 定义了一个格式化日期的方法formatterTime
const moment = require('moment')
const formatterTime = (val) => {
  return val ? moment(val).format('YYYY-MM-DD HH:mm') : ''
}
const columns = [
  {
    title: '接收时间',
    dataIndex: 'sentDate',
    width: '15%',
    customRender: formatterTime
    // slots: { title: 'seenDate' }
    // scopedSlots: { customRender: '标题' }
  },
  {
    title: '标题', // 列名称
    dataIndex: 'title', // 列的值
    width: '50%'
  },
  {
    title: '业务分类',
    dataIndex: 'processName',
    width: '10%'
  },
  {
    title: '上一步处理人',
    dataIndex: 'senderName',
    width: '10%'
  },
  {
    title: '办理状态',
    dataIndex: 'currentStep',
    width: '15%'
  }
]

const todoData = [
]
const pageSize = 10 // 每页显示数据量
const pageLoading = false
// const current = 1
export default {
  data () {
    return {
      todoData,
      columns,
      pageLoading,
      todoType: this.$route.params.todoType,
      pagination: {
        total: 0,
        pageSize: pageSize,
        onChange: (page, pageSize) => this.changePage(page, pageSize)
      }
    }
  },
  created () {
    this.loading = true
    const todoType = this.$route.params.todoType
    this.getTodoData(1, pageSize, todoType).then(res => {
      this.loading = false
      this.todoData = res.datas
      this.$set(this.pagination, 'total', res.total)
    })
  },
  methods: {
    getTodoData (page, pageSize, todoType) {
      const startPosition = (page - 1) * pageSize
      let url = ''
      if (todoType !== 'toread') {
        url = '/nginx/_api/http/172.20.96.38/app54/api/flow-mobile/v1/user-tasks/todo'
      } else {
        url = '/nginx/_api/http/172.20.96.38/app54/api/flow-mobile/v1/user-tasks/inform'
      }
      return this.$axios({
        url: url,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: { startPosition: startPosition, maxResults: pageSize, expressions: [{ dataType: 'exps', op: 'or', expressionsValue: [{ dataType: 'int', op: 'eq', name: 'openMode', intValue: 31 }, { dataType: 'int', op: 'eq', name: 'openMode', intValue: 1 }] }] }
      }).then(res => {
        return res.data
      })
    },
    // 点击列表跳转到具体内容
    customClick (record) {
      return {
        on: {
          click: (event) => {
            this.$router.push({ name: 'todoCcontent', params: { todoId: record.id } })
          }
        }
      }
    },
    changePage (page, pageSize) {
      this.pageLoading = true
      const todoType = this.$route.params.todoType
      this.getTodoData(page, pageSize, todoType).then(res => {
        this.pageLoading = false
        this.todoData = res.datas
        this.$set(this.pagination, 'total', res.total)
      })
    }
  }
}
</script>
<style scoped>
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>

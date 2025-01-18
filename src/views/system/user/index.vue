<template>
  <div class="layout">
    <!-- 搜索框 -->
    <div class="input">
      <a-input v-model:value="searchForm.username" placeholder="用户名" />
      <a-input v-model:value="searchForm.username" placeholder="状态" />
    </div>
    <!-- 按钮 -->
    <div class="button">
      <a-button type="primary" @click="queryData(true)">查询</a-button>
      <a-button @click="resetSearchForm">重置</a-button>
      <a-button @click="handleAdd">新增</a-button>

      <a-button @click="resetSearchForm">导出</a-button>
      <a-button @click="resetSearchForm">导入</a-button>
    </div>
    <!-- 表格 -->
    <a-table
      :row-selection="rowSelection"
      :dataSource="res.list"
      :columns="columns"
      :loading="res.loading"
      :pagination="pagination">
      <template #bodyCell="{ column, record }">
        <template v-if="column.title === '操作'">
          <a @click="handleEdit(record)">编辑</a>
          <a style="margin-left: 5px" @click="handleDelete(record)">删除</a>
        </template>
      </template>
    </a-table>
    <!-- 对话框 -->
    <a-modal
      v-model:open="dialog.open"
      :maskClosable="false"
      :title="form.userId ? '编辑' : '新增'"
      :confirm-loading="dialog.loading"
      @ok="submit">
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
      <p>sss</p>
    </a-modal>
  </div>
</template>

<script lang="ts" setup name="user">
import { userApi } from '@/api/system/user'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { createVNode } from 'vue'

//初始化
onMounted(async () => {
  queryData()
})
/**
 * 表格项
 */
const columns: any = [
  { title: '用户ID', dataIndex: 'userId' },
  { title: '部门ID', dataIndex: 'deptId' },
  { title: '账号', dataIndex: 'username' },
  { title: '昵称', dataIndex: 'nickname' },
  { title: '姓名', dataIndex: 'name' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '电话号码', dataIndex: 'phone' },
  { title: '性别', dataIndex: 'sex' },
  { title: '帐号状态', dataIndex: 'status' },
  { title: '操作', fixed: 'right' }
]
/**
 * 多选
 */
const rowSelection = ref({
  onChange: (selectedRowKeys, selectedRows) => {
    console.log('selectedRows: ', selectedRows)
  }
})
/**
 * 查询参数
 */
const searchData = () => {
  return {
    current: 1,
    size: 1,
    username: ''
  }
}
const searchForm = ref(searchData())
const resetSearchForm = () => {
  Object.assign(searchForm.value, searchData())
}
/**
 * 表单参数
 */
const formData = () => {
  return {
    username: '',
    userId: ''
  }
}
const form = ref(formData())
const resetForm = () => {
  Object.assign(form.value, formData())
}
/**
 * 请求参数
 */
const res = ref({
  list: [],
  loading: false,
  total: 0
})

/**
 * 查询数据
 */
const queryData = async (isReset = false) => {
  // 条件查询从头开始
  if (isReset) {
    searchForm.value.current = searchData().current
    searchForm.value.size = searchData().size
  }
  res.value.loading = true
  res.value = await userApi.page(searchForm.value)
  res.value.loading = false
}
/**
 * 弹窗
 */
const dialog = ref({
  open: false,
  loading: false
})
//编辑
const handleEdit = row => {
  Object.assign(form.value, row)
  dialog.value.open = true
}
//新增
const handleAdd = () => {
  resetForm()
  dialog.value.open = true
}
//删除
const handleDelete = row => {
  Modal.confirm({
    title: '警告',
    icon: createVNode(ExclamationCircleOutlined),
    centered: true,
    okType: 'danger',
    content: `确定要删除用户 ${row.username} 吗?`,
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
      }).catch(() => console.log('Oops errors!'))
    },
    onCancel() {}
  })
  console.log(row.userId)
}
//提交
const submit = () => {
  dialog.value.loading = true
  setTimeout(() => {
    dialog.value.open = false
    dialog.value.loading = false
  }, 1000)
}
/**
 * 分页配置
 */
const pagination = computed(() => ({
  pageSize: searchForm.value.size,
  current: searchForm.value.current,
  total: res.value.total,
  showTotal: total => `共 ${total} 条`,
  onChange: (page, pageSize) => {
    searchForm.value.current = page
    searchForm.value.size = pageSize
    queryData()
  }
}))
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .input {
    & input {
      width: 180px;
    }
    display: flex;
    gap: 10px;
  }
  .button {
    display: flex;
    gap: 5px;
  }
}
</style>

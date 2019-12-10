<template>
  <div class="app-container">
    <!-- <div style="margin-bottom:15px;">{{$t('permission.roles')}}： {{roles}}</div>
    {{$t('permission.switchRoles')}}：
    <el-radio-group v-model="role">
      <el-radio-button label="editor"></el-radio-button>
    </el-radio-group> -->

    <!-- -->

    <div class="filter-container">
      <div>
        <el-button
          class="filter-item"
          icon="el-icon-third-add"
          @click="handleCreate"
        >{{$t('table.add')}}</el-button>

        <el-button
          class="filter-item"
          icon="el-icon-third-query1"
          @click="handleAdanceToggle"
          style="float:right"
        >{{$t('table.advance')}}</el-button>
        <div
          class="form-container"
          v-if="advanceVisable"
        >

          <el-row :gutter="24">
            <el-form
              label-position="left"
              label-width="70px"
            >
              <el-col
                :span="6"
                :xs="24"
                :sm="12"
                :lg="5"
              >
                <el-form-item
                  :label="$t('user.name')"
                  prop="username"
                >
                  <el-input
                    v-model="listQuery.username"
                    prefix-icon="el-icon-third-ziyuanxhdpi"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="6"
                :xs="24"
                :sm="12"
                :lg="5"
              >
                <el-form-item
                  :label="$t('user.email')"
                  prop="email"
                >
                  <el-input
                    v-model="listQuery.email"
                    prefix-icon="el-icon-third-emailunread"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="6"
                :xs="24"
                :sm="12"
                :lg="5"
              >
                <el-form-item
                  :label="$t('user.status')"
                  prop="status"
                >
                  <el-input
                    v-model="listQuery.status"
                    prefix-icon="el-icon-third-iconfkzt"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="6"
                :xs="24"
                :sm="12"
                :lg="5"
              >
                <el-form-item
                  :label="$t('user.phone')"
                  prop="phone"
                >
                  <el-input
                    v-model="listQuery.phone"
                    prefix-icon="el-icon-third-shouji"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="6"
                :xs="24"
                :sm="12"
                :lg="4"
              >
                <el-form-item style="margin-bottom:50px">

                  <span>
                    <el-button-group class="filter-containter-button-group">
                      <el-button
                        plain
                        icon="el-icon-search"
                        @click="handleFilter"
                      >{{$t('table.search')}}</el-button>
                      <el-button
                        plain
                        icon="el-icon-refresh"
                        @click="handleAdvanceReset"
                      >{{$t('table.reset')}}</el-button>
                    </el-button-group>

                  </span>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <el-row :gutter="24">
            <el-form
              label-position="left"
              label-width="70px"
            >
              <el-col
                :span="6"
                :xs="24"
                :sm="12"
                :lg="6"
              >
                <el-form-item :label="$t('table.exportFileName')">
                  <el-input
                    :placeholder="$t('excel.placeholder')"
                    prefix-icon="el-icon-document"
                    v-model="filename"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col
                :span="6"
                :xs="24"
                :sm="12"
                :lg="6"
              >
                <el-form-item style="margin-bottom:50px">
                  <input
                    id="excel-upload-input"
                    type="file"
                    accept=".xlsx, .xls"
                    class="c-hide"
                    @change="handleFileChange"
                  >
                  <el-button-group class="filter-containter-button-group">
                    <el-button
                      class="filter-item"
                      icon="el-icon-upload2"
                      @click="handleUpload"
                    >导入</el-button>
                    <el-button
                      class="filter-item"
                      icon="el-icon-download"
                      @click="handleDownload"
                      :loading="downloadLoading"
                      v-waves
                    >{{$t('table.export')}}</el-button>
                  </el-button-group>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </div>
      </div>
    </div>
    <el-table
      border
      fit
      highlight-current-row
      class="data-table"
      :data="list"
      v-loading="listLoading"
      :default-sort="{prop: 'id', order: 'descending'}"
      @sort-change="handleSort"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="username"
        :label="$t('user.name')"
        :render-header="renderHeader"
        align="center"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span
            class="link-type"
            @click="handleUpdate(scope.row)"
          >{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        sortable="custom"
        :label="$t('user.email')"
        :render-header="renderHeader"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.email}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        :label="$t('user.status')"
        :render-header="renderHeader"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        :label="$t('user.phone')"
        :render-header="renderHeader"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="170"
        class-name="small-padding fixed-width"
        prop="action"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
            >{{$t('table.edit')}}</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >{{$t('table.delete')}}
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页导航 -->
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        :layout="this.$store.state.app.pagation.layout"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 编辑对话框 -->
    <el-dialog
      :title=$t(textMap[dialogStatus])
      :visible.sync="dialogFormVisible"
      :before-close="cancelData"
      center
      :fullscreen="this.$store.state.app.dialog.fullScreen"
    >
      <template>
        <el-form
          :rules="rules"
          ref="dataForm"
          :model="temp"
          label-position="left"
          label-width="80px"
        >
          <el-form-item
            :label="$t('user.name')"
            prop="username"
          >
            <el-input
              v-model="temp.username"
              prefix-icon="el-icon-third-ziyuanxhdpi"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('user.password')"
            prop="password"
          >
            <el-input
              v-model="temp.password"
              prefix-icon="el-icon-third-ziyuanxhdpi"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('user.email')"
            prop="email"
          >
            <el-input
              v-model="temp.email"
              prefix-icon="el-icon-third-emailunread"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('user.status')"
            prop="status"
          >
            <el-input
              v-model="temp.status"
              prefix-icon="el-icon-third-iconfkzt"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('user.phone')"
            prop="phone"
          >
            <el-input
              v-model="temp.phone"
              prefix-icon="el-icon-third-shouji"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="cancelData"
          icon="el-icon-close"
        >{{$t('table.cancel')}}</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="createData"
          icon="el-icon-check"
        >{{$t('table.confirm')}}</el-button>
        <el-button
          v-else
          type="primary"
          @click="updateData"
          @keyup.enter="updateData"
          icon="el-icon-check"
        >{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import MdInput from '@/components/MDinput'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import XLSX from 'xlsx'
import { fetchList, createAccount, updateUser, deleteUser } from '@/api/account'

export default {
  name: 'permission',
  directives: {
    waves
  },
  components: {
    MdInput
  },
  data() {
    const checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else if (value.length < 6) {
        return callback(new Error('用户名为6位'))
      } else {
        callback()
      }
    }
    const checkPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else if (value.length < 6) {
        return callback(new Error('密码至少为6位'))
      } else {
        callback()
      }
    }
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      } else if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
        return callback(new Error('请填入正确邮箱'))
      } else {
        callback()
      }
    }
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error('请填入手机号'))
      } else {
        callback()
      }
    }
    return {

      role: '',
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: 'id',
        order: 'desc',

        phone: null,
        status: null,
        username: null,
        email: null
      },
      total: null,
      advanceVisable: false,
      downloadLoading: false,
      multipleSelection: [],
      filename: '',
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
      },
      rules: {
        username: [{ required: true, validator: checkUsername, trigger: 'blur' }],
        password: [{ required: true, validator: checkPwd, trigger: 'blur' }],
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        phone: [{ required: true, validator: checkPhone, trigger: 'blur' }]
      },
      textMap: {
        update: 'Edit',
        create: 'Create'
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  watch: {
    role(val) {
      this.$store.dispatch('ChangeRole', val).then(() => {
        this.$router.push({ path: '/permission/index?' + +new Date() })
      })
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 数据列表
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        if (response.code === 200) {
          // fetchSupplierList().then(response => {
          //   this.suppliersopts = response.data.items
          //   this.listLoading = false
          // })
        }
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // 高级面板
    handleAdanceToggle() {
      this.advanceVisable = !this.advanceVisable
    },
    // 重置临时数据
    resetTemp() {
      this.temp = {
        id: undefined
      }
    },
    // 处理创建表单
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 创建数据
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createAccount(this.temp).then((response) => {
            if (response.code === 200) {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          //   createSupplier(this.temp).then(() => {
          //     this.list.unshift(this.temp)
          //     this.dialogFormVisible = false
          //     this.$notify({
          //       title: '成功',
          //       message: '创建成功',
          //       type: 'success',
          //       duration: 2000
          //     })
          //     this.getList()
          //   })
        }
      })
    },
    // 取消数据
    cancelData() {
      this.dialogFormVisible = false
      this.fileList = []
    },
    handleUpdate(row) {
      this.fileList = row.images
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 更新数据
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateUser(tempData).then((response) => {
            if (response.code === 200) {
              // for (const v of this.list) {
              //   if (v.id === this.temp.id) {
              //     const index = this.list.indexOf(v)
              //     this.list.splice(index, 1, this.temp)
              //     break
              //   }
              // }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        }
      })
    },
    handleDelete(row) {
      deleteUser(row).then((response) => {
        if (response.code === 200) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        }
      })
    },
    renderHeader(h, { column }) { // h即为cerateElement的简写，具体可看vue官方文档
      // console.log(column)
      let icon = ''
      switch (column.property) {
        case 'username':
          icon = 'el-icon-third-ziyuanxhdpi'
          break
        case 'email':
          icon = 'el-icon-third-emailunread'
          break
        case 'status':
          icon = 'el-icon-third-iconfkzt'
          break
        case 'phone':
          icon = 'el-icon-third-shouji'
          break
        case 'action':
          icon = 'el-icon-third-caozuogongneng'
          break
        default:
          break
      }
      return h(
        'span',
        [

          h('i', {
            class: icon,
            style: 'padding-right:5px'
          }),
          h('span', column.label)
        ],
      )
    },
    // 处理重置高级表单
    handleAdvanceReset() {
      this.listQuery.page = 1
      this.listQuery.phone = null
      this.listQuery.status = null
      this.listQuery.username = null
      this.listQuery.email = null
      this.listQuery.order = 'asc'
      // this.listQuery.sort = 'purchase_transaction_id'
      this.getList()
    },
    // 数据过滤
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 改变每页项数
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    // 当前页
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    // 远程排序
    handleSort(val) {
      this.listQuery.page = 1
      this.listQuery.sort = val.prop
      switch (val.order) {
        case 'ascending':
          val.order = 'asc'
          break
        case 'descending':
          val.order = 'desc'
          break
        default:
          val.order = null
          break
      }
      this.listQuery.order = val.order
      this.getList()
    },
    // 上传
    handleUpload() {
      document.getElementById('excel-upload-input').click()
    },
    handleFileChange(e) {
      const files = e.target.files
      const itemFile = files[0] // only use files[0]
      // console.log(itemFile)
      this.readerData(itemFile)
    },
    readerData(itemFile) {
      console.log(itemFile)
      const reader = new FileReader()
      reader.onload = e => {
        const data = e.target.result
        const fixedData = this.fixdata(data)
        const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = this.get_header_row(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet)
        console.log({ header, results })
        this.generateDate({ header, results })
      }
      // reader.readAsArrayBuffer(itemFile)
    },
    fixdata(data) {
      let o = ''
      let l = 0
      const w = 10240
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    get_header_row(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
        var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    // 导出
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['sku', 'purchasetransid']
          const filterVal = ['sku', 'purchasetransid']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel(tHeader, data, this.filename)
          this.downloadLoading = false
        })
      } else {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['date', 'purchasetransid']
          const filterVal = ['date', 'purchasetransid']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel(tHeader, data, this.filename)
          this.downloadLoading = false
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'date') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
#excel-upload-input {
  display: none;
  z-index: -9999;
}
</style>

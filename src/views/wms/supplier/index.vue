<template>
  <div class="app-container calendar-list-container">
    <!-- 搜索容器 -->
    <div class="filter-container">

      <!-- 高级搜索按钮 -->
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
      </div>
      <!-- 高级搜索表单 -->
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
              :lg="6"
            >
              <el-form-item
                :label="$t('supplier.name')"
                prop="name"
              >
                <el-input
                  v-model="listQuery.name"
                  prefix-icon="el-icon-third-gongyingshang"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="6"
              :xs="24"
              :sm="12"
              :lg="6"
            >
              <el-form-item
                :label="$t('supplier.platform')"
                prop="platform"
              >
                <el-input
                  v-model="listQuery.platform"
                  prefix-icon="el-icon-third-pingtaiyingyong"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col
              :span="6"
              :xs="24"
              :sm="12"
              :lg="6"
            >
              <el-form-item
                :label="$t('supplier.address')"
                prop="address"
              >
                <el-input
                  v-model="listQuery.address"
                  prefix-icon="el-icon-third-souhuodizhi"
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
                    >{{$t('table.import')}}</el-button>
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
    <!-- 数据表格 -->
    <el-table
      :key='tableKey'
      :data="list"
      v-loading="listLoading"
      :element-loading-text="$t('table.loadingText')"
      :default-sort="{prop: 'id', order: 'descending'}"
      @sort-change="handleSort"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      class="data-table"
    >
      <el-table-column
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column
        min-width="200"
        align="center"
        :label="$t('supplier.name')"
        sortable="custom"
        prop="name"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <span
            class="link-type"
            @click="handleUpdate(scope.row)"
          >{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        :label="$t('supplier.platform')"
        sortable="custom"
        prop="platform"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <span>{{scope.row.platform}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('supplier.address')"
        min-width="365px"
        sortable="custom"
        prop="address"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('table.actions')"
        width="170"
        prop="action"
        :render-header="renderHeader"
        class-name="small-padding fixed-width"
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
    <!-- 采购表单 -->
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
            :label="$t('supplier.name')"
            prop="name"
          >
            <el-input
              v-model="temp.name"
              prefix-icon="el-icon-third-gongyingshang"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('supplier.platform')"
            prop="platform"
          >
            <el-input
              v-model="temp.platform"
              prefix-icon="el-icon-third-pingtaiyingyong"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('supplier.address')"
            prop="address"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="temp.address"
            >
            </el-input>
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
<<script>
import { fetchList, createSupplier, updateSupplier, deleteSupplier } from '@/api/supplier'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import XLSX from 'xlsx'

export default {
  name: 'supplierTable',
  directives: {
    waves
  },
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('供应商名字不能为空'))
      } else if (value.length < 2) {
        return callback(new Error('供应商名字至少两个字符'))
      } else if (value.length >= 100) {
        return callback(new Error('供应商名字至多100个字符'))
      } else {
        callback()
      }
    }
    const checkPlatform = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('平台不能为空'))
      } else if (value.length < 2) {
        return callback(new Error('平台至少两个字符'))
      } else if (value.length >= 100) {
        return callback(new Error('平台至多100个字符'))
      } else {
        callback()
      }
    }
    const checkAddress = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('地址不能为空'))
      } else if (value.length < 2) {
        return callback(new Error('地址至少两个字符'))
      } else if (value.length >= 100) {
        return callback(new Error('地址至多100个字符'))
      } else {
        callback()
      }
    }
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        sort: 'name',
        order: 'desc'
      },
      temp: {
        id: undefined,
        name: '',
        platform: '',
        address: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      advanceVisable: false,
      rules: {
        name: [{ required: true, validator: checkName, trigger: 'blur' }],
        address: [{ required: true, validator: checkAddress, trigger: 'blur' }],
        platform: [{ required: true, validator: checkPlatform, trigger: 'blur' }]
      },
      downloadLoading: false,
      multipleSelection: [],
      filename: ''
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
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    renderHeader(h, { column }) { // h即为cerateElement的简写，具体可看vue官方文档
      // console.log(column)
      let icon = ''
      switch (column.property) {
        case 'name':
          icon = 'el-icon-third-gongyingshang'
          break
        case 'platform':
          icon = 'el-icon-third-pingtaiyingyong'
          break
        case 'address':
          icon = 'el-icon-third-souhuodizhi'
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
    // 重置临时数据
    resetTemp() {
      this.temp = {
        id: undefined,
        remark: '',
        timestamp: new Date(),
        name: '',
        platform: '',
        address: ''
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
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createSupplier(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    // 处理更新表单
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
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateSupplier(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 取消数据
    cancelData() {
      this.dialogFormVisible = false
      this.fileList = []
    },
    // 处理删除数据
    handleDelete(row) {
      deleteSupplier(row).then((response) => {
        if (response.code === 200) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        }
      })

      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
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
    // 高级面板
    handleAdanceToggle() {
      this.advanceVisable = !this.advanceVisable
    },
    handleAdvanceReset() {
      this.listQuery.page = 1
      this.listQuery.address = null
      this.listQuery.name = null
      this.listQuery.platform = null
      this.listQuery.order = 'asc'
      this.listQuery.sort = 'name'
      this.getList()
    },
    // 导出
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['name', 'platform', 'address']
          const filterVal = ['name', 'platform', 'address']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel(tHeader, data, this.filename)
          this.downloadLoading = false
        })
      } else {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['name', 'platform', 'address']
          const filterVal = ['name', 'platform', 'address']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel(tHeader, data, this.filename)
          this.downloadLoading = false
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style lang="scss">
.right {
  display: inline-block;
  padding-right: 20px;
  position: absolute;
  right: 0px;
}

#excel-upload-input {
  display: none;
  z-index: -9999;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>



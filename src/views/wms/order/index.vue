<template>
  <div class="app-container calendar-list-container">
    <!-- 过滤器 -->
    <div class="filter-container">
      <el-button class="filter-item" icon="el-icon-edit" @click="handleSync">{{$t('table.add')}}</el-button>
      <span class="right">
        <el-button class="filter-item" icon="el-icon-search" @click="handleAdanceToggle">{{$t('table.advance')}}</el-button>
      </span>
      <div class="form-container" v-if="advanceVisable">
        <el-row :gutter="24">
          <el-form label-position="left" label-width="70px">
            <el-col :span="12">
              <el-form-item :label="$t('order.date')" prop="date">
                <!-- <el-input v-model="listQuery.date" prefix-icon="el-icon-edit"></el-input> -->
                <el-date-picker v-model="listQuery.date" type="daterange" format="yyyy 年 MM 月 dd 日" align="right" unlink-panels range-separator="至 " start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('order.orderId')" prop="orderId">
                <el-input v-model="listQuery.orderId" prefix-icon="el-icon-tickets"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item>
                <el-radio-group v-model="listQuery.range">
                  <el-radio label="desc">倒序</el-radio>
                  <el-radio label="asc">顺序</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row :gutter="24">
          <el-form label-position="left" label-width="70px">
            <el-col :span="6">
              <el-form-item :label="$t('order.transId')" prop="transId">
                <el-input v-model="listQuery.transId" prefix-icon="el-icon-remove-outline"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('order.express')" prop="express">
                <el-select v-model="listQuery.express" placeholder="请选择">
                  <el-option v-for="item in expressOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('order.status')" prop="status">
                <el-select v-model="listQuery.status" placeholder="请选择">
                  <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">

            </el-col>
          </el-form>
          <el-col :span="6">
            <span style="display: inline-block;padding-right: 10px;position:absolute;right:0px;">
              <el-button type="primary" icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
              <el-button type="danger" icon="el-icon-refresh" @click="handleAdvanceReset">{{$t('table.reset')}}</el-button>
            </span>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-form label-position="left" label-width="70px">
            <el-col :span="12">
              <el-form-item :label="$t('table.exportFileName')" prop="packageWeight">
                <el-input style='width:340px;' :placeholder="$t('excel.placeholder')" prefix-icon="el-icon-document" v-model="filename"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('table.sortFiled')" prop="packageWeight">
                <el-select style="width: 140px" class="filter-item" v-model="listQuery.sort">
                  <el-option key="date" :label="$t('order.date')" value="date"></el-option>
                  <el-option key="orderId" :label="$t('order.orderId')" value="orderId"></el-option>
                  <el-option key="transId" :label="$t('order.transId')" value="transId"></el-option>
                  <el-option key="express" :label="$t('order.express')" value="express"></el-option>
                  <el-option key="status" :label="$t('order.status')" value="status"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
          <el-col :span="6">
            <span style="display: inline-block;padding-right: 10px;position:absolute;right:0px;">
              <input id="excel-upload-input" type="file" accept=".xlsx, .xls" class="c-hide" @change="handkeFileChange">
              <el-button class="filter-item" icon="el-icon-upload2" @click="handleUpload">导入</el-button>
              <el-button class="filter-item" icon="el-icon-download" @click="handleDownload" :loading="downloadLoading" v-waves>{{$t('table.export')}}</el-button>
            </span>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 表格 -->
    <el-table :key='tableKey' :data="list" v-loading="listLoading" :element-loading-text="$t('table.loadingText')" border fit highlight-current-row @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column width="160px" align="center" :label="$t('order.date')">
        <template slot-scope="scope">
          <span>{{scope.row.date | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="265px" align="center" :label="$t('order.orderId')">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.orderId}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="265px" align="center" :label="$t('order.transId')">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.transId}}</span>
        </template>
      </el-table-column>

      <el-table-column width="130px" align="center" :label="$t('order.express')">
        <template slot-scope="scope">
          <span>{{scope.row.express}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('order.status')" width="95">
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页导航 -->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 同步订单对话框 -->
    <el-dialog :title="$t('order.sync')" :visible.sync="syncFormVisible" :before-close="cancelSyncData">
      <template>
        <div v-show="syncProcessVisable">
          <el-progress :percentage="70"></el-progress>
        </div>
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="80px" style='width: 400px; margin-left:50px;'>
          <el-form-item :label="$t('order.dateRange')" prop="dateRange">
            <el-date-picker v-model="temp.dateRange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('order.platform')" prop="platfrom">
            <el-select v-model="temp.platfrom" placeholder="请选择">
              <el-option v-for="item in platfromOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('order.account')" prop="account">
            <el-select v-model="temp.account" placeholder="请选择">
              <el-option v-for="item in accountOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSyncData" icon="el-icon-close">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="syncData" icon="el-icon-check">{{$t('order.sync')}}</el-button>
      </div>
    </el-dialog>

    <!-- 编辑菜单对话框 -->
    <el-dialog title="编辑菜单" :visible.sync="editFormVisible">
      <template>
        <el-form label-position="left" label-width="80px" :model="order" style='width: 400px; margin-left:50px;'>
          <el-form-item :label="$t('order.date')" prop="dateRange">
            <el-date-picker v-model="order.date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('order.orderId')" prop="orderId">
            <el-input v-model="order.orderId"></el-input>
          </el-form-item>
          <el-form-item :label="$t('order.express')" prop="express">
            <el-select v-model="order.express" placeholder="请选择">
              <el-option v-for="item in expressOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('order.status')" prop="status">
            <el-select v-model="order.status" placeholder="请选择">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEditData" icon="el-icon-close">{{$t('table.cancel')}}</el-button>
          <el-button type="primary" @click="syncData" icon="el-icon-check">{{$t('order.sync')}}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList } from '@/api/order'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import XLSX from 'xlsx'

export default {
  name: 'productTable',
  directives: {
    waves
  },
  data() {
    var checkSku = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('SKU不能为空'))
      } else if (value.length !== 6) {
        return callback(new Error('SKU长度为6位'))
      } else if (!/^[A]{1}[0-9]{5}$/.test(value)) {
        return callback(new Error('SKU模式错误，格式：A00000'))
      } else {
        callback()
      }
    }
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('产品名称不能为空'))
      } else if (value.length < 2) {
        return callback(new Error('产品名称至少两个字符'))
      } else if (value.length > 100) {
        return callback(new Error('产品名称最多100个字符'))
      } else {
        callback()
      }
    }
    var checkPackageWeight = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('包装重量不能为空'))
      } else if (!/^\d+$/.test(value)) {
        return callback(new Error('包装重量为整数'))
      } else {
        callback()
      }
    }
    var checkPackageSize = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('包装尺寸不能为空'))
      } else if (!/^[\d+]{1,4}[*][\d+]{1,4}[*][\d+]{1,4}$/.test(value)) {
        return callback(new Error('包装尺寸错误，请输入1111*2222*3333'))
      } else {
        callback()
      }
    }
    return {
      tableKey: 0,
      activeName: 'first',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        sort: '',
        date: '',
        transId: '',
        orderId: '',
        status: '',
        express: '',
        range: 'asc'
      },
      temp: {
        id: undefined,
        dateRange: '',
        account: '',
        platfrom: ''
      },
      order: {
        date: '',
        transId: '',
        express: '',
        status: ''
      },
      syncFormVisible: false,
      syncProcessVisable: false,
      editFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      advanceVisable: false,
      rules: {
        name: [{ required: true, validator: checkName, trigger: 'blur' }],
        sku: [{ required: true, validator: checkSku, trigger: 'blur' }],
        packageWeight: [{ required: true, validator: checkPackageWeight, trigger: 'blur' }],
        packageSize: [{ required: true, validator: checkPackageSize, trigger: 'blur' }]
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            // const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      platfromOptions: [{
        value: '1',
        label: 'ebay'
      }, {
        value: '2',
        label: 'aliexpress'
      }, {
        value: '3',
        label: '其他'
      }],
      accountOptions: [{
        value: '1',
        label: 'vson.mail@gmail.com'
      }, {
        value: '2',
        label: 'happymama888@gmail.com'
      }, {
        value: '3',
        label: '其他'
      }],
      expressOptions: [{
        value: '出口易',
        label: '出口易'
      }, {
        value: '三态速递',
        label: '三态速递'
      }, {
        value: '递四方',
        label: '递四方'
      }],
      statusOptions: [{
        value: '已发货',
        label: '已发货'
      }, {
        value: '未处理',
        label: '未处理'
      }, {
        value: '发货中',
        label: '发货中'
      }],
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    // 添加
    resetTemp() {
      this.temp = {
        id: undefined,
        remark: '',
        timestamp: new Date(),
        name: '',
        sku: '',
        packageWeight: '',
        packageSize: ''
      }
    },
    handleSync() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.syncFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // handleEdit() {
    //   this.editFormVisible = true
    // },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.syncFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    syncData() {
      console.log('同步中。。。')
      this.syncProcessVisable = true
      // this.$refs['dataForm'].validate((valid) => {
      //   if (valid) {
      //     this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
      //     // createProduct(this.temp).then(() => {
      //     //   this.list.unshift(this.temp)
      //     //   this.syncFormVisible = false
      //     //   this.$notify({
      //     //     title: '成功',
      //     //     message: '创建成功',
      //     //     type: 'success',
      //     //     duration: 2000
      //     //   })
      //     // })
      //   }
      // })
    },
    // 编辑
    handleUpdate(row) {
      this.editFormVisible = true
      this.order = Object.assign({}, row)
      // this.fileList = row.images
      // this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      // this.dialogStatus = 'update'
      // this.syncFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // updateProduct(tempData).then(() => {
          //   for (const v of this.list) {
          //     if (v.id === this.temp.id) {
          //       const index = this.list.indexOf(v)
          //       this.list.splice(index, 1, this.temp)
          //       break
          //     }
          //   }
          //   this.syncFormVisible = false
          //   this.$notify({
          //     title: '成功',
          //     message: '更新成功',
          //     type: 'success',
          //     duration: 2000
          //   })
          // })
        }
      })
    },
    cancelSyncData() {
      this.syncFormVisible = false
      this.syncProcessVisable = false
      this.fileList = []
    },
    cancelEditData() {
      this.editFormVisible = false
    },
    // 删除
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    // 高级面板
    handleAdanceToggle() {
      this.advanceVisable = !this.advanceVisable
    },
    handleAdvanceReset() {
      this.listQuery.page = 1
      this.listQuery.sku = null
      this.listQuery.name = null
      this.listQuery.packageWeight = null
      this.listQuery.range = 'asc'
      this.listQuery.sort = 'id'
      this.getList()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 上传
    handleUpload() {
      document.getElementById('excel-upload-input').click()
    },
    handkeFileChange(e) {
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
          const tHeader = ['sku', 'name', 'packageWeight', 'packageSize']
          const filterVal = ['sku', 'name', 'packageWeight', 'packageSize']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel(tHeader, data, this.filename)
          this.downloadLoading = false
        })
      } else {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['sku', 'name', 'packageWeight', 'packageSize']
          const filterVal = ['sku', 'name', 'packageWeight', 'packageSize']
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

.el-dialog__body {
  padding: 0px 20px;
}
</style>
